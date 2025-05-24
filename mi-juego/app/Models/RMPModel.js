const db = require('../database/database');

exports.getAllRMP = (callback) => {
    const query = `
        SELECT rmp.*, r.name AS role_name, n.name AS module_name, p.name AS permission_name
        FROM role_module_permissions AS rmp
        LEFT JOIN roles AS r ON r.id = rmp.role_id
        LEFT JOIN modules AS n ON n.id = rmp.module_id
        LEFT JOIN permissions AS p ON p.id = rmp.permission_id
    `;
    db.all(query, [], callback);
};


exports.getRMPById = (id, callback) => {
    db.get("SELECT * FROM role_module_permissions WHERE id = ?", [id], callback);
};

exports.createRMP = (role_id, module_id, permission_id, callback) => {
    const query = "INSERT INTO role_module_permissions (role_id, module_id, permission_id) VALUES (?, ?, ?)";
    db.run(query, [role_id, module_id, permission_id], function (err) {
        callback(err, this?.lastID)
    });
};

exports.updateRMP = (id, role_id, module_id, permission_id, callback) => {
    const query = "UPDATE role_module_permissions SET role_id = ?, module_id = ?, permission_id = ? WHERE id = ?";
    db.run(query, [role_id, module_id, permission_id, id], callback);
};

exports.deleteRMP = (id, callback) => {
    db.run("DELETE FROM role_module_permissions WHERE id = ?", [id], callback);
};
