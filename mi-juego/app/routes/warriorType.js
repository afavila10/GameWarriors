const express = require('express');
const router = express.Router();
const warriorTypeController = require('../controllers/warriorTypeController');

// Rutas para tipos de guerreros
router.get('/', warriorTypeController.getAllWarriorType);
router.get('/:id',warriorTypeController.getWarriorTypeById);
router.post('/', warriorTypeController.createWarriorType);
router.put('/:id', warriorTypeController.updateWarriorType);
router.delete('/:id', warriorTypeController.deleteWarriorType);

module.exports = router;
