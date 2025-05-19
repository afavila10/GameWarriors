const db = require("../database/database");

// Función para registrar una nueva ronda en la tabla `battles`
const saveBattleRound = (warrior1_id, warrior2_id, winner_id, round, callback) => {
    const query = `
        INSERT INTO battles (warrior1_id, warrior2_id, winner_id, round)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [warrior1_id, warrior2_id, winner_id, round], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID, warrior1_id, warrior2_id, winner_id, round });
    });
};

// Función para obtener todas las rondas de una batalla específica
const getBattleRounds = (callback) => {
    const query = `SELECT * FROM battles ORDER BY id ASC`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

const updateBattles = (id,warrior1_id, warrior2_id, winner_id, round, callback) => {
    const query = "UPDATE battles SET warrior1_id = ?, warrior2_id = ?, winner_id = ?, round= ? WHERE id = ?";
    db.run(query, [warrior1_id, warrior2_id, winner_id, round,  id], callback);
};


// Exportamos las funciones
module.exports = {
    saveBattleRound,
    getBattleRounds,
    updateBattles
};
