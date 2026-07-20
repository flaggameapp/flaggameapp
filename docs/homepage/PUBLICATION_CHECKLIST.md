# Publication Checklist - Homepage Oficial do Flag Game

## Status

Checklist operacional para publicar a Homepage Oficial do Flag Game sem inventar URLs, métricas, plataformas ou recursos.

## Valores oficiais pendentes

- [ ] Domínio público final da homepage.
- [ ] URL canonical oficial, se aplicável.
- [ ] URL absoluta da imagem Open Graph, se aplicável.
- [ ] URL oficial da Google Play para `HOMEPAGE_GOOGLE_PLAY_URL`.
- [ ] URL oficial da Chrome Web Store para `HOMEPAGE_CHROME_WEB_STORE_URL`.
- [ ] URL oficial do GitHub, caso o link de rodapé deva aparecer.
- [ ] URL de sitemap, somente após domínio público definido.

## Imagem Open Graph

- [ ] Confirmar se `homepage/assets/logo-homepage.png` é suficiente temporariamente.
- [ ] Criar imagem social dedicada apenas se houver decisão de publicação.
- [ ] Garantir que a imagem social use identidade real do Flag Game.
- [ ] Garantir que a imagem social não sugira ranking, login, multiplayer, mapa mundial ou plataformas futuras.
- [ ] Usar URL absoluta da imagem somente após domínio oficial definido.

## Plataformas

### Web

- [ ] Confirmar que o CTA principal aponta para `game/`.
- [ ] Confirmar que `game/index.html` continua abrindo com assets e scripts corretos.
- [ ] Confirmar que a extensão Chrome continua abrindo `game/index.html`.

### Google Play

- [ ] Inserir URL oficial apenas quando publicada.
- [ ] Não renderizar CTA ativo sem URL oficial.
- [ ] Não exibir texto público de "link não configurado".

### Chrome Web Store

- [ ] Inserir URL oficial apenas quando publicada.
- [ ] Não renderizar CTA ativo sem URL oficial.
- [ ] Não exibir texto público de "link não configurado".

## SEO

- [ ] Validar title.
- [ ] Validar meta description.
- [ ] Inserir canonical somente quando a URL real estiver definida.
- [ ] Validar Open Graph.
- [ ] Validar Twitter Card.
- [ ] Validar Schema.org sem ratings, reviews, downloads ou preço inventado.
- [ ] Atualizar `robots.txt` com sitemap somente quando houver URL pública.
- [ ] Criar sitemap somente quando domínio público estiver definido.

## GitHub Pages

- [ ] Testar homepage na raiz.
- [ ] Testar jogo em `/game/`.
- [ ] Testar caminhos relativos de `homepage/`, `assets/`, `js/`, `css/` e `locales/`.
- [ ] Confirmar que refresh direto em `/game/` funciona.
- [ ] Confirmar que nenhuma rota de loja sem URL aparece.

## Testes manuais antes de publicar

- [ ] Homepage carrega sem erro de console.
- [ ] CTA "Jogar agora" abre o jogo.
- [ ] Menu móvel abre, fecha, aceita Escape e devolve foco.
- [ ] Navegação por Tab segue ordem lógica.
- [ ] Shift+Tab funciona.
- [ ] FAQ funciona com teclado.
- [ ] Links internos rolam para as seções corretas.
- [ ] Links sem URL oficial não aparecem como ações públicas.
- [ ] Layout sem overflow em 320 px, 375 px, 430 px e 768 px.
- [ ] Layout adequado em 1024 px, 1440 px e ultrawide.
- [ ] Zoom de 200% não bloqueia conteúdo essencial.
- [ ] Orientação paisagem em celular mantém CTA e conteúdo acessíveis.
- [ ] `prefers-reduced-motion: reduce` remove movimentos excessivos.
- [ ] Homepage continua legível sem JavaScript.
- [ ] Jogo continua funcional após entrada por `/game/`.
- [ ] Modos principais do jogo continuam abrindo.
- [ ] Perfil, conquistas, desafios e idiomas do jogo continuam preservados.

## Performance

- [ ] Medir Lighthouse quando houver navegador disponível.
- [ ] Registrar LCP, CLS e INP reais; não estimar.
- [ ] Confirmar que o logo do cabeçalho usa asset otimizado.
- [ ] Confirmar que imagens abaixo da dobra usam `loading="lazy"` e `decoding="async"` quando aplicável.
- [ ] Confirmar ausência de fontes externas obrigatórias.
- [ ] Confirmar ausência de dependências externas de animação.

## Analytics

- [ ] Não incluir analytics nesta publicação.
- [ ] Avaliar analytics apenas em decisão futura separada.
- [ ] Se analytics for decidido no futuro, documentar objetivo, ferramenta, consentimento e impacto de privacidade antes de implementar.

## Checklist pós-publicação

- [ ] Abrir URL pública em janela anônima.
- [ ] Verificar título e descrição em inspeção de página.
- [ ] Verificar preview social quando houver URL absoluta.
- [ ] Verificar indexação permitida por `robots.txt`.
- [ ] Verificar CTA Web.
- [ ] Verificar ausência de plataformas futuras.
- [ ] Verificar ausência de ranking/login/sincronização como recursos públicos.
- [ ] Verificar que GitHub aparece apenas se a URL oficial estiver configurada.
- [ ] Registrar métricas reais de Lighthouse/Core Web Vitals.
