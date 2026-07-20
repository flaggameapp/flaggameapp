# World Challenge Audit

Data da auditoria: 2026-07-19.

Escopo: somente auditoria tecnica para a futura substituicao publica do modo atual "Modo Experiente" por "Desafio Mundial - Modo Experiente". Nenhum arquivo de producao foi alterado nesta etapa.

## Arquivos responsaveis pelo modo atual

- `game/index.html:117`: botao de entrada `#btn-experiente`.
- `game/index.html:194`: tela `#tela-experiente`.
- `game/index.html:239`: formulario `#form-experiente`.
- `game/index.html:250`: botao "Responder".
- `game/index.html:261`: botao `#btn-pular` com texto "Nao sei / Pular".
- `game/index.html:293`: tela de resultado `#tela-resultado-experiente`.
- `game/index.html:1110`: ordem de scripts; `js/app.js` roda depois de `countries`, `storage`, `i18n`, `profile`, `challenges`, `ranking`, `firebase-auth` e `sync`.
- `js/app.js:6-9`: seletores das telas do modo e resultado.
- `js/app.js:14-60`: seletores de botoes e elementos do modo experiente.
- `js/app.js:183-195`: estados globais do modo experiente.
- `css/style.css:1422`: estilos da tela do modo experiente.
- `css/style.css:1730`: estilos da tela de resultado do modo experiente.

## Fluxo atual do modo experiente

1. Entrada: `btnExperiente.addEventListener` chama `iniciarModoExperiente()` em `js/app.js:1174`.
2. Inicializacao: `iniciarModoExperiente()` oculta outras telas, mostra `#tela-experiente`, embaralha todos os paises e zera contadores em `js/app.js:1196-1222`.
3. Selecao de bandeiras: `paisesExperiente = embaralhar([...countries])` usa todos os 195 paises de `js/countries.js` em `js/app.js:1206`.
4. Renderizacao da bandeira: `mostrarPaisExperiente()` usa `assets/flags/${paisAtual.flagFile}` em `js/app.js:1224-1255`.
5. Resposta: submit do formulario chama `verificarRespostaExperiente()` em `js/app.js:1458-1462`.
6. Pulo: clique em `#btn-pular` chama `pularPaisExperiente()` em `js/app.js:1463-1465`.
7. Avanco: acerto ou pulo chama `avancarPaisExperiente()` em `js/app.js:1357-1368`.
8. Encerramento: quando `indiceExperiente >= paisesExperiente.length`, `finalizarModoExperiente()` grava perfil/ranking e abre resultado em `js/app.js:1383-1440`.

## Funcoes e responsabilidades

- Inicializacao do app: `initializeLanguage().finally(...)` em `js/app.js:1926-1929`.
- Inicializacao do modo: `iniciarModoExperiente()` em `js/app.js:1196-1222`.
- Selecao de bandeiras: usa `countries` completo em `js/app.js:1206`.
- Embaralhamento: `embaralhar(lista)` Fisher-Yates com `Math.random()` em `js/app.js:1909-1919`.
- Validacao digitada: `verificarRespostaExperiente()` em `js/app.js:1257-1321`.
- Normalizacao de nomes: `normalizarTexto()` remove caixa, acentos, apostrofos, hifens e espacos extras em `js/app.js:1185-1193`.
- Nome correto exibido/validado: `getCountryName(paisAtual.code)` via `Intl.DisplayNames` em `js/i18n.js:326-341`.
- Cronometro: `iniciarCronometroExperiente()` com `setInterval` em `js/app.js:1443-1457`; formato em `formatarTempo()` em `js/app.js:1370-1380`.
- Botao Responder: submit do `#form-experiente` em `js/app.js:1458-1462`.
- Botao Nao sei/Pular: `pularPaisExperiente()` em `js/app.js:1324-1355`.
- Feedback de acerto: incrementa acertos/sequencia, bloqueia input, som/vibracao, classe `correto`, avanco em 450 ms em `js/app.js:1276-1303`.
- Feedback de erro: nao avanca, zera sequencia, classe `erro`, seleciona input em `js/app.js:1308-1321`.
- Feedback de pulo: incrementa puladas, zera sequencia, revela nome correto e avanca em 2000 ms em `js/app.js:1334-1353`.
- Protecao contra resposta duplicada: `experienteBloqueado` checado em `js/app.js:1258` e `js/app.js:1325`, ativado em acerto/pulo em `js/app.js:1277` e `js/app.js:1329`.
- Tela de resultado: `finalizarModoExperiente()` preenche acertos, puladas, tempo e compartilhamento em `js/app.js:1391-1408`.
- Sons: `tocarSom(tipo)` Web Audio em `js/app.js:222-257`; controle `sound` em `js/app.js:202` e `js/app.js:1001-1008`.
- Vibracao: `vibrar(padrao)` usa `navigator.vibrate` em `js/app.js:216-220`.
- Animacoes: classes `correto`, `erro`, `pulado` em `css/style.css:1701`, `css/style.css:1721`, `css/style.css:1853`; entrada de telas e feedbacks em `css/style.css:2666-2776`.
- Eventos de teclado: Enter do formulario nativo dispara submit; tambem ha Enter no campo de desafio em `js/app.js:1103-1107`. Nao ha listener especifico de teclado para o input do modo experiente.

## Estados globais usados pelo modo

- `paisesExperiente`: fila embaralhada da partida, `js/app.js:183`.
- `indiceExperiente`: posicao atual na fila, `js/app.js:184`.
- `acertosExperiente`: acertos finais, `js/app.js:185`.
- `puladasExperiente`: pulos finais, `js/app.js:186`.
- `sequenciaExperiente`: sequencia atual, `js/app.js:187`.
- `inicioExperiente`: timestamp inicial, `js/app.js:189`.
- `intervaloExperiente`: handle do cronometro, `js/app.js:191`.
- `experienteBloqueado`: trava anti-duplicidade, `js/app.js:192`.
- `melhorSequenciaExperiente`: melhor sequencia da partida, `js/app.js:195`.
- `ultimoCompartilhamentoExperiente`: dados para share/download, `js/app.js:199`.
- Globais compartilhados: `somAtivo`, `audioContext`, `logoCompartilhamento`, `FlagGameProfile`, `FlagGameRanking`, `FlagGameStorage`, `countries`, `getCountryName`, `t`.

## Integracao com perfil, ranking e conquistas

- `finalizarModoExperiente()` chama `FlagGameProfile.recordGame()` com `mode: "expert"`, `correct`, `total`, `percent`, `bestStreak` e `durationSeconds` em `js/app.js:1410-1420`.
- A mesma finalizacao chama `registrarRankingLocal()` com `mode: "expert"` e `continent: "world"` em `js/app.js:1422-1433`.
- `registrarRankingLocal()` cria payload por `FlagGameRanking.buildScorePayload()` e coloca na fila por `FlagGameRanking.enqueueScore()` em `js/app.js:710-718`.
- `FlagGameProfile.recordGame()` atualiza totais gerais, `modes[mode].gamesPlayed`, `fullRuns195`, `perfectGames`, melhor sequencia e eventos deduplicados por `eventId` em `js/profile.js:271-345`.
- O modo atual aumenta `fullRuns195` sempre que `total >= 195`, mesmo que haja pulos ou erros, em `js/profile.js:300-302`.
- As conquistas sao avaliadas depois de gravar o perfil em `js/profile.js:254-268`.
- O toast de conquista usa `mostrarConquistasDesbloqueadas()` em `js/app.js:944-964`.
- A tela de perfil mostra resumo agregado por `FlagGameProfile.getSummary()` em `js/app.js:669-691`.
- O ranking atual e local/offline; `FlagGameRanking.createOfflineAdapter()` nao envia nem busca leaderboard real em `js/ranking.js:204-228`.

## Base de paises e alternativas

- `js/countries.js:1` declara `const countries = [...]`.
- O dataset contem 195 entradas, cada uma com `code`, `name`, `continent`, `flagFile`.
- Contagem auditada: `south-america:12`, `north-america:23`, `europe:44`, `africa:54`, `asia:48`, `oceania:14`.
- `code`, `name` e `flagFile` sao unicos no dataset atual.
- Todos os 195 `flagFile` referenciados existem em `assets/flags`.
- A pasta `assets/flags` tem 255 SVGs; ha 60 bandeiras extras nao usadas pelo dataset de 195.
- Nao ha `id` separado; o melhor ID estavel atual e `code` ISO alpha-2.
- Nao ha campo `region`.
- Nao ha aliases.
- Nao ha grupos de bandeiras parecidas.
- Nomes traduzidos para exibicao sao gerados por `Intl.DisplayNames` em `js/i18n.js:326-341`; o campo `name` de `countries.js` e fallback.
- Alternativas dos modos continent/world sao geradas em `mostrarPergunta()` por filtro da lista de perguntas e tres erradas aleatorias em `js/app.js:1675-1685`.
- Para desafios, a sequencia de perguntas e deterministica por seed em `FlagGameChallenge.buildQuestions()` em `js/challenges.js:134-149`; as alternativas, porem, continuam aleatorias em `mostrarPergunta()`.

## Reuso possivel para alternativas

Pode reutilizar parcialmente:

- `FlagGameChallenge.buildQuestions()` para gerar uma ordem deterministica de perguntas, inclusive mundo 195.
- `embaralhar()` para shuffle simples se determinismo nao for requisito.
- O padrao de renderizacao de botoes de alternativa de `mostrarPergunta()`.
- `getCountryName(code)` para rotulos localizados.

Nao deve reutilizar diretamente sem refatorar:

- `mostrarPergunta()` porque cria DOM, escolhe alternativas e registra handlers no mesmo bloco.
- A selecao de erradas baseada apenas em `perguntas`, pois em modo mundo com fila dinamica/retry ela pode reduzir o pool e gerar alternativas piores.
- O criterio `pais.code !== paisCorreto.code`, que evita duplicidade por codigo mas nao por nome exibido.

## Riscos classificados

- Alta: `mode: "expert"` hoje identifica o modo antigo em perfil e ranking local. Reusar esse ID para o modo novo misturaria historico antigo e pontuacao nova.
- Alta: `FlagGameProfile.recordGame()` incrementa `fullRuns195` quando `total >= 195`, nao quando todos os 195 foram identificados corretamente. O novo modo exige conclusao apenas com 195 corretos.
- Alta: o modo atual nao possui vidas; erro digitado nao avanca e nao consome recurso. A futura mecanica de cinco vidas precisa de estado proprio e nao pode depender de `verificarRespostaExperiente()` sem alteracao profunda.
- Alta: `mostrarPergunta()` acopla geracao de alternativas, DOM e fluxo de resposta. Reuso direto para nova fila com retorno de bandeiras erradas e continuacao por moedas tende a gerar regressao.
- Media: alternativas atuais nao deduplicam por nome exibido. A auditoria local nao encontrou duplicatas nos 20 idiomas atuais, mas `Intl.DisplayNames` pode variar por runtime e aliases futuros podem colidir.
- Media: desafios usam sequencia deterministica, mas alternativas atuais sao aleatorias por `Math.random()`. Se o novo ranking depender de comparabilidade, alternativas tambem precisam ser deterministicas ou registradas.
- Media: `assets/flags` tem 60 SVGs extras. Futuras validacoes por pasta, em vez de dataset, podem incluir territorios/entradas fora dos 195.
- Media: nao ha camada de plataforma para ranking global somente Android. A fila atual nao distingue site/extensao/Android.
- Baixa: a trava `experienteBloqueado` cobre acerto/pulo, mas erro nao trava. Isso combina com o modo antigo; no novo, erro deve ir para estado `feedback` ou `retry_pending`.
- Baixa: o cronometro usa `Date.now()` e `setInterval`, suficiente para UI, mas deve salvar tempo final pelo estado da partida para evitar inconsistencia em pausa/continuacao.

## Duvidas nao resolvidas pelo codigo

- Nao ha fonte local que defina quais 195 paises devem ser considerados oficiais para a nova modalidade alem do dataset atual.
- Nao ha design tecnico para moedas gratuitas, continuacao unica ou historico local do novo modo.
- Nao ha contrato de ranking global Android nem criterios anti-fraude.
- Nao ha projeto Android/Capacitor no workspace atual para confirmar Activity, Gradle, package name ou plugins.
- Nao ha lista de aliases aceitos por idioma para respostas digitadas ou alternativas.
