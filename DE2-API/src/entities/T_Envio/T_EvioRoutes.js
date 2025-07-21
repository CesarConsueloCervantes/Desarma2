const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const envioController = require('./T_EnvioController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todas las envios
router.get('/envio', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, envioController.getEnvios);

//este es la ruta para obtener una envio
router.get('/envio/:id', [
  param('id').isMongoId().withMessage('Invalid envio ID'),
], validate, envioController.getEnvioPorID);

//este es la ruta para crear una envio
router.post('/envio', [

  // Venta_id 
  body('T_Envio_Venta_id')
    .exists({ checkFalsy: true }).withMessage('El ID de la venta es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Servicio_Paqueteria_id: ObjectId requerido
  body('T_Envio_Servicio_Paqueteria_id')
    .exists({ checkFalsy: true }).withMessage('El ID de la paquetería es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Direccion_Calle: String, max 30
  body('T_Envio_Direccion_Calle')
    .exists({ checkFalsy: true }).withMessage('La calle es obligatoria')
    .isString().withMessage('La calle debe ser una cadena de texto')
    .isLength({ max: 30 }).withMessage('La calle no debe exceder 30 caracteres'),

  // T_Envio_Direccion_Fraccionamiento: String, max 40
  body('T_Envio_Direccion_Fraccionamiento')
    .exists({ checkFalsy: true }).withMessage('El fraccionamiento es obligatorio')
    .isString().withMessage('El fraccionamiento debe ser una cadena de texto')
    .isLength({ max: 40 }).withMessage('El fraccionamiento no debe exceder 40 caracteres'),

  // T_Envio_Direccion_CP: String, max 6 (asumo código postal)
  body('T_Envio_Direccion_CP')
    .exists({ checkFalsy: true }).withMessage('El código postal es obligatorio')
    .isString().withMessage('El código postal debe ser una cadena de texto')
    .isLength({ max: 6 }).withMessage('El código postal no debe exceder 6 caracteres')
    .matches(/^[0-9]{5,6}$/).withMessage('El código postal debe tener entre 5 y 6 dígitos numéricos'),

  // T_Envio_Direccion_Ciudad: String, max 20
  body('T_Envio_Direccion_Ciudad')
    .exists({ checkFalsy: true }).withMessage('La ciudad es obligatoria')
    .isString().withMessage('La ciudad debe ser una cadena de texto')
    .isLength({ max: 20 }).withMessage('La ciudad no debe exceder 20 caracteres'),

  // T_Envio_Direccion_ProvinciaEstado: ObjectId requerido
  body('T_Envio_Direccion_ProvinciaEstado')
    .exists({ checkFalsy: true }).withMessage('El estado/provincia es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Direccion_Pais: ObjectId requerido
  body('T_Envio_Direccion_Pais')
    .exists({ checkFalsy: true }).withMessage('El país es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Estatus: Booleano
  body('T_Envio_Estatus')
    .optional() // puedes enviarlo o no
    .isBoolean().withMessage('El estatus debe ser un valor booleano (true o false)')

],validate, envioController.postEnvio);

//este es la ruta para actualizar una envio
router.put('/envio/:id', [
  param('id').isMongoId().withMessage('Invalid envio ID'),
  // Venta_id 
  body('T_Envio_Venta_id')
    .exists({ checkFalsy: true }).withMessage('El ID de la venta es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Servicio_Paqueteria_id: ObjectId requerido
  body('T_Envio_Servicio_Paqueteria_id')
    .exists({ checkFalsy: true }).withMessage('El ID de la paquetería es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Direccion_Calle: String, max 30
  body('T_Envio_Direccion_Calle')
    .exists({ checkFalsy: true }).withMessage('La calle es obligatoria')
    .isString().withMessage('La calle debe ser una cadena de texto')
    .isLength({ max: 30 }).withMessage('La calle no debe exceder 30 caracteres'),

  // T_Envio_Direccion_Fraccionamiento: String, max 40
  body('T_Envio_Direccion_Fraccionamiento')
    .exists({ checkFalsy: true }).withMessage('El fraccionamiento es obligatorio')
    .isString().withMessage('El fraccionamiento debe ser una cadena de texto')
    .isLength({ max: 40 }).withMessage('El fraccionamiento no debe exceder 40 caracteres'),

  // T_Envio_Direccion_CP: String, max 6 (asumo código postal)
  body('T_Envio_Direccion_CP')
    .exists({ checkFalsy: true }).withMessage('El código postal es obligatorio')
    .isString().withMessage('El código postal debe ser una cadena de texto')
    .isLength({ max: 6 }).withMessage('El código postal no debe exceder 6 caracteres')
    .matches(/^[0-9]{5,6}$/).withMessage('El código postal debe tener entre 5 y 6 dígitos numéricos'),

  // T_Envio_Direccion_Ciudad: String, max 20
  body('T_Envio_Direccion_Ciudad')
    .exists({ checkFalsy: true }).withMessage('La ciudad es obligatoria')
    .isString().withMessage('La ciudad debe ser una cadena de texto')
    .isLength({ max: 20 }).withMessage('La ciudad no debe exceder 20 caracteres'),

  // T_Envio_Direccion_ProvinciaEstado: ObjectId requerido
  body('T_Envio_Direccion_ProvinciaEstado')
    .exists({ checkFalsy: true }).withMessage('El estado/provincia es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Direccion_Pais: ObjectId requerido
  body('T_Envio_Direccion_Pais')
    .exists({ checkFalsy: true }).withMessage('El país es obligatorio')
    .isMongoId().withMessage('Debe ser un ObjectId válido'),

  // T_Envio_Estatus: Booleano
  body('T_Envio_Estatus')
    .optional() // puedes enviarlo o no
    .isBoolean().withMessage('El estatus debe ser un valor booleano (true o false)')

],validate, envioController.putEnvio);

//este es la ruta para borrar una envio
router.delete('/envio/:id', [
  param('id').isMongoId().withMessage('Invalid envio ID'),
], validate, envioController.deleteEnvio);

module.exports = router;