const express = require('express');
const router = express.Router();
const spellsController = require('../controllers/spellsController');

// Definir rutas para Spell
router.get('/', spellsController.getSpells);
router.get('/:id', spellsController.getSpellById);
router.post('/', spellsController.createSpell);
router.put('/:id', spellsController.updateSpell);
router.delete('/:id', spellsController.deleteSpell);

module.exports = router;

