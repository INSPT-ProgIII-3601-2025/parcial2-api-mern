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

exports.getAllUsuarios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Página y límite deben ser números positivos" });
    }

    const totalUsers = await Usuario.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    if (page > totalPages && totalPages > 0) {
      return res.status(400).json({ error: "Página fuera de rango" });
    }

    const usuarios = await Usuario.find()
      .select('_id perfil.nombre mail createdAt')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente

    const usuariosFormateados = usuarios.map(usuario => ({
      id: usuario._id,
      nombre: usuario.perfil.nombre,
      email: usuario.mail,
      fechaCreacion: usuario.createdAt
    }));

    res.json({
      usuarios: usuariosFormateados,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};