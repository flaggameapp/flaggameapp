package app.flaggame.playgames;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import java.nio.charset.StandardCharsets;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.games.AuthenticationResult;
import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.PlayGamesSdk;
import com.google.android.gms.games.Player;
import com.google.android.gms.games.SnapshotsClient;
import com.google.android.gms.games.snapshot.Snapshot;
import com.google.android.gms.games.snapshot.SnapshotMetadata;
import com.google.android.gms.games.snapshot.SnapshotMetadataChange;
import org.json.JSONException;
import org.json.JSONObject;

@CapacitorPlugin(name = "FlagGamePlayGames")
public class FlagGamePlayGamesPlugin extends Plugin {
    private static final String TAG = "FlagGamePlayGames";
    private static final String DEFAULT_SNAPSHOT_NAME = "flag_game_world_challenge_v1";
    private static final int REQUEST_LEADERBOARDS = 9401;
    private static final int REQUEST_ACHIEVEMENTS = 9402;

    @Override
    public void load() {
        try {
            PlayGamesSdk.initialize(getContext());
            Log.i(TAG, "Play Games SDK initialization requested");
        } catch (Exception error) {
            Log.w(TAG, "Play Games SDK initialization failed", error);
        }
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        int status = getPlayServicesStatus();
        JSObject result = baseResult();
        result.put("available", status == ConnectionResult.SUCCESS);
        result.put("status", status == ConnectionResult.SUCCESS ? "available" : "play_services_unavailable");
        result.put("playServicesStatus", status);

        if (status != ConnectionResult.SUCCESS) {
            result.put(
                "error",
                structuredError(
                    "play_services_unavailable",
                    "Google Play services is not available on this device.",
                    null
                )
            );
        }

        call.resolve(result);
    }

    @PluginMethod
    public void getAuthenticationStatus(PluginCall call) {
        if (!resolveIfPlayServicesUnavailable(call)) {
            return;
        }

        Activity activity = getActivity();
        if (activity == null) {
            resolveError(
                call,
                "activity_unavailable",
                "The Android Activity is not available yet.",
                null
            );
            return;
        }

        PlayGames.getGamesSignInClient(activity)
            .isAuthenticated()
            .addOnSuccessListener(result -> resolveAuthentication(call, result, "authentication_status"))
            .addOnFailureListener(error -> resolveError(
                call,
                "authentication_status_failed",
                "Could not read the Play Games authentication status.",
                error
            ));
    }

    @PluginMethod
    public void requestAuthenticationRetry(PluginCall call) {
        if (!resolveIfPlayServicesUnavailable(call)) {
            return;
        }

        Activity activity = getActivity();
        if (activity == null) {
            resolveError(
                call,
                "activity_unavailable",
                "The Android Activity is not available yet.",
                null
            );
            return;
        }

        PlayGames.getGamesSignInClient(activity)
            .signIn()
            .addOnSuccessListener(result -> resolveAuthentication(call, result, "authentication_retry"))
            .addOnFailureListener(error -> resolveError(
                call,
                "authentication_retry_failed",
                "Could not retry Play Games authentication.",
                error
            ));
    }

    @PluginMethod
    public void getPlayerSummary(PluginCall call) {
        if (!resolveIfPlayServicesUnavailable(call)) {
            return;
        }

        Activity activity = getActivity();
        if (activity == null) {
            resolveError(
                call,
                "activity_unavailable",
                "The Android Activity is not available yet.",
                null
            );
            return;
        }

        PlayGames.getGamesSignInClient(activity)
            .isAuthenticated()
            .addOnSuccessListener(authentication -> {
                if (authentication == null || !authentication.isAuthenticated()) {
                    JSObject result = baseResult();
                    result.put("available", true);
                    result.put("authenticated", false);
                    result.put("status", "not_authenticated");
                    result.put("error", structuredError(
                        "not_authenticated",
                        "The player is not authenticated with Play Games Services.",
                        null
                    ));
                    call.resolve(result);
                    return;
                }

                PlayGames.getPlayersClient(activity)
                    .getCurrentPlayer()
                    .addOnSuccessListener(player -> resolvePlayer(call, player))
                    .addOnFailureListener(error -> resolveError(
                        call,
                        "player_summary_failed",
                        "Could not read the Play Games player summary.",
                        error
                    ));
            })
            .addOnFailureListener(error -> resolveError(
                call,
                "authentication_status_failed",
                "Could not read the Play Games authentication status.",
                error
            ));
    }

    @PluginMethod
    public void syncSavedGame(PluginCall call) {
        Activity activity = getReadyActivityOrResolve(call);

        if (activity == null) {
            return;
        }

        String snapshotName = sanitizeSnapshotName(
            call.getString("snapshotName", DEFAULT_SNAPSHOT_NAME)
        );
        SnapshotsClient snapshotsClient = PlayGames.getSnapshotsClient(activity);

        snapshotsClient
            .open(snapshotName, true, SnapshotsClient.RESOLUTION_POLICY_MANUAL)
            .addOnSuccessListener(dataOrConflict -> {
                try {
                    JSObject result = baseResult();
                    result.put("available", true);
                    result.put("authenticated", true);

                    if (dataOrConflict.isConflict()) {
                        SnapshotsClient.SnapshotConflict conflict =
                            dataOrConflict.getConflict();
                        Snapshot snapshot = conflict.getSnapshot();
                        Snapshot conflictingSnapshot =
                            conflict.getConflictingSnapshot();

                        result.put("status", "snapshot_conflict");
                        result.put("conflict", true);
                        result.put("payload", readSnapshotPayload(snapshot));
                        result.put(
                            "conflictingPayload",
                            readSnapshotPayload(conflictingSnapshot)
                        );
                        result.put("metadata", snapshotMetadata(snapshot));
                        result.put(
                            "conflictingMetadata",
                            snapshotMetadata(conflictingSnapshot)
                        );

                        discardSnapshot(snapshotsClient, snapshot);
                        discardSnapshot(snapshotsClient, conflictingSnapshot);
                        call.resolve(result);
                        return;
                    }

                    Snapshot snapshot = dataOrConflict.getData();

                    result.put("status", "snapshot_loaded");
                    result.put("conflict", false);
                    result.put("payload", readSnapshotPayload(snapshot));
                    result.put("metadata", snapshotMetadata(snapshot));

                    discardSnapshot(snapshotsClient, snapshot);
                    call.resolve(result);
                } catch (Exception error) {
                    resolveError(
                        call,
                        "snapshot_read_failed",
                        "Could not read the Play Games Saved Game snapshot.",
                        error
                    );
                }
            })
            .addOnFailureListener(error -> resolveError(
                call,
                "snapshot_open_failed",
                "Could not open the Play Games Saved Game snapshot.",
                error
            ));
    }

    @PluginMethod
    public void commitSavedGame(PluginCall call) {
        Activity activity = getReadyActivityOrResolve(call);

        if (activity == null) {
            return;
        }

        String snapshotName = sanitizeSnapshotName(
            call.getString("snapshotName", DEFAULT_SNAPSHOT_NAME)
        );
        JSObject payload = call.getObject("payload", new JSObject());
        byte[] bytes = payload.toString().getBytes(StandardCharsets.UTF_8);
        SnapshotsClient snapshotsClient = PlayGames.getSnapshotsClient(activity);

        snapshotsClient
            .open(snapshotName, true, SnapshotsClient.RESOLUTION_POLICY_MANUAL)
            .addOnSuccessListener(dataOrConflict -> {
                try {
                    if (dataOrConflict.isConflict()) {
                        Snapshot snapshot =
                            dataOrConflict.getConflict().getSnapshot();

                        snapshot.getSnapshotContents().writeBytes(bytes);
                        snapshotsClient
                            .resolveConflict(
                                dataOrConflict.getConflict().getConflictId(),
                                snapshot
                            )
                            .addOnSuccessListener(resolved -> {
                                JSObject result = baseResult();
                                result.put("available", true);
                                result.put("authenticated", true);
                                result.put(
                                    "status",
                                    resolved.isConflict()
                                        ? "snapshot_conflict_pending"
                                        : "snapshot_committed"
                                );
                                result.put("conflict", resolved.isConflict());
                                call.resolve(result);
                            })
                            .addOnFailureListener(error -> resolveError(
                                call,
                                "snapshot_conflict_commit_failed",
                                "Could not resolve the Play Games Saved Game conflict.",
                                error
                            ));
                        return;
                    }

                    Snapshot snapshot = dataOrConflict.getData();
                    snapshot.getSnapshotContents().writeBytes(bytes);

                    SnapshotMetadataChange metadataChange =
                        createMetadataChange(payload);

                    snapshotsClient
                        .commitAndClose(snapshot, metadataChange)
                        .addOnSuccessListener(metadata -> {
                            JSObject result = baseResult();
                            result.put("available", true);
                            result.put("authenticated", true);
                            result.put("status", "snapshot_committed");
                            result.put("metadata", metadataToObject(metadata));
                            call.resolve(result);
                        })
                        .addOnFailureListener(error -> resolveError(
                            call,
                            "snapshot_commit_failed",
                            "Could not commit the Play Games Saved Game snapshot.",
                            error
                        ));
                } catch (Exception error) {
                    resolveError(
                        call,
                        "snapshot_write_failed",
                        "Could not write the Play Games Saved Game snapshot.",
                        error
                    );
                }
            })
            .addOnFailureListener(error -> resolveError(
                call,
                "snapshot_open_failed",
                "Could not open the Play Games Saved Game snapshot.",
                error
            ));
    }

    @PluginMethod
    public void submitLeaderboardScore(PluginCall call) {
        Activity activity = getReadyActivityOrResolve(call);

        if (activity == null) {
            return;
        }

        String leaderboardKey = call.getString("leaderboardKey", "");
        String leaderboardId = getPlayGamesResource(
            getLeaderboardResourceName(leaderboardKey)
        );
        long score = Math.max(0, call.getLong("score", 0L));
        String scoreTag = sanitizeScoreTag(call.getString("scoreTag", ""));

        if (leaderboardId.isEmpty()) {
            resolveResourceMissing(
                call,
                "leaderboard_resource_missing",
                leaderboardKey
            );
            return;
        }

        PlayGames.getGamesSignInClient(activity)
            .isAuthenticated()
            .addOnSuccessListener(authentication -> {
                if (authentication == null || !authentication.isAuthenticated()) {
                    resolveNotAuthenticated(call);
                    return;
                }

                PlayGames.getLeaderboardsClient(activity)
                    .submitScoreImmediate(leaderboardId, score, scoreTag)
                    .addOnSuccessListener(submission -> {
                        JSObject result = baseResult();
                        result.put("available", true);
                        result.put("authenticated", true);
                        result.put("status", "leaderboard_score_submitted");
                        result.put("leaderboardKey", leaderboardKey);
                        result.put("score", score);
                        call.resolve(result);
                    })
                    .addOnFailureListener(error -> resolveError(
                        call,
                        "leaderboard_submit_failed",
                        "Could not submit the Play Games leaderboard score.",
                        error
                    ));
            })
            .addOnFailureListener(error -> resolveError(
                call,
                "authentication_status_failed",
                "Could not read the Play Games authentication status.",
                error
            ));
    }

    @PluginMethod
    public void unlockAchievement(PluginCall call) {
        Activity activity = getReadyActivityOrResolve(call);

        if (activity == null) {
            return;
        }

        String achievementKey = call.getString("achievementKey", "");
        String achievementId = getPlayGamesResource(
            getAchievementResourceName(achievementKey)
        );

        if (achievementId.isEmpty()) {
            resolveResourceMissing(
                call,
                "achievement_resource_missing",
                achievementKey
            );
            return;
        }

        PlayGames.getGamesSignInClient(activity)
            .isAuthenticated()
            .addOnSuccessListener(authentication -> {
                if (authentication == null || !authentication.isAuthenticated()) {
                    resolveNotAuthenticated(call);
                    return;
                }

                PlayGames.getAchievementsClient(activity)
                    .unlockImmediate(achievementId)
                    .addOnSuccessListener(unused -> {
                        JSObject result = baseResult();
                        result.put("available", true);
                        result.put("authenticated", true);
                        result.put("status", "achievement_unlocked");
                        result.put("achievementKey", achievementKey);
                        call.resolve(result);
                    })
                    .addOnFailureListener(error -> resolveError(
                        call,
                        "achievement_unlock_failed",
                        "Could not unlock the Play Games achievement.",
                        error
                    ));
            })
            .addOnFailureListener(error -> resolveError(
                call,
                "authentication_status_failed",
                "Could not read the Play Games authentication status.",
                error
            ));
    }

    @PluginMethod
    public void openLeaderboards(PluginCall call) {
        Activity activity = getReadyActivityOrResolve(call);

        if (activity == null) {
            return;
        }

        PlayGames.getGamesSignInClient(activity)
            .isAuthenticated()
            .addOnSuccessListener(authentication -> {
                if (authentication == null || !authentication.isAuthenticated()) {
                    resolveNotAuthenticated(call);
                    return;
                }

                PlayGames.getLeaderboardsClient(activity)
                    .getAllLeaderboardsIntent()
                    .addOnSuccessListener(intent -> {
                        launchPlayGamesIntent(
                            activity,
                            intent,
                            REQUEST_LEADERBOARDS
                        );
                        JSObject result = baseResult();
                        result.put("available", true);
                        result.put("authenticated", true);
                        result.put("status", "leaderboards_opened");
                        call.resolve(result);
                    })
                    .addOnFailureListener(error -> resolveError(
                        call,
                        "leaderboards_open_failed",
                        "Could not open the Play Games leaderboards.",
                        error
                    ));
            })
            .addOnFailureListener(error -> resolveError(
                call,
                "authentication_status_failed",
                "Could not read the Play Games authentication status.",
                error
            ));
    }

    @PluginMethod
    public void openAchievements(PluginCall call) {
        Activity activity = getReadyActivityOrResolve(call);

        if (activity == null) {
            return;
        }

        PlayGames.getGamesSignInClient(activity)
            .isAuthenticated()
            .addOnSuccessListener(authentication -> {
                if (authentication == null || !authentication.isAuthenticated()) {
                    resolveNotAuthenticated(call);
                    return;
                }

                PlayGames.getAchievementsClient(activity)
                    .getAchievementsIntent()
                    .addOnSuccessListener(intent -> {
                        launchPlayGamesIntent(
                            activity,
                            intent,
                            REQUEST_ACHIEVEMENTS
                        );
                        JSObject result = baseResult();
                        result.put("available", true);
                        result.put("authenticated", true);
                        result.put("status", "achievements_opened");
                        call.resolve(result);
                    })
                    .addOnFailureListener(error -> resolveError(
                        call,
                        "achievements_open_failed",
                        "Could not open the Play Games achievements.",
                        error
                    ));
            })
            .addOnFailureListener(error -> resolveError(
                call,
                "authentication_status_failed",
                "Could not read the Play Games authentication status.",
                error
            ));
    }

    private boolean resolveIfPlayServicesUnavailable(PluginCall call) {
        int status = getPlayServicesStatus();

        if (status == ConnectionResult.SUCCESS) {
            return true;
        }

        JSObject result = baseResult();
        result.put("available", false);
        result.put("authenticated", false);
        result.put("status", "play_services_unavailable");
        result.put("playServicesStatus", status);
        result.put(
            "error",
            structuredError(
                "play_services_unavailable",
                "Google Play services is not available on this device.",
                null
            )
        );
        call.resolve(result);
        return false;
    }

    private Activity getReadyActivityOrResolve(PluginCall call) {
        if (!resolveIfPlayServicesUnavailable(call)) {
            return null;
        }

        Activity activity = getActivity();

        if (activity == null) {
            resolveError(
                call,
                "activity_unavailable",
                "The Android Activity is not available yet.",
                null
            );
            return null;
        }

        return activity;
    }

    private int getPlayServicesStatus() {
        return GoogleApiAvailability
            .getInstance()
            .isGooglePlayServicesAvailable(getContext());
    }

    private void resolveAuthentication(
        PluginCall call,
        AuthenticationResult authentication,
        String authenticatedStatus
    ) {
        boolean authenticated = authentication != null && authentication.isAuthenticated();
        JSObject result = baseResult();
        result.put("available", true);
        result.put("authenticated", authenticated);
        result.put("status", authenticated ? authenticatedStatus : "not_authenticated");

        if (!authenticated) {
            result.put(
                "error",
                structuredError(
                    "not_authenticated",
                    "The player is not authenticated with Play Games Services.",
                    null
                )
            );
        }

        call.resolve(result);
    }

    private void resolveNotAuthenticated(PluginCall call) {
        JSObject result = baseResult();
        result.put("available", true);
        result.put("authenticated", false);
        result.put("status", "not_authenticated");
        result.put(
            "error",
            structuredError(
                "not_authenticated",
                "The player is not authenticated with Play Games Services.",
                null
            )
        );
        call.resolve(result);
    }

    private void resolveResourceMissing(
        PluginCall call,
        String code,
        String key
    ) {
        JSObject result = baseResult();
        result.put("available", true);
        result.put("authenticated", true);
        result.put("status", "resource_missing");
        result.put(
            "error",
            structuredError(
                code,
                "The Play Games resource ID is not configured.",
                null
            )
        );
        result.put("resourceKey", key);
        call.resolve(result);
    }

    private void resolvePlayer(PluginCall call, Player player) {
        JSObject result = baseResult();
        result.put("available", true);
        result.put("authenticated", true);
        result.put("status", "player_summary");
        result.put("player", playerSummary(player));
        call.resolve(result);
    }

    private void resolveError(
        PluginCall call,
        String code,
        String message,
        Exception error
    ) {
        JSObject result = baseResult();
        result.put("available", false);
        result.put("authenticated", false);
        result.put("status", "error");
        result.put("error", structuredError(code, message, error));
        call.resolve(result);
    }

    private JSObject baseResult() {
        JSObject result = new JSObject();
        result.put("available", false);
        result.put("authenticated", false);
        result.put("error", null);
        return result;
    }

    private JSObject playerSummary(Player player) {
        JSObject summary = new JSObject();

        if (player == null) {
            return summary;
        }

        summary.put("playerId", player.getPlayerId());
        summary.put("displayName", player.getDisplayName());
        summary.put("iconImageUri", uriToString(player.getIconImageUri()));
        summary.put("hiResImageUri", uriToString(player.getHiResImageUri()));
        return summary;
    }

    private String sanitizeSnapshotName(String value) {
        String safeValue = value == null || value.trim().isEmpty()
            ? DEFAULT_SNAPSHOT_NAME
            : value.trim();

        safeValue = safeValue.replaceAll("[^A-Za-z0-9._~-]", "_");

        if (safeValue.length() > 100) {
            return safeValue.substring(0, 100);
        }

        return safeValue;
    }

    private JSObject readSnapshotPayload(Snapshot snapshot)
        throws JSONException {
        if (snapshot == null || snapshot.getSnapshotContents() == null) {
            return null;
        }

        byte[] bytes = snapshot.getSnapshotContents().readFully();

        if (bytes == null || bytes.length == 0) {
            return null;
        }

        String json = new String(bytes, StandardCharsets.UTF_8);
        return JSObject.fromJSONObject(new JSONObject(json));
    }

    private JSObject snapshotMetadata(Snapshot snapshot) {
        if (snapshot == null) {
            return null;
        }

        return metadataToObject(snapshot.getMetadata());
    }

    private JSObject metadataToObject(SnapshotMetadata metadata) {
        JSObject result = new JSObject();

        if (metadata == null) {
            return result;
        }

        result.put("snapshotId", metadata.getSnapshotId());
        result.put("uniqueName", metadata.getUniqueName());
        result.put("description", metadata.getDescription());
        result.put("lastModifiedTimestamp", metadata.getLastModifiedTimestamp());
        result.put("playedTime", metadata.getPlayedTime());
        result.put("progressValue", metadata.getProgressValue());
        result.put("changePending", metadata.hasChangePending());

        return result;
    }

    private SnapshotMetadataChange createMetadataChange(JSObject payload) {
        SnapshotMetadataChange.Builder builder =
            new SnapshotMetadataChange.Builder();
        long progressValue = getNestedLong(
            payload,
            "worldChallenge",
            "stats",
            "bestCorrectCountries"
        );
        long playedTime = getNestedLong(
            payload,
            "worldChallenge",
            "stats",
            "totalPlayTimeMs"
        );

        builder.setDescription("Flag Game progress");

        if (progressValue >= 0) {
            builder.setProgressValue(progressValue);
        }

        if (playedTime >= 0) {
            builder.setPlayedTimeMillis(playedTime);
        }

        return builder.build();
    }

    private long getNestedLong(
        JSObject payload,
        String parentKey,
        String childKey,
        String valueKey
    ) {
        try {
            JSONObject parent = payload.getJSONObject(parentKey);
            JSONObject child = parent.getJSONObject(childKey);

            return Math.max(0, child.optLong(valueKey, -1));
        } catch (Exception error) {
            return -1;
        }
    }

    private void discardSnapshot(
        SnapshotsClient snapshotsClient,
        Snapshot snapshot
    ) {
        if (snapshot == null) {
            return;
        }

        try {
            snapshotsClient.discardAndClose(snapshot);
        } catch (Exception error) {
            Log.w(TAG, "Could not discard snapshot", error);
        }
    }

    private String getLeaderboardResourceName(String key) {
        switch (key) {
            case "world_challenge_progress":
                return "leaderboard_world_challenge_progress";
            case "world_challenge_streak":
                return "leaderboard_world_challenge_streak";
            case "world_challenge_fastest_195":
                return "leaderboard_world_challenge_fastest_195";
            default:
                return "";
        }
    }

    private String getAchievementResourceName(String key) {
        switch (key) {
            case "first_attempt":
                return "achievement_world_challenge_first_attempt";
            case "countries_25":
                return "achievement_world_challenge_countries_25";
            case "countries_50":
                return "achievement_world_challenge_countries_50";
            case "countries_100":
                return "achievement_world_challenge_countries_100";
            case "countries_150":
                return "achievement_world_challenge_countries_150";
            case "countries_195":
                return "achievement_world_challenge_countries_195";
            case "streak_50":
                return "achievement_world_challenge_streak_50";
            case "streak_100":
                return "achievement_world_challenge_streak_100";
            case "complete_one_life":
                return "achievement_world_challenge_complete_one_life";
            case "complete_no_lives_lost":
                return "achievement_world_challenge_complete_no_lives_lost";
            default:
                return "";
        }
    }

    private String getPlayGamesResource(String resourceName) {
        if (resourceName == null || resourceName.isEmpty()) {
            return "";
        }

        int resourceId = getContext()
            .getResources()
            .getIdentifier(resourceName, "string", getContext().getPackageName());

        if (resourceId == 0) {
            return "";
        }

        String value = getContext().getString(resourceId).trim();

        if (value.startsWith("<") && value.endsWith(">")) {
            return "";
        }

        return value;
    }

    private String sanitizeScoreTag(String value) {
        String safeValue = value == null ? "" : value.trim();

        safeValue = safeValue.replaceAll("[^A-Za-z0-9._~-]", "_");

        if (safeValue.length() > 64) {
            return safeValue.substring(0, 64);
        }

        return safeValue;
    }

    private void launchPlayGamesIntent(
        Activity activity,
        Intent intent,
        int requestCode
    ) {
        activity.startActivityForResult(intent, requestCode);
    }

    private String uriToString(Uri uri) {
        return uri == null ? null : uri.toString();
    }

    private JSObject structuredError(String code, String message, Exception error) {
        JSObject payload = new JSObject();
        payload.put("code", code);
        payload.put("message", message);

        if (error != null) {
            payload.put("nativeMessage", error.getMessage());
        }

        return payload;
    }
}
