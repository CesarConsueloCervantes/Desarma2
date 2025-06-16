/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       required:
 *         - C_Proveedor_Nombre
 *         - C_Proveedor_Contacto
 *         - C_Proveedor_Telefono
 *         - C_Proveedor_Direccion
 *         - C_Proveedor_Email
 *       properties:
 *         C_Proveedor_Nombre:
 *           type: string
 *           description: Index Nombre del comercial del proveedor
 *         C_Proveedor_Contacto:
 *           type: string
 *           description: Nombre del agente de ventas principal con quien se gestionan los pedidos
 *         C_Proveedor_Telefono:
 *           type: string
 *           description: Teléfono del proveedor
 *         C_Proveedor_Direccion:
 *           type: string
 *           description: Dirección del proveedor
 *         C_Proveedor_Email:
 *           type: string
 *           description: Email del agente de ventas principal del proveedor
 *         C_Proveedor_Estatus:
 *           type: Boolean
 *           description: Estado de activo, inactivo del proveedor
 *         C_Proveedor_CreadoPorId:
 *           type: string
 *           description: El Id del usuario que creo al proveedor
 *         C_Proveedor_ActualizadoPor:
 *           type: string
 *           description: El Id del usuario que actualizo al proveedor
 *       example:
 *         C_Proveedor_Nombre: Apple
 *         C_Proveedor_Contacto: Juan Ortiz
 *         C_Proveedor_Telefono: "1234567890"
 *         C_Proveedor_Direccion: Avenida siglo XXI
 *         C_Proveedor_Email: Apple@gmail.com
 *         C_Proveedor_Estatus: true
 *         C_Proveedor_CreadoPor: 60d0fe4f5311236168a109cd
 *         C_Proveedor_ActualizadoPor: 60d0fe4f5311236168a109cd
 */

const C_ProveedorSchema = new Schema({
    C_Proveedor_Nombre: {
        type: String,
        index: true,
        unique: true,
        maxlength: 30,
        required: true,
    },

    C_Proveedor_Contacto :{
        type: String,
        required: true,
    },

    C_Proveedor_Telefono :{
        type: String,
        match: [/^[0-9]{10}$/, 'El número de teléfono debe tener exactamente 10 dígitos numéricos'],
        required: true,
    },

    C_Proveedor_Direccion :{
        type: String,
        maxlength: 30,
        required: true,
    },

    C_Proveedor_Email :{
        type: String,
        required: true,
    },

    C_Proveedor_Estatus :{
        type: Boolean,
        default: true
    },

    C_Proveedor_CreadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    C_Proveedor_ActualizadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
},{
    timestamps: true
});

const Proveedor = mongoose.model('Proveedor', C_ProveedorSchema);

module.exports = Proveedor;