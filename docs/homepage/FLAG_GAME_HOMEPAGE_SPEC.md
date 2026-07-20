# Flag Game Homepage Spec

## Resumo executivo

A nova homepage deve ser a pagina oficial do Flag Game, nao apenas uma landing page promocional. Ela deve apresentar o jogo como uma experiencia de aprendizado, descoberta, desafio e evolucao sobre as bandeiras dos 195 paises do mundo, usando o proprio jogo como fonte visual principal.

Esta especificacao foi escrita apos inspecao do repositorio atual. Foram confirmados no codigo: lista de 195 paises em `js/countries.js`, modos por continente, mundo inteiro com 10, 20, 50 ou 195 bandeiras, modo experiente por digitacao, desafios compartilhaveis por codigo, geracao/download/compartilhamento de imagens de resultado, perfil local, estatisticas, conquistas, 20 idiomas, armazenamento local e arquitetura offline-first/local-first. Tambem foi confirmado que ranking online, autenticacao Firebase e sincronizacao existem como estrutura preparada/adapters offline, nao como recursos publicos ativos.

## Objetivo da homepage

1. Explicar rapidamente o que e o Flag Game.
2. Levar o visitante a jogar no navegador.
3. Apresentar os recursos ja existentes sem exagero publicitario.
4. Mostrar as plataformas publicas: Web, Google Play e Chrome Web Store.
5. Dar percepcao de produto consolidado, leve e cuidado.
6. Evidenciar que o Flag Game e mais completo que um quiz simples.
7. Permanecer extensivel para novas plataformas e recursos sem anuncia-los antes da hora.

## Publico-alvo

- Pessoas que gostam de geografia, bandeiras e cultura geral.
- Estudantes e professores que buscam pratica rapida e visual.
- Jogadores casuais que querem desafios curtos.
- Jogadores recorrentes que valorizam progresso, estatisticas e conquistas.
- Visitantes vindos de busca, links compartilhados, loja Android ou extensao Chrome.

## Posicionamento

O Flag Game deve ser apresentado como um jogo educativo moderno sobre bandeiras, com modos de pratica, desafios, progresso local e suporte internacional. A sensacao desejada e: "Eu nao sabia que existia um jogo de bandeiras assim."

O tom deve ser direto, elegante e confiante. Evitar promessas absolutas, comparacoes agressivas e linguagem infantil.

## Mensagem principal

Aprenda as bandeiras dos 195 paises jogando no seu ritmo: por continente, pelo mundo inteiro, digitando respostas no modo experiente, acompanhando seu progresso e compartilhando desafios.

## Proposta de valor

- Conteudo completo: 195 paises confirmados na base do jogo.
- Modos com diferentes niveis de esforco: alternativas, mundo inteiro e digitacao.
- Progresso local: partidas, acertos, media, sequencia, continentes concluidos e modo favorito.
- Conquistas: metas de evolucao e pontos locais.
- Desafios compartilhaveis: codigos que recriam a mesma sequencia de bandeiras.
- Compartilhamento visual: imagem de resultado gerada pelo proprio jogo.
- Idiomas: 20 locales disponiveis com selecao persistida.
- Offline/local-first: recursos principais nao dependem de login ou servidor.

## Hierarquia de chamadas para acao

1. CTA principal: "Jogar agora" abre o jogo no navegador.
2. CTA secundaria: "Ver modos" rola para modos de jogo.
3. CTAs de plataforma: "Baixar na Google Play" e "Instalar no Chrome" aparecem na secao de plataformas, sem competir com o CTA principal.
4. CTA final: "Comecar pelas 195 bandeiras" ou "Jogar Flag Game agora".

Os links de loja nao devem ser inventados. Se nao estiverem configurados, o componente deve aceitar constantes/atributos de configuracao e renderizar estado indisponivel, oculto ou "em breve" apenas se essa decisao for aprovada. A especificacao recomenda nao exibir botoes de loja sem URL publica valida.

## Arquitetura da pagina

Ordem recomendada:

1. Cabecalho.
2. Hero.
3. Diferenciais rapidos.
4. Demonstracao visual do jogo.
5. Modos de jogo.
6. Progressao, perfil e estatisticas.
7. Conquistas.
8. Desafios entre amigos e compartilhamento.
9. Alcance internacional e idiomas.
10. Plataformas disponiveis.
11. FAQ.
12. Chamada final.
13. Rodape.

A ordem inicial e adequada. A demonstracao visual deve aparecer antes dos detalhes para que o visitante veja o produto real cedo. Progressao e conquistas podem ser seccoes vizinhas, mas devem manter mensagens separadas: "acompanhe evolucao" e "complete metas".

## Especificacao por secao

### 1. Cabecalho

- Objetivo: orientar, reforcar marca e oferecer rotas basicas.
- Mensagem: Flag Game e um produto reconhecivel, pronto para jogar.
- Conteudo: logo atual, links "Modos", "Progresso", "Plataformas", "FAQ" e CTA "Jogar".
- Componentes: header sticky opcional, logo, nav curta, seletor de idioma se integrado ao mesmo sistema existente, botao principal.
- Comportamento: o CTA principal abre o jogo; links fazem scroll para secoes.
- Animacoes permitidas: sombra sutil ao rolar, transicao de foco/hover.
- Responsividade: desktop com nav horizontal; tablet com nav reduzida; celular com logo, CTA e menu compacto.
- Acessibilidade: `nav` semantica, foco visivel, `aria-label` em menu compacto, alvo minimo de toque.
- Criterios de aceite: GitHub nao aparece no cabecalho; autoria pessoal nao e destacada; marca visivel e Flag Game.

### 2. Hero

- Objetivo: explicar em segundos o desafio das 195 bandeiras e iniciar o jogo.
- Mensagem: existe um jogo completo para aprender as bandeiras do mundo.
- Conteudo: H1 com "Flag Game" ou "Aprenda as bandeiras dos 195 paises"; texto de apoio; CTAs; tres indicadores curtos.
- Componentes: area visual com bandeiras reais do jogo, mockup do estado de pergunta/resultado, CTA principal, CTA secundaria.
- Comportamento: CTA "Jogar agora" deve apontar para a entrada Web existente; CTA "Ver modos" rola.
- Animacoes permitidas: entrada leve, troca lenta de bandeiras ou parallax muito sutil; sem movimento constante pesado.
- Responsividade: no desktop, texto e mockup em composicao rica; no celular, H1, CTA e visual aparecem sem cortar conteudo.
- Acessibilidade: H1 unico; imagens de bandeiras com alt contextual ou decorativas se repetitivas; contraste AA.
- Criterios de aceite: hero deixa claro "195 paises"; nao usa depoimentos, numeros de usuarios ou claims nao comprovados.

### 3. Diferenciais rapidos

- Objetivo: responder "por que isso e mais que um quiz comum?".
- Mensagem: ha modos, progresso, desafios e idiomas.
- Conteudo sugerido: "195 paises", "modos por objetivo", "progresso local", "desafios por codigo".
- Componentes: quatro itens compactos, preferencialmente sem cards pesados.
- Comportamento: itens podem apontar para secoes.
- Animacoes permitidas: reveal discreto ao entrar na viewport.
- Responsividade: grade 4 colunas no desktop, 2 no tablet, 1 no celular.
- Acessibilidade: nao depender de cor isolada; icones com texto.
- Criterios de aceite: somente recursos confirmados no codigo.

### 4. Demonstracao visual do jogo

- Objetivo: mostrar o produto real, nao uma ilustracao generica.
- Mensagem: o jogo e simples de entender, visual e responsivo.
- Conteudo: composicao com uma bandeira real, pergunta, alternativas, placar e exemplo de resultado.
- Componentes: mockups baseados nos componentes atuais: bandeira com borda/sombra, alternativas, placar, resultado.
- Comportamento: mockup pode alternar entre estados "pergunta", "correto" e "resultado".
- Animacoes permitidas: transicao de pergunta/resultado, sem simular partida longa.
- Responsividade: mockup deve caber em 320 px de largura.
- Acessibilidade: se for mockup nao interativo, nao deve capturar foco; se interativo, precisa teclado.
- Criterios de aceite: usa assets `assets/flags/*.svg` ou capturas/componentes do proprio jogo; nao usa bandeiras aleatorias fora da base.

### 5. Modos de jogo

- Objetivo: responder "como posso jogar?".
- Mensagem: cada jogador pode praticar de um jeito.
- Conteudo: Por continente, Mundo inteiro, Modo Experiente.
- Componentes: tres blocos com nome, descricao, nivel de esforco e CTA contextual.
- Comportamento: CTAs podem iniciar modo ou rolar para entrada Web, dependendo da arquitetura final.
- Animacoes permitidas: hover/focus com elevacao sutil.
- Responsividade: 3 colunas desktop, 1 coluna celular.
- Acessibilidade: botoes/links com texto claro; nao depender de emoji como unico identificador.
- Criterios de aceite: mundo inteiro cita apenas 10, 20, 50 e 195; modo experiente explica digitacao sem prometer ranking.

### 6. Progressao, perfil e estatisticas

- Objetivo: responder "meu progresso e acompanhado?".
- Mensagem: o jogo salva progresso localmente no dispositivo.
- Conteudo: partidas jogadas, total de acertos, percentual medio, melhor sequencia, tempo medio, modo favorito, continentes concluidos.
- Componentes: painel visual inspirado no perfil local, pequenas metricas, barra de continentes.
- Comportamento: valores podem ser exemplos neutros ou "seu progresso aparece aqui" se conectado ao perfil real.
- Animacoes permitidas: contagem discreta, apenas se nao prejudicar leitura.
- Responsividade: metricas em grade fluida.
- Acessibilidade: rotulos completos para cada numero.
- Criterios de aceite: deixar claro "localmente neste dispositivo"; nao mencionar sincronizacao como ativa.

### 7. Conquistas

- Objetivo: responder "ha metas para completar?".
- Mensagem: conquistas ajudam a criar continuidade e senso de evolucao.
- Conteudo: exemplos reais de conquistas confirmadas: primeira vitoria, 100 acertos, 1000 acertos, todos os continentes, 195 bandeiras, 10 partidas perfeitas, 50 partidas, especialistas por continente.
- Componentes: lista curta com progresso, badges de pontos e estados bloqueado/desbloqueado.
- Comportamento: nao precisa mostrar todas; pode mostrar uma selecao e dizer que ha mais no jogo.
- Animacoes permitidas: progresso preenchendo ao entrar, respeitando motion reduced.
- Responsividade: lista vertical em mobile.
- Acessibilidade: progresso com texto numerico; badges legiveis.
- Criterios de aceite: nao associar pontos a ranking online.

### 8. Desafios entre amigos e compartilhamento

- Objetivo: responder "posso desafiar alguem ou compartilhar resultado?".
- Mensagem: jogadores podem recriar a mesma sequencia por codigo e gerar imagem de resultado.
- Conteudo: codigos nos formatos confirmados (`FG-W20-82K7P`, `FG-SA-ABCDE`), metricas de desafio, compartilhamento/baixar imagem.
- Componentes: bloco de codigo, mini resultado, botao copiar, preview de imagem social.
- Comportamento: se houver demo, deve ser visual; nao gerar desafio real na homepage sem integrar cuidadosamente ao jogo.
- Animacoes permitidas: copiar/feedback sutil, entrada do preview.
- Responsividade: codigo deve quebrar bem em celular.
- Acessibilidade: feedback em `aria-live`; botao copiar com label claro.
- Criterios de aceite: nao prometer comparacao online; comparacao e melhor resultado sao locais.

### 9. Alcance internacional e idiomas

- Objetivo: responder "posso jogar no meu idioma?".
- Mensagem: o Flag Game ja tem suporte multilingue amplo.
- Conteudo: 20 idiomas: portugues brasileiro, ingles, espanhol, frances, alemao, italiano, neerlandes, polones, russo, ucraniano, turco, arabe, hindi, bengali, chines simplificado, japones, coreano, indonesio, vietnamita e tailandes.
- Componentes: grade de idiomas ou faixa compacta com seletor.
- Comportamento: se integrado ao sistema existente, alterar idioma deve persistir como no jogo.
- Animacoes permitidas: nenhuma obrigatoria.
- Responsividade: grade rolavel ou wrap.
- Acessibilidade: nomes de idiomas legiveis; suporte RTL visualmente testado para arabe.
- Criterios de aceite: lista deve refletir `supportedLanguages` e arquivos de `locales/`.

### 10. Plataformas disponiveis

- Objetivo: responder "onde posso usar?".
- Mensagem: ha versao Web, Android e extensao Chrome.
- Conteudo: Jogar no navegador, baixar na Google Play, instalar pela Chrome Web Store.
- Componentes: tres blocos de plataforma com status/CTA.
- Comportamento: Web aponta para a rota/arquivo Web existente; Play Store e Chrome Web Store usam configuracao.
- Animacoes permitidas: hover/focus sutil.
- Responsividade: 3 colunas desktop, 1 coluna mobile.
- Acessibilidade: cada CTA deve informar destino externo quando aplicavel.
- Criterios de aceite: nao mencionar iOS, Firefox, Edge, Steam ou outras plataformas; nao inventar URLs.

Configuracao recomendada:

- `HOMEPAGE_WEB_PLAY_URL`: destino Web, provavelmente o jogo existente.
- `HOMEPAGE_GOOGLE_PLAY_URL`: URL publica da Play Store, vazia ate configuracao.
- `HOMEPAGE_CHROME_WEB_STORE_URL`: URL publica da Chrome Web Store, vazia ate configuracao.
- Alternativa declarativa: atributos `data-platform="web|android|chrome"` e `data-platform-url`.

### 11. FAQ

- Objetivo: responder duvidas reais sem alongar a pagina.
- Mensagem: o produto e claro, local-first e sem prometer futuro.
- Conteudo recomendado:
  - O jogo tem todos os paises?
  - Preciso criar conta?
  - Funciona offline?
  - O progresso e salvo onde?
  - Quais modos existem?
  - Ha ranking online?
  - Em quais idiomas posso jogar?
- Componentes: acordeao acessivel.
- Comportamento: abrir/fechar por teclado, estado anunciado.
- Animacoes permitidas: expansao suave com fallback sem motion.
- Responsividade: largura confortavel de leitura.
- Acessibilidade: usar `button` para perguntas e regioes associadas.
- Criterios de aceite: ranking online deve ser descrito como nao disponivel publicamente nesta versao.

### 12. Chamada final

- Objetivo: converter apos a explicacao.
- Mensagem: comece agora e acompanhe sua evolucao.
- Conteudo: titulo curto, apoio e CTA principal.
- Componentes: bloco full-width leve, CTA Web, links secundarios menores para lojas se configurados.
- Comportamento: CTA abre jogo.
- Animacoes permitidas: nenhuma obrigatoria.
- Responsividade: centralizado, sem card pesado.
- Acessibilidade: nao repetir H1; foco claro.
- Criterios de aceite: CTA final e claro e nao compete com GitHub.

### 13. Rodape

- Objetivo: fechar com informacoes institucionais discretas.
- Mensagem: produto oficial, leve e mantido.
- Conteudo: marca Flag Game, links de suporte/sobre/privacidade se existirem, GitHub discreto, versao quando util.
- Componentes: colunas simples ou linha compacta.
- Comportamento: GitHub em texto/link secundario.
- Animacoes permitidas: hover de link.
- Responsividade: pilha simples em mobile.
- Acessibilidade: contraste suficiente; links distinguiveis.
- Criterios de aceite: GitHub nao e elemento principal; autoria pessoal nao ganha destaque nas secoes principais.

## Comportamento por viewport

### Desktop

- Container principal entre 1120 e 1200 px.
- Hero com composicao em duas areas equilibradas.
- Secoes alternam texto e mockup sem parecer dashboard.
- CTAs visiveis sem excesso.

### Tablet

- Grades reduzem para 2 colunas.
- Mockups mantem proporcao e textos nao sobrepoem bandeiras.
- Header evita nav longa; pode usar menu compacto.

### Celular

- Conteudo em coluna unica.
- CTA principal aparece cedo.
- Mockups com altura controlada e bandeiras inteiras.
- Tamanho de toque minimo de 44 px.
- Nenhum texto deve depender de hover.

## Integracao com o jogo

- Reutilizar identidade visual atual: logo, paleta azul/neutra, bandeiras SVG, cards brancos e foco visivel.
- Reutilizar nomes dos modos e linguagem dos locales.
- A homepage nao deve substituir automaticamente `index.html` nesta etapa futura sem decisao explicita. A implementacao deve escolher rota/pagina com cuidado para nao quebrar a entrada do jogo.
- O CTA Web deve levar ao jogo existente.
- O sistema de idiomas da homepage deve seguir `js/i18n.js` ou manter traducao propria sincronizavel.
- Se a homepage mostrar dados reais de perfil local, deve ler apenas APIs existentes e lidar com perfil vazio.

## Links Web, Play Store e Chrome Web Store

- Web: pode apontar para a versao navegavel existente.
- Google Play: URL obrigatoriamente configuravel; nao inventar.
- Chrome Web Store: URL obrigatoriamente configuravel; nao inventar.
- Se uma URL estiver ausente, recomendacao: ocultar o CTA daquela loja ou exibir bloco sem botao clicavel somente se aprovado pelo produto.
- Links externos devem usar `rel="noopener"` quando abrirem nova aba.

## SEO

- Metatitulo sugerido: `Flag Game - Aprenda as bandeiras dos 195 paises`
- Metadescricao sugerida: `Jogue Flag Game e aprenda as bandeiras dos 195 paises por continente, no mundo inteiro ou no modo experiente. Acompanhe progresso, conquistas e desafios.`
- H1 unico e descritivo.
- Usar headings em ordem logica.
- Conteudo textual deve mencionar naturalmente "jogo de bandeiras", "bandeiras dos paises", "geografia" e "195 paises".
- Nao usar texto invisivel ou repeticao artificial.

## Open Graph

- `og:title`: `Flag Game - Aprenda as bandeiras dos 195 paises`
- `og:description`: `Um jogo educativo de bandeiras com modos por continente, mundo inteiro, modo experiente, progresso local, conquistas e desafios compartilhaveis.`
- `og:image`: preferir imagem social propria gerada a partir do logo e mockup do jogo; enquanto nao existir, usar `assets/images/logo.png`.
- `og:type`: `website`
- `og:site_name`: `Flag Game`

## Acessibilidade

- Contraste AA para texto e controles.
- Foco visivel consistente com o jogo.
- Navegacao por teclado completa.
- `prefers-reduced-motion` respeitado.
- Imagens de bandeiras com alt quando informativas.
- Idioma do documento correto; suporte a `dir="rtl"` para arabe se a homepage usar o mesmo seletor.
- Acordeoes e menus com estados anunciaveis.
- Evitar texto dentro de imagens como unica fonte de informacao.

## Desempenho

- Priorizar CSS e JS leves, sem framework obrigatorio.
- Reutilizar SVGs de bandeiras de forma limitada; evitar carregar todas no hero.
- Imagens grandes com dimensoes definidas.
- Lazy loading em imagens abaixo da dobra.
- Animacoes por `transform` e `opacity`.
- Sem videos obrigatorios.
- Evitar dependencias externas para funcoes basicas.

## Criterios de aceite gerais

- A homepage parece site oficial de produto.
- O primeiro viewport comunica Flag Game, 195 paises e CTA para jogar.
- Todas as funcionalidades anunciadas existem no codigo atual.
- Ranking online, login e sincronizacao nao sao anunciados como disponiveis.
- Plataformas publicas limitadas a Web, Google Play e Chrome Web Store.
- URLs de lojas sao configuraveis e nao inventadas.
- GitHub aparece apenas no rodape de forma discreta.
- Mobile, tablet e desktop estao previstos.
- Acessibilidade e `prefers-reduced-motion` estao contemplados.
- Nenhum arquivo funcional deve ser alterado na etapa de especificacao.

## Riscos e pontos de atencao

- Substituir `index.html` pode quebrar a entrada atual do jogo; a implementacao futura precisa decidir rota sem impacto.
- A homepage pode prometer demais se confundir adapters offline de ranking/sync com recursos publicos.
- Android e URLs de loja nao estao evidentes como arquivos/links publicos no codigo inspecionado; precisam de configuracao antes de renderizar CTAs clicaveis.
- Usar muitas bandeiras no hero pode prejudicar performance.
- Texto em 20 idiomas pode expandir layouts; testar comprimentos longos e RTL.
- Mockups devem parecer produto real, mas nao podem virar UI falsa confusa.
