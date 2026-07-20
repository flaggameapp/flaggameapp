const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const WorldChallenge = require("../js/world-challenge.js");

function loadCountries() {
  const context = {};
  const source = fs.readFileSync(
    path.join(__dirname, "..", "js", "countries.js"),
    "utf8"
  );

  vm.runInNewContext(`${source}; this.countries = countries;`, context);

  return context.countries;
}

function getCountryName(code, country) {
  return `${country.name} (${code})`;
}

function createGame(overrides = {}) {
  return WorldChallenge.createGame({
    countries: loadCountries(),
    seed: "test-seed",
    now: () => 1_000,
    getCountryName,
    ...overrides
  });
}

function optionIds(question) {
  return question.options.map(option => option.id);
}

function answerCurrentCorrectly(state) {
  return WorldChallenge.answer(
    state,
    state.currentQuestion.correctId,
    {
      questionId: state.currentQuestion.questionId,
      now: () => 2_000
    }
  ).state;
}

function advance(state) {
  return WorldChallenge.advance(state, {
    now: () => 2_000,
    getCountryName
  });
}

function testCreateGame() {
  const state = createGame();

  assert.equal(state.mode, "world_challenge");
  assert.equal(state.legacyMode, "expert");
  assert.equal(state.status, "playing");
  assert.equal(state.countriesTotal, 195);
  assert.equal(state.lives, 5);
  assert.equal(state.correctCount, 0);
  assert.equal(state.currentQuestion.options.length, 4);
  assert.equal(new Set(optionIds(state.currentQuestion)).size, 4);
  assert.equal(
    optionIds(state.currentQuestion).filter(
      id => id === state.currentQuestion.correctId
    ).length,
    1
  );
}

function testCorrectAnswer() {
  let state = createGame();
  const correctId = state.currentQuestion.correctId;
  const result = WorldChallenge.answer(state, correctId, {
    questionId: state.currentQuestion.questionId,
    now: () => 3_000
  });

  state = result.state;

  assert.equal(result.result.accepted, true);
  assert.equal(result.result.correct, true);
  assert.equal(state.status, "feedback");
  assert.equal(state.lives, 5);
  assert.equal(state.correctCount, 1);
  assert.deepEqual(state.answeredCorrect, [correctId]);
  assert.equal(state.currentStreak, 1);
  assert.equal(state.bestStreak, 1);
}

function testIncorrectAnswerQueuesRetry() {
  let state = createGame();
  const wrongId = state.currentQuestion.options.find(
    option => option.id !== state.currentQuestion.correctId
  ).id;
  const correctId = state.currentQuestion.correctId;
  const result = WorldChallenge.answer(state, wrongId, {
    questionId: state.currentQuestion.questionId,
    now: () => 3_000
  });

  state = result.state;

  assert.equal(result.result.correct, false);
  assert.equal(state.status, "feedback");
  assert.equal(state.lives, 4);
  assert.equal(state.mistakes, 1);
  assert.equal(state.correctCount, 0);
  assert.equal(state.currentStreak, 0);
  assert.equal(state.retryQueue.length, 1);
  assert.equal(state.retryQueue[0].id, correctId);
}

function testSkipLosesLifeAndQueuesRetry() {
  let state = createGame();
  const correctId = state.currentQuestion.correctId;
  const result = WorldChallenge.skip(state, {
    questionId: state.currentQuestion.questionId,
    now: () => 3_000
  });

  state = result.state;

  assert.equal(result.result.skipped, true);
  assert.equal(state.status, "feedback");
  assert.equal(state.lives, 4);
  assert.equal(state.skips, 1);
  assert.equal(state.correctCount, 0);
  assert.equal(state.retryQueue[0].id, correctId);
}

function testNoImmediateRetryWhenQueueHasCountries() {
  let state = createGame({ repeatDistance: 10 });
  const wrongId = state.currentQuestion.options.find(
    option => option.id !== state.currentQuestion.correctId
  ).id;
  const firstWrongCountry = state.currentQuestion.correctId;

  state = WorldChallenge.answer(state, wrongId, {
    questionId: state.currentQuestion.questionId,
    now: () => 3_000
  }).state;
  state = advance(state);

  assert.notEqual(state.currentQuestion.correctId, firstWrongCountry);
  assert.equal(state.retryQueue.some(item => item.id === firstWrongCountry), true);
}

function testAllowsShorterRetryWhenFewCountriesRemain() {
  let state = createGame({
    countries: loadCountries().slice(0, 4),
    requiredCountryCount: 4,
    repeatDistance: 10
  });
  const wrongId = state.currentQuestion.options.find(
    option => option.id !== state.currentQuestion.correctId
  ).id;
  const firstWrongCountry = state.currentQuestion.correctId;

  state = WorldChallenge.answer(state, wrongId, {
    questionId: state.currentQuestion.questionId,
    now: () => 3_000
  }).state;

  for (let index = 0; index < 3; index += 1) {
    state = advance(state);
    state = answerCurrentCorrectly(state);
  }

  state = advance(state);

  assert.equal(state.status, "playing");
  assert.equal(state.currentQuestion.correctId, firstWrongCountry);
}

function testGameOverAtZeroLives() {
  let state = createGame();

  for (let index = 0; index < 5; index += 1) {
    const wrongId = state.currentQuestion.options.find(
      option => option.id !== state.currentQuestion.correctId
    ).id;

    state = WorldChallenge.answer(state, wrongId, {
      questionId: state.currentQuestion.questionId,
      now: () => 1_000 + index * 1_000
    }).state;

    if (state.status !== "game_over") {
      state = advance(state);
    }
  }

  assert.equal(state.status, "game_over");
  assert.equal(state.lives, 0);
  assert.equal(state.mistakes, 5);
}

function testFinishAfterAllCountriesCorrect() {
  let state = createGame({
    countries: loadCountries().slice(0, 4),
    requiredCountryCount: 4
  });

  while (state.status === "playing" || state.status === "feedback") {
    if (state.status === "feedback") {
      state = advance(state);
      continue;
    }

    state = answerCurrentCorrectly(state);
  }

  assert.equal(state.status, "finished");
  assert.equal(state.correctCount, 4);
  assert.equal(state.answeredCorrect.length, 4);
  assert.equal(new Set(state.answeredCorrect).size, 4);
  assert.equal(state.lives, 5);
}

function testDuplicateAnswerIsBlocked() {
  let state = createGame();
  const questionId = state.currentQuestion.questionId;

  state = WorldChallenge.answer(state, state.currentQuestion.correctId, {
    questionId,
    now: () => 3_000
  }).state;

  const duplicate = WorldChallenge.answer(state, state.currentQuestion.correctId, {
    questionId,
    now: () => 4_000
  });

  assert.equal(duplicate.result.accepted, false);
  assert.equal(duplicate.result.reason, "not_playing");
  assert.equal(duplicate.state.correctCount, 1);
  assert.equal(duplicate.state.lives, 5);
}

function testStaleQuestionIsBlocked() {
  let state = createGame();
  const staleQuestionId = `${state.currentQuestion.questionId}:stale`;

  const result = WorldChallenge.answer(state, state.currentQuestion.correctId, {
    questionId: staleQuestionId,
    now: () => 3_000
  });

  assert.equal(result.result.accepted, false);
  assert.equal(result.result.reason, "stale_question");
  assert.equal(result.state.correctCount, 0);
}

function testContinueGameOnce() {
  let state = createGame();

  for (let index = 0; index < 5; index += 1) {
    const wrongId = state.currentQuestion.options.find(
      option => option.id !== state.currentQuestion.correctId
    ).id;

    state = WorldChallenge.answer(state, wrongId, {
      questionId: state.currentQuestion.questionId,
      now: () => 1_000 + index * 1_000
    }).state;

    if (state.status !== "game_over") {
      state = advance(state);
    }
  }

  const retryPending = state.retryQueue.length;
  const continued = WorldChallenge.continueGame(state, {
    now: () => 7_000
  });

  assert.equal(continued.result.accepted, true);
  assert.equal(continued.state.status, "feedback");
  assert.equal(continued.state.lives, 1);
  assert.equal(continued.state.continued, true);
  assert.equal(continued.state.rankingEligible, false);
  assert.equal(continued.state.retryQueue.length, retryPending);
  assert.equal(continued.state.endedAt, null);

  const second = WorldChallenge.continueGame(continued.state, {
    now: () => 8_000
  });

  assert.equal(second.result.accepted, false);
  assert.equal(second.result.reason, "not_game_over");

  state = advance(continued.state);
  assert.equal(state.status, "playing");
  assert.equal(state.lives, 1);
}

const tests = [
  testCreateGame,
  testCorrectAnswer,
  testIncorrectAnswerQueuesRetry,
  testSkipLosesLifeAndQueuesRetry,
  testNoImmediateRetryWhenQueueHasCountries,
  testAllowsShorterRetryWhenFewCountriesRemain,
  testGameOverAtZeroLives,
  testFinishAfterAllCountriesCorrect,
  testDuplicateAnswerIsBlocked,
  testStaleQuestionIsBlocked,
  testContinueGameOnce
];

tests.forEach(test => {
  test();
  console.log(`ok - ${test.name}`);
});
