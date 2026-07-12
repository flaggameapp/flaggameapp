# Flag Game Homepage Review

## Resumo executivo

A documentacao atual ja define uma direcao forte para a Homepage Oficial do Flag Game: posiciona o produto como uma experiencia educativa completa, preserva a identidade visual existente, evita prometer recursos futuros e cria uma base segura para implementacao incremental.

Ainda assim, a especificacao nao deve ser considerada totalmente pronta para implementacao visual final. Ela esta pronta como base conceitual, mas precisa de refinamentos antes do desenvolvimento para reduzir retrabalho em quatro frentes: foco do Hero, ritmo da narrativa, tratamento das plataformas sem URLs e reducao de repeticoes entre secoes de progresso, conquistas, desafios e FAQ.

O maior risco atual nao e tecnico. E de produto: a homepage pode ficar correta, mas longa demais, explicativa demais e um pouco previsivel. Para provocar a percepcao desejada ("eu nao sabia que existia um jogo de bandeiras assim"), ela precisa mostrar mais cedo o valor jogavel, reduzir texto institucional e transformar recursos em momentos de curiosidade.

## Documentos revisados

- `docs/homepage/FLAG_GAME_HOMEPAGE_SPEC.md`
- `docs/homepage/FLAG_GAME_DESIGN_SYSTEM.md`
- `docs/homepage/FLAG_GAME_HOMEPAGE_COPY.md`
- `docs/homepage/FLAG_GAME_HOMEPAGE_IMPLEMENTATION_PLAN.md`

## Diagnostico geral

A especificacao acerta ao defender que a homepage deve ser um ponto central do produto, nao uma landing page generica. Tambem acerta ao usar o jogo como fonte visual principal e ao separar recursos ativos de estruturas futuras.

O ponto mais sensivel e a densidade. A arquitetura com 13 secoes e a copy completa podem gerar uma pagina correta, mas longa, simetrica e card-heavy. Isso pode enfraquecer a sensacao de descoberta. Produtos como Duolingo, GeoGuessr, Chess.com e Human Benchmark costumam vencer pelo primeiro contato rapido: em poucos segundos, o visitante entende o desafio, sente vontade de tentar e so depois descobre profundidade.

Para o Flag Game, a homepage deve entregar esta ordem emocional:

1. "Consigo jogar agora."
2. "O desafio e maior do que parece: 195 bandeiras."
3. "Ha jeitos diferentes de jogar."
4. "Meu progresso vira uma colecao de metas."
5. "Posso voltar, melhorar e desafiar alguem."
6. "Esta disponivel onde eu uso."

Hoje a especificacao contem todos esses elementos, mas a ordem e a intensidade ainda podem ser refinadas.

## Pontos fortes

### Posicionamento claro

A documentacao estabelece bem que o Flag Game e uma experiencia de aprendizado, descoberta, desafio e evolucao. Isso evita dois extremos ruins: parecer um quiz casual descartavel ou parecer uma ferramenta escolar fria.

### Boa separacao entre recurso ativo e futuro

A especificacao e cuidadosa ao tratar ranking online, autenticacao e sincronizacao como arquitetura preparada, nao como promessa publica. Esse e um ponto excelente e deve permanecer como regra central.

### Uso correto do produto como fonte visual

A orientacao de usar bandeiras reais, mockups do jogo, logo e componentes existentes protege a homepage contra aparencia de template generico. Tambem reforca a identidade propria.

### CTA principal bem definido

"Jogar agora" como CTA principal e a decisao correta. O produto e um jogo; a melhor conversao e comecar a jogar, nao ler sobre o jogo por muito tempo.

### Design system coerente com o jogo

A paleta azul/neutra, cards brancos, foco visivel, motion moderado e reaproveitamento do logo formam uma base consistente. A especificacao evita modismos visuais e preserva performance.

### Acessibilidade tratada desde o inicio

O documento inclui contraste, foco, teclado, screen reader, `prefers-reduced-motion`, RTL e textos alternativos. Isso reduz retrabalho tecnico na implementacao.

### Plano de implementacao seguro

O plano divide bem as tarefas e reconhece riscos reais, especialmente a decisao de rota e o perigo de substituir `index.html` sem planejamento.

### Copy sem exagero publicitario

O tom geral e direto e elegante. Nao ha claims como "melhor do mundo", numeros inventados ou depoimentos falsos.

## Melhorias recomendadas

### Critica: Tornar o Hero mais decisivo em cinco segundos

O Hero atual e correto, mas ainda pode ser mais forte. "Flag Game" como H1 reforca marca, porem nao explica sozinho o valor para quem chega sem contexto. O eyebrow "195 paises. Varias formas de jogar." ajuda, mas a composicao precisa garantir que o visitante entenda imediatamente tres coisas:

- e um jogo;
- e sobre as bandeiras dos 195 paises;
- da para comecar agora.

Recomendacao: manter a marca visivel, mas usar uma linha principal mais explicativa ou combinar H1 + subtitulo de modo mais direto.

Opcao mais forte:

`Aprenda as bandeiras dos 195 paises`

Com marca acima ou junto:

`Flag Game`

Subtitulo mais curto:

`Jogue por continente, pelo mundo inteiro ou no modo experiente.`

Remover ou reduzir o texto de apoio no primeiro viewport se ele competir com o CTA. O Hero deve ter uma frase curta, um mockup visual claro e CTA principal acima da dobra.

Resposta direta: o Hero convence em menos de cinco segundos apenas se o mockup visual for muito forte. Pela copy isolada, ainda pode melhorar.

### Critica: Resolver a estrategia das plataformas antes da implementacao

A documentacao diz para apresentar Web, Google Play e Chrome Web Store, mas tambem diz para ocultar ou desabilitar CTAs sem URL. Isso e correto, mas cria uma decisao de produto pendente.

Antes de implementar, definir uma regra unica:

- Se Play Store ou Chrome Web Store tiverem URL publica: mostrar card com CTA ativo.
- Se nao tiverem URL publica: mostrar a plataforma apenas se o produto quiser comunicar disponibilidade real por outro caminho aprovado.
- Se a disponibilidade publica ainda nao existir: nao mostrar card com botao desabilitado na homepage principal.

Botao desabilitado de loja pode gerar frustracao e reduzir confianca. Em homepage publica, o ideal e nao exibir promessa que nao pode ser concluida.

### Critica: Definir a rota da homepage antes de qualquer design visual

O plano reconhece esse risco, mas ele deve virar criterio bloqueador. Enquanto nao houver decisao sobre `index.html`, `home.html`, subpasta ou rota externa, a especificacao nao esta pronta para desenvolvimento.

Recomendacao: documentar explicitamente a opcao preferida.

Opcao mais segura:

- manter `index.html` como jogo;
- criar homepage separada em rota nova;
- CTA Web aponta para `index.html`;
- extensao Chrome continua abrindo o jogo, nao a homepage, salvo decisao contraria.

Sem isso, a implementacao corre risco de quebrar Web, Android ou Chrome.

### Importante: Reordenar plataformas para aparecerem mais cedo ou com presenca no Hero

Hoje plataformas aparecem perto do fim. Isso respeita a narrativa, mas pode esconder uma informacao pratica importante. Visitantes querem saber rapidamente onde podem jogar.

Recomendacao: manter a secao detalhada de plataformas no fim, mas incluir sinal discreto no Hero:

`Disponivel no navegador, Android e Chrome`

Esse texto deve aparecer apenas se as tres disponibilidades estiverem publicamente validas. Caso contrario, usar algo mais seguro:

`Jogue no navegador. Versoes Android e Chrome usam links configuraveis quando publicados.`

Como copy publica, a segunda frase e tecnica demais. Portanto, a melhor decisao e condicional: so mencionar plataformas no Hero quando links publicos existirem.

### Importante: Reduzir repeticao entre diferenciais, demonstracao e modos

As secoes "Diferenciais rapidos", "Demonstracao visual" e "Modos de jogo" se sobrepoem parcialmente. Todas dizem, de alguma forma, que o jogo tem 195 paises, varios modos e progresso.

Recomendacao:

- Diferenciais rapidos devem ser uma faixa curta, quase escaneavel, sem textos longos.
- Demonstracao deve mostrar, nao explicar.
- Modos devem detalhar somente a escolha de jogo.

Se uma secao precisa repetir uma frase da anterior para fazer sentido, a arquitetura esta longa demais.

### Importante: Transformar "progresso" e "conquistas" em uma sequencia mais emocional

Separar progressao/estatisticas e conquistas faz sentido, mas pode parecer duas secoes administrativas. O valor emocional e: "cada partida deixa um rastro e abre novas metas".

Recomendacao: considerar uma narrativa combinada:

1. "Seu progresso fica salvo."
2. Mostrar 3 metricas fortes.
3. "E as conquistas dao proximos objetivos."
4. Mostrar 3 conquistas.

Isso pode virar uma unica secao mais dinamica em vez de duas secoes longas. Se mantidas separadas, a primeira deve ser mais funcional e a segunda mais aspiracional.

### Importante: Melhorar a diferenciacao contra outros jogos de bandeiras

A especificacao diz que o Flag Game e mais completo que um quiz comum, mas a copy ainda nao evidencia totalmente o "por que". Os diferenciais reais mais fortes sao:

- combina alternativas e digitacao;
- inclui jornada completa de 195 bandeiras;
- acompanha progresso local;
- tem conquistas;
- gera desafios por codigo com mesma sequencia;
- gera imagem de resultado;
- funciona sem login.

Recomendacao: no Hero ou logo apos ele, usar uma linha de contraste sutil:

`Nao e so acertar uma bandeira: escolha um modo, acompanhe sua evolucao e volte para completar o mundo.`

Evitar comparacao agressiva com concorrentes. O contraste deve ser implicito.

### Importante: Ajustar a copy de plataformas

No documento de copy, as descricoes "quando a URL publica da loja estiver configurada" sao corretas para especificacao interna, mas nao devem virar copy publica.

Recomendacao: separar claramente:

- Copy publica quando URL existe.
- Estado interno quando URL nao existe.
- Regra de renderizacao.

Exemplo:

Copy publica ativa:

`Baixe no Android pela Google Play.`

Estado interno:

`Nao renderizar este CTA enquanto HOMEPAGE_GOOGLE_PLAY_URL estiver vazio.`

Nao mostrar ao usuario final uma frase sobre URL nao configurada.

### Importante: Tornar a FAQ mais enxuta

A FAQ esta util, mas algumas respostas repetem secoes anteriores. A FAQ deve resolver objeções, nao repetir pitch.

Perguntas recomendadas para manter:

- "Preciso criar conta?"
- "O progresso fica salvo onde?"
- "Funciona offline?"
- "Quais modos existem?"
- "Existe ranking online?"
- "Posso desafiar um amigo?"

Pergunta "O jogo tem as bandeiras de todos os paises?" pode ficar se houver cuidado com a formulacao. Melhor:

`Quantas bandeiras o Flag Game tem?`

Resposta:

`A base principal do jogo inclui 195 paises.`

Evita debates sobre territorios, dependencias ou definicoes de "todos".

### Importante: Refinar SEO para acentos e intencao de busca

Os documentos usam texto sem acentos por seguranca tecnica, mas SEO publico em portugues deve usar acentos corretos.

Metatitulo publico recomendado:

`Flag Game - Aprenda as bandeiras dos 195 países`

Metadescricao publica recomendada:

`Jogue Flag Game e aprenda as bandeiras dos 195 países por continente, no mundo inteiro ou no modo experiente. Acompanhe progresso, conquistas e desafios.`

Tambem considerar termos:

- jogo de bandeiras;
- quiz de bandeiras;
- bandeiras dos países;
- aprender geografia;
- países do mundo.

Sem repetir artificialmente.

### Importante: Especificar melhor o comportamento mobile do Hero

A documentacao diz que deve funcionar em mobile, mas ainda falta uma prioridade clara para o primeiro viewport em celular.

Recomendacao mobile-first para Hero:

1. Logo pequeno ou marca textual.
2. H1 de valor.
3. CTA principal.
4. Mockup compacto.
5. Indicadores curtos.

No mobile, o mockup nao deve empurrar o CTA para baixo. O visitante deve conseguir iniciar em poucos segundos.

### Importante: Evitar excesso de cards

O design system alerta contra card dentro de card, mas a arquitetura ainda incentiva cards em diferenciais, modos, progressao, conquistas e plataformas. Isso pode criar uma pagina com ritmo repetitivo.

Recomendacao:

- Diferenciais: faixa horizontal ou lista editorial curta.
- Demonstracao: mockup grande, sem card adicional ao redor.
- Modos: cards, pois sao escolhas.
- Progressao/conquistas: painel visual ou composicao assimetrica.
- Plataformas: cards compactos.
- FAQ: acordeao simples.

Nem toda informacao precisa estar em card.

### Importante: Especificar estados de loja ausente sem prejudicar conversao

Se Google Play ou Chrome Web Store nao tiverem URL, um card desabilitado no meio da homepage pode parecer produto incompleto.

Recomendacao:

- Homepage publica: ocultar plataforma sem URL.
- Documentacao interna: manter placeholder de configuracao.
- Rodape ou plano: registrar que a homepage esta preparada para adicionar plataformas.

Isso preserva a percepcao de produto consolidado.

### Desejavel: Criar uma "demo mental" mais curiosa

A demonstracao visual poderia fazer mais do que mostrar uma interface. Ela pode criar um microdesafio:

`Voce reconhece esta bandeira?`

Com uma bandeira real e alternativas. Mesmo que nao seja interativo, esse tipo de composicao puxa o visitante para dentro da logica do jogo.

Nao precisa implementar jogo na homepage. Basta o mockup parecer uma pergunta real.

### Desejavel: Melhorar o texto da chamada final

`Comece pelas bandeiras que voce ja conhece` e bom, mas pode soar um pouco suave demais para a conclusao.

Alternativa:

`Quantas das 195 voce reconhece hoje?`

Subtitulo:

`Comece uma partida e veja seu progresso crescer a cada rodada.`

CTA:

`Jogar agora`

Essa chamada fecha com curiosidade e desafio.

### Desejavel: Definir exemplos visuais recomendados

O documento diz para usar bandeiras reais, mas nao sugere quais. Para evitar escolhas aleatorias, definir criterios:

- misturar continentes;
- incluir bandeiras reconheciveis e menos obvias;
- evitar excesso de bandeiras visualmente parecidas no mesmo mockup;
- nao favorecer apenas uma regiao;
- manter legibilidade das bandeiras pequenas.

### Desejavel: Especificar hierarchy de CTAs em secoes intermediarias

Ha muitos CTAs contextuais na copy: praticar por continente, jogar mundo inteiro, entrar no modo experiente, ver conquistas, jogar agora, explorar modos. Isso pode diluir a acao principal.

Recomendacao:

- Hero: "Jogar agora" + "Ver modos".
- Modos: CTAs podem existir, mas visualmente secundarios.
- Plataformas: CTAs de loja.
- Final: "Jogar agora".

Evitar CTA em conquistas se ele apenas leva ao mesmo jogo; pode ser link textual ou omitido.

### Desejavel: Melhorar screen reader para mockups

A especificacao diz que mockup nao interativo nao deve capturar foco. Acrescentar:

- mockups decorativos complexos devem ter `aria-hidden="true"` e texto equivalente proximo;
- mockups informativos devem ter descricao curta;
- bandeiras usadas em pergunta exemplo devem ter alt especifico apenas se o objetivo nao for revelar a resposta.

Para um jogo de adivinhar bandeira, alt text pode acidentalmente entregar a resposta se a imagem estiver em contexto interativo. Na homepage, isso precisa ser decidido.

### Desejavel: Definir limite de tamanho da pagina

Sem limite, a homepage pode crescer ate virar manual do produto.

Recomendacao:

- 7 a 9 blocos reais de rolagem no maximo, alem de header/footer;
- FAQ com ate 6 perguntas;
- secoes de texto com no maximo 1 paragrafo curto antes de elementos visuais;
- cards com 1 titulo e 1 descricao curta.

### Desejavel: Separar copy publica de notas internas

O arquivo de copy mistura texto final com estados internos ("Link ainda nao configurado"). Isso e util, mas pode confundir implementadores.

Recomendacao: no documento de copy, marcar explicitamente:

- `Texto publico`
- `Estado interno`
- `Nao renderizar ao usuario`

## Respostas por tema solicitado

### Hero

O Hero esta bem direcionado, mas ainda nao e o ponto mais forte da especificacao. Ele tem clareza, porem pode ganhar impacto reduzindo texto e colocando o valor no H1. O CTA "Jogar agora" e claro. A informacao que nao pode faltar e "195 paises" junto ao entendimento imediato de que e um jogo jogavel agora.

### Fluxo

A homepage conta uma historia, mas pode ficar longa. A ordem geral e boa, porem plataformas merecem um sinal mais cedo. "Diferenciais", "demonstracao" e "modos" precisam de papeis mais distintos para evitar repeticao. Progressao e conquistas podem ser combinadas ou tratadas como sequencia unica.

### Conteudo

Os textos sao naturais e nao exageradamente publicitarios. O risco e o oposto: algumas partes ficam explicativas demais, especialmente plataformas e FAQ. A copy publica nao deve falar sobre URLs nao configuradas.

### Diferenciais

Os diferenciais reais aparecem, mas o conjunto "modo experiente + 195 bandeiras + progresso + conquistas + desafios por codigo + imagem de resultado" deveria aparecer como uma combinacao unica mais cedo. Idiomas sao importantes, mas nao devem roubar prioridade dos modos e da evolucao.

### Plataformas

A integracao entre Web, Android e Chrome esta documentada, mas precisa de regra publica mais clara. Se as lojas nao tiverem links, nao renderizar botoes desabilitados. A secao de plataformas pode ficar no fim, mas a disponibilidade deve ser sinalizada antes quando for totalmente verdadeira.

### Identidade

A homepage tem boa chance de parecer produto proprio porque usa logo, bandeiras, mockups do jogo e linguagem especifica. O risco de template aparece se todas as secoes virarem grades de cards com icones e textos curtos. A identidade deve vir do gameplay visual, nao apenas de paleta e cards.

### Design

As escolhas sao coerentes. O risco e excesso de simetria e cards. A pagina precisa de variacao: Hero visual forte, faixa de diferenciais, mockup grande, escolha de modos, painel de progresso/conquistas, bloco de desafio, plataformas e FAQ. Se tudo for card, perde personalidade.

### UX

Pontos provaveis de abandono: Hero sem desafio visual forte, pagina longa antes de mostrar plataformas, FAQ longa, cards repetitivos. Oportunidade de curiosidade: usar uma pergunta visual com bandeira real e a frase "Quantas das 195 voce reconhece hoje?"

### Performance

Reduzir carregamento de bandeiras acima da dobra, evitar fonte externa, evitar JS para animacoes que CSS resolve, nao usar video, limitar mockups animados e lazy-load abaixo da dobra. A pagina pode parecer rica com poucos assets se a composicao for boa.

### Acessibilidade

Base boa, mas faltam detalhes para alt text de bandeiras em contexto de quiz, `aria-hidden` em mockups decorativos, estados de plataforma ausente, skip link, landmarks e comportamento de menu mobile. Motion reduced esta bem coberto.

### Mobile

A documentacao declara mobile-first, mas a arquitetura ainda parece nascida de desktop em algumas partes: 13 secoes, grids 3/4 colunas e muitos cards. Antes de implementar, definir a versao mobile do fluxo como referencia principal e so depois expandir para desktop.

### Benchmark mental

- Duolingo: ganha pela clareza imediata e senso de progresso. Flag Game pode melhorar tornando progresso/conquistas mais emocional e menos administrativo.
- GeoGuessr: ganha por mostrar o desafio antes de explicar. Flag Game deve mostrar uma bandeira/pergunta real muito cedo.
- Chess.com: ganha por oferecer varias entradas sem confundir. Flag Game deve organizar modos e plataformas sem excesso de CTAs.
- Human Benchmark: ganha pela simplicidade extrema de iniciar. Flag Game deve proteger o CTA principal e evitar que a homepage vire catalogo.

## Revisao de consistencia

### Titulos potencialmente redundantes

- "Mais do que reconhecer uma bandeira"
- "Veja a bandeira, escolha o pais, acompanhe o resultado"
- "Tres formas de explorar o mundo"

Eles sao bons individualmente, mas em sequencia podem soar como tres introducoes para o mesmo assunto. Diferenciais e demonstracao devem ser mais distintos.

### Textos repetidos

O conceito de 195 paises aparece em Hero, diferenciais, modos, conquistas, FAQ, final e metadados. Isso e bom para SEO, mas precisa parecer natural. Usar variacoes e evitar que cada secao comece pelo mesmo numero.

### CTAs duplicados

Ha muitos CTAs intermediarios que podem apontar para o mesmo jogo. A hierarquia deve limitar a quantidade de botoes fortes.

### Componentes semelhantes

Cards podem aparecer em modos, diferenciais, plataformas, conquistas e metricas. Definir quais secoes realmente usam cards para evitar monotonia.

### Informacoes conflitantes

Existe tensao entre "apresentar Android e Chrome" e "nao exibir URL se nao configurada". Nao e conflito grave, mas precisa de decisao antes de implementar.

### Inconsistencias entre documentos

O spec recomenda ocultar CTAs de loja sem URL, enquanto o copy inclui textos publicos de "Link ainda nao configurado". A recomendacao da auditoria e tratar esses textos como estado interno, nao copy publica.

## Sugestoes descartadas

### Nao recomendo transformar a homepage em mini-jogo completo

Parece interessante para conversao, mas aumenta JS, risco de bugs, acessibilidade e duplicacao de logica. Um mockup com microdesafio visual ja entrega curiosidade sem custo alto.

### Nao recomendo usar mapa mundial como elemento principal

O pedido original proibe anunciar mapa mundial como recurso futuro. Alem disso, mapa pode deslocar o protagonismo das bandeiras e criar expectativa de funcionalidade inexistente.

### Nao recomendo destacar ranking futuro como "em breve"

Mesmo sendo tentador para mostrar ambicao, isso cria promessa publica, distrai da experiencia atual e pode gerar cobranca. Ranking deve ficar fora da homepage publica.

### Nao recomendo mostrar todos os idiomas como uma lista longa em destaque

O suporte a 20 idiomas e forte, mas uma lista completa pode quebrar ritmo. Melhor usar grade compacta, seletor ou frase com alguns exemplos e opcao de expansao.

### Nao recomendo usar depoimentos, avaliacoes ou numeros de usuarios

Sem dados reais, isso violaria as regras e reduziria confianca.

### Nao recomendo adotar fonte externa como requisito

Pode melhorar aparencia, mas cria custo de performance e privacidade. A identidade pode ser elevada com layout, escala e assets existentes.

### Nao recomendo botao desabilitado para loja sem URL

Em produto publico, botao desabilitado parece falha ou promessa incompleta. Melhor ocultar ate haver destino valido.

### Nao recomendo abrir muitas rotas de modo diretamente pela homepage sem arquitetura clara

Levar CTA de cada modo direto para estados internos do jogo pode ser excelente, mas so depois de definir rota, estado inicial e regressao. Para primeira implementacao, "Jogar agora" e "Ver modos" sao mais seguros.

## Checklist final

### Produto e posicionamento

- [ ] A homepage comunica em ate cinco segundos que o Flag Game e um jogo de bandeiras dos 195 paises.
- [ ] A proposta de valor aparece antes de detalhes secundarios.
- [ ] O tom e confiante sem exagero publicitario.
- [ ] A pagina transmite produto consolidado, nao experimento incompleto.
- [ ] Nenhum recurso futuro e anunciado como disponivel.
- [ ] Ranking, login e sincronizacao ficam fora da comunicacao publica ou claramente marcados como nao disponiveis.

### Hero

- [ ] H1 ou bloco inicial explica o valor, nao apenas a marca.
- [ ] CTA "Jogar agora" aparece acima da dobra em mobile e desktop.
- [ ] O Hero usa visual real ou mockup fiel do jogo.
- [ ] O texto do Hero e curto.
- [ ] "195 paises" aparece cedo.
- [ ] O Hero nao depende de animacao para ser compreendido.

### Arquitetura e fluxo

- [ ] Cada secao responde a uma pergunta real do visitante.
- [ ] Diferenciais, demonstracao e modos nao repetem a mesma funcao.
- [ ] Progressao e conquistas formam uma narrativa de evolucao.
- [ ] Plataformas aparecem em momento adequado e sem promessas vazias.
- [ ] FAQ resolve objeções, nao repete o conteudo inteiro.
- [ ] A chamada final cria vontade de jogar.
- [ ] A pagina nao passa de um tamanho razoavel para mobile.

### Copy

- [ ] Copy publica nao menciona "URL nao configurada".
- [ ] Textos tecnicos ficam apenas em notas internas.
- [ ] CTAs sao poucos e hierarquizados.
- [ ] Nao ha claims sem evidencia.
- [ ] Nao ha linguagem infantilizada.
- [ ] A copy usa acentos corretamente na versao publica.
- [ ] A metadescricao e natural para busca.

### Design

- [ ] A identidade visual vem do jogo real, nao de templates.
- [ ] Bandeiras sao protagonistas, nao decoracao aleatoria.
- [ ] Ha variacao visual entre secoes.
- [ ] Cards sao usados apenas onde ajudam.
- [ ] Nao ha card dentro de card.
- [ ] A paleta nao fica monotona nem pesada.
- [ ] O logo atual e respeitado.
- [ ] GitHub fica discreto no rodape.

### Plataformas

- [ ] `HOMEPAGE_WEB_PLAY_URL` esta definido.
- [ ] `HOMEPAGE_GOOGLE_PLAY_URL` so renderiza CTA quando tiver URL valida.
- [ ] `HOMEPAGE_CHROME_WEB_STORE_URL` so renderiza CTA quando tiver URL valida.
- [ ] Nao aparecem iOS, Firefox, Edge, Steam ou outras plataformas futuras.
- [ ] Links externos usam `rel="noopener"`.
- [ ] A extensao Chrome nao tem fluxo quebrado pela nova rota.

### Mobile

- [ ] O fluxo mobile foi desenhado primeiro.
- [ ] CTA principal aparece cedo.
- [ ] Mockups cabem em 320 px sem overflow.
- [ ] Cards ou blocos nao ficam longos demais.
- [ ] Menu mobile e acessivel por teclado.
- [ ] Alvos de toque tem pelo menos 44 px.

### Acessibilidade

- [ ] Existe skip link para conteudo principal.
- [ ] Landmarks (`header`, `main`, `nav`, `footer`) estao corretos.
- [ ] Foco visivel em todos os elementos interativos.
- [ ] Contraste atende AA.
- [ ] Acordeao de FAQ usa botoes e estados anunciaveis.
- [ ] Mockups decorativos nao capturam foco.
- [ ] Bandeiras em contexto de quiz nao revelam resposta indevidamente via alt.
- [ ] `prefers-reduced-motion` reduz animacoes.
- [ ] RTL e textos longos foram testados.

### Performance

- [ ] Nenhuma fonte externa e obrigatoria.
- [ ] Poucas bandeiras carregam acima da dobra.
- [ ] Imagens abaixo da dobra usam lazy loading.
- [ ] Assets tem dimensoes definidas.
- [ ] Animacoes usam `transform` e `opacity`.
- [ ] Nao ha video obrigatorio.
- [ ] JS da homepage e minimo.
- [ ] CSS da homepage e isolado para nao afetar o jogo.

### Implementacao segura

- [ ] A rota da homepage esta decidida antes do HTML.
- [ ] `index.html` nao sera substituido sem decisao explicita.
- [ ] O jogo atual continua abrindo normalmente.
- [ ] A homepage nao altera logica de perfil, desafios, conquistas ou i18n.
- [ ] Regressao do jogo sera testada apos implementacao.
- [ ] O estado sem URL de loja foi decidido antes do deploy.

## Prontidao para implementacao

Minha avaliacao: a especificacao esta pronta como base estrategica, mas ainda nao esta pronta para implementacao final sem ajustes.

Faltam quatro decisoes antes de iniciar desenvolvimento:

1. Definir a rota/ponto de entrada da homepage.
2. Decidir a regra publica para Play Store e Chrome Web Store quando URLs estiverem ausentes.
3. Refinar o Hero para comunicar valor em menos de cinco segundos.
4. Reduzir repeticoes e excesso potencial de cards no fluxo.

Depois desses ajustes, a implementacao pode comecar com risco bem menor e com uma direcao de produto mais afiada.
