(() => {
  const track =
    document.getElementById("roomsTrack") ||
    document.getElementById("hotelsTrack");
  if (!track) return;

  const CDN_BASE = "https://raw.githubusercontent.com/heiling-18/proyecto_Java_script_Hotel/main/image/";
  const fixImgUrl = (url) => {
    if (!url) return CDN_BASE + "habitacion1.jpg";
    if (url.startsWith("http")) return url;
    return CDN_BASE + url.replace(/^\/?image\//, "");
  };

  const DEFAULT_ROOMS = [
    {
      id: "r1",
      name: "Suite Vista al Mar",
      type: "Suite",
      capacity: 2,
      rating: 9.2,
      stars: 5,
      image: CDN_BASE + "habitacion1.jpg",
      features: { beds: 1, wifi: true, minibar: true, hotTub: true, balcony: true, ac: true, breakfast: true },
      sizeM2: 48,
      view: "Mar",
      priceNow: 612000, priceOld: 1020000, discount: 40,
      refDate: "25 octubre 2025"
    },
    {
      id: "r2",
      name: "Junior Suite Jardín",
      type: "Junior Suite",
      capacity: 3,
      rating: 8.6,
      stars: 4,
      image: CDN_BASE + "habitacion2.jpg",
      features: { beds: 2, wifi: true, minibar: true, hotTub: false, balcony: true, ac: true, breakfast: true },
      sizeM2: 40,
      view: "Jardín",
      priceNow: 429000, priceOld: 858000, discount: 50,
      refDate: "8 octubre 2025"
    },
    {
      id: "r3",
      name: "Deluxe King",
      type: "Deluxe",
      capacity: 2,
      rating: 8.9,
      stars: 4,
      image: CDN_BASE + "habitacion3.jpg",
      features: { beds: 1, wifi: true, minibar: true, hotTub: false, balcony: false, ac: true, breakfast: false },
      sizeM2: 32,
      view: "Ciudad",
      priceNow: 355000, priceOld: 718000, discount: 51,
      refDate: "20 diciembre 2025"
    },
    {
      id: "r4",
      name: "Doble Estándar",
      type: "Estándar",
      capacity: 4,
      rating: 8.1,
      stars: 3,
      image: CDN_BASE + "habitacion4.jpg",
      features: { beds: 2, wifi: true, minibar: false, hotTub: false, balcony: false, ac: true, breakfast: false },
      sizeM2: 28,
      view: "Patio",
      priceNow: 299000, priceOld: 598000, discount: 50,
      refDate: "17 octubre 2025"
    }
  ];

  (function syncToStorage() {
    try {
      const stored = JSON.parse(localStorage.getItem("erc_rooms") || "[]").map(r => ({
        ...r,
        image: fixImgUrl(r.image)
      }));
      const storedIds = new Set(stored.map((r) => r.id));
      const toAdd = DEFAULT_ROOMS.filter((r) => !storedIds.has(r.id));
      const merged = stored.length === 0 ? DEFAULT_ROOMS : [...stored, ...toAdd];
      localStorage.setItem("erc_rooms", JSON.stringify(merged));
    } catch (e) {
      console.warn("[hotel.js] No se pudo sincronizar erc_rooms:", e);
    }
  })();

  let rooms;
  try {
    const stored = JSON.parse(localStorage.getItem("erc_rooms") || "[]").map(r => ({
      ...r,
      image: fixImgUrl(r.image)
    }));
    rooms = stored.length > 0 ? stored : DEFAULT_ROOMS;
  } catch {
    rooms = DEFAULT_ROOMS;
  }

  const formatCOP = (n) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(n);

  const starsHTML = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  const nextBtn = track.querySelector(".track-arrow.next");
  const prevBtn = track.querySelector(".track-arrow.prev");

  const makeCard = (r) => {
    const f = r.features || {};
    const bedsTxt = `${f.beds || 1} ${f.beds === 1 ? "cama" : "camas"}`;
    const paxTxt = `${r.capacity} ${r.capacity === 1 ? "huésped" : "huéspedes"}`;
    const discount = r.discount || (r.priceOld > r.priceNow
      ? Math.round((1 - r.priceNow / r.priceOld) * 100)
      : 0);
    const refDate = r.refDate || "";
    const rating  = r.rating  || "";

    return `
      <article class="hotel-card room-card" data-id="${r.id}">
        <div class="hotel-media">
          <img src="${fixImgUrl(r.image)}" alt="${r.name}" loading="lazy">
          ${rating ? `<span class="hotel-chip chip-score" title="Calificación">${Number(r.rating).toFixed(1)}</span>` : ""}
          <span class="hotel-chip chip-stars" title="Categoría">${starsHTML(r.stars)}</span>
          <span class="hotel-chip chip-view" title="Vista">${r.view}</span>
        </div>

        <div class="hotel-body">
          <h3 class="hotel-title">${r.name}</h3>
          <p class="hotel-sub">${r.type} · ${paxTxt} · ${r.sizeM2} m²</p>

          <div class="hotel-features">
            <span class="feature"><i class="fi fi-bed"></i>${bedsTxt}</span>
            ${f.wifi      ? `<span class="feature"><i class="fi fi-wifi"></i>Wi-Fi</span>`       : ""}
            ${f.minibar   ? `<span class="feature"><i class="fi fi-mini"></i>Minibar</span>`     : ""}
            ${f.hotTub    ? `<span class="feature"><i class="fi fi-hot-tub"></i>Jacuzzi</span>`  : ""}
          </div>

          <div class="price-block">
            <div>
              <div class="price-now">${formatCOP(r.priceNow)}</div>
              ${r.priceOld && r.priceOld > r.priceNow
                ? `<div class="price-old">${formatCOP(r.priceOld)}</div>` : ""}
            </div>
            ${discount ? `<div class="discount-badge">-${discount}%</div>` : ""}
          </div>

          <div class="card-actions">
            ${refDate ? `<div class="ref-date">Fecha de referencia: ${refDate}</div>` : ""}
            <button class="btn-card" data-book="${r.id}">Reservar</button>
          </div>
        </div>
      </article>`;
  };

  const frag = document.createDocumentFragment();
  const insertBeforeNode = nextBtn || null;

  rooms.forEach((r) => {
    const wrap = document.createElement("div");
    wrap.innerHTML = makeCard(r);
    frag.appendChild(wrap.firstElementChild);
  });

  track.insertBefore(frag, insertBeforeNode);

  track.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book]");
    if (!btn) return;

    const id   = btn.getAttribute("data-book");
    const room = rooms.find((r) => r.id === id);
    if (!room) return;

    localStorage.setItem("rb_preselect", JSON.stringify({
      id: room.id, name: room.name, type: room.type,
      capacity: room.capacity, rating: room.rating, stars: room.stars,
      image: fixImgUrl(room.image), features: room.features, sizeM2: room.sizeM2,
      view: room.view, priceNow: room.priceNow, priceOld: room.priceOld,
      discount: room.discount, refDate: room.refDate
    }));

    window.location.href = "reservas.html#preselect";
  });
})();
