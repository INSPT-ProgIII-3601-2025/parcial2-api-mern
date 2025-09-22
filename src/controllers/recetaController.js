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
