const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const WorldChallengeStorage =
  require("../js/world-challenge-storage.js");

function createMemoryStorage(initial = {}) {
  const store = { ...initial };

  return {
    store,
    getRaw(key) {
      return Object.prototype.hasOwnProperty.call(store, key)
        ? store[key]
        : null;
    },
    setRaw(key, value) {
      store[key] = String(value);
      return true;
    },
    remove(key) {
      delete store[key];
      return true;
    }
  };
}

function createRun(id, overrides = {}) {
  return {
    runId: id,
    startedAt: "2026-07-19T10:00:00.000Z",
    finishedAt: "2026-07-19T10:05:00.000Z",
    correctCountries: 12,
    wrongAnswers: 2,
    skips: 1,
    bestStreak: 6,
    elapsedMs: 300000,
    completed: false,
    livesRemaining: 2,
    continued: false,
    rankingEligible: false,
    platform: "web",
    gameVersion: "test",
    ...overrides
  };
}

function testFirstAccess() {
  const storage = createMemoryStorage();
  const data = WorldChallengeStorage.readData({ storage });

  assert.equal(data.schemaVersion, 1);
  assert.equal(data.mode, "world_challenge");
  assert.equal(data.stats.attempts, 0);
  assert.deepEqual(data.history, []);
}

function testEmptyStorage() {
  const storage = createMemoryStorage({
    flagGameWorldChallenge: ""
  });
  const data = WorldChallengeStorage.readData({ storage });

  assert.equal(data.stats.completions, 0);
  assert.equal(data.history.length, 0);
}

function testCorruptJson() {
  const storage = createMemoryStorage({
    flagGameWorldChallenge: "{not-json"
  });
  const data = WorldChallengeStorage.readData({ storage });
  const backupKeys = Object.keys(storage.store)
    .filter(key => key.startsWith("flagGameWorldChallengeBackup:"));

  assert.equal(data.stats.attempts, 0);
  assert.equal(backupKeys.length, 1);
  assert.equal(data.migrations.backups[0].reason, "invalid_json");
}

function testInterruptedRun() {
  const storage = createMemoryStorage();
  const result = WorldChallengeStorage.recordRun(
    createRun("interrupted", {
      correctCountries: 7,
      completed: false,
      livesRemaining: 3
    }),
    { storage }
  );

  assert.equal(result.data.stats.attempts, 1);
  assert.equal(result.data.stats.completions, 0);
  assert.equal(result.data.history[0].completed, false);
  assert.equal(result.data.history[0].livesRemaining, 3);
}

function testConsecutiveWritesAndDuplicateRunId() {
  const storage = createMemoryStorage();

  WorldChallengeStorage.recordRun(createRun("run-a"), { storage });
  WorldChallengeStorage.recordRun(createRun("run-b"), { storage });
  const duplicate = WorldChallengeStorage.recordRun(
    createRun("run-b", { correctCountries: 99 }),
    { storage }
  );

  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.data.stats.attempts, 2);
  assert.equal(duplicate.data.stats.totalCorrectAnswers, 24);
}

function testHistoryLimit() {
  const storage = createMemoryStorage();

  for (let index = 0; index < 105; index++) {
    WorldChallengeStorage.recordRun(
      createRun(`run-${index}`, {
        finishedAt: new Date(
          Date.UTC(2026, 6, 19, 10, index)
        ).toISOString()
      }),
      { storage }
    );
  }

  const data = WorldChallengeStorage.readData({ storage });

  assert.equal(data.stats.attempts, 105);
  assert.equal(data.history.length, 100);
  assert.equal(data.history[0].runId, "run-104");
}

function testCompletion195() {
  const storage = createMemoryStorage();
  const result = WorldChallengeStorage.recordRun(
    createRun("complete-195", {
      correctCountries: 195,
      wrongAnswers: 4,
      skips: 1,
      bestStreak: 80,
      elapsedMs: 1234567,
      completed: true,
      livesRemaining: 1
    }),
    { storage }
  );

  assert.equal(result.data.stats.completions, 1);
  assert.equal(result.data.stats.bestCorrectCountries, 195);
  assert.equal(result.data.stats.fastestCompletionMs, 1234567);
  assert.equal(result.data.history[0].rankingEligible, false);
}

function testMigrationTwice() {
  const storage = createMemoryStorage({
    flagGameWorldChallengeRecords: JSON.stringify({
      schemaVersion: 1,
      gamesPlayed: 3,
      bestProgress: 120,
      bestStreak: 30,
      bestCompletedSeconds: 900,
      futureField: "preserve"
    })
  });

  const first = WorldChallengeStorage.readData({ storage });
  const second = WorldChallengeStorage.readData({ storage });

  assert.equal(first.stats.attempts, 3);
  assert.equal(first.stats.bestCorrectCountries, 120);
  assert.equal(first.stats.fastestCompletionMs, 900000);
  assert.equal(first.legacyRecords.futureField, "preserve");
  assert.equal(second.migrations.backups.length, 1);
}

function testProfileKeepsLegacyExpert() {
  const profilePath = path.join(__dirname, "..", "js", "profile.js");
  const savedProfile = {
    schemaVersion: 2,
    totals: {
      gamesPlayed: 7,
      totalCorrect: 70,
      totalQuestions: 100,
      percentSum: 490,
      timeSecondsSum: 1000,
      timedGames: 7,
      bestStreak: 12,
      perfectGames: 1,
      fullRuns195: 0
    },
    modes: {
      expert: { gamesPlayed: 4 }
    },
    continentsCompleted: {},
    continentsPerfect: {},
    achievements: { unlocked: {} },
    events: { recorded: {} }
  };
  const storage = {
    value: savedProfile,
    createEventId: () => "generated",
    getJson: () => storage.value,
    setJson: (key, value) => {
      storage.value = value;
      return true;
    }
  };
  const context = {
    console,
    t: key => key,
    window: {},
    FlagGameStorage: storage
  };

  vm.runInNewContext(
    `${fs.readFileSync(profilePath, "utf8")}\nthis.__profile = FlagGameProfile;`,
    context,
    { filename: profilePath }
  );

  context.__profile.recordGame({
    eventId: "wc-profile",
    mode: "world_challenge",
    correct: 195,
    total: 195,
    percent: 100,
    bestStreak: 195,
    durationSeconds: 600,
    completedFullRun195: true
  });

  assert.equal(storage.value.modes.expert.gamesPlayed, 4);
  assert.equal(storage.value.modes.world_challenge.gamesPlayed, 1);
  assert.equal(storage.value.events.recorded["wc-profile"].mode, "world_challenge");
  assert.equal(storage.value.totals.fullRuns195, 1);
}

const tests = [
  testFirstAccess,
  testEmptyStorage,
  testCorruptJson,
  testInterruptedRun,
  testConsecutiveWritesAndDuplicateRunId,
  testHistoryLimit,
  testCompletion195,
  testMigrationTwice,
  testProfileKeepsLegacyExpert
];

tests.forEach(test => {
  test();
  console.log(`ok - ${test.name}`);
});
