const db = require("../database/database");

const User = {
    create: (username, email, hashedPassword, callback) => {
        const sql = `INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)`;
        db.run(sql, [username, email, hashedPassword], function (err) {
            callback(err, { user_id: this.lastID });
        });
    },
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM USERS WHERE email = ?`;
        db.get(sql, [email], callback);
    }
};



// Crear un nuevo usuario
exports.create = (username, email, hashedPassword, callback) => {
    const query = "INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)";
    db.run(query, [username, email, hashedPassword], function (err) {
        callback(err, { user_id: this.lastID });
    });
};

// Obtener todos los usuarios
exports.getAll = (callback) => {
    const query = "SELECT user_id, username, email FROM USERS";
    db.all(query, [], callback);
};

// Obtener un usuario por ID
exports.getById = (id, callback) => {
    const query = "SELECT user_id, username, email FROM USERS WHERE user_id = ?";
    db.get(query, [id], callback);
};

// Actualizar un usuario
exports.update = (id, username, email, callback) => {
    const query = "UPDATE USERS SET username = ?, email = ? WHERE user_id = ?";
    db.run(query, [username, email, id], function (err) {
        callback(err, { changes: this.changes });
    });
};

// Eliminar un usuario
exports.delete = (id, callback) => {
    const query = "DELETE FROM USERS WHERE user_id = ?";
    db.run(query, [id], function (err) {
        callback(err, { changes: this.changes });
    });
};


module.exports = User;


