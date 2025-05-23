const UserRolesModel = require('../Models/UserRolesModel');

exports.getAllUserRoles = (req, res) => {
    UserRolesModel.getAllUserRoles((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getUserRolesById = (req, res) => {
    const { id } = req.params;
    UserRolesModel.getUserRolesById(id, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createUserRole = (req, res) => {
    const { user_id, role_id } = req.body;
    UserRolesModel.createUserRole(user_id,role_id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Rol - usuario asignado correctamente" });
    });
};

exports.updateUserRole = (req, res) => {
    const { id } = req.params;
    const { user_id,role_id } = req.body;

    if (!user_id || !role_id) return res.status(400).json({ error: "Falta el nuevo ID del Rol - usuario" });

    UserRolesModel.updateUserRole(id, user_id, role_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Rol - usuario actualizado con éxito" });
    });
};


exports.DeleteUserRole = (req, res) => {
    const { id } = req.params;
    UserRolesModel.DeleteUserRole(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Rol - usuario eliminado del guerrero" });
    });
};
