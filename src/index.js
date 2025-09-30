// src/index.js
const express = require("express");
const cors = require("cors");
const recetaRoutes = require("./routes/recetaRoutes");
const ingredientesRoutes = require("./routes/ingredientesRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const connectDB = require("./config/db");

const app = express();
app.use(cors()); // middleware para...
app.use(express.json()); // middleware para...

// Conectar BD
connectDB();

// Rutas
app.use("/recetas", recetaRoutes);
app.use("/ingredientes", ingredientesRoutes);
app.use("/usuarios", usuarioRoutes);

// Inicio del server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
