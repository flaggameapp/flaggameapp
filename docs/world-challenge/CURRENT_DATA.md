# Current Data Audit

Este documento inventaria dados persistidos e dados base usados pelo modo atual. Todos os acessos de jogo passam por `FlagGameStorage`, exceto fallback direto de idioma em `js/i18n.js` quando `FlagGameStorage` nao existe.

## Camada de armazenamento

`js/storage.js:1-168` define `FlagGameStorage`.

- Leitura bruta: `getRaw(key)` em `js/storage.js:33-58`.
- Escrita bruta: `setRaw(key, value)` em `js/storage.js:60-77`.
- JSON: `getJson()` e `setJson()` em `js/storage.js:79-103`.
- String: `getString()` e `setString()` em `js/storage.js:105-115`.
- Remocao: `remove()` em `js/storage.js:117-133`.
- Fallback: `memoryStore` em `js/storage.js:2`, usado quando `localStorage` esta indisponivel ou falha.
- Teste de disponibilidade: escreve e remove `__flag_game_storage_test__` em `js/storage.js:19-21`.
- IDs de evento: `fg_event_<timestamp>_<random>` em `js/storage.js:139-154`.

Nao foram encontrados usos de `IndexedDB`, `chrome.storage`, `browser.storage` ou armazenamento nativo Capacitor no fonte principal.

## Chaves persistidas

### `sound`

- Tipo: string.
- Leitura: `FlagGameStorage.getString("sound", "")` em `js/app.js:202`.
- Escrita: `FlagGameStorage.setString("sound", somAtivo ? "on" : "off")` em `js/app.js:1003`.
- Valores: `"on"` ou `"off"`.
- Padrao: `""`, interpretado como som desligado.
- Normalizacao: sem normalizacao alem de `String(value)` em `FlagGameStorage.setString()`.

### `language`

- Tipo: string.
- Leitura principal: `FlagGameStorage.getString("language", "")` em `js/i18n.js:201-204`.
- Fallback direto: `localStorage.getItem("language") || ""` em `js/i18n.js:206`.
- Escrita principal: `FlagGameStorage.setString("language", language)` em `js/i18n.js:209-212`.
- Fallback direto: `localStorage.setItem("language", language)` em `js/i18n.js:215`.
- Escrita acionada por carregamento de idioma: `finishLanguageLoad()` em `js/i18n.js:218-233`.
- Mudanca por UI: `languageSelect.addEventListener("change", ...)` em `js/app.js:1576-1578`.
- Valores suportados: 20 idiomas em `supportedLanguages` de `js/i18n.js:74-95`.
- Normalizacao: `normalizeLanguage()` em `js/i18n.js:97-132`.

Observacao: a homepage tambem usa a chave `language` em `homepage/js/homepage-i18n.js`, com `FlagGameStorage` se existir ou `localStorage` direto. Isso pode compartilhar preferencia com o jogo.

### `flagGameProfile`

- Tipo: JSON.
- Dono: `FlagGameProfile`.
- Chave: `STORAGE_KEY = "flagGameProfile"` em `js/profile.js:2`.
- Leitura: `FlagGameStorage.getJson(STORAGE_KEY, null)` em `js/profile.js:230-244`.
- Escrita: `FlagGameStorage.setJson(STORAGE_KEY, profile)` em `js/profile.js:246-252`.
- Schema atual: `SCHEMA_VERSION = 2` em `js/profile.js:3`.
- Padrao: `createEmptyProfile()` em `js/profile.js:146-178`.
- Normalizacao: `normalizeProfile()` em `js/profile.js:180-228`.

Formato padrao:

```json
{
  "schemaVersion": 2,
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime",
  "totals": {
    "gamesPlayed": 0,
    "totalCorrect": 0,
    "totalQuestions": 0,
    "percentSum": 0,
    "timeSecondsSum": 0,
    "timedGames": 0,
    "bestStreak": 0,
    "perfectGames": 0,
    "fullRuns195": 0
  },
  "modes": {
    "continent": { "gamesPlayed": 0 },
    "world": { "gamesPlayed": 0 },
    "expert": { "gamesPlayed": 0 }
  },
  "continentsCompleted": {},
  "continentsPerfect": {},
  "achievements": { "unlocked": {} },
  "events": { "recorded": {} }
}
```

Dados gravados ao terminar o modo experiente antigo:

- `gamesPlayed` incrementa em `js/profile.js:287`.
- `totalCorrect` soma `acertosExperiente` em `js/profile.js:288`.
- `totalQuestions` soma 195 em `js/profile.js:289`.
- `percentSum` soma percentual do modo antigo em `js/profile.js:290`.
- `bestStreak` recebe maximo com `melhorSequenciaExperiente` em `js/profile.js:291-294`.
- `perfectGames` incrementa se `percent === 100` em `js/profile.js:296-298`.
- `fullRuns195` incrementa se `total >= 195` em `js/profile.js:300-302`.
- `timeSecondsSum` e `timedGames` incrementam quando ha duracao em `js/profile.js:304-307`.
- `modes.expert.gamesPlayed` incrementa em `js/profile.js:309-313`.
- `events.recorded[eventId]` recebe snapshot da partida em `js/profile.js:326-336`.

### `flagGameRankingPlayer`

- Tipo: JSON.
- Dono: `FlagGameRanking`.
- Chave: `PLAYER_KEY = "flagGameRankingPlayer"` em `js/ranking.js:2`.
- Leitura: `FlagGameStorage.getJson(PLAYER_KEY, null)` em `js/ranking.js:54-75`.
- Escrita: `FlagGameStorage.setJson(PLAYER_KEY, normalizedPlayer)` em `js/ranking.js:77-89`.
- Schema: `SCHEMA_VERSION = 1` em `js/ranking.js:4`.
- Padrao: `createPlayer()` em `js/ranking.js:41-52`.
- Normalizacao: `sanitizeNickname()` em `js/ranking.js:27-32` e `sanitizeCountry()` em `js/ranking.js:34-39`.

Formato:

```json
{
  "schemaVersion": 1,
  "playerId": "fgp_<uuid-or-timestamp>",
  "nickname": "",
  "country": "BR",
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime"
}
```

### `flagGameRankingQueue`

- Tipo: JSON array.
- Dono: `FlagGameRanking`.
- Chave: `QUEUE_KEY = "flagGameRankingQueue"` em `js/ranking.js:3`.
- Leitura: `FlagGameStorage.getJson(QUEUE_KEY, [])` em `js/ranking.js:98-105`.
- Escrita: `FlagGameStorage.setJson(QUEUE_KEY, queue)` em `js/ranking.js:107-109`.
- Insercao: `enqueueScore(payload)` em `js/ranking.js:111-125`.
- Marcacao enviada: `markScoreSubmitted(id)` em `js/ranking.js:131-145`.

Formato de item:

```json
{
  "id": "fg_event_...",
  "status": "pending",
  "createdAt": "ISO datetime",
  "payload": {
    "schemaVersion": 1,
    "type": "ranking-score",
    "eventId": "fg_event_...",
    "createdAt": "ISO datetime",
    "player": {
      "playerId": "fgp_...",
      "nickname": "",
      "country": "BR"
    },
    "score": {
      "mode": "expert",
      "continent": "world",
      "score": 195,
      "total": 195,
      "percent": 100,
      "durationSeconds": 123,
      "bestStreak": 195,
      "challengeCode": "",
      "eventId": "fg_event_..."
    },
    "achievements": {
      "points": 0,
      "unlocked": 0,
      "total": 12
    },
    "profile": {
      "gamesPlayed": 1,
      "totalCorrect": 195,
      "averagePercent": 100
    },
    "privacy": {
      "personalDataIncluded": false,
      "loginRequired": false
    }
  }
}
```

### `flagGameChallenges`

- Tipo: JSON object por codigo de desafio.
- Dono: `FlagGameChallenge`.
- Chave: `STORAGE_KEY = "flagGameChallenges"` em `js/challenges.js:2`.
- Leitura: `FlagGameStorage.getJson(STORAGE_KEY, {})` em `js/challenges.js:151-158`.
- Escrita: `FlagGameStorage.setJson(STORAGE_KEY, store)` em `js/challenges.js:160-162`.
- Insercao: `saveLocalResult(result)` em `js/challenges.js:180-210`.
- Consulta: `getLocalResult(code)` em `js/challenges.js:212-214`.

Formato por codigo:

```json
{
  "FG-W20-82K7P": {
    "code": "FG-W20-82K7P",
    "attempts": [
      {
        "eventId": "fg_event_...",
        "code": "FG-W20-82K7P",
        "mode": "world",
        "continent": "",
        "quantity": 20,
        "durationSeconds": 60,
        "correct": 18,
        "errors": 2,
        "bestStreak": 10,
        "percent": 90,
        "completedAt": "ISO datetime"
      }
    ],
    "bestResult": {}
  }
}
```

O modo experiente antigo nao usa `flagGameChallenges`, pois nao gera codigo de desafio.

### `flagGameAuthState`

- Tipo: JSON.
- Dono: `FlagGameAuth`.
- Chave: `AUTH_KEY = "flagGameAuthState"` em `js/firebase-auth.js:2`.
- Leitura: `FlagGameStorage.getJson(AUTH_KEY, null)` em `js/firebase-auth.js:35-37`.
- Escrita: `FlagGameStorage.setJson(AUTH_KEY, normalizedState)` em `js/firebase-auth.js:56-78`.
- Inicializacao automatica: `FlagGameAuth.init()` em `js/firebase-auth.js:394`.
- Padrao: estado offline sem Firebase quando nao ha `window.FlagGameFirebaseConfig` em `js/firebase-auth.js:183-201`.

Formato normalizado:

```json
{
  "schemaVersion": 1,
  "playerId": "",
  "firebaseUid": "",
  "isAnonymous": true,
  "providerIds": [],
  "createdAt": "ISO datetime",
  "updatedAt": "ISO datetime",
  "lastAuthAt": "",
  "lastError": ""
}
```

### `recorde-<continenteAtual>`

- Tipo: string numerica.
- Dono: `js/app.js`.
- Chaves conhecidas: `recorde-world`, `recorde-south-america`, `recorde-north-america`, `recorde-europe`, `recorde-africa`, `recorde-asia`, `recorde-oceania`.
- Leitura: `FlagGameStorage.getString(chaveRecorde, "0")` em `js/app.js:1830-1835`.
- Escrita: `FlagGameStorage.setString(chaveRecorde, pontos)` em `js/app.js:1837-1841`.
- Padrao: `"0"`.
- Escopo: modos de alternativas continent/world. O modo experiente antigo nao grava recorde especifico por essa chave.

## Dados nao persistidos do modo experiente antigo

- Fila da partida (`paisesExperiente`).
- Indice atual (`indiceExperiente`).
- Acertos/puladas/sequencia durante partida.
- Melhor sequencia ate finalizar.
- Tempo parcial.
- Resposta atual do input.
- Estado interrompido.

Nao ha retomada de partida interrompida para o modo experiente atual.

## Dados base de paises

`js/countries.js` contem 195 paises:

- `code`: ISO alpha-2 em maiusculas. Unico e melhor ID estavel atual.
- `name`: nome em portugues no arquivo. Unico, usado como fallback.
- `continent`: um de `south-america`, `north-america`, `europe`, `africa`, `asia`, `oceania`.
- `flagFile`: arquivo SVG em `assets/flags`. Unico e existente para todos os 195.

Campos ausentes:

- `id` separado.
- `region`.
- aliases.
- nomes traduzidos por pais no dataset.
- grupos de bandeiras parecidas.

Nomes traduzidos:

- Exibidos por `Intl.DisplayNames([currentLanguage], { type: "region" })` em `js/i18n.js:326-333`.
- Fallback para `countries.find(...).name` em `js/i18n.js:335-341`.
- A checagem local nos 20 idiomas suportados nao encontrou duplicatas de nomes exibidos para os 195 codigos atuais.

## Observacoes de migracao de dados

- `expert` hoje significa modo legado digitado, nao "Desafio Mundial".
- Dados antigos nao devem ser apagados, recalculados ou convertidos.
- O novo modo deve usar identificador separado como `world_challenge`.
- Uma copia conceitual/alias de leitura pode chamar o modo antigo de `expert_legacy`, mas o armazenamento existente deve permanecer intocado.
