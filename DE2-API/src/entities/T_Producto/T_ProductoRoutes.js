const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const productocontroller = require('./T_ProductoController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los productos
router.get('/producto', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, productocontroller.getProductos);

//este es la ruta para obtener un producto
router.get('/producto/:id', [
  param('id').isMongoId().withMessage('Invalid Producto ID'),
], validate, productocontroller.getProductoPorID);

//este es la ruta para crear un producto
router.post('/producto', [
  body('T_Producto_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre del producto es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 30 }).withMessage('El nombre no debe exceder 30 caracteres'),

  body('T_Producto_Descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('La descripción no debe exceder 100 caracteres'),

  body('T_Producto_Precio')
    .exists({ checkFalsy: true }).withMessage('El precio del producto es obligatorio')
    .isNumeric().withMessage('El precio debe ser un número')
    .custom(value => value >= 0 && value <= 9999999999).withMessage('El precio debe estar entre 0 y 9999999999'),

  body('T_Producto_Stock')
    .exists({ checkFalsy: true }).withMessage('El stock del producto es obligatorio')
    .isInt({ min: 0, max: 9999 }).withMessage('El stock debe ser un número entero entre 0 y 9999'),

  body('T_Producto_Marca')
    .exists({ checkFalsy: true }).withMessage('La marca del producto es obligatoria')
    .isString().withMessage('La marca debe ser una cadena de texto')
    .isLength({ max: 20 }).withMessage('La marca no debe exceder 20 caracteres'),

  body('T_Producto_Estado')
    .exists().withMessage('El estado del producto es obligatorio')
    .isBoolean().withMessage('El estado debe ser booleano (true o false)')
],validate, productocontroller.postProducto);

//este es la ruta para actualizar un producto
router.put('/producto/:id', [
  body('T_Producto_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre del producto es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 30 }).withMessage('El nombre no debe exceder 30 caracteres'),

  body('T_Producto_Descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('La descripción no debe exceder 100 caracteres'),

  body('T_Producto_Precio')
    .exists({ checkFalsy: true }).withMessage('El precio del producto es obligatorio')
    .isNumeric().withMessage('El precio debe ser un número')
    .custom(value => value >= 0 && value <= 9999999999).withMessage('El precio debe estar entre 0 y 9999999999'),

  body('T_Producto_Stock')
    .exists({ checkFalsy: true }).withMessage('El stock del producto es obligatorio')
    .isInt({ min: 0, max: 9999 }).withMessage('El stock debe ser un número entero entre 0 y 9999'),

  body('T_Producto_Marca')
    .exists({ checkFalsy: true }).withMessage('La marca del producto es obligatoria')
    .isString().withMessage('La marca debe ser una cadena de texto')
    .isLength({ max: 20 }).withMessage('La marca no debe exceder 20 caracteres'),

  body('T_Producto_Estado')
    .exists().withMessage('El estado del producto es obligatorio')
    .isBoolean().withMessage('El estado debe ser booleano (true o false)')
],validate, productocontroller.putProducto);

//este es la ruta para borrar un producto
router.delete('/producto/:id', [
  param('id').isMongoId().withMessage('Invalid Product ID'),
], validate, productocontroller.deleteProducto);

module.exports = router;