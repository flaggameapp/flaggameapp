# World Challenge Engine

Implementado nesta fase:

- Motor logico puro em `js/world-challenge.js`.
- Identificador interno `world_challenge`.
- Identificador legado preservado como `expert` e exposto como `MODE_EXPERT_LEGACY`.
- Criacao de partida com 195 paises distintos por padrao.
- Cinco vidas iniciais.
- Quatro alternativas unicas por pergunta.
- Comparacao por ID estavel (`id`/`code`), nao por texto.
- Nomes de alternativas via callback `getCountryName(code, country)` para permitir traducao.
- Acerto mantem vidas, incrementa progresso unico, sequencia atual e melhor sequencia.
- Erro perde vida, incrementa contador de erros e coloca o pais em repeticao.
- Pulo perde vida, incrementa contador de pulos e coloca o pais em repeticao.
- Pais incorreto volta por `retryQueue`.
- Repeticao tenta respeitar `repeatDistance` de 10 perguntas.
- Quando restam poucos paises, a repeticao e forçada antes de perder pendencias.
- Fim por zero vidas.
- Conclusao somente quando todos os paises foram identificados corretamente.
- Bloqueio de resposta duplicada por estado `feedback` e por `questionId`.
- Cronometro total por `startedAt`, `endedAt` e `elapsedSeconds`.
- Continuação local via `continueGame`: uma vez por partida, concede 1 vida, mantem fila/pendencias e marca `rankingEligible: false`.

Nao implementado nesta fase:

- Moedas.
- Continuacao.
- Google Play Games.
- Ranking global.
- Saved Games.
- Integracao com perfil legado.

## Integracao visual do Modo Experiente

Implementado na fase de interface:

- O card antigo de modo digitado agora apresenta o `Desafio Mundial` como `Modo Experiente`.
- A partida usa o motor `world_challenge` e nao usa o fluxo digitado legado.
- A tela mostra bandeira atual, cinco vidas, paises identificados, cronometro total, sequencia atual, melhor sequencia, quatro alternativas e botao `Nao sei`.
- Respostas corretas mantem vidas; erros e pulos mostram feedback com o pais correto e aviso de perda de vida.
- O indicador visual nao usa `Pergunta X de 195`, porque paises errados podem retornar e a quantidade real de perguntas pode ultrapassar 195.
- Os botoes de alternativa sao elementos `button`, bloqueiam resposta duplicada durante o feedback e usam comparacao por ID.
- O feedback usa `aria-live`, as vidas possuem texto acessivel e o foco visivel foi preservado para teclado.
- Os textos novos foram adicionados a todos os arquivos em `locales/` e ao bundle offline `js/locales-data.js`.
- O fallback interno de `js/i18n.js` tambem recebeu as chaves novas em ingles, portugues e frances.

Persistencia adicionada:

- Estatisticas e historico locais do `world_challenge` em `localStorage`.
- Carteira local versionada com moedas obtidas por marcos do proprio jogo.
- Perfil local e conquistas locais sao atualizados com `mode: "world_challenge"` ao finalizar a partida.
- Partidas interrompidas entram na persistencia propria do `world_challenge`, mas nao atualizam perfil/conquistas.
- Moedas, Google Play Games, ranking global e Saved Games nao sao atualizados por este modo.

## API publica

O arquivo exporta `FlagGameWorldChallenge` no navegador e `module.exports` em Node.

Funcoes principais:

- `createGame({ countries, seed, now, getCountryName })`.
- `answer(state, selectedId, { questionId, now })`.
- `skip(state, { questionId, now })`.
- `advance(state, { now, getCountryName })`.
- `getSummary(state, now)`.
- `buildOptions({ countries, correctCountry, getCountryName, random })`.

Estados:

- `playing`: pergunta ativa.
- `feedback`: resposta aceita e bloqueada; a UI futura deve chamar `advance`.
- `game_over`: vidas chegaram a zero.
- `finished`: todos os paises foram corretamente identificados.

## Testes

Testes minimos sem framework foram adicionados em `tests/world-challenge.test.js`.

Comando:

```bash
node tests/world-challenge.test.js
```
