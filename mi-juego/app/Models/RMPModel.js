const db = require('../database/database');

exports.getAllRMP = (callback) => {
    db.all("SELECT * FROM role_module_permissions", [], callback);
};

exports.getRMPById = (id, callback) => {
    db.get("SELECT * FROM role_module_permissions WHERE id = ?", [id], callback);
};

exports.createRMP = (role_id, module_id, permission_id, callback) => {
    const query = "INSERT INTO role_module_permissions (role_id, module_id, permission_id) VALUES (?, ?, ?)";
    db.run(query, [role_id, module_id, permission_id], function(err){
        callback(err,this?.lastID)
    });
};

exports.updateRMP = (id, role_id, module_id, permission_id, callback) => {
    const query = "UPDATE role_module_permissions SET role_id = ?, module_id = ?, permission_id = ? WHERE id = ?";
    db.run(query, [role_id, module_id, permission_id ,id], callback);
};

exports.deleteRMP = (id, callback) => {
    db.run("DELETE FROM role_module_permissions WHERE id = ?", [id], callback);
};
