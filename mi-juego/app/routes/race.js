const express = require("express");
const router = express.Router();
const raceController = require("../controllers/raceController");



// Rutas CRUD para los guerreros
router.get("/", raceController.getRace);
router.get("/:id", raceController.getRacesById);
router.post("/", raceController.createRace);
router.put("/:id", raceController.updateRace);
router.delete("/:id", raceController.deleteRace);



module.exports = router;