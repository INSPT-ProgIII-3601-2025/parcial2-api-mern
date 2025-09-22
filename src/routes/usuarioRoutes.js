const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");

// POST /usuarios/register - Registrar nuevo usuario
router.post("/register", usuarioController.register);

// POST /usuarios/login - Iniciar sesión y obtener token JWT
router.post("/login", usuarioController.login);

// GET /usuarios - Obtener todos los usuarios con paginación (requiere ser ADMIN)
router.get("/", authenticateToken, isAdmin, usuarioController.getAllUsuarios);

// GET /usuarios/:id/recetas - Obtener recetas de un usuario
router.get("/:id/recetas", usuarioController.getRecetasByUsuario);

module.exports = router;