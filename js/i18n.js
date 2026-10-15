// i18n.js — Complete Bilingual Content + Custom SVG Icon Registry (Zero Emojis)
const svgIcons = {
  // Tech & Services SVGs
  code: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  bot: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`,
  database: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,

  // Stack SVGs
  java: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`,
  js: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  nextjs: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  git: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>`,

  // Project & Interest SVGs
  cart: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  message: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  building: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  sprout: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>`,
  trending: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  book: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  music: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  grad: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  external: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>`
};

const translations = {
  es: {
    loader_text: 'Inicializando portafolio...',
    nav_about: 'Sobre mí',
    nav_services: 'Qué ofrezco',
    nav_skills: 'Stack',
    nav_projects: 'Proyectos',
    nav_education: 'Trayectoria',
    nav_contact: 'Contacto',

    hero_badge: 'Disponible para Prácticas y Proyectos · Floridablanca / Remoto',
    hero_tag: 'Desarrolladora de Software Junior',
    hero_roles: [
      'Desarrolladora Full Stack Junior',
      'Backend con Java (MVC + DAO) & Python',
      'Interfaces con Next.js & JavaScript',
      'Automatización e IA (n8n · YOLOv8 · FiftyOne)'
    ],
    hero_desc: 'Transformo necesidades reales en software bien estructurado, escalable y fácil de usar. Combino desarrollo Full Stack (Next.js, JavaScript), lógica Backend (Java, Python, FastAPI, SQL) y sistemas inteligentes con visión computacional y automatización.',
    hero_btn1: 'Explorar proyectos',
    hero_btn_cv: 'Descargar CV',
    hero_btn2: 'WhatsApp',
    hero_m1: 'Proyectos en Producción y Académicos',
    hero_m2: 'Tecnologías Dominadas',
    hero_m3: 'Web · Backend · IA',
    hero_photo_badge: 'Programación Avanzada · Campuslands',

    about_label: '01 — Sobre mí',
    about_title: 'Perfil profesional y esencia',
    about_subrole: 'Desarrolladora de Software en Formación',
    about_available: 'En línea y disponible',
    about_p1: 'Soy <strong>Heiling Gisselle León Bernal</strong>, desarrolladora de software en formación en <strong>Campuslands</strong>, con base técnica en <strong>Sistemas Teleinformáticos (SENA)</strong> y <strong>Producción Agropecuaria (UIS)</strong>. Esta combinación me permite entender problemas operativos reales del sector productivo y comercial y convertirlos en soluciones tecnológicas prácticas.',
    about_p2: 'Me destaco por construir aplicaciones completas desde cero: desde interfaces web interactivas con <strong>Next.js, TypeScript, HTML, CSS y JavaScript</strong> hasta sistemas backend estructurados con <strong>Java (POO, MVC, DAO), Python (FastAPI) y bases de datos MySQL / Supabase / MongoDB</strong>.',
    about_p3: 'Además, integro <strong>sistemas de visión por computadora e IA (YOLOv8, GPT-4o, FiftyOne) y automatización de flujos con n8n</strong> bajo metodologías ágiles como <strong>SCRUM</strong> y control de versiones colaborativo con <strong>GitFlow</strong>.',
    about_stat1: 'Proyectos Destacados',
    about_stat2: 'Tecnologías Clave',
    about_stat3: 'Trabajo Ágil en Equipo',
    about_stat4: 'Compromiso y Disciplina',

    comp_label: 'COMPETENCIAS PROFESIONALES',
    competencias: [
      'Liderazgo',
      'Pensamiento Crítico',
      'Comunicación Asertiva',
      'Trabajo en Equipo (SCRUM)',
      'Adaptabilidad',
      'Proactividad',
      'Disciplina',
      'Empatía'
    ],
    cv_btn_title: 'Descargar Currículum Vitae',
    cv_btn_sub: 'Versión actualizada en PDF · Lista para reclutadores',

    info_loc_label: 'UBICACIÓN',
    info_loc_val: 'Floridablanca, Santander, CO',
    info_edu_label: 'FORMACIÓN ACTUAL',
    info_edu_val: 'Programación Avanzada · Campuslands',
    info_lang_label: 'IDIOMAS',
    info_lang_val: 'Español (Nativo) · Inglés (B1.3)',
    info_stack_label: 'ENFOQUE PRINCIPAL',

    interests_label: 'INTERESES QUE INSPIRAN MIS PROYECTOS',
    intereses: [
      { icon: 'sparkles', name: 'Tecnología e IA', sub: 'Automatización · Desarrollo Web' },
      { icon: 'sprout', name: 'Agropecuaria', sub: 'Producción Pecuaria · Agrotech' },
      { icon: 'trending', name: 'Emprendimiento', sub: 'Innovación · Sistemas POS' },
      { icon: 'camera', name: 'Fotografía', sub: 'Composición · Diseño Visual' },
      { icon: 'book', name: 'Lectura', sub: 'Romance · Fantasía · Aprendizaje' },
      { icon: 'music', name: 'Música', sub: 'Pop · Baladas · Creatividad' }
    ],

    services_label: '02 — Mi Superpoder',
    services_title: '¿Cómo puedo aportar valor a tu equipo?',
    services_subtitle: 'Más allá de escribir código, diseño soluciones orientadas a resolver cuellos de botella operativos, digitalizar negocios y garantizar calidad técnica.',
    services: [
      {
        icon: 'code',
        title: 'Desarrollo Web & Frontend Moderno',
        desc: 'Construcción de interfaces rápidas, responsivas e intuitivas con Next.js, TypeScript, JavaScript (ES6+), Web Components y Tailwind CSS, enfocadas en experiencia de usuario y conversión.',
        tags: ['Next.js', 'TypeScript', 'Web Components', 'UI/UX']
      },
      {
        icon: 'cpu',
        title: 'Arquitectura Backend & Lógica de Negocio',
        desc: 'Desarrollo de sistemas modulares en Java y Python (FastAPI) aplicando Programación Orientada a Objetos (POO), arquitectura MVC, patrón DAO, manejo de excepciones y procesamiento de datos.',
        tags: ['Java 21', 'Python · FastAPI', 'MVC + DAO', 'POO']
      },
      {
        icon: 'bot',
        title: 'Automatización & Visión Computacional con IA',
        desc: 'Orquestación de bots conversacionales en n8n con Telegram y Docker, e integración de pipelines de IA multimodal y telemetría de video usando YOLOv8, GPT-4o y FiftyOne.',
        tags: ['n8n', 'YOLOv8 · FiftyOne', 'GPT-4o', 'Docker']
      },
      {
        icon: 'database',
        title: 'Modelado de Bases de Datos & SQL / NoSQL',
        desc: 'Diseño de bases de datos relacionales en MySQL y Supabase con Triggers, Funciones Almacenadas y Vistas, además de persistencia de datasets de telemetría con FiftyOne y MongoDB.',
        tags: ['MySQL', 'Supabase', 'FiftyOne · MongoDB', 'Triggers & Views']
      }
    ],

    skills_label: '03 — Habilidades Técnicas',
    skills_title: 'Stack tecnológico y herramientas',
    skills_subtitle: 'Selecciona o pasa el cursor sobre cualquier tecnología para inspeccionar mi experiencia práctica, herramientas asociadas y proyectos reales.',
    inspector_tools_label: 'HERRAMIENTAS Y PATRONES QUE APLICO',
    inspector_projects_label: 'PROYECTOS DONDE LO IMPLEMENTÉ',
    stackItems: [
      {
        id: 'java',
        icon: 'java',
        name: 'Java (POO · MVC · DAO)',
        category: 'Backend & Arquitectura',
        level: 'Avanzado en Formación',
        desc: 'Desarrollo de aplicaciones transaccionales aplicando los 4 pilares de POO, separación de capas MVC, patrón DAO, conexión JDBC con Singleton, manejo jerárquico de excepciones y reportes con Java Streams.',
        tools: ['Java 21', 'Patrón MVC + DAO', 'Singleton', 'Java Streams & Lambdas', 'Maven', 'JDBC MySQL'],
        projects: ['CrediYa S.A.S. — Sistema de Préstamos y Cobranzas']
      },
      {
        id: 'nextjs',
        icon: 'nextjs',
        name: 'Next.js & TypeScript',
        category: 'Full Stack Web',
        level: 'En Producción',
        desc: 'Creación de aplicaciones web modernas con Next.js App Router, tipado estático en TypeScript, diseño con Tailwind CSS e integración en la nube con Supabase y despliegue continuo en Vercel.',
        tools: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Vercel Deploy'],
        projects: ["DYM'S — Sistema POS y Gestión Agropecuaria"]
      },
      {
        id: 'js',
        icon: 'js',
        name: 'JavaScript (ES6+) & Web Components',
        category: 'Frontend Interactivo',
        level: 'Dominio Sólido',
        desc: 'Construcción de plataformas web dinámicas sin dependencia de librerías pesadas: encapsulación con Custom Elements (Web Components), consumo de APIs REST con Fetch/Async-Await y persistencia en LocalStorage.',
        tools: ['ES6+ Modules', 'Web Components', 'DOM Manipulation', 'Fetch / REST APIs', 'LocalStorage CRUD'],
        projects: ['Hotel El Rincón del Carmen — Reservas & Admin']
      },
      {
        id: 'sql',
        icon: 'database',
        name: 'MySQL & Supabase (SQL)',
        category: 'Bases de Datos',
        level: 'Modelado & Automatización',
        desc: 'Diseño de modelos entidad-relación normalizados, integridad referencial y programación directa en el motor de base de datos para cálculos automáticos de facturación, IVA y auditoría.',
        tools: ['MySQL 8+', 'Supabase PostgreSQL', 'Triggers', 'Stored Functions', 'Vistas Analíticas', 'Modelado ER'],
        projects: ['Eventos Premier S.A.S.', 'CrediYa S.A.S.', "DYM'S POS"]
      },
      {
        id: 'ai',
        icon: 'bot',
        name: 'IA · Visión Computacional · n8n',
        category: 'IA & Automatización',
        level: 'Agentes & Workflows',
        desc: 'Integración de pipelines de vigilancia inteligente con YOLOv8, GPT-4o y gestión de datasets de video por frame en FiftyOne, junto con automatización de flujos y máquinas de estados en n8n y Docker.',
        tools: ['FiftyOne Datasets', 'YOLOv8 & OpenCV', 'OpenAI GPT-4o', 'n8n Workflows', 'Telegram Bot API', 'Docker'],
        projects: ['Copiloto Sally 360 — Vigilancia Inteligente', 'TutorBot — Bot de Asesorías en Telegram']
      },
      {
        id: 'python',
        icon: 'terminal',
        name: 'Python · FastAPI · FiftyOne',
        category: 'Lógica, Datos & Backend',
        level: 'Dominio Sólido',
        desc: 'Desarrollo de motores de ingesta de datos de telemetría con FiftyOne y FastAPI, además de sistemas de gestión académica y herramientas CLI modulares con persistencia estructurada.',
        tools: ['Python 3.11', 'FastAPI', 'FiftyOne SDK', 'Arquitectura Modular', 'Persistencia JSON / MongoDB'],
        projects: ['Copiloto Sally 360', 'Sistema Académico CampusLands', 'TaskFlow CLI']
      },
      {
        id: 'htmlcss',
        icon: 'layout',
        name: 'HTML5 & CSS3 Avanzado',
        category: 'UI / Maquetación',
        level: 'Dominio Alto',
        desc: 'Maquetación semántica accesible, arquitecturas multipágina con CSS Grid, Flexbox, variables CSS, temas claro/oscuro, animaciones dirigidas por scroll y diseño Mobile-First.',
        tools: ['HTML5 Semántico', 'CSS Grid & Bento', 'Flexbox', 'Responsive Design', 'Glassmorphism UI'],
        projects: ['Campus Shop E-Commerce', 'Hotel El Rincón del Carmen']
      },
      {
        id: 'git',
        icon: 'git',
        name: 'Git · GitFlow · SCRUM',
        category: 'Ingeniería Colaborativa',
        level: 'Flujo Profesional',
        desc: 'Trabajo colaborativo bajo marco ágil SCRUM (Sprints, Daily, Review, Backlog) y gestión de ramas estructurada con GitFlow (main, develop, feature branches y Pull Requests).',
        tools: ['Git & GitHub', 'GitFlow Branching', 'SCRUM Framework', 'Docker', 'Documentación Técnica'],
        projects: ['Copiloto Sally 360', 'TaskFlow CLI', 'CrediYa S.A.S.']
      }
    ],

    projects_label: '04 — Portafolio de Proyectos',
    projects_title: 'Mis mejores trabajos',
    projects_subtitle: 'Selección de 6 proyectos clave con contexto real, mi rol técnico y los resultados obtenidos.',
    filter_all: 'Todos (6)',
    filter_web: 'Full Stack & Web',
    filter_backend: 'Backend & SQL',
    filter_ai: 'IA & Automatización',
    btn_demo_label: 'Ver Demo en Vivo',
    btn_code_label: 'Código Fuente',
    impact_prefix: 'Logro clave:',

    projects: [
      {
        id: 'dyms-pos',
        category: 'web',
        previewClass: 'preview-pos',
        badge: 'En Producción · Vercel',
        isLive: true,
        icon: 'cart',
        snippet: 'Next.js App Router + Supabase POS',
        role: 'Rol: Desarrolladora Full Stack',
        title: "DYM'S — Sistema POS y Gestión Agropecuaria",
        desc: 'Desarrollé e implementé un sistema de Punto de Venta (POS), control de inventario, apertura/cierre de caja con arqueo de efectivo y facturación rápida con tickets para una distribuidora agropecuaria.',
        impact: 'Digitalización completa del flujo de caja, ventas e inventario en tiempo real con despliegue en la nube.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        demoUrl: 'https://distribuidora-de-gestion.vercel.app',
        repoUrl: 'https://github.com/heiling-18/Distribuidora-de-gestion'
      },
      {
        id: 'crediya',
        category: 'backend',
        previewClass: 'preview-java',
        badge: 'Arquitectura MVC + DAO',
        isLive: false,
        icon: 'shield',
        snippet: 'Java 21 · MySQL · Streams · Singleton',
        role: 'Rol: Desarrolladora Backend Java',
        title: 'CrediYa S.A.S. — Gestión de Préstamos y Cobranzas',
        desc: 'Diseñé y construí una solución modular en Java bajo POO, arquitectura MVC y patrones DAO/Singleton para sistematizar el ciclo de créditos, cálculo de amortizaciones, control de abonos y reportes con Java Streams.',
        impact: 'Eliminación de errores en cálculo de intereses y persistencia híbrida transaccional en MySQL + respaldos .txt.',
        tags: ['Java 21', 'MySQL', 'MVC + DAO', 'POO', 'Maven'],
        demoUrl: null,
        repoUrl: 'https://github.com/heiling-18/crediya-app'
      },
      {
        id: 'tutorbot',
        category: 'ai',
        previewClass: 'preview-bot',
        badge: 'Bot Automatizado',
        isLive: false,
        icon: 'message',
        snippet: 'n8n Workflow · Telegram · Docker',
        role: 'Rol: Arquitecta de Automatización (Individual)',
        title: 'TutorBot — Sistema de Asesorías Académicas en Telegram',
        desc: 'Automaticé la gestión de tutorías mediante un bot conversacional en n8n y Docker con máquina de estados, motor de asignación inteligente de tutores, notificaciones y reportes automáticos en Google Sheets.',
        impact: 'Reducción del 90% en el tiempo de asignación de tutorías y trazabilidad total sin cruces de horarios.',
        tags: ['n8n', 'Telegram API', 'Docker', 'Google Sheets', 'State Machine'],
        demoUrl: null,
        repoUrl: 'https://github.com/heiling-18/tutorbot-n8n'
      },
      {
        id: 'hotel-rincon',
        category: 'web',
        previewClass: 'preview-hotel',
        badge: 'Demo en Vivo · Web Components',
        isLive: true,
        icon: 'building',
        snippet: 'CustomElements · ES6+ · LocalStorage',
        role: 'Rol: Desarrolladora Frontend',
        title: 'Hotel El Rincón del Carmen — Reservas & Panel Admin',
        desc: 'Desarrollé una plataforma web interactiva con Web Components y JavaScript ES6+ que permite consultar disponibilidad por fechas, autenticar usuarios y administrar habitaciones y reservas mediante un panel CRUD.',
        impact: 'Prevención automática de solapamiento de reservas y cálculo dinámico de tarifas por noche y huéspedes.',
        tags: ['JavaScript ES6+', 'Web Components', 'HTML5', 'CSS3'],
        demoUrl: 'demos/hotel/index.html',
        repoUrl: 'https://github.com/heiling-18/proyecto_Java_script_Hotel'
      },
      {
        id: 'eventos-premier',
        category: 'backend',
        previewClass: 'preview-sql',
        badge: 'Base de Datos Relacional',
        isLive: false,
        icon: 'database',
        snippet: 'CREATE TRIGGER · FUNCTION · VIEW',
        role: 'Rol: Diseñadora de Base de Datos SQL',
        title: 'Eventos Premier S.A.S. — Motor SQL de Reservas y Auditoría',
        desc: 'Modelé e implementé una base de datos relacional en MySQL para alquiler de salones corporativos, automatizando el cálculo de horas y facturación con IVA, sincronización de estados y auditoría histórica de precios.',
        impact: 'Automatización en motor SQL mediante Triggers, Funciones Almacenadas y Vistas analíticas de ingresos.',
        tags: ['MySQL', 'Triggers', 'Stored Functions', 'Vistas SQL', 'Modelado ER'],
        demoUrl: null,
        repoUrl: 'https://github.com/heiling-18/Eventos_premier'
      },
      {
        id: 'copiloto-sally-360',
        category: 'ai',
        previewClass: 'preview-ai',
        badge: 'Visión Computacional & IA',
        isLive: false,
        icon: 'sparkles',
        snippet: 'YOLOv8 · GPT-4o · FiftyOne · FastAPI',
        role: 'Rol: Desarrolladora Backend Python & Integración FiftyOne',
        title: 'Copiloto Sally 360 — Vigilancia Inteligente para Transporte',
        desc: 'Agente visual autónomo que detecta fatiga, distracción y riesgos viales en tiempo real combinando YOLOv8, GPT-4o y FastAPI. Desarrollé el motor de ingesta y gestión de datasets en FiftyOne para persistir telemetría y detecciones frame a frame por vehículo.',
        impact: 'Sincronización automatizada de detecciones YOLO y alertas críticas sobre la línea de tiempo de video en FiftyOne y MongoDB.',
        tags: ['Python 3.11', 'FiftyOne', 'YOLOv8', 'GPT-4o', 'FastAPI', 'MongoDB', 'React'],
        demoUrl: null,
        repoUrl: 'https://github.com/corredor29/Copiloto_Sally_360'
      }
    ],

    edu_label: '05 — Formación y Experiencia',
    edu_title: 'Mi trayectoria académica y técnica',
    edu: [
      {
        icon: 'code',
        year: 'En curso · 2026',
        badge: 'Formación Intensiva',
        title: 'Técnico en Programación Avanzada de Software',
        place: 'Campuslands · Floridablanca, Santander — Desarrollo Full Stack (Java, Python, JavaScript, Next.js, SQL, Automatización con n8n e IA bajo metodología SCRUM).'
      },
      {
        icon: 'sprout',
        year: 'En curso · 2026',
        badge: 'Educación Superior',
        title: 'Técnico Profesional en Producción Agropecuaria',
        place: 'Universidad Industrial de Santander (UIS) — Enfoque en gestión productiva, innovación agropecuaria y digitalización de procesos del sector.'
      },
      {
        icon: 'terminal',
        year: '2026',
        badge: 'Experiencia en Proyectos Ágiles',
        title: 'Developer — Sistema Académico CampusLands & TaskFlow CLI',
        place: 'Campuslands — Desarrollé un sistema académico en Python para gestión de inscripciones, rutas y notas de campers, y participé como Developer bajo SCRUM y GitFlow en TaskFlow CLI con persistencia en JSON.'
      },
      {
        icon: 'cpu',
        year: '2025',
        badge: 'Titulación Técnica',
        title: 'Técnico en Sistemas Teleinformáticos',
        place: 'SENA (Servicio Nacional de Aprendizaje) — Infraestructura tecnológica, soporte técnico, redes y fundamentos de sistemas.'
      },
      {
        icon: 'grad',
        year: '2025',
        badge: 'Educación Media + Atención al Cliente',
        title: 'Bachiller Académico & Experiencia en Atención al Cliente',
        place: 'Colegio Integrado Las Mercedes · Variedades HG — Soporte directo al cliente, gestión de compras y control de caja.'
      }
    ],

    contact_label: '06 — Contacto',
    contact_title: '¿Construimos algo juntos?',
    contact_h3: 'Lista para aportar en tu próximo proyecto o equipo',
    contact_p: 'Estoy disponible para prácticas empresariales, posiciones como Desarrolladora Junior (Frontend, Backend o Full Stack) y proyectos de automatización. Contáctame por tu canal preferido:',
    contact_cv_label: 'Currículum Vitae',
    contact_cv_val: 'Descargar CV en formato PDF',

    form_header: 'Envíame un mensaje directo',
    form_name: 'Nombre',
    form_email: 'Correo de contacto',
    form_msg: 'Mensaje',
    form_ph_name: 'Tu nombre o empresa',
    form_ph_email: 'tu@empresa.com',
    form_ph_msg: 'Cuéntame sobre la vacante, práctica o proyecto...',
    form_btn: 'Enviar mensaje directo',
    form_sent: 'Abriendo canal de contacto...',
    form_note: 'Al enviar, se abrirá WhatsApp con tu mensaje estructurado para que recibas respuesta inmediata.',
    footer: 'Diseñado y desarrollado por'
  },

  en: {
    loader_text: 'Initializing portfolio...',
    nav_about: 'About',
    nav_services: 'Services',
    nav_skills: 'Stack',
    nav_projects: 'Projects',
    nav_education: 'Journey',
    nav_contact: 'Contact',

    hero_badge: 'Available for Internships & Projects · Colombia / Remote',
    hero_tag: 'Junior Software Developer',
    hero_roles: [
      'Junior Full Stack Developer',
      'Java (MVC + DAO) & Python Backend',
      'Next.js & Modern JavaScript UI',
      'AI & Automation (n8n · YOLOv8 · FiftyOne)'
    ],
    hero_desc: 'I turn real operational needs into clean, scalable, and user-friendly software. Combining Full Stack web development (Next.js, JavaScript), solid Backend architecture (Java, Python, FastAPI, SQL), and intelligent computer vision & automation systems.',
    hero_btn1: 'Explore projects',
    hero_btn_cv: 'Download CV',
    hero_btn2: 'WhatsApp',
    hero_m1: 'Production & Academic Projects',
    hero_m2: 'Core Technologies',
    hero_m3: 'Web · Backend · AI',
    hero_photo_badge: 'Advanced Programming · Campuslands',

    about_label: '01 — About Me',
    about_title: 'Professional profile & essence',
    about_subrole: 'Software Developer in Training',
    about_available: 'Online & available',
    about_p1: 'I am <strong>Heiling Gisselle León Bernal</strong>, a software developer in training at <strong>Campuslands</strong> with technical foundations in <strong>Teleinformatics Systems (SENA)</strong> and <strong>Agricultural Production (UIS)</strong>. This unique background lets me understand real-world business operations and turn them into practical software solutions.',
    about_p2: 'I enjoy building end-to-end applications from scratch: from responsive web interfaces using <strong>Next.js, TypeScript, HTML, CSS, and JavaScript</strong> to structured backend systems in <strong>Java (OOP, MVC, DAO), Python (FastAPI), and databases (MySQL / Supabase / MongoDB)</strong>.',
    about_p3: 'I also build <strong>computer vision & AI pipelines (YOLOv8, GPT-4o, FiftyOne) and workflow automations with n8n</strong> working with agile <strong>SCRUM</strong> methodologies and collaborative <strong>GitFlow</strong>.',
    about_stat1: 'Featured Projects',
    about_stat2: 'Core Technologies',
    about_stat3: 'Agile Teamwork',
    about_stat4: 'Commitment & Discipline',

    comp_label: 'PROFESSIONAL COMPETENCIES',
    competencias: [
      'Leadership',
      'Critical Thinking',
      'Assertive Communication',
      'Agile Teamwork (SCRUM)',
      'Adaptability',
      'Proactivity',
      'Discipline',
      'Empathy'
    ],
    cv_btn_title: 'Download Curriculum Vitae',
    cv_btn_sub: 'Updated PDF version · Ready for recruiters',

    info_loc_label: 'LOCATION',
    info_loc_val: 'Floridablanca, Santander, CO',
    info_edu_label: 'CURRENT EDUCATION',
    info_edu_val: 'Advanced Programming · Campuslands',
    info_lang_label: 'LANGUAGES',
    info_lang_val: 'Spanish (Native) · English (B1.3)',
    info_stack_label: 'CORE FOCUS',

    interests_label: 'INTERESTS THAT INSPIRE MY WORK',
    intereses: [
      { icon: 'sparkles', name: 'Technology & AI', sub: 'Automation · Web Development' },
      { icon: 'sprout', name: 'Agribusiness', sub: 'Agricultural Production · Agrotech' },
      { icon: 'trending', name: 'Entrepreneurship', sub: 'Innovation · POS Systems' },
      { icon: 'camera', name: 'Photography', sub: 'Composition · Visual Design' },
      { icon: 'book', name: 'Reading', sub: 'Romance · Fantasy · Continuous Learning' },
      { icon: 'music', name: 'Music', sub: 'Pop · Ballads · Creativity' }
    ],

    services_label: '02 — My Superpower',
    services_title: 'How can I add value to your team?',
    services_subtitle: 'Beyond writing code, I build solutions designed to solve operational bottlenecks, digitize workflows, and ensure software quality.',
    services: [
      {
        icon: 'code',
        title: 'Modern Web & Frontend Development',
        desc: 'Building fast, responsive, and intuitive web applications using Next.js, TypeScript, JavaScript (ES6+), Web Components, and Tailwind CSS with a strong focus on UX.',
        tags: ['Next.js', 'TypeScript', 'Web Components', 'UI/UX']
      },
      {
        icon: 'cpu',
        title: 'Backend Architecture & Business Logic',
        desc: 'Developing modular software in Java and Python (FastAPI) applying Object-Oriented Programming (OOP), MVC architecture, DAO pattern, exception hierarchies, and data pipelines.',
        tags: ['Java 21', 'Python · FastAPI', 'MVC + DAO', 'OOP']
      },
      {
        icon: 'bot',
        title: 'Workflow Automation & Computer Vision AI',
        desc: 'Orchestrating stateful Telegram bots in n8n with Docker, and integrating multimodal AI and video telemetry pipelines using YOLOv8, GPT-4o, and FiftyOne.',
        tags: ['n8n', 'YOLOv8 · FiftyOne', 'GPT-4o', 'Docker']
      },
      {
        icon: 'database',
        title: 'Database Modeling & SQL / NoSQL',
        desc: 'Designing normalized databases in MySQL and Supabase with automated Triggers, Stored Functions, and Views, plus video telemetry dataset persistence with FiftyOne and MongoDB.',
        tags: ['MySQL', 'Supabase', 'FiftyOne · MongoDB', 'Triggers & Views']
      }
    ],

    skills_label: '03 — Technical Skills',
    skills_title: 'Tech stack & interactive ecosystem',
    skills_subtitle: 'Click or hover over any technology to inspect my hands-on experience, architectural patterns, and real projects built with it.',
    inspector_tools_label: 'TOOLS & PATTERNS APPLIED',
    inspector_projects_label: 'IMPLEMENTED IN PROJECTS',
    stackItems: [
      {
        id: 'java',
        icon: 'java',
        name: 'Java (OOP · MVC · DAO)',
        category: 'Backend & Architecture',
        level: 'Advanced Training',
        desc: 'Developing transactional applications applying the 4 pillars of OOP, MVC layer separation, DAO pattern, Singleton JDBC connections, hierarchical exception handling, and Java Streams.',
        tools: ['Java 21', 'MVC + DAO Pattern', 'Singleton', 'Java Streams & Lambdas', 'Maven', 'MySQL JDBC'],
        projects: ['CrediYa S.A.S. — Loan & Collections System']
      },
      {
        id: 'nextjs',
        icon: 'nextjs',
        name: 'Next.js & TypeScript',
        category: 'Full Stack Web',
        level: 'In Production',
        desc: 'Building modern web applications with Next.js App Router, static typing in TypeScript, Tailwind CSS styling, and cloud backend integration with Supabase deployed on Vercel.',
        tools: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Vercel Cloud'],
        projects: ["DYM'S — POS & Agribusiness System"]
      },
      {
        id: 'js',
        icon: 'js',
        name: 'JavaScript (ES6+) & Web Components',
        category: 'Interactive Frontend',
        level: 'Strong Proficiency',
        desc: 'Creating modular web platforms using native Custom Elements (Web Components), REST API consumption with Fetch/Async-Await, dynamic DOM state, and LocalStorage persistence.',
        tools: ['ES6+ Modules', 'Web Components', 'DOM Manipulation', 'Fetch / REST APIs', 'LocalStorage CRUD'],
        projects: ['Hotel El Rincón del Carmen — Booking & Admin']
      },
      {
        id: 'sql',
        icon: 'database',
        name: 'MySQL & Supabase (SQL)',
        category: 'Databases',
        level: 'Modeling & Automation',
        desc: 'Designing normalized Entity-Relationship schemas, enforcing referential integrity, and programming database-level automation for billing, VAT calculations, and price auditing.',
        tools: ['MySQL 8+', 'Supabase PostgreSQL', 'Triggers', 'Stored Functions', 'Analytical Views', 'ER Modeling'],
        projects: ['Eventos Premier S.A.S.', 'CrediYa S.A.S.', "DYM'S POS"]
      },
      {
        id: 'ai',
        icon: 'bot',
        name: 'AI · Computer Vision · n8n',
        category: 'AI & Automation',
        level: 'Agents & Workflows',
        desc: 'Integrating intelligent transport surveillance pipelines with YOLOv8, GPT-4o, and frame-level video dataset management in FiftyOne, alongside stateful workflows in n8n and Docker.',
        tools: ['FiftyOne Datasets', 'YOLOv8 & OpenCV', 'OpenAI GPT-4o', 'n8n Workflows', 'Telegram Bot API', 'Docker'],
        projects: ['Copiloto Sally 360 — Intelligent Surveillance', 'TutorBot — Telegram Academic Bot']
      },
      {
        id: 'python',
        icon: 'terminal',
        name: 'Python · FastAPI · FiftyOne',
        category: 'Logic, Data & Backend',
        level: 'Strong Proficiency',
        desc: 'Building telemetry dataset ingestion engines with FiftyOne and FastAPI, as well as academic management systems and modular CLI applications with structured persistence.',
        tools: ['Python 3.11', 'FastAPI', 'FiftyOne SDK', 'Modular Architecture', 'JSON / MongoDB Persistence'],
        projects: ['Copiloto Sally 360', 'CampusLands Academic System', 'TaskFlow CLI']
      },
      {
        id: 'htmlcss',
        icon: 'layout',
        name: 'HTML5 & Modern CSS3',
        category: 'UI / Layout',
        level: 'High Mastery',
        desc: 'Semantic accessible markup, multi-view architectures with CSS Grid, Flexbox, custom properties, dark/light themes, scroll-driven animations, and Mobile-First design.',
        tools: ['Semantic HTML5', 'CSS Grid & Bento', 'Flexbox', 'Responsive Design', 'Glassmorphism UI'],
        projects: ['Campus Shop E-Commerce', 'Hotel El Rincón del Carmen']
      },
      {
        id: 'git',
        icon: 'git',
        name: 'Git · GitFlow · SCRUM',
        category: 'Collaborative Engineering',
        level: 'Professional Workflow',
        desc: 'Collaborating in agile SCRUM teams (Sprints, Daily Standups, Reviews, Backlogs) with structured GitFlow branching (main, develop, feature branches, Pull Requests).',
        tools: ['Git & GitHub', 'GitFlow Branching', 'SCRUM Framework', 'Docker', 'Technical Docs'],
        projects: ['Copiloto Sally 360', 'TaskFlow CLI', 'CrediYa S.A.S.']
      }
    ],

    projects_label: '04 — Project Portfolio',
    projects_title: 'Featured work',
    projects_subtitle: 'A curated selection of 6 key projects including context, my technical role, and measurable outcomes.',
    filter_all: 'All (6)',
    filter_web: 'Full Stack & Web',
    filter_backend: 'Backend & SQL',
    filter_ai: 'AI & Automation',
    btn_demo_label: 'Live Demo',
    btn_code_label: 'Source Code',
    impact_prefix: 'Key outcome:',

    projects: [
      {
        id: 'dyms-pos',
        category: 'web',
        previewClass: 'preview-pos',
        badge: 'Live on Vercel',
        isLive: true,
        icon: 'cart',
        snippet: 'Next.js App Router + Supabase POS',
        role: 'Role: Full Stack Developer',
        title: "DYM'S — POS & Agribusiness Management System",
        desc: 'Developed and deployed a Point of Sale (POS), inventory control, cash register reconciliation, and fast ticket invoicing web application for an agricultural distributor.',
        impact: 'Digitized real-time sales, cash flow, and inventory management with cloud deployment on Vercel & Supabase.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        demoUrl: 'https://distribuidora-de-gestion.vercel.app',
        repoUrl: 'https://github.com/heiling-18/Distribuidora-de-gestion'
      },
      {
        id: 'crediya',
        category: 'backend',
        previewClass: 'preview-java',
        badge: 'MVC + DAO Architecture',
        isLive: false,
        icon: 'shield',
        snippet: 'Java 21 · MySQL · Streams · Singleton',
        role: 'Role: Java Backend Developer',
        title: 'CrediYa S.A.S. — Loan & Collections Management System',
        desc: 'Designed and built a modular Java application using OOP principles, MVC architecture, and DAO/Singleton patterns to automate microloans, fixed-installment calculations, payments, and Java Stream analytics.',
        impact: 'Eliminated manual spreadsheet errors with hybrid relational MySQL persistence and automated .txt exports.',
        tags: ['Java 21', 'MySQL', 'MVC + DAO', 'OOP', 'Maven'],
        demoUrl: null,
        repoUrl: 'https://github.com/heiling-18/crediya-app'
      },
      {
        id: 'tutorbot',
        category: 'ai',
        previewClass: 'preview-bot',
        badge: 'Automated Bot',
        isLive: false,
        icon: 'message',
        snippet: 'n8n Workflow · Telegram · Docker',
        role: 'Role: Automation Developer (Solo Project)',
        title: 'TutorBot — Automated Academic Tutoring Bot on Telegram',
        desc: 'Built an end-to-end conversational Telegram bot in n8n and Docker featuring a custom state machine, smart tutor-schedule matching engine, real-time notifications, and automated daily reporting in Google Sheets.',
        impact: 'Achieved a 90% reduction in tutoring assignment time with full traceability and zero schedule collisions.',
        tags: ['n8n', 'Telegram API', 'Docker', 'Google Sheets', 'State Machine'],
        demoUrl: null,
        repoUrl: 'https://github.com/heiling-18/tutorbot-n8n'
      },
      {
        id: 'hotel-rincon',
        category: 'web',
        previewClass: 'preview-hotel',
        badge: 'Live Demo · Web Components',
        isLive: true,
        icon: 'building',
        snippet: 'CustomElements · ES6+ · LocalStorage',
        role: 'Role: Frontend Developer',
        title: 'Hotel El Rincón del Carmen — Booking & Admin Suite',
        desc: 'Created a modular hotel booking platform using native Web Components and ES6+ JavaScript, featuring real-time date availability search, user authentication, and a full CRUD administrative dashboard.',
        impact: 'Prevented overlapping reservations automatically and automated dynamic nightly rate calculations.',
        tags: ['JavaScript ES6+', 'Web Components', 'HTML5', 'CSS3'],
        demoUrl: 'demos/hotel/index.html',
        repoUrl: 'https://github.com/heiling-18/proyecto_Java_script_Hotel'
      },
      {
        id: 'eventos-premier',
        category: 'backend',
        previewClass: 'preview-sql',
        badge: 'Relational Database',
        isLive: false,
        icon: 'database',
        snippet: 'CREATE TRIGGER · FUNCTION · VIEW',
        role: 'Role: SQL Database Designer',
        title: 'Eventos Premier S.A.S. — Venue Booking & Audit SQL Engine',
        desc: 'Modeled and implemented a relational MySQL database for corporate venue rentals, automating hourly + VAT billing calculations, room status synchronization, and historical price change auditing.',
        impact: 'Enforced business rules directly at the database layer via Triggers, Stored Functions, and analytical Views.',
        tags: ['MySQL', 'Triggers', 'Stored Functions', 'SQL Views', 'ER Modeling'],
        demoUrl: null,
        repoUrl: 'https://github.com/heiling-18/Eventos_premier'
      },
      {
        id: 'copiloto-sally-360',
        category: 'ai',
        previewClass: 'preview-ai',
        badge: 'Computer Vision & AI',
        isLive: false,
        icon: 'sparkles',
        snippet: 'YOLOv8 · GPT-4o · FiftyOne · FastAPI',
        role: 'Role: Python Backend & FiftyOne Data Engineer',
        title: 'Copiloto Sally 360 — Intelligent Transport Surveillance',
        desc: 'Autonomous visual agent that detects driver fatigue, distraction, and road hazards in real time using YOLOv8, GPT-4o, and FastAPI. Built the FiftyOne dataset ingestion engine to persist frame-level telemetry and bounding-box detections per vehicle.',
        impact: 'Automated frame-by-frame YOLO detection and critical alert synchronization in FiftyOne & MongoDB.',
        tags: ['Python 3.11', 'FiftyOne', 'YOLOv8', 'GPT-4o', 'FastAPI', 'MongoDB', 'React'],
        demoUrl: null,
        repoUrl: 'https://github.com/corredor29/Copiloto_Sally_360'
      }
    ],

    edu_label: '05 — Education & Experience',
    edu_title: 'Academic & technical journey',
    edu: [
      {
        icon: 'code',
        year: 'In Progress · 2026',
        badge: 'Intensive Training',
        title: 'Advanced Software Programming Technician',
        place: 'Campuslands · Floridablanca, Colombia — Full Stack software development (Java, Python, JavaScript, Next.js, SQL, n8n Automation & AI under SCRUM methodology).'
      },
      {
        icon: 'sprout',
        year: 'In Progress · 2026',
        badge: 'Higher Education',
        title: 'Professional Technician in Agricultural Production',
        place: 'Universidad Industrial de Santander (UIS) — Productive management, agricultural innovation, and sector digitization.'
      },
      {
        icon: 'terminal',
        year: '2026',
        badge: 'Agile Project Experience',
        title: 'Developer — CampusLands Academic System & TaskFlow CLI',
        place: 'Campuslands — Built a Python academic tracking system for camper enrollments, training routes, and grades, and collaborated as a SCRUM Developer using GitFlow on TaskFlow CLI.'
      },
      {
        icon: 'cpu',
        year: '2025',
        badge: 'Technical Degree',
        title: 'Teleinformatics Systems Technician',
        place: 'SENA — IT infrastructure, technical support, networking, and computer systems fundamentals.'
      },
      {
        icon: 'grad',
        year: '2025',
        badge: 'High School + Customer Service',
        title: 'Academic High School Diploma & Customer Support Experience',
        place: 'Colegio Integrado Las Mercedes · Variedades HG — Direct customer service, purchasing management, and cash register operations.'
      }
    ],

    contact_label: '06 — Contact',
    contact_title: "Let's build something together",
    contact_h3: 'Ready to contribute to your next project or engineering team',
    contact_p: 'I am available for internships, Junior Developer roles (Frontend, Backend, or Full Stack), and automation projects. Reach out via your preferred channel:',
    contact_cv_label: 'Curriculum Vitae',
    contact_cv_val: 'Download CV in PDF format',

    form_header: 'Send me a direct message',
    form_name: 'Name',
    form_email: 'Contact email',
    form_msg: 'Message',
    form_ph_name: 'Your name or company',
    form_ph_email: 'you@company.com',
    form_ph_msg: 'Tell me about the role, internship, or project...',
    form_btn: 'Send direct message',
    form_sent: 'Opening contact channel...',
    form_note: 'Submitting opens WhatsApp with your formatted message for an immediate reply.',
    footer: 'Designed and built by'
  }
};

let currentLang = 'es';
let currentProjectFilter = 'all';
let activeStackId = 'java';

function renderStackSection(lang) {
  const t = translations[lang];
  const grid = document.getElementById('stack-cards-grid');
  if (!grid || !t.stackItems) return;

  grid.innerHTML = t.stackItems.map(item => `
    <button type="button" class="stack-spot-card ${item.id === activeStackId ? 'active' : ''}" data-stack-id="${item.id}" onclick="selectStackItem('${item.id}')" onmouseenter="selectStackItem('${item.id}')">
      <div class="stack-card-top">
        <div class="stack-svg-wrap">${svgIcons[item.icon] || svgIcons.code}</div>
        <span class="stack-cat-pill">${item.category}</span>
      </div>
      <div class="stack-card-name">${item.name}</div>
      <div class="stack-card-meta">
        <span class="stack-level-dot"></span>
        <span>${item.level}</span>
      </div>
    </button>
  `).join('');

  // Attach spotlight mousemove coordinates
  grid.querySelectorAll('.stack-spot-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  renderStackInspector(lang, activeStackId);
}

function renderStackInspector(lang, stackId) {
  const t = translations[lang];
  const inspector = document.getElementById('stack-inspector');
  if (!inspector || !t.stackItems) return;

  const item = t.stackItems.find(s => s.id === stackId) || t.stackItems[0];

  inspector.innerHTML = `
    <div class="inspector-header">
      <div class="inspector-icon-lg">${svgIcons[item.icon] || svgIcons.code}</div>
      <div>
        <div class="inspector-cat">${item.category} · ${item.level}</div>
        <h3 class="inspector-title">${item.name}</h3>
      </div>
    </div>
    <p class="inspector-desc">${item.desc}</p>
    <div class="inspector-block">
      <div class="inspector-label">${t.inspector_tools_label}</div>
      <div class="inspector-tags">
        ${item.tools.map(tool => `<span class="inspector-tag">${tool}</span>`).join('')}
      </div>
    </div>
    <div class="inspector-block">
      <div class="inspector-label">${t.inspector_projects_label}</div>
      <div class="inspector-projects">
        ${item.projects.map(proj => `
          <a href="#proyectos" class="inspector-proj-link">
            ${svgIcons.code}
            <span>${proj}</span>
            ${svgIcons.external}
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

function selectStackItem(stackId) {
  activeStackId = stackId;
  document.querySelectorAll('.stack-spot-card').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-stack-id') === stackId);
  });
  renderStackInspector(currentLang, stackId);
}

function renderProjects(lang, filter = currentProjectFilter) {
  const t = translations[lang];
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? t.projects
    : t.projects.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <article class="project-card" data-category="${p.category}">
      <div class="project-preview ${p.previewClass}">
        <div class="preview-window-bar">
          <div class="window-dots"><span></span><span></span><span></span></div>
          <span class="preview-badge ${p.isLive ? 'live' : ''}">${p.badge}</span>
        </div>
        <div class="preview-mockup-body">
          <div class="preview-icon-lg">${svgIcons[p.icon] || svgIcons.code}</div>
          <div class="preview-code-snippet">${p.snippet}</div>
        </div>
      </div>

      <div class="project-body">
        <div class="project-role-tag">${p.role}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-impact">
          <strong>${t.impact_prefix}</strong> ${p.impact}
        </div>
        <div class="project-tags">
          ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-actions">
          ${p.demoUrl ? `<a href="${p.demoUrl}" target="_blank" rel="noopener" class="proj-btn proj-btn-demo">${svgIcons.external}<span>${t.btn_demo_label}</span></a>` : ''}
          <a href="${p.repoUrl}" target="_blank" rel="noopener" class="proj-btn proj-btn-code">${svgIcons.github}<span>${t.btn_code_label}</span></a>
        </div>
      </div>
    </article>
  `).join('');
}

function applyTranslations(lang) {
  const t = translations[lang];
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else if (key.startsWith('about_p')) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Competencies
  const compList = document.getElementById('competencias-list');
  if (compList && t.competencias) {
    compList.innerHTML = t.competencias.map(c => `<span class="comp-tag">${c}</span>`).join('');
  }

  // Interests (with SVG icons)
  const interesesGrid = document.getElementById('intereses-grid');
  if (interesesGrid && t.intereses) {
    interesesGrid.innerHTML = t.intereses.map(item => `
      <div class="interes-item">
        <span class="interes-svg">${svgIcons[item.icon] || svgIcons.sparkles}</span>
        <div>
          <div class="interes-name">${item.name}</div>
          <div class="interes-sub">${item.sub}</div>
        </div>
      </div>
    `).join('');
  }

  // Services (with SVG icons)
  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid && t.services) {
    servicesGrid.innerHTML = t.services.map(s => `
      <div class="service-card">
        <div class="service-icon-wrap">${svgIcons[s.icon] || svgIcons.code}</div>
        <h3 class="service-title">${s.title}</h3>
        <p class="service-desc">${s.desc}</p>
        <div class="service-tags">
          ${s.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Interactive Stack Explorer
  renderStackSection(lang);

  // Projects
  renderProjects(lang, currentProjectFilter);

  // Education timeline (with SVG icons)
  const timeline = document.getElementById('edu-timeline');
  if (timeline && t.edu) {
    timeline.innerHTML = t.edu.map(item => `
      <div class="edu-item">
        <div class="edu-dot">${svgIcons[item.icon] || svgIcons.grad}</div>
        <div class="edu-content">
          <div class="edu-top-row">
            <span class="edu-year">${item.year}</span>
            <span class="edu-badge">${item.badge}</span>
          </div>
          <div class="edu-title">${item.title}</div>
          <div class="edu-place">${item.place}</div>
        </div>
      </div>
    `).join('');
  }

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.textContent = lang === 'es' ? 'EN' : 'ES';

  if (window.restartTyped) window.restartTyped(t.hero_roles);
}

function toggleLang() {
  applyTranslations(currentLang === 'es' ? 'en' : 'es');
}

function filterProjects(category) {
  currentProjectFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });
  renderProjects(currentLang, category);
}

window.applyTranslations = applyTranslations;
window.toggleLang = toggleLang;
window.filterProjects = filterProjects;
window.selectStackItem = selectStackItem;
window.getT = (key) => translations[currentLang][key];