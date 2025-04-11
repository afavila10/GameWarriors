const db = require('../database/database');

//registerBattle
exports.registerBattle = (req, res) => {
    const { warrior1_id, warrior2_id, winner_id, round } = req.body;

    if (!warrior1_id || !warrior2_id || !winner_id || round === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = "INSERT INTO battles (warrior1_id, warrior2_id, winner_id, round) VALUES (?, ?, ?, ?)";
    
    db.run(query, [warrior1_id, warrior2_id, winner_id, round], function (err) {
        if (err) {
            console.error("❌ Error al guardar en la BD:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Batalla registrada", battle_id: this.lastID });
    });
};

exports.getAllBattles = (req, res) => {
    const query = `
        SELECT 
            b.id, 
            b.round, 
            w1.name AS warrior1_name, 
            w2.name AS warrior2_name, 
            w3.name AS winner_name 
        FROM battles b
        LEFT JOIN warrior w1 ON b.warrior1_id = w1.warrior_id
        LEFT JOIN warrior w2 ON b.warrior2_id = w2.warrior_id
        LEFT JOIN warrior w3 ON b.winner_id = w3.warrior_id
        ORDER BY b.round ASC
    `;
    try {
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("❌ Error al consultar batallas:", err.message);
                return res.status(500).json({ error: "Error al obtener las batallas" });
            }

            res.json(rows); // Devuelve [] si no hay batallas
        });
    } catch (error) {
        console.error("❌ Excepción en getAllBattles:", error.message);
        res.status(500).json({ error: "Error inesperado" });
    }
};

// Obtener una batalla por ID
exports.getBattleById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM battles WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Batalla no encontrada" });
        res.json(row);
    });
};

// Crear una nueva ronda en la batalla
exports.createBattle = (req, res) => {
    const { warrior1_id, warrior2_id, winner_id, round } = req.body;

    if (!warrior1_id || !warrior2_id || !winner_id || round === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    db.run(
        "INSERT INTO battles (warrior1_id, warrior2_id, winner_id, round) VALUES (?, ?, ?, ?)",
        [warrior1_id, warrior2_id, winner_id, round],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, warrior1_id, warrior2_id, winner_id, round });
        }
    );
};

// Actualizar una batalla (ronda)
exports.updateBattle = (req, res) => {
    const { id } = req.params;
    const { warrior1_id, warrior2_id, winner_id, round } = req.body;

    if (!warrior1_id || !warrior2_id || !winner_id || round === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    db.run(
        "UPDATE battles SET warrior1_id = ?, warrior2_id = ?, winner_id = ?, round = ? WHERE id = ?",
        [warrior1_id, warrior2_id, winner_id, round, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Batalla no encontrada" });
            res.json({ message: "Batalla actualizada correctamente" });
        }
    );
};

// Eliminar una batalla
exports.deleteBattle = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM battles WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Batalla no encontrada" });
        res.json({ message: "Batalla eliminada correctamente" });
    });
};
