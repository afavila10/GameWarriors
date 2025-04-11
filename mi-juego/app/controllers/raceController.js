const RaceModel = require('../Models/raceModel.js');

// Obtener todos los hechizos
exports.getRace = (req, res) => {
    RaceModel.getAllRaces((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener hechizo por ID
exports.getRacesById = (req, res) => {
    const { id } = req.params;
    RaceModel.getRacesById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// Crear un nuevo hechizo
exports.createRace = (req, res) => {
    const { name, description} = req.body;
    RaceModel.createRace(name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ race_id: this.lastID });
    });
};

// Actualizar un hechizo
exports.updateRace = (req, res) => {
    const { id } = req.params;
    const { name, description} = req.body;
    RaceModel.updateRace(id, name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Raza actualizada correctamente" });
    });
};

// Eliminar un hechizo
exports.deleteRace = (req, res) => {
    const { id } = req.params;
    RaceModel.deleteRace(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Raza eliminada correctamente" });
    });
};
