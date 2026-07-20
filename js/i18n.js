let translations = {};
let currentLanguage = "en";
let languageLoadRequestId = 0;

const fallbackTranslations = {
  en: {
    appName: "Flag Game",
    loading: "Loading...",
    languageSelectLabel: "Select language",
    soundOnLabel: "Enable sounds",
    soundOffLabel: "Disable sounds",
    exit: "← Exit",
    question: "Which country does this flag belong to?",
    points: "points",
    pointCount_one: "{count} point",
    pointCount_other: "{count} points",
    countryCount_one: "{count} country",
    countryCount_other: "{count} countries",
    questionProgress: "Question {current} of {total}",
    resultTotal: "of {total}",
    accuracyValue: "{percent}% accuracy",
    scoreValue: "{label}: {value}",
    score: "Score",
    challengeResultSummary:
      "{correct} correct, {errors} errors, {time}, streak {streak}",
    matchSummaryLabel: "Match summary",
    worldChallengeTitle: "World Challenge",
    worldChallengeModeSubtitle: "Expert Mode",
    worldChallengeTeaser: "Identify all 195 flags before losing your five lives.",
    worldChallengeRestored: "Game restored on this device.",
    worldChallengeStatusLabel: "World Challenge status",
    worldChallengeIdentified: "Countries identified",
    worldChallengeIdentifiedShort: "Identified",
    worldChallengeQuestion: "Which country does this flag belong to?",
    worldChallengeOptionsLabel: "Answer choices",
    worldChallengeSkip: "I don't know",
    worldChallengeLivesRemaining: "Lives remaining: {count} of {total}",
    worldChallengeFeedbackCorrect: "Correct! You kept your lives.",
    worldChallengeFeedbackIncorrect: "Incorrect. The correct answer is {country}. You lost 1 life.",
    worldChallengeFeedbackSkip: "Skipped. The correct answer is {country}. You lost 1 life.",
    worldChallengeFinished: "World Challenge complete",
    worldChallengeFinishedSubtitle: "You correctly identified all 195 flags.",
    worldChallengeGameOver: "Game over",
    worldChallengeGameOverSubtitle: "You identified {count} of {total} countries.",
    worldChallengeNoRecord: "No personal record yet",
    worldChallengeRecordPreview: "Record: {progress}/{total} • best time: {bestTime}",
    worldChallengeContinueButton: "Continue for 30 coins",
    worldChallengeFinishButton: "View result",
    worldChallengeContinueOffer: "Use {cost} coins to continue with 1 life. Balance: {balance}.",
    worldChallengeContinueInsufficient: "You need {cost} coins to continue. Balance: {balance}.",
    worldChallengeContinueFailed: "Could not complete the continuation. No coins were spent.",
    worldChallengeCoinsEarned: "Coins earned",
    worldChallengeCoinBalance: "Balance",
    worldChallengeContinuationUsed: "Continuação",
    worldChallengeRankingEligibility: "Future ranking",
    worldChallengeRankingEligible: "Elegível",
    worldChallengeRankingNotEligible: "Não elegível",
    worldChallengeRankingUnavailable: "Indisponível",
    worldChallengeYes: "Yes",
    worldChallengeNo: "Não",
    androidDisclosureMessage: "Compete on the global leaderboard and keep your progress saved in the Android app.",
    androidDisclosureInstall: "Install Android app",
    cloudSaveLocal: "Saved locally",
    cloudSaveSyncing: "Syncing",
    cloudSaveSynced: "Saved with Google Play",
    cloudSavePending: "Sync pending",
    cloudSaveError: "Sync error",
    playGamesStatusTitle: "Google Play Games",
    playGamesStatusChecking: "Checking status...",
    playGamesStatusAuthenticated: "Connected to Google Play Games",
    playGamesStatusUnavailable: "Google Play Games indisponível",
    playGamesStatusPending: "Sincronização do Play Games pendente",
    playGamesStatusSubmitted: "Play Games updated",
    openPlayGamesLeaderboards: "Open leaderboards",
    openPlayGamesAchievements: "Open achievements"
  },
  "pt-BR": {
    appName: "Flag Game",
    loading: "Carregando...",
    languageSelectLabel: "Selecionar idioma",
    soundOnLabel: "Ativar sons",
    soundOffLabel: "Desativar sons",
    exit: "← Sair",
    question: "De qual país é esta bandeira?",
    points: "pontos",
    pointCount_one: "{count} ponto",
    pointCount_other: "{count} pontos",
    countryCount_one: "{count} país",
    countryCount_other: "{count} países",
    questionProgress: "Pergunta {current} de {total}",
    resultTotal: "de {total}",
    accuracyValue: "{percent}% de acertos",
    scoreValue: "{label}: {value}",
    score: "Pontuação",
    challengeResultSummary:
      "{correct} acertos, {errors} erros, {time}, sequência {streak}",
    matchSummaryLabel: "Resumo da partida",
    worldChallengeTitle: "Desafio Mundial",
    worldChallengeModeSubtitle: "Modo Experiente",
    worldChallengeTeaser: "Identifique as 195 bandeiras antes de perder suas cinco vidas.",
    worldChallengeRestored: "Partida restaurada neste dispositivo.",
    worldChallengeStatusLabel: "Status do Desafio Mundial",
    worldChallengeIdentified: "Países identificados",
    worldChallengeIdentifiedShort: "Identificados",
    worldChallengeQuestion: "A qual país pertence esta bandeira?",
    worldChallengeOptionsLabel: "Alternativas de resposta",
    worldChallengeSkip: "Não sei",
    worldChallengeLivesRemaining: "Vidas restantes: {count} de {total}",
    worldChallengeFeedbackCorrect: "Correto! Você manteve suas vidas.",
    worldChallengeFeedbackIncorrect: "Errado. A resposta correta é {country}. Você perdeu 1 vida.",
    worldChallengeFeedbackSkip: "Pulado. A resposta correta é {country}. Você perdeu 1 vida.",
    worldChallengeFinished: "Desafio Mundial concluído",
    worldChallengeFinishedSubtitle: "Você identificou corretamente as 195 bandeiras.",
    worldChallengeGameOver: "Fim de jogo",
    worldChallengeGameOverSubtitle: "Você identificou {count} de {total} países.",
    worldChallengeNoRecord: "Nenhum recorde pessoal ainda",
    worldChallengeRecordPreview: "Recorde: {progress}/{total} • melhor tempo: {bestTime}",
    worldChallengeContinueButton: "Continuar por 30 moedas",
    worldChallengeFinishButton: "Ver resultado",
    worldChallengeContinueOffer: "Use {cost} moedas para continuar com 1 vida. Saldo: {balance}.",
    worldChallengeContinueInsufficient: "Você precisa de {cost} moedas para continuar. Saldo: {balance}.",
    worldChallengeContinueFailed: "Não foi possível concluir a continuação. Nenhuma moeda foi gasta.",
    worldChallengeCoinsEarned: "Moedas recebidas",
    worldChallengeCoinBalance: "Saldo",
    worldChallengeContinuationUsed: "Continua??o",
    worldChallengeRankingEligibility: "Ranking futuro",
    worldChallengeRankingEligible: "Eleg?vel",
    worldChallengeRankingNotEligible: "Não elegível",
    worldChallengeRankingUnavailable: "Indisponível",
    worldChallengeYes: "Sim",
    worldChallengeNo: "Não",
    androidDisclosureMessage: "Dispute o ranking global e mantenha seu progresso salvo no aplicativo Android.",
    androidDisclosureInstall: "Instalar aplicativo Android",
    cloudSaveLocal: "Salvo localmente",
    cloudSaveSyncing: "Sincronizando",
    cloudSaveSynced: "Salvo com Google Play",
    cloudSavePending: "Sincronização pendente",
    cloudSaveError: "Erro de sincronização",
    playGamesStatusTitle: "Google Play Games",
    playGamesStatusChecking: "Verificando status...",
    playGamesStatusAuthenticated: "Conectado ao Google Play Games",
    playGamesStatusUnavailable: "Google Play Games indispon?vel",
    playGamesStatusPending: "Sincronização do Play Games pendente",
    playGamesStatusSubmitted: "Play Games atualizado",
    openPlayGamesLeaderboards: "Abrir ranking",
    openPlayGamesAchievements: "Abrir conquistas"
  },
  fr: {
    appName: "Flag Game",
    loading: "Chargement...",
    languageSelectLabel: "Sélectionner la langue",
    soundOnLabel: "Activer les sons",
    soundOffLabel: "Désactiver les sons",
    exit: "← Quitter",
    question: "À quel pays appartient ce drapeau ?",
    points: "points",
    pointCount_one: "{count} point",
    pointCount_other: "{count} points",
    countryCount_one: "{count} pays",
    countryCount_other: "{count} pays",
    questionProgress: "Question {current} sur {total}",
    resultTotal: "sur {total}",
    accuracyValue: "{percent}% de bonnes réponses",
    scoreValue: "{label} : {value}",
    score: "Score",
    challengeResultSummary:
      "{correct} bonnes réponses, {errors} erreurs, {time}, série {streak}",
    matchSummaryLabel: "Résumé de la partie",
    worldChallengeTitle: "Défi mondial",
    worldChallengeModeSubtitle: "Mode expert",
    worldChallengeTeaser: "Identifiez les 195 drapeaux avant de perdre vos cinq vies.",
    worldChallengeRestored: "Partie restaurée sur cet appareil.",
    worldChallengeStatusLabel: "État du Défi mondial",
    worldChallengeIdentified: "Pays identifiés",
    worldChallengeIdentifiedShort: "Identifiés",
    worldChallengeQuestion: "À quel pays appartient ce drapeau ?",
    worldChallengeOptionsLabel: "Choix de réponse",
    worldChallengeSkip: "Je ne sais pas",
    worldChallengeLivesRemaining: "Vies restantes : {count} sur {total}",
    worldChallengeFeedbackCorrect: "Correct ! Vous conservez vos vies.",
    worldChallengeFeedbackIncorrect: "Incorrect. La bonne réponse est {country}. Vous perdez 1 vie.",
    worldChallengeFeedbackSkip: "Passé. La bonne réponse est {country}. Vous perdez 1 vie.",
    worldChallengeFinished: "Défi mondial terminé",
    worldChallengeFinishedSubtitle: "Vous avez identifié correctement les 195 drapeaux.",
    worldChallengeGameOver: "Partie terminée",
    worldChallengeGameOverSubtitle: "Vous avez identifié {count} pays sur {total}.",
    worldChallengeNoRecord: "Aucun record personnel pour le moment",
    worldChallengeRecordPreview: "Record : {progress}/{total} • meilleur temps : {bestTime}",
    worldChallengeContinueButton: "Continuer pour 30 pieces",
    worldChallengeFinishButton: "Voir le resultat",
    worldChallengeContinueOffer: "Utilisez {cost} pieces pour continuer avec 1 vie. Solde : {balance}.",
    worldChallengeContinueInsufficient: "Il faut {cost} pieces pour continuer. Solde : {balance}.",
    worldChallengeContinueFailed: "Impossible de terminer la continuation. Aucune piece n'a ete depensee.",
    worldChallengeCoinsEarned: "Pieces recues",
    worldChallengeCoinBalance: "Solde",
    worldChallengeContinuationUsed: "Continuation",
    worldChallengeRankingEligibility: "Classement futur",
    worldChallengeRankingEligible: "Eligible",
    worldChallengeRankingNotEligible: "Non eligible",
    worldChallengeRankingUnavailable: "Indisponible",
    worldChallengeYes: "Oui",
    worldChallengeNo: "Non",
    androidDisclosureMessage: "Disputez le classement global et gardez votre progression sauvegardee dans l'application Android.",
    androidDisclosureInstall: "Installer l'application Android"
  }
};

const supportedLanguages = [
  "pt-BR",
  "en",
  "es",
  "fr",
  "de",
  "it",
  "nl",
  "pl",
  "ru",
  "uk",
  "tr",
  "ar",
  "hi",
  "bn",
  "zh-CN",
  "ja",
  "ko",
  "id",
  "vi",
  "th"
];

function normalizeLanguage(language) {
  const value = String(language || "")
    .trim()
    .replace("_", "-");

  if (!value) {
    return "";
  }

  if (supportedLanguages.includes(value)) {
    return value;
  }

  const lowerValue = value.toLowerCase();
  const exactMatch = supportedLanguages.find(
    supported => supported.toLowerCase() === lowerValue
  );

  if (exactMatch) {
    return exactMatch;
  }

  const shortLanguage = lowerValue.split("-")[0];

  if (shortLanguage === "pt") {
    return "pt-BR";
  }

  if (shortLanguage === "zh") {
    return "zh-CN";
  }

  return supportedLanguages.includes(shortLanguage)
    ? shortLanguage
    : "";
}

function detectBrowserLanguage() {
  const browserLanguage = navigator.language || "en";
  return normalizeLanguage(browserLanguage) || "en";
}

function getRuntimeAssetUrl(path) {
  if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    typeof chrome.runtime.getURL === "function"
  ) {
    return chrome.runtime.getURL(path);
  }

  if (
    typeof browser !== "undefined" &&
    browser.runtime &&
    typeof browser.runtime.getURL === "function"
  ) {
    return browser.runtime.getURL(path);
  }

  return "";
}

function getTranslationUrls(language) {
  const path = `locales/${language}.json`;
  const urls = [
    getRuntimeAssetUrl(path),
    new URL(path, document.baseURI).href,
    path
  ].filter(Boolean);

  return [...new Set(urls)];
}

async function fetchTranslations(language) {
  if (
    typeof window !== "undefined" &&
    window.FlagGameLocales &&
    window.FlagGameLocales[language]
  ) {
    return window.FlagGameLocales[language];
  }

  let lastError = null;

  for (const url of getTranslationUrls(language)) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Não foi possível carregar ${url}: ${response.status}`
        );
      }

      return response.json();

    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Não foi possível carregar o idioma.");
}

function getStoredLanguage() {
  if (typeof FlagGameStorage !== "undefined") {
    return FlagGameStorage.getString("language", "");
  }

  return localStorage.getItem("language") || "";
}

function setStoredLanguage(language) {
  if (typeof FlagGameStorage !== "undefined") {
    FlagGameStorage.setString("language", language);
    return;
  }

  localStorage.setItem("language", language);
}

function finishLanguageLoad(language) {
  setStoredLanguage(language);

  document.documentElement.lang = language;
  document.documentElement.dir =
    language === "ar" ? "rtl" : "ltr";

  applyTranslations();

  const languageSelect =
    document.querySelector("#idioma");

  if (languageSelect) {
    languageSelect.value = language;
  }
}

async function loadLanguage(language) {
  const requestId = ++languageLoadRequestId;
  const normalizedLanguage =
    normalizeLanguage(language) || detectBrowserLanguage();

  currentLanguage = normalizedLanguage;

  try {
    const loadedTranslations =
      await fetchTranslations(normalizedLanguage);

    if (requestId !== languageLoadRequestId) {
      return;
    }

    translations = loadedTranslations;
    finishLanguageLoad(normalizedLanguage);

  } catch (error) {
    if (requestId !== languageLoadRequestId) {
      return;
    }

    console.error("Erro ao carregar idioma:", error);
    translations =
      fallbackTranslations[normalizedLanguage] ||
      fallbackTranslations.en;
    finishLanguageLoad(normalizedLanguage);
  }
}

function interpolate(template, variables) {
  if (!variables) {
    return template;
  }

  return String(template).replace(
    /\{(\w+)\}/g,
    (match, name) => (
      Object.prototype.hasOwnProperty.call(variables, name)
        ? String(variables[name])
        : match
    )
  );
}

function hasTranslation(key) {
  return (
    Object.prototype.hasOwnProperty.call(translations, key) ||
    Object.prototype.hasOwnProperty.call(
      fallbackTranslations[currentLanguage] || {},
      key
    ) ||
    Object.prototype.hasOwnProperty.call(fallbackTranslations.en, key)
  );
}

function t(key, variables) {
  const languageFallback =
    fallbackTranslations[currentLanguage] || {};
  const template = Object.prototype.hasOwnProperty.call(
    translations,
    key
  )
    ? translations[key]
    : Object.prototype.hasOwnProperty.call(languageFallback, key)
      ? languageFallback[key]
      : Object.prototype.hasOwnProperty.call(fallbackTranslations.en, key)
        ? fallbackTranslations.en[key]
        : key;

  return interpolate(template, variables);
}

function tPlural(baseKey, count, variables) {
  const category = Number(count) === 1 ? "one" : "other";
  const pluralKey = `${baseKey}_${category}`;
  const fallbackKey = `${baseKey}_other`;
  const oneKey = `${baseKey}_one`;
  const key = hasTranslation(pluralKey)
    ? pluralKey
    : category === "one" && hasTranslation(oneKey)
      ? oneKey
      : fallbackKey;

  return t(key, {
    count,
    ...(variables || {})
  });
}

function getCountryName(countryCode) {
  try {
    const displayNames = new Intl.DisplayNames(
      [currentLanguage],
      { type: "region" }
    );

    return displayNames.of(countryCode);

  } catch (error) {
    const country = countries.find(
      pais => pais.code === countryCode
    );

    return country ? country.name : countryCode;
  }
}

function applyTranslations() {
  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {
      const key = element.dataset.i18n;

      if (hasTranslation(key)) {
        element.textContent = t(key);
      }
    });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {
      const key = element.dataset.i18nPlaceholder;

      if (hasTranslation(key)) {
        element.placeholder = t(key);
      }
    });

  document
    .querySelectorAll("[data-i18n-aria-label]")
    .forEach(element => {
      const key = element.dataset.i18nAriaLabel;

      if (hasTranslation(key)) {
        element.setAttribute("aria-label", t(key));
      }
    });

  document
    .querySelectorAll("[data-i18n-title]")
    .forEach(element => {
      const key = element.dataset.i18nTitle;

      if (hasTranslation(key)) {
        element.title = t(key);
      }
    });

  document
    .querySelectorAll("[data-i18n-alt]")
    .forEach(element => {
      const key = element.dataset.i18nAlt;

      if (hasTranslation(key)) {
        element.alt = t(key);
      }
    });

  if (hasTranslation("appName")) {
    document.title = t("appName");
  }

  if (typeof atualizarContadoresContinentes === "function") {
    atualizarContadoresContinentes();
  }

  if (
    typeof pontos !== "undefined" &&
    typeof pontosTexto !== "undefined" &&
    pontosTexto
  ) {
    pontosTexto.textContent =
      tPlural("pointCount", pontos);
  }

  document
    .querySelectorAll(".alternativa")
    .forEach(botao => {
      const countryCode =
        botao.dataset.countryCode;

      if (countryCode) {
        botao.textContent =
          getCountryName(countryCode);
      }
    });

  if (typeof atualizarBotaoSom === "function") {
    atualizarBotaoSom();
  }

  if (typeof refreshDynamicTranslations === "function") {
    refreshDynamicTranslations();
  }
}

async function initializeLanguage() {
  const savedLanguage = getStoredLanguage();
  const initialLanguage =
    normalizeLanguage(savedLanguage) || detectBrowserLanguage();

  await loadLanguage(initialLanguage);
}
