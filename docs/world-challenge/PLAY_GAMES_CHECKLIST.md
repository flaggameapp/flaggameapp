# Play Console checklist - rankings e conquistas

Este checklist cobre apenas recursos oficiais do Google Play Games no Android. Web e extensoes continuam com recordes pessoais locais.

## Pre-requisitos

- Play Games Services configurado para o app Android.
- `applicationId` real vinculado na Play Console.
- SHA-1 de debug/release cadastrados.
- Saved Games ja configurado, se a fase de cloud save estiver ativa.
- Contas de teste adicionadas.
- Recursos publicados para testadores.

## Placares

Criar tres leaderboards na Play Console e copiar os IDs gerados para XML.

| Chave interna | Recurso XML | Ordenacao | Valor enviado | Formato |
| --- | --- | --- | --- | --- |
| `world_challenge_progress` | `leaderboard_world_challenge_progress` | Maior valor vence | `bestCorrectCountries`, 0 a 195 | Numerico inteiro, sem casas decimais |
| `world_challenge_streak` | `leaderboard_world_challenge_streak` | Maior valor vence | `bestStreak` | Numerico inteiro, sem casas decimais |
| `world_challenge_fastest_195` | `leaderboard_world_challenge_fastest_195` | Menor valor vence | `elapsedMs`, somente conclusao dos 195 | Tempo em milissegundos |

Configurar o placar `world_challenge_fastest_195` como tempo, com ordem crescente/menor melhor.

## Conquistas

Criar as conquistas abaixo e copiar os IDs gerados para XML.

| Chave interna | Recurso XML |
| --- | --- |
| `first_attempt` | `achievement_world_challenge_first_attempt` |
| `countries_25` | `achievement_world_challenge_countries_25` |
| `countries_50` | `achievement_world_challenge_countries_50` |
| `countries_100` | `achievement_world_challenge_countries_100` |
| `countries_150` | `achievement_world_challenge_countries_150` |
| `countries_195` | `achievement_world_challenge_countries_195` |
| `streak_50` | `achievement_world_challenge_streak_50` |
| `streak_100` | `achievement_world_challenge_streak_100` |
| `complete_one_life` | `achievement_world_challenge_complete_one_life` |
| `complete_no_lives_lost` | `achievement_world_challenge_complete_no_lives_lost` |

As conquistas sao desbloqueadas com `unlockImmediate`, de forma idempotente. Se o jogador ja tiver progresso local equivalente, o Android tenta desbloquear no Play Games apos autenticacao.

## XML

O plugin local inclui `plugins/capacitor-play-games/android/src/main/res/values/play_games_ids.xml` com strings vazias. No app Android real, preencher ou sobrescrever esses recursos com os IDs da Play Console:

```xml
<resources>
    <string name="leaderboard_world_challenge_progress" translatable="false">&lt;PLAY_CONSOLE_LEADERBOARD_ID&gt;</string>
    <string name="leaderboard_world_challenge_streak" translatable="false">&lt;PLAY_CONSOLE_LEADERBOARD_ID&gt;</string>
    <string name="leaderboard_world_challenge_fastest_195" translatable="false">&lt;PLAY_CONSOLE_LEADERBOARD_ID&gt;</string>

    <string name="achievement_world_challenge_first_attempt" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_countries_25" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_countries_50" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_countries_100" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_countries_150" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_countries_195" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_streak_50" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_streak_100" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_complete_one_life" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
    <string name="achievement_world_challenge_complete_no_lives_lost" translatable="false">&lt;PLAY_CONSOLE_ACHIEVEMENT_ID&gt;</string>
</resources>
```

Nao inserir service account, secrets ou chaves privadas no app.

## Elegibilidade de envio

Placares so sao enviados quando:

- plataforma Android;
- Play Games autenticado;
- `rankingEligible = true`;
- `continued = false`;
- `runId` ainda nao foi submetido;
- valores da partida sao validos.

Falhas de envio ficam em fila local para retry. A tela de resultado nunca espera o ranking.
