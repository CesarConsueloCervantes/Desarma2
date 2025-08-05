const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const compracontroller = require('./T_CompraController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todas las compras
router.get('/compra', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, compracontroller.getCompras);

//este es la ruta para obtener una compra
router.get('/compra/:id', [
  param('id').isMongoId().withMessage('Invalid compra ID'),
], validate, compracontroller.getCompraPorID);

//este es la ruta para crear una compra
router.post('/compra', [
  body('T_Compra_Proveedor_id')
    .notEmpty().withMessage('El ID del proveedor es obligatorio')
    .isMongoId().withMessage('Debe ser un ID de Mongo válido'),

  body('T_Compra_FormaPago')
    .notEmpty().withMessage('La forma de pago es obligatoria')
    .isString().withMessage('La forma de pago debe ser texto')
    .isLength({ max: 20 }).withMessage('La forma de pago debe tener máximo 20 caracteres'),

  body('T_Compra_Subtotal')
    .notEmpty().withMessage('El subtotal es obligatorio')
    .isFloat({ min: 0, max: 9999999999 }).withMessage('El subtotal debe ser un número válido mayor o igual a 0'),

  body('T_Compra_Estatus')
    .optional() // No es obligatorio porque tiene default
    .isBoolean().withMessage('El estatus debe ser booleano'),
],validate, compracontroller.postCompra);

//este es la ruta para actualizar una compra
router.put('/compra/:id', [
  param('id').isMongoId().withMessage('Invalid compra ID'),
  body('T_Compra_Proveedor_id')
    .notEmpty().withMessage('El ID del proveedor es obligatorio')
    .isMongoId().withMessage('Debe ser un ID de Mongo válido'),

  body('T_Compra_FormaPago')
    .notEmpty().withMessage('La forma de pago es obligatoria')
    .isString().withMessage('La forma de pago debe ser texto')
    .isLength({ max: 20 }).withMessage('La forma de pago debe tener máximo 20 caracteres'),

  body('T_Compra_Subtotal')
    .notEmpty().withMessage('El subtotal es obligatorio')
    .isFloat({ min: 0, max: 9999999999 }).withMessage('El subtotal debe ser un número válido mayor o igual a 0'),

  body('T_Compra_Estatus')
    .optional() // No es obligatorio porque tiene default
    .isBoolean().withMessage('El estatus debe ser booleano'),
],validate, compracontroller.putCompra);

//este es la ruta para borrar una compra
router.delete('/compra/:id', [
  param('id').isMongoId().withMessage('Invalid Compra ID'),
], validate, compracontroller.deleteCompra);

module.exports = router;