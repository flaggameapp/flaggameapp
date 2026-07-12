const telaInicio = document.querySelector(".inicio");
const telaContinentes = document.querySelector("#tela-continentes");
const telaJogo = document.querySelector("#tela-jogo");

const telaMundo = document.querySelector("#tela-mundo");
const telaExperiente = document.querySelector("#tela-experiente");
const telaResultado = document.querySelector("#tela-resultado");
const telaResultadoExperiente =
  document.querySelector("#tela-resultado-experiente");
const logoHomeLink = document.querySelector("#logo-home-link");
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

const experienteResposta =
  document.querySelector("#experiente-resposta");

const formExperiente =
  document.querySelector("#form-experiente");

const btnPular =
  document.querySelector("#btn-pular");

const experienteFeedback =
  document.querySelector("#experiente-feedback");

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

const telaSupport = document.querySelector("#tela-support");
const btnSupport = document.querySelector("#btn-support");
const btnFecharSupport = document.querySelector("#btn-fechar-support");
const btnCopiarPix = document.querySelector("#btn-copiar-pix");
const pixCopyMessage = document.querySelector("#pix-copy-message");

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

let continenteAtual = "";
let perguntas = [];
let perguntaAtual = 0;
let pontos = 0;
let quantidadeMundo = 20;
let paisesExperiente = [];
let indiceExperiente = 0;
let acertosExperiente = 0;
let puladasExperiente = 0;
let sequenciaExperiente = 0;

let inicioExperiente = 0;
let inicioPartida = 0;
let intervaloExperiente = null;
let experienteBloqueado = false;
let sequenciaPartida = 0;
let melhorSequenciaPartida = 0;
let melhorSequenciaExperiente = 0;
let desafioAtual = null;
let ultimoResultadoDesafio = null;
let ultimoCompartilhamento = null;
let ultimoCompartilhamentoExperiente = null;
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
    expert: t("expertModeTitle")
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
  ctx.fillText(`${dados.percent}% ${t("accuracy")}`, 150, 500);

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
  link.click();
  URL.revokeObjectURL(url);
}

function mostrarFeedbackCompartilhamento(elemento, mensagem) {
  elemento.textContent = mensagem;
  elemento.classList.add("ativo");

  setTimeout(() => {
    elemento.classList.remove("ativo");
  }, 2200);
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
  const player = FlagGameRanking.getPlayer();

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
  rankingPlayerId.value = player.playerId;
  rankingNickname.value = player.nickname;
  rankingCountry.value = player.country;
}

function salvarIdentidadeRanking() {
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

  achievementsCount.textContent =
    `${summary.unlocked} / ${summary.total}`;
  achievementsPoints.textContent = summary.points;
  achievementsList.innerHTML = "";

  summary.achievements.forEach(achievement => {
    const item = document.createElement("div");
    const progressPercent =
      `${achievement.progress.percent}%`;

    item.className = achievement.unlocked
      ? "achievement-item unlocked"
      : "achievement-item";

    item.innerHTML = `
      <div class="achievement-title">
        <strong>${achievement.title}</strong>
        <span class="achievement-badge">
          ${achievement.unlocked ? t("completed") : `${achievement.points} ${t("pointsAbbr")}`}
        </span>
      </div>
      <span>${achievement.description}</span>
      <div class="achievement-progress">
        <div style="--progress: ${progressPercent}"></div>
      </div>
      <span>
        ${achievement.progress.current} / ${achievement.progress.target}
      </span>
    `;

    achievementsList.appendChild(item);
  });
}

function formatarResultadoDesafio(resultado) {
  return (
    `${resultado.correct} ${t("correctAnswers").toLowerCase()}, ` +
    `${resultado.errors} ${t("errors").toLowerCase()}, ` +
    `${formatarTempo(resultado.durationSeconds)}, ` +
    `${t("streak").toLowerCase()} ${resultado.bestStreak}`
  );
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
    telaResultado.classList.contains("ativa") &&
    perguntas.length
  ) {
    const percentual = Math.round(
      (pontos / perguntas.length) * 100
    );

    resultadoPercentual.textContent =
      `${percentual}% ${t("accuracy")}`;
    atualizarMensagemResultado(percentual);
    btnOutroContinente.textContent =
      continenteAtual === "world"
        ? t("backToMenu")
        : t("chooseAnotherContinent");
  }

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

  achievementToast.innerHTML = `
    <strong>${t("achievementUnlocked")}</strong>
    <span>${conquista.title}</span>
  `;
  achievementToast.classList.add("ativo");
  vibrar([45, 30, 45]);
  tocarSom("recorde");

  setTimeout(() => {
    achievementToast.classList.remove("ativo");
  }, 2600);
}

atualizarBotaoSom();

// =========================
// NAVEGA��O
// =========================

function voltarParaHome() {
  clearInterval(intervaloExperiente);
  intervaloExperiente = null;

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
  clearInterval(intervaloExperiente);
  intervaloExperiente = null;

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

function iniciarModoExperiente() {
  telaInicio.style.display = "none";

  telaMundo.classList.remove("ativa");
  telaContinentes.classList.remove("ativa");
  telaJogo.classList.remove("ativa");
  telaResultado.classList.remove("ativa");

  telaExperiente.classList.add("ativa");

  paisesExperiente = embaralhar([...countries]);

  indiceExperiente = 0;
  acertosExperiente = 0;
  puladasExperiente = 0;
  sequenciaExperiente = 0;
  melhorSequenciaExperiente = 0;

  experienteAcertos.textContent = "0";
  experientePuladas.textContent = "0";
  experienteSequencia.textContent = "0";

  experienteFeedback.textContent = "";
  experienteResposta.value = "";

  iniciarCronometroExperiente();
  mostrarPaisExperiente();
}
function mostrarPaisExperiente() {
  const paisAtual =
    paisesExperiente[indiceExperiente];

  experienteBloqueado = false;

  experienteProgresso.textContent =
    `${indiceExperiente + 1} / ${paisesExperiente.length}`;

  experienteBandeira.src =
    `assets/flags/${paisAtual.flagFile}`;

  experienteResposta.disabled = false;
  btnPular.disabled = false;

  experienteResposta.value = "";
  experienteFeedback.textContent = "";
  experienteFeedback.classList.remove("pulado");

  experienteResposta.focus();
}
function verificarRespostaExperiente() {
  if (experienteBloqueado) {
    return;
  }

  const paisAtual =
    paisesExperiente[indiceExperiente];

  const respostaDigitada =
    normalizarTexto(experienteResposta.value);

  const respostaCorreta =
    normalizarTexto(getCountryName(paisAtual.code));

  if (!respostaDigitada) {
    experienteResposta.focus();
    return;
  }

  if (respostaDigitada === respostaCorreta) {
    experienteBloqueado = true;

    acertosExperiente++;
    sequenciaExperiente++;
    melhorSequenciaExperiente = Math.max(
      melhorSequenciaExperiente,
      sequenciaExperiente
    );

    experienteAcertos.textContent =
      acertosExperiente;

    experienteSequencia.textContent =
      sequenciaExperiente;

    experienteFeedback.textContent = "✓";

    experienteResposta.classList.add("correto");
    experienteResposta.disabled = true;
    btnPular.disabled = true;
    vibrar(35);
    tocarSom("acerto");

    setTimeout(() => {
      experienteResposta.classList.remove("correto");
      avancarPaisExperiente();
    }, 450);

    return;
  }

  experienteFeedback.textContent = "✕";

  experienteResposta.classList.add("erro");
  sequenciaExperiente = 0;
  experienteSequencia.textContent =
    sequenciaExperiente;
  vibrar([35, 25, 35]);
  tocarSom("erro");

  setTimeout(() => {
    experienteResposta.classList.remove("erro");
  }, 350);

  experienteResposta.select();
}

function pularPaisExperiente() {
  if (experienteBloqueado) {
    return;
  }

  experienteBloqueado = true;

  const paisAtual =
    paisesExperiente[indiceExperiente];

  puladasExperiente++;
  sequenciaExperiente = 0;

  experientePuladas.textContent =
    puladasExperiente;

  experienteSequencia.textContent =
    sequenciaExperiente;

  experienteFeedback.textContent =
    `💡 ${getCountryName(paisAtual.code)}`;

  experienteFeedback.classList.add("pulado");

  experienteResposta.disabled = true;
  btnPular.disabled = true;
  vibrar(20);

  setTimeout(() => {
    avancarPaisExperiente();
  }, 2000);
}

function avancarPaisExperiente() {
  indiceExperiente++;

  experienteFeedback.textContent = "";

  if (indiceExperiente >= paisesExperiente.length) {
    finalizarModoExperiente();
    return;
  }

  mostrarPaisExperiente();
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

function finalizarModoExperiente() {
  clearInterval(intervaloExperiente);
  intervaloExperiente = null;

  const tempoFinal =
    Math.floor((Date.now() - inicioExperiente) / 1000);
  const eventId = createEventId();

  resultadoExperienteAcertos.textContent =
    acertosExperiente;

  resultadoExperientePuladas.textContent =
    puladasExperiente;

  resultadoExperienteTempo.textContent =
    formatarTempo(tempoFinal);

  ultimoCompartilhamentoExperiente = {
    score: `${acertosExperiente} / ${paisesExperiente.length}`,
    percent: Math.round(
      (acertosExperiente / paisesExperiente.length) * 100
    ),
    mode: getModeLabel("expert"),
    continent: t("worldLabel"),
    time: formatarTempo(tempoFinal)
  };

  const profileResult = FlagGameProfile.recordGame({
    eventId,
    mode: "expert",
    correct: acertosExperiente,
    total: paisesExperiente.length,
    percent: Math.round(
      (acertosExperiente / paisesExperiente.length) * 100
    ),
    bestStreak: melhorSequenciaExperiente,
    durationSeconds: tempoFinal
  });

  registrarRankingLocal({
    eventId,
    mode: "expert",
    continent: "world",
    correct: acertosExperiente,
    total: paisesExperiente.length,
    percent: Math.round(
      (acertosExperiente / paisesExperiente.length) * 100
    ),
    bestStreak: melhorSequenciaExperiente,
    durationSeconds: tempoFinal
  });

  mostrarConquistasDesbloqueadas(
    profileResult.unlockedAchievements
  );

  telaExperiente.classList.remove("ativa");
  telaResultadoExperiente.classList.add("ativa");
}

function iniciarCronometroExperiente() {
  clearInterval(intervaloExperiente);

  inicioExperiente = Date.now();
  experienteTempo.textContent = "00:00";

  intervaloExperiente = setInterval(() => {
    const tempoDecorrido =
      Math.floor((Date.now() - inicioExperiente) / 1000);

    experienteTempo.textContent =
      formatarTempo(tempoDecorrido);

  }, 1000);
}
formExperiente.addEventListener("submit", event => {
  event.preventDefault();

  verificarRespostaExperiente();
});
btnPular.addEventListener("click", () => {
  pularPaisExperiente();
});

// =========================
// SUPPORT
// =========================

btnSupport.addEventListener("click", () => {
  telaResultado.classList.remove("ativa");
  telaSupport.classList.add("ativa");
});

btnFecharSupport.addEventListener("click", () => {
  telaSupport.classList.remove("ativa");
  telaResultado.classList.add("ativa");
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

btnCopiarPix.addEventListener("click", () => {
  copiarTexto(btnCopiarPix.dataset.pixKey).then(() => {
    btnCopiarPix.textContent = t("pixKeyCopied");
    pixCopyMessage.classList.add("ativo");

    setTimeout(() => {
      btnCopiarPix.textContent = t("copyPixKey");
      pixCopyMessage.classList.remove("ativo");
    }, 2000);
  });
});

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

languageSelect.addEventListener("change", event => {
  loadLanguage(event.target.value);
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
    `${perguntaAtual + 1} / ${perguntas.length}`;

  pontosTexto.textContent =
    `${pontos} ${t("points")}`;

  const erradas = perguntas.filter(
    pais => pais.code !== paisCorreto.code
  );

  const opcoesErradas =
    embaralhar([...erradas]).slice(0, 3);

  const opcoes = embaralhar([
    paisCorreto,
    ...opcoesErradas
  ]);

  alternativas.innerHTML = "";

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
    `${pontos} ${t("points")}`;

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
    `/ ${perguntas.length}`;

  resultadoPercentual.textContent =
    `${percentual}% ${t("accuracy")}`;

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

  atualizarMensagemResultado(percentual);

  const chaveRecorde =
    `recorde-${continenteAtual}`;

  const recordeAnterior = Number(
    FlagGameStorage.getString(chaveRecorde, "0") || 0
  );

  if (pontos > recordeAnterior) {
    FlagGameStorage.setString(chaveRecorde, pontos);
    resultadoRecorde.classList.add("ativo");
    vibrar([45, 35, 45]);
    tocarSom("recorde");
  } else {
    resultadoRecorde.classList.remove("ativo");
  }

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
      `${total} ${t("countries")}`;
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
  document.body.classList.remove("app-loading");
  document.body.classList.add("app-ready");
});
