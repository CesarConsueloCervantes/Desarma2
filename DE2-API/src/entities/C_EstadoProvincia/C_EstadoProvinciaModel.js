const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     EstadoProvincia:
 *       type: object
 *       required:
 *         - C_EstadoProvincia_Nombre
 *         - C_EstadoProvincia_Abreviacion
 *         - C_EstadoProvincia_Estatus
 *       properties:
 *         C_EstadoProvincia_Nombre:
 *           type: string
 *           description: Index Nombre del estado/provincia
 *         C_EstadoProvincia_Abreviacion:
 *           type: string
 *           description: index Abreviación del nombre
 *         C_EstadoProvincia_Estatus:
 *           type: Boolean
 *           description: Estatus del estado/provincia
 *       example:
 *         C_EstadoProvincia_Nombre: Aguascalientes
 *         C_EstadoProvincia_Abreviacion: Ags
 *         C_EstadoProvincia_Estatus: true
 */

const estadoProvinciaScheme = Schema({
    C_EstadoProvincia_Nombre: {
        type: String,
        index: true,
        required: true,
        maxlength: 30,
    },

    C_EstadoProvincia_Abreviacion: {
        type: String,
        required: true,
        index: true,
        maxlength: 4,
    },

    C_EstadoProvincia_Estatus: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const EstadoProvincia =  mongoose.model('EstadoProvincia', estadoProvinciaScheme);

module.exports = EstadoProvincia;