const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Paqueteria:
 *       type: object
 *       required:
 *         - C_Paqueteria_Nombre
 *         - C_Paqueteria_Contacto
 *         - C_Paqueteria_Telefono
 *         - C_Paqueteria_Estatus
 *       properties:
 *         C_Paqueteria_Nombre:
 *           type: string
 *           description: Index Nombre de la paqueteria
 *         C_Paqueteria_Contacto:
 *           type: string
 *           description: Nombre del agente de ventas principal con quien se gestionan los pedidos
 *         C_Paqueteria_Telefono:
 *           type: string
 *           description: numero telefonico de contacto con el proveedor
 *         C_Paqueteria_Estatus:
 *           type: Boolean
 *           description: Estatus de la paqueteria
 *       example:
 *         C_Paqueteria_Nombre: String
 *         C_Paqueteria_Contacto: String
 *         C_Paqueteria_Telefono: '1234567890'
 *         C_Paqueteria_Estatus: true
 */

const paqueteriaScheme = Schema({
    C_Paqueteria_Nombre: {
        type: String,
        index: true,
        unique: true,
        required: true,
        maxlength: 30,
    },
    
    C_Paqueteria_Contacto:{
        type: String,
        required: true,
        maxlength: 30,
    },
    
    C_Paqueteria_Telefono:{
        type: String,
        match: [/^[0-9]{10}$/, 'El número de teléfono debe tener exactamente 10 dígitos numéricos'],
        required: true,
    },

    C_Paqueteria_Estatus:{
        type: Boolean,
        required: true,
        default: false
    }

},{
    timestamps: true
});

const Paqueteria =  mongoose.model('Paqueteria', paqueteriaScheme);

module.exports = Paqueteria;