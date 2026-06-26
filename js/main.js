// main.js — typed text, reveal, skill bars, form, avatar, loader

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

// ===== TYPED TEXT =====
let typedRoles = ['Desarrolladora Web', 'Fullstack en progreso', 'Diseño + Lógica', 'Construyendo Tecnología'];
let ri = 0, ci = 0, deleting = false, typedTimer = null;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const word = typedRoles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; typedTimer = setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % typedRoles.length; }
  }
  typedTimer = setTimeout(type, deleting ? 50 : 90);
}

window.restartTyped = function(roles) {
  clearTimeout(typedTimer);
  typedRoles = roles;
  ri = 0; ci = 0; deleting = false;
  type();
};

type();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BARS =====
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

// ===== CONTACT FORM =====
window.handleSubmit = function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  const sentText = window.getT ? window.getT('form_sent') : '✓ Sent';
  btn.textContent = sentText;
  btn.style.background = '#059669';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
};

// ===== AVATAR UPLOAD =====
const avatarInput = document.getElementById('avatar-input');
const avatarEl = document.getElementById('avatar-display');
if (avatarInput && avatarEl) {
  avatarInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      avatarEl.innerHTML = `<img src="${e.target.result}" alt="Foto de perfil">`;
    };
    reader.readAsDataURL(file);
  });
}

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--purple-light)';
    }
  });
});