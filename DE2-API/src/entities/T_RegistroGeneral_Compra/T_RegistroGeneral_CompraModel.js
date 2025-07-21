const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroGeneralCompra:
 *       type: object
 *       required:
 *         - T_Compra_id
 *         - T_RegistroGeneral_Producto_id
 *         - T_RegistroGeneral_Cantidad
 *         - T_RegistroGeneral_Producto_Precio
 *         - T_RegistroGeneral_Estatus
 *       properties:
 *         T_Compra_id:
 *           type: string
 *           description: Código de lista de compra asociada a la compra individual
 *         T_RegistroGeneral_Producto_id:
 *           type: string
 *           description: Código del producto adquirido
 *         T_RegistroGeneral_Cantidad:
 *           type: Number
 *           description: Cantidad de artículos adquiridos
 *         T_RegistroGeneral_Producto_Precio:
 *           type: Number
 *           description: Precio unitario del producto
 *         T_RegistroGeneral_Estatus:
 *           type: Boolean
 *           description: Estado de la transacción (define si fue cancelada)
 *       example:
 *         T_Compra_id: 60d0fe4f5311236168a109cd
 *         T_RegistroGeneral_Producto_id: 60d0fe4f5311236168a109cd
 *         T_RegistroGeneral_Cantidad: 1234
 *         T_RegistroGeneral_Producto_Precio: 1234567890
 *         T_RegistroGeneral_Estatus: true
 */

const registrogeneralcompraSchema = Schema({
    
    T_Compra_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Compra"
    },
    
    T_RegistroGeneral_Producto_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Producto"
    },

    T_RegistroGeneral_Cantidad: {
        type: Number,
        required: true,
        min: 0,
        max: 9999
    },
    
    T_RegistroGeneral_Producto_Precio: {
        type: Number,
        required: true,
        min: 0,
        max: 9999999999
    },

    T_RegistroGeneral_Estatus: {
        type: Boolean,
        required: true,
        default: false
    },
},{
    timestamps: true
});

const RegistroGeneralCompra =  mongoose.model('RegistroGeneralCompra', registrogeneralcompraSchema);

module.exports = RegistroGeneralCompra;