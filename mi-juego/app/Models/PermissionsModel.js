const db = require('../database/database');

exports.getAllPermissions = (callback) => {
    db.all("SELECT * FROM permissions", [], callback);
};

exports.getPermissionById = (id, callback) => {
    db.get("SELECT * FROM permissions WHERE id = ?", [id], callback);
};

exports.createPermission = (name, description, callback) => {
    const query = "INSERT INTO permissions (name, description ) VALUES (?, ?)";
    db.run(query, [name, description], function(err){
        callback(err,this?.lastID)
    });
};

exports.updatePermission = (id, name, description, callback) => {
    const query = "UPDATE permissions SET name = ?, description = ?  WHERE id = ?";
    db.run(query, [name, description,id], callback);
};

exports.deletePermission = (id, callback) => {
    db.run("DELETE FROM permissions WHERE id = ?", [id], callback);
};
