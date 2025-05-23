const RMPModel = require('../Models/RMPModel.js');

// Obtener todos los Role Module Permissions
exports.getAllRMP = (req, res) => {
    RMPModel.getAllRMP((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Obtener Role Module Permission por ID
exports.getAllRMPById = (req, res) => {
    const { id } = req.params;
    RMPModel.getRMPById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

//Crear un nuevo Role Module Permission
exports.createRMP = (req, res) => {
    const { role_id, module_id, permission_id} = req.body;
    RMPModel.createRMP(role_id, module_id, permission_id , function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message:"permiso creado correctamente" });
    });
};


// Actualizar un Role Module Permission
exports.updateRMP = (req, res) => {
    const { id } = req.params;
    const { role_id, module_id, permission_id } = req.body;
    RMPModel.updateRMP(id,role_id, module_id, permission_id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Role Module Permission actualizado correctamente" });
    });
};

// Eliminar un Role Module Permission
exports.deleteRMP = (req, res) => {
    const { id } = req.params;
    RMPModel.deleteRMP(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Role Module Permission eliminado correctamente" });
    });
};
