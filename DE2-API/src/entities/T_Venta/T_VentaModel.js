const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Venta:
 *       type: object
 *       required:
 *         - T_Venta_Usuario_id
 *         - T_Venta_Envio_id
 *         - T_Venta_FormaPago
 *         - T_Venta_Subtotal
 *         - T_Usuario_Estado
 *       properties:
 *         T_Venta_Usuario_id:
 *           type: String
 *           description: Código del usuario a quien se realizó la venta
 *         T_Venta_Envio_id:
 *           type: String
 *           description: El id de envío es opcional dado que no todas las ventas requieren realizar un envío
 *         T_Venta_FormaPago:
 *           type: String
 *           description: Medio de paga empleado por el cliente
 *         T_Venta_Subtotal:
 *           type: Number
 *           description: Subtotal de la cuenta
 *         T_Venta_IVA:
 *           type: Number
 *           description: Porcentaje de impuestos
 *         T_Venta_Total:
 *           type: Number
 *           description: Total de la cuenta
 *         T_Usuario_Estado:
 *           type: Boolean
 *           description: Estado de la transacción (define si fue cancelada)
 *       example:
 *         T_Venta_Usuario_id: 60d0fe4f5311236168a109cd
 *         T_Venta_Envio_id: 60d0fe4f5311236168a109cd
 *         T_Venta_FormaPago: "String"
 *         T_Venta_Subtotal: 1234567890
 *         T_Venta_Estatus: true
 */

const ventaSchema = Schema({
    
    T_Venta_Usuario_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },

    T_Venta_Envio_id: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Envio'
    },

    T_Venta_FormaPago: {
        type: String,
        required: false,
        maxlength: 20
    },

    T_Venta_Subtotal: {
        type: Number,
        required: false,
        min: 0,
        max: 9999999999
    },

    T_Venta_IVA: {
        type: Number,
    },

    T_Venta_Total: {
        type: Number,
    },

    T_Venta_Estatus: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

ventaSchema.pre('save', function(next){
    this.T_Venta_IVA = this.T_Venta_Subtotal*0.16;
    this.T_Venta_Total = this.T_Venta_IVA + this.T_Venta_Subtotal;
    next();
});

ventaSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();

  // Si se va a actualizar el Subtotal, recalcula IVA y Total
  if (update.T_Venta_Subtotal !== undefined) {
    const subtotal = update.T_Venta_Subtotal;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    // Asigna los nuevos valores
    update.T_Venta_IVA = iva;
    update.T_Venta_Total = total;

    this.setUpdate(update);
  }

  next();
});

const Venta =  mongoose.model('Venta', ventaSchema);

module.exports = Venta;