const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroGeneralVenta:
 *       type: object
 *       required:
 *         - T_Venta_id
 *         - T_RegistroGeneral_Producto_id
 *         - T_RegistroGeneral_Cantidad
 *         - T_RegistroGeneral_Producto_Precio
 *         - T_RegistroGeneral_Estatus
 *       properties:
 *         T_Venta_id:
 *           type: string
 *           description: Código que liga esta venta individual con una venta eng eneral
 *         T_RegistroGeneral_Producto_id:
 *           type: string
 *           description: Código del producto que se vendió
 *         T_RegistroGeneral_Cantidad:
 *           type: Number
 *           description: Cantidad de artículos vendidos
 *         T_RegistroGeneral_Producto_Precio:
 *           type: Number
 *           description: Precio unitario del producto
 *         T_RegistroGeneral_Estatus:
 *           type: Boolean
 *           description: Estado de la transacción (define si fue cancelada)
 *       example:
 *         T_Venta_id: 60d0fe4f5311236168a109cd
 *         T_RegistroGeneral_Producto_id: 60d0fe4f5311236168a109cd
 *         T_RegistroGeneral_Cantidad: 1234
 *         T_RegistroGeneral_Producto_Precio: 1234567890
 *         T_RegistroGeneral_Estatus: true
 */

const registrogeneralSchema = Schema({
    T_Venta_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Venta"
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

const RegistroGeneralVenta =  mongoose.model('RegistroGeneralVenta', registrogeneralSchema);

module.exports = RegistroGeneralVenta;