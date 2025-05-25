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
  estado.textContent = "Selecciona tus 5 guerreros";

  // Por ahora muestra 5 selects vacíos. Luego los llenaremos con datos reales.
  for (let i = 1; i <= 5; i++) {
    const select = document.createElement('select');
    select.name = `guerrero${i}`;
    select.innerHTML = `
      <option disabled selected>Seleccionar Guerrero ${i}</option>
      <option value="1">Guerrero 1</option>
      <option value="2">Guerrero 2</option>
      <option value="3">Guerrero 3</option>
      <option value="4">Guerrero 4</option>
      <option value="5">Guerrero 5</option>
    `;
    listaGuerreros.appendChild(select);
    listaGuerreros.appendChild(document.createElement('br'));
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


