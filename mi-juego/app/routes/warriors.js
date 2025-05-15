const express = require("express");
const router = express.Router();
const warriorController = require("../controllers/warriorController");



// Rutas CRUD para los guerreros
router.get("/", warriorController.getAllWarriors);
router.get("/:id", warriorController.getWarriorById);
router.post("/", warriorController.createWarrior);
router.put("/:id", warriorController.updateWarrior);
router.delete("/:id", warriorController.deleteWarrior);

router.get("/listar", (req, res) => {
  const sql = "SELECT id, name FROM warriors";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


module.exports = router;
