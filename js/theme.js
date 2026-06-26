// theme.js — dark / light mode
(function() {
  const btn = document.getElementById('theme-btn');
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
  }

  window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };
})();