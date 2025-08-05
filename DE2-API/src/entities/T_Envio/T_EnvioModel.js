const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Envio:
 *       type: object
 *       required:
 *         - T_Envio_Venta_id
 *         - T_Envio_Servicio_Paqueteria_id
 *         - T_Envio_Direccion_Calle
 *         - T_Envio_Direccion_Fraccionamiento
 *         - T_Envio_Direccion_CP
 *         - T_Envio_Direccion_Ciudad
 *         - T_Envio_Direccion_ProvinciaEstado
 *         - T_Envio_Direccion_Pais
 *         - T_Envio_Estatus
 *       properties:
 *          T_Envio_Venta_id:
 *              type: String
 *              description: Código de venta asociada al envío
 *          T_Envio_Servicio_Paqueteria_id:
 *              type: String
 *              description: numero telefónico asociado al perfil
 *          T_Envio_Direccion_Calle:
 *              type: String
 *              description: dirección física para entregas a domicilio
 *          T_Envio_Direccion_Fraccionamiento:
 *              type: String
 *              description: dirección física para entregas a domicilio
 *          T_Envio_Direccion_CP:
 *              type: String
 *              description: dirección física para entregas a domicilio
 *          T_Envio_Direccion_Ciudad:
 *              type: String
 *              description: dirección física para entregas a domicilio
 *          T_Envio_Direccion_ProvinciaEstado:
 *              type: String
 *              description: dirección física para entregas a domicilio
 *          T_Envio_Direccion_Pais:
 *              type: String
 *              description: dirección física para entregas a domicilio
 *          T_Envio_Estatus:
 *              type: Boolean
 *              description: Estado de la transacción (define si fue cancelada)
 *       example:
 *         T_Envio_Venta_id: 60d0fe4f5311236168a109cd
 *         T_Envio_Servicio_Paqueteria_id: 60d0fe4f5311236168a109cd
 *         T_Envio_Direccion_Calle: "String"
 *         T_Envio_Direccion_Fraccionamiento: "String"
 *         T_Envio_Direccion_CP: "123456"
 *         T_Envio_Direccion_Ciudad: "String"
 *         T_Envio_Direccion_ProvinciaEstado: 60d0fe4f5311236168a109cd
 *         T_Envio_Direccion_Pais: 60d0fe4f5311236168a109cd
 *         T_Envio_Estatus: true
 */

const envioSchema = Schema({

    T_Envio_Venta_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Venta' 
    },
    
    T_Envio_Servicio_Paqueteria_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Paqueteria'
    },

    T_Envio_Direccion_Calle: {
        type: String,
        required: true,
        maxlength: 30
    },

    T_Envio_Direccion_Fraccionamiento: {
        type: String,
        required: true,
        maxlength: 40
    },

    T_Envio_Direccion_CP: {
        type: String,
        required: true,
        maxlength: 6
    },

    T_Envio_Direccion_Ciudad: {
        type: String,
        required: true,
        maxlength: 20
    },

    T_Envio_Direccion_ProvinciaEstado: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'EstadoProvincia'
    },

    T_Envio_Direccion_Pais: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pais'
    },

    T_Envio_Estatus: {
        type: Boolean,
        required: true,
        default: false
    }

},{
    timestamps: true
});

const Envio =  mongoose.model('Envio', envioSchema);

module.exports = Envio;