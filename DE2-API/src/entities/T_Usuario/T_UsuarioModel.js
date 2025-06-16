const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       required:
 *         - T_Usuario_Password
 *         - T_Usuario_Nombre
 *         - T_Usuario_Apellido
 *         - T_Usuario_Email
 *         - T_Usuario_Rol
 *         - T_Usuario_Estado
 *       properties:
 *         T_Usuario_Password:
 *           type: string
 *           description: contraseña del usuario
 *         T_Usuario_Nombre:
 *           type: string
 *           description: Index Nombre del usuario
 *         T_Usuario_Apellido:
 *           type: string
 *           description: Apellido del usuario
 *         T_Usuario_Telefono:
 *           type: string
 *           description: Numero de telefono del usuario
 *         T_Usuario_Direccion_Calle:
 *           type: string
 *           description: Direccion de calle del usuario
 *         T_Usuario_Direccion_Fraccionamiento:
 *           type: String
 *           description: Fraccionamiento del usuario
 *         T_Usuario_Direccion_CP:
 *           type: string
 *           description: Codigo postal del usuario
 *         T_Usuario_Direccion_Ciudad:
 *           type: String
 *           description: Ciudad del usuario
 *         T_Usuario_Direccion_ProvinciaEstado:
 *           type: String
 *           description: Id de la ProvinciaEstado
 *         T_Usuario_Direccion_Pais:
 *           type: String
 *           description: Id del Pais
 *         T_Usuario_Email:
 *           type: String
 *           description: Email del usuario
 *         T_Usuario_Rol:
 *           type: String
 *           enum: ['cliente', 'administrador']
 *           description: Rol del usuario
 *         T_Usuario_Estado:
 *           type: Boolean
 *           description: Estado del usuario
 *       example:
 *         T_Usuario_Password: 1234d
 *         T_Usuario_Nombre: Juan
 *         T_Usuario_Apellido: Ortiz
 *         T_Usuario_Telefono: "1234567890"
 *         T_Usuario_Direccion_Calle: Avenida siglo XXI
 *         T_Usuario_Direccion_Fraccionamiento: Lindavista
 *         T_Usuario_Direccion_CP: 29833
 *         T_Usuario_Direccion_Ciudad: Aguascalientes
 *         T_Usuario_Direccion_ProvinciaEstado: 60d0fe4f5311236168a109cd
 *         T_Usuario_Direccion_Pais: 60d0fe4f5311236168a109cd
 *         T_Usuario_Email: juan@email.com
 *         T_Usuario_Rol: cliente
 *         T_Usuario_Estado: true
 *         T_Usuario_CreadoPorId: 60d0fe4f5311236168a109cd
 *         T_Usuario_ActualizadoPorId: 60d0fe4f5311236168a109cd
 */

const usuarioSchema = Schema({

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

  C_Proveedor_Telefono :{
    type: String,
    match: [/^[0-9]{10}$/, 'El número de teléfono debe tener exactamente 10 dígitos numéricos'],
    required: true,
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
    type: Schema.Types.ObjectId,
    maxlength: 20,
    ref: "ProvinciaEstado",
  },

  T_Usuario_Direccion_Pais: {
    type: Schema.Rypes.ObjectId,
    maxlength: 20,
    ref: "Pais",
  },

  T_Usuario_Email: {
    type: String,
    required: true,
    unique: true
  },

  T_Usuario_Rol: {
    type: String,
    required: true,
    enum: ['cliente', 'administrador'],
    default: 'cliente'
  },

  T_Usuario_Estado: {
    type: Boolean,
    required: true,
    default: false
  },

  T_Usuario_CreadoPorId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },

  T_Usuario_ActualizadoPorId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },

},{
    timestamps: true
});

const Usuario =  mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;