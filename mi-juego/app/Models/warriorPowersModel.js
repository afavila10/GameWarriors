const db = require('../database/database');

exports.getAllWarriorPowers = (callback) => {
    const query = `
        SELECT wp.warrior_id, p.power_id, p.name, p.percentage 
        FROM WARRIOR_POWERS wp
        JOIN POWERS p ON wp.power_id = p.power_id
    `;
    db.all(query, [], callback);
};

exports.getPowersByWarriorId = (warrior_id, callback) => {
    const query = `
        SELECT wp.warrior_id, p.power_id, p.name, p.percentage 
        FROM WARRIOR_POWERS wp
        JOIN POWERS p ON wp.power_id = p.power_id
        WHERE wp.warrior_id = ?
    `;
    db.all(query, [warrior_id], callback);
};

exports.assignPower = (warrior_id, power_id, callback) => {
    const query = "INSERT INTO warrior_powers (warrior_id, power_id) VALUES (?, ?)";
    db.run(query, [warrior_id, power_id], callback);
};

exports.removePower = (warrior_id, power_id, callback) => {
    const query = "DELETE FROM warrior_powers WHERE warrior_id = ? AND power_id = ?";
    db.run(query, [warrior_id, power_id], callback);
};


exports.updatePower = (warrior_id, old_power_id, new_power_id, callback) => {
    const query = `
        UPDATE warrior_powers 
        SET power_id = ? 
        WHERE warrior_id = ? AND power_id = ?
    `;
    db.run(query, [new_power_id, warrior_id, old_power_id], function (err) {
        callback(err, this?.changes); // devuelve cuántas filas fueron modificadas
    });
};
