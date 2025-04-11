// Models/warriorTypeModel.js
const db = require('../database/database');

const WarriorTypeModel = {
    getAll: (callback) => {
        const query = "SELECT * FROM warrior_type";
        db.all(query, [], callback);
    },

    getById: (id, callback) => {
        const query = "SELECT * FROM warrior_type WHERE type_id = ?";
        db.get(query, [id], callback);
    },

    create: (name, description, callback) => {
        const query = "INSERT INTO warrior_type (name, description) VALUES (?, ?)";
        db.run(query, [name, description], function (err) {
            callback(err, this?.lastID);
        });
    },

    update: (id, name, description, callback) => {
        const query = "UPDATE warrior_type SET name = ?, description = ? WHERE type_id = ?";
        db.run(query, [name, description, id], callback);
    },

    delete: (id, callback) => {
        const query = "DELETE FROM warrior_type WHERE type_id = ?";
        db.run(query, [id], callback);
    }
};

module.exports = WarriorTypeModel;
