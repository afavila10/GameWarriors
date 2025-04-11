const WarriorModel = require('../Models/warriorModel.js');

// Obtener todos los guerreros
exports.getAllWarriors = (req, res) => {
    WarriorModel.getAllWarriors((err, warriors) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(warriors);
    });
};

// Obtener un guerrero por ID
exports.getWarriorById = (req, res) => {
    const { id } = req.params;
    WarriorModel.getWarriorById(id, (err, warrior) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(warrior);
    });
};

// Crear un nuevo guerrero
exports.createWarrior = (req, res) => {
    const newWarrior = req.body;

    WarriorModel.createWarrior(newWarrior, (err, lastID) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Guerrero creado', warrior_id: lastID });
    });
};


// Actualizar un guerrero
exports.updateWarrior = (req, res) => {
    const { id } = req.params;
    const updatedWarrior = req.body;

    WarriorModel.updateWarrior(id, updatedWarrior, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Guerrero actualizado correctamente' });
    });
};

// Eliminar un guerrero
exports.deleteWarrior = (req, res) => {
    const { id } = req.params;

    WarriorModel.deleteWarrior(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Guerrero eliminado correctamente' });
    });
};
