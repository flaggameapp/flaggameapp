# Data Migration and Legacy Protection

Esta estrategia preserva integralmente o modo experiente antigo. Nenhum dado antigo deve ser apagado, convertido ou contado como pontuacao nova do "Desafio Mundial".

## Principios

- Nao alterar dados existentes em `flagGameProfile`.
- Nao renomear fisicamente `modes.expert` existente.
- Nao recalcular `fullRuns195` legado.
- Nao converter fila `flagGameRankingQueue` antiga em ranking global novo.
- Nao inferir que uma partida `expert` antiga foi uma partida `world_challenge`.
- Ler dados antigos apenas para exibicao legada ou resumo agregado ja existente.
- Criar namespaces novos para historico, estado e ranking do novo modo.

## Estado legado atual

O modo antigo grava:

- `flagGameProfile.totals.*` por `FlagGameProfile.recordGame()` em `js/profile.js:271-345`.
- `flagGameProfile.modes.expert.gamesPlayed` em `js/profile.js:309-313`.
- `flagGameProfile.totals.fullRuns195` quando `total >= 195` em `js/profile.js:300-302`.
- `flagGameProfile.events.recorded[eventId]` com `mode: "expert"` em `js/profile.js:326-336`.
- `flagGameRankingQueue[].payload.score.mode = "expert"` em `js/ranking.js:147-188`.
- `flagGameRankingQueue[].payload.score.continent = "world"` a partir de `js/app.js:1422-1433`.

O modo antigo nao grava:

- vidas.
- moedas.
- continuacao.
- fila restante.
- paises errados pendentes.
- historico especifico do modo.
- ranking global real.

## Identificadores recomendados

Camada conceitual:

- `expert_legacy`: nome interno novo para referir-se ao modo antigo em codigo novo/documentacao.
- `world_challenge`: nome interno do novo modo.

Armazenamento existente:

- Manter `expert` onde ja existe.
- Nao migrar `expert` para `expert_legacy` em `flagGameProfile`.
- Nao editar eventos antigos.

Armazenamento novo sugerido:

- `flagGameWorldChallengeHistory`.
- `flagGameWorldChallengeState`.
- `flagGameWorldChallengeWallet`.
- `flagGameWorldChallengeRankingQueue` se houver fila local separada para Android.

## Modelo de leitura compativel

Em codigo futuro, criar helper de leitura:

```js
function normalizeModeForDisplay(mode) {
  if (mode === "expert") {
    return "expert_legacy";
  }

  return mode;
}
```

Esse helper nao deve escrever de volta no storage. Ele serve apenas para UI/relatorios novos diferenciarem legado de novo modo.

## Historico local novo

Chave sugerida: `flagGameWorldChallengeHistory`.

Formato sugerido:

```json
{
  "schemaVersion": 1,
  "matches": [
    {
      "eventId": "fg_event_...",
      "mode": "world_challenge",
      "startedAt": "ISO datetime",
      "completedAt": "ISO datetime",
      "completed": true,
      "countriesTotal": 195,
      "correctUnique": 195,
      "mistakes": 3,
      "skips": 1,
      "livesInitial": 5,
      "livesRemaining": 1,
      "usedContinuation": false,
      "durationSeconds": 734,
      "bestStreak": 80,
      "platform": "android"
    }
  ]
}
```

Regras:

- `completed: true` somente se `correctUnique === 195`.
- Tentativas incompletas podem ser gravadas, mas nao entram em ranking de conclusao.
- `eventId` deve continuar idempotente.
- Nao misturar com `flagGameChallenges`.

## Estado interrompido novo

Chave sugerida: `flagGameWorldChallengeState`.

Formato sugerido:

```json
{
  "schemaVersion": 1,
  "eventId": "fg_event_...",
  "mode": "world_challenge",
  "state": "playing",
  "seed": "ABCDE",
  "queue": ["BR", "AR"],
  "answeredCorrect": ["CA"],
  "currentCountryCode": "BR",
  "lives": 4,
  "usedContinuation": false,
  "correct": 1,
  "mistakes": 0,
  "skips": 0,
  "currentStreak": 1,
  "bestStreak": 1,
  "startedAt": "ISO datetime",
  "elapsedSeconds": 30,
  "updatedAt": "ISO datetime"
}
```

Regras:

- Salvar somente estado novo.
- Limpar ao entrar em `finished` ou `game_over`.
- Nao tentar reconstruir estado a partir de partidas `expert` antigas.

## Moedas e continuacao

Chave sugerida: `flagGameWorldChallengeWallet`.

Formato sugerido:

```json
{
  "schemaVersion": 1,
  "balance": 0,
  "freeCoinsGrantedAt": "",
  "transactions": [
    {
      "id": "fg_event_...",
      "type": "world_challenge_continue",
      "amount": -1,
      "createdAt": "ISO datetime"
    }
  ]
}
```

Regras:

- Nao guardar moedas dentro de `flagGameProfile` legado.
- Uma continuacao por partida deve ficar no estado da partida, nao apenas no historico da carteira.
- Nao implementar compras nesta etapa futura sem decisao separada.

## Ranking global Android

Chave local sugerida se for necessaria fila separada: `flagGameWorldChallengeRankingQueue`.

Regras:

- Nunca importar itens de `flagGameRankingQueue` para esta fila.
- Somente payloads com `mode: "world_challenge"` e `platform: "android"`.
- Somente `completed: true`.
- Nao enviar `expert`, `continent` ou `world` como ranking global do novo modo.
- Se Google Play Games nao estiver disponivel, manter resultado apenas local.

## Plano de migracao sem escrita destrutiva

1. Adicionar constantes de modo em codigo novo:
   - `MODE_EXPERT_LEGACY = "expert"`.
   - `MODE_WORLD_CHALLENGE = "world_challenge"`.
2. Garantir que o modo antigo continue chamando `recordGame({ mode: "expert" })`.
3. Fazer o modo novo chamar persistencia propria e, se necessario, perfil com `mode: "world_challenge"`.
4. Atualizar UI de perfil para exibir ambos separadamente apenas se o produto quiser.
5. Deixar `fullRuns195` legado sem alteracao; se o novo modo precisar de metrica propria, criar `worldChallengeCompletedRuns`.
6. Ao exportar ranking/sync, filtrar por modo e plataforma.
7. Adicionar testes de nao regressao que carreguem um `flagGameProfile` antigo e confirmem que nenhuma chave e regravada durante leitura.

## Riscos de migracao

- Alta: atualizar `expert` para `world_challenge` em massa apagaria o significado historico dos resultados antigos.
- Alta: usar `fullRuns195` como metrica de conclusao do novo modo contaria partidas antigas com pulos/erros.
- Alta: enviar `flagGameRankingQueue` antigo para ranking global Android criaria leaderboard contaminado.
- Media: adicionar `world_challenge` em `modes` sem normalizacao pode quebrar UI que assume somente tres modos.
- Media: historico novo com nomes traduzidos, em vez de codigos, ficaria instavel quando o idioma muda.
- Baixa: `eventId` atual e suficiente para idempotencia local, mas ranking global pode exigir ID assinado/validado.

## Checklist de aceitacao futura

- Perfil antigo com `modes.expert` permanece byte-a-byte igual apos primeira leitura.
- Eventos antigos continuam com `mode: "expert"`.
- Novo historico grava somente `mode: "world_challenge"`.
- Ranking Android recusa payloads sem `platform: "android"`.
- Site e extensoes nao exibem ranking global.
- `fullRuns195` legado nao e usado para conquistas novas do Desafio Mundial.
