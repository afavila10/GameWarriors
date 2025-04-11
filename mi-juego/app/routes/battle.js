const express = require('express');
const router = express.Router();
const battlesController = require('../controllers/battleController');



//
router.post("/", battlesController.registerBattle);
router.get("/", battlesController.getAllBattles); // Nueva ruta para obtener el historial


// Definir rutas para battles
//router.get('/',  battlesController.getAllBattles);
router.get('/:id', battlesController.getBattleById);
router.post('/', battlesController.createBattle);
router.put('/:id', battlesController.updateBattle);
router.delete('/:id', battlesController.deleteBattle);
//router.post("/battles", battlesController.registerBattle);

module.exports = router;

