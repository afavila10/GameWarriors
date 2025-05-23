const PermissionsModel = require('../Models/PermissionsModel.js');

// Obtener todos los Modulos
exports.getAllPermissions = (req, res) => {
    PermissionsModel.getAllPermissions((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener Modulo por ID
exports.getAllPermissionById = (req, res) => {
    const { id } = req.params;
    PermissionsModel.getPermissionById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

//Crear un nuevo Modulo
exports.createPermission = (req, res) => {
    const { name, description} = req.body;
    PermissionsModel.createPermission(name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message:"permiso creado correctamente" });
    });
};


// Actualizar un Modulo
exports.updatePermission = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    PermissionsModel.updatePermission(id, name, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Modulo actualizado correctamente" });
    });
};

// Eliminar un Modulo
exports.deletePermission = (req, res) => {
    const { id } = req.params;
    PermissionsModel.deletePermission(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Modulo eliminado correctamente" });
    });
};
