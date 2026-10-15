(() => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const CDN_BASE = "https://raw.githubusercontent.com/heiling-18/proyecto_Java_script_Hotel/main/image/";
  const fixImgUrl = (url) => {
    if (!url) return CDN_BASE + "habitacion1.jpg";
    if (url.startsWith("http")) return url;
    return CDN_BASE + url.replace(/^\/?image\//, "");
  };

  const checkin    = document.getElementById("checkin");
  const checkout   = document.getElementById("checkout");
  const guests     = document.getElementById("guests");
  const citySel    = document.getElementById("city");

  const nightsChip = document.getElementById("rbNights");
  const grid       = document.getElementById("resultsGrid");
  const resMsg     = document.getElementById("resMsg");
  const resTitle   = document.getElementById("resTitle");
  const resSubtitle= document.getElementById("resSubtitle");

  const overlay    = document.getElementById("resOverlay");
  const drawer     = overlay?.querySelector(".res-drawer");
  const bodyDrawer = document.getElementById("resvBody");
  const btnClose   = document.getElementById("resClose");
  const btnCancel  = document.getElementById("resCancel");
  const btnConfirm = document.getElementById("resConfirm");
  if (btnConfirm) btnConfirm.textContent = "Sí";

  function showLoginOverDrawer(){
    overlay?.classList.add('auth-on-top');
    window.ErcAuth?.openLogin?.();
    const cleanup = () => overlay?.classList.remove('auth-on-top');
    window.addEventListener('auth:login',  cleanup, { once:true });
    window.addEventListener('auth:logout', cleanup, { once:true });
  }

  const demoRooms = [
    { id:"r1", city:"Cartagena",   name:"Suite Vista al Mar", type:"Suite", capacity:2, stars:5, image:CDN_BASE + "habitacion1.jpg",
      features:{ beds:1, wifi:true, minibar:true, hotTub:true, balcony:true, ac:true, breakfast:true },
      sizeM2:48, view:"Mar", priceNow:612000, priceOld:1020000 },
    { id:"r2", city:"Medellín",    name:"Junior Suite Jardín", type:"Junior Suite", capacity:3, stars:4, image:CDN_BASE + "habitacion2.jpg",
      features:{ beds:2, wifi:true, minibar:true, hotTub:false, balcony:true, ac:true, breakfast:true },
      sizeM2:40, view:"Jardín", priceNow:429000, priceOld:858000 },
    { id:"r3", city:"Bogotá",      name:"Deluxe King", type:"Deluxe", capacity:2, stars:4, image:CDN_BASE + "habitacion3.jpg",
      features:{ beds:1, wifi:true, minibar:true, hotTub:false, balcony:false, ac:true, breakfast:false },
      sizeM2:32, view:"Ciudad", priceNow:355000, priceOld:718000 },
    { id:"r4", city:"Santa Marta", name:"Doble Estándar", type:"Estándar", capacity:4, stars:3, image:CDN_BASE + "habitacion4.jpg",
      features:{ beds:2, wifi:true, minibar:false, hotTub:false, balcony:false, ac:true, breakfast:false },
      sizeM2:28, view:"Patio", priceNow:299000, priceOld:598000 }
  ];

  const busy = [
    { roomId:"r1", start:"2025-10-07", end:"2025-10-09" },
    { roomId:"r1", start:"2025-12-24", end:"2025-12-27" },
    { roomId:"r2", start:"2025-10-10", end:"2025-10-14" },
    { roomId:"r3", start:"2025-10-08", end:"2025-10-09" },
    { roomId:"r4", start:"2025-10-20", end:"2025-10-23" }
  ];

  const LS_ROOMS = 'erc_rooms';
  const getLSRooms = () => {
    try {
      const v = JSON.parse(localStorage.getItem(LS_ROOMS) || "[]");
      return Array.isArray(v) ? v.map(r => ({ ...r, image: fixImgUrl(r.image) })) : [];
    } catch { return []; }
  };

  function allRooms(){
    const raw = [...demoRooms, ...getLSRooms()];
    const map = new Map();
    for (const r of raw) {
      if (!r || typeof r !== 'object') continue;
      const id  = String(r.id || '').trim();
      const key = id || `${String(r.city||'').trim()}|${String(r.name||'').trim()}`;
      if (!map.has(key)) map.set(key, { ...r, image: fixImgUrl(r.image) });
    }
    return [...map.values()];
  }

  window.__ERC_ROOMS = allRooms();

  const LS_BOOKINGS = "erc_reservas";
  const getBookings   = () => JSON.parse(localStorage.getItem(LS_BOOKINGS) || "[]");
  const saveBookings  = (arr) => localStorage.setItem(LS_BOOKINGS, JSON.stringify(arr));

  const toISO = (d) => {
    const dt = new Date(d);
    dt.setHours(12,0,0,0);
    const y = dt.getFullYear();
    const m = String(dt.getMonth()+1).padStart(2,"0");
    const day = String(dt.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  };
  const parseLocal  = (s) => (s ? new Date(`${s}T12:00:00`) : null);
  const diffDays    = (a,b) => Math.round((b-a) / 86400000);
  const formatCOP   = (n) => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
  const starsHTML   = (n) => "★".repeat(n) + "☆".repeat(5-n);
  const overlap     = (A,B,C,D) => (A < D) && (C < B);

  function isRoomFree(roomId, start, end){
    for (const b of busy.filter(x=>x.roomId===roomId)){
      if (overlap(start, end, parseLocal(b.start), parseLocal(b.end))) return false;
    }
    for (const r of getBookings().filter(x=>x.roomId===roomId)){
      const rs = new Date(r.start), re = new Date(r.end);
      if (overlap(start, end, rs, re)) return false;
    }
    return true;
  }

  function renderNightsChip(){
    const a = parseLocal(checkin.value);
    const b = parseLocal(checkout.value);
    const n = (a && b) ? diffDays(a,b) : 0;
    if(n > 0){
      nightsChip.hidden = false;
      nightsChip.textContent = `${n} noche${n>1?"s":""}`;
    } else {
      nightsChip.hidden = true;
      nightsChip.textContent = "—";
    }
  }

  const today = new Date(); today.setHours(12,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const isoToday = toISO(today);
  checkin.min  = isoToday;
  checkout.min = isoToday;
  if (!checkin.value) checkin.value = isoToday;
  if (!checkout.value) checkout.value = toISO(tomorrow);

  checkin.addEventListener("change", () => {
    const inD = parseLocal(checkin.value);
    if(inD){
      const minOut = new Date(inD); minOut.setDate(minOut.getDate()+1);
      checkout.min = toISO(minOut);
      const outD = parseLocal(checkout.value);
      if(!outD || outD <= inD){ checkout.value = checkout.min; }
    }
    renderNightsChip();
  });
  checkout.addEventListener("change", renderNightsChip);
  renderNightsChip();

  function populateCities(){
    if (!citySel) return;
    const cityList = window.__ERC_ROOMS
      .map(r => String(r.city ?? '').trim())
      .filter(Boolean);
    const cities = [...new Set(cityList)].sort((a,b)=>a.localeCompare(b,'es'));
    citySel.innerHTML =
      `<option value="all" selected>Todas las ciudades</option>` +
      cities.map(c => `<option value="${c}">${c}</option>`).join('');
  }
  populateCities();

  const makeCard = (r, nights) => {
    const f = r.features || {};
    const total = r.priceNow * nights;
    const bedsTxt = `${f.beds || 1} ${f.beds === 1 ? "cama" : "camas"}`;
    const paxTxt  = `${r.capacity} ${r.capacity === 1 ? "huésped" : "huéspedes"}`;

    return `
      <article class="res-card" data-id="${r.id}">
        <div class="res-media">
          <img src="${fixImgUrl(r.image)}" alt="${r.name}" loading="lazy" />
          <span class="res-badge">${starsHTML(r.stars)}</span>
        </div>
        <div class="res-body">
          <h3 class="res-title">${r.name}</h3>
          <p class="res-sub">${r.city || '-'} · ${r.type} · ${paxTxt} · ${r.sizeM2} m² · Vista ${r.view}</p>
          <div class="res-features">
            <span>${bedsTxt}</span>
            ${f.wifi ? `<span>· Wi-Fi</span>` : ""}
            ${f.minibar ? `<span>· Minibar</span>` : ""}
            ${f.hotTub ? `<span>· Jacuzzi</span>` : ""}
            ${f.breakfast ? `<span>· Desayuno</span>` : ""}
          </div>
          <div class="res-price">
            <div>
              <div class="price-now">${formatCOP(r.priceNow)} / noche</div>
              <div class="price-old">${formatCOP(r.priceOld)}</div>
            </div>
            <button class="res-cta" type="button" data-book="${r.id}" data-nights="${nights}">
              Reservar · ${formatCOP(total)}
            </button>
          </div>
        </div>
      </article>`;
  };

  function renderResults(list, nights){
    grid.innerHTML = "";
    resMsg.textContent = "";
    if(!list.length){
      resMsg.textContent = "No hay disponibilidad para esas fechas. Prueba con otras fechas o cambia de ciudad.";
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach(r => {
      const wrap = document.createElement("div");
      wrap.innerHTML = makeCard(r, nights);
      frag.appendChild(wrap.firstElementChild);
    });
    grid.appendChild(frag);
  }

  function searchAvailability(e){
    e?.preventDefault();
    const inD  = parseLocal(checkin.value);
    const outD = parseLocal(checkout.value);
    const pax  = parseInt(guests.value || "1", 10);
    const cty  = citySel?.value || "all";

    if(!inD || !outD){ resMsg.textContent = "Selecciona fechas de entrada y salida."; return; }
    const nights = diffDays(inD, outD);
    if(nights <= 0){ resMsg.textContent = "La fecha de salida debe ser posterior a la de entrada."; return; }

    const cityTxt = (cty === "all" ? "todas las ciudades" : cty);
    resTitle.textContent = "Disponibilidad";
    resSubtitle.textContent = `Del ${toISO(inD)} al ${toISO(outD)} · ${nights} noche${nights>1?"s":""} · ${pax} persona${pax>1?"s":""} · en ${cityTxt}`;

    const avail = window.__ERC_ROOMS.filter(r =>
      r.capacity >= pax &&
      (cty === "all" || r.city === cty) &&
      isRoomFree(r.id, inD, outD)
    );
    renderResults(avail, nights);
  }

  form.addEventListener("submit", searchAvailability);
  citySel?.addEventListener('change', searchAvailability);
  searchAvailability();

  function showToast(msg){
    let t = document.getElementById("appToast");
    if(!t){
      t = document.createElement("div");
      t.id = "appToast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._hide);
    t._hide = setTimeout(()=> t.classList.remove("show"), 2200);
  }

  let selected = null;

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-book]");
    if (!btn) return;
    e.preventDefault();
    openDrawerFor(btn);
  });

  function openDrawerFor(btn){
    const id = btn.getAttribute("data-book");
    const nights = parseInt(btn.getAttribute("data-nights"), 10) || 1;
    const room = window.__ERC_ROOMS.find(r => r.id === id);
    if(!room || !overlay || !drawer || !bodyDrawer) return;

    const inD  = parseLocal(checkin.value);
    const outD = parseLocal(checkout.value);
    if (!inD || !outD) { showToast("Selecciona fechas antes de reservar."); return; }

    selected = {
      room,
      nights,
      inD,
      outD,
      pax:  parseInt(guests.value || "1", 10),
      total: room.priceNow * nights
    };

    bodyDrawer.innerHTML = `
      <div class="resv-room">
        <img class="resv-img" src="${fixImgUrl(room.image)}" alt="${room.name}" />
        <div class="resv-info">
          <h4>${room.name}</h4>
          <p>${room.city} · ${room.type} · ${room.capacity} huésped(es) · ${room.sizeM2} m² · Vista ${room.view}</p>
        </div>
      </div>

      <div class="resv-summary">
        <div><span>Entrada</span><strong>${checkin.value}</strong></div>
        <div><span>Salida</span><strong>${checkout.value}</strong></div>
        <div><span>Ciudad</span><strong>${room.city}</strong></div>
        <div><span>Huéspedes</span><strong>${selected.pax}</strong></div>
        <div><span>Noches</span><strong>${selected.nights}</strong></div>
        <div class="total">
          <span>Total a pagar</span>
          <span class="resv-total">${formatCOP(selected.total)} COP</span>
        </div>
      </div>
    `;

    overlay.hidden = false;
    requestAnimationFrame(()=> drawer.classList.add("is-open"));
  }

  function closeDrawer(){
    drawer?.classList.remove("is-open");
    setTimeout(()=> overlay.hidden = true, 160);
    selected = null;
  }
  btnClose?.addEventListener("click", closeDrawer);
  btnCancel?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", (e)=> { if (e.target === overlay) closeDrawer(); });

  btnConfirm?.addEventListener("click", () => {
    if (!selected) return;
    const ses = window.ErcAuth?.getSession?.();
    if (!ses) {
      showToast("Debes iniciar sesión para confirmar tu reserva.");
      showLoginOverDrawer();
      return;
    }

    const r = selected.room;
    const booking = {
      id: String(Date.now()),
      roomId: r.id,
      roomName: r.name,
      snapshot: { ...r, image: fixImgUrl(r.image) },
      userEmail: ses?.email || null,
      userName:  ses?.name  || null,
      pricePerNight: r.priceNow,
      total: selected.total,
      guests: selected.pax,
      start: selected.inD.toISOString(),
      end:   selected.outD.toISOString(),
      createdAt: new Date().toISOString(),
      status: "confirmada"
    };

    const all = getBookings();
    all.push(booking);
    saveBookings(all);

    showToast("¡Reserva confirmada!");
    resMsg.textContent = "¡Reserva confirmada! La verás en Mis reservas.";
    closeDrawer();
    searchAvailability();
  });
})();
