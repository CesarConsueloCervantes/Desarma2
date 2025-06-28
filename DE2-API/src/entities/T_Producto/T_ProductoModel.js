const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - T_Producto_Nombre
 *         - T_Producto_Precio
 *         - T_Producto_Stock
 *         - T_Producto_Marca
 *         - T_Producto_Estado
 *       properties:
 *         T_Producto_Nombre:
 *           type: string
 *           description: Nombre del producto
 *         T_Producto_Descripcion:
 *           type: string
 *           description: Breve descripción del producto
 *         T_Producto_Precio:
 *           type: Number
 *           description: Precio unitario del producto
 *         T_Producto_Stock:
 *           type: Number
 *           description: Cantidad de stock en inventario
 *         T_Producto_Marca:
 *           type: string
 *           description: Nombre de la marca comercial del producto
 *         T_Producto_Estado:
 *           type: Boolean
 *           description: Estado del producto (define si sigue disponible o no)
 *       example:
 *         T_Producto_Nombre: "String"
 *         T_Producto_Descripcion: "string"
 *         T_Producto_Precio: 1234567890
 *         T_Producto_Stock: 1234
 *         T_Producto_Marca: "string"
 *         T_Producto_Estado: true
 */

const productoSchema = Schema({
    T_Producto_Nombre: {
        type: String,
        required: true,
        index: true,
        maxlength: 30
    },
    
    T_Producto_Descripcion: {
        type: String,
        maxlength: 100
    },

    T_Producto_Precio: {
        type: Number,
        required: true,
        min: 0,
        max: 9999999999
    },

    T_Producto_Stock: {
        type: Number,
        required: true,
        min: 0,
        max: 9999
    },

    T_Producto_Marca: {
        type: String,
        index: true,
        required: true,
        maxlength: 20
    },

    T_Producto_Estado: {
        type: Boolean,
        required: true,
        default: false
    },

},{
    timestamps: true
});

const Producto =  mongoose.model('Producto', productoSchema);

module.exports = Producto;