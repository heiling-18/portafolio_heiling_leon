(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const LS_USERS   = 'erc_users';
  const LS_SESSION = 'erc_session';

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(LS_USERS)) || []; }
    catch { return []; }
  };
  const saveUsers = (arr) => localStorage.setItem(LS_USERS, JSON.stringify(arr));

  const getSession = () => {
    try {
      const s = JSON.parse(sessionStorage.getItem(LS_SESSION) || localStorage.getItem(LS_SESSION)) || null;
      if (s && s.role) s.role = normalizeRole(s.role);
      return s;
    } catch { return null; }
  };
  const saveSession = (obj, remember = false) => {
    const str = JSON.stringify(obj);
    sessionStorage.removeItem(LS_SESSION);
    localStorage.removeItem(LS_SESSION);
    (remember ? localStorage : sessionStorage).setItem(LS_SESSION, str);
  };
  const clearSession = () => {
    sessionStorage.removeItem(LS_SESSION);
    localStorage.removeItem(LS_SESSION);
  };

  const roleFromEmail = (email = '') => (/^admin@/i.test(String(email)) ? 'admin' : 'user');
  const normalizeRole = (r) => (String(r || 'user').toLowerCase() === 'abmin'
    ? 'admin'
    : String(r || 'user').toLowerCase());

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  async function weakHash(str) {
    if (window.crypto?.subtle) {
      const enc = new TextEncoder().encode(str);
      const buf = await crypto.subtle.digest('SHA-256', enc);
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    }
    try { return btoa(unescape(encodeURIComponent(str))); }
    catch { return str; }
  }

  async function seedAdmin() {
    const users = getUsers();
    const targetEmail = 'admin@hotelrincondelcarmen.com';
    const exists = users.some(u => (u.email || '').toLowerCase() === targetEmail);
    if (!exists) {
      const pass = await weakHash('Admin123!');
      users.push({ name: 'Admin', email: targetEmail, role: 'admin', pass, createdAt: Date.now() });
      saveUsers(users);
    }
  }

  const setMsg = (el, text = '', cls = '') => {
    if (!el) return;
    el.textContent = text;
    el.className = 'luxe-msg' + (cls ? ` ${cls}` : '');
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const modal       = $('#luxeAuth');
    const card        = modal?.querySelector('.luxe-auth__card');
    const btnCloseEls = $$('[data-close]', modal ?? document);
    const goRegister  = $('#goRegister');
    const goLogin     = $('#goLogin');
    const fLogin      = $('#luxeLogin');
    const fReg        = $('#luxeRegister');
    const msgLogin    = $('#luxeLoginMsg');
    const msgReg      = $('#luxeRegMsg');

    const cleanMsgs = () => { setMsg(msgLogin); setMsg(msgReg); };

    const openModal = (register = false) => {
      if (!modal || !card) return;
      card.classList.toggle('is-register', !!register);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      cleanMsgs();
      fLogin?.reset();
      fReg?.reset();
    };

    btnCloseEls.forEach(b => b.addEventListener('click', closeModal));
    modal?.addEventListener('click', (e) => {
      if (e.target.matches('.luxe-auth__overlay')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
    });

    goRegister?.addEventListener('click', () => { cleanMsgs(); card?.classList.add('is-register'); });
    goLogin?.addEventListener('click',    () => { cleanMsgs(); card?.classList.remove('is-register'); });

    const btn = document.getElementById('btnLogin');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(false);
      });
    }

    fLogin?.addEventListener('submit', async (e) => {
      e.preventDefault();
      cleanMsgs();

      const fd       = new FormData(fLogin);
      const email    = (fd.get('email')    || '').toString().trim().toLowerCase();
      const pass     = (fd.get('password') || '').toString();
      const remember = !!fd.get('remember');

      if (!isEmail(email) || !pass) return setMsg(msgLogin, 'Revisa correo/contraseña.', 'err');

      const users = getUsers();
      const user  = users.find(u => (u.email || '').toLowerCase() === email);
      if (!user) return setMsg(msgLogin, 'Usuario no encontrado.', 'err');

      const hash = await weakHash(pass);
      if (user.pass !== hash) return setMsg(msgLogin, 'Contraseña incorrecta.', 'err');

      const role = normalizeRole(user.role || roleFromEmail(user.email));
      const sessionObj = { name: user.name, email: user.email, role, ts: Date.now() };
      saveSession(sessionObj, remember);
      setMsg(msgLogin, '¡Bienvenido!', 'ok');

      updateHeaderUI();
      window.dispatchEvent(new CustomEvent('auth:login', { detail: sessionObj }));
      setTimeout(closeModal, 500);
    });

    fReg?.addEventListener('submit', async (e) => {
      e.preventDefault();
      cleanMsgs();

      const fd    = new FormData(fReg);
      const name  = (fd.get('name')     || '').toString().trim();
      const email = (fd.get('email')    || '').toString().trim().toLowerCase();
      const pass  = (fd.get('password') || '').toString();
      const terms = !!fd.get('terms');

      if (!name || !email || !pass || !terms) return setMsg(msgReg, 'Completa todos los campos y acepta los términos.', 'err');
      if (!isEmail(email))   return setMsg(msgReg, 'Correo no válido.', 'err');
      if (pass.length < 6)   return setMsg(msgReg, 'La contraseña debe tener al menos 6 caracteres.', 'err');

      const users = getUsers();
      if (users.some(u => (u.email || '').toLowerCase() === email))
        return setMsg(msgReg, 'Ya existe una cuenta con ese correo.', 'err');

      const hash = await weakHash(pass);
      const role = normalizeRole(roleFromEmail(email));
      users.push({ name, email, role, pass: hash, createdAt: Date.now() });
      saveUsers(users);

      const sessionObj = { name, email, role, ts: Date.now() };
      saveSession(sessionObj, true);
      setMsg(msgReg, '¡Cuenta creada! Conectando…', 'ok');

      updateHeaderUI();
      window.dispatchEvent(new CustomEvent('auth:register', { detail: sessionObj }));
      window.dispatchEvent(new CustomEvent('auth:login',    { detail: sessionObj }));
      setTimeout(closeModal, 700);
    });

    window.addEventListener('open-auth',     () => openModal(false));
    window.addEventListener('open-register', () => openModal(true));

    await seedAdmin();
    updateHeaderUI();
  });

  function updateHeaderUI() {
    const s = getSession();
    const loginBtn = document.getElementById('btnLogin');
    if (!loginBtn || !s) return;

    const firstName = (s.name || 'Tu cuenta').trim().split(/\s+/)[0];
    const initials  = s.name
      ? s.name.trim().split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase() || '').join('')
      : 'RC';

    loginBtn.outerHTML = `
      <div class="auth-mini" id="authMini">
        <button class="auth-user" id="btnUser" aria-expanded="false" aria-haspopup="menu">
          <span class="auth-avatar" aria-hidden="true">${initials}</span>
          <span class="auth-label">${firstName.toLowerCase()}</span>
          <svg class="auth-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="auth-menu" id="miniMenu" role="menu" hidden>
          <div class="auth-menu__header">
            <span class="auth-avatar" aria-hidden="true">${initials}</span>
            <div class="auth-id">
              <strong>${s.name || 'Tu cuenta'}${s.role === 'admin' ? ' · <small style="color:#22c55e">Admin</small>' : ''}</strong>
              <small>${s.email}</small>
            </div>
          </div>
          ${s.role === 'admin' ? `<a href="admin.html" class="auth-menu__item" role="menuitem">Admin</a>` : ''}
          <a href="reservas.html" class="auth-menu__item" role="menuitem">Mis reservas</a>
          <button class="auth-menu__item danger" id="btnLogout" role="menuitem">Cerrar sesión</button>
        </div>
      </div>
    `;

    const userBtn = document.getElementById('btnUser');
    const menu    = document.getElementById('miniMenu');

    const showMenu = (show) => {
      const willShow = typeof show === 'boolean' ? show : menu.hidden;
      menu.hidden = !willShow;
      userBtn.setAttribute('aria-expanded', String(willShow));
    };

    userBtn?.addEventListener('click', (e) => { e.stopPropagation(); showMenu(menu.hidden); });
    document.addEventListener('click', (ev) => { if (!ev.target.closest('#authMini') && !menu.hidden) showMenu(false); });
    document.getElementById('btnLogout')?.addEventListener('click', () => {
      clearSession();
      location.href = 'index.html';
    });
  }

  window.ErcAuth = {
    getSession,
    clearSession,
    saveSession,
    openLogin:    () => window.dispatchEvent(new Event('open-auth')),
    openRegister: () => window.dispatchEvent(new Event('open-register')),
  };
})();
