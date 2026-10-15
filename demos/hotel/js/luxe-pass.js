// js/luxe-pass.js — Medidor de seguridad de contraseña
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const CIRC = 113;

  function scorePassword(v) {
    const parts = {
      len: v.length >= 6,
      uc:  /[A-Z]/.test(v),
      lc:  /[a-z]/.test(v),
      num: /[0-9]/.test(v),
      sym: /[^A-Za-z0-9]/.test(v)
    };
    let s = 0;
    if (parts.len) s += Math.min(30, (v.length - 5) * 3);
    if (parts.uc)  s += 15;
    if (parts.lc)  s += 15;
    if (parts.num) s += 20;
    if (parts.sym) s += 20;
    s = Math.max(0, Math.min(100, s));
    let state = 'weak', label = 'Débil';
    if (s >= 75)      { state = 'strong'; label = 'Excelente'; }
    else if (s >= 55) { state = 'good';   label = 'Buena'; }
    else if (s >= 35) { state = 'fair';   label = 'Regular'; }
    return { score: s, state, label, parts };
  }

  function updatePwWidget(v) {
    const pwWidget = $('#pwWidget');
    if (!pwWidget) return;
    const pwFill    = $('#pwFill');
    const pwLabel   = $('#pwLabel');
    const pwRing    = pwWidget.querySelector('.prog');
    const pwTipsLis = [...pwWidget.querySelectorAll('.pw-tips li')];

    const { score, state, label, parts } = scorePassword(v);
    pwWidget.classList.remove('weak','fair','good','strong');
    pwWidget.classList.add(state);
    if (pwLabel) pwLabel.textContent = v ? `Seguridad: ${label}` : 'Seguridad: —';
    if (pwFill)  pwFill.style.width = `${score}%`;
    if (pwRing)  pwRing.style.strokeDashoffset = String(CIRC - (CIRC * score / 100));
    pwTipsLis.forEach(li => {
      li.classList.toggle('is-ok', !!parts[li.dataset.k]);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const modal = $('#luxeAuth');
    modal?.addEventListener('click', (e) => {
      const btn = e.target.closest('.luxe-eye');
      if (!btn) return;
      const input = btn.previousElementSibling;
      if (input) input.type = (input.type === 'password' ? 'text' : 'password');
    });

    const pwInput = $('#luxeRegister input[name="password"]');
    pwInput?.addEventListener('input', (e) => updatePwWidget(e.target.value));
  });
})();
