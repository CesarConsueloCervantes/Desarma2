const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const registroGeneralContoller = require('./T_RegistroGeneral_VentaController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los Registros Generales
router.get('/registro_general', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, registroGeneralContoller.getRegistrosGenerales);

//este es la ruta para obtener un Registro General
router.get('/registro_general/:id', [
  param('id').isMongoId().withMessage('Invalid Producto ID'),
], validate, registroGeneralContoller.getRegistroGeneralPorID);

//este es la ruta para crear un Registro General
router.post('/registro_general',validate, registroGeneralContoller.postRegistroGeneral);

//este es la ruta para actualizar un Registro General
router.put('/registro_general/:id', [
    param('id').isMongoId().withMessage('Invalid RegistroGeneral ID'),
],validate, registroGeneralContoller.putRegistroGeneral);

//este es la ruta para borrar un Registro General
router.delete('/registro_general/:id', [
  param('id').isMongoId().withMessage('Invalid Product ID'),
], validate, registroGeneralContoller.deleteRegistroGeneral);

module.exports = router;