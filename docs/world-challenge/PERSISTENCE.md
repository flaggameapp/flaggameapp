# World Challenge Persistence

Persistencia local implementada para o modo `world_challenge`.

Nao implementado nesta fase:

- Google Play Games.
- Ranking global.
- Saved Games.
- Compras com dinheiro.
- Google Play Billing.
- Anuncios.
- Supabase/Firebase para esta persistencia.

## Identidade

- Chave principal: `flagGameWorldChallenge`.
- Chave da carteira: `flagGameWorldChallengeWallet`.
- Modo novo: `world_challenge`.
- O modo antigo continua preservado no perfil legado como `expert`; novas camadas podem se referir semanticamente a ele como `expert_legacy`, mas nao ha conversao, sobrescrita ou apagamento dos dados existentes.
- Chave legada temporaria da fase visual: `flagGameWorldChallengeRecords`.

## Schema

```json
{
  "schemaVersion": 1,
  "mode": "world_challenge",
  "createdAt": "2026-07-19T00:00:00.000Z",
  "updatedAt": "2026-07-19T00:00:00.000Z",
  "historyLimit": 100,
  "stats": {
    "attempts": 0,
    "completions": 0,
    "bestCorrectCountries": 0,
    "bestStreak": 0,
    "fastestCompletionMs": null,
    "totalCorrectAnswers": 0,
    "totalWrongAnswers": 0,
    "totalSkips": 0,
    "totalPlayTimeMs": 0,
    "lastPlayedAt": null
  },
  "history": [
    {
      "runId": "wc_run_lz...",
      "startedAt": "2026-07-19T00:00:00.000Z",
      "finishedAt": "2026-07-19T00:05:00.000Z",
      "correctCountries": 195,
      "wrongAnswers": 0,
      "skips": 0,
      "bestStreak": 195,
      "elapsedMs": 300000,
      "completed": true,
      "livesRemaining": 5,
      "continued": false,
      "rankingEligible": false,
      "platform": "web",
      "gameVersion": "local"
    }
  ],
  "migrations": {
    "backups": []
  }
}
```

## Carteira

Moedas sao locais e obtidas exclusivamente por marcos dentro do jogo.

```json
{
  "schemaVersion": 1,
  "createdAt": "2026-07-19T00:00:00.000Z",
  "updatedAt": "2026-07-19T00:00:00.000Z",
  "balance": 0,
  "lifetimeEarned": 0,
  "lifetimeSpent": 0,
  "rewardedMilestones": {
    "25": true
  },
  "transactionHistory": [
    {
      "transactionId": "wc_tx_lz...",
      "type": "earn",
      "amount": 5,
      "reason": "world_challenge_milestone_25",
      "runId": "wc_run_lz...",
      "createdAt": "2026-07-19T00:00:00.000Z"
    }
  ]
}
```

Marcos centrais:

- 25 paises: 5 moedas.
- 50 paises: 5 moedas.
- 75 paises: 10 moedas.
- 100 paises: 10 moedas.
- 125 paises: 15 moedas.
- 150 paises: 20 moedas.
- 175 paises: 25 moedas.
- 195 paises: 50 moedas.

Cada marco so e pago uma vez por carteira/perfil local. Reexecutar calculo, migracao ou finalizacao deduplicada nao concede a mesma recompensa novamente.

## Continuacao

- Custo: 30 moedas.
- Permitida somente uma vez por `runId`.
- Concede 1 vida.
- Mantem paises pendentes, cronometro e estatisticas da partida.
- Define `continued: true`.
- Define `rankingEligible: false`.
- Registra transacao `type: "spend"` e `reason: "world_challenge_continue"`.
- Se saldo ou escrita falhar, o motor nao continua e nenhuma moeda e descontada.

## Regras de seguranca

- JSON invalido volta para schema vazio e gera backup bruto em `flagGameWorldChallengeBackup:*`.
- Migracao estrutural tambem cria backup antes da regravacao.
- A migracao da chave `flagGameWorldChallengeRecords` preserva campos desconhecidos em `legacyRecords`.
- Numeros invalidos, `NaN` e negativos sao normalizados para valores seguros.
- `runId` duplicado nao soma estatisticas nem duplica historico.
- `transactionId` duplicado e normalizado para uma unica transacao.
- O historico detalhado e limitado a 100 partidas, sem reduzir estatisticas consolidadas.
- Escrita usa chave temporaria quando o adapter suporta `setRaw`.
- Tudo funciona offline em `localStorage` ou memoria.

## Integracao

- A tela de resultado do Desafio Mundial grava a partida no schema acima.
- Saida/interrupcao da partida grava uma tentativa local sem atualizar o perfil agregado.
- Conclusoes e game over pela tela de resultado atualizam o perfil local com `mode: "world_challenge"`.
- O ranking local/global nao recebe payload do `world_challenge` nesta fase.
- Mesmo em fases futuras, qualquer partida com `continued: true` fica `rankingEligible: false`.
