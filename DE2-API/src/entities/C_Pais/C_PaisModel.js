const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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