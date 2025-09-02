// src/models/recetaModel.js
let recetas = require("../../data/recetas");

// Obtener todas
function getAll() {
  return recetas;
}

// Buscar por ID
function getById(id) {
  return recetas.find((r) => r._id === id);
}

// Crear
function create(receta) {
  const newId = recetas.length ? Math.max(...recetas.map((r) => r._id)) + 1 : 1;
  const nueva = { _id: newId, ...receta };
  recetas.push(nueva);
  return nueva;
}

// Actualizar
function update(id, data) {
  let recetaActualizada = null;
  const index = recetas.findIndex((r) => r._id === id);
  if (index !== -1) {
    recetas[index] = { ...recetas[index], ...data };
    recetaActualizada = recetas[index];
  }
  return recetaActualizada;
}

// Eliminar: El alumno debe refactorear este codigo feo
function remove(id) {
  const index = recetas.findIndex((r) => r._id === id);
  if (index === -1) return false;
  recetas.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
