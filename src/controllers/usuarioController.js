const Receta = require("../models/recetaModel");
const Usuario = require("../models/usuarioModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { mail, clave, perfil } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ mail });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedClave = await bcrypt.hash(clave, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      mail,
      clave: hashedClave,
      perfil
    });

    const savedUsuario = await nuevoUsuario.save();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: savedUsuario._id,
        nombre: savedUsuario.perfil.nombre,
        email: savedUsuario.mail,
        tipo: savedUsuario.tipo
      }
    });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { mail, clave } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ mail });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar contraseña (comparar con hash)
    const isMatch = await bcrypt.compare(clave, usuario.clave);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, mail: usuario.mail, tipo: usuario.tipo },
      process.env.JWT_SECRET || 'tu_clave_secreta_jwt',
      { expiresIn: '15000' } // 15 seg. para probar. Para que expire en 1 hora, colocar '1h'
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.perfil.nombre,
        email: usuario.mail,
        tipo: usuario.tipo
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

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
      .select('_id perfil.nombre mail createdAt tipo')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente

    const usuariosFormateados = usuarios.map(usuario => ({
      id: usuario._id,
      nombre: usuario.perfil.nombre,
      email: usuario.mail,
      tipo: usuario.tipo,
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