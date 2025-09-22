const express = require('express');

const router = express.Router();
const ingredientesController = require('../controllers/ingredientesController');

router.get("/", ingredientesController.getAll);
router.get("/all", ingredientesController.getAllWithoutLimit);
router.get("/:id/recetas", ingredientesController.getRecetasByIngrediente);

module.exports = router;