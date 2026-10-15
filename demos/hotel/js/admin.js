(() => {
  'use strict';

  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const LS_ROOMS    = 'erc_rooms';
  const LS_BOOKINGS = 'erc_reservas';

  const getRoomsRaw  = () => { try { return JSON.parse(localStorage.getItem(LS_ROOMS) || '[]'); } catch { return []; } };
  const getBookings  = () => { try { return JSON.parse(localStorage.getItem(LS_BOOKINGS) || '[]'); } catch { return []; } };

  const formatCOP = (n) => new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(Number(n)||0);
  const toISO     = (d) => { const dt = new Date(d); dt.setHours(12,0,0,0); return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`; };
  const fmtDate   = (iso) => { try { return toISO(new Date(iso)); } catch { return iso || '—'; } };
  const diffDays  = (a,b) => Math.round((b-a)/86400000);

  const tabButtons = $$('.tabs .tab');
  const sections   = { rooms: $('#tab-rooms'), bookings: $('#tab-bookings') };
  const roomsTbody    = $('#roomsTable tbody');
  const bookingsTbody = $('#bookingsTable tbody');

  function activateTab(name){
    tabButtons.forEach(b=>{
      const on = b.dataset.tab === name;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    Object.entries(sections).forEach(([key,sec])=>{
      sec?.classList.toggle('is-active', key===name);
    });
  }
  tabButtons.forEach(btn=> btn.addEventListener('click', ()=> activateTab(btn.dataset.tab)));

  function renderRooms(){
    if (!roomsTbody) return;
    const rooms = getRoomsRaw();
    roomsTbody.innerHTML = rooms.length
      ? rooms.map(r=>`
        <tr>
          <td title="${r.id}">${(r.id||'').slice(0,8)||'—'}</td>
          <td>${r.city||'Cartagena'}</td>
          <td>${r.name||'—'}</td>
          <td>${r.type||'—'}</td>
          <td>${r.capacity||'—'}</td>
          <td>${r.stars?'★'.repeat(r.stars):'—'}</td>
          <td>${r.sizeM2||'—'}</td>
          <td>${r.view||'—'}</td>
          <td>${formatCOP(r.priceNow)}</td>
          <td>Activo</td>
        </tr>`).join('')
      : `<tr><td colspan="10" style="text-align:center;padding:1.5rem;opacity:.5">No hay habitaciones</td></tr>`;
  }

  function renderBookings(){
    if (!bookingsTbody) return;
    const bookings = getBookings();
    bookingsTbody.innerHTML = bookings.length
      ? bookings.map(b=>{
          const nights = (()=>{ try{ return diffDays(new Date(b.start),new Date(b.end)); }catch{ return '—'; }})();
          return `
            <tr>
              <td>${(b.id||'').slice(0,8)}</td>
              <td>${b.roomName||'—'}</td>
              <td>${b.snapshot?.city||'Cartagena'}</td>
              <td>${b.userName||'—'}</td>
              <td>${b.userEmail||'—'}</td>
              <td>${fmtDate(b.start)}</td>
              <td>${fmtDate(b.end)}</td>
              <td>${nights}</td>
              <td>${formatCOP(b.total)}</td>
              <td>Confirmada</td>
            </tr>`;
        }).join('')
      : `<tr><td colspan="10" style="text-align:center;padding:1.5rem;opacity:.5">No hay reservas</td></tr>`;
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    activateTab('rooms');
    renderRooms();
    renderBookings();
  });
})();
