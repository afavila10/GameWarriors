const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/RolesController');

// Definir rutas para Role
router.get('/', rolesController.getRoles);
router.get('/:id', rolesController.getRoleById);
router.post('/', rolesController.createRole);
router.put('/:id', rolesController.updateRole);
router.delete('/:id', rolesController.deleteRole);

module.exports = router;
