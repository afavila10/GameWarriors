const db = require('../database/database');

exports.getAllModules = (callback) => {
    db.all("SELECT * FROM modules", [], callback);
};

exports.getModuleById = (id, callback) => {
    db.get("SELECT * FROM modules WHERE id = ?", [id], callback);
};

exports.createModule = (name, description, callback) => {
    const query = "INSERT INTO modules (name, description ) VALUES (?, ?)";
    db.run(query, [name, description], function(err){
        callback(err,this?.lastID)
    });
};

exports.updateModule = (id, name, description, callback) => {
    const query = "UPDATE modules SET name = ?, description = ?  WHERE id = ?";
    db.run(query, [name, description,id], callback);
};

exports.deleteModule = (id, callback) => {
    db.run("DELETE FROM modules WHERE id = ?", [id], callback);
};
