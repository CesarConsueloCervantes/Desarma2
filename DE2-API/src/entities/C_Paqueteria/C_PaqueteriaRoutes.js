const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const paqueteriacontroller = require('./C_PaqueteriaController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todas las paqueterias
router.get('/paqueteria', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, paqueteriacontroller.getPaqueterias);

//este es la ruta para obtener una paqueteria
router.get('/paqueteria/:id', [
  param('id').isMongoId().withMessage('Invalid Paqueteria ID'),
], validate, paqueteriacontroller.getPaqueteriaPorID);

//este es la ruta para crear una paqueteria
router.post('/paqueteria', [
    body('C_Paqueteria_Nombre')
        .exists({checkFalsy: true}).withMessage('El nombre de la paqueteria es obligatorio')
        .isLength({max: 30}).withMessage('La abreviación debe tener máximo 30 caracteres'),

    body('C_Paqueteria_Contacto')
        .exists({checkFalsy: true}).withMessage('El contacto es obligatorio')
        .isLength({max: 30}).withMessage('La abreviación debe tener máximo 30 caracteres'),

    body('C_Paqueteria_Telefono')
        .exists({checkFalsy: true}).withMessage('El Telefono es obligatorio')
        .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener exactamente 10 dígitos numéricos'),

    body('C_Paqueteria_Estatus')
        .optional()
        .isBoolean().withMessage('El estatus debe ser un valor booleano (true o false)')
],validate, paqueteriacontroller.postPaqueteria);

//este es la ruta para actualizar una paqueteria
router.put('/paqueteria/:id', [
    body('C_Paqueteria_Nombre')
        .exists({checkFalsy: true}).withMessage('El nombre de la paqueteria es obligatorio')
        .isLength({max: 30}).withMessage('La abreviación debe tener máximo 30 caracteres'),

    body('C_Paqueteria_Contacto')
        .exists({checkFalsy: true}).withMessage('El contacto es obligatorio')
        .isLength({max: 30}).withMessage('La abreviación debe tener máximo 30 caracteres'),

    body('C_Paqueteria_Telefono')
        .exists({checkFalsy: true}).withMessage('El Telefono es obligatorio')
        .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener exactamente 10 dígitos numéricos'),

    body('C_Paqueteria_Estatus')
        .optional()
        .isBoolean().withMessage('El estatus debe ser un valor booleano (true o false)')
],validate, paqueteriacontroller.putPaqueteria);

//este es la ruta para borrar una paqueteria
router.delete('/paqueteria/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, paqueteriacontroller.deletePaqueteria);

module.exports = router;