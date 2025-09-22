const Ingrediente = require("../models/ingredienteModel");
const Receta = require("../models/recetaModel");

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Página y límite deben ser números positivos" });
    }

    const totalIngredientes = await Ingrediente.countDocuments();
    const totalPages = Math.ceil(totalIngredientes / limit);

    if (page > totalPages && totalPages > 0) {
      return res.status(400).json({ error: "Página fuera de rango" });
    }

    const ingredientes = await Ingrediente.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente

    res.json({
      ingredientes,
      pagination: {
        totalIngredientes,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    console.error("Error al obtener ingredientes:", err);
    res.status(500).json({ error: "Error al obtener ingredientes" });
  }
};

exports.getAllWithoutLimit = async (req, res) => {
  try {
    const ingredientes = await Ingrediente.find();
    res.json(ingredientes);
  } catch (err) {
    console.error("Error al obtener todos los ingredientes:", err);
    res.status(500).json({ error: "Error al obtener todos los ingredientes" });
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