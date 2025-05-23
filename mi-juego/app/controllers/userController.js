const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const db = require('../database/database.js'); // Ajusta la ruta si es necesario


// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    db.all("SELECT user_id, username, email,role_id password FROM USERS", [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error al obtener usuarios" });
        res.json(rows);
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT user_id, username, email, role_id FROM USERS WHERE user_id = ?", [id], (err, user) => {
        if (err) return res.status(500).json({ error: "Error al buscar usuario" });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json(user);
    });
};

// Actualizar usuario (username y email)
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email , role_id } = req.body;

    db.run("UPDATE USERS SET username = ?, email = ?, role_id = ? WHERE user_id = ?", [username, email, role_id, id], function (err) {
        if (err) return res.status(500).json({ error: "Error al actualizar usuario" });
        if (this.changes === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json({ message: "Usuario del Login actualizado correctamente" });
    });
};

// Eliminar usuario
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM USERS WHERE user_id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: "Error al eliminar usuario" });
        if (this.changes === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json({ message: "Usuario eliminado correctamente" });
    });
};


/*-------------REGISTRAR UN USUARIO Y LOGIN---------------*/
// Registro
exports.register = (req, res) => {
    const { username, email, password, role_id } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: "Error al encriptar la contraseña" });
        User.create(username, email, hashedPassword, role_id, (error, result) => {
            if (error) {
                if (error.message.includes("UNIQUE constraint failed")) {
                    return res.status(400).json({ error: "El usuario o correo ya existen" });
                }
                return res.status(500).json({ error: "Error al registrar usuario" });
            }

            res.status(201).json({ message: "Usuario registrado correctamente", userId: result.user_id });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario por email
    db.get("SELECT * FROM USERS WHERE email = ?", [email], async (err, user) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

        // Comparar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

        // Generar token JWT
        const token = jwt.sign({ user_id: user.user_id }, "secreto_super_seguro", { expiresIn: "2h" });

        res.json({ message: "Inicio de sesión exitoso", token });
    });
};


