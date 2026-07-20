# Flag Game Homepage Implementation Plan

## Principios da implementacao futura

- Implementar em etapas pequenas, com validacao ao final de cada uma.
- Nao quebrar a entrada atual do jogo.
- Nao substituir `index.html` sem decisao explicita.
- Nao anunciar ranking online, login, sincronizacao ou plataformas futuras como ativos.
- Nao inventar URLs de lojas.
- Reutilizar identidade, assets e padroes existentes.
- Nao tornar framework ou biblioteca uma premissa obrigatoria.

## Tarefa 1: Decidir rota e ponto de entrada

- Objetivo: definir onde a homepage vai viver sem afetar o jogo atual.
- Arquivos provaveis: novo HTML/rota de homepage, possivel ajuste de links, documentacao de configuracao.
- Dependencias: decisao de produto sobre manter `index.html` como jogo ou criar pagina separada.
- Risco de afetar o jogo existente: alto se `index.html` for substituido; baixo se a homepage for arquivo/rota separada.
- Testes necessarios: abrir jogo atual, iniciar modos, voltar ao menu, validar extensao Chrome se aplicavel.
- Criterios de conclusao: rota definida, CTA Web leva ao jogo, fluxo atual permanece intacto.

## Tarefa 2: Criar configuracao de plataformas

- Objetivo: centralizar URLs de Web, Google Play e Chrome Web Store.
- Arquivos provaveis: arquivo de configuracao JS/JSON ou atributos no HTML da homepage.
- Dependencias: URL Web final; URLs publicas das lojas quando existirem.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: ausencia de URLs nao gera link quebrado; URLs externas abrem com `rel="noopener"`.
- Criterios de conclusao: nenhuma URL inventada; botoes de loja tratam estado sem configuracao.

## Tarefa 3: Estruturar HTML sem estilos finais

- Objetivo: criar a estrutura semantica da homepage.
- Arquivos provaveis: HTML da homepage.
- Dependencias: rota definida.
- Risco de afetar o jogo existente: baixo se for pagina separada.
- Testes necessarios: validacao de headings, landmarks, links internos e foco por teclado.
- Criterios de conclusao: todas as secoes existem na ordem aprovada e conteudo basico renderiza.

## Tarefa 4: Aplicar base visual

- Objetivo: implementar paleta, tipografia, containers, botoes, cards e grid.
- Arquivos provaveis: CSS dedicado da homepage ou bloco CSS modular.
- Dependencias: estrutura HTML.
- Risco de afetar o jogo existente: medio se reutilizar CSS global; baixo se escopo for isolado.
- Testes necessarios: comparar jogo atual antes/depois, checar mobile/tablet/desktop.
- Criterios de conclusao: homepage parece oficial e nao altera telas do jogo.

## Tarefa 5: Hero e demonstracao visual

- Objetivo: criar primeiro viewport com marca, CTA e mockup baseado no jogo real.
- Arquivos provaveis: HTML/CSS da homepage; possivel lista limitada de bandeiras usadas no mockup.
- Dependencias: assets de logo e flags.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: desempenho inicial, imagens carregadas, layout em 320 px e desktop.
- Criterios de conclusao: hero comunica Flag Game, 195 paises e "Jogar agora" sem claims inventados.

## Tarefa 6: Modos de jogo e diferenciais

- Objetivo: apresentar modos confirmados e diferenciais rapidos.
- Arquivos provaveis: HTML/CSS da homepage.
- Dependencias: copy aprovada.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: CTAs apontam corretamente; textos nao prometem recursos futuros.
- Criterios de conclusao: modos por continente, mundo 10/20/50/195 e experiente estao claros.

## Tarefa 7: Progressao, estatisticas e conquistas

- Objetivo: mostrar progresso local e conquistas sem confundir com ranking online.
- Arquivos provaveis: HTML/CSS; JS opcional se usar dados reais locais.
- Dependencias: decisao sobre mockup estatico ou leitura real das APIs `FlagGameProfile`.
- Risco de afetar o jogo existente: medio se ler/escrever perfil; baixo se mockup estatico.
- Testes necessarios: perfil vazio, perfil com dados, localStorage indisponivel, acessibilidade de progresso.
- Criterios de conclusao: comunica progresso local; nao menciona sincronizacao como ativa.

## Tarefa 8: Desafios e compartilhamento

- Objetivo: explicar codigos de desafio e imagem de resultado.
- Arquivos provaveis: HTML/CSS; JS opcional para demo visual.
- Dependencias: copy e padrao visual de resultados.
- Risco de afetar o jogo existente: medio se integrar geracao real; baixo se apenas demonstrativo.
- Testes necessarios: codigo quebra bem em mobile; feedback de copiar se houver botao ativo; sem comparacao online.
- Criterios de conclusao: usuario entende que pode compartilhar codigo e imagem de resultado.

## Tarefa 9: Idiomas

- Objetivo: apresentar os 20 idiomas e, se decidido, integrar troca de idioma.
- Arquivos provaveis: HTML/CSS; possivel JS de i18n da homepage.
- Dependencias: estrategia de i18n da homepage.
- Risco de afetar o jogo existente: medio se reaproveitar `js/i18n.js` sem isolamento.
- Testes necessarios: portugues, ingles, arabe/RTL, textos longos, persistencia local se aplicavel.
- Criterios de conclusao: idiomas renderizam sem quebrar layout e refletem locales existentes.

## Tarefa 10: Plataformas

- Objetivo: renderizar Web, Google Play e Chrome Web Store com URLs configuraveis.
- Arquivos provaveis: HTML/CSS/JS de homepage; configuracao de URLs.
- Dependencias: Tarefa 2.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: URL ausente, URL presente, foco, links externos.
- Criterios de conclusao: somente as tres plataformas publicas aparecem; sem iOS/Firefox/Edge/Steam.

## Tarefa 11: FAQ e rodape

- Objetivo: responder duvidas reais e fechar com links institucionais discretos.
- Arquivos provaveis: HTML/CSS; JS pequeno para acordeao se necessario.
- Dependencias: copy aprovada.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: teclado no acordeao, leitores de tela, GitHub discreto no rodape.
- Criterios de conclusao: FAQ nao anuncia recursos futuros; rodape nao destaca autoria pessoal.

## Tarefa 12: SEO e Open Graph

- Objetivo: adicionar metadados corretos para busca e compartilhamento.
- Arquivos provaveis: HTML da homepage; possivel imagem OG.
- Dependencias: rota final, imagem OG aprovada.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: metatitulo, metadescricao, OG tags, imagem existente.
- Criterios de conclusao: metadados seguem especificacao e nao usam claims nao comprovados.

## Tarefa 13: Acessibilidade

- Objetivo: validar teclado, contraste, semantica e motion reduzido.
- Arquivos provaveis: HTML/CSS/JS da homepage.
- Dependencias: pagina completa.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: navegacao por teclado, foco visivel, contraste AA, `prefers-reduced-motion`, alt text, acordeoes.
- Criterios de conclusao: todos os fluxos essenciais funcionam sem mouse e com motion reduzido.

## Tarefa 14: Performance

- Objetivo: garantir carregamento leve e assets controlados.
- Arquivos provaveis: HTML/CSS/JS; possivel otimizacao de imagem OG/mockups.
- Dependencias: pagina completa.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: tamanho de assets iniciais, lazy loading, ausencia de dependencias desnecessarias, mobile.
- Criterios de conclusao: homepage carrega rapido e nao baixa todas as bandeiras acima da dobra.

## Tarefa 15: Regressao do jogo

- Objetivo: confirmar que a homepage nao alterou funcionalidades atuais.
- Arquivos provaveis: nenhum, apenas testes.
- Dependencias: implementacao completa.
- Risco de afetar o jogo existente: depende das tarefas anteriores.
- Testes necessarios:
  - Abrir jogo.
  - Jogar por continente.
  - Jogar mundo com 10 bandeiras.
  - Entrar no modo experiente.
  - Gerar/usar codigo de desafio.
  - Abrir perfil local.
  - Abrir conquistas.
  - Trocar idioma.
  - Verificar extensao Chrome se a rota do jogo mudar.
- Criterios de conclusao: nenhuma regressao detectada nas funcoes principais.

## Tarefa 16: Revisao de produto

- Objetivo: revisar copy, claims e plataformas antes de publicar.
- Arquivos provaveis: homepage e configuracao.
- Dependencias: implementacao validada.
- Risco de afetar o jogo existente: baixo.
- Testes necessarios: checklist contra a especificacao, busca por termos proibidos.
- Criterios de conclusao: homepage esta pronta para publicacao e nao anuncia nada indisponivel.
