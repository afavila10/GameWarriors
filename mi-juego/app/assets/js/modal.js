document.addEventListener("DOMContentLoaded", function () {
    //const socket = io(); // conexión con el servidor

    const modalTriggers = document.querySelectorAll("[data-modal-target]");
    const formCrear = document.getElementById("formCrearPartida");
    const listaPartidas = document.getElementById("listaPartidas");
    const modalCrear = document.getElementById("modalCrear");

    // Crear nueva partida y notificar al servidor
    if (formCrear) {
        formCrear.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("Pname").value.trim();
            if (nombre === "") {
                alert("Por favor completa todos los campos");
                return;
            }

            socket.emit("crear_partida", nombre);
            modalCrear.style.display = "none";
            formCrear.reset();
        });
    }

    // Abrir modal
    modalTriggers.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal-target");
            const modal = document.getElementById(modalId);
            if (modalId === "modalUnirse") {
                socket.emit("obtener_partidas");
            }
            if (modal) modal.style.display = "block";
        });
    });

    // Cerrar modal
    const closeButtons = document.querySelectorAll(".modal .close");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) modal.style.display = "none";
        });
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener("click", function (event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Mostrar nuevas partidas al recibir del servidor
    socket.on("nueva_partida", (partida) => {
        agregarPartidaAlDOM(partida.nombre);
    });

    socket.on("listar_partidas", (partida) => {
        listaPartidas.innerHTML = ""; // Limpiar lista anterior
        partida.forEach(p => agregarPartidaAlDOM(p.nombre));
    });

    function agregarPartidaAlDOM(nombre) {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "partida";
        radio.value = nombre;
        radio.id = nombre

        const label = document.createElement("label");
        label.htmlFor = nombre;
        label.textContent = `${nombre}`;

        // Insertarlos en el contenedor
        listaPartidas.appendChild(radio);
        listaPartidas.appendChild(label);
        listaPartidas.appendChild(document.createElement("br"));
    }
    
    const btnUnirse = document.getElementById("btnUnirse");

    if (btnUnirse) {
        btnUnirse.addEventListener("click", function (e) {
            e.preventDefault();

            const partidaSeleccionada = document.querySelector('input[name="partida"]:checked');

            if (!partidaSeleccionada) {
                alert("Selecciona una partida para unirte.");
                return;
            }

            const nombrePartida = partidaSeleccionada.value;

            // Guardar el nombre de la partida en localStorage
            localStorage.setItem("partida", nombrePartida);

            // Envía también el nombre del jugador (puedes personalizarlo si quieres)
            const nombreJugador = "Jugador" + Math.floor(Math.random() * 1000); // o un input si tienes

            // Redirigir al juego
            socket.disconnect();
            window.location.href = `game.html?partidaId=${encodeURIComponent(nombrePartida)}&jugador=${encodeURIComponent(nombreJugador)}`;
        });
    }
});
