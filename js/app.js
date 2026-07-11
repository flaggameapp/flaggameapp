const telaInicio = document.querySelector(".inicio");
const telaContinentes = document.querySelector("#tela-continentes");
const telaJogo = document.querySelector("#tela-jogo");

const telaMundo = document.querySelector("#tela-mundo");
const telaExperiente = document.querySelector("#tela-experiente");
const telaResultado = document.querySelector("#tela-resultado");
const telaResultadoExperiente =
  document.querySelector("#tela-resultado-experiente");
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
let intervaloExperiente = null;
let experienteBloqueado = false;

// =========================
// NAVEGAÇÃO
// =========================

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
}else {
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

    experienteAcertos.textContent =
      acertosExperiente;

    experienteSequencia.textContent =
      sequenciaExperiente;

    experienteFeedback.textContent = "✓";

    experienteResposta.classList.add("correto");
    experienteResposta.disabled = true;
    btnPular.disabled = true;

    setTimeout(() => {
      experienteResposta.classList.remove("correto");
      avancarPaisExperiente();
    }, 450);

    return;
  }

  experienteFeedback.textContent = "✕";

  experienteResposta.classList.add("erro");

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
function finalizarModoExperiente() {
  clearInterval(intervaloExperiente);
  intervaloExperiente = null;

  const tempoFinal =
    Math.floor((Date.now() - inicioExperiente) / 1000);

  const minutos =
    Math.floor(tempoFinal / 60);

  const segundos =
    tempoFinal % 60;

  const tempoFormatado =
    `${String(minutos).padStart(2, "0")}:` +
    `${String(segundos).padStart(2, "0")}`;

  resultadoExperienteAcertos.textContent =
    acertosExperiente;

  resultadoExperientePuladas.textContent =
    puladasExperiente;

  resultadoExperienteTempo.textContent =
    tempoFormatado;

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

    const minutos =
      Math.floor(tempoDecorrido / 60);

    const segundos =
      tempoDecorrido % 60;

    experienteTempo.textContent =
      `${String(minutos).padStart(2, "0")}:` +
      `${String(segundos).padStart(2, "0")}`;

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
// IDIOMA
// =========================

languageSelect.addEventListener("change", event => {
  loadLanguage(event.target.value);
});


// =========================
// INICIAR JOGO
// =========================

function iniciarJogoMundo() {
  continenteAtual = "world";

  perguntas = embaralhar([...countries])
    .slice(0, quantidadeMundo);

  perguntaAtual = 0;
  pontos = 0;

  telaInicio.style.display = "none";
  telaMundo.classList.remove("ativa");
  telaContinentes.classList.remove("ativa");
  telaResultado.classList.remove("ativa");
  telaJogo.classList.add("ativa");

  btnOutroContinente.textContent = t("backToMenu");

  mostrarPergunta();
}


function iniciarJogo(continente) {
  continenteAtual = continente;

  perguntas = countries.filter(
    country => country.continent === continente
  );

  perguntas = embaralhar([...perguntas]);

  perguntaAtual = 0;
  pontos = 0;

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

  } else {
    botao.classList.add("errada");

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

  const percentual = Math.round(
    (pontos / perguntas.length) * 100
  );

  resultadoPontos.textContent = pontos;

  resultadoTotal.textContent =
    `/ ${perguntas.length}`;

  resultadoPercentual.textContent =
    `${percentual}% ${t("accuracy")}`;

  if (percentual === 100) {
    resultadoIcone.textContent = "🏆";
    resultadoMensagem.textContent = t("perfect");

  } else if (percentual >= 75) {
    resultadoIcone.textContent = "🌟";
    resultadoMensagem.textContent = t("excellent");

  } else if (percentual >= 50) {
    resultadoIcone.textContent = "👏";
    resultadoMensagem.textContent = t("good");

  } else {
    resultadoIcone.textContent = "🌱";
    resultadoMensagem.textContent = t("keepLearning");
  }

  const chaveRecorde =
    `recorde-${continenteAtual}`;

  const recordeAnterior = Number(
    localStorage.getItem(chaveRecorde) || 0
  );

  if (pontos > recordeAnterior) {
    localStorage.setItem(chaveRecorde, pontos);
    resultadoRecorde.classList.add("ativo");
  } else {
    resultadoRecorde.classList.remove("ativo");
  }
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
// INICIALIZAÇÃO
// =========================

initializeLanguage();