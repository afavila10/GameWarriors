const warriorSpellsModel = require('../Models/warriorSpellsModel');

// Obtener todos los hechizos asignados a tipos de guerreros
exports.getAllWarriorSpells = (req, res) => {
    warriorSpellsModel.getAllWarriorSpells((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener hechizos por ID del guerrero
exports.getSpellsByWarriorId = (req, res) => {
    const { warrior_id } = req.params;
    warriorSpellsModel.getSpellsByWarriorId(warrior_id, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Asignar hechizo a guerrero
exports.assignSpellToWarrior = (req, res) => {
    const { warrior_id, spell_id } = req.body;
    warriorSpellsModel.assignSpellToWarrior(warrior_id, spell_id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hechizo asignado al guerrero" });
    });
};

// Eliminar hechizo de guerrero
exports.removeWarriorSpell = (req, res) => {
    const { warrior_id, spell_id } = req.params;
    warriorSpellsModel.removeWarriorSpell(warrior_id, spell_id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hechizo eliminado del guerrero" });
    });
};
