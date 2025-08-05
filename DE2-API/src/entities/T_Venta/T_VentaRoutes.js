const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const ventacontroller = require('./T_VentaController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todas las ventas
router.get('/venta', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, ventacontroller.getVentas);

//este es la ruta para obtener una venta
router.get('/venta/:id', [
  param('id').isMongoId().withMessage('Invalid venta ID'),
], validate, ventacontroller.getVentaPorID);

//este es la ruta para crear una venta
router.post('/venta', [
    // Usuario ID
    body('T_Venta_Usuario_id')
      .exists({ checkFalsy: true }).withMessage('El ID del usuario es obligatorio')
      .isMongoId().withMessage('Debe ser un ObjectId válido'),

    // Envio ID (opcional)
    body('T_Venta_Envio_id')
      .optional()
      .isMongoId().withMessage('Debe ser un ObjectId válido'),

    // FormaPago
    body('T_Venta_FormaPago')
      .exists({ checkFalsy: true }).withMessage('La forma de pago es obligatoria')
      .isString().withMessage('La forma de pago debe ser una cadena de texto')
      .isLength({ max: 20 }).withMessage('La forma de pago no debe exceder 20 caracteres'),

    // Subtotal
    body('T_Venta_Subtotal')
      .exists({ checkFalsy: true }).withMessage('El subtotal es obligatorio')
      .isNumeric().withMessage('El subtotal debe ser un número')
      .custom(value => value >= 0 && value <= 9999999999).withMessage('El subtotal debe estar entre 0 y 9999999999'),

    // IVA (opcional)
    body('T_Venta_IVA')
      .optional()
      .isNumeric().withMessage('El IVA debe ser un número'),

    // Total (opcional)
    body('T_Venta_Total')
      .optional()
      .isNumeric().withMessage('El total debe ser un número'),

    // Estatus
    body('T_Venta_Estatus')
      .exists().withMessage('El estatus es obligatorio')
      .isBoolean().withMessage('El estatus debe ser booleano (true o false)')
],validate, ventacontroller.postVenta);

//este es la ruta para actualizar una venta
router.put('/venta/:id', [
  param('id').isMongoId().withMessage('Invalid venta ID'),
  // Usuario ID
  body('T_Venta_Usuario_id')
    .exists({ checkFalsy: true }).withMessage('El ID del usuario es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // Envio ID (opcional)
  body('T_Venta_Envio_id')
    .optional()
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // FormaPago
  body('T_Venta_FormaPago')
    .exists({ checkFalsy: true }).withMessage('La forma de pago es obligatoria')
    .isString().withMessage('La forma de pago debe ser una cadena de texto')
    .isLength({ max: 20 }).withMessage('La forma de pago no debe exceder 20 caracteres'),

  // Subtotal
  body('T_Venta_Subtotal')
    .exists({ checkFalsy: true }).withMessage('El subtotal es obligatorio')
    .isNumeric().withMessage('El subtotal debe ser un número')
    .custom(value => value >= 0 && value <= 9999999999).withMessage('El subtotal debe estar entre 0 y 9999999999'),

  // IVA (opcional)
  body('T_Venta_IVA')
    .optional()
    .isNumeric().withMessage('El IVA debe ser un número'),

  // Total (opcional)
  body('T_Venta_Total')
    .optional()
    .isNumeric().withMessage('El total debe ser un número'),

  // Estatus
  body('T_Venta_Estatus')
    .exists().withMessage('El estatus es obligatorio')
    .isBoolean().withMessage('El estatus debe ser booleano (true o false)')
],validate, ventacontroller.putVenta);

//este es la ruta para borrar una venta
router.delete('/venta/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, ventacontroller.deleteVenta);

module.exports = router;