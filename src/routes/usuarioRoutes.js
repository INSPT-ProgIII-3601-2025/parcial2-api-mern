const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// GET /usuarios - Obtener todos los usuarios con paginación
router.get("/", usuarioController.getAllUsuarios);

// GET /usuarios/:id/recetas - Obtener recetas de un usuario
router.get("/:id/recetas", usuarioController.getRecetasByUsuario);

module.exports = router;