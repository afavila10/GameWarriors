const express = require('express');
const router = express.Router();
const warriorPowerController = require('../controllers/warriorPowerController.js');

// Rutas para poderes de guerreros
router.get('/', warriorPowerController.getAllWarriorPowers);
router.get('/:id', warriorPowerController.getWarriorPowersById);
router.post('/', warriorPowerController.assignPowerToWarrior);
router.put('/:id', warriorPowerController.updatePower);
router.delete('/:id', warriorPowerController.removePowerFromWarrior);

module.exports = router;
