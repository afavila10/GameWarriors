const RolesModel = require('../Models/RolesModel.js');

// Obtener todos los Rols
exports.getRoles = (req, res) => {
    RolesModel.getAllRoles((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener Rol por ID
exports.getRoleById = (req, res) => {
    const { id } = req.params;
    RolesModel.getRoleById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

//Crear un nuevo Rol
exports.createRole = (req, res) => {
    const { name, description} = req.body;
    RolesModel.createRole(name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message:"rol creado correctamente" });
    });
};



// Actualizar un Rol
exports.updateRole = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    RolesModel.updateRole(id, name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "rol actualizado correctamente" });
    });
};

// Eliminar un Rol
exports.deleteRole = (req, res) => {
    const { id } = req.params;
    RolesModel.deleteRole(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "rol eliminado correctamente" });
    });
};
