const telaInicio = document.querySelector(".inicio");
const telaContinentes = document.querySelector("#tela-continentes");
const telaJogo = document.querySelector("#tela-jogo");

const telaMundo = document.querySelector("#tela-mundo");
const telaExperiente = document.querySelector("#tela-experiente");
const telaResultado = document.querySelector("#tela-resultado");
const telaResultadoExperiente =
  document.querySelector("#tela-resultado-experiente");
const logoHomeLink = document.querySelector("#logo-home-link");
const platformDisclosure =
  document.querySelector("#platform-disclosure");
const platformDisclosureInstall =
  document.querySelector("#platform-disclosure-install");
const cloudSyncStatus =
  document.querySelector("#cloud-sync-status");
const btnContinentes = document.querySelector("#btn-continentes");
const btnVoltarMundo = document.querySelector("#btn-voltar-mundo");
const btnMundo = document.querySelector("#btn-mundo");
const btnExperiente = document.querySelector("#btn-experiente");
const btnSairExperiente = document.querySelector("#btn-sair-experiente");
const experienteProgresso =
  document.querySelector("#experiente-progresso");

const experienteTempo =
  document.querySelector("#experiente-tempo");

const experienteBandeira =
  document.querySelector("#experiente-bandeira");

const experienteVidas =
  document.querySelector("#experiente-vidas");

const experienteAlternativas =
  document.querySelector("#experiente-alternativas");

const btnPular =
  document.querySelector("#btn-pular");

const experienteFeedback =
  document.querySelector("#experiente-feedback");

const experienteRestaurado =
  document.querySelector("#experiente-restaurado");

const worldContinuePanel =
  document.querySelector("#world-continue-panel");

const worldContinueMessage =
  document.querySelector("#world-continue-message");

const btnWorldContinue =
  document.querySelector("#btn-world-continue");

const btnWorldFinish =
  document.querySelector("#btn-world-finish");

const experienteAcertos =
  document.querySelector("#experiente-acertos");

const experientePuladas =
  document.querySelector("#experiente-puladas");

const experienteSequencia =
  document.querySelector("#experiente-sequencia");

const resultadoExperienteAcertos =
  document.querySelector("#resultado-experiente-acertos");

const resultadoExperientePuladas =
  document.querySelector("#resultado-experiente-puladas");

const resultadoExperienteTempo =
  document.querySelector("#resultado-experiente-tempo");

const resultadoExperienteErros =
  document.querySelector("#resultado-experiente-erros");

const resultadoExperienteSequencia =
  document.querySelector("#resultado-experiente-sequencia");

const resultadoExperienteMoedas =
  document.querySelector("#resultado-experiente-moedas");

const resultadoExperienteSaldo =
  document.querySelector("#resultado-experiente-saldo");

const resultadoExperienteContinuacao =
  document.querySelector("#resultado-experiente-continuacao");

const resultadoExperienteRanking =
  document.querySelector("#resultado-experiente-ranking");

const resultadoExperienteTitulo =
  document.querySelector("#resultado-experiente-titulo");

const resultadoExperienteSubtitulo =
  document.querySelector("#resultado-experiente-subtitulo");

const worldChallengeRecordsPreview =
  document.querySelector("#world-challenge-records-preview");

const btnReiniciarExperiente =
  document.querySelector("#btn-reiniciar-experiente");

const btnMenuExperiente =
  document.querySelector("#btn-menu-experiente");
const btnVoltar = document.querySelector("#btn-voltar");
const btnSairJogo = document.querySelector("#btn-sair-jogo");

const bandeiraAtual = document.querySelector("#bandeira-atual");
const alternativas = document.querySelector("#alternativas");
const progresso = document.querySelector("#progresso");
const pontosTexto = document.querySelector("#pontos");

const resultadoIcone = document.querySelector("#resultado-icone");
const resultadoMensagem = document.querySelector("#resultado-mensagem");
const resultadoPontos = document.querySelector("#resultado-pontos");
const resultadoTotal = document.querySelector("#resultado-total");
const resultadoPercentual = document.querySelector("#resultado-percentual");
const resultadoRecorde = document.querySelector("#resultado-recorde");
const resultadoMotivacao =
  document.querySelector("#resultado-motivacao");
const resultadoResumo =
  document.querySelector("#resultado-resumo");
const resultadoConquistas =
  document.querySelector("#resultado-conquistas");
const resultadoConquistasLista =
  document.querySelector("#resultado-conquistas-lista");

const btnJogarNovamente = document.querySelector("#btn-jogar-novamente");
const btnOutroContinente = document.querySelector("#btn-outro-continente");
const challengeCodeInput =
  document.querySelector("#challenge-code-input");
const btnPlayChallenge =
  document.querySelector("#btn-play-challenge");
const challengeEntryFeedback =
  document.querySelector("#challenge-entry-feedback");
const btnGenerateChallenge =
  document.querySelector("#btn-generate-challenge");
const btnCopyChallenge =
  document.querySelector("#btn-copy-challenge");
const challengeCodeBox =
  document.querySelector("#challenge-code-box");
const challengeCodeText =
  document.querySelector("#challenge-code");
const challengeCopyFeedback =
  document.querySelector("#challenge-copy-feedback");
const challengeTime =
  document.querySelector("#challenge-time");
const challengeCorrect =
  document.querySelector("#challenge-correct");
const challengeErrors =
  document.querySelector("#challenge-errors");
const challengeStreak =
  document.querySelector("#challenge-streak");
const challengeComparison =
  document.querySelector("#challenge-comparison");
const btnShareResult =
  document.querySelector("#btn-share-result");
const btnDownloadShare =
  document.querySelector("#btn-download-share");
const shareFeedback =
  document.querySelector("#share-feedback");
const btnShareExperiente =
  document.querySelector("#btn-share-experiente");
const btnDownloadShareExperiente =
  document.querySelector("#btn-download-share-experiente");
const shareFeedbackExperiente =
  document.querySelector("#share-feedback-experiente");

const telaAbout = document.querySelector("#tela-about");
const btnAbout = document.querySelector("#btn-about");
const btnFecharAbout = document.querySelector("#btn-fechar-about");

const telaPrivacy = document.querySelector("#tela-privacy");
const btnPrivacy = document.querySelector("#btn-privacy");
const btnFecharPrivacy = document.querySelector("#btn-fechar-privacy");

const telaProfile = document.querySelector("#tela-profile");
const btnProfile = document.querySelector("#btn-profile");
const btnFecharProfile = document.querySelector("#btn-fechar-profile");
const profileGames = document.querySelector("#profile-games");
const profileCorrect = document.querySelector("#profile-correct");
const profileAverage = document.querySelector("#profile-average");
const profileStreak = document.querySelector("#profile-streak");
const profileTime = document.querySelector("#profile-time");
const profileMode = document.querySelector("#profile-mode");
const profileContinents = document.querySelector("#profile-continents");
const rankingPlayerId =
  document.querySelector("#ranking-player-id");
const rankingNickname =
  document.querySelector("#ranking-nickname");
const rankingCountry =
  document.querySelector("#ranking-country");
const btnSaveRankingPlayer =
  document.querySelector("#btn-save-ranking-player");
const rankingPlayerFeedback =
  document.querySelector("#ranking-player-feedback");
const playGamesStatus =
  document.querySelector("#play-games-status");
const btnOpenPlayLeaderboards =
  document.querySelector("#btn-open-play-leaderboards");
const btnOpenPlayAchievements =
  document.querySelector("#btn-open-play-achievements");

const telaAchievements = document.querySelector("#tela-achievements");
const btnAchievements = document.querySelector("#btn-achievements");
const btnFecharAchievements =
  document.querySelector("#btn-fechar-achievements");
const achievementsCount =
  document.querySelector("#achievements-count");
const achievementsPoints =
  document.querySelector("#achievements-points");
const achievementsList =
  document.querySelector("#achievements-list");
const achievementToast =
  document.querySelector("#achievement-toast");

const btnSom = document.querySelector("#btn-som");

const languageSelect = document.querySelector("#idioma");
const platformCapabilities =
  FlagGamePlatform.getCapabilities();

let continenteAtual = "";
let perguntas = [];
let perguntaAtual = 0;
let pontos = 0;
let quantidadeMundo = 20;
let worldChallengeState = null;
let worldChallengeFeedbackTimer = null;
let worldChallengeRunId = null;
let worldChallengeRunRecorded = false;
let worldChallengeCoinsEarned = 0;
let worldChallengeRestoredFromCheckpoint = false;

let inicioExperiente = 0;
let inicioPartida = 0;
let intervaloExperiente = null;
let sequenciaPartida = 0;
let melhorSequenciaPartida = 0;
let desafioAtual = null;
let ultimoResultadoDesafio = null;
let ultimoCompartilhamento = null;
let ultimoCompartilhamentoExperiente = null;
let ultimoResumoResultado = null;
let ultimoConquistasResultado = [];
let somAtivo = FlagGameStorage.getString("sound", "") === "on";
let audioContext = null;
let logoCompartilhamento = null;

function atualizarBotaoSom() {
  btnSom.textContent = somAtivo ? "🔊" : "🔇";
  btnSom.classList.toggle("ativo", somAtivo);
  btnSom.setAttribute("aria-pressed", String(somAtivo));
  btnSom.setAttribute(
    "aria-label",
    somAtivo ? t("soundOffLabel") : t("soundOnLabel")
  );
}

function vibrar(padrao) {
  if (navigator.vibrate) {
    navigator.vibrate(padrao);
  }
}

function tocarSom(tipo) {
  if (!somAtivo) {
    return;
  }

  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  audioContext = audioContext || new AudioContext();

  const oscilador = audioContext.createOscillator();
  const ganho = audioContext.createGain();
  const agora = audioContext.currentTime;

  const frequencia =
    tipo === "erro" ? 180 :
    tipo === "recorde" ? 660 :
    520;

  oscilador.frequency.setValueAtTime(frequencia, agora);
  oscilador.type = "sine";

  ganho.gain.setValueAtTime(0.0001, agora);
  ganho.gain.exponentialRampToValueAtTime(0.08, agora + 0.01);
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.14);

  oscilador.connect(ganho);
  ganho.connect(audioContext.destination);

  oscilador.start(agora);
  oscilador.stop(agora + 0.15);
}

function destacarPlacar() {
  pontosTexto.classList.remove("placar-feedback");

  requestAnimationFrame(() => {
    pontosTexto.classList.add("placar-feedback");
  });
}

function getModeLabel(mode) {
  const labels = {
    continent: t("modeContinent"),
    world: t("modeWorld"),
    expert: t("expertModeTitle"),
    world_challenge: t("worldChallengeTitle")
  };

  return labels[mode] || "-";
}

function getContinentLabel(continent) {
  const labels = {
    "south-america": t("southAmerica"),
    "north-america": t("northAmerica"),
    europe: t("europe"),
    africa: t("africa"),
    asia: t("asia"),
    oceania: t("oceania"),
    world: t("worldLabel")
  };

  return labels[continent] || t("worldLabel");
}

function getResultadoVisual(percentual) {
  if (percentual === 100) {
    return { icon: "🏆", messageKey: "perfect" };
  }

  if (percentual >= 75) {
    return { icon: "🌟", messageKey: "excellent" };
  }

  if (percentual >= 50) {
    return { icon: "👏", messageKey: "good" };
  }

  return { icon: "🌱", messageKey: "keepLearning" };
}

function atualizarMensagemResultado(percentual) {
  const visual = getResultadoVisual(percentual);

  resultadoIcone.textContent = visual.icon;
  resultadoMensagem.textContent = t(visual.messageKey);
}

function formatarPontos(valor) {
  return tPlural("pointCount", valor);
}

function formatarProgressoPergunta(current, total) {
  return t("questionProgress", {
    current,
    total
  });
}

function formatarTotalResultado(total) {
  return t("resultTotal", {
    total
  });
}

function formatarPrecisao(percent) {
  return t("accuracyValue", {
    percent
  });
}

function formatarPontuacaoValor(value) {
  return t("scoreValue", {
    label: t("score"),
    value
  });
}

function criarItemResumo(label, value, destaque) {
  const item = document.createElement("div");
  item.className = destaque
    ? "resultado-resumo__item resultado-resumo__item--destaque"
    : "resultado-resumo__item";

  const valor = document.createElement("strong");
  valor.textContent = value;

  const rotulo = document.createElement("span");
  rotulo.textContent = label;

  item.append(valor, rotulo);

  return item;
}

function getMotivacaoResultado(dados) {
  if (dados.isNewRecord) {
    return t("newRecord");
  }

  if (dados.percentual === 100) {
    return t("perfect");
  }

  if (dados.recordeAnterior && dados.pontos + 1 >= dados.recordeAnterior) {
    return t("excellent");
  }

  if (dados.percentual >= 80) {
    return t("excellent");
  }

  if (dados.percentual >= 50) {
    return t("good");
  }

  return t("keepLearning");
}

function getTituloConquista(conquista) {
  return conquista.titleKey
    ? t(conquista.titleKey)
    : conquista.title;
}

function getDescricaoConquista(conquista) {
  return conquista.descriptionKey
    ? t(conquista.descriptionKey)
    : conquista.description;
}

function renderizarResumoResultado(dados) {
  resultadoResumo.replaceChildren();

  const erros = Math.max(dados.total - dados.pontos, 0);

  resultadoResumo.append(
    criarItemResumo(t("correctAnswers"), String(dados.pontos), true),
    criarItemResumo(t("errors"), String(erros), false),
    criarItemResumo(t("time"), formatarTempo(dados.durationSeconds), false),
    criarItemResumo(t("streak"), String(dados.bestStreak), false),
    criarItemResumo(t("accuracy"), formatarPrecisao(dados.percentual), true),
    criarItemResumo(
      t("score"),
      dados.recordeAnterior
        ? String(Math.max(dados.recordeAnterior, dados.pontos))
        : String(dados.pontos),
      dados.isNewRecord
    )
  );

  resultadoMotivacao.textContent =
    getMotivacaoResultado(dados);
}

function renderizarConquistasResultado(conquistas) {
  resultadoConquistasLista.replaceChildren();

  if (!conquistas.length) {
    resultadoConquistas.hidden = true;
    return;
  }

  resultadoConquistas.hidden = false;

  conquistas.forEach(conquista => {
    const item = document.createElement("div");
    item.className = "resultado-conquista";

    const icone = document.createElement("span");
    icone.className = "resultado-conquista__icone";
    icone.textContent = "*";

    const texto = document.createElement("div");

    const titulo = document.createElement("strong");
    titulo.textContent = getTituloConquista(conquista);

    const descricao = document.createElement("span");
    descricao.textContent =
      `${getDescricaoConquista(conquista)} - ${conquista.points} ${t("pointsAbbr")}`;

    texto.append(titulo, descricao);
    item.append(icone, texto);
    resultadoConquistasLista.appendChild(item);
  });
}

function desenharRetanguloArredondado(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function carregarImagem(src) {
  return new Promise((resolve, reject) => {
    const imagem = new Image();

    imagem.onload = () => resolve(imagem);
    imagem.onerror = reject;
    imagem.src = src;
  });
}

async function carregarLogoCompartilhamento() {
  if (!logoCompartilhamento) {
    logoCompartilhamento =
      await carregarImagem("assets/images/logo.png");
  }

  return logoCompartilhamento;
}

function desenharImagemContain(ctx, imagem, x, y, width, height) {
  const escala = Math.min(
    width / imagem.naturalWidth,
    height / imagem.naturalHeight
  );
  const largura = imagem.naturalWidth * escala;
  const altura = imagem.naturalHeight * escala;
  const destinoX = x + (width - largura) / 2;
  const destinoY = y + (height - altura) / 2;

  ctx.drawImage(imagem, destinoX, destinoY, largura, altura);
}

function criarTextoCompartilhamento(dados) {
  return (
    `Flag Game\n` +
    `${t("score")}: ${dados.score}\n` +
    `${t("correctAnswers")}: ${dados.percent}%\n` +
    `${t("mode")}: ${dados.mode}\n` +
    `${t("continent")}: ${dados.continent}\n` +
    `${t("time")}: ${dados.time}`
  );
}

async function criarImagemCompartilhamento(dados) {
  const canvas = document.createElement("canvas");
  const size = 1080;
  const ctx = canvas.getContext("2d");
  const logo = await carregarLogoCompartilhamento();

  canvas.width = size;
  canvas.height = size;

  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#2563eb");
  gradient.addColorStop(1, "#16a34a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "rgba(255, 255, 255, .14)";
  ctx.beginPath();
  ctx.arc(910, 150, 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(130, 930, 220, 0, Math.PI * 2);
  ctx.fill();

  desenharRetanguloArredondado(ctx, 90, 110, 900, 860, 42);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  desenharImagemContain(ctx, logo, 140, 128, 300, 130);

  ctx.fillStyle = "#111827";
  ctx.font = "700 72px Arial";
  ctx.fillText(t("resultLabel"), 150, 285);

  ctx.fillStyle = "#2563eb";
  ctx.font = "700 136px Arial";
  ctx.fillText(dados.score, 150, 440);

  ctx.fillStyle = "#6b7280";
  ctx.font = "700 38px Arial";
  ctx.fillText(formatarPrecisao(dados.percent), 150, 500);

  const items = [
    [t("mode"), dados.mode],
    [t("continent"), dados.continent],
    [t("time"), dados.time],
    [t("sharingLabel"), t("noPersonalData")]
  ];

  items.forEach((item, index) => {
    const y = 610 + index * 78;

    ctx.fillStyle = "#f8fafc";
    desenharRetanguloArredondado(ctx, 150, y - 42, 780, 58, 16);
    ctx.fill();

    ctx.fillStyle = "#6b7280";
    ctx.font = "700 24px Arial";
    ctx.fillText(item[0], 178, y - 7);

    ctx.fillStyle = "#111827";
    ctx.font = "700 28px Arial";
    ctx.fillText(item[1], 430, y - 7);
  });

  ctx.fillStyle = "#9ca3af";
  ctx.font = "700 24px Arial";
  ctx.fillText(t("shareImageFooter"), 150, 910);

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob);
    }, "image/png");
  });
}

function baixarImagem(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "flag-game-resultado.png";
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 1000);
}

function mostrarFeedbackCompartilhamento(elemento, mensagem) {
  elemento.textContent = mensagem;
  elemento.classList.add("ativo");

  setTimeout(() => {
    elemento.classList.remove("ativo");
  }, 2200);
}

function aplicarCapacidadesPlataforma() {
  document
    .querySelectorAll("[data-requires-capability]")
    .forEach(element => {
      const capability = element.dataset.requiresCapability;
      element.hidden = !Boolean(platformCapabilities[capability]);
    });
}

function renderizarDivulgacaoAndroid() {
  if (!platformDisclosure) {
    return;
  }

  const shouldShow =
    FlagGamePlatform.shouldShowAndroidDisclosure() &&
    telaInicio.style.display !== "none" &&
    !telaJogo.classList.contains("ativa") &&
    !telaExperiente.classList.contains("ativa");

  platformDisclosure.hidden = !shouldShow;

  if (!shouldShow || !platformDisclosureInstall) {
    return;
  }

  const playStoreUrl = FlagGamePlatform.getGooglePlayUrl();

  if (playStoreUrl) {
    platformDisclosureInstall.href = playStoreUrl;
    platformDisclosureInstall.hidden = false;
  } else {
    platformDisclosureInstall.removeAttribute("href");
    platformDisclosureInstall.hidden = true;
  }
}

function traduzirEstadoCloudSave(state) {
  const keyByState = {
    local_saved: "cloudSaveLocal",
    syncing: "cloudSaveSyncing",
    synced: "cloudSaveSynced",
    pending: "cloudSavePending",
    error: "cloudSaveError"
  };

  return t(keyByState[state] || "cloudSaveLocal");
}

function renderizarEstadoCloudSave(state) {
  if (!cloudSyncStatus || !platformCapabilities.supportsCloudSave) {
    return;
  }

  cloudSyncStatus.hidden = false;
  cloudSyncStatus.textContent = traduzirEstadoCloudSave(
    state && state.state
  );
  cloudSyncStatus.dataset.state = state && state.state
    ? state.state
    : "local_saved";
}

function traduzirEstadoPlayGames(state) {
  const keyByState = {
    authenticated: "playGamesStatusAuthenticated",
    not_authenticated: "playGamesStatusUnavailable",
    pending: "playGamesStatusPending",
    submitted: "playGamesStatusSubmitted",
    idle: "playGamesStatusChecking"
  };

  return t(keyByState[state] || "playGamesStatusUnavailable");
}

function renderizarEstadoPlayGames(state) {
  if (!playGamesStatus || !platformCapabilities.supportsPlayGames) {
    return;
  }

  playGamesStatus.textContent = traduzirEstadoPlayGames(
    state && state.status
  );
  playGamesStatus.dataset.state = state && state.status
    ? state.status
    : "idle";
}

function agendarEnvioPlayGamesWorldChallenge(run, stats) {
  if (
    typeof FlagGamePlayGamesCompetitive === "undefined" ||
    !platformCapabilities.supportsPlayGames
  ) {
    return;
  }

  FlagGamePlayGamesCompetitive.recordWorldChallengeRun({
    run,
    stats
  });
}

function agendarCloudSave(reason) {
  if (
    typeof FlagGameCloudSave === "undefined" ||
    !platformCapabilities.supportsCloudSave
  ) {
    return;
  }

  FlagGameCloudSave.scheduleSync(reason);
}

async function compartilharResultado(dados, feedback, baixarApenas) {
  const blob = await criarImagemCompartilhamento(dados);
  const texto = criarTextoCompartilhamento(dados);
  const arquivo = typeof File !== "undefined"
    ? new File(
      [blob],
      "flag-game-resultado.png",
      { type: "image/png" }
    )
    : null;

  if (baixarApenas) {
    baixarImagem(blob);
    mostrarFeedbackCompartilhamento(feedback, t("imageDownloaded"));
    return;
  }

  try {
    if (
      arquivo &&
      navigator.canShare &&
      navigator.canShare({ files: [arquivo] })
    ) {
      await navigator.share({
        title: "Flag Game",
        text: texto,
        files: [arquivo]
      });
      mostrarFeedbackCompartilhamento(feedback, t("readyToShare"));
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: "Flag Game",
        text: texto
      });
      baixarImagem(blob);
      mostrarFeedbackCompartilhamento(
        feedback,
        t("textSharedImageDownloaded")
      );
      return;
    }

  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }
  }

  baixarImagem(blob);
  copiarTexto(texto);
  mostrarFeedbackCompartilhamento(
    feedback,
    t("imageDownloadedTextCopied")
  );
}

function renderizarPerfil() {
  const summary = FlagGameProfile.getSummary();
  const player = platformCapabilities.supportsGlobalLeaderboards
    ? FlagGameRanking.getPlayer()
    : null;

  telaProfile.classList.toggle(
    "profile-empty",
    summary.gamesPlayed === 0
  );

  profileGames.textContent = summary.gamesPlayed;
  profileCorrect.textContent = summary.totalCorrect;
  profileAverage.textContent = `${summary.averagePercent}%`;
  profileStreak.textContent = summary.bestStreak;
  profileTime.textContent =
    formatarTempo(summary.averageTime);
  profileMode.textContent =
    getModeLabel(summary.favoriteMode);
  profileContinents.textContent =
    `${summary.continentsCompleted.length} / 6`;

  if (player) {
    rankingPlayerId.value = player.playerId;
    rankingNickname.value = player.nickname;
    rankingCountry.value = player.country;
  }
}

function salvarIdentidadeRanking() {
  if (!platformCapabilities.supportsGlobalLeaderboards) {
    return;
  }

  const player = FlagGameRanking.updatePlayer({
    nickname: rankingNickname.value,
    country: rankingCountry.value
  });

  rankingPlayerId.value = player.playerId;
  rankingNickname.value = player.nickname;
  rankingCountry.value = player.country;
  rankingPlayerFeedback.textContent =
    t("identitySaved");

  setTimeout(() => {
    rankingPlayerFeedback.textContent = "";
  }, 1800);
}

function registrarRankingLocal(gameResult) {
  const payload = FlagGameRanking.buildScorePayload(
    gameResult,
    FlagGameProfile.getSummary(),
    FlagGameProfile.getAchievementSummary()
  );

  FlagGameRanking.enqueueScore(payload);

  return payload;
}

function renderizarConquistas() {
  const summary = FlagGameProfile.getAchievementSummary();

  telaAchievements.classList.toggle(
    "achievements-empty",
    summary.unlocked === 0
  );

  achievementsCount.textContent =
    `${summary.unlocked} / ${summary.total}`;
  achievementsPoints.textContent = summary.points;
  achievementsList.replaceChildren();

  summary.achievements.forEach(achievement => {
    const item = document.createElement("div");
    const progressPercent =
      `${achievement.progress.percent}%`;

    item.className = achievement.unlocked
      ? "achievement-item unlocked"
      : "achievement-item";
    item.setAttribute("role", "listitem");

    const title = document.createElement("div");
    title.className = "achievement-title";

    const titleText = document.createElement("strong");
    titleText.textContent = getTituloConquista(achievement);

    const badge = document.createElement("span");
    badge.className = "achievement-badge";
    badge.textContent = achievement.unlocked
      ? t("completed")
      : `${achievement.points} ${t("pointsAbbr")}`;

    const description = document.createElement("span");
    description.textContent = getDescricaoConquista(achievement);

    const progressBar = document.createElement("div");
    progressBar.className = "achievement-progress";

    const progressFill = document.createElement("div");
    progressFill.style.setProperty("--progress", progressPercent);

    const progressText = document.createElement("span");
    progressText.textContent =
      `${achievement.progress.current} / ${achievement.progress.target}`;

    title.append(titleText, badge);
    progressBar.appendChild(progressFill);
    item.append(title, description, progressBar, progressText);

    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-label", getTituloConquista(achievement));
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute(
      "aria-valuemax",
      achievement.progress.target
    );
    progressBar.setAttribute(
      "aria-valuenow",
      achievement.progress.current
    );

    achievementsList.appendChild(item);
  });
}

function formatarResultadoDesafio(resultado) {
  return t("challengeResultSummary", {
    correct: resultado.correct,
    errors: resultado.errors,
    time: formatarTempo(resultado.durationSeconds),
    streak: resultado.bestStreak
  });
}

function criarDesafioNormal(mode, options) {
  return FlagGameChallenge.createConfig({
    mode,
    continent: options && options.continent,
    quantity: options && options.quantity
  });
}

function prepararPartidaDesafio(config) {
  desafioAtual = config;
  ultimoResultadoDesafio = null;
  challengeCodeText.textContent = config.code;
  challengeCodeBox.classList.remove("ativo");
  challengeCopyFeedback.classList.remove("ativo");
  challengeComparison.textContent = "";
}

function renderizarResultadoDesafio(resultado) {
  const localEntry =
    FlagGameChallenge.saveLocalResult(resultado);
  const bestResult = localEntry.bestResult;

  ultimoResultadoDesafio = resultado;
  challengeTime.textContent =
    formatarTempo(resultado.durationSeconds);
  challengeCorrect.textContent = resultado.correct;
  challengeErrors.textContent = resultado.errors;
  challengeStreak.textContent = resultado.bestStreak;

  atualizarComparacaoDesafio(resultado, bestResult);
}

function atualizarComparacaoDesafio(resultado, bestResult) {
  const storedResult =
    bestResult ||
    (
      desafioAtual &&
      FlagGameChallenge.getLocalResult(desafioAtual.code) &&
      FlagGameChallenge.getLocalResult(desafioAtual.code).bestResult
    );

  if (
    storedResult &&
    storedResult.completedAt !== resultado.completedAt
  ) {
    challengeComparison.textContent =
      `${t("localBestChallengeResult")} ` +
      formatarResultadoDesafio(storedResult);
  } else {
    challengeComparison.textContent =
      t("challengeSharePrompt");
  }
}

function refreshDynamicTranslations() {
  if (
    telaJogo.classList.contains("ativa") &&
    perguntas.length
  ) {
    progresso.textContent =
      formatarProgressoPergunta(
        perguntaAtual + 1,
        perguntas.length
      );
    pontosTexto.textContent =
      formatarPontos(pontos);
  }

  if (
    telaExperiente.classList.contains("ativa") &&
    worldChallengeState
  ) {
    renderizarWorldChallenge();
  }

  if (
    telaResultado.classList.contains("ativa") &&
    perguntas.length
  ) {
    const percentual = Math.round(
      (pontos / perguntas.length) * 100
    );

    resultadoPercentual.textContent =
      formatarPrecisao(percentual);
    resultadoTotal.textContent =
      formatarTotalResultado(perguntas.length);
    atualizarMensagemResultado(percentual);

    if (ultimoResumoResultado) {
      renderizarResumoResultado(ultimoResumoResultado);
      renderizarConquistasResultado(ultimoConquistasResultado);

      resultadoRecorde.textContent =
        ultimoResumoResultado.isNewRecord
          ? t("newRecord")
          : formatarPontuacaoValor(
            ultimoResumoResultado.recordeAnterior || pontos
          );
    }

    btnOutroContinente.textContent =
      continenteAtual === "world"
        ? t("backToMenu")
        : t("chooseAnotherContinent");

    if (ultimoCompartilhamento) {
      ultimoCompartilhamento.mode =
        continenteAtual === "world"
          ? getModeLabel("world")
          : getModeLabel("continent");
      ultimoCompartilhamento.continent =
        continenteAtual === "world"
          ? t("worldLabel")
          : getContinentLabel(continenteAtual);
    }
  }

  if (
    telaResultadoExperiente.classList.contains("ativa") &&
    ultimoCompartilhamentoExperiente
  ) {
    ultimoCompartilhamentoExperiente.mode =
      getModeLabel("world_challenge");
    ultimoCompartilhamentoExperiente.continent =
      t("worldLabel");
  }

  atualizarPreviewRecordeWorldChallenge();
  aplicarCapacidadesPlataforma();
  renderizarDivulgacaoAndroid();

  if (ultimoResultadoDesafio) {
    atualizarComparacaoDesafio(ultimoResultadoDesafio);
  }

  if (telaProfile.classList.contains("ativa")) {
    renderizarPerfil();
  }

  if (telaAchievements.classList.contains("ativa")) {
    renderizarConquistas();
  }
}

function mostrarConquistasDesbloqueadas(conquistas) {
  if (!conquistas.length) {
    return;
  }

  const conquista = conquistas[0];

  const titulo = document.createElement("strong");
  titulo.textContent = t("achievementUnlocked");

  const nome = document.createElement("span");
  nome.textContent = getTituloConquista(conquista);

  achievementToast.replaceChildren(titulo, nome);
  achievementToast.classList.add("ativo");
  vibrar([45, 30, 45]);
  tocarSom("recorde");

  setTimeout(() => {
    achievementToast.classList.remove("ativo");
  }, 2600);
}

atualizarBotaoSom();
aplicarCapacidadesPlataforma();
renderizarDivulgacaoAndroid();

// =========================
// NAVEGA��O
// =========================

function voltarParaHome() {
  registrarInterrupcaoWorldChallenge();
  clearInterval(intervaloExperiente);
  intervaloExperiente = null;
  limparTimerFeedbackWorldChallenge();

  [
    telaContinentes,
    telaJogo,
    telaMundo,
    telaExperiente,
    telaResultado,
    telaResultadoExperiente,
    telaSupport,
    telaAbout,
    telaPrivacy,
    telaProfile,
    telaAchievements
  ].forEach(tela => {
    tela.classList.remove("ativa");
  });

  telaInicio.style.display = "block";
  renderizarDivulgacaoAndroid();
}

logoHomeLink.addEventListener("click", event => {
  event.preventDefault();
  voltarParaHome();
});

btnSom.addEventListener("click", () => {
  somAtivo = !somAtivo;
  FlagGameStorage.setString("sound", somAtivo ? "on" : "off");
  atualizarBotaoSom();

  if (somAtivo) {
    tocarSom("acerto");
  }
});

btnContinentes.addEventListener("click", () => {
  telaInicio.style.display = "none";
  telaContinentes.classList.add("ativa");
});


btnVoltar.addEventListener("click", () => {
  telaContinentes.classList.remove("ativa");
  telaInicio.style.display = "block";
});

document.querySelectorAll(".continente").forEach(botao => {
  botao.addEventListener("click", () => {
    const continente = botao.dataset.continente;
    iniciarJogo(continente);
  });
});

btnSairJogo.addEventListener("click", () => {
  telaJogo.classList.remove("ativa");
  telaContinentes.classList.add("ativa");
});

btnJogarNovamente.addEventListener("click", () => {
  telaResultado.classList.remove("ativa");

  if (continenteAtual === "world") {
    iniciarJogoMundo();
  } else {
    iniciarJogo(continenteAtual);
  }
});
btnReiniciarExperiente.addEventListener("click", () => {
  telaResultadoExperiente.classList.remove("ativa");
  iniciarModoExperiente();
});

btnMenuExperiente.addEventListener("click", () => {
  telaResultadoExperiente.classList.remove("ativa");
  telaInicio.style.display = "block";
});


btnOutroContinente.addEventListener("click", () => {
  telaResultado.classList.remove("ativa");

  if (continenteAtual === "world") {
    telaJogo.classList.remove("ativa");
    telaMundo.classList.remove("ativa");
    telaInicio.style.display = "block";
  } else {
    telaContinentes.classList.add("ativa");
  }
});

btnMundo.addEventListener("click", () => {
  telaInicio.style.display = "none";

  telaJogo.classList.remove("ativa");
  telaResultado.classList.remove("ativa");
  telaContinentes.classList.remove("ativa");

  telaMundo.classList.add("ativa");
});

btnVoltarMundo.addEventListener("click", () => {
  telaMundo.classList.remove("ativa");
  telaInicio.style.display = "block";
});

btnPlayChallenge.addEventListener("click", () => {
  const config =
    FlagGameChallenge.parseCode(challengeCodeInput.value);

  if (!config) {
    challengeEntryFeedback.textContent =
      t("invalidChallengeCode");
    challengeCodeInput.focus();
    return;
  }

  challengeEntryFeedback.textContent = "";

  if (config.mode === "world") {
    quantidadeMundo = config.quantity;
    iniciarJogoMundo(config);
    return;
  }

  iniciarJogo(config.continent, config);
});

challengeCodeInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    btnPlayChallenge.click();
  }
});

btnGenerateChallenge.addEventListener("click", () => {
  if (!desafioAtual) {
    return;
  }

  challengeCodeText.textContent = desafioAtual.code;
  challengeCodeBox.classList.add("ativo");
});

btnCopyChallenge.addEventListener("click", () => {
  copiarTexto(challengeCodeText.textContent).then(() => {
    challengeCopyFeedback.classList.add("ativo");

    setTimeout(() => {
      challengeCopyFeedback.classList.remove("ativo");
    }, 1600);
  });
});

btnShareResult.addEventListener("click", () => {
  if (ultimoCompartilhamento) {
    compartilharResultado(
      ultimoCompartilhamento,
      shareFeedback,
      false
    );
  }
});

btnDownloadShare.addEventListener("click", () => {
  if (ultimoCompartilhamento) {
    compartilharResultado(
      ultimoCompartilhamento,
      shareFeedback,
      true
    );
  }
});

btnShareExperiente.addEventListener("click", () => {
  if (ultimoCompartilhamentoExperiente) {
    compartilharResultado(
      ultimoCompartilhamentoExperiente,
      shareFeedbackExperiente,
      false
    );
  }
});

btnDownloadShareExperiente.addEventListener("click", () => {
  if (ultimoCompartilhamentoExperiente) {
    compartilharResultado(
      ultimoCompartilhamentoExperiente,
      shareFeedbackExperiente,
      true
    );
  }
});

document.querySelectorAll(".quantidade").forEach(botao => {
  botao.addEventListener("click", () => {
    quantidadeMundo = Number(botao.dataset.quantidade);
    iniciarJogoMundo();
  });
});
btnExperiente.addEventListener("click", () => {
  iniciarModoExperiente();
});
btnSairExperiente.addEventListener("click", () => {
  registrarInterrupcaoWorldChallenge();
  clearInterval(intervaloExperiente);
  intervaloExperiente = null;
  limparTimerFeedbackWorldChallenge();

  telaExperiente.classList.remove("ativa");
  telaInicio.style.display = "block";
});

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatarTempo(segundosTotais) {
  const minutos =
    Math.floor(segundosTotais / 60);

  const segundos =
    segundosTotais % 60;

  return (
    `${String(minutos).padStart(2, "0")}:` +
    `${String(segundos).padStart(2, "0")}`
  );
}

function getWorldChallengeCountryName(code, country) {
  return getCountryName(code || (country && country.code));
}

function lerRecordesWorldChallenge() {
  return FlagGameWorldChallengeStorage.readData();
}

function lerCarteiraWorldChallenge() {
  return FlagGameWorldChallengeWallet.readWallet();
}

function criarRunWorldChallenge(summary, now) {
  const finishedAt = now || Date.now();
  const startedAt = worldChallengeState
    ? worldChallengeState.startedAt
    : finishedAt;

  return {
    runId: worldChallengeRunId ||
      FlagGameWorldChallengeStorage.createRunId(startedAt),
    startedAt: new Date(startedAt).toISOString(),
    finishedAt: new Date(finishedAt).toISOString(),
    correctCountries: summary.correctCount,
    wrongAnswers: summary.mistakes,
    skips: summary.skips,
    bestStreak: summary.bestStreak,
    elapsedMs: Math.max(0, finishedAt - startedAt),
    completed: summary.completed,
    livesRemaining: summary.lives,
    continued: summary.continued,
    rankingEligible:
      summary.rankingEligible &&
      platformCapabilities.supportsGlobalLeaderboards
  };
}

function salvarResultadoWorldChallenge(summary, options = {}) {
  if (worldChallengeRunRecorded) {
    return {
      duplicate: true,
      data: lerRecordesWorldChallenge(),
      run: criarRunWorldChallenge(summary, Date.now()),
      profileResult: {
        unlockedAchievements: []
      },
      rewardResult: {
        coinsEarned: 0,
        wallet: lerCarteiraWorldChallenge(),
        transactions: [],
        written: true
      }
    };
  }

  const now = options.now || Date.now();
  const run = criarRunWorldChallenge(summary, now);
  const storageResult =
    FlagGameWorldChallengeStorage.recordRun(run, { now });
  const rewardResult = options.awardRewards === false
    ? {
      coinsEarned: 0,
      wallet: lerCarteiraWorldChallenge(),
      transactions: [],
      written: true
    }
    : FlagGameWorldChallengeWallet.earnMilestoneRewards(
      summary.correctCount,
      {
        now,
        runId: run.runId
      }
    );
  worldChallengeRunRecorded = true;
  worldChallengeCoinsEarned = rewardResult.coinsEarned || 0;

  const profileResult = options.updateProfile === false
    ? { unlockedAchievements: [] }
    : FlagGameProfile.recordGame({
      eventId: run.runId,
      mode: "world_challenge",
      correct: summary.correctCount,
      total: summary.countriesTotal,
      percent: Math.round(
        (summary.correctCount / summary.countriesTotal) * 100
      ),
      bestStreak: summary.bestStreak,
      durationSeconds: Math.round(run.elapsedMs / 1000),
      completedFullRun195: summary.completed,
      wrongAnswers: summary.mistakes,
      skips: summary.skips,
      livesRemaining: summary.lives
    });

  if (
    rewardResult.transactions &&
    rewardResult.transactions.length
  ) {
    agendarCloudSave("world_challenge_coins_earned");
  }

  if (
    profileResult.unlockedAchievements &&
    profileResult.unlockedAchievements.length
  ) {
    agendarCloudSave("achievement_unlocked");
  }

  agendarCloudSave("world_challenge_finished");
  agendarEnvioPlayGamesWorldChallenge(run, storageResult.data.stats);

  return {
    ...storageResult,
    profileResult,
    rewardResult
  };
}

function salvarCheckpointWorldChallenge(reason, options = {}) {
  if (
    !worldChallengeState ||
    worldChallengeRunRecorded ||
    typeof FlagGameWorldChallengeCheckpoint === "undefined"
  ) {
    return {
      ok: false,
      reason: "checkpoint_unavailable"
    };
  }

  return FlagGameWorldChallengeCheckpoint.writeCheckpoint(
    worldChallengeState,
    {
      runId: worldChallengeRunId,
      reason,
      now: options.now || Date.now()
    }
  );
}

function limparCheckpointWorldChallenge() {
  if (typeof FlagGameWorldChallengeCheckpoint === "undefined") {
    return false;
  }

  return FlagGameWorldChallengeCheckpoint.clearCheckpoint();
}

function restaurarCheckpointWorldChallenge() {
  if (typeof FlagGameWorldChallengeCheckpoint === "undefined") {
    return false;
  }

  const checkpoint =
    FlagGameWorldChallengeCheckpoint.readCheckpoint();

  if (!checkpoint) {
    return false;
  }

  const restored =
    FlagGameWorldChallengeCheckpoint.restoreGame(checkpoint, {
      countries,
      getCountryName: getWorldChallengeCountryName
    });

  if (!restored.ok) {
    limparCheckpointWorldChallenge();
    return false;
  }

  worldChallengeRunId = restored.runId;
  worldChallengeRunRecorded = false;
  worldChallengeCoinsEarned = 0;
  worldChallengeState = restored.state;
  worldChallengeRestoredFromCheckpoint = true;
  return true;
}

function registrarInterrupcaoWorldChallenge() {
  if (
    !worldChallengeState ||
    worldChallengeRunRecorded ||
    worldChallengeState.status === "finished" ||
    worldChallengeState.status === "game_over"
  ) {
    return;
  }

  const summary =
    FlagGameWorldChallenge.getSummary(worldChallengeState, Date.now());

  salvarResultadoWorldChallenge(summary, {
    awardRewards: false,
    updateProfile: false
  });
  limparCheckpointWorldChallenge();
}

function atualizarPreviewRecordeWorldChallenge() {
  if (!worldChallengeRecordsPreview) {
    return;
  }

  const recordes = lerRecordesWorldChallenge();
  const stats = recordes.stats;

  if (!stats.attempts) {
    worldChallengeRecordsPreview.textContent =
      t("worldChallengeNoRecord");
    return;
  }

  const bestTime = stats.fastestCompletionMs
    ? formatarTempo(Math.floor(stats.fastestCompletionMs / 1000))
    : "-";

  worldChallengeRecordsPreview.textContent =
    t("worldChallengeRecordPreview", {
      progress: stats.bestCorrectCountries,
      total: FlagGameWorldChallenge.REQUIRED_COUNTRY_COUNT,
      bestTime
    });
}

function limparTimerFeedbackWorldChallenge() {
  if (worldChallengeFeedbackTimer) {
    clearTimeout(worldChallengeFeedbackTimer);
    worldChallengeFeedbackTimer = null;
  }
}

function renderizarVidasWorldChallenge(summary) {
  experienteVidas.replaceChildren();

  experienteVidas.setAttribute(
    "aria-label",
    t("worldChallengeLivesRemaining", {
      count: summary.lives,
      total: summary.initialLives
    })
  );

  for (let index = 0; index < summary.initialLives; index++) {
    const vida = document.createElement("span");
    vida.className = index < summary.lives
      ? "vida vida--ativa"
      : "vida vida--perdida";
    vida.setAttribute("aria-hidden", "true");
    vida.textContent = index < summary.lives ? "♥" : "♡";
    experienteVidas.appendChild(vida);
  }
}

function getNomePaisWorldChallenge(countryId) {
  const country =
    worldChallengeState &&
    worldChallengeState.countryIndex[countryId];

  return country
    ? getCountryName(country.code)
    : countryId;
}

function renderizarAlternativasWorldChallenge() {
  const question = worldChallengeState.currentQuestion;
  const isPlaying = worldChallengeState.status === "playing";

  experienteAlternativas.replaceChildren();

  question.options.forEach(option => {
    const country =
      worldChallengeState.countryIndex[option.id];
    const botao = document.createElement("button");
    const nome = country
      ? getCountryName(country.code)
      : option.name;

    botao.type = "button";
    botao.className = "experiente-alternativa";
    botao.textContent = nome;
    botao.dataset.countryId = option.id;
    botao.disabled = !isPlaying;

    if (worldChallengeState.feedback) {
      if (option.id === worldChallengeState.feedback.correctId) {
        botao.classList.add("correta");
      } else if (
        option.id === worldChallengeState.feedback.selectedId
      ) {
        botao.classList.add("errada");
      }
    }

    botao.addEventListener("click", () => {
      responderWorldChallenge(option.id);
    });

    experienteAlternativas.appendChild(botao);
  });
}

function renderizarFeedbackWorldChallenge() {
  const feedback = worldChallengeState.feedback;

  experienteFeedback.className = "experiente-feedback";

  if (!feedback) {
    experienteFeedback.textContent = "";
    return;
  }

  if (feedback.type === "correct") {
    experienteFeedback.classList.add("correto");
    experienteFeedback.textContent =
      t("worldChallengeFeedbackCorrect");
    return;
  }

  const nomeCorreto =
    getNomePaisWorldChallenge(feedback.correctId);

  experienteFeedback.classList.add("erro");
  experienteFeedback.textContent = feedback.type === "skip"
    ? t("worldChallengeFeedbackSkip", {
      country: nomeCorreto
    })
    : t("worldChallengeFeedbackIncorrect", {
      country: nomeCorreto
    });
}

function renderizarContinuacaoWorldChallenge(summary) {
  if (!worldContinuePanel) {
    return;
  }

  const shouldShow =
    summary.gameOver && !summary.continued;

  worldContinuePanel.hidden = !shouldShow;

  if (!shouldShow) {
    return;
  }

  const carteira = lerCarteiraWorldChallenge();
  const cost = FlagGameWorldChallengeWallet.CONTINUE_COST;
  const hasBalance = carteira.balance >= cost;

  worldContinueMessage.textContent = hasBalance
    ? t("worldChallengeContinueOffer", {
      cost,
      balance: carteira.balance
    })
    : t("worldChallengeContinueInsufficient", {
      cost,
      balance: carteira.balance
    });
  btnWorldContinue.disabled = !hasBalance;
}

function renderizarWorldChallenge() {
  if (!worldChallengeState || !worldChallengeState.currentQuestion) {
    return;
  }

  const summary =
    FlagGameWorldChallenge.getSummary(worldChallengeState);
  const question = worldChallengeState.currentQuestion;

  experienteProgresso.textContent =
    `${summary.correctCount}/${summary.countriesTotal}`;
  experienteAcertos.textContent = summary.correctCount;
  experientePuladas.textContent = summary.skips;
  experienteSequencia.textContent = summary.currentStreak;

  telaExperiente.style.setProperty(
    "--expert-progress",
    `${(summary.correctCount / summary.countriesTotal) * 100}%`
  );
  telaExperiente.style.setProperty(
    "--expert-progress-scale",
    String(summary.correctCount / summary.countriesTotal)
  );

  experienteBandeira.src =
    `assets/flags/${question.flagFile}`;
  experienteBandeira.alt = t("flagImageAlt");

  btnPular.disabled = worldChallengeState.status !== "playing";

  if (experienteRestaurado) {
    experienteRestaurado.hidden = !worldChallengeRestoredFromCheckpoint;
    if (worldChallengeRestoredFromCheckpoint) {
      experienteRestaurado.textContent =
        t("worldChallengeRestored");
    }
  }

  renderizarVidasWorldChallenge(summary);
  renderizarAlternativasWorldChallenge();
  renderizarFeedbackWorldChallenge();
  renderizarContinuacaoWorldChallenge(summary);
}

function focarPrimeiraAlternativaWorldChallenge() {
  const primeiraAlternativa =
    experienteAlternativas.querySelector("button:not(:disabled)");

  if (primeiraAlternativa) {
    primeiraAlternativa.focus();
  }
}

function ocultarAvisoRestauracaoWorldChallenge() {
  worldChallengeRestoredFromCheckpoint = false;

  if (experienteRestaurado) {
    experienteRestaurado.hidden = true;
  }
}

function iniciarModoExperiente() {
  telaInicio.style.display = "none";

  telaMundo.classList.remove("ativa");
  telaContinentes.classList.remove("ativa");
  telaJogo.classList.remove("ativa");
  telaResultado.classList.remove("ativa");
  telaResultadoExperiente.classList.remove("ativa");

  telaExperiente.classList.add("ativa");
  limparTimerFeedbackWorldChallenge();

  const restored = restaurarCheckpointWorldChallenge();

  if (!restored) {
    worldChallengeRunId =
      FlagGameWorldChallengeStorage.createRunId(Date.now());
    worldChallengeRunRecorded = false;
    worldChallengeCoinsEarned = 0;
    worldChallengeRestoredFromCheckpoint = false;

    worldChallengeState = FlagGameWorldChallenge.createGame({
      countries,
      seed: worldChallengeRunId,
      getCountryName: getWorldChallengeCountryName
    });
  }

  iniciarCronometroExperiente();
  renderizarWorldChallenge();
  focarPrimeiraAlternativaWorldChallenge();

  if (
    restored &&
    worldChallengeState &&
    worldChallengeState.status === "feedback"
  ) {
    agendarAvancoWorldChallenge(900);
  }
}

function avancarWorldChallengeOuFinalizar() {
  if (!worldChallengeState) {
    return;
  }

  if (
    worldChallengeState.status === "finished" ||
    worldChallengeState.status === "game_over"
  ) {
    finalizarModoExperiente();
    return;
  }

  worldChallengeState =
    FlagGameWorldChallenge.advance(worldChallengeState, {
      getCountryName: getWorldChallengeCountryName
    });

  ocultarAvisoRestauracaoWorldChallenge();
  renderizarWorldChallenge();
  focarPrimeiraAlternativaWorldChallenge();
}

function agendarAvancoWorldChallenge(delay) {
  limparTimerFeedbackWorldChallenge();

  worldChallengeFeedbackTimer = setTimeout(() => {
    worldChallengeFeedbackTimer = null;
    avancarWorldChallengeOuFinalizar();
  }, delay);
}

function tentarContinuarWorldChallenge() {
  if (
    !worldChallengeState ||
    worldChallengeState.status !== "game_over"
  ) {
    return;
  }

  const continuation =
    FlagGameWorldChallenge.continueGame(worldChallengeState);

  if (!continuation.result.accepted) {
    renderizarWorldChallenge();
    return;
  }

  const spendResult =
    FlagGameWorldChallengeWallet.spendForContinue(
      worldChallengeRunId
    );

  if (!spendResult.ok) {
    const cost = FlagGameWorldChallengeWallet.CONTINUE_COST;
    const balance = spendResult.wallet
      ? spendResult.wallet.balance
      : 0;

    worldContinueMessage.textContent =
      spendResult.reason === "insufficient_balance"
        ? t("worldChallengeContinueInsufficient", {
          cost,
          balance
        })
        : t("worldChallengeContinueFailed");
    btnWorldContinue.disabled = true;
    return;
  }

  worldChallengeState = continuation.state;
  ocultarAvisoRestauracaoWorldChallenge();
  agendarCloudSave("world_challenge_continue_spent");
  renderizarWorldChallenge();
  tocarSom("acerto");
  vibrar(35);
  agendarAvancoWorldChallenge(450);
}

function responderWorldChallenge(countryId) {
  if (
    !worldChallengeState ||
    worldChallengeState.status !== "playing"
  ) {
    return;
  }

  const result = FlagGameWorldChallenge.answer(
    worldChallengeState,
    countryId,
    {
      questionId: worldChallengeState.currentQuestion.questionId
    }
  );

  if (!result.result.accepted) {
    return;
  }

  worldChallengeState = result.state;
  ocultarAvisoRestauracaoWorldChallenge();
  renderizarWorldChallenge();

  if (result.result.correct) {
    vibrar(35);
    tocarSom("acerto");
  } else {
    vibrar([35, 25, 35]);
    tocarSom("erro");
  }

  if (worldChallengeState.status === "game_over") {
    return;
  }

  agendarAvancoWorldChallenge(
    worldChallengeState.status === "finished"
      ? 1800
      : 1300
  );
}

function pularPaisExperiente() {
  if (
    !worldChallengeState ||
    worldChallengeState.status !== "playing"
  ) {
    return;
  }

  const result = FlagGameWorldChallenge.skip(
    worldChallengeState,
    {
      questionId: worldChallengeState.currentQuestion.questionId
    }
  );

  if (!result.result.accepted) {
    return;
  }

  worldChallengeState = result.state;
  ocultarAvisoRestauracaoWorldChallenge();
  renderizarWorldChallenge();
  vibrar([20, 20, 20]);
  tocarSom("erro");

  if (worldChallengeState.status === "game_over") {
    return;
  }

  agendarAvancoWorldChallenge(
    1300
  );
}

function finalizarModoExperiente() {
  clearInterval(intervaloExperiente);
  intervaloExperiente = null;
  limparTimerFeedbackWorldChallenge();

  const finishedAt = worldChallengeState && worldChallengeState.endedAt
    ? worldChallengeState.endedAt
    : Date.now();
  const summary = FlagGameWorldChallenge.getSummary(
    worldChallengeState,
    finishedAt
  );
  const persistedResult =
    salvarResultadoWorldChallenge(summary, {
      now: finishedAt
    });
  limparCheckpointWorldChallenge();
  const tempoFinal = summary.elapsedSeconds;

  resultadoExperienteAcertos.textContent =
    summary.correctCount;
  resultadoExperientePuladas.textContent =
    summary.skips;
  resultadoExperienteTempo.textContent =
    formatarTempo(tempoFinal);
  resultadoExperienteErros.textContent =
    summary.mistakes;
  resultadoExperienteSequencia.textContent =
    summary.bestStreak;
  resultadoExperienteMoedas.textContent =
    persistedResult.rewardResult.coinsEarned || 0;
  resultadoExperienteSaldo.textContent =
    persistedResult.rewardResult.wallet.balance;
  resultadoExperienteContinuacao.textContent =
    summary.continued
      ? t("worldChallengeYes")
      : t("worldChallengeNo");
  resultadoExperienteRanking.textContent =
    platformCapabilities.supportsGlobalLeaderboards
      ? (
        summary.rankingEligible
          ? t("worldChallengeRankingEligible")
          : t("worldChallengeRankingNotEligible")
      )
      : t("worldChallengeRankingUnavailable");

  resultadoExperienteTitulo.textContent = summary.completed
    ? t("worldChallengeFinished")
    : t("worldChallengeGameOver");

  resultadoExperienteSubtitulo.textContent = summary.completed
    ? t("worldChallengeFinishedSubtitle")
    : t("worldChallengeGameOverSubtitle", {
      count: summary.correctCount,
      total: summary.countriesTotal
    });

  ultimoCompartilhamentoExperiente = {
    score: `${summary.correctCount} / ${summary.countriesTotal}`,
    percent: Math.round(
      (summary.correctCount / summary.countriesTotal) * 100
    ),
    mode: getModeLabel("world_challenge"),
    continent: t("worldLabel"),
    time: formatarTempo(tempoFinal)
  };

  if (
    summary.completed &&
    !persistedResult.duplicate &&
    persistedResult.data.stats.fastestCompletionMs ===
      persistedResult.run.elapsedMs
  ) {
    tocarSom("recorde");
  }

  mostrarConquistasDesbloqueadas(
    persistedResult.profileResult.unlockedAchievements
  );

  telaExperiente.classList.remove("ativa");
  telaResultadoExperiente.classList.add("ativa");
  atualizarPreviewRecordeWorldChallenge();
}

function calcularSegundosExperiente(timestamp = Date.now()) {
  if (!worldChallengeState) {
    return 0;
  }

  const startedAt = Number(worldChallengeState.startedAt);
  const elapsedFromState =
    Number(worldChallengeState.elapsedSeconds) || 0;

  if (!Number.isFinite(startedAt) || startedAt < 0) {
    return Math.max(0, Math.floor(elapsedFromState));
  }

  return Math.max(
    0,
    Math.floor(elapsedFromState),
    Math.floor(Math.max(0, timestamp - startedAt) / 1000)
  );
}

function atualizarCronometroExperiente(timestamp = Date.now()) {
  experienteTempo.textContent =
    formatarTempo(calcularSegundosExperiente(timestamp));
}

function iniciarCronometroExperiente() {
  clearInterval(intervaloExperiente);

  inicioExperiente = worldChallengeState
    ? worldChallengeState.startedAt
    : Date.now();
  atualizarCronometroExperiente();

  intervaloExperiente = setInterval(() => {
    atualizarCronometroExperiente();

  }, 1000);
}

btnPular.addEventListener("click", () => {
  pularPaisExperiente();
});

btnWorldContinue.addEventListener("click", () => {
  tentarContinuarWorldChallenge();
});

btnWorldFinish.addEventListener("click", () => {
  finalizarModoExperiente();
});

if (typeof FlagGameWorldChallengeCheckpoint !== "undefined") {
  FlagGameWorldChallengeCheckpoint.bindPageLifecycle({
    document,
    window,
    onCheckpoint(reason) {
      salvarCheckpointWorldChallenge(reason);
    }
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && worldChallengeState) {
    atualizarCronometroExperiente();
  }
});

function copiarTexto(texto) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(texto);
  }

  const campoTemporario =
    document.createElement("textarea");

  campoTemporario.value = texto;
  document.body.appendChild(campoTemporario);
  campoTemporario.select();
  document.execCommand("copy");
  campoTemporario.remove();

  return Promise.resolve();
}

// =========================
// ABOUT
// =========================

btnAbout.addEventListener("click", () => {
  telaResultado.classList.remove("ativa");
  telaAbout.classList.add("ativa");
});

btnFecharAbout.addEventListener("click", () => {
  telaAbout.classList.remove("ativa");
  telaResultado.classList.add("ativa");
});

// =========================
// PRIVACY POLICY
// =========================

btnPrivacy.addEventListener("click", () => {
  telaResultado.classList.remove("ativa");
  telaPrivacy.classList.add("ativa");
});

btnFecharPrivacy.addEventListener("click", () => {
  telaPrivacy.classList.remove("ativa");
  telaResultado.classList.add("ativa");
});

// =========================
// PERFIL LOCAL
// =========================

btnProfile.addEventListener("click", () => {
  renderizarPerfil();
  telaResultado.classList.remove("ativa");
  telaProfile.classList.add("ativa");
});

btnFecharProfile.addEventListener("click", () => {
  telaProfile.classList.remove("ativa");
  telaResultado.classList.add("ativa");
});

btnSaveRankingPlayer.addEventListener("click", () => {
  salvarIdentidadeRanking();
});

if (btnOpenPlayLeaderboards) {
  btnOpenPlayLeaderboards.addEventListener("click", () => {
    if (typeof FlagGamePlayGamesCompetitive !== "undefined") {
      FlagGamePlayGamesCompetitive.openLeaderboards();
    }
  });
}

if (btnOpenPlayAchievements) {
  btnOpenPlayAchievements.addEventListener("click", () => {
    if (typeof FlagGamePlayGamesCompetitive !== "undefined") {
      FlagGamePlayGamesCompetitive.openAchievements();
    }
  });
}

// =========================
// CONQUISTAS
// =========================

btnAchievements.addEventListener("click", () => {
  renderizarConquistas();
  telaResultado.classList.remove("ativa");
  telaAchievements.classList.add("ativa");
});

btnFecharAchievements.addEventListener("click", () => {
  telaAchievements.classList.remove("ativa");
  telaResultado.classList.add("ativa");
});

// =========================
// IDIOMA
// =========================

languageSelect.addEventListener("change", async event => {
  await loadLanguage(event.target.value);
});


// =========================
// INICIAR JOGO
// =========================

function iniciarJogoMundo(challengeConfig) {
  continenteAtual = "world";

  prepararPartidaDesafio(
    challengeConfig ||
    criarDesafioNormal("world", {
      quantity: quantidadeMundo
    })
  );

  perguntas = FlagGameChallenge.buildQuestions(
    countries,
    desafioAtual
  );

  perguntaAtual = 0;
  pontos = 0;
  inicioPartida = Date.now();
  sequenciaPartida = 0;
  melhorSequenciaPartida = 0;

  telaInicio.style.display = "none";
  telaMundo.classList.remove("ativa");
  telaContinentes.classList.remove("ativa");
  telaResultado.classList.remove("ativa");
  telaJogo.classList.add("ativa");

  btnOutroContinente.textContent = t("backToMenu");

  mostrarPergunta();
}


function iniciarJogo(continente, challengeConfig) {
  continenteAtual = continente;

  prepararPartidaDesafio(
    challengeConfig ||
    criarDesafioNormal("continent", {
      continent: continente
    })
  );

  perguntas = FlagGameChallenge.buildQuestions(
    countries,
    desafioAtual
  );

  perguntaAtual = 0;
  pontos = 0;
  inicioPartida = Date.now();
  sequenciaPartida = 0;
  melhorSequenciaPartida = 0;

  telaContinentes.classList.remove("ativa");
  telaResultado.classList.remove("ativa");
  telaJogo.classList.add("ativa");

  mostrarPergunta();
}


// =========================
// MOSTRAR PERGUNTA
// =========================

function mostrarPergunta() {
  const paisCorreto = perguntas[perguntaAtual];

  bandeiraAtual.src =
    `assets/flags/${paisCorreto.flagFile}`;

  progresso.textContent =
    formatarProgressoPergunta(
      perguntaAtual + 1,
      perguntas.length
    );

  telaJogo.style.setProperty(
    "--game-progress",
    `${((perguntaAtual + 1) / perguntas.length) * 100}%`
  );
  telaJogo.style.setProperty(
    "--game-progress-scale",
    String((perguntaAtual + 1) / perguntas.length)
  );

  pontosTexto.textContent =
    formatarPontos(pontos);

  const erradas = perguntas.filter(
    pais => pais.code !== paisCorreto.code
  );

  const opcoesErradas =
    embaralhar([...erradas]).slice(0, 3);

  const opcoes = embaralhar([
    paisCorreto,
    ...opcoesErradas
  ]);

  alternativas.replaceChildren();

  opcoes.forEach(pais => {
    const botao = document.createElement("button");

    botao.className = "alternativa";
    botao.textContent = getCountryName(pais.code);
    botao.dataset.countryCode = pais.code;

    botao.addEventListener("click", () => {
      verificarResposta(
        botao,
        pais,
        paisCorreto
      );
    });

    alternativas.appendChild(botao);
  });
}


// =========================
// VERIFICAR RESPOSTA
// =========================

function verificarResposta(
  botao,
  paisEscolhido,
  paisCorreto
) {
  const botoes =
    document.querySelectorAll(".alternativa");

  botoes.forEach(btn => {
    btn.disabled = true;
  });

  if (paisEscolhido.code === paisCorreto.code) {
    botao.classList.add("correta");
    pontos++;
    sequenciaPartida++;
    melhorSequenciaPartida = Math.max(
      melhorSequenciaPartida,
      sequenciaPartida
    );
    destacarPlacar();
    vibrar(35);
    tocarSom("acerto");

  } else {
    botao.classList.add("errada");
    sequenciaPartida = 0;
    vibrar([35, 25, 35]);
    tocarSom("erro");

    botoes.forEach(btn => {
      if (btn.dataset.countryCode === paisCorreto.code) {
        btn.classList.add("correta");
      }
    });
  }

  pontosTexto.textContent =
    formatarPontos(pontos);

  setTimeout(() => {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }, 1200);
}


// =========================
// RESULTADO
// =========================

function mostrarResultado() {
  telaJogo.classList.remove("ativa");
  telaResultado.classList.add("ativa");
  const eventId = createEventId();

  const percentual = Math.round(
    (pontos / perguntas.length) * 100
  );
  const durationSeconds =
    Math.floor((Date.now() - inicioPartida) / 1000);

  resultadoPontos.textContent = pontos;

  resultadoTotal.textContent =
    formatarTotalResultado(perguntas.length);

  resultadoPercentual.textContent =
    formatarPrecisao(percentual);

  ultimoCompartilhamento = {
    score: `${pontos} / ${perguntas.length}`,
    percent: percentual,
    mode: continenteAtual === "world"
      ? getModeLabel("world")
      : getModeLabel("continent"),
    continent: continenteAtual === "world"
      ? t("worldLabel")
      : getContinentLabel(continenteAtual),
    time: formatarTempo(durationSeconds)
  };

  const profileResult = FlagGameProfile.recordGame({
    eventId,
    mode: continenteAtual === "world" ? "world" : "continent",
    continent: continenteAtual,
    correct: pontos,
    total: perguntas.length,
    percent: percentual,
    bestStreak: melhorSequenciaPartida,
    durationSeconds,
    completedContinent: continenteAtual !== "world"
  });

  registrarRankingLocal({
    eventId,
    mode: continenteAtual === "world" ? "world" : "continent",
    continent: continenteAtual,
    correct: pontos,
    total: perguntas.length,
    percent: percentual,
    bestStreak: melhorSequenciaPartida,
    durationSeconds,
    challengeCode: desafioAtual ? desafioAtual.code : ""
  });

  mostrarConquistasDesbloqueadas(
    profileResult.unlockedAchievements
  );

  if (
    profileResult.unlockedAchievements &&
    profileResult.unlockedAchievements.length
  ) {
    agendarCloudSave("achievement_unlocked");
  }

  agendarCloudSave("match_finished");

  atualizarMensagemResultado(percentual);

  const chaveRecorde =
    `recorde-${continenteAtual}`;

  const recordeAnterior = Number(
    FlagGameStorage.getString(chaveRecorde, "0") || 0
  );

  const isNewRecord = pontos > recordeAnterior;

  if (isNewRecord) {
    FlagGameStorage.setString(chaveRecorde, pontos);
    resultadoRecorde.classList.add("ativo");
    resultadoRecorde.classList.remove("resultado-recorde--mantido");
    resultadoRecorde.textContent = t("newRecord");
    vibrar([45, 35, 45]);
    tocarSom("recorde");
  } else {
    resultadoRecorde.classList.add("ativo");
    resultadoRecorde.classList.add("resultado-recorde--mantido");
    resultadoRecorde.textContent =
      formatarPontuacaoValor(recordeAnterior || pontos);
  }

  ultimoResumoResultado = {
    pontos,
    total: perguntas.length,
    percentual,
    durationSeconds,
    bestStreak: melhorSequenciaPartida,
    recordeAnterior,
    isNewRecord
  };

  renderizarResumoResultado(ultimoResumoResultado);
  ultimoConquistasResultado =
    profileResult.unlockedAchievements;
  renderizarConquistasResultado(ultimoConquistasResultado);

  renderizarResultadoDesafio({
    eventId,
    code: desafioAtual.code,
    mode: desafioAtual.mode,
    continent: desafioAtual.continent,
    quantity: desafioAtual.quantity,
    durationSeconds,
    correct: pontos,
    errors: perguntas.length - pontos,
    bestStreak: melhorSequenciaPartida,
    percent: percentual,
    completedAt: new Date().toISOString()
  });
}


// =========================
// CONTADORES
// =========================

function atualizarContadoresContinentes() {
  document.querySelectorAll(".continente").forEach(botao => {
    const continente = botao.dataset.continente;

    const total = countries.filter(
      pais => pais.continent === continente
    ).length;

    const contador =
      botao.querySelector(".contador-paises");

    contador.textContent =
      tPlural("countryCount", total);
  });
}


// =========================
// EMBARALHAR
// =========================

function embaralhar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j =
      Math.floor(Math.random() * (i + 1));

    [lista[i], lista[j]] =
      [lista[j], lista[i]];
  }

  return lista;
}


// =========================
// INICIALIZA��O
// =========================

initializeLanguage().finally(() => {
  if (typeof FlagGameCloudSave !== "undefined") {
    FlagGameCloudSave.onStatusChange(renderizarEstadoCloudSave);
    FlagGameCloudSave.start();
  }

  if (typeof FlagGamePlayGamesCompetitive !== "undefined") {
    FlagGamePlayGamesCompetitive.onStatusChange(renderizarEstadoPlayGames);
    FlagGamePlayGamesCompetitive.start();
  }

  document.body.classList.remove("app-loading");
  document.body.classList.add("app-ready");
});
