const Receta = require("../models/recetaModel");
const Usuario = require("../models/usuarioModel");

exports.getRecetasByUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const recetas = await Receta.find({ autor_id: req.params.id })
      .populate('autor_id', 'perfil.nombre perfil.foto')
      .select('nombre foto');
    res.json(recetas);
  } catch (err) {
    console.error("Error al obtener recetas del usuario:", err);
    res.status(500).json({ error: "Error al obtener recetas del usuario" });
  }
};