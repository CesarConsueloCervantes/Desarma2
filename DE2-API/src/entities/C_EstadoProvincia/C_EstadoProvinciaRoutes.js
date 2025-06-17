const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const estadoProvinciaController = require('./C_EstadoProvinciaController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los Estado/Provincia
router.get('/estado_provincia', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, estadoProvinciaController.getEstadoProvincias);

//este es la ruta para obtener un Estado/Provincia
router.get('/estado_provincia/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, estadoProvinciaController.getEstadoProvinciaPorID);

//este es la ruta para crear un Estado/Provincia
router.post('/estado_provincia', [
  body('C_EstadoProvincia_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio')
    .isLength({ max: 30 }).withMessage('El nombre no debe superar los 30 caracteres'),

  body('C_EstadoProvincia_Abreviacion')
    .exists({ checkFalsy: true }).withMessage('La abreviación es obligatoria')
    .isLength({ max: 4 }).withMessage('La abreviación no debe superar los 4 caracteres'),

  body('C_EstadoProvincia_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser un valor booleano'),
],validate, estadoProvinciaController.postEstadoProvincia);

//este es la ruta para actualizar un Estado/Provincia
router.put('/estado_provincia/:id', [
  body('C_EstadoProvincia_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio')
    .isLength({ max: 30 }).withMessage('El nombre no debe superar los 30 caracteres'),

  body('C_EstadoProvincia_Abreviacion')
    .exists({ checkFalsy: true }).withMessage('La abreviación es obligatoria')
    .isLength({ max: 4 }).withMessage('La abreviación no debe superar los 4 caracteres'),

  body('C_EstadoProvincia_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser un valor booleano'),
],validate, estadoProvinciaController.putEstadoProvincia);

//este es la ruta para borrar un Estado/Provincia
router.delete('/estado_provincia/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, estadoProvinciaController.deleteEstadoProvincia);

module.exports = router;