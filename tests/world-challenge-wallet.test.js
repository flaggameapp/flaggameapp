const assert = require("node:assert/strict");
const Wallet = require("../js/world-challenge-wallet.js");

function createMemoryStorage(initial = {}, options = {}) {
  const store = { ...initial };

  return {
    store,
    getRaw(key) {
      return Object.prototype.hasOwnProperty.call(store, key)
        ? store[key]
        : null;
    },
    setRaw(key, value) {
      if (options.failWrites && key === Wallet.STORAGE_KEY) {
        return false;
      }

      store[key] = String(value);
      return true;
    },
    remove(key) {
      delete store[key];
      return true;
    }
  };
}

function testDuplicateReward() {
  const storage = createMemoryStorage();
  const first = Wallet.earnMilestoneRewards(75, {
    storage,
    runId: "run-a",
    now: Date.UTC(2026, 6, 19)
  });
  const second = Wallet.earnMilestoneRewards(75, {
    storage,
    runId: "run-b",
    now: Date.UTC(2026, 6, 20)
  });

  assert.equal(first.coinsEarned, 20);
  assert.equal(second.coinsEarned, 0);
  assert.equal(second.wallet.balance, 20);
  assert.equal(second.wallet.transactionHistory.length, 3);
}

function testInsufficientBalance() {
  const storage = createMemoryStorage();
  const result = Wallet.spendForContinue("run-low", { storage });

  assert.equal(result.ok, false);
  assert.equal(result.reason, "insufficient_balance");
  assert.equal(result.wallet.balance, 0);
}

function testDoubleContinuation() {
  const initialWallet = {
    schemaVersion: 1,
    balance: 60,
    lifetimeEarned: 60,
    lifetimeSpent: 0,
    rewardedMilestones: {},
    transactionHistory: []
  };
  const storage = createMemoryStorage({
    [Wallet.STORAGE_KEY]: JSON.stringify(initialWallet)
  });
  const first = Wallet.spendForContinue("run-once", { storage });
  const second = Wallet.spendForContinue("run-once", { storage });

  assert.equal(first.ok, true);
  assert.equal(first.wallet.balance, 30);
  assert.equal(second.ok, false);
  assert.equal(second.reason, "already_continued");
  assert.equal(second.wallet.balance, 30);
}

function testPersistenceFailureDoesNotSpend() {
  const initialWallet = {
    schemaVersion: 1,
    balance: 40,
    lifetimeEarned: 40,
    lifetimeSpent: 0,
    rewardedMilestones: {},
    transactionHistory: []
  };
  const storage = createMemoryStorage({
    [Wallet.STORAGE_KEY]: JSON.stringify(initialWallet)
  }, { failWrites: true });
  const result = Wallet.spendForContinue("run-fail", { storage });
  const restored = Wallet.readWallet({ storage });

  assert.equal(result.ok, false);
  assert.equal(result.reason, "write_failed");
  assert.equal(restored.balance, 40);
  assert.equal(restored.lifetimeSpent, 0);
  assert.equal(restored.transactionHistory.length, 0);
}

function testStateRestoration() {
  const storage = createMemoryStorage({
    [Wallet.STORAGE_KEY]: JSON.stringify({
      schemaVersion: 1,
      balance: "45",
      lifetimeEarned: "75",
      lifetimeSpent: "30",
      rewardedMilestones: {
        25: true,
        50: true,
        75: false
      },
      transactionHistory: [
        {
          transactionId: "tx-a",
          type: "earn",
          amount: "5",
          reason: "world_challenge_milestone_25",
          runId: "run-a",
          createdAt: "2026-07-19T00:00:00.000Z"
        }
      ],
      futureField: "preserve"
    })
  });
  const wallet = Wallet.readWallet({ storage });

  assert.equal(wallet.balance, 45);
  assert.equal(wallet.lifetimeEarned, 75);
  assert.equal(wallet.lifetimeSpent, 30);
  assert.equal(wallet.rewardedMilestones["25"], true);
  assert.equal(wallet.rewardedMilestones["75"], undefined);
  assert.equal(wallet.transactionHistory[0].amount, 5);
  assert.equal(wallet.futureField, "preserve");
}

[
  testDuplicateReward,
  testInsufficientBalance,
  testDoubleContinuation,
  testPersistenceFailureDoesNotSpend,
  testStateRestoration
].forEach(test => {
  test();
  console.log(`ok - ${test.name}`);
});
