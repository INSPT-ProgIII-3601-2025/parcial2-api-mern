const mongoose = require("mongoose");

const recetaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    foto: { type: String },
    instrucciones: { type: String, required: true },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    ingredientes: [
      {
        cantidad: { type: Number, required: true },
        unidad_medida: { type: String, required: true },
        nombre: { type: String, required: true },
        ingrediente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente', required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receta", recetaSchema);
