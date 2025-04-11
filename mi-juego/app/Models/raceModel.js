const db = require('../database/database');

exports.getAllRaces = (callback) => {
    db.all("SELECT * FROM race", [], callback);
};

exports.getRacesById = (id, callback) => {
    db.get("SELECT * FROM race WHERE race_id = ?", [id], callback);
};

exports.createRace = (name, description, callback) => {
    const query = "INSERT INTO race (name, description ) VALUES (?, ?)";
    db.run(query, [name, description], callback);
};

exports.updateRace = (id, name, description, callback) => {
    const query = "UPDATE race SET name = ?, description = ? WHERE race_id = ?";
    db.run(query, [name, description, id], callback);
};

exports.deleteRace = (id, callback) => {
    db.run("DELETE FROM race WHERE race_id = ?", [id], callback);
};
