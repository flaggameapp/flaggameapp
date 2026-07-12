const FlagGameProfile = (() => {
  const STORAGE_KEY = "flagGameProfile";
  const SCHEMA_VERSION = 2;
  const CONTINENTS = [
    "south-america",
    "north-america",
    "europe",
    "africa",
    "asia",
    "oceania"
  ];

  const ACHIEVEMENTS = [
    {
      id: "first-win",
      titleKey: "achievementFirstWinTitle",
      descriptionKey: "achievementFirstWinDescription",
      points: 10,
      isUnlocked: profile => profile.totals.gamesPlayed >= 1,
      getProgress: profile => progress(profile.totals.gamesPlayed, 1)
    },
    {
      id: "100-correct",
      titleKey: "achievement100CorrectTitle",
      descriptionKey: "achievement100CorrectDescription",
      points: 25,
      isUnlocked: profile => profile.totals.totalCorrect >= 100,
      getProgress: profile => progress(profile.totals.totalCorrect, 100)
    },
    {
      id: "1000-correct",
      titleKey: "achievement1000CorrectTitle",
      descriptionKey: "achievement1000CorrectDescription",
      points: 100,
      isUnlocked: profile => profile.totals.totalCorrect >= 1000,
      getProgress: profile => progress(profile.totals.totalCorrect, 1000)
    },
    {
      id: "all-continents",
      titleKey: "achievementAllContinentsTitle",
      descriptionKey: "achievementAllContinentsDescription",
      points: 75,
      isUnlocked: profile =>
        CONTINENTS.every(continent =>
          profile.continentsCompleted[continent]
        ),
      getProgress: profile => progress(
        CONTINENTS.filter(continent =>
          profile.continentsCompleted[continent]
        ).length,
        CONTINENTS.length
      )
    },
    {
      id: "195-flags",
      titleKey: "achievement195FlagsTitle",
      descriptionKey: "achievement195FlagsDescription",
      points: 75,
      isUnlocked: profile => profile.totals.fullRuns195 >= 1,
      getProgress: profile => progress(profile.totals.fullRuns195, 1)
    },
    {
      id: "10-perfect-games",
      titleKey: "achievement10PerfectGamesTitle",
      descriptionKey: "achievement10PerfectGamesDescription",
      points: 80,
      isUnlocked: profile => profile.totals.perfectGames >= 10,
      getProgress: profile => progress(profile.totals.perfectGames, 10)
    },
    {
      id: "50-games",
      titleKey: "achievement50GamesTitle",
      descriptionKey: "achievement50GamesDescription",
      points: 60,
      isUnlocked: profile => profile.totals.gamesPlayed >= 50,
      getProgress: profile => progress(profile.totals.gamesPlayed, 50)
    },
    continentExpertAchievement(
      "expert-europe",
      "achievementExpertEuropeTitle",
      "europe"
    ),
    continentExpertAchievement(
      "expert-africa",
      "achievementExpertAfricaTitle",
      "africa"
    ),
    continentExpertAchievement(
      "expert-asia",
      "achievementExpertAsiaTitle",
      "asia"
    ),
    continentExpertAchievement(
      "expert-oceania",
      "achievementExpertOceaniaTitle",
      "oceania"
    ),
    {
      id: "expert-america",
      titleKey: "achievementExpertAmericaTitle",
      descriptionKey: "achievementExpertAmericaDescription",
      points: 60,
      isUnlocked: profile =>
        profile.continentsPerfect["south-america"] &&
        profile.continentsPerfect["north-america"],
      getProgress: profile => progress(
        [
          "south-america",
          "north-america"
        ].filter(continent =>
          profile.continentsPerfect[continent]
        ).length,
        2
      )
    }
  ];

  function continentExpertAchievement(id, titleKey, continent) {
    return {
      id,
      titleKey,
      descriptionKey: "achievementContinentExpertDescription",
      points: 50,
      isUnlocked: profile => Boolean(
        profile.continentsPerfect[continent]
      ),
      getProgress: profile => progress(
        profile.continentsPerfect[continent] ? 1 : 0,
        1
      )
    };
  }

  function progress(current, target) {
    const safeCurrent = Math.min(current, target);

    return {
      current: safeCurrent,
      target,
      percent: target
        ? Math.round((safeCurrent / target) * 100)
        : 0
    };
  }

  function createEmptyProfile() {
    const now = new Date().toISOString();

    return {
      schemaVersion: SCHEMA_VERSION,
      createdAt: now,
      updatedAt: now,
      totals: {
        gamesPlayed: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        percentSum: 0,
        timeSecondsSum: 0,
        timedGames: 0,
        bestStreak: 0,
        perfectGames: 0,
        fullRuns195: 0
      },
      modes: {
        continent: { gamesPlayed: 0 },
        world: { gamesPlayed: 0 },
        expert: { gamesPlayed: 0 }
      },
      continentsCompleted: {},
      continentsPerfect: {},
      achievements: {
        unlocked: {}
      },
      events: {
        recorded: {}
      }
    };
  }

  function normalizeProfile(profile) {
    const emptyProfile = createEmptyProfile();

    return {
      ...emptyProfile,
      ...profile,
      schemaVersion: SCHEMA_VERSION,
      totals: {
        ...emptyProfile.totals,
        ...(profile && profile.totals)
      },
      modes: {
        ...emptyProfile.modes,
        ...(profile && profile.modes)
      },
      continentsCompleted: {
        ...emptyProfile.continentsCompleted,
        ...(profile && profile.continentsCompleted)
      },
      continentsPerfect: {
        ...emptyProfile.continentsPerfect,
        ...(profile && profile.continentsPerfect)
      },
      achievements: {
        ...emptyProfile.achievements,
        ...(profile && profile.achievements),
        unlocked: {
          ...emptyProfile.achievements.unlocked,
          ...(
            profile &&
            profile.achievements &&
            profile.achievements.unlocked
          )
        }
      },
      events: {
        ...emptyProfile.events,
        ...(profile && profile.events),
        recorded: {
          ...emptyProfile.events.recorded,
          ...(
            profile &&
            profile.events &&
            profile.events.recorded
          )
        }
      }
    };
  }

  function readProfile() {
    try {
      const savedProfile =
        FlagGameStorage.getJson(STORAGE_KEY, null);

      if (savedProfile) {
        return normalizeProfile(savedProfile);
      }

    } catch (error) {
      console.warn("Perfil local inválido:", error);
    }

    return createEmptyProfile();
  }

  function saveProfile(profile) {
    profile.updatedAt = new Date().toISOString();

    FlagGameStorage.setJson(STORAGE_KEY, profile);

    return profile;
  }

  function evaluateAchievements(profile) {
    const unlockedNow = [];
    const unlockedAt = new Date().toISOString();

    ACHIEVEMENTS.forEach(achievement => {
      if (
        !profile.achievements.unlocked[achievement.id] &&
        achievement.isUnlocked(profile)
      ) {
        profile.achievements.unlocked[achievement.id] = unlockedAt;
        unlockedNow.push(toAchievementState(achievement, profile));
      }
    });

    return unlockedNow;
  }

  function recordGame(gameResult) {
    const profile = readProfile();
    const eventId =
      gameResult.eventId || FlagGameStorage.createEventId();
    const mode = gameResult.mode || "continent";
    const durationSeconds =
      Number(gameResult.durationSeconds || 0);
    const percent = Number(gameResult.percent || 0);

    if (profile.events.recorded[eventId]) {
      return {
        profile,
        unlockedAchievements: []
      };
    }

    profile.totals.gamesPlayed++;
    profile.totals.totalCorrect += gameResult.correct;
    profile.totals.totalQuestions += gameResult.total;
    profile.totals.percentSum += percent;
    profile.totals.bestStreak = Math.max(
      profile.totals.bestStreak,
      gameResult.bestStreak || 0
    );

    if (percent === 100) {
      profile.totals.perfectGames++;
    }

    if (gameResult.total >= 195) {
      profile.totals.fullRuns195++;
    }

    if (durationSeconds > 0) {
      profile.totals.timeSecondsSum += durationSeconds;
      profile.totals.timedGames++;
    }

    if (!profile.modes[mode]) {
      profile.modes[mode] = { gamesPlayed: 0 };
    }

    profile.modes[mode].gamesPlayed++;

    if (
      gameResult.completedContinent &&
      gameResult.continent
    ) {
      profile.continentsCompleted[gameResult.continent] = true;

      if (percent === 100) {
        profile.continentsPerfect[gameResult.continent] = true;
      }
    }

    profile.events.recorded[eventId] = {
      eventId,
      mode,
      continent: gameResult.continent || "",
      correct: gameResult.correct,
      total: gameResult.total,
      percent,
      bestStreak: gameResult.bestStreak || 0,
      durationSeconds,
      createdAt: new Date().toISOString()
    };

    const unlockedAchievements =
      evaluateAchievements(profile);

    return {
      profile: saveProfile(profile),
      unlockedAchievements
    };
  }

  function getFavoriteMode(profile) {
    const entries = Object.entries(profile.modes);

    if (!profile.totals.gamesPlayed) {
      return "";
    }

    return entries.reduce((favorite, current) => {
      return current[1].gamesPlayed > favorite[1].gamesPlayed
        ? current
        : favorite;
    })[0];
  }

  function toAchievementState(achievement, profile) {
    const progressState = achievement.getProgress(profile);
    const unlockedAt =
      profile.achievements.unlocked[achievement.id] || "";

    return {
      id: achievement.id,
      title: t(achievement.titleKey),
      description: t(achievement.descriptionKey),
      titleKey: achievement.titleKey,
      descriptionKey: achievement.descriptionKey,
      points: achievement.points,
      unlocked: Boolean(unlockedAt),
      unlockedAt,
      progress: progressState
    };
  }

  function getAchievements() {
    const profile = readProfile();

    return ACHIEVEMENTS.map(achievement =>
      toAchievementState(achievement, profile)
    );
  }

  function getAchievementSummary() {
    const achievements = getAchievements();
    const unlocked = achievements.filter(
      achievement => achievement.unlocked
    );

    return {
      total: achievements.length,
      unlocked: unlocked.length,
      points: unlocked.reduce(
        (sum, achievement) => sum + achievement.points,
        0
      ),
      achievements
    };
  }

  function getSummary() {
    const profile = readProfile();
    const gamesPlayed = profile.totals.gamesPlayed;
    const averagePercent = gamesPlayed
      ? Math.round(profile.totals.percentSum / gamesPlayed)
      : 0;
    const averageTime = profile.totals.timedGames
      ? Math.round(
        profile.totals.timeSecondsSum /
        profile.totals.timedGames
      )
      : 0;

    return {
      gamesPlayed,
      totalCorrect: profile.totals.totalCorrect,
      averagePercent,
      bestStreak: profile.totals.bestStreak,
      averageTime,
      favoriteMode: getFavoriteMode(profile),
      continentsCompleted:
        Object.keys(profile.continentsCompleted)
    };
  }

  function getRankingPayload() {
    const profile = readProfile();
    const achievements = getAchievementSummary();

    return {
      source: "localStorage",
      exportedAt: new Date().toISOString(),
      publicStats: {
        gamesPlayed: profile.totals.gamesPlayed,
        totalCorrect: profile.totals.totalCorrect,
        averagePercent: profile.totals.gamesPlayed
          ? Math.round(
            profile.totals.percentSum /
            profile.totals.gamesPlayed
          )
          : 0,
        bestStreak: profile.totals.bestStreak,
        achievementPoints: achievements.points,
        achievementsUnlocked: achievements.unlocked
      },
      eventIds: Object.keys(
        profile.events && profile.events.recorded
          ? profile.events.recorded
          : {}
      )
    };
  }

  function getSyncPayload() {
    return {
      source: "localStorage",
      exportedAt: new Date().toISOString(),
      profile: readProfile(),
      ranking: getRankingPayload()
    };
  }

  return {
    getAchievements,
    getAchievementSummary,
    getRankingPayload,
    getSummary,
    getSyncPayload,
    recordGame
  };
})();
