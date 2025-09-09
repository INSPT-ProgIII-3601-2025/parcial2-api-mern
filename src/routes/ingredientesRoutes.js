const app = require('express');

const router = app.Router();
const ingredientesController = require('./../controllers/ingredientesController')

router.get("/", ingredientesController.getAll);

module.exports = router;