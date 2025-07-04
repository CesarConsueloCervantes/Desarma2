const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Compra:
 *       type: object
 *       required:
 *         - T_Compra_Proveedor_id
 *         - T_Compra_FormaPago
 *         - T_Compra_Subtotal
 *         - T_Compra_Estatus
 *       properties:
 *         T_Compra_Proveedor_id:
 *           type: string
 *           description: Código del proveedor a quien se compraron los productos
 *         T_Compra_FormaPago:
 *           type: string
 *           description: Medio de paga empleado por el cliente
 *         T_Compra_Subtotal:
 *           type: string
 *           description: Subtotal de la cuenta
 *         T_Compra_IVA:
 *           type: string
 *           description: Porcentaje de impuestos
 *         T_Compra_Total:
 *           type: string
 *           description: Total de la cuenta
 *         T_Compra_Estatus:
 *           type: string
 *           description: Estado de la transacción (define si fue cancelada)
 *       example:
 *         T_Compra_Proveedor_id: 60d0fe4f5311236168a109cd
 *         T_Compra_FormaPago: "String"
 *         T_Compra_Subtotal: 1234567890
 *         T_Compra_Estatus: true
 */

const compraSchema = Schema({

    T_Compra_Proveedor_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Proveedor'
    },

    T_Compra_FormaPago: {
        type: String,
        required: true,
        maxlength: 20,
    },

    T_Compra_Subtotal: {
        type: Number,
        required: true,
        min: 0,
        max: 9999999999
    },

    T_Compra_IVA: {
        type: Number,
    },

    T_Compra_Total: {
        type: Number,
    },

    T_Compra_Estatus: {
        type: Boolean,
        required: true,
        default: false
    },

},{
    timestamps: true
});

compraSchema.pre('save', function(next){
    this.T_Compra_IVA = this.T_Compra_Subtotal*0.16;
    this.T_Compra_Total = this.T_Compra_IVA + this.T_Compra_Subtotal;
    next();
});

compraSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();

  // Si se va a actualizar el Subtotal, recalcula IVA y Total
  if (update.T_Compra_Subtotal !== undefined) {
    const subtotal = update.T_Compra_Subtotal;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    // Asigna los nuevos valores
    update.T_Compra_IVA = iva;
    update.T_Compra_Total = total;

    this.setUpdate(update);
  }

  next();
});

const Compra =  mongoose.model('Compra', compraSchema);

module.exports = Compra;