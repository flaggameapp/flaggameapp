# World Challenge Implementation Plan

Este plano e propositalmente nao implementado nesta tarefa. Ele descreve como introduzir o futuro "Desafio Mundial - Modo Experiente" sem remover nem reclassificar o modo atual.

## Objetivos funcionais futuros

- Nome publico: "Desafio Mundial".
- Subtitulo: "Modo Experiente".
- 195 paises.
- Quatro alternativas por pergunta.
- Cinco vidas.
- Erro ou "Nao sei" consome uma vida.
- Bandeiras erradas retornam a fila.
- Conclusao apenas quando os 195 paises forem corretamente identificados.
- Cronometro total.
- Sequencia de acertos.
- Historico local.
- Moedas gratuitas.
- Uma continuacao com moedas.
- Ranking global somente Android.
- Sem ranking global no site e nas extensoes.

## Identificadores

- Modo legado: preservar como `expert` no armazenamento existente e tratar semanticamente como `expert_legacy` nas novas camadas.
- Novo modo: `world_challenge`.
- Ranking Android: usar categoria propria, por exemplo `world_challenge_android`.
- Historico local novo: chave separada, por exemplo `flagGameWorldChallengeHistory`.
- Estado de partida interrompida novo: chave separada, por exemplo `flagGameWorldChallengeState`.
- Carteira/moedas: chave separada, por exemplo `flagGameWallet`, sem reaproveitar perfil legado.

## Maquina de estados proposta

### `idle`

Estado inicial. Nenhuma partida ativa.

Entradas:

- Abrir tela do novo modo.
- Preparar configuracao de partida.

Saidas:

- `playing` ao iniciar.

Dados:

- Configuracao estatica: 195 paises, vidas iniciais, seed opcional.

### `playing`

Pergunta atual visivel, alternativas habilitadas, cronometro rodando.

Entradas:

- Primeira pergunta.
- Proxima pergunta depois de feedback.
- Retorno apos continuacao paga.

Saidas:

- `feedback` em acerto, erro ou "Nao sei".
- `game_over` quando vidas chegam a zero e nao ha continuacao disponivel.
- `continuation_offer` quando vidas chegam a zero e a continuacao ainda esta disponivel.
- `finished` quando todos os 195 codigos estao corretos.

Dados:

- `queue`: paises pendentes.
- `answeredCorrect`: conjunto de codigos corretos.
- `currentCountryCode`.
- `lives`.
- `usedContinuation`.
- `correct`.
- `mistakes`.
- `skips`.
- `currentStreak`.
- `bestStreak`.
- `startedAt`.
- `elapsedSeconds`.

### `feedback`

Mostra resultado da escolha, bloqueia input e alternativas.

Entradas:

- Acerto: remove pais da fila e soma acerto/sequencia.
- Erro ou "Nao sei": decrementa vida, zera sequencia e prepara retorno do pais a fila.

Saidas:

- `playing` se ainda ha vidas e perguntas pendentes.
- `retry_pending` se for necessario reposicionar bandeira errada antes da proxima pergunta.
- `continuation_offer` se vidas chegam a zero e ha continuacao.
- `game_over` se vidas chegam a zero e nao ha continuacao.
- `finished` se total correto chega a 195.

### `retry_pending`

Estado tecnico para reinserir bandeira errada na fila sem deixa-la repetir imediatamente.

Entradas:

- Erro.
- "Nao sei".

Saidas:

- `playing`.

Regra:

- Reinsere `currentCountryCode` em posicao futura da fila. Evitar proxima posicao imediata quando houver outros paises pendentes.

### `continuation_offer`

Tela/overlay de oferta de uma continuacao com moedas.

Entradas:

- Vidas zeradas.
- `usedContinuation === false`.
- Saldo de moedas suficiente ou elegibilidade para moeda gratuita.

Saidas:

- `playing` se o usuario aceita e paga.
- `game_over` se recusa ou nao ha saldo.

Regra:

- Uma continuacao por partida. Gravar no resultado final se foi usada.

### `game_over`

Partida encerrada sem completar os 195 paises.

Entradas:

- Vidas zeradas sem continuacao.
- Recusa da continuacao.

Saidas:

- `idle` ao voltar ao menu.
- Nova partida ao reiniciar.

Persistencia:

- Gravar historico local de tentativa, mas nao pontuar ranking global como partida concluida completa, a menos que o produto defina uma categoria de tentativas.

### `finished`

Todos os 195 paises foram corretamente identificados.

Entradas:

- `answeredCorrect.size === 195`.

Saidas:

- Resultado final.
- Ranking global Android se plataforma permitir.
- Historico local.

Persistencia:

- Gravar resultado como `world_challenge`, nunca como `expert`.

## Funcoes atuais reutilizaveis

- `getCountryName(code)` em `js/i18n.js:326-341` para rotulos localizados.
- `formatarTempo()` em `js/app.js:1370-1380` para exibicao de tempo.
- `t()` e `tPlural()` em `js/i18n.js:292-324` para textos.
- `FlagGameStorage` em `js/storage.js:1-168` para leitura/escrita defensiva.
- `FlagGameRanking.buildScorePayload()` como inspiracao de contrato, mas nao diretamente sem acrescentar plataforma/mode novo.
- `FlagGameChallenge.buildQuestions()` em `js/challenges.js:134-149` para seed/ordem deterministica.
- `tocarSom()` e `vibrar()` em `js/app.js:216-257` para feedback, se a UI permitir.
- `compartilharResultado()` em `js/app.js:610-667` como base para compartilhar resultado local.

## Funcoes atuais excessivamente acopladas

- `iniciarModoExperiente()` em `js/app.js:1196-1222`: mistura UI, estado, fila e cronometro.
- `mostrarPaisExperiente()` em `js/app.js:1224-1255`: escreve DOM diretamente e assume input digitado.
- `verificarRespostaExperiente()` em `js/app.js:1257-1321`: depende do input textual e nao possui vidas nem retorno a fila.
- `pularPaisExperiente()` em `js/app.js:1324-1355`: avanca e conta pulo, mas nao consome vida.
- `avancarPaisExperiente()` em `js/app.js:1357-1368`: fila linear sem retry.
- `finalizarModoExperiente()` em `js/app.js:1383-1440`: grava perfil/ranking legado com `mode: "expert"`.
- `mostrarPergunta()` em `js/app.js:1651-1706`: gera alternativas, renderiza DOM e registra eventos no mesmo fluxo.
- `verificarResposta()` em `js/app.js:1713-1762`: avanca sempre apos resposta, sem vidas/retry.
- `mostrarResultado()` em `js/app.js:1769-1880`: grava perfil, ranking, recorde e desafio num bloco unico.

## Arquitetura sugerida

1. Criar modulo novo, por exemplo `js/world-challenge.js`, com estado puro e funcoes de transicao.
2. Criar camada UI separada, por exemplo `js/world-challenge-ui.js`, para renderizar tela, alternativas, vidas, feedback e resultado.
3. Criar persistencia separada, por exemplo `FlagGameWorldChallengeStorage`, usando `FlagGameStorage`.
4. Criar gerador de alternativas com assinatura pura:

```js
buildWorldChallengeOptions({
  correctCode,
  allCountries,
  language,
  usedCodes,
  random
})
```

5. Deduplicar alternativas por codigo e por nome exibido normalizado.
6. Opcionalmente usar grupos de bandeiras parecidas quando o dataset for ampliado.
7. Criar detector de plataforma centralizado antes de qualquer ranking global.
8. Integrar ranking global apenas por adapter Android, nunca nas extensoes ou no site.

## Regras para alternativas

- Sempre quatro opcoes.
- Uma e somente uma correta.
- Deduplicar por `code`.
- Deduplicar por `normalizarTexto(getCountryName(code))`.
- Evitar usar alternativas fora dos 195 paises canonicos.
- Se houver grupos de bandeiras parecidas no futuro, preferir pelo menos uma alternativa do mesmo grupo quando possivel.
- Nao depender do subconjunto restante da fila para escolher erradas; usar universo completo de 195 para manter variedade.

## Ranking Android futuro

- Ranking global deve ser impossivel de chamar em Web/extensoes por ausencia de adapter e por checagem de plataforma.
- Payload deve incluir:
  - `mode: "world_challenge"`.
  - `platform: "android"`.
  - `completed: true`.
  - `correct: 195`.
  - `durationSeconds`.
  - `bestStreak`.
  - `usedContinuation`.
  - `eventId`.
- Nao enviar payloads `expert` legados como `world_challenge`.
- Nao usar a fila `flagGameRankingQueue` existente sem migracao/namespace.

## Sequencia de implementacao recomendada

1. Congelar contrato legado: documentar `expert` como legado.
2. Adicionar testes/unit checks para dataset de 195, unicidade de nomes exibidos e arquivos de bandeira.
3. Criar estado puro do `world_challenge`.
4. Criar gerador de alternativas deduplicado.
5. Criar tela nova sem remover a tela antiga.
6. Persistir historico local novo.
7. Persistir partida interrompida nova se o produto quiser retomada.
8. Integrar perfil de forma separada, sem mexer nos contadores legados ate haver decisao de produto.
9. Criar adapter Android para ranking global.
10. Bloquear ranking global em Web, GitHub Pages, Chrome, Edge e Firefox.

## Testes recomendados

- Completar 195 sem erros: entra em `finished`, tempo final gravado e ranking Android elegivel.
- Errar uma pergunta: vida diminui, pais volta a fila, nao conta como correto.
- Clicar "Nao sei": vida diminui, pais volta a fila, mostra feedback.
- Zerar vidas sem moedas: `game_over`.
- Zerar vidas com continuacao: `continuation_offer`, depois `playing`.
- Tentar segunda continuacao: bloqueado.
- Alternativas nunca incluem duplicata por codigo ou nome traduzido.
- Mudanca de idioma durante partida atualiza labels sem trocar a resposta correta.
- Web/extensoes nao chamam ranking global.
- Android sem Google Play Games disponivel continua local.
