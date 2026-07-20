# Google Play Games Services v2 - base Android

Este documento registra a base preparada para o Desafio Mundial no Android por meio de um plugin local do Capacitor. A camada JavaScript e o plugin Capacitor estao implementados, mas a integracao ainda precisa ser validada em um projeto Android real. Esta fase nao implementa compras, anuncios, Firebase ou Supabase.

## Estado do checkout atual

- Auditoria lida: `docs/world-challenge/PLATFORM_MATRIX.md`.
- Resultado confirmado em nova inspecao: este checkout nao contem `android/`, `capacitor.config.*`, Gradle wrapper, `settings.gradle`, `build.gradle` de app, `AndroidManifest.xml` de app, `MainActivity`, package name ou `applicationId`.
- `applicationId` encontrado: nao encontrado neste checkout.
- Java local encontrado: OpenJDK 21.
- Gradle local: nao encontrado no PATH.

Como nao ha projeto Android neste workspace, a entrega cria apenas o plugin local e o contrato JavaScript. A integracao no app Android real deve ser feita quando o projeto Capacitor/Android estiver presente.

## SDK verificado

Versao exata usada:

```gradle
implementation 'com.google.android.gms:play-services-games-v2:21.0.0'
```

A pagina oficial "Set up Google Play services" lista `com.google.android.gms:play-services-games-v2:21.0.0` para Google Play Games Services v2 for Android. A pagina "Get started with Play Games Services for Android games" ainda mostra `+` no exemplo de Gradle, mas este projeto fixa a versao exata para evitar builds nao deterministas.

## Plugin local

Arquivos criados:

- `plugins/capacitor-play-games/package.json`.
- `plugins/capacitor-play-games/src/definitions.ts`.
- `plugins/capacitor-play-games/src/index.ts`.
- `plugins/capacitor-play-games/android/build.gradle`.
- `plugins/capacitor-play-games/android/src/main/AndroidManifest.xml`.
- `plugins/capacitor-play-games/android/src/main/java/app/flaggame/playgames/FlagGamePlayGamesPlugin.java`.

Nome do plugin Capacitor:

```text
FlagGamePlayGames
```

Metodos expostos:

- `isAvailable()`.
- `getAuthenticationStatus()`.
- `requestAuthenticationRetry()`.
- `getPlayerSummary()`.
- `syncSavedGame()`.
- `commitSavedGame()`.
- `submitLeaderboardScore()`.
- `unlockAchievement()`.
- `openLeaderboards()`.
- `openAchievements()`.

Os metodos resolvem objetos estruturados. O plugin evita `reject` para erros esperados de plataforma, servico ou autenticacao, preservando a inicializacao do jogo.

Formato base de retorno:

```json
{
  "available": false,
  "authenticated": false,
  "status": "unsupported_platform",
  "playServicesStatus": 0,
  "player": null,
  "error": {
    "code": "structured_code",
    "message": "Human readable message",
    "nativeMessage": "Native exception message when available"
  }
}
```

Resumo do jogador, quando autenticado:

```json
{
  "player": {
    "playerId": "<PLAY_GAMES_PLAYER_ID>",
    "displayName": "<DISPLAY_NAME>",
    "iconImageUri": "<ICON_URI>",
    "hiResImageUri": "<HI_RES_URI>"
  }
}
```

## Adaptador JavaScript

Arquivo criado:

- `js/play-games-adapter.js`.

O adaptador instala `window.FlagGamePlayGames` e funciona em Web/extensoes sem lancar erro. Em plataformas nao Android ele retorna:

```json
{
  "available": false,
  "authenticated": false,
  "status": "unsupported_platform",
  "error": {
    "code": "unsupported_platform",
    "message": "Google Play Games Services is not available on this platform."
  }
}
```

No Android sem plugin nativo registrado, retorna `native_plugin_unavailable`.

Capacidades nesta fase:

- `cloudSave: true` somente no Android quando o plugin nativo expuser Saved Games.
- `leaderboards: true` somente no Android quando o plugin nativo expuser placares.
- `achievements: true` somente no Android quando o plugin nativo expuser conquistas.

Isso impede que a UI anuncie ranking global ou conquistas oficiais fora do Android.

## Configuracao necessaria na Play Console

Use placeholders para tudo que depende da Play Console. Nao inserir secrets, service account, JSON de credenciais ou chaves privadas no aplicativo.

1. Criar ou abrir o app Android no Google Play Console.
2. Criar o projeto de Play Games Services para o jogo.
3. Vincular o app Android ao projeto de Play Games Services.
4. Informar o package name/applicationId do app Android real: `<APPLICATION_ID_FROM_ANDROID_APP>`.
5. Adicionar o certificado SHA-1 de debug para testes locais.
6. Adicionar o certificado SHA-1 de release usado para builds assinados.
7. Adicionar contas de teste em Play Games Services.
8. Ativar Saved Games na configuracao do Play Games Services.
9. Publicar as alteracoes de configuracao do Play Games Services para testadores.

Saved Games pode levar algum tempo para ativar apos a configuracao na Play Console.

## SHA-1 necessario

Quando houver projeto Android, obtenha o SHA-1 de debug por um destes caminhos:

```powershell
keytool -list -v -keystore "$env:USERPROFILE\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

Ou pelo Android Studio/Gradle, quando o wrapper existir:

```powershell
.\gradlew signingReport
```

Valores a preencher na Play Console:

- Debug SHA-1: `<DEBUG_SHA1>`.
- Release SHA-1: `<RELEASE_SHA1>`.

## Recursos XML do app Android

No app Android real, adicionar o ID do projeto Play Games Services como recurso string. Nao inventar o valor; copiar da Play Console.

`app/src/main/res/values/games-ids.xml`:

```xml
<resources>
    <string name="game_services_project_id" translatable="false">&lt;PLAY_GAMES_PROJECT_ID&gt;</string>
</resources>
```

No `AndroidManifest.xml` do app, dentro de `<application>`:

```xml
<meta-data
    android:name="com.google.android.gms.games.APP_ID"
    android:value="@string/game_services_project_id" />
```

Nao foram adicionados IDs de achievements ou leaderboards nesta fase.
Saved Games foi preparado como snapshot na camada JavaScript e no plugin Capacitor local; a validacao real exige o `APP_ID` do Play Games Services ja descrito acima, o recurso ativado na Play Console e um projeto Android integrado.

## Como integrar quando o app Capacitor existir

1. Copiar ou manter `plugins/capacitor-play-games` no repositorio.
2. Adicionar o plugin local ao app Capacitor real.
3. Rodar o sync do Capacitor para Android.
4. Confirmar que o modulo Android do plugin aparece no projeto.
5. Confirmar que `app/build.gradle` nao usa `+` em dependencias Google Play Games.
6. Confirmar que o manifest do app contem `com.google.android.gms.games.APP_ID`.
7. Confirmar que `js/play-games-adapter.js` carrega antes de `js/app.js`.

## Como testar no Android Studio

1. Abrir o projeto Android real no Android Studio.
2. Sincronizar Gradle.
3. Executar em dispositivo ou emulator com Google Play Store/Google Play services.
4. Usar uma conta adicionada como testadora no Play Console.
5. Abrir o jogo e verificar que ele inicia mesmo se o Play Games falhar.
6. Chamar pelo console da WebView, quando disponivel:

```js
await window.FlagGamePlayGames.isAvailable()
await window.FlagGamePlayGames.getAuthenticationStatus()
await window.FlagGamePlayGames.requestAuthenticationRetry()
await window.FlagGamePlayGames.getPlayerSummary()
await window.FlagGamePlayGames.syncSavedGame({ snapshotName: "flag_game_world_challenge_v1" })
```

## Mensagens esperadas no Logcat

Filtro sugerido:

```text
FlagGamePlayGames
```

Mensagens esperadas:

- `Play Games SDK initialization requested`.
- `Play Games SDK initialization failed` apenas se a configuracao nativa estiver incompleta, ausente ou invalida.

Erros de autenticacao devem voltar ao JavaScript como `error.code`, por exemplo:

- `play_services_unavailable`.
- `activity_unavailable`.
- `authentication_status_failed`.
- `authentication_retry_failed`.
- `not_authenticated`.
- `player_summary_failed`.
- `snapshot_open_failed`.
- `snapshot_read_failed`.
- `snapshot_write_failed`.
- `snapshot_commit_failed`.
- `snapshot_conflict_commit_failed`.

## Decisoes de seguranca

- Nao usa `GoogleSignInClient`.
- Nao implementa login proprio.
- Nao implementa botao de logout.
- Nao envia pontuacoes.
- Acessa Saved Games somente para progresso local-first do app Android.
- Nao acessa achievements.
- Nao acessa leaderboards.
- Nao inclui secrets.
- Nao inclui service account.
- Nao depende de internet para Web/extensoes continuarem abrindo.

## Limitacao atual

O build Android nao pode ser executado neste checkout porque nao existe projeto Android/Capacitor nem Gradle wrapper. O plugin foi mantido isolado para ser incorporado ao app Android real sem inventar `applicationId`, package name do app ou IDs da Play Console.
