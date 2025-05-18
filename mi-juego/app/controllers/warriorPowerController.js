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

/*PUT /warrior-powers/:warrior_id/update
exports.updatePower = (req, res) => {
    const { id } = req.params;
    const { new_power_id } = req.body;

    if (!new_power_id) {
        return res.status(400).json({ error: "new_power_id es requerido" });
    }

    warriorPowersModel.updatePower(id, new_power_id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) {
            return res.status(404).json({ message: "No se encontró el id o fue cambiado." });
        }
        res.json({ message: "Poder actualizado correctamente" });
    });
};*/

exports.updatePower = (req, res) => {
    const { id } = req.params;
    const { new_power_id } = req.body;

    if (!new_power_id) return res.status(400).json({ error: "Falta el nuevo ID del poder" });

    // Tu lógica para actualizar en base de datos
    // Ejemplo usando un modelo ficticio:
    warriorPowersModel.updatePower(id, new_power_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Poder actualizado con éxito" });
    });
};


exports.removePowerFromWarrior = (req, res) => {
    const { id } = req.params;
    warriorPowersModel.removePower(id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Poder eliminado del guerrero" });
    });
};
