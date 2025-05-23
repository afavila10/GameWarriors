const ModulesModel = require('../Models/ModulesModel.js');

// Obtener todos los Modulos
exports.getModules = (req, res) => {
    ModulesModel.getAllModules((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener Modulo por ID
exports.getModuleById = (req, res) => {
    const { id } = req.params;
    ModulesModel.getModuleById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

//Crear un nuevo Modulo
exports.createModule = (req, res) => {
    const { name, description} = req.body;
    ModulesModel.createModule(name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message:"Modulo creado correctamente" });
    });
};


// Actualizar un Modulo
exports.updateModule = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    ModulesModel.updateModule(id, name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Modulo actualizado correctamente" });
    });
};

// Eliminar un Modulo
exports.deleteModule = (req, res) => {
    const { id } = req.params;
    ModulesModel.deleteModule(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Modulo eliminado correctamente" });
    });
};
