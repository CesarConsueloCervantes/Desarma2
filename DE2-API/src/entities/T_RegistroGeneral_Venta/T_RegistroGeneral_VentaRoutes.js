const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const registroGeneralVentaContoller = require('./T_RegistroGeneral_VentaController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los RegistroGeneralVenta
router.get('/registro_general_venta', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, registroGeneralVentaContoller.getRegistroGeneralVentas);

//este es la ruta para obtener un RegistroGeneralVenta
router.get('/registro_general_venta/:id', [
  param('id').isMongoId().withMessage('Invalid Producto ID'),
], validate, registroGeneralVentaContoller.getRegistroGeneralVentaPorID);

//este es la ruta para crear un RegistroGeneralVenta
router.post('/registro_general_venta',[
  // ID de venta: obligatorio, debe ser MongoId válido
  body('T_Venta_id')
    .exists({ checkFalsy: true }).withMessage('El ID de venta es obligatorio')
    .isMongoId().withMessage('El ID de venta debe ser un MongoId válido'),

  // ID de producto: obligatorio, debe ser MongoId válido
  body('T_RegistroGeneral_Producto_id')
    .exists({ checkFalsy: true }).withMessage('El ID de producto es obligatorio')
    .isMongoId().withMessage('El ID de producto debe ser un MongoId válido'),

  // Cantidad: obligatoria, debe ser entero >= 0 y <= 9999
  body('T_RegistroGeneral_Cantidad')
    .exists({ checkFalsy: true }).withMessage('La cantidad es obligatoria')
    .isInt({ min: 0, max: 9999 }).withMessage('La cantidad debe estar entre 0 y 9999'),

  // Precio del producto: obligatorio, debe ser número >= 0 y <= 9,999,999,999
  body('T_RegistroGeneral_Producto_Precio')
    .exists({ checkFalsy: true }).withMessage('El precio es obligatorio')
    .isFloat({ min: 0, max: 9999999999 }).withMessage('El precio debe estar entre 0 y 9,999,999,999'),

  // Estatus: opcional, booleano
  body('T_RegistroGeneral_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser booleano')
],validate, registroGeneralVentaContoller.postRegistroGeneralVenta);

//este es la ruta para actualizar un RegistroGeneralVenta
router.put('/registro_general_venta/:id', [
    param('id').isMongoId().withMessage('Invalid RegistroGeneral ID'),
    // ID de venta: obligatorio, debe ser MongoId válido
  body('T_Venta_id')
    .exists({ checkFalsy: true }).withMessage('El ID de venta es obligatorio')
    .isMongoId().withMessage('El ID de venta debe ser un MongoId válido'),

  // ID de producto: obligatorio, debe ser MongoId válido
  body('T_RegistroGeneral_Producto_id')
    .exists({ checkFalsy: true }).withMessage('El ID de producto es obligatorio')
    .isMongoId().withMessage('El ID de producto debe ser un MongoId válido'),

  // Cantidad: obligatoria, debe ser entero >= 0 y <= 9999
  body('T_RegistroGeneral_Cantidad')
    .exists({ checkFalsy: true }).withMessage('La cantidad es obligatoria')
    .isInt({ min: 0, max: 9999 }).withMessage('La cantidad debe estar entre 0 y 9999'),

  // Precio del producto: obligatorio, debe ser número >= 0 y <= 9,999,999,999
  body('T_RegistroGeneral_Producto_Precio')
    .exists({ checkFalsy: true }).withMessage('El precio es obligatorio')
    .isFloat({ min: 0, max: 9999999999 }).withMessage('El precio debe estar entre 0 y 9,999,999,999'),

  // Estatus: opcional, booleano
  body('T_RegistroGeneral_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser booleano')
],validate, registroGeneralVentaContoller.putRegistroGeneralVenta);

//este es la ruta para borrar un RegistroGeneralVenta
router.delete('/registro_general_venta/:id', [
  param('id').isMongoId().withMessage('Invalid Product ID'),
], validate, registroGeneralVentaContoller.deleteRegistroGeneralVenta);

module.exports = router;