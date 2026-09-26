/**
 * All translatable UI strings, in English and Spanish.
 *
 * The `Strings` type is derived from the English dictionary so the Spanish
 * dictionary must provide exactly the same keys (the compiler enforces this).
 * Program eligibility content (the 15 programs) is handled separately.
 */

const en = {
  // Language gate
  gate: {
    title: "Welcome",
    subtitle: "Choose your language to begin.",
    english: "English",
    spanish: "Español",
    continue: "Continue",
  },

  // Navigation
  nav: {
    home: "Home",
    programs: "All Programs",
    about: "About",
    sources: "Sources",
    language: "Language",
    goHome: "Go to home",
  },

  // Home / landing
  home: {
    badge: "For Washington families",
    titleLine1: "You are not alone in this.",
    titleLine2: "Let us help you find support.",
    subtitle:
      "Raising a neuro-divergent or special needs child is a journey, and Washington has more than 15 programs to help. Answer a few gentle, plain-language questions and get a personalized plan that shows what your family likely qualifies for and exactly how to start.",
    ctaPrimary: "Find programs for my child",
    ctaSecondary: "Browse all programs",
    statPrograms: "Programs",
    statTime: "To get started",
    statTimeValue: "2 min",
    statFree: "Free and private",
    privacy: "Your answers stay on your device. Nothing is saved or sent anywhere.",
    howTitle: "How it works",
    step1Title: "Answer a few questions",
    step1Body:
      "Tell us about your child's age, needs, and your family situation. Every question is explained in plain language with examples. It takes about 2 minutes.",
    step2Title: "Get matched",
    step2Body:
      "We check your answers against every program's real eligibility rules and show what your family likely qualifies for, with honest confidence levels.",
    step3Title: "Take action",
    step3Body:
      "Get a step-by-step plan in the order you should apply, with direct links, phone numbers, and the documents to gather.",
    reassureTitle: "We know this can feel overwhelming",
    reassureBody:
      "The system is confusing, and that is not your fault. What matters is that you do not have to figure it out alone. We explain every program in plain language, lead with real examples, and always point you to the official source so you can trust what you read.",
    reassureCta: "Start the 2 minute quiz",
  },

  // Quiz shared controls
  quiz: {
    stepOf: "Step",
    of: "of",
    optionalNote: "a few optional questions to sharpen your results",
    whyWeAsk: "Why we ask:",
    back: "Back",
    exit: "Exit",
    next: "Next",
    skip: "Skip",
    seeResults: "See My Results",
    chooseToContinue: "Please choose an answer to continue.",
    countyLabel: "Which county do you live in? (optional, helps us show local offices)",
    countySelect: "Select a county",
  },

  // Results
  results: {
    titlePrefix: "Your child may qualify for",
    titleSuffix: "programs",
    subtitle:
      "Here are the programs we recommend, listed in the order you should apply. Tap any program to see what it does and how to apply.",
    print: "Print or Save as PDF",
    retake: "Retake Quiz",
    startWith: "Start with #1",
    strongFirst: "This is a strong first step based on your answers.",
    matchesHelp: "Matches the help you asked for",
    alreadyEnrolled: "Already enrolled",
    notLikelyTitle: "Programs that are not likely a fit right now",
    browseAll: "Browse all 15 programs",
  },

  // Program detail
  detail: {
    backResults: "Back to Results",
    backPrograms: "Back to All Programs",
    whatItMeans: "What this means for you",
    whatYouGet: "What you get",
    howToApply: "How to apply",
    tips: "Tips for parents",
    takeAction: "Take action",
    learnOrApply: "Learn more or apply",
    call: "Call",
    localContact: "Your local contact",
    documents: "Documents to gather",
    unlocks: "Unlocks these programs",
    sources: "Official sources",
    readAloud: "Read aloud",
    stop: "Stop",
  },

  // Browse
  browse: {
    title: "All Washington State programs",
    subtitle:
      "These 15 programs span 5 state agencies and the federal government. Not sure which fit your family? Take the quiz for a personalized plan.",
    filterAll: "All",
    ctaText: "Not sure which programs are right for your family?",
    ctaButton: "Take the eligibility quiz",
  },

  // Categories
  category: {
    health: "Health",
    services: "Services",
    cash: "Cash",
    education: "Education",
    savings: "Savings",
    support: "Support",
  },

  // Confidence levels
  confidence: {
    likelyEligible: "Likely Eligible",
    mayQualify: "May Qualify - Check Eligibility",
    noBarriers: "No Eligibility Barriers",
    notLikely: "Not Likely a Fit",
  },

  // About page
  about: {
    title: "About WA Benefits Navigator",
    lead:
      "WA Benefits Navigator helps parents of neuro-divergent and special needs children in Washington State find the government programs their child qualifies for, in plain language, in minutes.",
    problemTitle: "The problem we set out to solve",
    problemBody:
      "Imagine you just learned your child has autism. Overnight, you are expected to understand more than 15 programs spread across 5 different state agencies and the federal government, each with its own rules, forms, and phone numbers. Most families spend months, and many miss out on help they qualify for simply because no one told them it existed.",
    approachTitle: "Our approach",
    approachBody:
      "We built two things we could not find anywhere else. First, a careful rules engine where every eligibility rule is traced to an official government source, so the guidance is honest and trustworthy. Second, plain-language explanations that always lead with a real example, so any parent can understand what a program does and why it might help.",
    privacyTitle: "Private by design",
    privacyBody:
      "Your answers never leave your device. There are no accounts, no tracking, and nothing is saved to a server. We believe families sharing sensitive information about their children deserve complete privacy.",
    roadmapTitle: "What is next",
    roadmapBody:
      "Today the app covers Washington State. The engine and program data were built to be portable, so the plan is to expand to all 50 states and to release a mobile app. County-level detail and more languages are on the way.",
    disclaimerTitle: "Important",
    builtFor: "Built for the Congressional App Challenge.",
  },

  // Sources & methodology page
  sources: {
    title: "Sources and Methodology",
    lead:
      "Trust matters most when families are making decisions about their children. Here is exactly how this app knows what it knows.",
    howTitle: "How we built the eligibility guidance",
    howBody:
      "For each of the 15 programs, we read the official rules directly from Washington State and federal government sources, including Washington Administrative Code, agency program pages, and federal regulations. We turned each rule into a clear, testable check, and we attached the official source to every one.",
    honestTitle: "Why we show honest confidence levels",
    honestBody:
      "Benefits eligibility is complex, and only the agency can make a final decision. So instead of promising approval, we show honest labels: Likely Eligible when the main rules clearly match, May Qualify when it depends on details we cannot fully determine, and No Eligibility Barriers for programs open to everyone.",
    engineTitle: "A rules engine, not a guess",
    engineBody:
      "The matching is not a simple if-then list and it is not an unpredictable AI. It is a scored, rule-based engine that weighs each program's real criteria against your answers, respects how programs depend on each other, and can always explain why it made a recommendation.",
    listTitle: "Primary sources by agency",
    verifyNote:
      "Program details and income limits change over time. We list the official source for every program on its detail page so you can always verify the latest information.",
    agencyHealth: "Health Care Authority (Apple Health / Medicaid)",
    agencyDshs: "DSHS (Developmental Disabilities Administration, cash assistance)",
    agencyDcyf: "Department of Children, Youth, and Families (early support, child care)",
    agencyOspi: "Office of Superintendent of Public Instruction (special education)",
    agencyDoh: "Department of Health (children with special health care needs)",
    agencySsa: "Social Security Administration (SSI)",
  },

  // Footer
  footer: {
    disclaimer:
      "This is general guidance. The agency that runs each program makes the final decision. Program details and income limits change over time, so please confirm with the agency before you apply.",
    meta:
      "WA Benefits Navigator. Built for the Congressional App Challenge. Information is drawn from official Washington State and federal government sources.",
  },
};

export type Strings = typeof en;

const es: Strings = {
  gate: {
    title: "Bienvenido",
    subtitle: "Elija su idioma para comenzar.",
    english: "English",
    spanish: "Español",
    continue: "Continuar",
  },

  nav: {
    home: "Inicio",
    programs: "Todos los programas",
    about: "Acerca de",
    sources: "Fuentes",
    language: "Idioma",
    goHome: "Ir al inicio",
  },

  home: {
    badge: "Para las familias de Washington",
    titleLine1: "No está solo en esto.",
    titleLine2: "Permítanos ayudarle a encontrar apoyo.",
    subtitle:
      "Criar a un hijo neurodivergente o con necesidades especiales es un camino difícil, y Washington tiene más de 15 programas para ayudar. Responda unas preguntas sencillas y reciba un plan personalizado que muestra a qué es probable que su familia califique y cómo empezar.",
    ctaPrimary: "Buscar programas para mi hijo",
    ctaSecondary: "Ver todos los programas",
    statPrograms: "Programas",
    statTime: "Para empezar",
    statTimeValue: "2 min",
    statFree: "Gratis y privado",
    privacy: "Sus respuestas se quedan en su dispositivo. Nada se guarda ni se envía a ningún lugar.",
    howTitle: "Cómo funciona",
    step1Title: "Responda unas preguntas",
    step1Body:
      "Cuéntenos la edad de su hijo, sus necesidades y la situación de su familia. Cada pregunta se explica en lenguaje sencillo con ejemplos. Toma unos 2 minutos.",
    step2Title: "Reciba coincidencias",
    step2Body:
      "Comparamos sus respuestas con las reglas reales de cada programa y le mostramos a qué es probable que su familia califique, con niveles de confianza honestos.",
    step3Title: "Tome acción",
    step3Body:
      "Reciba un plan paso a paso en el orden en que debe solicitar, con enlaces directos, números de teléfono y los documentos que debe reunir.",
    reassureTitle: "Sabemos que esto puede ser abrumador",
    reassureBody:
      "El sistema es confuso, y eso no es su culpa. Lo que importa es que no tiene que resolverlo solo. Explicamos cada programa en lenguaje sencillo, comenzamos con ejemplos reales y siempre le mostramos la fuente oficial para que pueda confiar en lo que lee.",
    reassureCta: "Comenzar el cuestionario de 2 minutos",
  },

  quiz: {
    stepOf: "Paso",
    of: "de",
    optionalNote: "unas preguntas opcionales para afinar sus resultados",
    whyWeAsk: "Por qué preguntamos:",
    back: "Atrás",
    exit: "Salir",
    next: "Siguiente",
    skip: "Omitir",
    seeResults: "Ver mis resultados",
    chooseToContinue: "Por favor elija una respuesta para continuar.",
    countyLabel: "¿En qué condado vive? (opcional, nos ayuda a mostrar oficinas locales)",
    countySelect: "Seleccione un condado",
  },

  results: {
    titlePrefix: "Su hijo puede calificar para",
    titleSuffix: "programas",
    subtitle:
      "Estos son los programas que recomendamos, en el orden en que debe solicitar. Toque cualquier programa para ver qué hace y cómo solicitar.",
    print: "Imprimir o guardar como PDF",
    retake: "Repetir el cuestionario",
    startWith: "Empiece con el #1",
    strongFirst: "Este es un buen primer paso según sus respuestas.",
    matchesHelp: "Coincide con la ayuda que pidió",
    alreadyEnrolled: "Ya inscrito",
    notLikelyTitle: "Programas que probablemente no encajan ahora",
    browseAll: "Ver los 15 programas",
  },

  detail: {
    backResults: "Volver a los resultados",
    backPrograms: "Volver a todos los programas",
    whatItMeans: "Qué significa esto para usted",
    whatYouGet: "Qué recibe",
    howToApply: "Cómo solicitar",
    tips: "Consejos para los padres",
    takeAction: "Tome acción",
    learnOrApply: "Más información o solicitar",
    call: "Llamar al",
    localContact: "Su contacto local",
    documents: "Documentos que debe reunir",
    unlocks: "Habilita estos programas",
    sources: "Fuentes oficiales",
    readAloud: "Leer en voz alta",
    stop: "Detener",
  },

  browse: {
    title: "Todos los programas del estado de Washington",
    subtitle:
      "Estos 15 programas abarcan 5 agencias estatales y el gobierno federal. ¿No sabe cuáles encajan con su familia? Haga el cuestionario para un plan personalizado.",
    filterAll: "Todos",
    ctaText: "¿No sabe qué programas son adecuados para su familia?",
    ctaButton: "Hacer el cuestionario de elegibilidad",
  },

  category: {
    health: "Salud",
    services: "Servicios",
    cash: "Dinero",
    education: "Educación",
    savings: "Ahorros",
    support: "Apoyo",
  },

  confidence: {
    likelyEligible: "Probablemente elegible",
    mayQualify: "Puede calificar - Verifique la elegibilidad",
    noBarriers: "Sin barreras de elegibilidad",
    notLikely: "Probablemente no encaja",
  },

  about: {
    title: "Acerca de WA Benefits Navigator",
    lead:
      "WA Benefits Navigator ayuda a los padres de niños neurodivergentes o con necesidades especiales en el estado de Washington a encontrar los programas del gobierno para los que su hijo califica, en lenguaje sencillo y en minutos.",
    problemTitle: "El problema que queríamos resolver",
    problemBody:
      "Imagine que acaba de enterarse de que su hijo tiene autismo. De un día para otro, se espera que entienda más de 15 programas repartidos en 5 agencias estatales y el gobierno federal, cada uno con sus propias reglas, formularios y números de teléfono. La mayoría de las familias pasan meses, y muchas pierden ayuda para la que califican solo porque nadie les dijo que existía.",
    approachTitle: "Nuestro enfoque",
    approachBody:
      "Creamos dos cosas que no encontramos en ningún otro lugar. Primero, un motor de reglas cuidadoso donde cada regla de elegibilidad se basa en una fuente oficial del gobierno, para que la guía sea honesta y confiable. Segundo, explicaciones en lenguaje sencillo que siempre comienzan con un ejemplo real, para que cualquier padre entienda qué hace un programa y por qué podría ayudar.",
    privacyTitle: "Privado por diseño",
    privacyBody:
      "Sus respuestas nunca salen de su dispositivo. No hay cuentas, no hay seguimiento y nada se guarda en un servidor. Creemos que las familias que comparten información sensible sobre sus hijos merecen privacidad total.",
    roadmapTitle: "Qué sigue",
    roadmapBody:
      "Hoy la aplicación cubre el estado de Washington. El motor y los datos de programas se crearon para ser portátiles, así que el plan es expandirse a los 50 estados y lanzar una aplicación móvil. Pronto habrá detalle a nivel de condado y más idiomas.",
    disclaimerTitle: "Importante",
    builtFor: "Creado para el Congressional App Challenge.",
  },

  sources: {
    title: "Fuentes y metodología",
    lead:
      "La confianza es lo más importante cuando las familias toman decisiones sobre sus hijos. Aquí está exactamente cómo esta aplicación sabe lo que sabe.",
    howTitle: "Cómo creamos la guía de elegibilidad",
    howBody:
      "Para cada uno de los 15 programas, leímos las reglas oficiales directamente de fuentes del gobierno del estado de Washington y federal, incluyendo el Código Administrativo de Washington, las páginas de programas de las agencias y las regulaciones federales. Convertimos cada regla en una verificación clara y comprobable, y a cada una le agregamos la fuente oficial.",
    honestTitle: "Por qué mostramos niveles de confianza honestos",
    honestBody:
      "La elegibilidad para beneficios es compleja, y solo la agencia puede tomar la decisión final. Por eso, en lugar de prometer aprobación, mostramos etiquetas honestas: Probablemente elegible cuando las reglas principales claramente coinciden, Puede calificar cuando depende de detalles que no podemos determinar por completo, y Sin barreras de elegibilidad para programas abiertos a todos.",
    engineTitle: "Un motor de reglas, no una adivinanza",
    engineBody:
      "La coincidencia no es una simple lista de si-entonces y no es una IA impredecible. Es un motor basado en reglas con puntuación que compara los criterios reales de cada programa con sus respuestas, respeta cómo dependen los programas entre sí y siempre puede explicar por qué hizo una recomendación.",
    listTitle: "Fuentes principales por agencia",
    verifyNote:
      "Los detalles de los programas y los límites de ingresos cambian con el tiempo. Mostramos la fuente oficial de cada programa en su página de detalle para que siempre pueda verificar la información más reciente.",
    agencyHealth: "Health Care Authority (Apple Health / Medicaid)",
    agencyDshs: "DSHS (Administración de Discapacidades del Desarrollo, asistencia en efectivo)",
    agencyDcyf: "Departamento de Niños, Jóvenes y Familias (apoyo temprano, cuidado infantil)",
    agencyOspi: "Oficina del Superintendente de Instrucción Pública (educación especial)",
    agencyDoh: "Departamento de Salud (niños con necesidades especiales de salud)",
    agencySsa: "Administración del Seguro Social (SSI)",
  },

  footer: {
    disclaimer:
      "Esta es una guía general. La agencia que administra cada programa toma la decisión final. Los detalles de los programas y los límites de ingresos cambian con el tiempo, así que confirme con la agencia antes de solicitar.",
    meta:
      "WA Benefits Navigator. Creado para el Congressional App Challenge. La información proviene de fuentes oficiales del gobierno del estado de Washington y federal.",
  },
};

export const STRINGS: Record<"en" | "es", Strings> = { en, es };
