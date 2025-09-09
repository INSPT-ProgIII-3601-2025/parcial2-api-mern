const Ingrediente = require("../models/IngredienteModel");

exports.getAll = async (req, res) => {
  try {
    const ingredientes = await Ingrediente.find();
    res.json(ingredientes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener ingredientes" });
  }
};