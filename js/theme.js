// theme.js — dark / light mode with crisp SVG icons (no emojis)
(function() {
  const sunSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
  const moonSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  const btn = document.getElementById('theme-btn');
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (btn) btn.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
    localStorage.setItem('theme', theme);
  }

  window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };
})();