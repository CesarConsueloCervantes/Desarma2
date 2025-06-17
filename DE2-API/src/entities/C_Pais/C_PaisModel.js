const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Pais:
 *       type: object
 *       required:
 *         - C_Pais_Nombre
 *         - C_Pais_Abreviacion
 *         - C_Pais_Estatus
 *       properties:
 *         C_Pais_Nombre:
 *           type: string
 *           description: Index Nombre del pais
 *         C_Pais_Abreviacion:
 *           type: string
 *           description: index Abreviacion internacional
 *         C_Pais_Estatus:
 *           type: Boolean
 *           description: Estatus del pais
 *       example:
 *         C_Pais_Nombre: Mexico
 *         C_Pais_Abreviacion: MX
 *         C_Pais_Estatus: true
 */

const paisScheme = Schema({
    C_Pais_Nombre: {
        type: String,
        index: true,
        unique: true,
        required: true,
        maxlength: 30,
    },

    C_Pais_Abreviacion: {
        type: String,
        required: true,
        index: true,
        unique: true,
        maxlength: 3,
    },

    C_Pais_Estatus: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const Pais =  mongoose.model('Pais', paisScheme);

module.exports = Pais;