// app.js — utilidades globales de la UI
(() => {
  'use strict';

  const doc = document;
  const $  = (s, root = doc) => root.querySelector(s);
  const $$ = (s, root = doc) => Array.from(root.querySelectorAll(s));

  const header = $('.site-header');
  const setHeaderHeight = () => {
    const h = header ? header.offsetHeight : 64;
    document.documentElement.style.setProperty('--header-height', `${h}px`);
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight, { passive: true });

  const toggle = $('.nav-toggle');
  const nav    = $('.nav');

  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };
    const openNav = () => {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    };
    const toggleNav = () => (nav.classList.contains('open') ? closeNav() : openNav());

    toggle.addEventListener('click', toggleNav);
    doc.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
    $$('.nav a').forEach((a) => a.addEventListener('click', closeNav));
  }

  (() => {
    const cards = $$('.service-card');
    if (!cards.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add('is-visible');
            io.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    cards.forEach((el) => io.observe(el));
  })();
})();

/* ===== Footer: construir mapa del sitio ===== */
(() => {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  const pagesEl    = $('#footPages');
  const sectionsEl = $('#footSections');
  const quickEl    = $('#footQuick');

  const pretty = (str) => {
    if (!str) return '';
    return str
      .replace(/[-_]+/g, ' ')
      .replace(/\.\w+$/, '')
      .replace(/^\//, '')
      .replace(/(^|\s)\S/g, s => s.toUpperCase())
      .trim();
  };

  if (pagesEl) {
    const defaultPages = [
      ['index.html', 'Inicio'],
      ['reservas.html', 'Reservas'],
      ['contacto.html', 'Contacto'],
      ['ocupacion.html', 'Reporte']
    ];
    pagesEl.innerHTML = defaultPages
      .map(([href, text]) => `<li><a href="${href}">${text}</a></li>`)
      .join('');
  }

  if (sectionsEl) {
    const sections = $$('section[id]');
    const items = sections.map(sec => {
      const h2 = $('h2, [role="heading"][aria-level="2"]', sec);
      const text = (h2?.textContent || pretty(sec.id) || 'Sección').trim();
      return { href: `#${sec.id}`, text };
    });

    const uniq = [];
    const seen = new Set();
    for (const it of items) {
      if (seen.has(it.href)) continue;
      seen.add(it.href);
      uniq.push(it);
    }

    sectionsEl.innerHTML = uniq
      .map(it => `<li><a href="${it.href}">${it.text}</a></li>`)
      .join('');
  }

  if (quickEl) {
    const menuLinks = $$('.nav a[href]');
    const fast = [];
    menuLinks.forEach(a => {
      const href = a.getAttribute('href');
      const txt  = (a.textContent || '').trim();
      if (href && txt) fast.push({ href, text: txt });
    });

    quickEl.innerHTML = fast
      .map(it => `<li><a href="${it.href}">${it.text}</a></li>`)
      .join('');
  }
})();
