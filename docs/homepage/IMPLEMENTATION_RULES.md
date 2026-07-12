# Implementation Rules - Homepage Oficial do Flag Game

## Status deste documento

Este documento e o contrato obrigatorio para toda implementacao futura da Homepage Oficial do Flag Game.

Nenhuma etapa futura de implementacao deve contrariar estas regras sem uma decisao explicita de produto e uma justificativa tecnica registrada. Quando houver conflito entre uma solicitacao futura e este documento, este documento prevalece ate ser formalmente atualizado.

Esta etapa nao implementa HTML, CSS ou JavaScript. Ela encerra o planejamento e define as regras para iniciar a fase de desenvolvimento.

## 1. Escopo

A implementacao contemplara apenas:

- Homepage Oficial do Flag Game.
- Integracao segura da homepage com o jogo existente.
- Documentacao necessaria para orientar, validar e manter a homepage.

A implementacao nao contempla:

- Novos modos de jogo.
- Mudancas na logica das partidas.
- Ranking online publico.
- Login publico.
- Sincronizacao em nuvem publica.
- Multiplayer.
- Modo infinito.
- Mapa mundial.
- Novas plataformas alem de Web, Android e Chrome.
- Reorganizacao estrutural do jogo sem justificativa.

A homepage deve apresentar o produto atual com fidelidade. Ela pode estar preparada para evoluir, mas nao deve anunciar recursos futuros como disponiveis.

## 2. Arquivos que podem ser modificados

### Arquivos que podem ser criados

Durante a implementacao da homepage, poderao ser criados arquivos dedicados, preferencialmente isolados do jogo atual:

- Arquivo HTML da homepage, se a rota definida exigir uma pagina separada.
- Arquivo CSS dedicado da homepage.
- Arquivo JavaScript minimo da homepage, apenas se necessario para navegacao, interacoes acessiveis, configuracao de plataformas ou progressive enhancement.
- Arquivo de configuracao de links/plataformas, se necessario.
- Imagem Open Graph ou assets visuais gerados especificamente para a homepage.
- Documentacao adicional em `docs/homepage/`.

### Arquivos que podem ser alterados com justificativa

Podem ser alterados, desde que a necessidade seja justificada e a regressao do jogo seja testada:

- `index.html`, apenas se a decisao de rota exigir integracao direta e houver garantia de nao quebrar a entrada atual do jogo.
- `css/style.css`, apenas se forem definidos tokens ou estilos compartilhados realmente necessarios.
- `js/i18n.js`, apenas se a homepage reutilizar internacionalizacao existente de forma segura.
- `manifest.json`, apenas se a homepage afetar manifest/PWA/extensao de modo intencional e validado.
- Arquivos de `locales/`, apenas se a homepage for internacionalizada pelo mesmo sistema e as novas chaves forem necessarias.

### Arquivos que nao devem ser alterados sem necessidade forte

Nao alterar sem necessidade tecnica clara:

- `js/app.js`
- `js/countries.js`
- `js/profile.js`
- `js/challenges.js`
- `js/ranking.js`
- `js/firebase-auth.js`
- `js/sync.js`
- `js/storage.js`
- `js/background.js`
- `assets/flags/*`
- Arquivos de imagem existentes, salvo otimizacao ou referencia documentada.

### Regra para arquivos estruturais

Qualquer modificacao em arquivo estrutural do projeto deve registrar:

- motivo da alteracao;
- alternativa considerada;
- risco de regressao;
- testes executados;
- confirmacao de que o jogo existente continua funcionando.

## 3. Regras de compatibilidade

A homepage deve:

- Funcionar no projeto atual.
- Nao quebrar nenhuma funcionalidade existente.
- Preservar URLs atuais do jogo, salvo decisao explicita de rota.
- Preservar o funcionamento offline/local-first das funcoes principais.
- Preservar a internacionalizacao existente.
- Preservar PWA existente, se houver.
- Preservar a extensao Chrome existente, incluindo o fluxo de abertura do jogo.
- Preservar dados locais de perfil, estatisticas, conquistas, idioma e desafios.
- Nao alterar comportamento de partidas, respostas, pontuacao, sequencias, tempos ou conquistas.

A homepage deve ser uma camada de apresentacao e entrada do produto, nao uma reescrita do jogo.

## 4. Responsividade

Toda implementacao deve nascer mobile-first.

### Breakpoints sugeridos

- Base: ate 479 px.
- Celulares grandes: 480 px a 767 px.
- Tablets: 768 px a 1023 px.
- Notebooks: 1024 px a 1279 px.
- Desktops: 1280 px a 1535 px.
- Ultrawide: 1536 px ou mais.

Os breakpoints podem ser ajustados se o layout real exigir, mas a implementacao deve continuar mobile-first.

### Celulares

- Conteudo em coluna unica.
- CTA principal visivel cedo.
- Hero curto e direto.
- Mockups compactos, sem overflow horizontal.
- Alvos de toque com pelo menos 44 px.
- Menu acessivel por teclado e toque.
- Nenhum conteudo essencial dependente de hover.

### Tablets

- Grades de ate 2 colunas.
- Mockups com proporcao preservada.
- Textos sem sobreposicao.
- Navegacao simplificada quando necessario.

### Notebooks

- Layout mais amplo, mas sem excesso de densidade.
- Hero pode usar duas areas: texto/CTA e mockup.
- Secoes devem manter leitura escaneavel.

### Desktops

- Container principal entre 1120 e 1200 px, salvo se a composicao exigir outra medida.
- Espacamento generoso, sem transformar a pagina em dashboard.
- Variacao visual entre secoes.

### Ultrawide

- Nao esticar conteudo indefinidamente.
- Usar containers maximos.
- Fundos e faixas podem ocupar largura total, mas conteudo deve permanecer controlado.

## 5. Performance

### Metas minimas

Alvos recomendados em Lighthouse para a homepage:

- Performance: maior ou igual a 95.
- Accessibility: 100 sempre que possivel.
- Best Practices: maior ou igual a 95.
- SEO: 100 sempre que possivel.

Se alguma meta nao for alcancada, a implementacao deve registrar a causa e a acao recomendada.

### Regras obrigatorias

- Evitar JavaScript desnecessario.
- Preferir HTML semantico e CSS para interacoes simples.
- Evitar frameworks ou bibliotecas pesadas sem justificativa.
- Nao carregar todas as bandeiras acima da dobra.
- Usar lazy loading para imagens abaixo da dobra.
- Definir dimensoes de imagens para evitar layout shift.
- Usar preload apenas para assets realmente criticos.
- Nao usar videos obrigatorios.
- Evitar imagens decorativas pesadas.
- Comprimir/otimizar imagens novas.
- Manter animacoes leves, preferindo `transform` e `opacity`.
- Evitar fontes externas como requisito.

## 6. Acessibilidade

Regras obrigatorias:

- Navegacao completa por teclado.
- Foco visivel em todos os elementos interativos.
- Contraste adequado, buscando WCAG AA no minimo.
- ARIA apenas quando necessario; preferir HTML semantico.
- Textos alternativos para imagens informativas.
- Mockups decorativos devem usar `aria-hidden="true"` ou equivalente adequado.
- Bandeiras em contexto de pergunta nao devem revelar a resposta indevidamente via alt text.
- `prefers-reduced-motion` deve reduzir ou remover animacoes.
- Nenhum conteudo essencial pode depender exclusivamente de hover.
- Menus, acordeoes e controles devem anunciar estado quando necessario.
- A pagina deve conter landmarks claros: `header`, `nav`, `main`, `footer`.
- Deve haver estrategia de skip link para conteudo principal.
- O idioma do documento deve estar correto.
- Se houver suporte a arabe/RTL na homepage, testar `dir="rtl"`.

## 7. SEO

### Requisitos minimos

A homepage deve definir:

- `title`.
- `meta description`.
- URL canonica, apenas quando a URL real estiver definida.
- Open Graph.
- Twitter Card.
- Schema.org adequado.
- Favicon.
- Politica de `robots`.
- Sitemap, quando houver URL publica definida.

### Regras de conteudo SEO

- Usar acentos corretamente na versao publica em portugues.
- Usar termos naturais como "jogo de bandeiras", "quiz de bandeiras", "bandeiras dos paises", "geografia" e "195 paises".
- Nao repetir palavras-chave artificialmente.
- Nao inventar URLs.
- Nao inventar estatisticas, avaliacoes, downloads, depoimentos ou premios.

### Open Graph e Twitter Card

- Imagem social deve usar identidade real do Flag Game.
- Se uma imagem OG dedicada ainda nao existir, usar asset real existente aprovado.
- A imagem nao deve sugerir recursos inexistentes.

### Schema.org

Usar Schema.org apenas se fizer sentido para a URL final e o conteudo publico. Tipos possiveis:

- `WebSite`
- `SoftwareApplication`
- `VideoGame`

Nao preencher campos que dependam de dados inexistentes, como rating, reviews, downloads ou preco de loja.

## 8. Design

### Direcao visual

A homepage deve parecer o site oficial de um produto proprio. Deve ser visualmente marcante sem ser pesada, moderna sem depender de modismos e madura sem parecer corporativa.

### Identidade

- Preservar o logo atual.
- Preservar a base cromatica azul/neutra do jogo.
- Usar amarelo e verde do logo como acentos moderados.
- Usar bandeiras reais como protagonistas.
- Nao transformar bandeiras em confete decorativo aleatorio.

### Layout

- Usar grids coerentes e responsivos.
- Manter alinhamentos consistentes.
- Evitar excesso de simetria repetitiva.
- Evitar excesso de cards.
- Nao colocar card dentro de card, salvo quando for mockup de interface justificado.
- Usar secoes abertas/faixas quando isso melhorar ritmo.

### Espacamento

- Usar escala baseada em 8 px.
- Garantir respiro entre secoes.
- Evitar blocos longos de texto.
- Limitar largura de leitura para textos corridos.

### Tipografia

- Manter tipografia legivel e consistente com o jogo.
- Nao usar fonte arredondada infantil.
- Nao usar fonte externa como dependencia obrigatoria.
- Evitar letter-spacing negativo.
- Nao escalar texto diretamente com viewport sem limites.

### Componentes reutilizaveis

Componentes devem ser simples, reutilizaveis e coerentes:

- botoes;
- links;
- badges;
- cards de modo;
- blocos de plataforma;
- acordeao de FAQ;
- paineis de mockup;
- blocos de metrica/progresso.

## 9. Motion

Toda animacao deve:

- Ter objetivo funcional.
- Ajudar orientacao, feedback ou continuidade.
- Respeitar `prefers-reduced-motion`.
- Evitar loops constantes.
- Evitar exageros.
- Nao prejudicar desempenho.
- Nao atrasar acesso ao CTA principal.
- Nao ser necessaria para compreender conteudo.

Animacoes permitidas:

- Entrada sutil por opacidade/translate.
- Hover/focus discreto.
- Feedback de copiar ou estado.
- Transicao leve de mockup.

Animacoes proibidas:

- Bandeiras voando ou decoracao em excesso.
- Parallax pesado.
- Scroll hijacking.
- Animacoes que causem nausea ou distração.
- Efeitos que carreguem muitos assets ao mesmo tempo.

## 10. Integracao

A homepage deve utilizar, sempre que possivel:

- Componentes reais do jogo.
- Identidade visual existente.
- Screenshots reais ou mockups fieis.
- Bandeiras reais de `assets/flags/`.
- Logo real de `assets/images/logo.png`.
- Textos e nomes alinhados aos idiomas/locales existentes.
- Recursos reais confirmados no codigo.

Nao criar representacoes falsas de:

- ranking online;
- login;
- sincronizacao;
- multiplayer;
- mapa mundial;
- modo infinito;
- lojas sem URL valida;
- estatisticas globais;
- depoimentos ou avaliacoes.

Se a homepage usar screenshots, eles devem representar telas reais ou estados fieis do jogo atual.

## 11. Plataformas

A homepage podera apresentar somente:

- Web.
- Android.
- Chrome.

Nao apresentar:

- iOS.
- Firefox.
- Edge.
- Steam.
- Aplicativos desktop.
- Ranking online.
- Multiplayer.
- Qualquer plataforma futura nao validada.

### URLs e constantes

Jamais inventar links.

Usar constantes claramente identificadas:

- `HOMEPAGE_WEB_PLAY_URL`
- `HOMEPAGE_GOOGLE_PLAY_URL`
- `HOMEPAGE_CHROME_WEB_STORE_URL`

### Regra de renderizacao

- Web deve ter destino valido antes de publicar.
- Google Play so deve renderizar CTA ativo se `HOMEPAGE_GOOGLE_PLAY_URL` tiver URL oficial valida.
- Chrome Web Store so deve renderizar CTA ativo se `HOMEPAGE_CHROME_WEB_STORE_URL` tiver URL oficial valida.
- Se uma URL de loja estiver ausente, nao exibir botao desabilitado para o usuario final.
- Estados internos como "URL ainda nao configurada" podem existir na documentacao ou ambiente de desenvolvimento, mas nao devem aparecer na homepage publica sem aprovacao explicita.

## 12. Conteudo

### Tom

O texto deve ser:

- natural;
- direto;
- elegante;
- confiante;
- educativo;
- acessivel;
- sem exagero publicitario.

### Proibido

Nao usar:

- "melhor jogo do mundo";
- "experiencia incrivel";
- "revolucionario";
- "imperdivel";
- promessas futuras;
- estatisticas inventadas;
- depoimentos ficticios;
- avaliacoes nao verificadas;
- numero de usuarios/downloads sem evidencia;
- linguagem infantilizada;
- linguagem fria demais ou excessivamente tecnica.

### Regras de clareza

- O Hero deve ser compreensivel em menos de cinco segundos.
- O CTA principal deve ser claro.
- Cada secao deve responder a uma pergunta real do visitante.
- FAQ deve resolver objecoes, nao repetir a pagina inteira.
- Textos internos de configuracao nao devem virar copy publica.
- Usar acentos na versao publica final.

## 13. Seguranca

Nenhuma implementacao podera:

- Remover funcionalidades existentes.
- Alterar logica do jogo sem necessidade.
- Modificar APIs existentes sem justificativa.
- Alterar comportamento das partidas.
- Alterar respostas, pontuacao, tempo, sequencia ou conquistas.
- Apagar dados locais do usuario.
- Reorganizar pastas sem autorizacao.
- Substituir `index.html` sem decisao explicita.
- Introduzir dependencias pesadas sem justificativa.
- Criar dependencia externa para funcionalidade essencial.
- Coletar dados pessoais.
- Adicionar tracking, analytics ou cookies sem decisao explicita e documentada.

Se uma alteracao tocar comportamento existente, ela deve ser tratada como risco alto e testada como regressao.

## 14. Criterios de revisao

Toda etapa implementada deve ser revisada quanto a:

- Funcionamento.
- Consistencia visual.
- Acessibilidade.
- Responsividade.
- Desempenho.
- Compatibilidade.
- SEO.
- Integracao com o jogo.
- Ausencia de promessas futuras.
- Ausencia de regressao.

### Checklist minimo por etapa

- A etapa cumpre apenas o escopo previsto?
- O jogo atual continua funcionando?
- O layout funciona em mobile?
- O foco de teclado esta visivel?
- A implementacao respeita `prefers-reduced-motion`?
- Nao ha links inventados?
- Nao ha recursos futuros anunciados?
- A performance nao piorou sem justificativa?
- O codigo novo esta isolado tanto quanto possivel?

## 15. Fluxo obrigatorio de implementacao

A homepage deve ser construida nesta ordem:

1. Infraestrutura.
2. Design tokens.
3. Layout base.
4. Cabecalho.
5. Hero.
6. Diferenciais.
7. Demonstracao do jogo.
8. Modos.
9. Estatisticas.
10. Conquistas.
11. Desafios.
12. Idiomas.
13. Plataformas.
14. FAQ.
15. CTA final.
16. Rodape.
17. Animacoes.
18. SEO.
19. Otimizacao.
20. Revisao final.

Cada etapa deve ser validada antes da proxima. A implementacao nao deve acumular muitas secoes sem revisao intermediaria.

## 16. Resolucao das pendencias identificadas

As quatro pendencias da revisao anterior sao obrigatorias em todas as implementacoes futuras.

### 16.1 Hero decisivo em menos de cinco segundos

O Hero deve comunicar imediatamente:

- que e o Flag Game;
- que e um jogo de bandeiras;
- que cobre 195 paises;
- que o visitante pode jogar agora.

Regras:

- CTA principal acima da dobra em mobile e desktop.
- Texto inicial curto.
- Mockup ou visual real do jogo no primeiro viewport.
- Nenhuma animacao deve ser necessaria para entender o Hero.
- A marca deve aparecer, mas nao pode obscurecer a proposta de valor.

### 16.2 Estrategia para Play Store e Chrome Web Store

Jamais inventar URLs.

Regras:

- Usar constantes oficiais de configuracao.
- Renderizar CTAs de loja apenas quando houver URL oficial valida.
- Nao mostrar botoes desabilitados na homepage publica.
- Nao usar frases publicas como "link ainda nao configurado" sem aprovacao explicita.
- Tratar ausencias de URL como assunto interno, nao como mensagem principal ao visitante.

### 16.3 Coexistencia entre homepage e jogo

Antes de implementar HTML/CSS/JS, definir a rota da homepage e o ponto de entrada do jogo.

Regra preferencial:

- Preservar `index.html` como entrada atual do jogo, salvo decisao explicita.
- Criar a homepage em rota/pagina separada quando isso reduzir risco.
- CTA "Jogar agora" deve apontar para o jogo existente.
- Extensao Chrome deve continuar abrindo o jogo, salvo decisao explicita e testada.
- Nenhuma URL atual deve ser quebrada sem redirecionamento/estrategia aprovada.

### 16.4 Evitar repeticao excessiva de cards e secoes semelhantes

A homepage deve ter ritmo visual e editorial.

Regras:

- Diferenciais devem ser escaneaveis e curtos.
- Demonstracao deve mostrar o jogo, nao repetir texto dos diferenciais.
- Modos devem explicar escolhas de jogo.
- Estatisticas e conquistas devem formar narrativa de evolucao.
- Cards devem ser usados apenas quando ajudam na escolha ou comparacao.
- Evitar grades semelhantes em sequencia.
- Remover secoes que nao respondam a uma pergunta real do visitante.

## 17. Estado oficial apos este documento

Com este documento criado, o planejamento da Homepage Oficial do Flag Game fica encerrado.

O projeto esta oficialmente pronto para iniciar a implementacao da homepage, desde que cada etapa futura respeite este contrato e comece pela definicao de infraestrutura/rota conforme o fluxo obrigatorio.
