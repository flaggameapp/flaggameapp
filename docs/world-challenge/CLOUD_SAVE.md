# Cloud save Android - Saved Games

A base de salvamento em nuvem do Desafio Mundial e local-first:

1. grava o progresso localmente;
2. deixa o jogo continuar offline;
3. agenda sincronizacao com debounce;
4. nunca apaga progresso local porque a nuvem falhou.

A camada JavaScript e o plugin Capacitor estao implementados, mas a integracao ainda precisa ser validada em um projeto Android real autenticado pelo Google Play Games Services. Web, Chrome, Edge e Firefox continuam sem cloud save.

## Snapshot

Nome do snapshot:

```text
flag_game_world_challenge_v1
```

Schema atual:

```json
{
  "schemaVersion": 1,
  "snapshotType": "flag_game_android_cloud_save",
  "mode": "world_challenge",
  "updatedAt": "2026-07-19T00:00:00.000Z",
  "installationId": "fg_installation_<id>",
  "profile": {},
  "generalStats": {},
  "worldChallenge": {
    "stats": {},
    "history": []
  },
  "achievements": {
    "unlocked": {}
  },
  "rewardedMilestones": {},
  "wallet": {
    "balance": 0,
    "lifetimeEarned": 0,
    "lifetimeSpent": 0,
    "rewardedMilestones": {},
    "transactionHistory": []
  },
  "recentHistory": [],
  "preferences": {
    "updatedAt": "2026-07-19T00:00:00.000Z",
    "language": "pt-BR",
    "sound": "on"
  },
  "deviceCounters": {
    "fg_installation_<id>": {
      "updatedAt": "2026-07-19T00:00:00.000Z",
      "gamesPlayed": 0,
      "worldChallengeAttempts": 0,
      "walletTransactions": 0
    }
  }
}
```

Nao entram no snapshot:

- sessao atual incompleta;
- pergunta atual;
- fila temporaria da partida;
- timers;
- dados tecnicos da WebView;
- credenciais;
- service account;
- chaves secretas.

## Merge deterministico

Implementado em `js/cloud-save.js`.

- Recordes e melhores contadores usam o maior valor.
- Melhor tempo usa o menor valor positivo.
- Conquistas usam uniao por ID, preservando a data mais antiga.
- Marcos recompensados usam uniao.
- Historico usa uniao por `runId`.
- Transacoes usam uniao por `transactionId`.
- Preferencias usam o objeto com `updatedAt` mais recente.
- Contadores por dispositivo usam maior valor por `installationId`.
- Saldo da carteira e recalculado pelas transacoes: ganhos menos gastos.

O merge nunca soma duas vezes o mesmo `runId` ou `transactionId`.

## Estados de UI

Estados discretos:

- `local_saved`: salvo localmente.
- `syncing`: sincronizando.
- `synced`: salvo com Google Play.
- `pending`: sincronizacao pendente.
- `error`: erro de sincronizacao.

O indicador aparece apenas quando `supportsCloudSave` esta ativo.

## Gatilhos

A sincronizacao usa debounce e nao roda a cada resposta.

- Fim de partida.
- Moedas recebidas.
- Moedas gastas em continuacao.
- Conquista desbloqueada.
- Retorno do evento `online`.
- Inicio do Android quando Play Games e cloud save estao disponiveis.

## Falhas tratadas

- Sem internet: estado pendente ou erro; local preservado.
- Autenticacao indisponivel: erro estruturado; local preservado.
- Snapshot ausente: cria snapshot no commit.
- Snapshot corrompido: erro estruturado; local preservado.
- Versoes diferentes: normaliza para `schemaVersion = 1` e preserva desconhecidos.
- Conflito: plugin retorna os dois payloads e o JS faz merge deterministico.
- Commit interrompido: fica pendente para tentativa futura.
- App reinstalado: novo `installationId`; merge preserva contadores de instalacoes anteriores.

## Dependencia nativa

O plugin Android usa `SnapshotsClient` via `PlayGames.getSnapshotsClient(activity)` e mantem a dependencia exata:

```gradle
implementation 'com.google.android.gms:play-services-games-v2:21.0.0'
```

Saved Games precisa estar habilitado na Play Console antes dos testes reais.
