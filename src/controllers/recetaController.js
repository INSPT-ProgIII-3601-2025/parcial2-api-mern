// src/controllers/recetaController.js
const Receta = require("../models/recetaModel");

exports.getAllRecetas = (req, res) => {
  res.json(Receta.getAll());
};

exports.getRecetaById = (req, res) => {
  const id = parseInt(req.params.id);
  const receta = Receta.getById(id);
  if (!receta) return res.status(404).json({ error: "Receta no encontrada" });
  res.json(receta);
};

exports.createReceta = (req, res) => {
  const { nombre, foto, color } = req.body;
  if (!nombre || !foto || !color) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  const nueva = Receta.create({ nombre, foto, color });
  res.status(201).json(nueva);
};

exports.updateReceta = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizada = Receta.update(id, req.body);
  if (!actualizada) return res.status(404).json({ error: "Receta no encontrada" });
  res.json(actualizada);
};

exports.deleteReceta = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminada = Receta.remove(id);
  if (!eliminada) return res.status(404).json({ error: "Receta no encontrada" });
  res.json({ message: "Receta eliminada" });
};
