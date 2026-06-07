// Menú móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// Modo oscuro
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'patasmatch-theme';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

applyTheme(localStorage.getItem(THEME_KEY) || 'light');

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});

// Datos de ejemplo de mascotas
const pets = [
  {
    name: 'Toby', breed: 'Labrador', age: 3, emoji: '🐕', goals: ['pareja', 'paseo'],
    size: 'grande', energy: 'activo',
    verified: true,
    vaccines: ['Rabia', 'Parvovirus', 'Moquillo'],
    personality: ['Juguetón 🎾', 'Cariñoso 🥰'],
    activityBadges: ['Paseador frecuente 🥇'],
    weeklyWalks: 5,
    likesYou: true,
  },
  {
    name: 'Luna', breed: 'Pug', age: 2, emoji: '🐶', goals: ['paseo'],
    size: 'pequeño', energy: 'tranquilo',
    verified: false,
    personality: ['Tranquila 😌', 'Le encanta olfatear todo 👃'],
    activityBadges: [],
    weeklyWalks: 2,
    likesYou: false,
  },
  {
    name: 'Rocky', breed: 'Bulldog', age: 4, emoji: '🐩', goals: ['pareja'],
    size: 'mediano', energy: 'tranquilo',
    verified: true,
    vaccines: ['Rabia', 'Hepatitis', 'Leptospirosis'],
    personality: ['Protector 🛡️', 'Algo tímido al principio'],
    activityBadges: ['Primeras 5 citas 🎉'],
    weeklyWalks: 3,
    likesYou: false,
  },
  {
    name: 'Mia', breed: 'Poodle', age: 1, emoji: '🐕‍🦺', goals: ['paseo'],
    size: 'pequeño', energy: 'activo',
    verified: false,
    personality: ['Muy activa ⚡', 'Le encanta correr'],
    activityBadges: [],
    weeklyWalks: 6,
    likesYou: true,
  },
  {
    name: 'Max', breed: 'Pastor Alemán', age: 5, emoji: '🐺', goals: ['pareja', 'paseo'],
    size: 'grande', energy: 'activo',
    verified: false,
    personality: ['Leal 🐾', 'No le gusta jugar con machos 🚫'],
    activityBadges: ['Paseador frecuente 🥇'],
    weeklyWalks: 7,
    likesYou: false,
  },
  {
    name: 'Bella', breed: 'Beagle', age: 2, emoji: '🐾', goals: ['pareja'],
    size: 'mediano', energy: 'activo',
    verified: true,
    vaccines: ['Rabia', 'Parvovirus', 'Leptospirosis'],
    personality: ['Cariñosa 🥰', 'Sociable con otros perros'],
    activityBadges: [],
    weeklyWalks: 4,
    likesYou: false,
  },
];

const petGrid = document.getElementById('petGrid');
const filterButtons = document.querySelectorAll('[data-filter-group="goal"]');
const sizeFilter = document.getElementById('sizeFilter');
const energyFilter = document.getElementById('energyFilter');
const verifiedOnlyFilter = document.getElementById('verifiedOnlyFilter');

const filters = {
  goal: 'todos',
  size: 'todos',
  energy: 'todos',
  verifiedOnly: false,
};

function goalLabel(goal) {
  return goal === 'pareja' ? 'Busca pareja 💞' : 'Busca paseo 🐕';
}

// Aplica todos los filtros activos y, si hay distancias GPS, ordena por cercanía
function getFilteredPets() {
  let visible = pets.filter((pet) => {
    if (filters.goal !== 'todos' && !pet.goals.includes(filters.goal)) return false;
    if (filters.size !== 'todos' && pet.size !== filters.size) return false;
    if (filters.energy !== 'todos' && pet.energy !== filters.energy) return false;
    if (filters.verifiedOnly && !pet.verified) return false;
    return true;
  });

  if (visible.some((pet) => typeof pet.distanceKm === 'number')) {
    visible = [...visible].sort((a, b) => a.distanceKm - b.distanceKm);
  }

  return visible;
}

function buildPetTags(pet) {
  const goalTags = pet.goals
    .map((goal) => `<span class="tag ${goal === 'paseo' ? 'tag--paseo' : ''}">${goalLabel(goal)}</span>`)
    .join('');

  const distanceTag = typeof pet.distanceKm === 'number'
    ? `<span class="tag tag--distance">📍 ${pet.distanceKm.toFixed(1)} km de ti</span>`
    : '';

  const verifiedTag = pet.verified
    ? `<span class="tag tag--verified">🏅 Verificado</span>`
    : '';

  const activityTags = (pet.activityBadges || [])
    .map((badge) => `<span class="tag tag--activity">${badge}</span>`)
    .join('');

  const streakTag = typeof pet.weeklyWalks === 'number'
    ? `<span class="tag tag--streak">🔥 ${pet.weeklyWalks} paseos esta semana</span>`
    : '';

  const personalityTags = (pet.personality || [])
    .map((trait) => `<span class="tag tag--trait">${trait}</span>`)
    .join('');

  const vaccinesBlock = pet.verified && pet.vaccines?.length
    ? `<p class="pet-card__vaccines">💉 Vacunas al día: ${pet.vaccines.join(', ')}</p>`
    : '';

  return { verifiedTag, activityTags, streakTag, goalTags, distanceTag, personalityTags, vaccinesBlock };
}

function renderPets() {
  petGrid.innerHTML = '';

  getFilteredPets().forEach((pet) => {
    const card = document.createElement('div');
    card.className = 'pet-card';

    const { verifiedTag, activityTags, streakTag, goalTags, distanceTag, personalityTags, vaccinesBlock } = buildPetTags(pet);

    card.innerHTML = `
      <div class="pet-card__photo">${pet.emoji}</div>
      <div class="pet-card__body">
        <h3>${pet.name} ${pet.verified ? '🏅' : ''}</h3>
        <p>${pet.breed} · ${pet.age} años · ${pet.size || ''}</p>
        <div class="pet-card__tags">${verifiedTag}${activityTags}${streakTag}${goalTags}${distanceTag}</div>
        ${vaccinesBlock}
        <div class="pet-card__tags">${personalityTags}</div>
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
      const alreadyLiked = btn.classList.contains('is-liked');
      btn.classList.toggle('is-liked');
      btn.textContent = btn.classList.contains('is-liked') ? '¡Te gusta! ❤️' : 'Me gusta 🐾';

      if (!alreadyLiked) {
        const pet = pets.find((p) => p.name === btn.dataset.name);
        if (pet?.likesYou) triggerMatch(pet.name);
      }
    });
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    filters.goal = btn.dataset.filter;
    renderPets();
  });
});

sizeFilter.addEventListener('change', () => {
  filters.size = sizeFilter.value;
  renderPets();
});

energyFilter.addEventListener('change', () => {
  filters.energy = energyFilter.value;
  renderPets();
});

verifiedOnlyFilter.addEventListener('change', () => {
  filters.verifiedOnly = verifiedOnlyFilter.checked;
  renderPets();
});

renderPets();

// Modal de "match" mutuo
const matchOverlay = document.getElementById('matchOverlay');
const matchText = document.getElementById('matchText');
const closeMatchBtn = document.getElementById('closeMatchBtn');

function triggerMatch(petName) {
  matchText.textContent = `A ti y a ${petName} les gustaron mutuamente. ¡Es buen momento para coordinar un encuentro o paseo! 🐾`;
  matchOverlay.hidden = false;
}

closeMatchBtn.addEventListener('click', () => {
  matchOverlay.hidden = true;
});

matchOverlay.addEventListener('click', (event) => {
  if (event.target === matchOverlay) matchOverlay.hidden = true;
});

// Alternador de vista: Galería vs. Descubrir (modo swipe)
const viewToggleButtons = document.querySelectorAll('.view-toggle__btn');
const discoverView = document.getElementById('discoverView');
const discoverStage = document.getElementById('discoverStage');
const passBtn = document.getElementById('passBtn');
const superLikeBtn = document.getElementById('superLikeBtn');
let discoverIndex = 0;

function renderDiscoverCard() {
  const list = getFilteredPets();
  discoverStage.innerHTML = '';

  if (discoverIndex >= list.length) {
    discoverStage.innerHTML = `
      <div class="discover__empty">🐾 ¡Eso es todo por ahora! Ajusta los filtros o vuelve más tarde para ver nuevas mascotas.</div>
    `;
    return;
  }

  const pet = list[discoverIndex];
  const { personalityTags } = buildPetTags(pet);

  const card = document.createElement('div');
  card.className = 'swipe-card';
  card.innerHTML = `
    <div class="swipe-card__photo">${pet.emoji}</div>
    <div class="swipe-card__body">
      <h3>${pet.name} ${pet.verified ? '🏅' : ''}</h3>
      <p>${pet.breed} · ${pet.age} años · ${pet.size || ''} · ${pet.energy || ''}</p>
      <div class="pet-card__tags">${personalityTags}</div>
    </div>
  `;
  discoverStage.appendChild(card);
}

function swipe(direction) {
  const list = getFilteredPets();
  if (discoverIndex >= list.length) return;

  const pet = list[discoverIndex];
  const card = discoverStage.querySelector('.swipe-card');

  if (card) {
    card.classList.add(direction === 'right' ? 'is-leaving-right' : 'is-leaving-left');
  }

  if (direction === 'right' && pet.likesYou) {
    setTimeout(() => triggerMatch(pet.name), 200);
  }

  setTimeout(() => {
    discoverIndex += 1;
    renderDiscoverCard();
  }, 320);
}

passBtn.addEventListener('click', () => swipe('left'));
superLikeBtn.addEventListener('click', () => swipe('right'));

viewToggleButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    viewToggleButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const isDiscover = btn.dataset.view === 'descubrir';
    petGrid.hidden = isDiscover;
    discoverView.hidden = !isDiscover;

    if (isDiscover) {
      discoverIndex = 0;
      renderDiscoverCard();
    }
  });
});

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
