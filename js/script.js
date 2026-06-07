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
  { name: 'Toby', breed: 'Labrador', age: 3, emoji: '🐕', goals: ['pareja', 'paseo'] },
  { name: 'Luna', breed: 'Pug', age: 2, emoji: '🐶', goals: ['paseo'] },
  { name: 'Rocky', breed: 'Bulldog', age: 4, emoji: '🐩', goals: ['pareja'] },
  { name: 'Mia', breed: 'Poodle', age: 1, emoji: '🐕‍🦺', goals: ['paseo'] },
  { name: 'Max', breed: 'Pastor Alemán', age: 5, emoji: '🐺', goals: ['pareja', 'paseo'] },
  { name: 'Bella', breed: 'Beagle', age: 2, emoji: '🐾', goals: ['pareja'] },
];

const petGrid = document.getElementById('petGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
let activeFilter = 'todos';

function goalLabel(goal) {
  return goal === 'pareja' ? 'Busca pareja 💞' : 'Busca paseo 🐕';
}

function renderPets() {
  petGrid.innerHTML = '';

  const filtered = pets.filter((pet) =>
    activeFilter === 'todos' ? true : pet.goals.includes(activeFilter)
  );

  filtered.forEach((pet) => {
    const card = document.createElement('div');
    card.className = 'pet-card';

    const tags = pet.goals
      .map((goal) => `<span class="tag ${goal === 'paseo' ? 'tag--paseo' : ''}">${goalLabel(goal)}</span>`)
      .join('');

    card.innerHTML = `
      <div class="pet-card__photo">${pet.emoji}</div>
      <div class="pet-card__body">
        <h3>${pet.name}</h3>
        <p>${pet.breed} · ${pet.age} años</p>
        <div class="pet-card__tags">${tags}</div>
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
