const db = require('../database/database');

exports.getAllPowers = (callback) => {
    db.all("SELECT * FROM powers", [], callback);
};

exports.getPowersById = (id, callback) => {
    db.get("SELECT * FROM Powers WHERE Power_id = ?", [id], callback);
};

exports.createPower = (name, description, percentage, callback) => {
    const query = "INSERT INTO Powers (name, description, percentage) VALUES (?, ?, ?)";
    db.run(query, [name, description, percentage], callback);
};

exports.updatePower = (id, name, description, percentage, callback) => {
    const query = "UPDATE Powers SET name = ?, description = ?, percentage = ? WHERE power_id = ?";
    db.run(query, [name, description, percentage, id], callback);
};

exports.deletePower = (id, callback) => {
    db.run("DELETE FROM Powers WHERE Power_id = ?", [id], callback);
};
