const db = require('../database/database');

module.exports = {
  // Obtener todos los guerreros
  getAllWarriors(callback) {
    const query = `
      SELECT w.*, wt.name AS type_name 
      FROM Warrior w
      LEFT JOIN Warrior_Type wt ON w.type_id = wt.type_id`;
    db.all(query, [], callback);
  },

  // Obtener un guerrero por ID
  getWarriorById(id, callback) {
    const query = `
      SELECT w.*, wt.name AS type_name 
      FROM Warrior w
      LEFT JOIN Warrior_Type wt ON w.type_id = wt.type_id
      WHERE w.warrior_id = ?`;
    db.get(query, [id], callback);
  },

  // Crear nuevo guerrero
  createWarrior(data, callback) {
    const {
      name,
      Total_Powers,
      Total_Magic,
      Health,
      Speed,
      Intenlligence,
      Status,
      race_id,
      type_id
    } = data;

    const query = `
      INSERT INTO Warrior (
        name, Total_Powers, Total_Magic, Health, Speed, Intenlligence, Status, race_id, type_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      name,
      Total_Powers,
      Total_Magic,
      Health,
      Speed,
      Intenlligence,
      Status,
      race_id,
      type_id
    ];

    db.run(query, params, function (err) {
      callback(err, this?.lastID);
    });
  },

  // Actualizar guerrero
  updateWarrior(id, data, callback) {
    const {
      name,
      race_id,
      type_id
    } = data;

    const query = `
      UPDATE Warrior 
      SET name = ?, race_id = ?, type_id = ? 
      WHERE warrior_id = ?`;

    const params = [name, race_id, type_id, id];
    db.run(query, params, callback);
  },

  // Eliminar guerrero
  deleteWarrior(id, callback) {
    db.run("DELETE FROM Warrior WHERE warrior_id = ?", [id], callback);
  }
};
