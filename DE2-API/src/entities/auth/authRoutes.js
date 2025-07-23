const express = require('express');
const { body } = require('express-validator');
const validate = require('../../middlewares/validation');
const authController = require('./authController');

const router = express.Router();

router.post('/login', [
  body('T_Usuario_Email')
    .exists({ checkFalsy: true }).withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),
  
  body('T_Usuario_Password')
    .exists({ checkFalsy: true }).withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 20 }).withMessage('La contraseña debe tener entre 8 y 20 caracteres')

], validate, authController.login);

router.post('/register', [
  // Solo validamos los campos obligatorios
  body('T_Usuario_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio')
    .isLength({ max: 30 }).withMessage('El nombre no debe exceder los 30 caracteres'),

  body('T_Usuario_Apellido')
    .exists({ checkFalsy: true }).withMessage('El apellido es obligatorio')
    .isLength({ max: 30 }).withMessage('El apellido no debe exceder los 30 caracteres'),

  body('T_Usuario_Email')
    .exists({ checkFalsy: true }).withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  body('T_Usuario_Password')
    .exists({ checkFalsy: true }).withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 20 }).withMessage('La contraseña debe tener entre 8 y 20 caracteres')

], validate, authController.register);

module.exports = router;