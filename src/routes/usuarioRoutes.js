// src/routes/recetaRoutes.js
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {authenticateToken, isAdmin} = require("../middlewares/authMiddleware")

// CRUD
router.get("/", authenticateToken, isAdmin, usuarioController.getAllUsuarios);
router.get("/:id", usuarioController.getUsuarioById);
router.post("/register", usuarioController.createUsuario);
router.post("/login", usuarioController.loginUsuario);
//router.put("/:id", usuarioController.updateReceta);
//router.delete("/:id", usuarioController.deleteReceta);

module.exports = router;
