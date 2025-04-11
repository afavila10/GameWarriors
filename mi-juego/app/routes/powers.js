const express = require('express');
const router = express.Router();
const powerController = require('../controllers/powerController');

// Definir rutas para Power
router.get('/', powerController.getAllPowers);
router.get('/:id', powerController.getPowersById);
router.post('/', powerController.createPower);
router.put('/:id', powerController.updatePower);
router.delete('/:id', powerController.deletePower);

module.exports = router;
