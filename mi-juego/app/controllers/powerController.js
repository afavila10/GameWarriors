const PowersModel = require('../Models/PowersModel.js');

// Obtener todos los poderes
exports.getAllPowers = (req, res) => {
    PowersModel.getAllPowers((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener poder por ID
exports.getPowersById = (req, res) => {
    const { id } = req.params;
    PowersModel.getPowersById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// Crear un nuevo poder
exports.createPower = (req, res) => {
    const { name, description, percentage} = req.body;
    PowersModel.createPower(name, description, percentage, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ Power_id: this.lastID });
    });
};

// Actualizar un poder
exports.updatePower = (req, res) => {
    const { id } = req.params;
    const { name, description, percentage} = req.body;
    PowersModel.updatePower(id, name, description,percentage, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "poder actualizada correctamente" });
    });
};

// Eliminar un poder
exports.deletePower = (req, res) => {
    const { id } = req.params;
    PowersModel.deletePower(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "poder eliminado correctamente" });
    });
};
