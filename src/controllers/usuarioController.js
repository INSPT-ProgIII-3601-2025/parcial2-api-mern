const Usuario = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const getAllUsuarios = (req, res) => {
  res.status(200).json({ respuesta: "pendiente" });
};

const getUsuarioById = (req, res) => {
  res.status(200).json({ respuesta: "pendiente" });
};

const createUsuario = async (req, res) => {
  try {
    const { mail, clave, perfil } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ mail });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedClave = await bcrypt.hash(clave, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      mail,
      clave: hashedClave,
      perfil,
    });

    const savedUsuario = await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: {
        id: savedUsuario._id,
        nombre: savedUsuario.perfil.nombre,
        email: savedUsuario.mail,
        tipo: savedUsuario.tipo,
      },
    });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { mail, clave } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ mail });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña (comparar con hash)
    const isMatch = await bcrypt.compare(clave, usuario.clave);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, mail: usuario.mail, tipo: usuario.tipo },
      process.env.JWT_SECRET, // Ver .env o variable de entorno en produccion
      { expiresIn: "15000" } // 15 seg. para probar. Para que expire en 1 hora, colocar '1h'
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.perfil.nombre,
        email: usuario.mail,
        tipo: usuario.tipo,
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  loginUsuario,
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
};
