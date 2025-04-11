const db = require('../database/database');

exports.getAllSpells = (callback) => {
    db.all("SELECT * FROM Spells", [], callback);
};

exports.getSpellById = (id, callback) => {
    db.get("SELECT * FROM Spells WHERE spell_id = ?", [id], callback);
};

exports.createSpell = (name, description, percentage, callback) => {
    const query = "INSERT INTO Spells (name, description, percentage) VALUES (?, ?, ?)";
    db.run(query, [name, description, percentage], callback);
};

exports.updateSpell = (id, name, description, percentage, callback) => {
    const query = "UPDATE Spells SET name = ?, description = ?, percentage = ? WHERE spell_id = ?";
    db.run(query, [name, description, percentage, id], callback);
};

exports.deleteSpell = (id, callback) => {
    db.run("DELETE FROM Spells WHERE spell_id = ?", [id], callback);
};
