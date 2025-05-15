// app/sockets/gameSocket.js

const salas = {}; // { partidaId: { jugadores: [], guerreros: { socketId: [guerreros] } } }

module.exports = (io, socket, db) => {
    // Unirse a una partida
    socket.on('join_game', ({ partidaId, jugador }) => {
        if (!salas[partidaId]) {
            salas[partidaId] = {
                jugadores: [],
                guerreros: {}
            };
        }

        // Verifica si ya hay dos jugadores
        if (salas[partidaId].jugadores.length >= 2) {
            socket.emit('sala_llena');
            return;
        }

        salas[partidaId].jugadores.push({ socketId: socket.id, nombre: jugador });
        socket.join(`partida_${partidaId}`);
        console.log(`🎮 ${jugador} se unió a la partida ${partidaId}`);

        // Notifica al cliente que puede seleccionar guerreros
        socket.emit('seleccionar_guerreros');

        // Si hay 2 jugadores ya conectados, notifica a ambos
        if (salas[partidaId].jugadores.length === 2) {
            io.to(`partida_${partidaId}`).emit('ambos_conectados');
        }
    });

    // Recibir selección de guerreros
    socket.on('select_warriors', ({ partidaId, guerreros }) => {
        if (!salas[partidaId]) return;

        // Guardar la selección del jugador
        salas[partidaId].guerreros[socket.id] = guerreros;
        console.log(`🛡️ Guerreros recibidos de ${socket.id}:`, guerreros);

        // Comprobar si ambos jugadores han enviado sus guerreros
        if (Object.keys(salas[partidaId].guerreros).length === 2) {
            const jugadores = salas[partidaId].jugadores;
            const datos = jugadores.map(j => ({
                nombre: j.nombre,
                guerreros: salas[partidaId].guerreros[j.socketId]
            }));

            // Iniciar combate con datos de ambos
            io.to(`partida_${partidaId}`).emit('iniciar_combate', datos);
        }
    });

    socket.on('disconnect', () => {
        console.log(`❌ Jugador desconectado: ${socket.id}`);
        // Eliminarlo de cualquier sala si estaba
        for (const [partidaId, sala] of Object.entries(salas)) {
            sala.jugadores = sala.jugadores.filter(j => j.socketId !== socket.id);
            delete sala.guerreros[socket.id];

            if (sala.jugadores.length === 0) {
                delete salas[partidaId]; // Eliminar sala si está vacía
            }
        }
    });
};
