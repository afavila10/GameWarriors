const WarriorType = require("../Models/warriorTypeModel");

exports.getAllWarriorType = (req, res) => {
    WarriorType.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getWarriorTypeById = (req, res) => {
    WarriorType.getById(req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

exports.createWarriorType = (req, res) => {
    const { name, description } = req.body;
    WarriorType.create(name, description, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ warrior_type_id: id });
    });
};

exports.updateWarriorType = (req, res) => {
    const { name, description } = req.body;
    WarriorType.update(req.params.id, name, description, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tipo de guerrero actualizado correctamente" });
    });
};

exports.deleteWarriorType = (req, res) => {
    WarriorType.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tipo de guerrero eliminado correctamente" });
    });
};
