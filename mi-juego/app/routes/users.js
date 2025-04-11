
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.loginUser);


// Obtener todos los usuarios
router.get("/", userController.getAllUsers);

// Obtener un usuario por ID
router.get("/:id", userController.getUserById);

// Actualizar un usuario
router.put("/:id", userController.updateUser);

// Eliminar un usuario
router.delete("/:id", userController.deleteUser);


module.exports = router;
