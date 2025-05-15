// app/sockets/partidasSocket.js

module.exports = (io, socket, db) => {
    // Crear partida
    socket.on('crear_partida', (nombre) => {
        const sql = `INSERT INTO partidas (nombre) VALUES (?)`;
        db.run(sql, [nombre], function (err) {
            if (err) {
                console.error("❌ Error al crear partida:", err.message);
                return;
            }

            const nuevaPartida = {
                id: this.lastID,
                nombre
            };

            io.emit('nueva_partida', nuevaPartida);
        });
    });

    // Obtener partidas
    socket.on('obtener_partidas', () => {
        db.all(`SELECT * FROM partidas`, [], (err, rows) => {
            if (err) {
                console.error("❌ Error al obtener partidas:", err.message);
                return;
            }
            socket.emit('listar_partidas', rows);
        });
    });

    // Desconexión
    socket.on('disconnect', () => {
        console.log('🔴 Usuario desconectado:', socket.id);
    });
};
