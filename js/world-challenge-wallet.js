(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.FlagGameWorldChallengeWallet = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const STORAGE_KEY = "flagGameWorldChallengeWallet";
  const TEMP_KEY = "flagGameWorldChallengeWalletTemp";
  const SCHEMA_VERSION = 1;
  const CONTINUE_COST = 30;
  const HISTORY_LIMIT = 300;
  const REWARD_MILESTONES = [
    { countries: 25, coins: 5 },
    { countries: 50, coins: 5 },
    { countries: 75, coins: 10 },
    { countries: 100, coins: 10 },
    { countries: 125, coins: 15 },
    { countries: 150, coins: 20 },
    { countries: 175, coins: 25 },
    { countries: 195, coins: 50 }
  ];

  function getDefaultStorage() {
    if (
      typeof FlagGameStorage !== "undefined" &&
      FlagGameStorage
    ) {
      return FlagGameStorage;
    }

    const memoryStore = {};

    return {
      getRaw(key) {
        return Object.prototype.hasOwnProperty.call(memoryStore, key)
          ? memoryStore[key]
          : null;
      },
      setRaw(key, value) {
        memoryStore[key] = String(value);
        return true;
      },
      remove(key) {
        delete memoryStore[key];
        return true;
      }
    };
  }

  function toSafeInteger(value, fallback) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return fallback;
    }

    return Math.max(0, Math.floor(number));
  }

  function nowIso(now) {
    return new Date(now || Date.now()).toISOString();
  }

  function createTransactionId(now) {
    const timestamp = new Date(now || Date.now()).getTime().toString(36);
    const random = Math.random().toString(36).slice(2, 10);

    return `wc_tx_${timestamp}_${random}`;
  }

  function createEmptyWallet(now) {
    const createdAt = nowIso(now);

    return {
      schemaVersion: SCHEMA_VERSION,
      createdAt,
      updatedAt: createdAt,
      balance: 0,
      lifetimeEarned: 0,
      lifetimeSpent: 0,
      rewardedMilestones: {},
      transactionHistory: []
    };
  }

  function normalizeTransaction(transaction, now) {
    const source = transaction && typeof transaction === "object"
      ? transaction
      : {};
    const amount = toSafeInteger(source.amount, 0);

    return {
      ...source,
      transactionId: String(source.transactionId || createTransactionId(now)),
      type: String(source.type || "unknown"),
      amount,
      reason: String(source.reason || ""),
      runId: source.runId ? String(source.runId) : "",
      createdAt: source.createdAt
        ? nowIso(source.createdAt)
        : nowIso(now)
    };
  }

  function normalizeWallet(wallet, options) {
    const now = options && options.now;
    const empty = createEmptyWallet(now);
    const source = wallet && typeof wallet === "object"
      ? wallet
      : {};
    const rewardedMilestones =
      source.rewardedMilestones &&
      typeof source.rewardedMilestones === "object"
        ? source.rewardedMilestones
        : {};
    const seenTransactions = new Set();

    return {
      ...empty,
      ...source,
      schemaVersion: SCHEMA_VERSION,
      createdAt: source.createdAt ? nowIso(source.createdAt) : empty.createdAt,
      updatedAt: source.updatedAt ? nowIso(source.updatedAt) : empty.updatedAt,
      balance: toSafeInteger(source.balance, 0),
      lifetimeEarned: toSafeInteger(source.lifetimeEarned, 0),
      lifetimeSpent: toSafeInteger(source.lifetimeSpent, 0),
      rewardedMilestones: Object.keys(rewardedMilestones)
        .reduce((normalized, key) => {
          if (rewardedMilestones[key]) {
            normalized[String(key)] = true;
          }

          return normalized;
        }, {}),
      transactionHistory: (Array.isArray(source.transactionHistory)
        ? source.transactionHistory
        : []
      )
        .map(transaction => normalizeTransaction(transaction, now))
        .filter(transaction => {
          if (seenTransactions.has(transaction.transactionId)) {
            return false;
          }

          seenTransactions.add(transaction.transactionId);
          return true;
        })
        .slice(0, HISTORY_LIMIT)
    };
  }

  function parseStored(raw) {
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  function writeAtomic(storage, wallet) {
    const serialized = JSON.stringify(wallet);

    if (storage.setRaw) {
      const tempWritten = storage.setRaw(TEMP_KEY, serialized);

      if (tempWritten === false) {
        return false;
      }

      const finalWritten = storage.setRaw(STORAGE_KEY, serialized);

      if (finalWritten === false) {
        return false;
      }

      if (storage.remove) {
        storage.remove(TEMP_KEY);
      }

      return true;
    }

    if (storage.setJson) {
      return storage.setJson(STORAGE_KEY, wallet) !== false;
    }

    return false;
  }

  function readWallet(options) {
    const storage = (options && options.storage) || getDefaultStorage();
    const raw = storage.getRaw
      ? storage.getRaw(STORAGE_KEY)
      : "";

    return normalizeWallet(parseStored(raw), options || {});
  }

  function createTransaction(type, amount, reason, options) {
    const now = options && options.now;

    return {
      transactionId: (options && options.transactionId) ||
        createTransactionId(now),
      type,
      amount: toSafeInteger(amount, 0),
      reason,
      runId: options && options.runId ? String(options.runId) : "",
      createdAt: nowIso(now)
    };
  }

  function appendTransaction(wallet, transaction) {
    return {
      ...wallet,
      transactionHistory: [
        transaction,
        ...wallet.transactionHistory
      ].slice(0, HISTORY_LIMIT)
    };
  }

  function earnMilestoneRewards(correctCountries, options) {
    const storage = (options && options.storage) || getDefaultStorage();
    const now = (options && options.now) || Date.now();
    const runId = options && options.runId ? String(options.runId) : "";
    let wallet = readWallet({ ...(options || {}), storage, now });
    const transactions = [];

    REWARD_MILESTONES.forEach(milestone => {
      const key = String(milestone.countries);

      if (
        correctCountries >= milestone.countries &&
        !wallet.rewardedMilestones[key]
      ) {
        const transaction = createTransaction(
          "earn",
          milestone.coins,
          `world_challenge_milestone_${key}`,
          { now, runId }
        );

        wallet = appendTransaction(
          {
            ...wallet,
            balance: wallet.balance + milestone.coins,
            lifetimeEarned: wallet.lifetimeEarned + milestone.coins,
            rewardedMilestones: {
              ...wallet.rewardedMilestones,
              [key]: true
            }
          },
          transaction
        );
        transactions.push(transaction);
      }
    });

    wallet.updatedAt = nowIso(now);

    if (!transactions.length) {
      return {
        wallet,
        transactions,
        coinsEarned: 0,
        written: true
      };
    }

    const written = writeAtomic(storage, wallet);

    if (!written) {
      return {
        wallet: readWallet({ ...(options || {}), storage, now }),
        transactions: [],
        coinsEarned: 0,
        written: false
      };
    }

    return {
      wallet,
      transactions,
      coinsEarned: transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
      written
    };
  }

  function spendForContinue(runId, options) {
    const storage = (options && options.storage) || getDefaultStorage();
    const now = (options && options.now) || Date.now();
    const safeRunId = String(runId || "");
    let wallet = readWallet({ ...(options || {}), storage, now });
    const alreadyContinued = wallet.transactionHistory.some(transaction =>
      transaction.type === "spend" &&
      transaction.reason === "world_challenge_continue" &&
      transaction.runId === safeRunId
    );

    if (!safeRunId) {
      return {
        ok: false,
        reason: "missing_run_id",
        wallet
      };
    }

    if (alreadyContinued) {
      return {
        ok: false,
        reason: "already_continued",
        wallet
      };
    }

    if (wallet.balance < CONTINUE_COST) {
      return {
        ok: false,
        reason: "insufficient_balance",
        wallet
      };
    }

    const transaction = createTransaction(
      "spend",
      CONTINUE_COST,
      "world_challenge_continue",
      { now, runId: safeRunId }
    );
    const nextWallet = appendTransaction(
      {
        ...wallet,
        balance: wallet.balance - CONTINUE_COST,
        lifetimeSpent: wallet.lifetimeSpent + CONTINUE_COST,
        updatedAt: nowIso(now)
      },
      transaction
    );
    const written = writeAtomic(storage, nextWallet);

    if (!written) {
      return {
        ok: false,
        reason: "write_failed",
        wallet,
        transaction: null
      };
    }

    return {
      ok: true,
      reason: "continued",
      wallet: nextWallet,
      transaction
    };
  }

  return {
    CONTINUE_COST,
    REWARD_MILESTONES,
    SCHEMA_VERSION,
    STORAGE_KEY,
    createEmptyWallet,
    earnMilestoneRewards,
    normalizeWallet,
    readWallet,
    spendForContinue,
    writeWallet(wallet, options) {
      const storage = (options && options.storage) || getDefaultStorage();
      const now = (options && options.now) || Date.now();
      const normalized = normalizeWallet(wallet, { ...(options || {}), now });

      normalized.updatedAt = nowIso(now);

      return {
        wallet: normalized,
        written: writeAtomic(storage, normalized)
      };
    }
  };
});
