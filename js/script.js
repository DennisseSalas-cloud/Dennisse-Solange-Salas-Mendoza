// Menú móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// Datos de ejemplo de mascotas
const pets = [
  { name: 'Toby', breed: 'Labrador', age: 3, emoji: '🐕', goals: ['pareja', 'paseo'], verified: true },
  { name: 'Luna', breed: 'Pug', age: 2, emoji: '🐶', goals: ['paseo'], verified: false },
  { name: 'Rocky', breed: 'Bulldog', age: 4, emoji: '🐩', goals: ['pareja'], verified: true },
  { name: 'Mia', breed: 'Poodle', age: 1, emoji: '🐕‍🦺', goals: ['paseo'], verified: false },
  { name: 'Max', breed: 'Pastor Alemán', age: 5, emoji: '🐺', goals: ['pareja', 'paseo'], verified: false },
  { name: 'Bella', breed: 'Beagle', age: 2, emoji: '🐾', goals: ['pareja'], verified: true },
];

const petGrid = document.getElementById('petGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
let activeFilter = 'todos';

function goalLabel(goal) {
  return goal === 'pareja' ? 'Busca pareja 💞' : 'Busca paseo 🐕';
}

function renderPets() {
  petGrid.innerHTML = '';

  let visible = pets.filter((pet) =>
    activeFilter === 'todos' ? true : pet.goals.includes(activeFilter)
  );

  if (visible.some((pet) => typeof pet.distanceKm === 'number')) {
    visible = [...visible].sort((a, b) => a.distanceKm - b.distanceKm);
  }

  visible.forEach((pet) => {
    const card = document.createElement('div');
    card.className = 'pet-card';

    const goalTags = pet.goals
      .map((goal) => `<span class="tag ${goal === 'paseo' ? 'tag--paseo' : ''}">${goalLabel(goal)}</span>`)
      .join('');

    const distanceTag = typeof pet.distanceKm === 'number'
      ? `<span class="tag tag--distance">📍 ${pet.distanceKm.toFixed(1)} km de ti</span>`
      : '';

    const verifiedTag = pet.verified
      ? `<span class="tag tag--verified">🏅 Verificado</span>`
      : '';

    card.innerHTML = `
      <div class="pet-card__photo">${pet.emoji}</div>
      <div class="pet-card__body">
        <h3>${pet.name} ${pet.verified ? '🏅' : ''}</h3>
        <p>${pet.breed} · ${pet.age} años</p>
        <div class="pet-card__tags">${verifiedTag}${goalTags}${distanceTag}</div>
        <div class="pet-card__actions">
          <button class="like-btn" data-name="${pet.name}">Me gusta 🐾</button>
        </div>
      </div>
    `;

    petGrid.appendChild(card);
  });

  // Botones de "me gusta"
  petGrid.querySelectorAll('.like-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-liked');
      btn.textContent = btn.classList.contains('is-liked') ? '¡Te gusta! ❤️' : 'Me gusta 🐾';
    });
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    activeFilter = btn.dataset.filter;
    renderPets();
  });
});

renderPets();

// Mascotas cerca de ti (geolocalización)
const locateBtn = document.getElementById('locateBtn');
const locateMessage = document.getElementById('locateMessage');

// Distancia entre dos coordenadas con la fórmula de Haversine (en kilómetros)
function distanceBetween(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthRadiusKm = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Genera una coordenada aleatoria a pocos kilómetros de la del usuario,
// para simular dónde "viven" las mascotas de ejemplo.
function randomNearbyPoint(lat, lon, maxKm) {
  const radiusInDegrees = maxKm / 111; // ~111 km por grado de latitud
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radiusInDegrees;

  return {
    lat: lat + distance * Math.sin(angle),
    lon: lon + distance * Math.cos(angle) / Math.cos((lat * Math.PI) / 180),
  };
}

locateBtn.addEventListener('click', () => {
  if (!('geolocation' in navigator)) {
    locateMessage.textContent = 'Tu navegador no admite geolocalización.';
    locateMessage.className = 'locate__message is-error';
    return;
  }

  locateMessage.textContent = 'Buscando tu ubicación...';
  locateMessage.className = 'locate__message';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      pets.forEach((pet) => {
        const point = randomNearbyPoint(latitude, longitude, 8);
        pet.distanceKm = distanceBetween(latitude, longitude, point.lat, point.lon);
      });

      locateMessage.textContent = '¡Listo! Mostrando las mascotas ordenadas por cercanía a tu ubicación. 🐾';
      locateMessage.className = 'locate__message is-success';
      renderPets();
    },
    (error) => {
      const messages = {
        1: 'Necesitamos permiso para acceder a tu ubicación. Actívalo en tu navegador e inténtalo de nuevo.',
        2: 'No pudimos determinar tu ubicación. Inténtalo de nuevo más tarde.',
        3: 'La búsqueda de tu ubicación tardó demasiado. Inténtalo de nuevo.',
      };

      locateMessage.textContent = messages[error.code] || 'No pudimos acceder a tu ubicación.';
      locateMessage.className = 'locate__message is-error';
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

// Formulario de registro
const petForm = document.getElementById('petForm');
const formMessage = document.getElementById('formMessage');

petForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const petName = document.getElementById('petName').value.trim();
  const goals = [...petForm.querySelectorAll('input[name="goal"]:checked')].map((el) => el.value);

  if (goals.length === 0) {
    formMessage.textContent = 'Selecciona al menos una opción: pareja o paseo.';
    return;
  }

  formMessage.textContent = `¡Perfil de ${petName} creado con éxito! 🎉 Pronto le mostraremos nuevos amigos.`;
  petForm.reset();
});

// Botones de la sección de precios (vista previa: la pasarela de pago aún no está conectada)
const subscribeBtn = document.getElementById('subscribeBtn');
const oneTimeBtn = document.getElementById('oneTimeBtn');
const pricingMessage = document.getElementById('pricingMessage');

subscribeBtn.addEventListener('click', () => {
  pricingMessage.textContent = '🏅 ¡Genial! Pronto activaremos los pagos para que puedas suscribirte a Plus (4,99 €/mes o 39,99 €/año) y obtener tu insignia de verificado.';
});

oneTimeBtn.addEventListener('click', () => {
  pricingMessage.textContent = '🐾 Muy pronto podrás comprar verificaciones, impulsos de perfil y packs de fotos sin necesidad de suscribirte.';
});
