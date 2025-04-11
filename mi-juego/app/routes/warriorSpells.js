const express = require('express');
const router = express.Router();
const warriorSpellsController = require('../controllers/warriorSpellController');

// Definir rutas
router.get('/', warriorSpellsController.getAllWarriorSpells);
router.get('/:warrior_id', warriorSpellsController.getSpellsByWarriorId);
router.post('/', warriorSpellsController.assignSpellToWarrior);
router.delete('/:warrior_id/:spell_id', warriorSpellsController.removeWarriorSpell);

module.exports = router;
