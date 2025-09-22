const Ingrediente = require("../models/ingredienteModel");
const Receta = require("../models/recetaModel");

exports.getAll = async (req, res) => {
  try {
    const ingredientes = await Ingrediente.find();
    res.json(ingredientes);
  } catch (err) {
    console.error("Error al obtener ingredientes:", err);
    res.status(500).json({ error: "Error al obtener ingredientes" });
  }
};

exports.getRecetasByIngrediente = async (req, res) => {
  try {
    const ingrediente = await Ingrediente.findById(req.params.id);
    if (!ingrediente) return res.status(404).json({ error: "Ingrediente no encontrado" });

    const recetas = await Receta.find({ 'ingredientes.ingrediente_id': req.params.id })
      .populate('autor_id', 'perfil.nombre perfil.foto')
      .select('nombre foto');
    res.json(recetas);
  } catch (err) {
    console.error("Error al obtener recetas con el ingrediente:", err);
    res.status(500).json({ error: "Error al obtener recetas con el ingrediente" });
  }
};