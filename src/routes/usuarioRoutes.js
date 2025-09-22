const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// GET /usuarios/:id/recetas - Obtener recetas de un usuario
router.get("/:id/recetas", usuarioController.getRecetasByUsuario);

module.exports = router;