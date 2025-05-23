const express = require('express');
const router = express.Router();
const ModulesController = require('../controllers/modulesController');

// Definir rutas para Module
router.get('/', ModulesController.getModules);
router.get('/:id', ModulesController.getModuleById);
router.post('/', ModulesController.createModule);
router.put('/:id', ModulesController.updateModule);
router.delete('/:id', ModulesController.deleteModule);

module.exports = router;
