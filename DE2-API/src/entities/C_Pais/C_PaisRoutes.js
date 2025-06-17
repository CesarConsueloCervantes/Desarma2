const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const paisController = require('./C_PaisController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los Paises
router.get('/pais', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, paisController.getPaises);

//este es la ruta para obtener un pais
router.get('/pais/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, paisController.getPaisPorID);

//este es la ruta para crear un pais
router.post('/pais', [
  body('C_Pais_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre del país es obligatorio')
    .isLength({ max: 30 }).withMessage('El nombre del país no debe exceder los 30 caracteres'),

  body('C_Pais_Abreviacion')
    .exists({ checkFalsy: true }).withMessage('La abreviación es obligatoria')
    .isLength({ max: 3 }).withMessage('La abreviación debe tener máximo 3 caracteres'),

  body('C_Pais_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser un valor booleano (true o false)')
],validate, paisController.postPais);

router.put('/pais/:id', [
  body('C_Pais_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre del país es obligatorio')
    .isLength({ max: 30 }).withMessage('El nombre del país no debe exceder los 30 caracteres'),

  body('C_Pais_Abreviacion')
    .exists({ checkFalsy: true }).withMessage('La abreviación es obligatoria')
    .isLength({ max: 3 }).withMessage('La abreviación debe tener máximo 3 caracteres'),

  body('C_Pais_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser un valor booleano (true o false)')
],validate, paisController.putPais);

//este es la ruta para borrar un Usuario
router.delete('/pais/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, paisController.deletePais);

module.exports = router;