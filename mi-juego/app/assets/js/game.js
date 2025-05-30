const socket = io();

// 👇 ID de partida y nombre del jugador desde query string
const urlParams = new URLSearchParams(window.location.search);
const partidaId = urlParams.get('partidaId');
const jugador = urlParams.get('jugador') || "Jugador";

const estado = document.getElementById('estado');
const form = document.getElementById('form-seleccion');
const listaGuerreros = document.getElementById('lista-guerreros');
const mensajeCombate = document.getElementById('mensaje-combate');

if (!partidaId) {
  alert("No se pudo obtener el ID de la partida. Redirigiendo...");
  window.location.href = "index.html";
}

// Unirse a la partida
socket.emit('join_game', { partidaId, jugador });

socket.on('sala_llena', () => {
  estado.textContent = "La sala ya está llena.";
});

socket.on('seleccionar_guerreros', () => {
  listaGuerreros.innerHTML = ""; // Limpia lo anterior si había
  const maxSeleccion = 5;
  let seleccionados = [];

  for (let i = 1; i <= 10; i++) { // Por si tienes 10 guerreros, puedes cambiarlo
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.guerreroId = i;

    card.innerHTML = `
      <img class="warrior-img" src="/assets/Img/warriors/${i}.jpg" alt="Guerrero ${i}">
      <p>Guerrero ${i}</p>
    `;

    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.guerreroId);

      if (seleccionados.includes(id)) {
        // Si ya está seleccionado, lo quitamos
        seleccionados = seleccionados.filter(g => g !== id);
        card.classList.remove('seleccionado');
      } else {
        if (seleccionados.length < maxSeleccion) {
          seleccionados.push(id);
          card.classList.add('seleccionado');
        } else {
          alert("Ya seleccionaste 5 guerreros");
        }
      }

      console.log("Guerreros seleccionados:", seleccionados);
    });

    listaGuerreros.appendChild(card);
  }
});



// Enviar selección al servidor
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const selects = listaGuerreros.querySelectorAll('select');
  const guerreros = Array.from(selects).map(s => parseInt(s.value));
  socket.emit('select_warriors', { partidaId, guerreros });
  estado.textContent = "Esperando al otro jugador...";
});

// Ambos han elegido → comenzar combate
socket.on('iniciar_combate', (jugadores) => {
  mensajeCombate.innerHTML = `<h2>¡Combate iniciado!</h2>`;
  console.log("⚔️ Jugadores listos:", jugadores);
  estado.textContent = "";
});


