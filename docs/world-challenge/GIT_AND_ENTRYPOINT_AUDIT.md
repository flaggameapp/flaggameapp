# Git and entrypoint audit

Data: 2026-07-19. Escopo: revisao final, organizacao do estado Git e validacao estatica/build das extensoes. Nenhum `git add`, commit, movimentacao de arquivos, alteracao Android nativa ou nova funcionalidade foi executada nesta etapa.

## 1. Estado do repositorio

- Raiz real do Git: `D:/Bandeiras`.
- Repositorios Git encontrados: `D:\Bandeiras\.git`. Apenas a raiz `D:\Bandeiras\.git` foi encontrada.
- Arquivos rastreados por `git ls-files`: 282.
- Arquivos untracked por `git ls-files --others --exclude-standard`: 94.
- O projeto parece parcialmente versionado: a raiz tem Git, mas diretorios essenciais atuais como `game/`, `homepage/`, `scripts/`, `manifests/`, varios `js/*.js`, `tests/`, `plugins/` e `docs/` estao untracked.
- Motivo provavel dos muitos untracked: eles foram criados em fases anteriores ou existiam no disco, mas nunca entraram no indice Git deste repositorio. Como `.gitignore` agora ignora `/dist/` e `/*.zip`, `dist/` e `Flaggame.zip` deixaram de aparecer em `git ls-files --others --exclude-standard`, mas aparecem como ignorados.
- Risco de pasta errada: baixo para os comandos executados, porque `git rev-parse --show-toplevel` retorna `D:/Bandeiras` e nao ha `.git` em subpastas. O risco real e de commit incompleto, nao de estar em outro repo.

### `git rev-parse --show-toplevel`

```text
D:/Bandeiras
```
### `git status --short`

```text
 M css/style.css
 M index.html
 M js/app.js
 M js/background.js
 M js/i18n.js
 M locales/ar.json
 M locales/bn.json
 M locales/de.json
 M locales/en.json
 M locales/es.json
 M locales/fr.json
 M locales/hi.json
 M locales/id.json
 M locales/it.json
 M locales/ja.json
 M locales/ko.json
 M locales/nl.json
 M locales/pl.json
 M locales/pt-BR.json
 M locales/ru.json
 M locales/th.json
 M locales/tr.json
 M locales/uk.json
 M locales/vi.json
 M locales/zh-CN.json
 M manifest.json
?? .gitignore
?? assets/images/
?? assets/pix-qrcode.png
?? "divulga\303\247\303\243o/"
?? docs/
?? game/
?? homepage/
?? js/challenges.js
?? js/cloud-save.js
?? js/firebase-auth.js
?? js/locales-data.js
?? js/platform-capabilities.js
?? js/play-games-adapter.js
?? js/play-games-competitive.js
?? js/profile.js
?? js/ranking.js
?? js/storage.js
?? js/sync.js
?? js/world-challenge-checkpoint.js
?? js/world-challenge-storage.js
?? js/world-challenge-wallet.js
?? js/world-challenge.js
?? manifests/
?? plugins/
?? robots.txt
?? scripts/
?? tests/
```
### `git diff --name-status`

```text
M	css/style.css
M	index.html
M	js/app.js
M	js/background.js
M	js/i18n.js
M	locales/ar.json
M	locales/bn.json
M	locales/de.json
M	locales/en.json
M	locales/es.json
M	locales/fr.json
M	locales/hi.json
M	locales/id.json
M	locales/it.json
M	locales/ja.json
M	locales/ko.json
M	locales/nl.json
M	locales/pl.json
M	locales/pt-BR.json
M	locales/ru.json
M	locales/th.json
M	locales/tr.json
M	locales/uk.json
M	locales/vi.json
M	locales/zh-CN.json
M	manifest.json
```
### `git diff --stat`

```text
 css/style.css      | 2761 +++++++++++++++++++++++++++++++++++++++++++++++-----
 index.html         | 1020 ++++++++++---------
 js/app.js          | 2487 +++++++++++++++++++++++++++++++++++++++++-----
 js/background.js   |   16 +-
 js/i18n.js         |  504 +++++++++-
 locales/ar.json    |  182 +++-
 locales/bn.json    |  182 +++-
 locales/de.json    |  182 +++-
 locales/en.json    |  182 +++-
 locales/es.json    |  182 +++-
 locales/fr.json    |  182 +++-
 locales/hi.json    |  182 +++-
 locales/id.json    |  182 +++-
 locales/it.json    |  182 +++-
 locales/ja.json    |  182 +++-
 locales/ko.json    |  182 +++-
 locales/nl.json    |  182 +++-
 locales/pl.json    |  182 +++-
 locales/pt-BR.json |  182 +++-
 locales/ru.json    |  182 +++-
 locales/th.json    |  182 +++-
 locales/tr.json    |  182 +++-
 locales/uk.json    |  182 +++-
 locales/vi.json    |  182 +++-
 locales/zh-CN.json |  182 +++-
 manifest.json      |   28 +-
 26 files changed, 9408 insertions(+), 1048 deletions(-)
```
### `git ls-files`

```text
assets/flags/ad.svg
assets/flags/ae.svg
assets/flags/af.svg
assets/flags/ag.svg
assets/flags/ai.svg
assets/flags/al.svg
assets/flags/am.svg
assets/flags/ao.svg
assets/flags/aq.svg
assets/flags/ar.svg
assets/flags/as.svg
assets/flags/at.svg
assets/flags/au.svg
assets/flags/aw.svg
assets/flags/ax.svg
assets/flags/az.svg
assets/flags/ba.svg
assets/flags/bb.svg
assets/flags/bd.svg
assets/flags/be.svg
assets/flags/bf.svg
assets/flags/bg.svg
assets/flags/bh.svg
assets/flags/bi.svg
assets/flags/bj.svg
assets/flags/bl.svg
assets/flags/bm.svg
assets/flags/bn.svg
assets/flags/bo.svg
assets/flags/bq.svg
assets/flags/br.svg
assets/flags/bs.svg
assets/flags/bt.svg
assets/flags/bv.svg
assets/flags/bw.svg
assets/flags/by.svg
assets/flags/bz.svg
assets/flags/ca.svg
assets/flags/cc.svg
assets/flags/cd.svg
assets/flags/cf.svg
assets/flags/cg.svg
assets/flags/ch.svg
assets/flags/ci.svg
assets/flags/ck.svg
assets/flags/cl.svg
assets/flags/cm.svg
assets/flags/cn.svg
assets/flags/co.svg
assets/flags/cr.svg
assets/flags/cu.svg
assets/flags/cv.svg
assets/flags/cw.svg
assets/flags/cx.svg
assets/flags/cy.svg
assets/flags/cz.svg
assets/flags/de.svg
assets/flags/dj.svg
assets/flags/dk.svg
assets/flags/dm.svg
assets/flags/do.svg
assets/flags/dz.svg
assets/flags/ec.svg
assets/flags/ee.svg
assets/flags/eg.svg
assets/flags/eh.svg
assets/flags/er.svg
assets/flags/es.svg
assets/flags/et.svg
assets/flags/eu.svg
assets/flags/fi.svg
assets/flags/fj.svg
assets/flags/fk.svg
assets/flags/fm.svg
assets/flags/fo.svg
assets/flags/fr.svg
assets/flags/ga.svg
assets/flags/gb-eng.svg
assets/flags/gb-nir.svg
assets/flags/gb-sct.svg
assets/flags/gb-wls.svg
assets/flags/gb.svg
assets/flags/gd.svg
assets/flags/ge.svg
assets/flags/gf.svg
assets/flags/gg.svg
assets/flags/gh.svg
assets/flags/gi.svg
assets/flags/gl.svg
assets/flags/gm.svg
assets/flags/gn.svg
assets/flags/gp.svg
assets/flags/gq.svg
assets/flags/gr.svg
assets/flags/gs.svg
assets/flags/gt.svg
assets/flags/gu.svg
assets/flags/gw.svg
assets/flags/gy.svg
assets/flags/hk.svg
assets/flags/hm.svg
assets/flags/hn.svg
assets/flags/hr.svg
assets/flags/ht.svg
assets/flags/hu.svg
assets/flags/id.svg
assets/flags/ie.svg
assets/flags/il.svg
assets/flags/im.svg
assets/flags/in.svg
assets/flags/io.svg
assets/flags/iq.svg
assets/flags/ir.svg
assets/flags/is.svg
assets/flags/it.svg
assets/flags/je.svg
assets/flags/jm.svg
assets/flags/jo.svg
assets/flags/jp.svg
assets/flags/ke.svg
assets/flags/kg.svg
assets/flags/kh.svg
assets/flags/ki.svg
assets/flags/km.svg
assets/flags/kn.svg
assets/flags/kp.svg
assets/flags/kr.svg
assets/flags/kw.svg
assets/flags/ky.svg
assets/flags/kz.svg
assets/flags/la.svg
assets/flags/lb.svg
assets/flags/lc.svg
assets/flags/li.svg
assets/flags/lk.svg
assets/flags/lr.svg
assets/flags/ls.svg
assets/flags/lt.svg
assets/flags/lu.svg
assets/flags/lv.svg
assets/flags/ly.svg
assets/flags/ma.svg
assets/flags/mc.svg
assets/flags/md.svg
assets/flags/me.svg
assets/flags/mf.svg
assets/flags/mg.svg
assets/flags/mh.svg
assets/flags/mk.svg
assets/flags/ml.svg
assets/flags/mm.svg
assets/flags/mn.svg
assets/flags/mo.svg
assets/flags/mp.svg
assets/flags/mq.svg
assets/flags/mr.svg
assets/flags/ms.svg
assets/flags/mt.svg
assets/flags/mu.svg
assets/flags/mv.svg
assets/flags/mw.svg
assets/flags/mx.svg
assets/flags/my.svg
assets/flags/mz.svg
assets/flags/na.svg
assets/flags/nc.svg
assets/flags/ne.svg
assets/flags/nf.svg
assets/flags/ng.svg
assets/flags/ni.svg
assets/flags/nl.svg
assets/flags/no.svg
assets/flags/np.svg
assets/flags/nr.svg
assets/flags/nu.svg
assets/flags/nz.svg
assets/flags/om.svg
assets/flags/pa.svg
assets/flags/pe.svg
assets/flags/pf.svg
assets/flags/pg.svg
assets/flags/ph.svg
assets/flags/pk.svg
assets/flags/pl.svg
assets/flags/pm.svg
assets/flags/pn.svg
assets/flags/pr.svg
assets/flags/ps.svg
assets/flags/pt.svg
assets/flags/pw.svg
assets/flags/py.svg
assets/flags/qa.svg
assets/flags/re.svg
assets/flags/ro.svg
assets/flags/rs.svg
assets/flags/ru.svg
assets/flags/rw.svg
assets/flags/sa.svg
assets/flags/sb.svg
assets/flags/sc.svg
assets/flags/sd.svg
assets/flags/se.svg
assets/flags/sg.svg
assets/flags/sh.svg
assets/flags/si.svg
assets/flags/sj.svg
assets/flags/sk.svg
assets/flags/sl.svg
assets/flags/sm.svg
assets/flags/sn.svg
assets/flags/so.svg
assets/flags/sr.svg
assets/flags/ss.svg
assets/flags/st.svg
assets/flags/sv.svg
assets/flags/sx.svg
assets/flags/sy.svg
assets/flags/sz.svg
assets/flags/tc.svg
assets/flags/td.svg
assets/flags/tf.svg
assets/flags/tg.svg
assets/flags/th.svg
assets/flags/tj.svg
assets/flags/tk.svg
assets/flags/tl.svg
assets/flags/tm.svg
assets/flags/tn.svg
assets/flags/to.svg
assets/flags/tr.svg
assets/flags/tt.svg
assets/flags/tv.svg
assets/flags/tw.svg
assets/flags/tz.svg
assets/flags/ua.svg
assets/flags/ug.svg
assets/flags/um.svg
assets/flags/us.svg
assets/flags/uy.svg
assets/flags/uz.svg
assets/flags/va.svg
assets/flags/vc.svg
assets/flags/ve.svg
assets/flags/vg.svg
assets/flags/vi.svg
assets/flags/vn.svg
assets/flags/vu.svg
assets/flags/wf.svg
assets/flags/ws.svg
assets/flags/xk.svg
assets/flags/ye.svg
assets/flags/yt.svg
assets/flags/za.svg
assets/flags/zm.svg
assets/flags/zw.svg
css/style.css
index.html
js/app.js
js/background.js
js/countries.js
js/i18n.js
locales/ar.json
locales/bn.json
locales/de.json
locales/en.json
locales/es.json
locales/fr.json
locales/hi.json
locales/id.json
locales/it.json
locales/ja.json
locales/ko.json
locales/nl.json
locales/pl.json
locales/pt-BR.json
locales/ru.json
locales/th.json
locales/tr.json
locales/uk.json
locales/vi.json
locales/zh-CN.json
manifest.json
```
### `git ls-files --others --exclude-standard`

```text
.gitignore
assets/images/2400-1.png
assets/images/2400-2.png
assets/images/2400-3.png
assets/images/chrome.png
assets/images/edge.png
assets/images/firefox.png
assets/images/globo.png
assets/images/logo.png
assets/images/logo128.png
assets/images/logo16.png
assets/images/logo32.png
assets/images/logo48.png
assets/images/pix-qrcode.png
assets/pix-qrcode.png
"divulga\303\247\303\243o/1400-560.jpg"
"divulga\303\247\303\243o/300.png"
"divulga\303\247\303\243o/440-280.jpg"
"divulga\303\247\303\243o/ChatGPT Image 11 de jul. de 2026, 14_17_23.png"
"divulga\303\247\303\243o/ChatGPT Image 11 de jul. de 2026, 14_53_21.png"
"divulga\303\247\303\243o/ChatGPT Image 12 de jul. de 2026, 20_00_00.png"
"divulga\303\247\303\243o/flag-game-resultado (1).png"
"divulga\303\247\303\243o/flag-game-resultado.png"
"divulga\303\247\303\243o/print-2.jpg"
"divulga\303\247\303\243o/print-3.jpg"
"divulga\303\247\303\243o/print-4.jpg"
"divulga\303\247\303\243o/print-5.jpg"
"divulga\303\247\303\243o/print1.jpg"
docs/firebase-auth-architecture.md
docs/homepage/FINAL_AUDIT.md
docs/homepage/FLAG_GAME_DESIGN_SYSTEM.md
docs/homepage/FLAG_GAME_HOMEPAGE_COPY.md
docs/homepage/FLAG_GAME_HOMEPAGE_IMPLEMENTATION_PLAN.md
docs/homepage/FLAG_GAME_HOMEPAGE_REVIEW.md
docs/homepage/FLAG_GAME_HOMEPAGE_SPEC.md
docs/homepage/IMPLEMENTATION_RULES.md
docs/homepage/PUBLICATION_CHECKLIST.md
docs/online-ranking-architecture.md
docs/sync-strategy.md
docs/world-challenge/AUDIT.md
docs/world-challenge/CLOUD_SAVE.md
docs/world-challenge/CURRENT_DATA.md
docs/world-challenge/DATA_MIGRATION.md
docs/world-challenge/ENGINE.md
docs/world-challenge/GOOGLE_PLAY_GAMES_ANDROID.md
docs/world-challenge/IMPLEMENTATION_PLAN.md
docs/world-challenge/PERSISTENCE.md
docs/world-challenge/PLATFORM_MATRIX.md
docs/world-challenge/PLAY_GAMES_CHECKLIST.md
docs/world-challenge/POST_IMPLEMENTATION_AUDIT.md
game/index.html
homepage/assets/logo-homepage.png
homepage/css/base.css
homepage/css/components.css
homepage/css/responsive.css
homepage/css/sections.css
homepage/css/tokens.css
homepage/js/homepage-i18n.js
homepage/js/homepage.js
js/challenges.js
js/cloud-save.js
js/firebase-auth.js
js/locales-data.js
js/platform-capabilities.js
js/play-games-adapter.js
js/play-games-competitive.js
js/profile.js
js/ranking.js
js/storage.js
js/sync.js
js/world-challenge-checkpoint.js
js/world-challenge-storage.js
js/world-challenge-wallet.js
js/world-challenge.js
manifests/manifest.chrome.json
manifests/manifest.edge.json
manifests/manifest.firefox.json
plugins/capacitor-play-games/android/build.gradle
plugins/capacitor-play-games/android/src/main/AndroidManifest.xml
plugins/capacitor-play-games/android/src/main/java/app/flaggame/playgames/FlagGamePlayGamesPlugin.java
plugins/capacitor-play-games/android/src/main/res/values/play_games_ids.xml
plugins/capacitor-play-games/package.json
plugins/capacitor-play-games/src/definitions.ts
plugins/capacitor-play-games/src/index.ts
robots.txt
scripts/build-extensions.js
tests/cloud-save.test.js
tests/platform-capabilities.test.js
tests/play-games-adapter.test.js
tests/play-games-competitive.test.js
tests/world-challenge-checkpoint.test.js
tests/world-challenge-storage.test.js
tests/world-challenge-wallet.test.js
tests/world-challenge.test.js
```
### `git status --short --ignored=matching dist Flaggame.zip dist/packages/flag-game-chrome-1.1.0.zip`

```text
!! Flaggame.zip
!! dist/
```

## 2. Arquivos alterados nao mencionados

### `js/background.js`

- Alteracao presente: troca `chrome` direto por `globalThis.browser || globalThis.chrome`, abre `game/index.html` em vez de `index.html`, e trata Promise/catch quando disponivel.
- Provavel origem: etapa de empacotamento/entrypoint das extensoes ou migracao para homepage em `index.html`.
- Necessario para Desafio Mundial: sim para as extensoes abrirem a interface correta do jogo, pois o card simplificado esta em `game/index.html`.
- Necessario para checkpoint: indiretamente, porque checkpoint so carrega se a extensao abrir `game/index.html`.
- Gerado automaticamente: nao parece; e mudanca manual de codigo fonte.
- Recomendacao: entrar no futuro commit junto com `game/index.html` e scripts do jogo.

### `manifest.json`

- Alteracao presente: nome/short_name/version/description/homepage_url/icons/default_icon atualizados para extensao 1.1.0.
- Provavel origem: fase de preparacao/publicacao das extensoes.
- Necessario para Desafio Mundial: nao para a logica; sim para empacotar extensoes com assets atuais.
- Necessario para checkpoint: nao diretamente.
- Gerado automaticamente: nao; os manifests de `manifests/` sao fontes por plataforma e o build copia para `dist/*/manifest.json`.
- Recomendacao: revisar se `manifest.json` raiz ainda e usado ou se os manifests de `manifests/` sao a fonte canonica. Pode entrar se o projeto ainda distribui manifest raiz.

### `index.html`

- Alteracao presente: deixou de ser a UI do jogo e virou homepage/site publico, com SEO, Google tag, assets de `homepage/` e links para `game/`.
- Provavel origem: fase de homepage/GitHub Pages.
- Necessario para Desafio Mundial: nao para o motor; necessario para site principal/GitHub Pages direcionar ao jogo.
- Necessario para checkpoint: nao.
- Gerado automaticamente: nao parece; e conteudo fonte da homepage.
- Recomendacao: entrar no commit se a homepage fizer parte da entrega, junto com `homepage/`, `robots.txt` e assets usados.

### `game/index.html`

- Alteracao presente: arquivo untracked que contem a UI real do jogo, card simplificado do Desafio Mundial, scripts de world challenge/checkpoint e paineis de perfil/resultados.
- Provavel origem: separacao homepage (`index.html`) versus jogo (`game/index.html`) e fases do Desafio Mundial.
- Necessario para Desafio Mundial: sim, e o principal entrypoint do jogo.
- Necessario para checkpoint: sim, carrega `js/world-challenge-checkpoint.js` antes de `js/app.js`.
- Gerado automaticamente: nao; e fonte copiada pelo build para `dist/*/game/index.html`.
- Recomendacao: deve entrar no futuro commit.

## 3. Mapeamento das entradas por plataforma

| Plataforma | HTML usado | Scripts principais | Observacao |
| --- | --- | --- | --- |
| Site principal | `index.html` | `homepage/js/homepage-i18n.js`, `homepage/js/homepage.js` | Homepage publica; links apontam para `game/`. |
| GitHub Pages | `index.html` na raiz | scripts da homepage | Pelo diff, a raiz foi preparada como homepage estatico para Pages. |
| Pagina do jogo Web | `game/index.html` | `js/countries.js`, `js/storage.js`, `js/platform-capabilities.js`, `js/play-games-adapter.js`, `js/cloud-save.js`, `js/locales-data.js`, `js/i18n.js`, `js/profile.js`, `js/challenges.js`, `js/ranking.js`, `js/play-games-competitive.js`, `js/firebase-auth.js`, `js/sync.js`, `js/world-challenge.js`, `js/world-challenge-storage.js`, `js/world-challenge-wallet.js`, `js/world-challenge-checkpoint.js`, `js/app.js` | Entrada real da UI do jogo. |
| Chrome | `dist/chrome/game/index.html`, aberto por `dist/chrome/js/background.js` via `runtime.getURL("game/index.html")` | scripts copiados de `game/index.html` | Build validado. |
| Edge | `dist/edge/game/index.html`, aberto por background | scripts copiados de `game/index.html` | Build validado. |
| Firefox | `dist/firefox/game/index.html`, aberto por background; manifest inclui Gecko settings | scripts copiados de `game/index.html` | Build validado. |
| Android com Capacitor | Nao comprovavel neste checkout | Dependeria de `webDir` em `capacitor.config.*`, ausente | Nao ha projeto Android/Capacitor app na raiz. |

- Conteudo duplicado: sim em runtime/build, porque `scripts/build-extensions.js` copia `game/`, `css/`, `js/`, `assets/` e `locales/` para cada `dist/<platform>/`. Essa duplicacao e gerada e nao deve ser commitada.
- `index.html` nao contem mais os cards do jogo. O card simplificado esta em `game/index.html` e nos builds `dist/chrome|edge|firefox/game/index.html`.
- Nenhuma plataforma de extensao deveria usar `index.html`; `js/background.js` aponta para `game/index.html`.

## 4. Build das extensoes

- Comando executado: `node scripts/build-extensions.js`.
- Resultado: sucesso, sem erros. Saida: `Built Flag Game 1.1.0`, `dist\chrome`, `dist\edge`, `dist\firefox` e tres ZIPs em `dist\packages`.
- Observacao importante: o script sempre cria ZIPs; eles foram gerados pelo comando solicitado, mas `/dist/` e `/*.zip` estao ignorados e nao devem ser adicionados ao Git.
- Chrome gerado: sim.
- Edge gerado: sim.
- Firefox gerado: sim.
- HTML final com cards: `dist/<platform>/game/index.html`.
- CSS final usado: `dist/<platform>/css/style.css`.
- Textos removidos no card: `<span class="modo-descricao">`, `world-challenge-records-preview` e `platform-disclosure` estao ausentes do HTML final dos builds. A frase longa ainda existe dentro da tela interna da partida (`experiente-intro`), o que estava permitido.
- Google Play Games nas extensoes: existe markup do painel no perfil, mas envolvido por `data-requires-capability="supportsPlayGames"`; controles de ranking/conquistas tambem dependem de capabilities. A camada JS nega GPG fora de Android/plugin. Portanto nao ha botao funcional indevido esperado nas extensoes.

## 5. Verificacao estrutural do layout

- Mesma altura dos cards: estruturalmente sim. `.modo` define `min-height` comum e grid interno fixo.
- Icones/titulos/subtitulos alinhados: sim por `grid-template-areas` (`icon`, `title`, `subtitle`, `details`) e linhas comuns.
- Area complementar compacta: sim; apenas `#btn-experiente` tem texto real em `.modo-detalhes`. Os outros usam `.modo:not(#btn-experiente)::after` como area estrutural sem conteudo acessivel.
- Ausencia dos textos removidos no card: sim em `game/index.html` e em `dist/*/game/index.html`.
- Empilhamento mobile/popup: CSS em media query usa grid de duas colunas com areas nomeadas equivalentes.
- Texto invisivel como espassador: nao ha texto invisivel no HTML; ha pseudo-elemento CSS vazio, nao anunciado por leitores de tela.
- Traducoes longas: nao ha corte evidente no CSS porque usa `minmax(..., auto)` e `min-height`, nao altura fixa. Sem screenshot automatizado nesta auditoria, a validacao visual e estatica.
- Limitacao: nao usei navegador/screenshot automatizado nesta etapa; validacao foi por build real gerado e inspecao de HTML/CSS finais.

## 6. Revisao estatica do checkpoint

- `visibilitychange`: `bindPageLifecycle` registra handler e chama checkpoint quando `document.visibilityState === "hidden"`.
- `pagehide`: `bindPageLifecycle` registra handler em `window`.
- Prevencao de duplicidade: `MIN_WRITE_INTERVAL_MS = 750`, assinatura por run/status/question/lives/progresso/filas e retorno `duplicate_checkpoint`.
- Mesmo `runId`: `writeCheckpoint` recebe `worldChallengeRunId`; `restoreGame` retorna `runId`, e `app.js` reaplica em `worldChallengeRunId`.
- `rankingEligible = false`: restauracao força `rankingEligible: false`.
- Vidas/filas: checkpoint serializa `lives`, `initialLives`, `queue`, `retryQueue`, `answeredCorrect`, `currentQuestion` e `feedback`; restore filtra IDs conhecidos e reconstroi com os paises atuais.
- Cronometro: checkpoint e restore usam `startedAt`, `elapsedSeconds` e `Date.now()`; `app.js` recalcula por `calcularSegundosExperiente`, incluindo periodo em segundo plano.
- Sem recompensa/historico: `salvarCheckpointWorldChallenge` chama apenas `FlagGameWorldChallengeCheckpoint.writeCheckpoint`; nao chama `recordRun`, `recordGame` nem `earnMilestoneRewards`.
- Abandono/resultado: `registrarInterrupcaoWorldChallenge` e `finalizarModoExperiente` limpam checkpoint.
- Nenhum erro funcional comprovado foi encontrado nesta revisao estatica; nao apliquei correcao de logica nesta tarefa.

## 7. Plano de versionamento

### Deve entrar no proximo commit

- Codigo-fonte do jogo: `game/index.html`, `css/style.css`, `js/app.js`, `js/world-challenge.js`, `js/world-challenge-storage.js`, `js/world-challenge-wallet.js`, `js/world-challenge-checkpoint.js`, `js/platform-capabilities.js`, `js/play-games-adapter.js`, `js/play-games-competitive.js`, `js/cloud-save.js`, `js/profile.js`, `js/storage.js`, `js/ranking.js`, `js/challenges.js`, `js/sync.js`, `js/firebase-auth.js`, `js/locales-data.js`, `js/background.js`.
- Testes: `tests/world-challenge*.test.js`, `tests/platform-capabilities.test.js`, `tests/play-games-*.test.js`, `tests/cloud-save.test.js`.
- Traducoes: `locales/*.json`.
- Extensoes/config fonte: `manifests/*.json`, `manifest.json` se ainda usado, `scripts/build-extensions.js`, `.gitignore`.
- Documentacao da feature: `docs/world-challenge/*.md`, incluindo este relatorio.

### Arquivo antigo ainda nao rastreado que precisa de decisao

- `homepage/`, `index.html`, `robots.txt`: parecem compor homepage/GitHub Pages; entrar se homepage for parte do release.
- `assets/images/` e `assets/pix-qrcode.png`: assets usados por homepage/extensoes; revisar origem/licenca antes de commit.
- `divulgacao/` (aparece como nome codificado no status): midia/divulgacao fora do codigo; precisa decisao de produto.

### Gerado e nao deve ser versionado

- `dist/` inteiro.
- `dist/packages/*.zip`.
- `Flaggame.zip`.

### Possivel duplicado / precisa revisao antes de versionar

- `manifest.json` raiz versus `manifests/manifest.*.json`: confirmar qual e fonte canonica para extensoes.
- Conteudo copiado em `dist/`: duplicado gerado, nao versionar.

## 8. Recomendacao de commit seguro

- Commit da feature deve incluir fontes e testes, mas excluir `dist/`, ZIPs e midia de divulgacao sem decisao.
- Antes de `git add`, revisar explicitamente `homepage/`, `assets/images/`, `assets/pix-qrcode.png`, `manifest.json` raiz e `divulgacao/`.
- Nao adicionar Android/plugin nativo se a intencao do commit for apenas Web/extensoes/checkpoint; se incluir GPG preparado, incluir `plugins/capacitor-play-games/` junto com docs correspondentes.

## 9. Status final

### `git status --short final`

```text
 M css/style.css
 M index.html
 M js/app.js
 M js/background.js
 M js/i18n.js
 M locales/ar.json
 M locales/bn.json
 M locales/de.json
 M locales/en.json
 M locales/es.json
 M locales/fr.json
 M locales/hi.json
 M locales/id.json
 M locales/it.json
 M locales/ja.json
 M locales/ko.json
 M locales/nl.json
 M locales/pl.json
 M locales/pt-BR.json
 M locales/ru.json
 M locales/th.json
 M locales/tr.json
 M locales/uk.json
 M locales/vi.json
 M locales/zh-CN.json
 M manifest.json
?? .gitignore
?? assets/images/
?? assets/pix-qrcode.png
?? "divulga\303\247\303\243o/"
?? docs/
?? game/
?? homepage/
?? js/challenges.js
?? js/cloud-save.js
?? js/firebase-auth.js
?? js/locales-data.js
?? js/platform-capabilities.js
?? js/play-games-adapter.js
?? js/play-games-competitive.js
?? js/profile.js
?? js/ranking.js
?? js/storage.js
?? js/sync.js
?? js/world-challenge-checkpoint.js
?? js/world-challenge-storage.js
?? js/world-challenge-wallet.js
?? js/world-challenge.js
?? manifests/
?? plugins/
?? robots.txt
?? scripts/
?? tests/
```
### `git diff --stat final`

```text
 css/style.css      | 2761 +++++++++++++++++++++++++++++++++++++++++++++++-----
 index.html         | 1020 ++++++++++---------
 js/app.js          | 2487 +++++++++++++++++++++++++++++++++++++++++-----
 js/background.js   |   16 +-
 js/i18n.js         |  504 +++++++++-
 locales/ar.json    |  182 +++-
 locales/bn.json    |  182 +++-
 locales/de.json    |  182 +++-
 locales/en.json    |  182 +++-
 locales/es.json    |  182 +++-
 locales/fr.json    |  182 +++-
 locales/hi.json    |  182 +++-
 locales/id.json    |  182 +++-
 locales/it.json    |  182 +++-
 locales/ja.json    |  182 +++-
 locales/ko.json    |  182 +++-
 locales/nl.json    |  182 +++-
 locales/pl.json    |  182 +++-
 locales/pt-BR.json |  182 +++-
 locales/ru.json    |  182 +++-
 locales/th.json    |  182 +++-
 locales/tr.json    |  182 +++-
 locales/uk.json    |  182 +++-
 locales/vi.json    |  182 +++-
 locales/zh-CN.json |  182 +++-
 manifest.json      |   28 +-
 26 files changed, 9408 insertions(+), 1048 deletions(-)
```
