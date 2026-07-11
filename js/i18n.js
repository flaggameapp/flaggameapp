let translations = {};
let currentLanguage = "en";

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

function detectBrowserLanguage() {
  const browserLanguage = navigator.language || "en";

  if (supportedLanguages.includes(browserLanguage)) {
    return browserLanguage;
  }

  const shortLanguage = browserLanguage.split("-")[0];

  if (shortLanguage === "pt") {
    return "pt-BR";
  }

  if (shortLanguage === "zh") {
    return "zh-CN";
  }

  if (supportedLanguages.includes(shortLanguage)) {
    return shortLanguage;
  }

  return "en";
}

async function loadLanguage(language) {
  try {
    const response = await fetch(`locales/${language}.json`);

    if (!response.ok) {
      throw new Error(
        `Não foi possível carregar o idioma: ${language}`
      );
    }

    translations = await response.json();
    currentLanguage = language;

    localStorage.setItem("language", language);

    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    applyTranslations();

    const languageSelect =
      document.querySelector("#idioma");

    if (languageSelect) {
      languageSelect.value = language;
    }

  } catch (error) {
    console.error("Erro ao carregar idioma:", error);
  }
}

function t(key) {
  return translations[key] || key;
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

      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

  atualizarContadoresContinentes();

  // Atualiza o placar da partida aberta
  if (
    typeof pontos !== "undefined" &&
    pontosTexto
  ) {
    pontosTexto.textContent =
      `${pontos} ${t("points")}`;
  }

  // Atualiza os países das alternativas abertas
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
}

async function initializeLanguage() {
  const savedLanguage =
    localStorage.getItem("language");

  const initialLanguage =
    savedLanguage || detectBrowserLanguage();

  await loadLanguage(initialLanguage);
}