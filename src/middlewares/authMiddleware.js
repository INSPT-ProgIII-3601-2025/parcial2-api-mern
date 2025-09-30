const jwt = require('jsonwebtoken');
const Receta = require('../models/recetaModel');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token del header Authorization (formato: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer token después de "Bearer "

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado.' });
    }

    // Agregar la información del usuario decodificada al request
    req.user = user;
    next(); // Continuar con la siguiente función
  });
};

// Middleware para verificar si el usuario es ADMIN
const isAdmin = (req, res, next) => {
  if (req.user.tipo !== 'ADMIN') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};

// Middleware para verificar si el usuario es el autor de la receta
const isAuthor = async (req, res, next) => {
  try {
    const receta = await Receta.findById(req.params.id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada.' });
    }

    // Verificar si es ADMIN o el autor
    if (req.user.tipo !== 'ADMIN' && req.user.id !== receta.autor_id.toString()) {
      return res.status(403).json({ error: 'Acceso denegado. Solo el autor o un administrador pueden realizar esta acción.' });
    }

    // Agregar la receta al request para evitar buscarla de nuevo en el controlador
    req.receta = receta;
    next();
  } catch (err) {
    console.error('Error en middleware isAuthor:', err);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

module.exports = {
    authenticateToken, isAdmin, isAuthor
};