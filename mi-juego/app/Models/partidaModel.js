const db = require('../database/database');

exports.getAllPartidas = (callback) => {
    db.all("SELECT * FROM partidas", [], callback);
};

exports.getPartidasById = (id, callback) => {
    db.get("SELECT * FROM partidas WHERE id = ?", [id], callback);
};

exports.createPartida = (nombre,callback) => {
    const query = "INSERT INTO partidas (nombre) VALUES (?)";
    db.run(query, [nombre], callback);
};

exports.updatePartida = (id,nombre, conectados, estado, callback) => {
    const query = "UPDATE partidas SET nombre = ?, conectados = ?, estado = ? WHERE id = ?";
    db.run(query, [nombre, conectados, estado, id], callback);
};

exports.deletePartida = (id, callback) => {
    db.run("DELETE FROM partidas WHERE id = ?", [id], callback);
};