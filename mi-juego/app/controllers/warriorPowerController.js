const warriorPowersModel = require('../Models/warriorPowersModel');

exports.getAllWarriorPowers = (req, res) => {
    warriorPowersModel.getAllWarriorPowers((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getWarriorPowersById = (req, res) => {
    const { id } = req.params;
    warriorPowersModel.getPowersByWarriorId(id, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.assignPowerToWarrior = (req, res) => {
    const { warrior_id, power_id } = req.body;
    warriorPowersModel.assignPower(warrior_id, power_id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Poder asignado correctamente" });
    });
};

// // PUT /warrior-powers/:warrior_id/update
// exports.updatePower = (req, res) => {
//     const { warrior_id } = req.params;
//     const { old_power_id, new_power_id } = req.body;

//     if (!old_power_id || !new_power_id) {
//         return res.status(400).json({ error: "old_power_id y new_power_id son requeridos" });
//     }

//     WarriorPowersModel.updatePower(warrior_id, old_power_id, new_power_id, (err, changes) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (changes === 0) {
//             return res.status(404).json({ message: "No se encontró ese poder para ese guerrero o ya fue cambiado." });
//         }
//         res.json({ message: "Poder actualizado correctamente" });
//     });
// };

exports.removePowerFromWarrior = (req, res) => {
    const { warrior_id, power_id } = req.params;
    warriorPowersModel.removePower(warrior_id, power_id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Poder eliminado del guerrero" });
    });
};
