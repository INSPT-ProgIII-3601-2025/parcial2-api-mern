const Receta = require("../models/recetaModel");
const Usuario = require("../models/usuarioModel");
const Ingrediente = require("../models/ingredienteModel");

exports.getAllRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find()
      .populate('autor_id', 'perfil.nombre perfil.foto')
      .select('nombre foto autor_id');
    res.json(recetas);
  } catch (err) {
    console.error("Error al obtener recetas:", err);
    res.status(500).json({ error: "Error al obtener recetas" });
  }
};

exports.getAllRecetasPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Página y límite deben ser números positivos" });
    }

    const totalRecetas = await Receta.countDocuments();
    const totalPages = Math.ceil(totalRecetas / limit);

    if (page > totalPages && totalPages > 0) {
      return res.status(400).json({ error: "Página fuera de rango" });
    }

    const recetas = await Receta.find()
      .populate('autor_id', 'perfil.nombre perfil.foto')
      .select('nombre foto instrucciones ingredientes autor_id')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente

    const recetasFormateadas = recetas.map(receta => ({
      nombre: receta.nombre,
      foto: receta.foto,
      descripcion: receta.instrucciones,
      ingredientes: receta.ingredientes,
      autor_id: receta.autor_id
    }));

    res.json({
      recetas: recetasFormateadas,
      pagination: {
        totalRecetas,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    console.error("Error al obtener recetas paginadas:", err);
    res.status(500).json({ error: "Error al obtener recetas paginadas" });
  }
};

exports.getRecetaById = async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id)
      .populate('autor_id', 'perfil.nombre perfil.foto')
      .populate('ingredientes.ingrediente_id', 'nombre');
    if (!receta) return res.status(404).json({ error: "Receta no encontrada" });
    res.json(receta);
  } catch (err) {
    console.error("Error al obtener receta:", err);
    res.status(500).json({ error: "Error al obtener receta" });
  }
};

exports.createReceta = async (req, res) => {
  try {
    const nuevaReceta = new Receta(req.body);
    const saved = await nuevaReceta.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error al crear receta:", err);
    res.status(400).json({ error: "Error al crear receta" });
  }
};

exports.updateReceta = async (req, res) => {
  try {
    const updated = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Receta no encontrada" });
    res.json(updated);
  } catch (err) {
    console.error("Error al actualizar receta:", err);
    res.status(400).json({ error: "Error al actualizar receta" });
  }
};

exports.deleteReceta = async (req, res) => {
  try {
    const deleted = await Receta.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Receta no encontrada" });
    res.json({ message: "Receta eliminada" });
  } catch (err) {
    console.error("Error al eliminar receta:", err);
    res.status(500).json({ error: "Error al eliminar receta" });
  }
};
