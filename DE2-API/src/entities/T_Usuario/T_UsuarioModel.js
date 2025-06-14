const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  T_Usuario_id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    min: 1,
  },
  T_Usuario_Password: {
    type: String,
    required: true,
    maxlength: 20
  },
  T_Usuario_Nombre: {
    type: String,
    required: true,
    maxlength: 30,
    index: true
  },
  T_Usuario_Apellido: {
    type: String,
    required: true,
    maxlength: 30
  },
  T_Usuario_Telefono: {
    type: String,
    maxlength: 10,
    default: null
  },
  T_Usuario_Direccion_Calle: {
    type: String,
    maxlength: 30,
    default: null
  },
  T_Usuario_Direccion_Fraccionamiento: {
    type: String,
    maxlength: 40,
    default: null
  },
  T_Usuario_Direccion_CP: {
    type: String,
    maxlength: 6,
    default: null
  },
  T_Usuario_Direccion_Ciudad: {
    type: String,
    maxlength: 20,
    default: null
  },
  T_Usuario_Direccion_ProvinciaEstado: {
    type: String,
    maxlength: 20,
    default: null
  },
  T_Usuario_Direccion_Pais: {
    type: String,
    maxlength: 20,
    default: null
  },
  T_Usuario_Email: {
    type: String,
    required: true,
    maxlength: 20
  },
  T_Usuario_Rol: {
    type: String,
    required: true,
    maxlength: 30,
    default: 'cliente'
  },
  T_Usuario_Fecha_Registro: {
    type: Date,
    required: true,
    default: Date.now
  },
  T_Usuario_Fecha_Actualizacion: {
    type: Date,
    required: true,
    default: Date.now
  },
  T_Usuario_Estado: {
    type: Boolean,
    required: true,
    default: false
  }
});


module.exports = mongoose.model('Usuario', usuarioSchema);