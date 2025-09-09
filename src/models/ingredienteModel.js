const mongoose = require("mongoose");

const ingredienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    foto: { type: String, required: true },
    color: { type: String, default: "#FFFFFF" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ingrediente", ingredienteSchema);
