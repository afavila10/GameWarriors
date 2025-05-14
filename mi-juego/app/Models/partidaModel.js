const db = require('../database/database');

exports.getAllPartidas = (callback) => {
    db.all("SELECT * FROM partidas", [], callback);
};

exports.getPartidasById = (id, callback) => {
    db.get("SELECT * FROM partidas WHERE id = ?", [id], callback);
};

exports.createPartida = (nombre, conectados, estado, creado_en, callback) => {
    const query = "INSERT INTO partidas (nombre, conectados, estado, creado_en) VALUES (?, ?, ?, ?)";
    db.run(query, [nombre, conectados, estado, creado_en], callback);
};

exports.updatePartida = (id,nombre, conectados, estado, creado_en, callback) => {
    const query = "UPDATE partidas SET nombre = ?, conectados = ?, estado = ?, creado_en= ? WHERE id = ?";
    db.run(query, [nombre, conectados, estado, creado_en, id], callback);
};

exports.deletePartida = (id, callback) => {
    db.run("DELETE FROM partidas WHERE id = ?", [id], callback);
};