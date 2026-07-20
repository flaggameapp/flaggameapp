# Arquitetura de Ranking Online

## Objetivo

Preparar o Flag Game para rankings online sem implementar servidor nesta etapa.

A arquitetura atual continua funcionando offline e salva tudo localmente. O backend futuro deve ser conectado por um adaptador, sem alterar a lógica principal do jogo.

## Princípios

- Sem login nesta versão.
- Sem coleta de dados pessoais.
- O jogador controla apenas um nickname opcional e país.
- O `playerId` é gerado localmente e não identifica uma pessoa real.
- Resultados são preparados em uma fila local antes de qualquer integração online.
- O app deve continuar funcionando como website, PWA, APK e extensão.

## Arquivos

- `js/ranking.js`: identidade local, payloads públicos, fila local e contrato de backend.
- `js/profile.js`: estatísticas e conquistas locais.
- `js/app.js`: chama o ranking apenas quando uma partida termina e quando o usuário salva identidade local.
- `docs/online-ranking-architecture.md`: este documento.

## Dados do jogador

Armazenamento local:

```js
FlagGameStorage.getJson("flagGameRankingPlayer", null)
```

Formato:

```json
{
  "schemaVersion": 1,
  "playerId": "fgp_uuid",
  "nickname": "Player",
  "country": "BR",
  "createdAt": "2026-07-11T00:00:00.000Z",
  "updatedAt": "2026-07-11T00:00:00.000Z"
}
```

Campos:

- `playerId`: ID local gerado automaticamente.
- `nickname`: apelido opcional, limitado a 24 caracteres.
- `country`: código ISO de 2 letras.

O vínculo técnico com Firebase Authentication fica em `flagGameAuthState`.
O `firebaseUid` não deve entrar em payloads públicos de ranking.

## Dados de pontuação

Payload público preparado para ranking:

```json
{
  "schemaVersion": 1,
  "type": "ranking-score",
  "createdAt": "2026-07-11T00:00:00.000Z",
  "player": {
    "playerId": "fgp_uuid",
    "nickname": "Player",
    "country": "BR"
  },
  "score": {
    "mode": "world",
    "continent": "world",
    "score": 18,
    "total": 20,
    "percent": 90,
    "durationSeconds": 74,
    "bestStreak": 9,
    "challengeCode": "FG-W20-82K7P"
  },
  "achievements": {
    "points": 120,
    "unlocked": 4,
    "total": 12
  },
  "profile": {
    "gamesPlayed": 22,
    "totalCorrect": 310,
    "averagePercent": 82
  },
  "privacy": {
    "personalDataIncluded": false,
    "loginRequired": false
  }
}
```

## Fila local

Armazenamento local:

```js
FlagGameStorage.getJson("flagGameRankingQueue", [])
```

Cada partida concluída cria um item `pending`. O servidor futuro poderá enviar esses itens e marcá-los como `submitted`.

## Contrato de backend

O app não conhece detalhes do servidor. Ele espera um adaptador com três métodos:

```js
const adapter = {
  submitScore(payload) {},
  fetchLeaderboard(query) {},
  syncPlayer(player) {}
};
```

Uso futuro:

```js
const client = FlagGameRanking.createBackendClient(adapter);
await client.submitScore(payload);
```

Hoje existe apenas `createOfflineAdapter()`, que não envia nada.

## Ranking futuro

Consulta sugerida:

```json
{
  "mode": "world",
  "continent": "world",
  "period": "all-time",
  "limit": 50
}
```

Resposta sugerida:

```json
{
  "items": [
    {
      "rank": 1,
      "playerId": "fgp_uuid",
      "nickname": "Player",
      "country": "BR",
      "score": 195,
      "percent": 100,
      "durationSeconds": 512,
      "achievementPoints": 840
    }
  ]
}
```

## Critérios de ordenação

Ordem recomendada:

1. Maior pontuação.
2. Maior percentual.
3. Menor tempo.
4. Maior sequência.
5. Mais pontos de conquistas.

## Privacidade

Não enviar:

- Nome real.
- E-mail.
- IP coletado pelo app.
- Dados de dispositivo.
- Dados de localização precisa.

Enviar apenas:

- `playerId`
- `nickname`
- `country`
- pontuação
- tempo
- modo/continente
- conquistas agregadas

## Próximos passos futuros

1. Criar backend com endpoints de ranking.
2. Implementar adaptador HTTP separado.
3. Enviar apenas itens pendentes da fila local.
4. Adicionar tela de leaderboard.
5. Adicionar controles para apagar identidade local e fila.
