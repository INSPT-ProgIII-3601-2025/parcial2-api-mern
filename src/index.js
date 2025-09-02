// src/index.js
const express = require("express");
const cors = require("cors");
const recetaRoutes = require("./routes/recetaRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/recetas", recetaRoutes);

// Inicio del server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
