const db = require("../database/database");

const User = {
    create: (username, email, hashedPassword, role_id, callback) => {
        const sql = `INSERT INTO USERS (username, email, password, role_id) VALUES (?, ?, ?, ?)`;
        db.run(sql, [username, email, hashedPassword, role_id], function (err) {
            callback(err, { user_id: this.lastID });
        });
    },
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM USERS WHERE email = ?`;
        db.get(sql, [email], callback);
    }
};



// Crear un nuevo usuario
exports.create = (username, email, hashedPassword,role_id, callback) => {
    const query = "INSERT INTO USERS (username, email, password, role_id) VALUES (?, ?, ?, ?)";
    db.run(query, [username, email, hashedPassword, role_id], function (err) {
        callback(err, { user_id: this.lastID });
    });
};

exports.getAll = (callback) => {
    const query = `
    SELECT u.*, 
    r.name AS role_name
    FROM USERS AS u
    LEFT JOIN roles AS r ON r.id = u.role_id
    `;
    db.all(query, [], callback);
};

// Obtener un usuario por ID
exports.getById = (id, callback) => {
    const query = "SELECT user_id, username, email , role_id FROM USERS WHERE user_id = ?";
    db.get(query, [id], callback);
};

// Actualizar un usuario
exports.update = (id, username, email, callback) => {
    const query = "UPDATE USERS SET username = ?, email = ? role_id=? WHERE user_id = ?";
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


