# Estratégia de Sincronização

## Objetivo

Preparar o Flag Game para sincronização futura em nuvem sem quebrar o uso offline atual.

Nesta etapa, a fonte de verdade continua sendo o armazenamento local via `FlagGameStorage`.

Firebase Authentication existe como camada opcional em `js/firebase-auth.js`. Se SDK/configuração não estiverem disponíveis, o app continua em modo local/offline. Cloud Firestore ainda não foi adicionado.

## Identificadores

Cada partida concluída deve possuir um `eventId` no formato:

```text
fg_event_<timestamp>_<random>
```

O `eventId` deve acompanhar payloads de perfil, ranking e desafios sempre que representar uma partida ou tentativa concluída.

## Regras de Merge

### Achievements

Fazer união por ID.

Quando o mesmo achievement existir nos dois lados, preservar a data mais antiga de desbloqueio.

### Best Streak

Usar sempre o maior valor.

### Melhores Tempos

Usar o menor valor válido.

Valores ausentes, zero ou inválidos não devem sobrescrever tempos válidos.

### Continentes Concluídos e Perfeitos

Usar OR lógico.

Se qualquer dispositivo marcou um continente como concluído ou perfeito, o merge deve preservar `true`.

### Nickname e Country

Usar `updatedAt` mais recente.

Esses campos representam preferência/editável do jogador, então podem seguir last-write-wins.

### Ranking e Desafios

Deduplicar por `eventId`.

O mesmo evento sincronizado mais de uma vez não pode gerar duas pontuações, duas tentativas ou duas entradas de ranking.

### Estatísticas Acumuladas

Não somar snapshots completos cegamente.

Campos como `gamesPlayed`, `totalCorrect`, `percentSum`, `timeSecondsSum` e `perfectGames` devem ser recalculados a partir de eventos idempotentes ou mesclados por contadores por dispositivo.

### Eventos Idempotentes

Preferir eventos de partida com `eventId` estável.

Alternativa futura: usar contadores por dispositivo, por exemplo:

```json
{
  "deviceId": "device_abc",
  "counters": {
    "gamesPlayed": 12,
    "totalCorrect": 140
  }
}
```

Isso evita duplicação quando a mesma sincronização é repetida.

## Estratégia Recomendada Para Firebase / Firestore

1. Manter o jogo offline-first.
2. Usar autenticação anônima automática e opcional.
3. Vincular `playerId` local ao `uid` anônimo sem apagar dados locais.
4. Enviar apenas eventos/fila pendente.
5. Deduplicar eventos por `eventId` no cliente e no servidor.
6. Recalcular snapshots agregados a partir dos eventos aceitos.
7. Aplicar merge local depois do pull remoto.

## Conflitos Que Devem Ser Tratados

- Mesmo jogador jogando offline em dois dispositivos.
- Mesmo evento enviado mais de uma vez.
- Nickname alterado em dois dispositivos.
- País alterado em dois dispositivos.
- Achievement desbloqueado em datas diferentes.
- Melhor resultado de desafio divergente entre dispositivos.
- Perfil remoto antigo tentando sobrescrever progresso local mais novo.

## Decisão Desta Etapa

`FlagGameSync` usa apenas um adapter offline. Ele formaliza a interface futura, mas não envia nem busca dados.

`FlagGameStorage` centraliza acesso local e protege o app contra JSON inválido, storage indisponível e exceções de leitura/escrita.

## Referencias Locais Mantidas

Chamadas diretas a `localStorage` devem existir apenas em `js/storage.js`.

As strings `source: "localStorage"` mantidas em payloads de perfil e desafios sao apenas metadados legados para indicar a origem local dos dados. Elas nao leem nem gravam no armazenamento.
