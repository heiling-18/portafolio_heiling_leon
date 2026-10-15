(() => {
  const HOTEL = {
    lat: 10.3910,
    lng: -75.4794,
    name: 'El Rincón del Carmen',
    address: 'Calle 123 # 4-56, Barrio Centro Histórico',
    phone: '+573001112233',
    email: 'hola@rincondelcarmen.com'
  };

  function toast(msg) {
    let t = document.getElementById('appToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'appToast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const icHowTo = document.getElementById('icHowTo');
    const telLink = document.getElementById('telLink');
    const waLink = document.getElementById('waLink');
    const mailLink = document.getElementById('mailLink');
    const addrTxt = document.getElementById('addrTxt');
    const gmapsLink = document.getElementById('gmapsLink');
    const wazeLink = document.getElementById('wazeLink');
    const btnDirections = document.getElementById('btnDirections');

    if (icHowTo) icHowTo.href = `https://www.google.com/maps/dir/?api=1&destination=${HOTEL.lat},${HOTEL.lng}`;
    if (telLink) telLink.href = `tel:${HOTEL.phone}`;
    if (waLink) waLink.href = `https://wa.me/${HOTEL.phone.replace(/\D/g, '')}`;
    if (mailLink) mailLink.href = `mailto:${HOTEL.email}`;
    if (addrTxt) addrTxt.textContent = HOTEL.address;
    if (gmapsLink) gmapsLink.href = `https://www.google.com/maps/search/?api=1&query=${HOTEL.lat},${HOTEL.lng}`;
    if (wazeLink) wazeLink.href = `https://waze.com/ul?ll=${HOTEL.lat},${HOTEL.lng}&navigate=yes`;

    if (btnDirections) {
      btnDirections.addEventListener('click', () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${HOTEL.lat},${HOTEL.lng}`, '_blank', 'noopener');
      });
    }

    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const selector = btn.getAttribute('data-copy');
        const target = selector && document.querySelector(selector);
        const value = target?.textContent?.trim();
        if (!value) return;
        navigator.clipboard?.writeText(value).then(() => toast('Copiado'));
      });
    });

    const els = [...document.querySelectorAll('[data-reveal]')];
    els.forEach(el => el.classList.add('is-revealed'));
  });
})();
