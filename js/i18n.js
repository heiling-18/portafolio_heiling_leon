// i18n.js — Spanish / English translations
const translations = {
  es: {
    nav_about: 'Sobre mí',
    nav_skills: 'Skills',
    nav_projects: 'Proyectos',
    nav_education: 'Educación',
    nav_contact: 'Contacto',
    hero_tag: 'Desarrolladora de Software',
    hero_roles: ['Desarrolladora Web', 'Fullstack en progreso', 'Diseño + Lógica', 'Construyendo Tecnología'],
    hero_desc: 'Desarrolladora orientada a crear herramientas digitales simples, eficientes y con propósito. Me inspira convertir necesidades reales en código útil.',
    hero_btn1: 'Ver proyectos',
    hero_btn2: 'Contáctame',
    about_label: '01 — Sobre mí',
    about_title: '¿Quién soy?',
    about_p1: 'Soy <strong>Heiling Gisselle Leon Bernal</strong>, estudiante de ingeniería de sistemas con enfoque en desarrollo de software y programación.',
    about_p2: 'Me apasiona aprender nuevas tecnologías y aplicarlas para resolver problemas reales. Disfruto construir desde cero, tanto en el frontend como explorando bases de datos y lógica backend.',
    about_p3: 'Actualmente profundizo mis conocimientos en <strong>Inteligencia Artificial, testing de prompts y automatización</strong>. Busco siempre proyectos que me reten a crecer.',
    about_location: 'Bucaramanga, Colombia 🇨🇴',
    about_stat1: 'Tecnologías',
    about_stat2: 'Proyectos',
    about_stat3: 'Dedicación',
    about_upload: '📷 Cambiar foto',
    skills_label: '02 — Habilidades',
    skills_title: 'Stack tecnológico',
    projects_label: '03 — Proyectos',
    projects_title: 'Lo que he construido',
    edu_label: '04 — Educación',
    edu_title: 'Mi trayectoria',
    contact_label: '05 — Contacto',
    contact_title: 'Hablemos',
    contact_h3: '¿Tienes un proyecto en mente?',
    contact_p: 'Estoy disponible para colaboraciones, prácticas o simplemente para conectar. No dudes en escribirme.',
    form_name: 'Nombre',
    form_email: 'Email',
    form_msg: 'Mensaje',
    form_ph_name: 'Tu nombre',
    form_ph_email: 'tu@email.com',
    form_ph_msg: 'Cuéntame sobre tu proyecto...',
    form_btn: 'Enviar mensaje →',
    form_sent: '✓ Mensaje enviado',
    footer: 'Diseñado y construido por',
    loader_text: 'Cargando portafolio...',
    edu: [
      { year: '2023 — Presente', title: 'Ingeniería de Sistemas', place: 'Universidad — Bucaramanga, Colombia' },
      { year: '2025', title: 'Inteligencia Artificial I', place: 'Prompt Testing · Gemini · Promptfoo · QA aplicado a IA' },
      { year: '2025', title: 'Desarrollo Web Frontend', place: 'HTML · CSS · JavaScript · Proyectos prácticos' },
      { year: '2025', title: 'Python & Bases de Datos', place: 'Python · SQL · Gestión de datos · Proyectos colaborativos' },
      { year: '2024', title: 'Fundamentos de Programación', place: 'Lógica · Algoritmos · Estructuras de datos' },
    ]
  },
  en: {
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_education: 'Education',
    nav_contact: 'Contact',
    hero_tag: 'Software Developer',
    hero_roles: ['Web Developer', 'Fullstack Developer', 'Diseño + Lógica', 'Construyendo Tecnología'],
    hero_desc: 'Engineering student passionate about building clean and functional digital solutions. I love turning ideas into code.',
    hero_btn1: 'View projects',
    hero_btn2: 'Contact me',
    about_label: '01 — About me',
    about_title: 'Who am I?',
    about_p1: 'I am <strong>Heiling Gisselle Leon Bernal</strong>, a systems engineering student focused on software development and programming.',
    about_p2: 'I am passionate about learning new technologies and applying them to solve real problems. I enjoy building from scratch, both in frontend and exploring databases and backend logic.',
    about_p3: 'Currently deepening my knowledge in <strong>Artificial Intelligence, prompt testing, and automation</strong>. I always seek projects that challenge me to grow.',
    about_location: 'Bucaramanga, Colombia 🇨🇴',
    about_stat1: 'Technologies',
    about_stat2: 'Projects',
    about_stat3: 'Dedication',
    about_upload: '📷 Change photo',
    skills_label: '02 — Skills',
    skills_title: 'Tech stack',
    projects_label: '03 — Projects',
    projects_title: 'What I have built',
    edu_label: '04 — Education',
    edu_title: 'My journey',
    contact_label: '05 — Contact',
    contact_title: "Let's talk",
    contact_h3: 'Have a project in mind?',
    contact_p: 'I am available for collaborations, internships, or just to connect. Feel free to write to me.',
    form_name: 'Name',
    form_email: 'Email',
    form_msg: 'Message',
    form_ph_name: 'Your name',
    form_ph_email: 'you@email.com',
    form_ph_msg: 'Tell me about your project...',
    form_btn: 'Send message →',
    form_sent: '✓ Message sent',
    footer: 'Designed and built by',
    loader_text: 'Loading portfolio...',
    edu: [
      { year: '2023 — Present', title: 'Systems Engineering', place: 'University — Bucaramanga, Colombia' },
      { year: '2025', title: 'Artificial Intelligence I', place: 'Prompt Testing · Gemini · Promptfoo · QA for AI' },
      { year: '2025', title: 'Frontend Web Development', place: 'HTML · CSS · JavaScript · Practical projects' },
      { year: '2025', title: 'Python & Databases', place: 'Python · SQL · Data management · Collaborative projects' },
      { year: '2024', title: 'Programming Fundamentals', place: 'Logic · Algorithms · Data structures' },
    ]
  }
};

let currentLang = 'es';

function applyTranslations(lang) {
  const t = translations[lang];
  currentLang = lang;

  // Nav
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else if (key.startsWith('about_p') || key === 'about_upload') {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Hero tag
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) heroTag.firstChild.textContent = t.hero_tag;

  // Education timeline
  const timeline = document.getElementById('edu-timeline');
  if (timeline) {
    timeline.innerHTML = '';
    const icons = ['🎓', '🤖', '🌐', '🐍', '⚡'];
    t.edu.forEach((item, i) => {
      timeline.innerHTML += `
        <div class="edu-item">
          <div class="edu-dot">${icons[i] || '📚'}</div>
          <div class="edu-content">
            <div class="edu-year">${item.year}</div>
            <div class="edu-title">${item.title}</div>
            <div class="edu-place">${item.place}</div>
          </div>
        </div>`;
    });
  }

  // Update lang button
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.textContent = lang === 'es' ? 'EN' : 'ES';

  // Restart typed effect with new roles
  if (window.restartTyped) window.restartTyped(t.hero_roles);
}

function toggleLang() {
  applyTranslations(currentLang === 'es' ? 'en' : 'es');
}

window.applyTranslations = applyTranslations;
window.toggleLang = toggleLang;
window.getT = (key) => translations[currentLang][key];