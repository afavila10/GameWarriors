const db = require('../database/database');

exports.getAllRoles = (callback) => {
    db.all("SELECT * FROM roles", [], callback);
};

exports.getRoleById = (id, callback) => {
    db.get("SELECT * FROM roles WHERE id = ?", [id], callback);
};

exports.createRole = (name, description, callback) => {
    const query = "INSERT INTO roles (name, description ) VALUES (?, ?)";
    db.run(query, [name, description], function(err){
        callback(err,this?.lastID)
    });
};

exports.updateRole = (id, name, description, callback) => {
    const query = "UPDATE roles SET name = ?, description = ?  WHERE id = ?";
    db.run(query, [name, description,id], callback);
};

exports.deleteRole = (id, callback) => {
    db.run("DELETE FROM roles WHERE id = ?", [id], callback);
};
