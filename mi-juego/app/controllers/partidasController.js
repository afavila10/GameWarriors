const PartidaModel = require('../Models/partidaModel.js');

// Obtener todos las partidas
exports.getAllPartidas = (req, res) => {
    PartidaModel.getAllPartidas((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener poder por ID
exports.getPartidasById = (req, res) => {
    const { id } = req.params;
    PartidaModel.getPartidasById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// Crear un nuevo poder
exports.createPartida = (req, res) => {
    const { nombre, conectados, estado, creado_en} = req.body;
    PartidaModel.createPartida(nombre, conectados, estado, creado_en, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
};

// Actualizar un poder
exports.updatePartida = (req, res) => {
    const { id } = req.params;
    const { nombre, conectados, estado, creado_en} = req.body;
    PartidaModel.updatePartida(id,nombre, conectados, estado, creado_en, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "partida actualizada correctamente" });
    });
};

// Eliminar un poder
exports.deletePartida = (req, res) => {
    const { id } = req.params;
    PartidaModel.deletePartida(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "partida eliminada correctamente" });
    });
};
