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

// Notificaciones (vista previa: avisos de ejemplo, no hay backend ni envíos en tiempo real)
const notifications = [
  { icon: '🐾', text: 'A Bella le gustó el perfil de Toby', time: 'hace 10 min' },
  { icon: '🎉', text: '¡Tienes un nuevo match con Luna!', time: 'hace 1 h' },
  { icon: '📅', text: 'Nueva quedada cerca de ti: Picnic canino, 28 jun', time: 'hace 3 h' },
  { icon: '⭐', text: 'Recibiste una reseña nueva de Marta', time: 'ayer' },
];

const notifBtn = document.getElementById('notifBtn');
const notifBadge = document.getElementById('notifBadge');
const notifPanel = document.getElementById('notifPanel');
const notifList = document.getElementById('notifList');

let unreadNotifications = notifications.length;

function renderNotifications() {
  notifList.innerHTML = notifications
    .map((notif) => `
      <li>
        <span class="notif__icon">${notif.icon}</span>
        <div>
          <p>${notif.text}</p>
          <span class="notif__time">${notif.time}</span>
        </div>
      </li>
    `)
    .join('');
}

function updateNotifBadge() {
  if (unreadNotifications > 0) {
    notifBadge.textContent = unreadNotifications;
    notifBadge.hidden = false;
  } else {
    notifBadge.hidden = true;
  }
}

renderNotifications();
updateNotifBadge();

notifBtn.addEventListener('click', () => {
  notifPanel.hidden = !notifPanel.hidden;

  if (!notifPanel.hidden && unreadNotifications > 0) {
    unreadNotifications = 0;
    updateNotifBadge();
  }
});

document.addEventListener('click', (event) => {
  if (!notifPanel.hidden && !event.target.closest('.notif')) {
    notifPanel.hidden = true;
  }
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
    reviews: [
      { author: 'Marta', rating: 5, comment: 'Quedamos puntuales y los perros se llevaron genial 🐾' },
      { author: 'Iván', rating: 4, comment: 'Muy buena energía entre los perros, repetiríamos sin duda' },
    ],
    availability: ['L', 'X', 'V', 'S'],
    moments: [
      { emoji: '🌳', caption: 'Paseo por el Retiro' },
      { emoji: '🎾', caption: 'Tarde de juegos en el parque' },
      { emoji: '🐕', caption: 'Primer encuentro con Bella' },
    ],
  },
  {
    name: 'Luna', breed: 'Pug', age: 2, emoji: '🐶', goals: ['paseo'],
    size: 'pequeño', energy: 'tranquilo',
    verified: false,
    personality: ['Tranquila 😌', 'Le encanta olfatear todo 👃'],
    activityBadges: [],
    weeklyWalks: 2,
    likesYou: false,
    reviews: [
      { author: 'Sofía', rating: 5, comment: 'Paseo tranquilo y agradable, Luna es un encanto' },
    ],
    availability: ['M', 'J', 'D'],
    moments: [
      { emoji: '👃', caption: 'Explorando olores nuevos' },
      { emoji: '☕', caption: 'Café tranquilo con su dueña' },
    ],
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
    reviews: [
      { author: 'Carlos', rating: 4, comment: 'Tardó en soltarse pero al final se llevaron de maravilla' },
      { author: 'Lucía', rating: 5, comment: 'Dueño muy responsable y puntual, todo perfecto' },
      { author: 'Ana', rating: 4, comment: 'Buena experiencia, repetiremos la próxima semana' },
    ],
    availability: ['L', 'M', 'X', 'J', 'V'],
    moments: [
      { emoji: '🎉', caption: 'Su quinta cita con Luna' },
      { emoji: '🛡️', caption: 'Cuidando del grupo en el paseo' },
    ],
  },
  {
    name: 'Mia', breed: 'Poodle', age: 1, emoji: '🐕‍🦺', goals: ['paseo'],
    size: 'pequeño', energy: 'activo',
    verified: false,
    personality: ['Muy activa ⚡', 'Le encanta correr'],
    activityBadges: [],
    weeklyWalks: 6,
    likesYou: true,
    reviews: [],
    availability: ['S', 'D'],
    moments: [
      { emoji: '⚡', caption: 'Carrera matutina en el parque' },
    ],
  },
  {
    name: 'Max', breed: 'Pastor Alemán', age: 5, emoji: '🐺', goals: ['pareja', 'paseo'],
    size: 'grande', energy: 'activo',
    verified: false,
    personality: ['Leal 🐾', 'No le gusta jugar con machos 🚫'],
    activityBadges: ['Paseador frecuente 🥇'],
    weeklyWalks: 7,
    likesYou: false,
    reviews: [
      { author: 'Pedro', rating: 3, comment: 'Buen paseo, aunque conviene avisar antes si hay otros machos cerca' },
    ],
    availability: ['L', 'X', 'V', 'D'],
    moments: [
      { emoji: '🐾', caption: 'Patrullando el barrio' },
      { emoji: '🌅', caption: 'Paseo al amanecer' },
    ],
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
    reviews: [
      { author: 'Noa', rating: 5, comment: 'Bella es supersociable, ideal para un primer encuentro' },
      { author: 'Diego', rating: 5, comment: 'Quedada perfecta, muy recomendable' },
    ],
    availability: ['M', 'J', 'S', 'D'],
    moments: [
      { emoji: '🧺', caption: 'Picnic canino con nuevos amigos' },
      { emoji: '🥰', caption: 'Tarde de mimos en el parque' },
    ],
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

  const reviewsBlock = buildReviewsBlock(pet);
  const availabilityBlock = buildAvailabilityBlock(pet);
  const momentsBlock = buildMomentsBlock(pet);

  return { verifiedTag, activityTags, streakTag, goalTags, distanceTag, personalityTags, vaccinesBlock, reviewsBlock, availabilityBlock, momentsBlock };
}

const WEEK_DAYS = [
  { code: 'L', label: 'Lunes' },
  { code: 'M', label: 'Martes' },
  { code: 'X', label: 'Miércoles' },
  { code: 'J', label: 'Jueves' },
  { code: 'V', label: 'Viernes' },
  { code: 'S', label: 'Sábado' },
  { code: 'D', label: 'Domingo' },
];

// Construye el calendario semanal de disponibilidad del dueño para pasear o quedar
function buildAvailabilityBlock(pet) {
  if (!pet.availability?.length) return '';

  const days = WEEK_DAYS
    .map(({ code, label }) => {
      const isAvailable = pet.availability.includes(code);
      return `<span class="day-pill ${isAvailable ? 'is-available' : ''}" title="${label}${isAvailable ? ': disponible' : ': no disponible'}">${code}</span>`;
    })
    .join('');

  return `
    <div class="pet-card__availability">
      <p class="pet-card__availability-label">📅 Disponible para quedar:</p>
      <div class="day-pills">${days}</div>
    </div>
  `;
}

// Construye la mini galería de "momentos" (paseos o citas pasadas) del perfil
function buildMomentsBlock(pet) {
  if (!pet.moments?.length) return '';

  const items = pet.moments
    .map((moment) => `
      <div class="moment-card" title="${moment.caption}">
        <span class="moment-card__emoji">${moment.emoji}</span>
        <span class="moment-card__caption">${moment.caption}</span>
      </div>
    `)
    .join('');

  return `
    <div class="pet-card__moments">
      <p class="pet-card__moments-label">📸 Momentos compartidos:</p>
      <div class="moments-strip">${items}</div>
    </div>
  `;
}

// Construye el resumen de reseñas: estrellas promedio, número de reseñas y el último comentario
function buildReviewsBlock(pet) {
  const reviews = pet.reviews || [];
  if (reviews.length === 0) {
    return `<p class="pet-card__reviews pet-card__reviews--empty">⭐ Sin reseñas todavía</p>`;
  }

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const fullStars = Math.round(average);
  const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
  const latest = reviews[reviews.length - 1];

  return `
    <div class="pet-card__reviews">
      <p class="pet-card__rating"><span class="stars">${stars}</span> ${average.toFixed(1)} (${reviews.length} ${reviews.length === 1 ? 'reseña' : 'reseñas'})</p>
      <p class="pet-card__review-quote">“${latest.comment}” — ${latest.author}</p>
    </div>
  `;
}

function renderPets() {
  petGrid.innerHTML = '';

  getFilteredPets().forEach((pet) => {
    const card = document.createElement('div');
    card.className = 'pet-card';

    const { verifiedTag, activityTags, streakTag, goalTags, distanceTag, personalityTags, vaccinesBlock, reviewsBlock, availabilityBlock, momentsBlock } = buildPetTags(pet);

    card.innerHTML = `
      <div class="pet-card__photo">${pet.emoji}</div>
      <div class="pet-card__body">
        <h3>${pet.name} ${pet.verified ? '🏅' : ''}</h3>
        <p>${pet.breed} · ${pet.age} años · ${pet.size || ''}</p>
        <div class="pet-card__tags">${verifiedTag}${activityTags}${streakTag}${goalTags}${distanceTag}</div>
        ${vaccinesBlock}
        <div class="pet-card__tags">${personalityTags}</div>
        ${reviewsBlock}
        ${availabilityBlock}
        ${momentsBlock}
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

// Chat de demostración dentro del match (vista previa: no hay backend, los mensajes no se guardan)
const matchChat = document.getElementById('matchChat');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const openChatBtn = document.getElementById('openChatBtn');

let currentMatchPet = null;

const chatReplies = [
  (pet) => `¡Hola! Qué ilusión que a ${pet} le hayas dado "me gusta" 🐾`,
  (pet) => `${pet} está deseando conocer a tu perro. ¿Te viene bien quedar este finde?`,
  (pet) => 'Podríamos vernos en un parque cerca de los dos, ¿qué zona te queda mejor?',
  (pet) => `¡Genial! Avísame con tiempo y preparamos un paseo tranquilo para que se conozcan 🐕`,
  (pet) => `Jaja, ${pet} se pone muy contento/a cuando hay planes nuevos 😄`,
];

function addChatBubble(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `chat__bubble chat__bubble--${sender}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function resetChat(petName) {
  currentMatchPet = petName;
  chatMessages.innerHTML = '';
  matchChat.hidden = true;
  openChatBtn.textContent = 'Abrir chat 💬';
  addChatBubble(`¡Hola! Soy el dueño/a de ${petName} 🐶 Encantado/a de conectar contigo.`, 'them');
}

function triggerMatch(petName) {
  matchText.textContent = `A ti y a ${petName} les gustaron mutuamente. ¡Es buen momento para coordinar un encuentro o paseo! 🐾`;
  resetChat(petName);
  matchOverlay.hidden = false;
}

openChatBtn.addEventListener('click', () => {
  matchChat.hidden = !matchChat.hidden;
  openChatBtn.textContent = matchChat.hidden ? 'Abrir chat 💬' : 'Cerrar chat';
  if (!matchChat.hidden) chatInput.focus();
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  addChatBubble(text, 'me');
  chatInput.value = '';

  setTimeout(() => {
    const reply = chatReplies[Math.floor(Math.random() * chatReplies.length)](currentMatchPet);
    addChatBubble(reply, 'them');
  }, 900);
});

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
const petPhotoInput = document.getElementById('petPhoto');
const photoPreview = document.getElementById('photoPreview');
const photoPreviewImg = document.getElementById('photoPreviewImg');

// Vista previa local de la foto subida (no se envía a ningún servidor: el sitio es estático)
petPhotoInput.addEventListener('change', () => {
  const file = petPhotoInput.files[0];

  if (!file) {
    photoPreview.hidden = true;
    photoPreviewImg.src = '';
    return;
  }

  photoPreviewImg.src = URL.createObjectURL(file);
  photoPreview.hidden = false;
});

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
  photoPreview.hidden = true;
  photoPreviewImg.src = '';
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

// Comunidad: lugares de encuentro seguros sugeridos
const safeSpots = [
  { name: 'Parque del Retiro · Zona canina', emoji: '🌳', description: 'Amplia zona vallada con sombra y fuentes de agua, siempre concurrida.' },
  { name: 'Parque Juan Carlos I', emoji: '🐾', description: 'Senderos amplios y zonas de descanso, ideal para paseos largos en grupo.' },
  { name: 'Playa habilitada para perros', emoji: '🏖️', description: 'Tramo de playa fuera de temporada alta, perfecto para que socialicen sin correa.' },
  { name: 'Cafetería pet-friendly del centro', emoji: '☕', description: 'Terraza con cuencos de agua, ideal para una primera cita tranquila entre dueños.' },
];

const spotsGrid = document.getElementById('spotsGrid');

function renderSafeSpots() {
  spotsGrid.innerHTML = safeSpots
    .map((spot) => `
      <div class="card spot-card">
        <span class="spot-card__emoji">${spot.emoji}</span>
        <h4>${spot.name}</h4>
        <p>${spot.description}</p>
      </div>
    `)
    .join('');
}

renderSafeSpots();

// Comunidad: quedadas y eventos grupales
const events = [
  { title: 'Quedada de razas pequeñas', date: '14 jun · 11:00', place: 'Parque del Retiro', emoji: '🐩', spots: 8 },
  { title: 'Paseo nocturno por el río', date: '21 jun · 20:30', place: 'Ribera del Manzanares', emoji: '🌙', spots: 12 },
  { title: 'Picnic canino y juegos en grupo', date: '28 jun · 12:00', place: 'Parque Juan Carlos I', emoji: '🧺', spots: 20, sponsoredBy: 'PawShop 🛍️' },
];

const eventsGrid = document.getElementById('eventsGrid');

function renderEvents() {
  eventsGrid.innerHTML = '';

  events.forEach((event) => {
    const card = document.createElement('div');
    card.className = 'card event-card';
    const sponsorTag = event.sponsoredBy
      ? `<span class="event-card__sponsor">📣 Patrocinado por ${event.sponsoredBy}</span>`
      : '';

    card.innerHTML = `
      ${sponsorTag}
      <span class="event-card__emoji">${event.emoji}</span>
      <h4>${event.title}</h4>
      <p class="event-card__meta">📅 ${event.date} · 📍 ${event.place}</p>
      <p class="event-card__spots">${event.spots} plazas disponibles</p>
      <button class="btn btn--secondary btn--full join-event-btn">Apuntarme</button>
    `;
    eventsGrid.appendChild(card);
  });

  eventsGrid.querySelectorAll('.join-event-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const alreadyJoined = btn.classList.contains('is-joined');
      btn.classList.toggle('is-joined');
      btn.textContent = alreadyJoined ? 'Apuntarme' : '¡Apuntado! 🐾';
    });
  });
}

renderEvents();

// Negocios locales y monetización extra (anuncios + tienda afiliada)
const localBusinesses = [
  { name: 'Peluquería Pelo & Pata', emoji: '✂️', category: 'Peluquería canina', description: 'Baño, corte y spa para que tu perro luzca radiante antes de su próxima cita.', sponsored: true },
  { name: 'Clínica Veterinaria 24h', emoji: '🩺', category: 'Veterinario', description: 'Atención de urgencias y revisiones para mantener al día las vacunas de tu mascota.', sponsored: true },
  { name: 'PawShop — Tienda para mascotas', emoji: '🛒', category: 'Tienda', description: 'Comida, juguetes y accesorios con descuentos exclusivos para usuarios de PatasMatch.', sponsored: false },
];

const businessGrid = document.getElementById('businessGrid');
const affiliateBtn = document.getElementById('affiliateBtn');
const businessMessage = document.getElementById('businessMessage');

function renderBusinesses() {
  businessGrid.innerHTML = localBusinesses
    .map((business) => `
      <div class="card business-card">
        ${business.sponsored ? '<span class="business-card__sponsored">📣 Anuncio</span>' : ''}
        <span class="business-card__emoji">${business.emoji}</span>
        <p class="business-card__category">${business.category}</p>
        <h4>${business.name}</h4>
        <p>${business.description}</p>
      </div>
    `)
    .join('');
}

renderBusinesses();

affiliateBtn.addEventListener('click', () => {
  businessMessage.textContent = '🛍️ Muy pronto podrás explorar y comprar productos recomendados para tu perro directamente desde aquí.';
});

// Mi perfil: tarjeta propia, estadísticas y "quién te dio me gusta"
const myPet = pets[0];

const myProfile = { views: 128, likesReceived: 34, matchRate: 62 };

const admirers = [
  { name: 'Bella', emoji: '🐾', breed: 'Beagle' },
  { name: 'Mia', emoji: '🐕‍🦺', breed: 'Poodle' },
  { name: 'Luna', emoji: '🐶', breed: 'Pug' },
];

const profileCard = document.getElementById('profileCard');
const profileStats = document.getElementById('profileStats');
const admirersGrid = document.getElementById('admirersGrid');
const unlockAdmirersBtn = document.getElementById('unlockAdmirersBtn');

function renderProfileCard() {
  const badgeTags = (myPet.activityBadges || [])
    .map((badge) => `<span class="tag tag--activity">${badge}</span>`)
    .join('');
  const verifiedTag = myPet.verified ? '<span class="tag tag--verified">🏅 Verificado</span>' : '';

  profileCard.innerHTML = `
    <div class="profile__photo">${myPet.emoji}</div>
    <h3>${myPet.name}</h3>
    <p>${myPet.breed} · ${myPet.age} años · ${myPet.size}</p>
    <div class="profile__badges">${verifiedTag}${badgeTags}</div>
  `;
}

function renderProfileStats() {
  profileStats.innerHTML = `
    <div class="stat-card">
      <span class="stat-card__value">${myProfile.views}</span>
      <span class="stat-card__label">👀 Visitas al perfil</span>
    </div>
    <div class="stat-card">
      <span class="stat-card__value">${myProfile.likesReceived}</span>
      <span class="stat-card__label">❤️ Me gusta recibidos</span>
    </div>
    <div class="stat-card">
      <span class="stat-card__value">${myProfile.matchRate}%</span>
      <span class="stat-card__label">🎉 Tasa de match</span>
      <div class="stat-card__bar"><span style="width: ${myProfile.matchRate}%"></span></div>
    </div>
  `;
}

let admirersUnlocked = false;

function renderAdmirers() {
  admirersGrid.innerHTML = admirers
    .map((admirer) => `
      <div class="card admirer-card ${admirersUnlocked ? '' : 'is-locked'}">
        <span class="admirer-card__emoji">${admirer.emoji}</span>
        <h4>${admirer.name}</h4>
        <p>${admirer.breed}</p>
        ${admirersUnlocked ? '' : '<div class="admirer-card__lock">🔒 Plus</div>'}
      </div>
    `)
    .join('');
}

renderProfileCard();
renderProfileStats();
renderAdmirers();

unlockAdmirersBtn.addEventListener('click', () => {
  admirersUnlocked = true;
  renderAdmirers();
  unlockAdmirersBtn.textContent = '¡Desbloqueado con Plus! 🏅';
  unlockAdmirersBtn.disabled = true;
});
