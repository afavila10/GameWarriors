const express = require("express");
const router = express.Router();
const warriorController = require("../controllers/warriorController");



// Rutas CRUD para los guerreros
router.get("/", warriorController.getAllWarriors);
router.get("/:id", warriorController.getWarriorById);
router.post("/", warriorController.createWarrior);
router.put("/:id", warriorController.updateWarrior);
router.delete("/:id", warriorController.deleteWarrior);



module.exports = router;
