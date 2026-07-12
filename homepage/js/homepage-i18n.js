(function () {
  const STORAGE_KEY = "language";

  const SUPPORTED_LANGUAGES = [
    "pt-BR",
    "en",
    "es",
    "fr",
    "de",
    "it",
    "nl",
    "pl",
    "ru",
    "uk",
    "tr",
    "ar",
    "hi",
    "bn",
    "zh-CN",
    "ja",
    "ko",
    "id",
    "vi",
    "th"
  ];

  const DEFAULT_LANGUAGE = "en";

  const LANGUAGE_NAMES = {
    "pt-BR": "Português brasileiro",
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    nl: "Nederlands",
    pl: "Polski",
    ru: "Русский",
    uk: "Українська",
    tr: "Türkçe",
    ar: "العربية",
    hi: "हिन्दी",
    bn: "বাংলা",
    "zh-CN": "简体中文",
    ja: "日本語",
    ko: "한국어",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt",
    th: "ไทย"
  };

  const COPY = {
    "pt-BR": {
      title: "Flag Game - Aprenda as bandeiras dos 195 países",
      metaDescription: "Jogue Flag Game e aprenda as bandeiras dos 195 países por continente, no mundo inteiro ou no modo experiente. Acompanhe progresso, conquistas e desafios.",
      ogDescription: "Um jogo educativo de bandeiras com modos por continente, mundo inteiro, modo experiente, progresso local, conquistas e desafios compartilháveis.",
      twitterDescription: "Aprenda as bandeiras dos 195 países jogando no seu ritmo.",
      schemaWebsiteDescription: "Jogo educativo para aprender as bandeiras dos 195 países.",
      schemaGameDescription: "Jogo de bandeiras com modos por continente, mundo inteiro, modo experiente, progresso local, conquistas e desafios compartilháveis.",
      skip: "Pular para o conteúdo",
      menu: "Menu",
      languageLabel: "Idioma da homepage",
      languageAria: "Selecionar idioma da homepage",
      brandAria: "Flag Game - início",
      navAria: "Navegação principal",
      nav: ["Modos", "Progresso", "Desafios", "Idiomas", "Plataformas", "FAQ"],
      playNow: "Jogar agora",
      heroPrimary: "Conheça agora!",
      heroSecondary: "Ver modos",
      heroActionsAria: "Ações principais",
      hero: [
        "195 países. Uma jornada para dominar todas as bandeiras.",
        "Domine as bandeiras dos 195 países do mundo",
        "Explore continente por continente, enfrente desafios globais e acompanhe sua evolução enquanto aprende as bandeiras do mundo."
      ],
      factsAria: "Diferenciais principais",
      facts: ["195 bandeiras de países", "Progresso salvo localmente", "Desafios por código"],
      mockupAria: "Mockup de uma pergunta do Flag Game com bandeira, alternativas e progresso da partida",
      mockup: ["Modo mundo", "7 de 20", "De qual país é esta bandeira?", "Japão", "Coreia do Sul", "Bangladesh", "Indonésia"],
      featuresAria: "Diferenciais do Flag Game",
      featuresHead: ["Mais que um quiz comum", "Muito mais do que um quiz de bandeiras", "Aprenda no seu ritmo, acompanhe seu progresso e descubra novas formas de desafiar seus conhecimentos."],
      features: [
        ["195 países", "Base principal completa para partidas curtas ou desafios longos."],
        ["Modos por objetivo", "Pratique por continente, no mundo inteiro ou digitando respostas."],
        ["Progresso local", "Veja partidas, acertos, média, sequência e continentes concluídos."],
        ["Desafios por código", "Compartilhe a mesma sequência de bandeiras com outra pessoa."]
      ],
      demoAria: ["Exemplo visual de pergunta com alternativas", "Exemplo visual de resultado"],
      demoHead: ["Como a partida funciona", "Reconheça. Escolha. Evolua.", "Cada partida coloca uma bandeira diante de você. Acertar é apenas o começo: acompanhe sua evolução, melhore seu desempenho e continue explorando o mundo."],
      demo: ["Pergunta", "Pontuação 7/10", "Você reconhece esta bandeira?", "Brasil", "Colômbia", "Argentina", "Resultado", "Imagem de resultado", "Compartilhe sua pontuação sem expor dados pessoais."],
      modesHead: ["Formas de jogar", "Três maneiras de desafiar seus conhecimentos", "Escolha por onde começar: explore continentes, enfrente o desafio das 195 bandeiras ou teste seus conhecimentos no Modo Experiente."],
      modes: [
        ["Alternativas", "Por continente", "Aprenda uma região por vez e descubra as características de cada parte do planeta."],
        ["10, 20, 50 ou 195", "Mundo inteiro", "Misture todos os países em partidas rápidas ou enfrente o desafio completo das 195 bandeiras."],
        ["Digite o país", "Modo experiente", "Sem alternativas. Apenas você, a bandeira e o nome correto do país."]
      ],
      progressAria: ["Resumo dos dados de progresso local acompanhados pelo jogo", "Continentes acompanhados no perfil"],
      progressHead: ["Evolução local", "Cada partida deixa um rastro", "O progresso fica salvo neste dispositivo para que você acompanhe estatísticas, recordes e conquistas ao longo do tempo."],
      metrics: [["Partidas jogadas", "histórico local"], ["Total de acertos", "por resposta"], ["Melhor sequência", "por partida"], ["Modo favorito", "por uso"]],
      continents: ["América", "Europa", "África", "Ásia", "Oceania"],
      achievementsAria: "Exemplos de conquistas do jogo",
      achievementsHead: ["Metas", "Conquistas dão próximos objetivos"],
      achievements: [["Primeira vitória", "Conclua sua primeira partida."], ["100 acertos", "Some respostas corretas ao longo das partidas."], ["Todos os continentes", "Complete partidas em cada região disponível."], ["195 bandeiras", "Encare um desafio com a base completa."]],
      challengeHead: ["Compartilhamento", "Desafie alguém com a mesma sequência", "Gere um código para que outra pessoa jogue exatamente a mesma sequência de bandeiras e compare os resultados."],
      challenge: ["Código de exemplo", "Modo, quantidade e sequência preservados. Resultados e comparações são locais nesta versão."],
      languagesAria: "Idiomas suportados",
      languagesHead: ["Idiomas", "O mundo inteiro pode jogar", "O Flag Game já oferece suporte a 20 idiomas, com seleção automática e preferência salva localmente."],
      platformsHead: ["Plataformas", "Jogue onde preferir", "Jogue pela versão Web, aplicativo Android ou extensão para Chrome."],
      platforms: [
        ["Web", "Jogar no navegador", "Abra o Flag Game direto na Web e comece sem criar conta.", "Jogar agora"],
        ["Android", "Baixar na Google Play", "Use o Flag Game no Android pelo link oficial da loja.", "Baixar na Google Play"],
        ["Chrome", "Instalar pela Chrome Web Store", "Abra o jogo como extensão do Chrome pelo link oficial da loja.", "Instalar no Chrome"]
      ],
      faqHead: ["Perguntas frequentes", "Tudo o que você precisa saber"],
      faq: [
        ["Quantas bandeiras existem no Flag Game?", "O jogo reúne as bandeiras dos 195 países reconhecidos internacionalmente, permitindo desafios por continente ou em uma rodada completa com todos os países."],
        ["Preciso criar uma conta para jogar?", "Não. Você pode começar a jogar imediatamente, sem cadastro, login ou criação de conta."],
        ["Meu progresso fica salvo?", "Sim. Suas estatísticas, conquistas, recordes, sequência de acertos, modo favorito e demais informações do perfil são salvos automaticamente neste dispositivo."],
        ["O jogo funciona sem internet?", "Sim. As principais funcionalidades foram desenvolvidas para funcionar localmente após o carregamento dos arquivos do jogo, permitindo continuar jogando mesmo sem conexão em diversos cenários."],
        ["Quais modos de jogo estão disponíveis?", "Você pode jogar por continente, desafiar-se no modo Mundo Inteiro com partidas de 10, 20, 50 ou 195 bandeiras, ou testar seus conhecimentos no Modo Experiente, digitando o nome de cada país."],
        ["Existe ranking online?", "A versão atual não possui um ranking online público. Seu progresso e suas estatísticas são armazenados localmente neste dispositivo."]
      ],
      final: ["Comece agora", "Quantas das 195 bandeiras você reconhece hoje?", "Abra uma partida e veja seu progresso evoluir a cada rodada.", "Jogar Flag Game agora"],
      footerAria: "Links do rodapé",
      footer: ["Um jogo educativo para aprender as bandeiras dos 195 países.", "Jogar"]
    },
    en: {
      title: "Flag Game - Learn the flags of 195 countries",
      metaDescription: "Play Flag Game and learn the flags of 195 countries by continent, worldwide, or in expert mode. Track progress, achievements, and challenges.",
      ogDescription: "An educational flag game with continent modes, worldwide play, expert mode, local progress, achievements, and shareable challenges.",
      twitterDescription: "Learn the flags of 195 countries by playing at your own pace.",
      schemaWebsiteDescription: "Educational game for learning the flags of 195 countries.",
      schemaGameDescription: "Flag game with continent modes, worldwide play, expert mode, local progress, achievements, and shareable challenges.",
      skip: "Skip to content",
      menu: "Menu",
      languageLabel: "Homepage language",
      languageAria: "Select homepage language",
      brandAria: "Flag Game - home",
      navAria: "Main navigation",
      nav: ["Modes", "Progress", "Challenges", "Languages", "Platforms", "FAQ"],
      playNow: "Play now",
      heroPrimary: "Start now!",
      heroSecondary: "View modes",
      heroActionsAria: "Primary actions",
      hero: ["195 countries. One journey to master every flag.", "Master the flags of the world's 195 countries", "Explore continent by continent, take on global challenges, and track your progress while learning the flags of the world."],
      factsAria: "Main highlights",
      facts: ["195 country flags", "Progress saved locally", "Challenges by code"],
      mockupAria: "Mockup of a Flag Game question with a flag, answers, and match progress",
      mockup: ["World mode", "7 of 20", "Which country does this flag belong to?", "Japan", "South Korea", "Bangladesh", "Indonesia"],
      featuresAria: "Flag Game highlights",
      featuresHead: ["More than a simple quiz", "Much more than a flag quiz", "Learn at your own pace, track your progress, and discover new ways to challenge your knowledge."],
      features: [["195 countries", "A complete main base for short games or long challenges."], ["Goal-based modes", "Practice by continent, worldwide, or by typing answers."], ["Local progress", "See games, correct answers, average, streak, and completed continents."], ["Code challenges", "Share the same flag sequence with someone else."]],
      demoAria: ["Visual example of a question with answers", "Visual example of a result"],
      demoHead: ["How a match works", "Recognize. Choose. Improve.", "Each match puts a flag in front of you. Getting it right is only the start: track your growth, improve your score, and keep exploring the world."],
      demo: ["Question", "Score 7/10", "Do you recognize this flag?", "Brazil", "Colombia", "Argentina", "Result", "Result image", "Share your score without exposing personal data."],
      modesHead: ["Ways to play", "Three ways to challenge your knowledge", "Choose where to begin: explore continents, face the 195-flag challenge, or test yourself in Expert Mode."],
      modes: [["Multiple choice", "By continent", "Learn one region at a time and discover the traits of each part of the planet."], ["10, 20, 50 or 195", "Worldwide", "Mix all countries in quick matches or face the full 195-flag challenge."], ["Type the country", "Expert mode", "No choices. Just you, the flag, and the correct country name."]],
      progressAria: ["Summary of local progress data tracked by the game", "Continents tracked in the profile"],
      progressHead: ["Local growth", "Every match leaves a trace", "Progress is saved on this device so you can follow stats, records, and achievements over time."],
      metrics: [["Games played", "local history"], ["Total correct", "per answer"], ["Best streak", "per match"], ["Favorite mode", "by usage"]],
      continents: ["America", "Europe", "Africa", "Asia", "Oceania"],
      achievementsAria: "Examples of game achievements",
      achievementsHead: ["Goals", "Achievements give you next targets"],
      achievements: [["First victory", "Complete your first match."], ["100 correct", "Add up correct answers across matches."], ["All continents", "Complete matches in every available region."], ["195 flags", "Take on a challenge with the full base."]],
      challengeHead: ["Sharing", "Challenge someone with the same sequence", "Generate a code so another person can play exactly the same flag sequence and compare results."],
      challenge: ["Example code", "Mode, amount, and sequence preserved. Results and comparisons are local in this version."],
      languagesAria: "Supported languages",
      languagesHead: ["Languages", "The whole world can play", "Flag Game already supports 20 languages, with automatic selection and a locally saved preference."],
      platformsHead: ["Platforms", "Play where you prefer", "Play on the Web, Android app, or Chrome extension."],
      platforms: [["Web", "Play in the browser", "Open Flag Game directly on the Web and start without creating an account.", "Play now"], ["Android", "Get it on Google Play", "Use Flag Game on Android through the official store link.", "Get it on Google Play"], ["Chrome", "Install from the Chrome Web Store", "Open the game as a Chrome extension through the official store link.", "Install on Chrome"]],
      faqHead: ["Frequently asked questions", "Everything you need to know"],
      faq: [["How many flags are in Flag Game?", "The game brings together the flags of 195 internationally recognized countries, with continent challenges or a complete round with all countries."], ["Do I need to create an account?", "No. You can start playing immediately, without registration, login, or account creation."], ["Is my progress saved?", "Yes. Your stats, achievements, records, streak, favorite mode, and other profile information are saved automatically on this device."], ["Does the game work without internet?", "Yes. The main features were built to work locally after the game files load, so you can keep playing without a connection in many situations."], ["Which game modes are available?", "You can play by continent, challenge yourself in Worldwide mode with 10, 20, 50, or 195 flags, or test your knowledge in Expert Mode by typing each country name."], ["Is there an online ranking?", "The current version does not have a public online ranking. Your progress and stats are stored locally on this device."]],
      final: ["Start now", "How many of the 195 flags do you recognize today?", "Open a match and watch your progress improve round by round.", "Play Flag Game now"],
      footerAria: "Footer links",
      footer: ["An educational game for learning the flags of 195 countries.", "Play"]
    }
  };

  const EXTRA_COPY = {
    es: {
      title: "Flag Game - Aprende las banderas de 195 países",
      metaDescription: "Juega Flag Game y aprende las banderas de 195 países por continente, en todo el mundo o en modo experto. Sigue tu progreso, logros y desafíos.",
      twitterDescription: "Aprende las banderas de 195 países jugando a tu ritmo.",
      skip: "Saltar al contenido",
      menu: "Menú",
      languageLabel: "Idioma de la página",
      languageAria: "Seleccionar idioma de la página",
      brandAria: "Flag Game - inicio",
      navAria: "Navegación principal",
      nav: ["Modos", "Progreso", "Desafíos", "Idiomas", "Plataformas", "FAQ"],
      playNow: "Jugar ahora",
      heroPrimary: "¡Empieza ahora!",
      heroSecondary: "Ver modos",
      heroActionsAria: "Acciones principales",
      hero: ["195 países. Un viaje para dominar todas las banderas.", "Domina las banderas de los 195 países del mundo", "Explora continente por continente, acepta desafíos globales y sigue tu evolución mientras aprendes las banderas del mundo."],
      factsAria: "Diferenciales principales",
      facts: ["195 banderas de países", "Progreso guardado localmente", "Desafíos por código"],
      mockupAria: "Maqueta de una pregunta de Flag Game con bandera, opciones y progreso",
      mockup: ["Modo mundo", "7 de 20", "¿De qué país es esta bandera?", "Japón", "Corea del Sur", "Bangladés", "Indonesia"],
      featuresHead: ["Más que un quiz común", "Mucho más que un quiz de banderas", "Aprende a tu ritmo, sigue tu progreso y descubre nuevas formas de desafiar tus conocimientos."],
      features: [["195 países", "Base principal completa para partidas cortas o desafíos largos."], ["Modos por objetivo", "Practica por continente, en todo el mundo o escribiendo respuestas."], ["Progreso local", "Ve partidas, aciertos, promedio, racha y continentes completados."], ["Desafíos por código", "Comparte la misma secuencia de banderas con otra persona."]],
      demoHead: ["Cómo funciona la partida", "Reconoce. Elige. Evoluciona.", "Cada partida pone una bandera frente a ti. Acertar es solo el comienzo: sigue tu evolución, mejora tu rendimiento y sigue explorando el mundo."],
      demo: ["Pregunta", "Puntuación 7/10", "¿Reconoces esta bandera?", "Brasil", "Colombia", "Argentina", "Resultado", "Imagen de resultado", "Comparte tu puntuación sin exponer datos personales."],
      modesHead: ["Formas de jugar", "Tres maneras de desafiar tus conocimientos", "Elige por dónde empezar: explora continentes, enfrenta el desafío de las 195 banderas o prueba el Modo Experto."],
      modes: [["Alternativas", "Por continente", "Aprende una región por vez y descubre las características de cada parte del planeta."], ["10, 20, 50 o 195", "Mundo entero", "Mezcla todos los países en partidas rápidas o enfrenta el desafío completo de 195 banderas."], ["Escribe el país", "Modo experto", "Sin alternativas. Solo tú, la bandera y el nombre correcto del país."]],
      progressHead: ["Evolución local", "Cada partida deja una huella", "El progreso se guarda en este dispositivo para que sigas estadísticas, récords y logros con el tiempo."],
      metrics: [["Partidas jugadas", "historial local"], ["Total de aciertos", "por respuesta"], ["Mejor racha", "por partida"], ["Modo favorito", "por uso"]],
      continents: ["América", "Europa", "África", "Asia", "Oceanía"],
      achievementsHead: ["Metas", "Los logros dan nuevos objetivos"],
      achievements: [["Primera victoria", "Completa tu primera partida."], ["100 aciertos", "Suma respuestas correctas a lo largo de las partidas."], ["Todos los continentes", "Completa partidas en cada región disponible."], ["195 banderas", "Enfrenta un desafío con la base completa."]],
      challengeHead: ["Compartir", "Desafía a alguien con la misma secuencia", "Genera un código para que otra persona juegue exactamente la misma secuencia de banderas y compare resultados."],
      challenge: ["Código de ejemplo", "Modo, cantidad y secuencia preservados. Resultados y comparaciones son locales en esta versión."],
      languagesHead: ["Idiomas", "Todo el mundo puede jugar", "Flag Game ya admite 20 idiomas, con selección automática y preferencia guardada localmente."],
      platformsHead: ["Plataformas", "Juega donde prefieras", "Juega en la versión Web, la app Android o la extensión de Chrome."],
      platforms: [["Web", "Jugar en el navegador", "Abre Flag Game directamente en la Web y empieza sin crear cuenta.", "Jugar ahora"], ["Android", "Descargar en Google Play", "Usa Flag Game en Android mediante el enlace oficial de la tienda.", "Descargar en Google Play"], ["Chrome", "Instalar desde Chrome Web Store", "Abre el juego como extensión de Chrome mediante el enlace oficial.", "Instalar en Chrome"]],
      faqHead: ["Preguntas frecuentes", "Todo lo que necesitas saber"],
      faq: [["¿Cuántas banderas hay en Flag Game?", "El juego reúne las banderas de 195 países reconocidos internacionalmente, con desafíos por continente o una ronda completa con todos los países."], ["¿Necesito crear una cuenta?", "No. Puedes empezar a jugar inmediatamente, sin registro, inicio de sesión ni cuenta."], ["¿Mi progreso queda guardado?", "Sí. Tus estadísticas, logros, récords, racha, modo favorito y demás información del perfil se guardan automáticamente en este dispositivo."], ["¿El juego funciona sin internet?", "Sí. Las funciones principales fueron desarrolladas para funcionar localmente después de cargar los archivos del juego."], ["¿Qué modos están disponibles?", "Puedes jugar por continente, en Mundo Entero con 10, 20, 50 o 195 banderas, o en Modo Experto escribiendo el nombre de cada país."], ["¿Existe ranking online?", "La versión actual no tiene ranking online público. Tu progreso y estadísticas se almacenan localmente en este dispositivo."]],
      final: ["Empieza ahora", "¿Cuántas de las 195 banderas reconoces hoy?", "Abre una partida y mira cómo evoluciona tu progreso ronda a ronda.", "Jugar Flag Game ahora"],
      footer: ["Un juego educativo para aprender las banderas de 195 países.", "Jugar"]
    },
    fr: {
      title: "Flag Game - Apprenez les drapeaux de 195 pays",
      metaDescription: "Jouez à Flag Game et apprenez les drapeaux de 195 pays par continent, dans le monde entier ou en mode expert. Suivez vos progrès, succès et défis.",
      twitterDescription: "Apprenez les drapeaux de 195 pays en jouant à votre rythme.",
      skip: "Aller au contenu",
      menu: "Menu",
      languageLabel: "Langue de la page",
      languageAria: "Sélectionner la langue de la page",
      brandAria: "Flag Game - accueil",
      navAria: "Navigation principale",
      nav: ["Modes", "Progression", "Défis", "Langues", "Plateformes", "FAQ"],
      playNow: "Jouer maintenant",
      heroPrimary: "Commencer maintenant !",
      heroSecondary: "Voir les modes",
      heroActionsAria: "Actions principales",
      hero: ["195 pays. Un parcours pour maîtriser tous les drapeaux.", "Maîtrisez les drapeaux des 195 pays du monde", "Explorez continent par continent, relevez des défis mondiaux et suivez votre progression en apprenant les drapeaux du monde."],
      factsAria: "Points forts principaux",
      facts: ["195 drapeaux de pays", "Progression enregistrée localement", "Défis par code"],
      mockupAria: "Maquette d'une question Flag Game avec drapeau, réponses et progression",
      mockup: ["Mode monde", "7 sur 20", "À quel pays appartient ce drapeau ?", "Japon", "Corée du Sud", "Bangladesh", "Indonésie"],
      featuresHead: ["Plus qu'un simple quiz", "Bien plus qu'un quiz de drapeaux", "Apprenez à votre rythme, suivez vos progrès et découvrez de nouvelles façons de tester vos connaissances."],
      features: [["195 pays", "Une base principale complète pour des parties courtes ou de longs défis."], ["Modes par objectif", "Entraînez-vous par continent, dans le monde entier ou en saisissant les réponses."], ["Progression locale", "Consultez parties, bonnes réponses, moyenne, série et continents terminés."], ["Défis par code", "Partagez la même séquence de drapeaux avec quelqu'un."]],
      demoHead: ["Comment fonctionne une partie", "Reconnaître. Choisir. Progresser.", "Chaque partie place un drapeau devant vous. Répondre juste n'est que le début : suivez votre évolution, améliorez vos résultats et continuez à explorer le monde."],
      demo: ["Question", "Score 7/10", "Reconnaissez-vous ce drapeau ?", "Brésil", "Colombie", "Argentine", "Résultat", "Image du résultat", "Partagez votre score sans exposer de données personnelles."],
      modesHead: ["Façons de jouer", "Trois manières de défier vos connaissances", "Choisissez par où commencer : explorez les continents, relevez le défi des 195 drapeaux ou testez le Mode Expert."],
      modes: [["Choix multiples", "Par continent", "Apprenez une région à la fois et découvrez les particularités de chaque partie de la planète."], ["10, 20, 50 ou 195", "Monde entier", "Mélangez tous les pays dans des parties rapides ou relevez le défi complet des 195 drapeaux."], ["Saisir le pays", "Mode expert", "Aucun choix. Seulement vous, le drapeau et le bon nom du pays."]],
      progressHead: ["Progression locale", "Chaque partie laisse une trace", "La progression est enregistrée sur cet appareil pour suivre statistiques, records et succès au fil du temps."],
      metrics: [["Parties jouées", "historique local"], ["Total de bonnes réponses", "par réponse"], ["Meilleure série", "par partie"], ["Mode favori", "par utilisation"]],
      continents: ["Amérique", "Europe", "Afrique", "Asie", "Océanie"],
      achievementsHead: ["Objectifs", "Les succès donnent de nouveaux buts"],
      achievements: [["Première victoire", "Terminez votre première partie."], ["100 bonnes réponses", "Cumulez des réponses correctes au fil des parties."], ["Tous les continents", "Terminez des parties dans chaque région disponible."], ["195 drapeaux", "Relevez un défi avec la base complète."]],
      challengeHead: ["Partage", "Défiez quelqu'un avec la même séquence", "Générez un code pour qu'une autre personne joue exactement la même séquence de drapeaux et compare les résultats."],
      challenge: ["Code d'exemple", "Mode, quantité et séquence conservés. Les résultats et comparaisons sont locaux dans cette version."],
      languagesHead: ["Langues", "Le monde entier peut jouer", "Flag Game prend déjà en charge 20 langues, avec sélection automatique et préférence enregistrée localement."],
      platformsHead: ["Plateformes", "Jouez où vous préférez", "Jouez sur le Web, l'application Android ou l'extension Chrome."],
      platforms: [["Web", "Jouer dans le navigateur", "Ouvrez Flag Game directement sur le Web et commencez sans créer de compte.", "Jouer maintenant"], ["Android", "Télécharger sur Google Play", "Utilisez Flag Game sur Android via le lien officiel de la boutique.", "Télécharger sur Google Play"], ["Chrome", "Installer depuis le Chrome Web Store", "Ouvrez le jeu comme extension Chrome via le lien officiel.", "Installer sur Chrome"]],
      faqHead: ["Questions fréquentes", "Tout ce qu'il faut savoir"],
      faq: [["Combien de drapeaux y a-t-il dans Flag Game ?", "Le jeu rassemble les drapeaux de 195 pays reconnus internationalement, avec des défis par continent ou une partie complète."], ["Dois-je créer un compte ?", "Non. Vous pouvez commencer immédiatement, sans inscription, connexion ni création de compte."], ["Ma progression est-elle enregistrée ?", "Oui. Vos statistiques, succès, records, série, mode favori et autres informations de profil sont enregistrés automatiquement sur cet appareil."], ["Le jeu fonctionne-t-il sans internet ?", "Oui. Les fonctions principales sont conçues pour fonctionner localement après le chargement des fichiers du jeu."], ["Quels modes sont disponibles ?", "Vous pouvez jouer par continent, en Monde entier avec 10, 20, 50 ou 195 drapeaux, ou en Mode Expert en saisissant le nom de chaque pays."], ["Existe-t-il un classement en ligne ?", "La version actuelle n'a pas de classement en ligne public. Votre progression et vos statistiques sont stockées localement sur cet appareil."]],
      final: ["Commencez maintenant", "Combien des 195 drapeaux reconnaissez-vous aujourd'hui ?", "Ouvrez une partie et regardez votre progression évoluer manche après manche.", "Jouer à Flag Game maintenant"],
      footer: ["Un jeu éducatif pour apprendre les drapeaux de 195 pays.", "Jouer"]
    }
  };

  const SHORT_LOCALE_OVERRIDES = {
    de: ["Flag Game - Lerne die Flaggen von 195 Ländern", "Zur Hauptseite", "Hauptnavigation", "Jetzt spielen", "195 Länder. Eine Reise, um alle Flaggen zu meistern.", "Beherrsche die Flaggen der 195 Länder der Welt", "Erkunde Kontinent für Kontinent, nimm globale Herausforderungen an und verfolge deinen Fortschritt.", "Mehr als ein einfaches Quiz", "Viel mehr als ein Flaggenquiz", "Spielformen", "Drei Möglichkeiten, dein Wissen zu testen", "Lokaler Fortschritt", "Jedes Spiel hinterlässt eine Spur", "Teilen", "Fordere jemanden mit derselben Reihenfolge heraus", "Sprachen", "Die ganze Welt kann spielen", "Plattformen", "Spiele, wo du möchtest", "Häufige Fragen", "Alles, was du wissen musst", "Jetzt starten", "Wie viele der 195 Flaggen erkennst du heute?", "Ein Lernspiel zum Erlernen der Flaggen von 195 Ländern."],
    it: ["Flag Game - Impara le bandiere di 195 paesi", "Vai al contenuto", "Navigazione principale", "Gioca ora", "195 paesi. Un viaggio per padroneggiare tutte le bandiere.", "Domina le bandiere dei 195 paesi del mondo", "Esplora continente dopo continente, affronta sfide globali e segui i tuoi progressi.", "Più di un semplice quiz", "Molto più di un quiz sulle bandiere", "Modi di giocare", "Tre modi per sfidare le tue conoscenze", "Progressi locali", "Ogni partita lascia una traccia", "Condivisione", "Sfida qualcuno con la stessa sequenza", "Lingue", "Tutto il mondo può giocare", "Piattaforme", "Gioca dove preferisci", "Domande frequenti", "Tutto ciò che devi sapere", "Inizia ora", "Quante delle 195 bandiere riconosci oggi?", "Un gioco educativo per imparare le bandiere di 195 paesi."],
    nl: ["Flag Game - Leer de vlaggen van 195 landen", "Naar inhoud", "Hoofdnavigatie", "Nu spelen", "195 landen. Een reis om alle vlaggen te beheersen.", "Beheers de vlaggen van de 195 landen ter wereld", "Verken continent voor continent, ga wereldwijde uitdagingen aan en volg je voortgang.", "Meer dan een gewone quiz", "Veel meer dan een vlaggenquiz", "Manieren om te spelen", "Drie manieren om je kennis te testen", "Lokale voortgang", "Elke wedstrijd laat een spoor achter", "Delen", "Daag iemand uit met dezelfde reeks", "Talen", "De hele wereld kan spelen", "Platformen", "Speel waar je wilt", "Veelgestelde vragen", "Alles wat je moet weten", "Begin nu", "Hoeveel van de 195 vlaggen herken je vandaag?", "Een educatief spel om de vlaggen van 195 landen te leren."],
    pl: ["Flag Game - Naucz się flag 195 krajów", "Przejdź do treści", "Główna nawigacja", "Graj teraz", "195 krajów. Podróż do opanowania wszystkich flag.", "Opanuj flagi 195 krajów świata", "Odkrywaj kontynent po kontynencie, podejmuj globalne wyzwania i śledź postępy.", "Więcej niż zwykły quiz", "Znacznie więcej niż quiz o flagach", "Sposoby gry", "Trzy sposoby sprawdzenia wiedzy", "Lokalny postęp", "Każda gra zostawia ślad", "Udostępnianie", "Rzuć komuś wyzwanie z tą samą sekwencją", "Języki", "Cały świat może grać", "Platformy", "Graj tam, gdzie chcesz", "FAQ", "Wszystko, co musisz wiedzieć", "Zacznij teraz", "Ile ze 195 flag rozpoznasz dziś?", "Gra edukacyjna do nauki flag 195 krajów."],
    ru: ["Flag Game - Учите флаги 195 стран", "Перейти к содержанию", "Основная навигация", "Играть сейчас", "195 стран. Путь к знанию всех флагов.", "Освойте флаги 195 стран мира", "Изучайте континенты, проходите глобальные испытания и отслеживайте прогресс.", "Больше, чем обычная викторина", "Гораздо больше, чем викторина о флагах", "Способы игры", "Три способа проверить знания", "Локальный прогресс", "Каждая игра оставляет след", "Поделиться", "Бросьте вызов с той же последовательностью", "Языки", "Играть может весь мир", "Платформы", "Играйте где удобно", "Вопросы и ответы", "Все, что нужно знать", "Начать сейчас", "Сколько из 195 флагов вы узнаете сегодня?", "Образовательная игра для изучения флагов 195 стран."],
    uk: ["Flag Game - Вивчайте прапори 195 країн", "Перейти до вмісту", "Основна навігація", "Грати зараз", "195 країн. Подорож до знання всіх прапорів.", "Опануйте прапори 195 країн світу", "Досліджуйте континенти, приймайте глобальні виклики та стежте за прогресом.", "Більше, ніж звичайна вікторина", "Набагато більше, ніж вікторина про прапори", "Способи гри", "Три способи перевірити знання", "Локальний прогрес", "Кожна гра залишає слід", "Поширення", "Киньте виклик з тією самою послідовністю", "Мови", "Увесь світ може грати", "Платформи", "Грайте де зручно", "FAQ", "Усе, що потрібно знати", "Почати зараз", "Скільки зі 195 прапорів ви впізнаєте сьогодні?", "Освітня гра для вивчення прапорів 195 країн."],
    tr: ["Flag Game - 195 ülkenin bayraklarını öğren", "İçeriğe geç", "Ana gezinme", "Şimdi oyna", "195 ülke. Tüm bayraklarda ustalaşma yolculuğu.", "Dünyanın 195 ülkesinin bayraklarında ustalaş", "Kıtaları keşfet, küresel meydan okumaları dene ve ilerlemeni takip et.", "Sıradan bir testten fazlası", "Bir bayrak testinden çok daha fazlası", "Oynama yolları", "Bilgini sınamanın üç yolu", "Yerel ilerleme", "Her oyun bir iz bırakır", "Paylaşım", "Aynı sıralamayla birine meydan oku", "Diller", "Tüm dünya oynayabilir", "Platformlar", "İstediğin yerde oyna", "SSS", "Bilmen gereken her şey", "Şimdi başla", "Bugün 195 bayraktan kaçını tanıyorsun?", "195 ülkenin bayraklarını öğrenmek için eğitici bir oyun."],
    ar: ["Flag Game - تعلّم أعلام 195 دولة", "انتقل إلى المحتوى", "التنقل الرئيسي", "العب الآن", "195 دولة. رحلة لإتقان كل الأعلام.", "أتقن أعلام 195 دولة في العالم", "استكشف القارات، واجه تحديات عالمية، وتابع تقدمك.", "أكثر من اختبار عادي", "أكثر بكثير من اختبار أعلام", "طرق اللعب", "ثلاث طرق لاختبار معرفتك", "تقدم محلي", "كل مباراة تترك أثرا", "مشاركة", "تحد شخصا بنفس التسلسل", "اللغات", "يمكن للعالم كله اللعب", "المنصات", "العب حيث تفضل", "الأسئلة الشائعة", "كل ما تحتاج إلى معرفته", "ابدأ الآن", "كم علما من أصل 195 تتعرف عليه اليوم؟", "لعبة تعليمية لتعلم أعلام 195 دولة."],
    hi: ["Flag Game - 195 देशों के झंडे सीखें", "सामग्री पर जाएं", "मुख्य नेविगेशन", "अभी खेलें", "195 देश। हर झंडे में महारत की यात्रा।", "दुनिया के 195 देशों के झंडों में महारत हासिल करें", "महाद्वीप दर महाद्वीप खोजें, वैश्विक चुनौतियां लें और अपनी प्रगति देखें।", "साधारण क्विज से अधिक", "झंडों के क्विज से कहीं अधिक", "खेलने के तरीके", "ज्ञान को चुनौती देने के तीन तरीके", "स्थानीय प्रगति", "हर खेल एक निशान छोड़ता है", "साझा करना", "उसी क्रम से किसी को चुनौती दें", "भाषाएं", "पूरी दुनिया खेल सकती है", "प्लेटफॉर्म", "जहां चाहें खेलें", "FAQ", "सब कुछ जो आपको जानना है", "अभी शुरू करें", "आज आप 195 में से कितने झंडे पहचानते हैं?", "195 देशों के झंडे सीखने का शैक्षिक खेल।"],
    bn: ["Flag Game - ১৯৫ দেশের পতাকা শিখুন", "বিষয়ে যান", "প্রধান নেভিগেশন", "এখন খেলুন", "১৯৫ দেশ। সব পতাকা আয়ত্ত করার যাত্রা।", "বিশ্বের ১৯৫ দেশের পতাকা আয়ত্ত করুন", "মহাদেশ ধরে অন্বেষণ করুন, বৈশ্বিক চ্যালেঞ্জ নিন এবং অগ্রগতি দেখুন।", "সাধারণ কুইজের চেয়ে বেশি", "পতাকার কুইজের অনেক বেশি", "খেলার উপায়", "জ্ঞান যাচাইয়ের তিন উপায়", "স্থানীয় অগ্রগতি", "প্রতি খেলা একটি চিহ্ন রাখে", "শেয়ারিং", "একই ক্রমে কাউকে চ্যালেঞ্জ করুন", "ভাষা", "সারা বিশ্ব খেলতে পারে", "প্ল্যাটফর্ম", "যেখানে চান খেলুন", "FAQ", "যা জানা দরকার", "এখন শুরু করুন", "আজ ১৯৫টির মধ্যে কত পতাকা চিনতে পারেন?", "১৯৫ দেশের পতাকা শেখার শিক্ষামূলক খেলা।"],
    "zh-CN": ["Flag Game - 学习195个国家的国旗", "跳到内容", "主导航", "立即游玩", "195个国家。一段掌握所有国旗的旅程。", "掌握世界195个国家的国旗", "按大洲探索，挑战全球模式，并跟踪你的进步。", "不只是普通测验", "远不止国旗测验", "玩法", "三种方式挑战你的知识", "本地进度", "每局都会留下记录", "分享", "用相同序列挑战别人", "语言", "全世界都可以玩", "平台", "在你喜欢的地方游玩", "常见问题", "你需要知道的一切", "立即开始", "今天你能认出195面国旗中的多少？", "学习195个国家国旗的教育游戏。"],
    ja: ["Flag Game - 195か国の国旗を学ぼう", "コンテンツへ移動", "メインナビゲーション", "今すぐ遊ぶ", "195か国。すべての国旗を覚える旅。", "世界195か国の国旗をマスターしよう", "大陸ごとに探索し、世界のチャレンジに挑み、進歩を確認できます。", "普通のクイズ以上", "国旗クイズ以上の体験", "遊び方", "知識を試す3つの方法", "ローカル進捗", "すべてのプレイが記録になる", "共有", "同じ順番で誰かに挑戦", "言語", "世界中で遊べます", "プラットフォーム", "好きな場所で遊ぶ", "FAQ", "知っておきたいこと", "今すぐ開始", "今日は195の国旗のうちいくつ分かりますか？", "195か国の国旗を学ぶ教育ゲーム。"],
    ko: ["Flag Game - 195개국 국기를 배워 보세요", "콘텐츠로 이동", "기본 탐색", "지금 플레이", "195개국. 모든 국기를 익히는 여정.", "세계 195개국의 국기를 익히세요", "대륙별로 탐험하고 전 세계 도전에 도전하며 진행 상황을 확인하세요.", "평범한 퀴즈 그 이상", "국기 퀴즈보다 더 많은 경험", "플레이 방식", "지식을 시험하는 세 가지 방법", "로컬 진행 상황", "모든 경기가 기록을 남깁니다", "공유", "같은 순서로 누군가에게 도전하세요", "언어", "전 세계가 플레이할 수 있습니다", "플랫폼", "원하는 곳에서 플레이", "FAQ", "알아야 할 모든 것", "지금 시작", "오늘 195개 국기 중 몇 개를 알아볼 수 있나요?", "195개국 국기를 배우는 교육용 게임입니다."],
    id: ["Flag Game - Pelajari bendera 195 negara", "Lewati ke konten", "Navigasi utama", "Main sekarang", "195 negara. Perjalanan untuk menguasai semua bendera.", "Kuasai bendera 195 negara di dunia", "Jelajahi benua demi benua, hadapi tantangan global, dan pantau kemajuanmu.", "Lebih dari kuis biasa", "Jauh lebih dari kuis bendera", "Cara bermain", "Tiga cara menantang pengetahuanmu", "Kemajuan lokal", "Setiap permainan meninggalkan jejak", "Berbagi", "Tantang seseorang dengan urutan yang sama", "Bahasa", "Seluruh dunia bisa bermain", "Platform", "Main di tempat yang kamu suka", "FAQ", "Semua yang perlu kamu tahu", "Mulai sekarang", "Berapa dari 195 bendera yang kamu kenali hari ini?", "Game edukasi untuk mempelajari bendera 195 negara."],
    vi: ["Flag Game - Học quốc kỳ của 195 quốc gia", "Chuyển đến nội dung", "Điều hướng chính", "Chơi ngay", "195 quốc gia. Hành trình làm chủ mọi lá cờ.", "Làm chủ quốc kỳ của 195 quốc gia trên thế giới", "Khám phá từng châu lục, nhận thử thách toàn cầu và theo dõi tiến bộ.", "Hơn một câu đố thông thường", "Hơn hẳn một trò đố quốc kỳ", "Cách chơi", "Ba cách thử thách kiến thức", "Tiến bộ cục bộ", "Mỗi ván chơi để lại dấu vết", "Chia sẻ", "Thách đấu ai đó với cùng chuỗi", "Ngôn ngữ", "Cả thế giới đều có thể chơi", "Nền tảng", "Chơi ở nơi bạn thích", "FAQ", "Mọi điều bạn cần biết", "Bắt đầu ngay", "Hôm nay bạn nhận ra bao nhiêu trong 195 lá cờ?", "Trò chơi giáo dục để học quốc kỳ của 195 quốc gia."],
    th: ["Flag Game - เรียนรู้ธงของ 195 ประเทศ", "ข้ามไปยังเนื้อหา", "การนำทางหลัก", "เล่นตอนนี้", "195 ประเทศ การเดินทางเพื่อจดจำธงทั้งหมด", "จดจำธงของ 195 ประเทศทั่วโลก", "สำรวจทีละทวีป รับความท้าทายระดับโลก และติดตามความก้าวหน้า", "มากกว่าแบบทดสอบทั่วไป", "มากกว่าเกมทายธง", "วิธีเล่น", "สามวิธีท้าทายความรู้", "ความก้าวหน้าในเครื่อง", "ทุกเกมทิ้งร่องรอยไว้", "การแชร์", "ท้าคนอื่นด้วยลำดับเดียวกัน", "ภาษา", "ทั้งโลกเล่นได้", "แพลตฟอร์ม", "เล่นในที่ที่คุณต้องการ", "FAQ", "ทุกสิ่งที่คุณต้องรู้", "เริ่มตอนนี้", "วันนี้คุณจำธงได้กี่ผืนจาก 195 ผืน?", "เกมการศึกษาเพื่อเรียนรู้ธงของ 195 ประเทศ"]
  };

  const SHORT_KEYS = [
    "title", "skip", "navAria", "playNow", "hero.0", "hero.1", "hero.2",
    "featuresHead.0", "featuresHead.1", "modesHead.0", "modesHead.1",
    "progressHead.0", "progressHead.1", "challengeHead.0", "challengeHead.1",
    "languagesHead.0", "languagesHead.1", "platformsHead.0", "platformsHead.1",
    "faqHead.0", "faqHead.1", "final.0", "final.1", "footer.0"
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function setPath(target, path, value) {
    const parts = path.split(".");
    let current = target;

    for (let index = 0; index < parts.length - 1; index += 1) {
      current = current[parts[index]];
    }

    current[parts[parts.length - 1]] = value;
  }

  Object.entries(EXTRA_COPY).forEach(([language, copy]) => {
    COPY[language] = {
      ...clone(COPY.en),
      ...copy,
      ogDescription: copy.ogDescription || COPY.en.ogDescription,
      schemaWebsiteDescription:
        copy.schemaWebsiteDescription || copy.metaDescription || COPY.en.schemaWebsiteDescription,
      schemaGameDescription:
        copy.schemaGameDescription || copy.metaDescription || COPY.en.schemaGameDescription
    };
  });

  Object.entries(SHORT_LOCALE_OVERRIDES).forEach(([language, values]) => {
    const copy = clone(COPY.en);

    SHORT_KEYS.forEach((key, index) => {
      setPath(copy, key, values[index]);
    });

    copy.metaDescription = values[0];
    copy.ogDescription = values[0];
    copy.twitterDescription = values[0];
    copy.schemaWebsiteDescription = values[23];
    copy.schemaGameDescription = values[0];
    copy.languageLabel = values[15];
    copy.languageAria = values[15];
    copy.nav = [values[9], values[11], values[13], values[15], values[17], values[19]];
    copy.heroPrimary = values[21];
    copy.heroSecondary = values[9];
    copy.heroActionsAria = values[3];
    copy.factsAria = values[7];
    copy.facts = [values[4], values[11], values[13]];
    copy.mockupAria = values[5];
    copy.mockup = [values[9], "7 / 20", values[5], "Japan", "South Korea", "Bangladesh", "Indonesia"];
    copy.featuresAria = values[7];
    copy.features = [
      [values[4], values[6]],
      [values[9], values[10]],
      [values[11], values[12]],
      [values[13], values[14]]
    ];
    copy.demoAria = [values[9], values[20]];
    copy.demoHead = [values[9], values[10], values[6]];
    copy.demo = [values[9], "7 / 10", values[5], "Brazil", "Colombia", "Argentina", values[20], values[20], values[12]];
    copy.modesHead = [values[9], values[10], values[6]];
    copy.modes = [
      [values[9], values[9], values[6]],
      ["10, 20, 50 / 195", values[5], values[4]],
      [values[10], values[10], values[5]]
    ];
    copy.progressAria = [values[11], values[12]];
    copy.progressHead = [values[11], values[12], values[12]];
    copy.metrics = [
      [values[9], values[12]],
      [values[10], values[12]],
      [values[11], values[12]],
      [values[17], values[12]]
    ];
    copy.continents = ["America", "Europe", "Africa", "Asia", "Oceania"];
    copy.achievementsAria = values[10];
    copy.achievementsHead = [values[21], values[10]];
    copy.achievements = [
      [values[21], values[12]],
      ["100", values[10]],
      [values[17], values[12]],
      ["195", values[4]]
    ];
    copy.challengeHead = [values[13], values[14], values[14]];
    copy.challenge = ["FG-W20-82K7P", values[14]];
    copy.languagesAria = values[15];
    copy.languagesHead = [values[15], values[16], values[16]];
    copy.platformsHead = [values[17], values[18], values[18]];
    copy.platforms = [
      ["Web", values[3], values[18], values[3]],
      ["Android", "Google Play", values[18], "Google Play"],
      ["Chrome", "Chrome Web Store", values[18], "Chrome"]
    ];
    copy.faqHead = [values[19], values[20]];
    copy.faq = [
      [values[5], values[4]],
      [values[20], values[3]],
      [values[11], values[12]],
      [values[17], values[18]],
      [values[9], values[10]],
      [values[19], values[12]]
    ];
    copy.final = [values[21], values[22], values[12], values[3]];
    copy.footerAria = values[19];
    COPY[language] = copy;
  });

  function normalizeLanguage(language) {
    if (!language) {
      return "";
    }

    if (SUPPORTED_LANGUAGES.includes(language)) {
      return language;
    }

    const shortLanguage = language.split("-")[0];

    if (shortLanguage === "pt") {
      return "pt-BR";
    }

    if (shortLanguage === "zh") {
      return "zh-CN";
    }

    return SUPPORTED_LANGUAGES.includes(shortLanguage) ? shortLanguage : "";
  }

  function getStoredLanguage() {
    if (
      window.FlagGameStorage &&
      typeof window.FlagGameStorage.getString === "function"
    ) {
      return normalizeLanguage(window.FlagGameStorage.getString(STORAGE_KEY, ""));
    }

    try {
      return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return "";
    }
  }

  function saveLanguage(language) {
    if (
      window.FlagGameStorage &&
      typeof window.FlagGameStorage.setString === "function"
    ) {
      window.FlagGameStorage.setString(STORAGE_KEY, language);
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // localStorage can be unavailable in restrictive contexts.
    }
  }

  function detectLanguage() {
    const storedLanguage = getStoredLanguage();

    if (storedLanguage) {
      return storedLanguage;
    }

    const browserLanguages =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    for (const language of browserLanguages) {
      const normalizedLanguage = normalizeLanguage(language);

      if (normalizedLanguage) {
        return normalizedLanguage;
      }
    }

    return DEFAULT_LANGUAGE;
  }

  function setText(selector, text) {
    const element = document.querySelector(selector);

    if (element) {
      element.textContent = text;
    }
  }

  function setTexts(selector, values) {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (values[index] !== undefined) {
        element.textContent = values[index];
      }
    });
  }

  function setAttr(selector, attr, value) {
    const element = document.querySelector(selector);

    if (element) {
      element.setAttribute(attr, value);
    }
  }

  function setMeta(selector, value) {
    const element = document.querySelector(selector);

    if (element) {
      element.setAttribute("content", value);
    }
  }

  function setPairedTexts(selector, values) {
    document.querySelectorAll(selector).forEach((element, index) => {
      const pair = values[index];

      if (!pair) {
        return;
      }

      const first = element.children[0];
      const second = element.children[1];

      if (first) {
        first.textContent = pair[0];
      }

      if (second) {
        second.textContent = pair[1];
      }
    });
  }

  function applyStructuredData(copy, language) {
    const schema = document.querySelector('script[type="application/ld+json"]');

    if (!schema) {
      return;
    }

    try {
      const data = JSON.parse(schema.textContent);

      if (data && Array.isArray(data["@graph"])) {
        data["@graph"].forEach(item => {
          item.inLanguage = language;

          if (item["@type"] === "WebSite") {
            item.description = copy.schemaWebsiteDescription;
          }

          if (item["@type"] === "VideoGame") {
            item.description = copy.schemaGameDescription;
          }
        });

        schema.textContent = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      // Keep the static schema if it cannot be parsed.
    }
  }

  function applyLanguage(language) {
    const copy = COPY[language] || COPY[DEFAULT_LANGUAGE];

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = copy.title;

    setMeta('meta[name="description"]', copy.metaDescription);
    setMeta('meta[property="og:title"]', copy.title);
    setMeta('meta[property="og:description"]', copy.ogDescription);
    setMeta('meta[name="twitter:title"]', copy.title);
    setMeta('meta[name="twitter:description"]', copy.twitterDescription);
    applyStructuredData(copy, language);

    setText(".skip-link", copy.skip);
    setText("[data-nav-toggle]", copy.menu);
    setText('label[for="homepage-language"]', copy.languageLabel);
    setAttr("#homepage-language", "aria-label", copy.languageAria);
    setAttr(".brand-link", "aria-label", copy.brandAria);
    setAttr(".site-nav", "aria-label", copy.navAria);
    setAttr(".hero-actions", "aria-label", copy.heroActionsAria);
    setAttr(".hero-facts", "aria-label", copy.factsAria);
    setAttr(".hero-mockup", "aria-label", copy.mockupAria);
    setAttr(".feature-strip", "aria-label", copy.featuresAria);
    setAttr(".question-card", "aria-label", copy.demoAria[0]);
    setAttr(".result-panel", "aria-label", copy.demoAria[1]);
    setAttr(".progress-panel", "aria-label", copy.progressAria[0]);
    setAttr(".continent-row", "aria-label", copy.progressAria[1]);
    setAttr(".achievement-list", "aria-label", copy.achievementsAria);
    setAttr(".language-list", "aria-label", copy.languagesAria);
    setAttr(".site-footer__nav", "aria-label", copy.footerAria);

    setTexts(".site-nav__list a", copy.nav);
    setText(".site-header__cta", copy.playNow);
    setTexts(".hero-copy > .hero-eyebrow, .hero-copy > h1, .hero-copy > .hero-lede", copy.hero);
    setTexts(".hero-actions .button", [copy.heroPrimary, copy.heroSecondary]);
    setTexts(".hero-facts li", copy.facts);
    setTexts(".hero-mockup .mockup-topline span, .hero-mockup .mockup-question, .hero-mockup .mockup-options span", copy.mockup);

    setTexts(".feature-section .section-heading__eyebrow, .feature-section .section-heading__title, .feature-section .section-heading__text", copy.featuresHead);
    setPairedTexts(".feature-strip li", copy.features);

    setTexts(".demo-section .section-heading__eyebrow, .demo-section .section-heading__title, .demo-section .section-heading__text", copy.demoHead);
    setTexts(".question-card .mockup-topline span, .question-card .mockup-question, .answer-list__item, .result-panel .badge, .result-panel strong, .result-panel p", copy.demo);

    setTexts(".modes-section .section-heading__eyebrow, .modes-section .section-heading__title, .modes-section .section-heading__text", copy.modesHead);
    document.querySelectorAll(".mode-card").forEach((card, index) => {
      const item = copy.modes[index];

      if (!item) {
        return;
      }

      setTextWithin(card, ".mode-card__tag", item[0]);
      setTextWithin(card, "h3", item[1]);
      setTextWithin(card, "p", item[2]);
    });

    setTexts(".progress-section .section-heading__eyebrow, .progress-section .section-heading__title, .progress-section .section-heading__text", copy.progressHead);
    setPairedTexts(".metric-list li", copy.metrics);
    setTexts(".continent-row span", copy.continents);

    setTexts(".achievements-section .section-heading__eyebrow, .achievements-section .section-heading__title", copy.achievementsHead);
    setPairedTexts(".achievement-list li", copy.achievements);

    setTexts(".challenge-section .section-heading__eyebrow, .challenge-section .section-heading__title, .challenge-section .section-heading__text", copy.challengeHead);
    setText(".challenge-code > span", copy.challenge[0]);
    setText(".challenge-code > p", copy.challenge[1]);

    setTexts(".languages-section .section-heading__eyebrow, .languages-section .section-heading__title, .languages-section .section-heading__text", copy.languagesHead);
    setTexts(".language-list li", SUPPORTED_LANGUAGES.map(code => LANGUAGE_NAMES[code]));

    setTexts(".platforms-section .section-heading__eyebrow, .platforms-section .section-heading__title, .platforms-section .section-heading__text", copy.platformsHead);
    document.querySelectorAll(".platform-card").forEach((card, index) => {
      const item = copy.platforms[index];

      if (!item) {
        return;
      }

      setTextWithin(card, ".platform-card__icon", item[0]);
      setTextWithin(card, "h3", item[1]);
      setTextWithin(card, "p", item[2]);
      setTextWithin(card, ".button", item[3]);
    });

    setTexts(".faq-section .section-heading__eyebrow, .faq-section .section-heading__title", copy.faqHead);
    document.querySelectorAll(".faq-list details").forEach((item, index) => {
      const faqItem = copy.faq[index];

      if (!faqItem) {
        return;
      }

      setTextWithin(item, "summary", faqItem[0]);
      setTextWithin(item, "p", faqItem[1]);
    });

    setTexts(".final-cta .section-heading__eyebrow, .final-cta .section-heading__title, .final-cta p:not(.section-heading__eyebrow), .final-cta .button", copy.final);
    setText(".site-footer__text", copy.footer[0]);
    setText('.site-footer__nav a[data-homepage-link="webGameUrl"]', copy.footer[1]);

    const select = document.querySelector("#homepage-language");

    if (select) {
      select.value = language;
    }
  }

  function setTextWithin(root, selector, value) {
    const element = root.querySelector(selector);

    if (element) {
      element.textContent = value;
    }
  }

  function initializeHomepageLanguage() {
    const initialLanguage = detectLanguage();
    const select = document.querySelector("#homepage-language");

    applyLanguage(initialLanguage);

    if (select) {
      select.addEventListener("change", event => {
        const selectedLanguage = normalizeLanguage(event.target.value) || DEFAULT_LANGUAGE;

        saveLanguage(selectedLanguage);
        applyLanguage(selectedLanguage);
      });
    }
  }

  window.FlagGameHomepageI18n = Object.freeze({
    applyLanguage,
    detectLanguage,
    languages: SUPPORTED_LANGUAGES
  });

  initializeHomepageLanguage();
})();
