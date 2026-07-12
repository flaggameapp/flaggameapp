# Flag Game Homepage Design System

## Direcao visual

A homepage deve preservar a identidade atual do Flag Game e elevar sua apresentacao para um site oficial de produto. O visual deve ser marcante, claro e leve: bandeiras como protagonistas, interface limpa, sensacao de jogo educativo maduro e nao infantil.

Evitar visual de dashboard corporativo, template generico, excesso de gradientes ou efeitos pesados. A expressividade deve vir do logo, das bandeiras reais, dos estados do jogo e de composicoes bem ritmadas.

## Identidade atual do jogo

Elementos confirmados no projeto:

- Logo em `assets/images/logo.png`, com globo, bandeira amarela e lettering branco/amarelo sobre contorno azul escuro.
- Paleta atual no CSS: azul principal, fundo claro, cards brancos, texto cinza escuro, bordas suaves.
- Componentes atuais: botoes principais/secundarios, cards, grids, bandeiras com borda/sombra, seletor de idioma, feedback de acerto/erro, conquistas e perfil local.
- Motion atual: entrada de telas, hover leve, feedback de resposta, toast de conquista e suporte a `prefers-reduced-motion`.

A homepage nao deve substituir essa identidade. Deve refiná-la para uma composicao institucional mais polida.

## Paleta sugerida

### Cores base do produto

- Primary: `#2563eb` - azul de acao atual.
- Primary hover: `#1d4ed8`.
- Primary soft: `#eff6ff`.
- Deep navy: `#061b3a` - inspirado no contorno/contraste do logo.
- Logo yellow: `#facc15` - acento vindo da bandeira/letras do logo.
- Globe green: `#84cc16` - uso pontual para aprendizado/progresso.

### Neutros

- Background: `#f4f7fb` ou `#f5f7fb`.
- Surface: `#ffffff`.
- Surface subtle: `#f8fafc`.
- Text: `#1f2937`.
- Text strong: `#111827`.
- Text muted: `#6b7280`.
- Border: `#e5e7eb`.
- Border strong: `#d1d5db`.

### Estados

- Success: `#16a34a`.
- Success soft: `#dcfce7`.
- Danger: `#dc2626`.
- Danger soft: `#fee2e2`.
- Warning text: `#92400e`.
- Warning soft: `#fef3c7`.

## Cor principal de acao

O CTA principal deve usar `#2563eb` com texto branco. Hover em `#1d4ed8`. Foco com outline azul translucido, seguindo o padrao atual:

- `outline: 3px solid rgba(37, 99, 235, .35)`
- `outline-offset: 3px`

O amarelo do logo deve ser acento visual, nao cor principal de botao, para manter legibilidade e consistencia.

## Uso cromatico das bandeiras

- Bandeiras devem ser protagonistas em mockups, mosaicos controlados e exemplos de partida.
- Usar bandeiras reais de `assets/flags/*.svg`.
- Nao usar bandeiras como confete aleatorio.
- Nao distorcer proporcoes.
- Evitar filtros que prejudiquem reconhecimento.
- Limitar a quantidade carregada acima da dobra.
- Bandeiras informativas devem ter alt; bandeiras puramente atmosfericas podem ser decorativas.

## Tipografia

O jogo usa `Arial, Helvetica, sans-serif`. A homepage pode continuar com essa pilha para consistencia e performance. Caso a implementacao futura escolha uma fonte adicional, ela deve ser local ou de baixo custo, sem virar dependencia obrigatoria.

Direcao:

- Titulos: peso 700/800, sem letter-spacing negativo.
- Corpo: peso 400/500, linhas de 1.5 a 1.7.
- UI: peso 700 em botoes e labels curtos.
- Evitar fonte arredondada infantil.

## Escala tipografica

Desktop:

- Hero H1: 48-64 px.
- H2: 32-42 px.
- H3: 22-26 px.
- Corpo grande: 18-20 px.
- Corpo: 16-17 px.
- Texto auxiliar: 14-15 px.

Tablet:

- Hero H1: 40-48 px.
- H2: 28-34 px.
- Corpo: 16-18 px.

Celular:

- Hero H1: 34-40 px.
- H2: 26-30 px.
- H3: 20-22 px.
- Corpo: 16 px.

Nao escalar fonte diretamente com `vw`. Usar `clamp()` apenas com limites conservadores quando necessario.

## Espacamentos

- Unidade base: 8 px.
- Espaco entre blocos pequenos: 12-16 px.
- Espaco entre componentes: 20-32 px.
- Padding de secao desktop: 72-104 px vertical.
- Padding de secao mobile: 48-64 px vertical.
- Padding lateral mobile: 20-24 px.

## Largura de containers

- Container principal: 1120-1200 px.
- Texto corrido: maximo 680-760 px.
- Mockups: maximo 520-680 px conforme secao.
- FAQ: maximo 820 px.

## Grid

- Desktop: grid de 12 colunas ou CSS grid por componente.
- Modos/plataformas: 3 colunas.
- Diferenciais/metricas: 4 colunas.
- Tablet: 2 colunas.
- Mobile: 1 coluna.

Grades devem usar `minmax(0, 1fr)` para evitar overflow.

## Bordas, raios e sombras

O projeto atual usa raios entre 10 e 24 px. Para a homepage:

- Botoes: 12 px.
- Inputs/codigos: 12 px.
- Cards compactos: 14-16 px.
- Mockups maiores: 18-20 px.
- Evitar raios exagerados ou pill em todos os elementos.

Sombras:

- Card leve: `0 8px 25px rgba(0, 0, 0, .06)`.
- Mockup/destaque: `0 16px 45px rgba(15, 23, 42, .12)`.
- Hover: aumentar sombra de forma sutil, sem parecer flutuacao pesada.

## Botoes

### Primario

- Fundo `#2563eb`.
- Texto branco.
- Peso 700.
- Altura minima 48 px.
- Hover `#1d4ed8`.
- Active com leve translateY/scale.
- Foco visivel sempre.

### Secundario

- Fundo branco.
- Texto `#374151` ou `#1f2937`.
- Borda `#d1d5db`.
- Hover com borda azul e/ou fundo `#eff6ff`.

### Plataforma

Usar estilo consistente, com icone ou simbolo reconhecivel quando disponivel. Nao imitar badges oficiais de loja se os assets oficiais nao forem fornecidos.

## Links

- Azul principal para links relevantes.
- Links de rodape podem ser neutros com hover azul.
- GitHub deve ser link secundario no rodape.
- Links externos devem indicar destino quando o contexto exigir.

## Cards

Cards devem ser usados para itens repetidos, plataformas, conquistas e mockups. Nao transformar toda secao em card flutuante. Secoes devem ser faixas ou layouts abertos.

Regras:

- Card nunca dentro de card, exceto mockup de interface quando visualmente necessario.
- Texto curto e escaneavel.
- Icone/bandeira + titulo + descricao + acao opcional.
- Altura estavel em grids.

## Badges

Uso recomendado:

- "195 paises"
- "Local-first"
- "20 idiomas"
- "Sem login obrigatorio"
- Pontos de conquistas

Badges devem ser pequenos, com fundo suave e contraste AA. Nao usar badge para todo texto.

## Icones

O projeto atual usa emojis em varios controles. A homepage pode usar:

- Icones simples via SVG inline ou biblioteca apenas se ja for adotada na implementacao futura.
- Emojis apenas pontualmente, sem depender deles para compreensao.
- Bandeiras reais devem substituir icones genericos quando o assunto for paises/modos.

## Mockups

Mockups devem derivar do jogo real:

- Bandeira com borda e sombra.
- Pergunta "De qual pais e esta bandeira?"
- Alternativas em grid.
- Placar/progresso.
- Resultado com percentual.
- Perfil/conquistas em miniaturas.

Nao criar telas que parecam recursos inexistentes. Nao mostrar ranking publico, login, mapa mundial ou multiplayer.

## Estados de interacao

- Hover: elevar 1-4 px, borda azul ou sombra leve.
- Active: reduzir levemente.
- Disabled/sem URL: opacidade moderada, texto claro e sem cursor de link.
- Loading: skeleton simples ou estado textual curto se necessario.
- Copiado/feedback: mensagem curta em verde com `aria-live`.

## Estados de foco

- Foco visivel obrigatorio em links, botoes, inputs, menu e acordeoes.
- Nunca remover outline sem substituto.
- Outline deve ter contraste suficiente sobre fundo branco e fundo colorido.

## Motion design

Motion deve ser funcional:

- Entrada de secao por `opacity` + `translateY(8-12px)`.
- Hover curto de 160-220 ms.
- Troca de mockup entre estados em 250-350 ms.
- Toast/feedback em 250 ms.

Evitar:

- Loops constantes.
- Bandeiras voando pela tela.
- Parallax pesado.
- Animacoes de scroll que travem leitura.
- Efeitos que dependam de muitos elementos simultaneos.

## `prefers-reduced-motion`

Obrigatorio:

- Reduzir animacoes para duracao quase zero ou desativar transicoes longas.
- Nao usar auto-scroll.
- Mockups animados devem virar estado estatico.
- Evitar contadores animados; mostrar valor final.

## Comportamento responsivo

- Mobile-first nos componentes.
- Nenhuma bandeira ou mockup pode causar overflow horizontal.
- Header deve evitar quebra desorganizada.
- CTAs devem ocupar largura confortavel em mobile.
- Textos longos de idiomas e FAQ devem quebrar sem sobrepor icones.
- Testar 320 px, 375 px, 768 px, 1024 px e desktop largo.

## Praticas proibidas

- Anunciar ranking online, login, sincronizacao, multiplayer, mapa mundial, modo infinito ou plataformas futuras como ativos.
- Inventar URLs, avaliacoes, downloads, depoimentos ou licencas.
- Usar bandeiras como decoracao aleatoria sem relacao com conteudo.
- Fazer visual infantilizado.
- Fazer visual de SaaS/dashboard corporativo.
- Criar hero com gradiente generico sem produto real.
- Usar GitHub como CTA principal.
- Destacar autoria pessoal nas secoes principais.
- Substituir a identidade atual sem decisao explicita.
- Exigir framework ou biblioteca como premissa.
- Carregar todas as bandeiras acima da dobra.
- Usar texto pequeno demais dentro de cards.
- Esconder foco de teclado.
