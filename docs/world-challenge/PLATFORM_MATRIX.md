# Platform Matrix

Esta matriz documenta como o projeto atual diferencia plataformas e quais riscos existem para a futura modalidade "Desafio Mundial - Modo Experiente".

## Plataformas encontradas

| Plataforma | Evidencia no repo | Como roda hoje | Observacoes |
| --- | --- | --- | --- |
| Site/homepage | `index.html`, `homepage/*` | Pagina publica/estatica | Usa Google tag em `index.html:11-18`; link do jogo aponta para `game/` em `index.html:421-424`. |
| Jogo web | `game/index.html`, `js/*`, `css/style.css`, `assets/*`, `locales/*` | HTML/CSS/JS estatico | Sem service worker web encontrado. |
| GitHub Pages | `manifest.json:10` e manifestos com `homepage_url` | URL declarada `https://flaggameapp.github.io/flaggameapp/` | Nao ha config especifica de Pages alem de arquivos estaticos. |
| Chrome extension | `manifests/manifest.chrome.json` | MV3 com background service worker | Abre `game/index.html` por `js/background.js:3-6`. |
| Edge extension | `manifests/manifest.edge.json` | MV3 com background service worker | Mesmo modelo do Chrome. |
| Firefox extension | `manifests/manifest.firefox.json` | MV3 com `browser_specific_settings.gecko` | Manifest inclui `background.scripts` e `service_worker` em `manifests/manifest.firefox.json:23-28`. |
| Android/Capacitor | App Android nao encontrado; plugin local em `plugins/capacitor-play-games` | Plugin preparado, app nao auditavel localmente | Nao ha `android/`, `capacitor.config.*`, Gradle ou Activity de app neste checkout. |

## Manifestos e CSP

- `manifest.json:1-32`: manifest MV3 raiz com `background.service_worker = js/background.js`.
- `manifests/manifest.chrome.json:1-26`: Chrome MV3.
- `manifests/manifest.edge.json:1-26`: Edge MV3.
- `manifests/manifest.firefox.json:1-40`: Firefox MV3 com Gecko ID `flaggame@flaggame.app`.
- Nao foram encontrados `Content-Security-Policy`, `script-src` ou `connect-src` no fonte auditado.
- Extensoes nao declaram `permissions` nem `host_permissions` nos manifestos atuais.

## Service workers

- Extensoes usam `js/background.js` como background/service worker.
- `js/background.js:1` escolhe `globalThis.browser || globalThis.chrome`.
- `js/background.js:3-6` abre `game/index.html` quando a action da extensao e clicada.
- Nao foi encontrado `navigator.serviceWorker.register(...)`.
- Nao foi encontrado `sw.js` ou `service-worker.js` no fonte principal.

## Build e arquivos compartilhados

`scripts/build-extensions.js` empacota extensoes.

- Plataformas: chrome, edge, firefox em `scripts/build-extensions.js:9-25`.
- Diretorios copiados: `assets`, `css`, `game`, `js`, `locales` em `scripts/build-extensions.js:27-33`.
- Diretorios proibidos no pacote: `.git`, `.agents`, `.codex`, `dist`, `docs`, `homepage`, `manifests`, `scripts` etc. em `scripts/build-extensions.js:35-47`.
- Validacao de manifestos em `scripts/build-extensions.js:128-219`.
- Validacao de referencias HTML em `scripts/build-extensions.js:221-250`.
- Validacao de bandeiras em `scripts/build-extensions.js:252-269`.
- Validacao de locales em `scripts/build-extensions.js:271-300`.
- Validacao JS com `node --check` em `scripts/build-extensions.js:328-348`.

Risco: qualquer alteracao em `game`, `js`, `css`, `assets` ou `locales` entra nas extensoes no proximo build. `homepage` nao entra nas extensoes.

## Deteccao atual de plataforma

- Homepage detecta browser por `navigator.userAgent` em `homepage/js/homepage.js:66-82`.
- Homepage detecta contexto de extensao Chrome por `window.location.protocol === "chrome-extension:"` em `homepage/js/homepage.js:39-45`.
- I18n resolve assets por `chrome.runtime.getURL` ou `browser.runtime.getURL` em `js/i18n.js:139-157`.
- Background de extensao usa `globalThis.browser || globalThis.chrome` em `js/background.js:1`.
- Ha detector centralizado para Android/Capacitor em `js/platform-capabilities.js`.
- Ha adapter JavaScript de Play Games em `js/play-games-adapter.js`, com fallback sem erro para Web e extensoes.
- Nao ha condicional atual que limite ranking por plataforma.

## Ranking por plataforma

| Plataforma | Ranking local atual | Ranking global atual | Requisito futuro |
| --- | --- | --- | --- |
| Site | Fila local `flagGameRankingQueue` | Nao existe | Nao exibir nem enviar ranking global. |
| GitHub Pages | Fila local `flagGameRankingQueue` | Nao existe | Nao exibir nem enviar ranking global. |
| Chrome | Fila local dentro storage da extensao | Nao existe | Nao exibir nem enviar ranking global. |
| Edge | Fila local dentro storage da extensao | Nao existe | Nao exibir nem enviar ranking global. |
| Firefox | Fila local dentro storage da extensao | Nao existe | Nao exibir nem enviar ranking global. |
| Android | Nao encontrado | Nao encontrado | Integrar futuro Google Play Games somente Android. |

## Camada central de capacidades

Implementado em `js/platform-capabilities.js`.

Capacidades expostas:

- `isAndroidApp`.
- `isWeb`.
- `isChromeExtension`.
- `isEdgeExtension`.
- `isFirefoxExtension`.
- `supportsLocalHistory`.
- `supportsPlayGames`.
- `supportsGlobalLeaderboards`.
- `supportsCloudSave`.
- `supportsOfficialAchievements`.

Comportamento inicial:

- Historico local, recordes pessoais, moedas gratuitas e continuacao ficam habilitados em todas as plataformas.
- Site e extensoes retornam `supportsGlobalLeaderboards = false` e `supportsCloudSave = false`.
- Android retorna Play Games/cloud save somente quando existir adapter nativo explicito em `window.FlagGamePlayGames`.
- Ranking global e conquistas oficiais ficam disponiveis somente no Android quando o plugin nativo expuser placares/conquistas.
- O componente `platform-disclosure` informa fora do Android: "Dispute o ranking global e mantenha seu progresso salvo no aplicativo Android."
- O botao de instalacao so aparece quando `FlagGamePlatformConfig.googlePlayUrl` tiver URL configurada.

## Android auditado

Resultado: nao ha projeto Android/Capacitor de app no workspace atual.

Nao encontrados:

- `android/`.
- `capacitor.config.*`.
- `package.json` com dependencias Capacitor.
- `build.gradle`.
- `settings.gradle`.
- `gradle.properties`.
- `AndroidManifest.xml`.
- `MainActivity.*`.
- `google-services.json`.
- package name.
- `applicationId`.
- plugins Capacitor.
- integracao Google anterior.
- assinatura ou configs Android.

Conclusao: nao e possivel confirmar linguagem nativa, Activity principal, versao do Capacitor, Gradle, plugins existentes, package name ou applicationId a partir deste checkout.

Base adicionada em 2026-07-19:

- Plugin local Capacitor: `plugins/capacitor-play-games`.
- Dependencia exata: `com.google.android.gms:play-services-games-v2:21.0.0`.
- Ponte JS: `window.FlagGamePlayGames`.
- Metodos expostos: `isAvailable()`, `getAuthenticationStatus()`, `requestAuthenticationRetry()`, `getPlayerSummary()`, `syncSavedGame()`, `commitSavedGame()`, `submitLeaderboardScore()`, `unlockAchievement()`, `openLeaderboards()`, `openAchievements()`.
- Fora do Android, o adapter informa indisponibilidade sem lancar erro.
- Saved Games fica disponivel somente no Android com plugin nativo.
- Ranking global, achievements oficiais e envio de pontuacoes usam fila local e ficam restritos ao Android autenticado.

Base de cloud save adicionada:

- Snapshot local-first em `js/cloud-save.js`.
- Nome do snapshot: `flag_game_world_challenge_v1`.
- Merge deterministico por recordes, historico, transacoes, conquistas, marcos, preferencias e contadores por `installationId`.
- Web e extensoes nao sincronizam.

Melhor local futuro, quando o projeto Android existir:

- Camada web: adapter JS de ranking com interface clara, carregado apenas quando `Capacitor.getPlatform() === "android"` ou quando uma ponte nativa explicita existir.
- Camada nativa: plugin Capacitor proprio para Google Play Games dentro do projeto Android.
- Contrato: o plugin deve receber apenas payloads `world_challenge` concluidos e devolver status/erro; a WebView nao deve tentar usar ranking em site/extensoes.

## Matriz de riscos

| Risco | Gravidade | Plataformas afetadas | Mitigacao |
| --- | --- | --- | --- |
| Alterar `js/app.js` para o novo modo sem separar legado muda comportamento em todas as plataformas empacotadas. | Alta | Web, GitHub Pages, Chrome, Edge, Firefox, Android futuro | Criar modulo/tela nova e manter modo legado isolado. |
| Reusar `flagGameRankingQueue` para ranking Android publica scores de Web/extensoes. | Alta | Todas | Criar fila/payload novo com `platform: "android"` e `mode: "world_challenge"`. |
| Ausencia de detector Android central torna facil exibir ranking global fora do Android. | Alta | Web/extensoes | Criar `PlatformService`/adapter e negar por padrao. |
| `dist/` e packages podem ficar defasados em relacao ao fonte. | Media | Extensoes | Rodar build apos implementacao futura e validar zips. |
| `Intl.DisplayNames` pode variar entre browsers/WebView. | Media | Todas | Deduplicar alternativas por nome exibido no runtime e ter fallback testado. |
| Nao ha CSP declarada; futuras integracoes externas podem funcionar em Web e falhar em extensoes. | Media | Extensoes | Planejar CSP/permissions antes de Google/Firebase/Supabase. |
| Android nao esta presente neste checkout. | Media | Android | Auditar projeto Android real antes de qualquer plugin. |
| Homepage tem `googlePlayUrl` vazio e card Android escondido. | Baixa | Site | Manter escondido ate publicacao real. |

## Recomendacao de plataforma para o novo modo

- Implementar o core do jogo como logica pura compartilhada.
- Manter storage e historico locais iguais em Web/extensoes/Android.
- Criar ranking global como capability opcional, injetada por adapter.
- Adapter padrao deve ser `offline`/`unsupported`.
- Adapter Android deve ser o unico que envia score global.
- UI deve esconder ranking global quando adapter reportar `unsupported`.
