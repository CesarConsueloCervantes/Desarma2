const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const registroGeneralCompracontroller = require('./T_RegistroGeneral_CompraController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los RegistroGeneralCompra
router.get('/registro_general_compra', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, registroGeneralCompracontroller.getRegistroGeneralCompras);

//este es la ruta para obtener un RegistroGeneralCompra
router.get('/registro_general_compra/:id', [
  param('id').isMongoId().withMessage('Invalid registro_general_compra ID'),
], validate, registroGeneralCompracontroller.getRegistroGeneralCompraPorID);

//este es la ruta para crear un RegistroGeneralCompra
router.post('/registro_general_compra', [
    // ID de compra: obligatorio, MongoID válido
  body('T_Compra_id')
    .exists({ checkFalsy: true }).withMessage('El ID de compra es obligatorio')
    .isMongoId().withMessage('El ID de compra debe ser un MongoId válido'),

  // ID de producto: obligatorio, MongoID válido
  body('T_RegistroGeneral_Producto_id')
    .exists({ checkFalsy: true }).withMessage('El ID de producto es obligatorio')
    .isMongoId().withMessage('El ID de producto debe ser un MongoId válido'),

  // Cantidad: obligatoria, número >= 0 y <= 9999
  body('T_RegistroGeneral_Cantidad')
    .exists({ checkFalsy: true }).withMessage('La cantidad es obligatoria')
    .isInt({ min: 0, max: 9999 }).withMessage('La cantidad debe estar entre 0 y 9999'),

  // Precio del producto: obligatorio, número >= 0 y <= 9,999,999,999
  body('T_RegistroGeneral_Producto_Precio')
    .exists({ checkFalsy: true }).withMessage('El precio es obligatorio')
    .isFloat({ min: 0, max: 9999999999 }).withMessage('El precio debe estar entre 0 y 9,999,999,999'),

  // Estatus: opcional, booleano
  body('T_RegistroGeneral_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser booleano')
],validate, registroGeneralCompracontroller.postRegistroGeneralCompra);

//este es la ruta para actualizar un RegistroGeneralCompra
router.put('/registro_general_compra/:id', [
    param('id').isMongoId().withMessage('Invalid registro_general_compra ID'),
    // ID de compra: obligatorio, MongoID válido
  body('T_Compra_id')
    .exists({ checkFalsy: true }).withMessage('El ID de compra es obligatorio')
    .isMongoId().withMessage('El ID de compra debe ser un MongoId válido'),

  // ID de producto: obligatorio, MongoID válido
  body('T_RegistroGeneral_Producto_id')
    .exists({ checkFalsy: true }).withMessage('El ID de producto es obligatorio')
    .isMongoId().withMessage('El ID de producto debe ser un MongoId válido'),

  // Cantidad: obligatoria, número >= 0 y <= 9999
  body('T_RegistroGeneral_Cantidad')
    .exists({ checkFalsy: true }).withMessage('La cantidad es obligatoria')
    .isInt({ min: 0, max: 9999 }).withMessage('La cantidad debe estar entre 0 y 9999'),

  // Precio del producto: obligatorio, número >= 0 y <= 9,999,999,999
  body('T_RegistroGeneral_Producto_Precio')
    .exists({ checkFalsy: true }).withMessage('El precio es obligatorio')
    .isFloat({ min: 0, max: 9999999999 }).withMessage('El precio debe estar entre 0 y 9,999,999,999'),

  // Estatus: opcional, booleano
  body('T_RegistroGeneral_Estatus')
    .optional()
    .isBoolean().withMessage('El estatus debe ser booleano')
],validate, registroGeneralCompracontroller.putRegistroGeneralCompra);

//este es la ruta para borrar un RegistroGeneralCompra
router.delete('/registro_general_compra/:id', [
  param('id').isMongoId().withMessage('Invalid registro_general_compra ID'),
], validate, registroGeneralCompracontroller.deleteRegistroGeneralCompra);

module.exports = router;