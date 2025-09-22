// src/routes/recetaRoutes.js
const express = require("express");
const router = express.Router();
const recetaController = require("../controllers/recetaController");
const { authenticateToken, isAuthor } = require("../middlewares/authMiddleware");

// CRUD
router.get("/", recetaController.getAllRecetasPaginated);
router.get("/all", recetaController.getAllRecetas);
router.get("/:id", recetaController.getRecetaById);
router.post("/", authenticateToken, recetaController.createReceta); // Requiere autenticación
router.put("/:id", authenticateToken, isAuthor, recetaController.updateReceta); // Requiere ser autor o ADMIN
router.delete("/:id", authenticateToken, isAuthor, recetaController.deleteReceta); // Requiere ser autor o ADMIN

module.exports = router;
