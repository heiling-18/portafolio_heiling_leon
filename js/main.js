// main.js — loader, typed text, scroll reveal, scroll progress fallback, mobile menu & real contact form

// ===== INITIALIZE CONTENT & LOADER =====
document.addEventListener('DOMContentLoaded', () => {
  if (window.applyTranslations) {
    window.applyTranslations('es');
  }
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 600);
});

// ===== SCROLL PROGRESS FALLBACK =====
if (typeof CSS !== 'undefined' && !CSS.supports('animation-timeline', 'scroll()')) {
  const progress = document.querySelector('#progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progressPercentage = scrollable > 0 ? (scrolled / scrollable) : 0;
      progress.style.transform = `scaleX(${progressPercentage})`;
    }, { passive: true });
  }
}

// ===== MOBILE MENU TOGGLE =====
window.toggleMobileMenu = function() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.classList.toggle('open');
  }
};

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('open');
  });
});

// ===== TYPED TEXT =====
let typedRoles = [
  'Desarrolladora Full Stack Junior',
  'Backend con Java (MVC + DAO) & Python',
  'Interfaces con Next.js & JavaScript',
  'Automatización con n8n & Gemini AI'
];
let ri = 0, ci = 0, deleting = false, typedTimer = null;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const word = typedRoles[ri] || '';
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      typedTimer = setTimeout(type, 1900);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % typedRoles.length;
    }
  }
  typedTimer = setTimeout(type, deleting ? 38 : 70);
}

window.restartTyped = function(roles) {
  clearTimeout(typedTimer);
  typedRoles = roles;
  ri = 0;
  ci = 0;
  deleting = false;
  type();
};

type();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== CONTACT FORM (REAL WHATSAPP INTEGRATION) =====
window.handleSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const name = (form.querySelector('#contact-name')?.value || '').trim();
  const email = (form.querySelector('#contact-email')?.value || '').trim();
  const message = (form.querySelector('#contact-msg')?.value || '').trim();

  const btn = form.querySelector('button[type="submit"] span[data-i18n="form_btn"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = btn ? btn.textContent : '';
  const sentText = window.getT ? window.getT('form_sent') : 'Sending...';

  const text = `Hola Heiling, soy *${name}* (${email}).\n\n${message}`;
  const waUrl = `https://wa.me/573107954197?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank', 'noopener');

  if (btn) btn.textContent = sentText;
  if (submitBtn) submitBtn.style.background = '#059669';
  setTimeout(() => {
    if (btn) btn.textContent = originalText;
    if (submitBtn) submitBtn.style.background = '';
    form.reset();
  }, 3000);
};

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });