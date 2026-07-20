# Plano de commits - FLAG GAME

Este plano foi preparado sem `git add`, sem commit, sem push e sem incluir arquivos gerados. A classificacao considera os arquivos modificados ou nao rastreados no estado atual do Git, alem dos padroes gerados ignorados.

## Decisao sobre apoio financeiro e doacoes

- O primeiro APK Android deve ser lancado sem painel de contribuicao, Pix, QR Code, Ko-fi, PayPal, Buy Me a Coffee, Google Play Billing, compras com dinheiro real ou qualquer solicitacao de apoio ligada a moedas, vidas, continuacoes, ranking, conquistas ou beneficios digitais.
- Moedas e vidas continuam sem relacao com dinheiro real; moedas sao obtidas exclusivamente jogando.
- Contribuicoes podem permanecer somente na homepage oficial, de forma discreta, quando ja fizerem parte da homepage atual e estiverem claramente separadas do jogo. No estado atual auditado, a homepage nao referencia Pix, Ko-fi ou QR Code de apoio.
- Uma eventual pagina futura no Android, como `Configuracoes -> Sobre o Flag Game -> Apoie o projeto`, fica adiada e devera ser totalmente voluntaria, sem conceder moedas, vidas, continuacao, remocao de anuncios, distintivos, conquistas, conteudo exclusivo ou vantagem no ranking.
- Arquivos de Pix, QR Codes, imagens de doacao e materiais promocionais de apoio permanecem em `NEEDS_USER_DECISION` e nao devem entrar em commits de jogo, extensoes ou preparacao Android.
- Separacao aplicada: `game/index.html`, `js/app.js`, `css/style.css`, `js/locales-data.js` e `locales/*.json` nao devem conter painel de apoio, Pix ou Ko-fi do jogo. `scripts/build-extensions.js` exclui os QR Codes Pix conhecidos dos pacotes Chrome, Edge e Firefox.

## Verificacao de dependencias

- Referencias verificadas em HTML, JavaScript, CSS, manifestos, scripts de build, testes e documentacao tecnica.
- `game/index.html` referencia os modulos JS do jogo, `css/style.css`, `assets/images/logo.png`, `assets/flags/*.svg` e `locales/*`.
- `index.html` referencia `homepage/*` e `assets/flags/*.svg`.
- Os manifestos e o script de build referenciam `js/background.js`, `game/index.html` e `assets/images/logo16.png`, `logo32.png`, `logo48.png`, `logo128.png`.
- `assets/images/2400-1.png`, `2400-2.png`, `2400-3.png` e `globo.png` nao tiveram uso comprovado por varredura estatica.
- `assets/images/pix-qrcode.png` e `assets/pix-qrcode.png` nao possuem referencia ativa no jogo ou homepage nesta separacao e continuam em `NEEDS_USER_DECISION`; ambos sao excluidos dos builds de extensao.

## COMMIT_1_ENTRYPOINTS_AND_EXTENSIONS

Homepage, entrada publica, manifestos, background, build de extensoes, robots e assets efetivamente usados.

| caminho | estado | motivo | dependencias | risco de ficar fora |
|---|---|---|---|---|
| `.gitignore` | untracked | Ignora dist/ e ZIPs gerados pelo build. | Git/build local. | Alto: builds e ZIPs podem aparecer no status e entrar por engano. |
| `assets/images/chrome.png` | untracked | Imagem usada na homepage para cards de navegadores. | homepage/css/sections.css. | Medio: homepage perde arte dos navegadores. |
| `assets/images/edge.png` | untracked | Imagem usada na homepage para cards de navegadores. | homepage/css/sections.css. | Medio: homepage perde arte dos navegadores. |
| `assets/images/firefox.png` | untracked | Imagem usada na homepage para cards de navegadores. | homepage/css/sections.css. | Medio: homepage perde arte dos navegadores. |
| `assets/images/logo.png` | untracked | Logo/icone usado por game/index.html, app.js ou manifestos. | game/index.html, js/app.js, manifest.json, manifests/*.json. | Alto: icones/logotipo quebram no jogo ou extensoes. |
| `assets/images/logo128.png` | untracked | Logo/icone usado por game/index.html, app.js ou manifestos. | game/index.html, js/app.js, manifest.json, manifests/*.json. | Alto: icones/logotipo quebram no jogo ou extensoes. |
| `assets/images/logo16.png` | untracked | Logo/icone usado por game/index.html, app.js ou manifestos. | game/index.html, js/app.js, manifest.json, manifests/*.json. | Alto: icones/logotipo quebram no jogo ou extensoes. |
| `assets/images/logo32.png` | untracked | Logo/icone usado por game/index.html, app.js ou manifestos. | game/index.html, js/app.js, manifest.json, manifests/*.json. | Alto: icones/logotipo quebram no jogo ou extensoes. |
| `assets/images/logo48.png` | untracked | Logo/icone usado por game/index.html, app.js ou manifestos. | game/index.html, js/app.js, manifest.json, manifests/*.json. | Alto: icones/logotipo quebram no jogo ou extensoes. |
| `homepage/assets/logo-homepage.png` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `homepage/css/base.css` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `homepage/css/components.css` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `homepage/css/responsive.css` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `homepage/css/sections.css` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `homepage/css/tokens.css` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `homepage/js/homepage-i18n.js` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `homepage/js/homepage.js` | untracked | Fonte da homepage usada por index.html. | index.html referencia CSS/JS/assets em homepage/. | Alto: homepage perde layout, i18n ou imagem. |
| `index.html` | tracked modificado | Homepage publica e entrada de GitHub Pages. | homepage/*, assets/flags, game/. | Alto: site principal fica quebrado ou aponta errado para o jogo. |
| `js/background.js` | tracked modificado | Background abre a entrada real do jogo em game/index.html. | game/index.html e API chrome/browser. | Alto: clique na extensao nao abre o jogo correto. |
| `manifest.json` | tracked modificado | Manifest raiz MV3 usado como entrada/base de extensao. | js/background.js, assets/images/logo*.png. | Alto: pacote de extensao perde metadados/icones/background. |
| `manifests/manifest.chrome.json` | untracked | Manifest especifico por navegador para o build das extensoes. | scripts/build-extensions.js, js/background.js, assets/images/logo*.png. | Alto: build de extensoes fica incompleto. |
| `manifests/manifest.edge.json` | untracked | Manifest especifico por navegador para o build das extensoes. | scripts/build-extensions.js, js/background.js, assets/images/logo*.png. | Alto: build de extensoes fica incompleto. |
| `manifests/manifest.firefox.json` | untracked | Manifest especifico por navegador para o build das extensoes. | scripts/build-extensions.js, js/background.js, assets/images/logo*.png. | Alto: build de extensoes fica incompleto. |
| `robots.txt` | untracked | Configuracao simples de indexacao do site. | Entrada publica index.html. | Baixo: nao quebra app, mas afeta publicacao web. |
| `scripts/build-extensions.js` | untracked | Script que gera e valida Chrome, Edge e Firefox. | manifests/*, assets/, css/, game/, js/, locales/. | Alto: nao ha pacote reproduzivel das extensoes. |

## COMMIT_2_WORLD_CHALLENGE

Motor/UI/dados do Desafio Mundial, CSS, i18n e testes do modo.

| caminho | estado | motivo | dependencias | risco de ficar fora |
|---|---|---|---|---|
| `css/style.css` | tracked modificado | CSS do jogo, incluindo cards estabilizados e telas do Desafio Mundial. | game/index.html e classes usadas por js/app.js. | Alto: layout do jogo e cards ficam incorretos. |
| `game/index.html` | untracked | Entrada real do jogo e markup do Desafio Mundial. | css/style.css, js/*, locales/*, assets/images/logo.png, assets/flags/*.svg. | Critico: extensoes e jogo web nao carregam a interface correta. |
| `js/app.js` | tracked modificado | Integracao da UI, resultado, perfil, continuacao e fluxo do Desafio Mundial. | game/index.html, world-challenge*, storage/profile/ranking/wallet/checkpoint. | Critico: motor nao aparece nem persiste corretamente na UI. |
| `js/challenges.js` | untracked | Modulo de suporte carregado pela entrada do jogo e usado por perfil/resultados/dados locais ou legado online. | game/index.html e js/app.js. | Alto: script referenciado pode gerar 404 ou quebrar fluxos existentes. |
| `js/firebase-auth.js` | untracked | Modulo de suporte carregado pela entrada do jogo e usado por perfil/resultados/dados locais ou legado online. | game/index.html e js/app.js. | Alto: script referenciado pode gerar 404 ou quebrar fluxos existentes. |
| `js/i18n.js` | tracked modificado | Fallback i18n do jogo e novas chaves visuais. | game/index.html, locales/*.json, js/locales-data.js. | Alto: textos podem cair em fallback errado. |
| `js/locales-data.js` | untracked | Bundle offline das traducoes do jogo. | js/i18n.js, locales/*.json. | Alto: funcionamento offline/i18n pode falhar. |
| `js/profile.js` | untracked | Modulo de suporte carregado pela entrada do jogo e usado por perfil/resultados/dados locais ou legado online. | game/index.html e js/app.js. | Alto: script referenciado pode gerar 404 ou quebrar fluxos existentes. |
| `js/ranking.js` | untracked | Modulo de suporte carregado pela entrada do jogo e usado por perfil/resultados/dados locais ou legado online. | game/index.html e js/app.js. | Alto: script referenciado pode gerar 404 ou quebrar fluxos existentes. |
| `js/storage.js` | untracked | Modulo de suporte carregado pela entrada do jogo e usado por perfil/resultados/dados locais ou legado online. | game/index.html e js/app.js. | Alto: script referenciado pode gerar 404 ou quebrar fluxos existentes. |
| `js/sync.js` | untracked | Modulo de suporte carregado pela entrada do jogo e usado por perfil/resultados/dados locais ou legado online. | game/index.html e js/app.js. | Alto: script referenciado pode gerar 404 ou quebrar fluxos existentes. |
| `js/world-challenge-checkpoint.js` | untracked | Modulo central do Desafio Mundial: motor, persistencia, carteira ou checkpoint. | game/index.html, js/app.js, testes world-challenge*.test.js. | Critico: regra/persistencia/checkpoint/carteira do modo quebra. |
| `js/world-challenge-storage.js` | untracked | Modulo central do Desafio Mundial: motor, persistencia, carteira ou checkpoint. | game/index.html, js/app.js, testes world-challenge*.test.js. | Critico: regra/persistencia/checkpoint/carteira do modo quebra. |
| `js/world-challenge-wallet.js` | untracked | Modulo central do Desafio Mundial: motor, persistencia, carteira ou checkpoint. | game/index.html, js/app.js, testes world-challenge*.test.js. | Critico: regra/persistencia/checkpoint/carteira do modo quebra. |
| `js/world-challenge.js` | untracked | Modulo central do Desafio Mundial: motor, persistencia, carteira ou checkpoint. | game/index.html, js/app.js, testes world-challenge*.test.js. | Critico: regra/persistencia/checkpoint/carteira do modo quebra. |
| `locales/ar.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/bn.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/de.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/en.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/es.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/fr.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/hi.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/id.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/it.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/ja.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/ko.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/nl.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/pl.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/pt-BR.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/ru.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/th.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/tr.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/uk.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/vi.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `locales/zh-CN.json` | tracked modificado | Traducao completa do jogo e Desafio Mundial. | js/i18n.js e elementos data-i18n em game/index.html. | Alto: chaves aparecem ou idiomas ficam incompletos. |
| `tests/world-challenge-checkpoint.test.js` | untracked | Teste minimo do motor, storage, carteira ou checkpoint. | js/world-challenge*.js. | Medio: regressao do modo fica sem cobertura automatizada. |
| `tests/world-challenge-storage.test.js` | untracked | Teste minimo do motor, storage, carteira ou checkpoint. | js/world-challenge*.js. | Medio: regressao do modo fica sem cobertura automatizada. |
| `tests/world-challenge-wallet.test.js` | untracked | Teste minimo do motor, storage, carteira ou checkpoint. | js/world-challenge*.js. | Medio: regressao do modo fica sem cobertura automatizada. |
| `tests/world-challenge.test.js` | untracked | Teste minimo do motor, storage, carteira ou checkpoint. | js/world-challenge*.js. | Medio: regressao do modo fica sem cobertura automatizada. |

## COMMIT_3_PLAY_GAMES_PREPARATION

Capacidades, adapters, cloud save, plugin Capacitor e testes/documentacao tecnica relacionada.

| caminho | estado | motivo | dependencias | risco de ficar fora |
|---|---|---|---|---|
| `docs/world-challenge/CLOUD_SAVE.md` | untracked | Documentacao tecnica diretamente ligada a Play Games/capacidades/cloud. | plugins/capacitor-play-games e js/play-games*/cloud-save/platform-capabilities. | Medio: configuracao Android futura perde instrucoes. |
| `docs/world-challenge/GOOGLE_PLAY_GAMES_ANDROID.md` | untracked | Documentacao tecnica diretamente ligada a Play Games/capacidades/cloud. | plugins/capacitor-play-games e js/play-games*/cloud-save/platform-capabilities. | Medio: configuracao Android futura perde instrucoes. |
| `docs/world-challenge/PLATFORM_MATRIX.md` | untracked | Documentacao tecnica diretamente ligada a Play Games/capacidades/cloud. | plugins/capacitor-play-games e js/play-games*/cloud-save/platform-capabilities. | Medio: configuracao Android futura perde instrucoes. |
| `docs/world-challenge/PLAY_GAMES_CHECKLIST.md` | untracked | Documentacao tecnica diretamente ligada a Play Games/capacidades/cloud. | plugins/capacitor-play-games e js/play-games*/cloud-save/platform-capabilities. | Medio: configuracao Android futura perde instrucoes. |
| `js/cloud-save.js` | untracked | Camada de capacidades, adapter Play Games, placares/conquistas ou cloud save local-first. | game/index.html, js/app.js, testes Play Games/cloud/platform. | Alto: Android preparado e fallback Web/extensoes ficam inconsistentes. |
| `js/platform-capabilities.js` | untracked | Camada de capacidades, adapter Play Games, placares/conquistas ou cloud save local-first. | game/index.html, js/app.js, testes Play Games/cloud/platform. | Alto: Android preparado e fallback Web/extensoes ficam inconsistentes. |
| `js/play-games-adapter.js` | untracked | Camada de capacidades, adapter Play Games, placares/conquistas ou cloud save local-first. | game/index.html, js/app.js, testes Play Games/cloud/platform. | Alto: Android preparado e fallback Web/extensoes ficam inconsistentes. |
| `js/play-games-competitive.js` | untracked | Camada de capacidades, adapter Play Games, placares/conquistas ou cloud save local-first. | game/index.html, js/app.js, testes Play Games/cloud/platform. | Alto: Android preparado e fallback Web/extensoes ficam inconsistentes. |
| `plugins/capacitor-play-games/android/build.gradle` | untracked | Plugin local Capacitor/Android para Google Play Games. | js/play-games-adapter.js, docs Play Games; app Android real ainda ausente. | Alto para Android futuro; baixo para Web/extensoes. |
| `plugins/capacitor-play-games/android/src/main/AndroidManifest.xml` | untracked | Plugin local Capacitor/Android para Google Play Games. | js/play-games-adapter.js, docs Play Games; app Android real ainda ausente. | Alto para Android futuro; baixo para Web/extensoes. |
| `plugins/capacitor-play-games/android/src/main/java/app/flaggame/playgames/FlagGamePlayGamesPlugin.java` | untracked | Plugin local Capacitor/Android para Google Play Games. | js/play-games-adapter.js, docs Play Games; app Android real ainda ausente. | Alto para Android futuro; baixo para Web/extensoes. |
| `plugins/capacitor-play-games/android/src/main/res/values/play_games_ids.xml` | untracked | Plugin local Capacitor/Android para Google Play Games. | js/play-games-adapter.js, docs Play Games; app Android real ainda ausente. | Alto para Android futuro; baixo para Web/extensoes. |
| `plugins/capacitor-play-games/package.json` | untracked | Plugin local Capacitor/Android para Google Play Games. | js/play-games-adapter.js, docs Play Games; app Android real ainda ausente. | Alto para Android futuro; baixo para Web/extensoes. |
| `plugins/capacitor-play-games/src/definitions.ts` | untracked | Plugin local Capacitor/Android para Google Play Games. | js/play-games-adapter.js, docs Play Games; app Android real ainda ausente. | Alto para Android futuro; baixo para Web/extensoes. |
| `plugins/capacitor-play-games/src/index.ts` | untracked | Plugin local Capacitor/Android para Google Play Games. | js/play-games-adapter.js, docs Play Games; app Android real ainda ausente. | Alto para Android futuro; baixo para Web/extensoes. |
| `tests/cloud-save.test.js` | untracked | Teste de capacidades, adapter, fila competitiva ou merge de cloud save. | js/platform-capabilities.js, js/play-games-adapter.js, js/play-games-competitive.js, js/cloud-save.js. | Medio: preparacao Play Games/cloud fica sem rede de seguranca. |
| `tests/platform-capabilities.test.js` | untracked | Teste de capacidades, adapter, fila competitiva ou merge de cloud save. | js/platform-capabilities.js, js/play-games-adapter.js, js/play-games-competitive.js, js/cloud-save.js. | Medio: preparacao Play Games/cloud fica sem rede de seguranca. |
| `tests/play-games-adapter.test.js` | untracked | Teste de capacidades, adapter, fila competitiva ou merge de cloud save. | js/platform-capabilities.js, js/play-games-adapter.js, js/play-games-competitive.js, js/cloud-save.js. | Medio: preparacao Play Games/cloud fica sem rede de seguranca. |
| `tests/play-games-competitive.test.js` | untracked | Teste de capacidades, adapter, fila competitiva ou merge de cloud save. | js/platform-capabilities.js, js/play-games-adapter.js, js/play-games-competitive.js, js/cloud-save.js. | Medio: preparacao Play Games/cloud fica sem rede de seguranca. |

## COMMIT_4_DOCUMENTATION

Auditorias, planos e documentos que nao precisam acompanhar obrigatoriamente um commit de codigo.

| caminho | estado | motivo | dependencias | risco de ficar fora |
|---|---|---|---|---|
| `docs/firebase-auth-architecture.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/FINAL_AUDIT.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/FLAG_GAME_DESIGN_SYSTEM.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/FLAG_GAME_HOMEPAGE_COPY.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/FLAG_GAME_HOMEPAGE_IMPLEMENTATION_PLAN.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/FLAG_GAME_HOMEPAGE_REVIEW.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/FLAG_GAME_HOMEPAGE_SPEC.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/IMPLEMENTATION_RULES.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/homepage/PUBLICATION_CHECKLIST.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/online-ranking-architecture.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/sync-strategy.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/AUDIT.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/COMMIT_PLAN.md` | novo nesta tarefa | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/CURRENT_DATA.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/DATA_MIGRATION.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/ENGINE.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/GIT_AND_ENTRYPOINT_AUDIT.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/IMPLEMENTATION_PLAN.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/PERSISTENCE.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |
| `docs/world-challenge/POST_IMPLEMENTATION_AUDIT.md` | untracked | Auditoria, plano ou documentacao que pode acompanhar revisao sem alterar runtime. | Referencias cruzadas para codigo/documentos. | Baixo para runtime; medio para rastreabilidade da implementacao. |

## DO_NOT_COMMIT

Gerados, ZIPs, builds e temporarios.

| caminho | estado | motivo | dependencias | risco de ficar fora |
|---|---|---|---|---|
| `dist/` | ignored/gerado | Diretorio recriado pelo build das extensoes. | node scripts/build-extensions.js. | Nao deve entrar no Git. |
| `dist/packages/*.zip` | ignored/gerado | Pacotes ZIP gerados pelo build. | node scripts/build-extensions.js. | Nao deve entrar no Git. |
| `Flaggame.zip` | ignored/gerado | ZIP local legado/gerado. | Nenhuma referencia runtime encontrada. | Nao deve entrar no Git. |

## NEEDS_USER_DECISION

Arquivos promocionais, Pix/QR Code, duplicados ou uso nao comprovado.

| caminho | estado | motivo | dependencias | risco de ficar fora |
|---|---|---|---|---|
| `assets/images/2400-1.png` | untracked | Imagem sem referencia comprovada no codigo atual. | Nao encontrada em HTML/JS/CSS/manifest/scripts/testes. | Baixo para runtime; pode ser material promocional. |
| `assets/images/2400-2.png` | untracked | Imagem sem referencia comprovada no codigo atual. | Nao encontrada em HTML/JS/CSS/manifest/scripts/testes. | Baixo para runtime; pode ser material promocional. |
| `assets/images/2400-3.png` | untracked | Imagem sem referencia comprovada no codigo atual. | Nao encontrada em HTML/JS/CSS/manifest/scripts/testes. | Baixo para runtime; pode ser material promocional. |
| `assets/images/globo.png` | untracked | Imagem sem referencia comprovada no codigo atual. | Nao encontrada em HTML/JS/CSS/manifest/scripts/testes. | Baixo para runtime; pode ser material promocional. |
| `assets/images/pix-qrcode.png` | untracked | QR Code Pix sem referencia ativa apos remocao do painel de apoio do jogo. | Excluido por `scripts/build-extensions.js`; nao referenciado por `game/index.html` nem homepage atual. | Baixo para runtime; medio por envolver dado financeiro e exigir decisao do usuario. |
| `assets/pix-qrcode.png` | untracked | QR Code Pix duplicado ou legado sem referencia ativa. | Excluido por `scripts/build-extensions.js`; nao referenciado por `game/index.html` nem homepage atual. | Baixo para runtime; medio por envolver dado financeiro e exigir decisao do usuario. |
| `divulgação/1400-560.jpg` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/300.png` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/440-280.jpg` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/ChatGPT Image 11 de jul. de 2026, 14_17_23.png` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/ChatGPT Image 11 de jul. de 2026, 14_53_21.png` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/ChatGPT Image 12 de jul. de 2026, 20_00_00.png` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/flag-game-resultado (1).png` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/flag-game-resultado.png` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/print-2.jpg` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/print-3.jpg` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/print-4.jpg` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/print-5.jpg` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |
| `divulgação/print1.jpg` | untracked | Arquivo nao classificado automaticamente. | Revisar referencias antes de commitar. | Desconhecido. |

## Ordem sugerida

1. `COMMIT_1_ENTRYPOINTS_AND_EXTENSIONS` para tornar entradas e build reproduziveis.
2. `COMMIT_2_WORLD_CHALLENGE` para consolidar o modo, dados, UI, traducoes e testes.
3. `COMMIT_3_PLAY_GAMES_PREPARATION` para isolar preparacao Android/Play Games sem misturar com regra local.
4. `COMMIT_4_DOCUMENTATION` para registrar auditorias e planos.
5. Resolver `NEEDS_USER_DECISION` antes de qualquer commit de midia sensivel/promocional.
