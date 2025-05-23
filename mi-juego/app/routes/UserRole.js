const express = require('express');
const router = express.Router();
const UserRoleController = require('../controllers/userRolesController');

// Definir rutas para Spell
router.get('/', UserRoleController.getAllUserRoles);
router.get('/:id', UserRoleController.getUserRolesById);
router.post('/', UserRoleController.createUserRole);
router.put('/:id', UserRoleController.updateUserRole);
router.delete('/:id', UserRoleController.DeleteUserRole);

module.exports = router;

