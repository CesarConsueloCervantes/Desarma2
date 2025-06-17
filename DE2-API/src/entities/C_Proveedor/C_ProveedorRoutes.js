const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const proveedorController = require('./C_ProveedorController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los proveedores
router.get('/proveedor', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, proveedorController.getProveedores);

//este es la ruta para obeter un proveedor
router.get('/proveedor/:id', [
  param('id').isMongoId().withMessage('Invalid proveedor ID'),
], validate, proveedorController.getProveedorPorID);

//este es la ruta para crear
router.post('/proveedor', [
  body('C_Proveedor_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 30 }).withMessage('El nombre debe tener máximo 30 caracteres'),

  body('C_Proveedor_Contacto')
    .exists({ checkFalsy: true }).withMessage('El contacto es obligatorio')
    .isString().withMessage('El contacto debe ser texto'),

  body('C_Proveedor_Telefono')
    .exists({ checkFalsy: true }).withMessage('El teléfono es obligatorio')
    .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener exactamente 10 dígitos numéricos'),

  body('C_Proveedor_Direccion')
    .exists({ checkFalsy: true }).withMessage('La dirección es obligatoria')
    .isString().withMessage('La dirección debe ser texto')
    .isLength({ max: 30 }).withMessage('La dirección debe tener máximo 30 caracteres'),

  body('C_Proveedor_Email')
    .exists({ checkFalsy: true }).withMessage('El email es obligatorio')
    .isEmail().withMessage('El email debe ser válido')
    .normalizeEmail(),

  body('C_Proveedor_CreadoPor')
    .exists({ checkFalsy: true }).withMessage('C_Proveedor_CreadoPorId es obligatorio')
    .isMongoId().withMessage('C_Proveedor_CreadoPorId debe ser un ID válido'),
  
  body('C_Proveedor_ActualizadoPor')
    .exists({ checkFalsy: true }).withMessage('C_Proveedor_ActualizadoPorId es obligatorio')
    .isMongoId().withMessage('C_Proveedor_ActualizadoPorId debe ser un ID válido'),


], validate, proveedorController.postProveedor);

//este es la ruta para actualizar
router.put('/proveedor/:id', [
  param('id').isMongoId().withMessage('Invalid proveedor ID'),
  body('C_Proveedor_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 30 }).withMessage('El nombre debe tener máximo 30 caracteres'),

  body('C_Proveedor_Contacto')
    .exists({ checkFalsy: true }).withMessage('El contacto es obligatorio')
    .isString().withMessage('El contacto debe ser texto'),

  body('C_Proveedor_Telefono')
    .exists({ checkFalsy: true }).withMessage('El teléfono es obligatorio')
    .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener exactamente 10 dígitos numéricos'),

  body('C_Proveedor_Direccion')
    .exists({ checkFalsy: true }).withMessage('La dirección es obligatoria')
    .isString().withMessage('La dirección debe ser texto')
    .isLength({ max: 30 }).withMessage('La dirección debe tener máximo 30 caracteres'),

  body('C_Proveedor_Email')
    .exists({ checkFalsy: true }).withMessage('El email es obligatorio')
    .isEmail().withMessage('El email debe ser válido')
    .normalizeEmail(),

/*
  body('C_Proveedor_CreadoPorId')
    .exists({ checkFalsy: true }).withMessage('C_Proveedor_CreadoPorId es obligatorio')
    .isMongoId().withMessage('C_Proveedor_CreadoPorId debe ser un ID válido'),
  
  body('C_Proveedor_ActualizadoPorId')
    .exists({ checkFalsy: true }).withMessage('C_Proveedor_ActualizadoPorId es obligatorio')
    .isMongoId().withMessage('C_Proveedor_ActualizadoPorId debe ser un ID válido'),
*/

], validate, proveedorController.putProveedor);


//este es la ruta para borrar un proveedor
router.delete('/proveedor/:id', [
  param('id').isMongoId().withMessage('Invalid proveedor ID'),
], validate, proveedorController.deleteProveedor);

module.exports = router;