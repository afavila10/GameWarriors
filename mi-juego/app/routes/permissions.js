const express = require('express');
const router = express.Router();
const PermissionsController = require('../controllers/permissionsController');

// Definir rutas para Permission
router.get('/', PermissionsController.getAllPermissions);
router.get('/:id', PermissionsController.getAllPermissionById);
router.post('/', PermissionsController.createPermission);
router.put('/:id', PermissionsController.updatePermission);
router.delete('/:id', PermissionsController.deletePermission);

module.exports = router;