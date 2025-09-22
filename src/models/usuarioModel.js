const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    mail: { type: String, required: true, unique: true, trim: true },
    clave: { type: String, required: true },
    tipo: { type: String, enum: ["STD", "ADMIN"], default: "STD" },
    perfil: {
      nombre: { type: String, required: true, trim: true },
      foto: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);