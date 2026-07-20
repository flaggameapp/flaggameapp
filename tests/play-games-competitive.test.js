const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createMemoryStorage(initial = {}) {
  const store = { ...initial };

  return {
    store,
    getJson(key, fallback) {
      return Object.prototype.hasOwnProperty.call(store, key)
        ? JSON.parse(store[key])
        : fallback;
    },
    setJson(key, value) {
      store[key] = JSON.stringify(value);
      return true;
    }
  };
}

function createRun(overrides = {}) {
  return {
    runId: "run-1",
    correctCountries: 195,
    wrongAnswers: 0,
    skips: 0,
    bestStreak: 120,
    elapsedMs: 900000,
    completed: true,
    livesRemaining: 5,
    continued: false,
    rankingEligible: true,
    ...overrides
  };
}

function createWorldData(overrides = {}) {
  return {
    stats: {
      attempts: 1,
      bestCorrectCountries: 195,
      bestStreak: 120,
      ...(
        overrides.stats || {}
      )
    },
    history: [
      createRun()
    ]
  };
}

function loadCompetitive(contextValues = {}) {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "js", "play-games-competitive.js"),
    "utf8"
  );
  const context = {
    console,
    setTimeout() {
      return 0;
    },
    clearTimeout() {},
    Date,
    Math,
    addEventListener() {},
    ...contextValues
  };

  vm.runInNewContext(source, context, {
    filename: "play-games-competitive.js"
  });

  return context.FlagGamePlayGamesCompetitive;
}

function createContext(options = {}) {
  const storage = options.storage || createMemoryStorage();
  const submittedScores = [];
  const unlockedAchievements = [];

  return {
    storage,
    submittedScores,
    unlockedAchievements,
    context: {
      FlagGameStorage: storage,
      FlagGamePlatform: {
        getCapabilities() {
          return {
            isAndroidApp: true,
            supportsPlayGames: true,
            supportsGlobalLeaderboards: true,
            supportsOfficialAchievements: true
          };
        }
      },
      FlagGamePlayGames: {
        available: true,
        getAuthenticationStatus: async () => ({
          authenticated: options.authenticated !== false
        }),
        submitLeaderboardScore: async payload => {
          if (options.failScores) {
            return {
              error: { code: "submit_failed" },
              status: "submit_failed"
            };
          }

          submittedScores.push(payload);
          return {
            authenticated: true,
            status: "leaderboard_score_submitted"
          };
        },
        unlockAchievement: async payload => {
          unlockedAchievements.push(payload.achievementKey);
          return {
            authenticated: true,
            status: "achievement_unlocked"
          };
        },
        openLeaderboards: async () => ({ status: "leaderboards_opened" }),
        openAchievements: async () => ({ status: "achievements_opened" })
      },
      FlagGameWorldChallengeStorage: {
        readData() {
          return options.worldData || createWorldData();
        }
      }
    }
  };
}

async function testSubmitsEligibleRunOnce() {
  const setup = createContext();
  const Competitive = loadCompetitive(setup.context);
  const run = createRun();
  const result = await Competitive.recordWorldChallengeRun({
    run,
    stats: createWorldData().stats
  });
  const duplicate = await Competitive.recordWorldChallengeRun({
    run,
    stats: createWorldData().stats
  });

  assert.equal(result.ok, true);
  assert.equal(duplicate.status, "already_submitted");
  assert.deepEqual(
    setup.submittedScores.map(item => item.leaderboardKey),
    [
      "world_challenge_progress",
      "world_challenge_streak",
      "world_challenge_fastest_195"
    ]
  );
}

async function testDoesNotSubmitIneligibleRun() {
  const setup = createContext();
  const Competitive = loadCompetitive(setup.context);
  const result = await Competitive.recordWorldChallengeRun({
    run: createRun({ rankingEligible: false }),
    stats: createWorldData().stats
  });

  assert.equal(result.status, "not_eligible");
  assert.equal(setup.submittedScores.length, 0);
}

async function testFailureQueuesRun() {
  const setup = createContext({ failScores: true });
  const Competitive = loadCompetitive(setup.context);
  await Competitive.recordWorldChallengeRun({
    run: createRun(),
    stats: createWorldData().stats
  });

  assert.equal(Competitive.readState().pendingRuns.length, 1);
}

async function testSyncsExistingLocalAchievementsIdempotently() {
  const setup = createContext();
  const Competitive = loadCompetitive(setup.context);
  const first = await Competitive.syncLocalAchievements();
  const second = await Competitive.syncLocalAchievements();

  assert.equal(first.ok, true);
  assert.equal(second.submitted, 0);
  assert(setup.unlockedAchievements.includes("first_attempt"));
  assert(setup.unlockedAchievements.includes("countries_195"));
  assert(setup.unlockedAchievements.includes("streak_100"));
  assert(setup.unlockedAchievements.includes("complete_no_lives_lost"));
}

(async () => {
  for (const test of [
    testSubmitsEligibleRunOnce,
    testDoesNotSubmitIneligibleRun,
    testFailureQueuesRun,
    testSyncsExistingLocalAchievementsIdempotently
  ]) {
    await test();
    console.log(`ok - ${test.name}`);
  }
})();
