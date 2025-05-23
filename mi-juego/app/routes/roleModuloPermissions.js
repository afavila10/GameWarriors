const express = require('express');
const router = express.Router();
const RMPController = require('../controllers/roleModulePermissionsController');

// Definir rutas para RMP
router.get('/', RMPController.getAllRMP);
router.get('/:id', RMPController.getAllRMPById);
router.post('/', RMPController.createRMP);
router.put('/:id', RMPController.updateRMP);
router.delete('/:id', RMPController.deleteRMP);

module.exports = router;