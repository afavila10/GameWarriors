const spellsModel = require('../Models/spellsModel.js');

// Obtener todos los hechizos
exports.getSpells = (req, res) => {
    spellsModel.getAllSpells((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener hechizo por ID
exports.getSpellById = (req, res) => {
    const { id } = req.params;
    spellsModel.getSpellById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// Crear un nuevo hechizo
exports.createSpell = (req, res) => {
    const { name, description, percentage } = req.body;
    spellsModel.createSpell(name, description, percentage, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ spell_id: this.lastID });
    });
};

// Actualizar un hechizo
exports.updateSpell = (req, res) => {
    const { id } = req.params;
    const { name, description, percentage } = req.body;
    spellsModel.updateSpell(id, name, description, percentage, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hechizo actualizado correctamente" });
    });
};

// Eliminar un hechizo
exports.deleteSpell = (req, res) => {
    const { id } = req.params;
    spellsModel.deleteSpell(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hechizo eliminado correctamente" });
    });
};
