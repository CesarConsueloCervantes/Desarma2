const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../../middlewares/validation');
const usuarioController = require('./T_UsuarioController');
const authMiddleware = require('../../middlewares/authMiddlewares');

const router = express.Router();

//este es la ruta para obetener todos los Usuarios
router.get('/usuario', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], validate, usuarioController.getUsuarios);

//este es la ruta para obeter un Usuario
router.get('/usuario/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, usuarioController.getUsuarioPorID);


//este es la ruta para crear un usuario
router.post('/usuario', [
  body('T_Usuario_Password')
    .exists({ checkFalsy: true }).withMessage('La contraseña es obligatoria')
    .isLength({ max: 20, min: 8 }).withMessage('La contraseña deve tener entre 8 y 20 caracteres'),

  body('T_Usuario_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio')
    .isLength({ max: 30 }).withMessage('El nombre no debe exceder los 30 caracteres'),

  body('T_Usuario_Apellido')
    .exists({ checkFalsy: true }).withMessage('El apellido es obligatorio')
    .isLength({ max: 30 }).withMessage('El apellido no debe exceder los 30 caracteres'),

  body('T_Usuario_Telefono')
    .exists({ checkFalsy: true }).withMessage('El teléfono es obligatorio')
    .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener exactamente 10 dígitos numéricos'),

  body('T_Usuario_Email')
    .exists({ checkFalsy: true }).withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  // Campos opcionales con validaciones
  body('T_Usuario_Direccion_Calle')
    .optional()
    .isLength({ max: 30 }).withMessage('La calle no debe exceder los 30 caracteres'),

  body('T_Usuario_Direccion_Fraccionamiento')
    .optional()
    .isLength({ max: 40 }).withMessage('El fraccionamiento no debe exceder los 40 caracteres'),

  body('T_Usuario_Direccion_CP')
    .optional()
    .isLength({ max: 6 }).withMessage('El código postal no debe exceder los 6 caracteres'),

  body('T_Usuario_Direccion_Ciudad')
    .optional()
    .isLength({ max: 20 }).withMessage('La ciudad no debe exceder los 20 caracteres'),

  body('T_Usuario_Rol')
    .optional()
    .isIn(['cliente', 'administrador']).withMessage('Rol no válido'),  

  body('T_Usuario_Estado')
    .optional()
    .isBoolean().withMessage('El estado debe ser booleano'),

  body('T_Usuario_Direccion_ProvinciaEstado')
    .optional()
    .isMongoId().withMessage('Provincia/Estado debe ser un ID válido'),

  body('T_Usuario_Direccion_Pais')
    .optional()
    .isMongoId().withMessage('El país debe ser un ID válido')
],validate, usuarioController.postUsuario)


//este es la ruta para actualizar un usuario
router.put('/usuario/:id', [
    param('id').isMongoId().withMessage('Invalid Usuario ID'),
  body('T_Usuario_Password')
    .optional()
    .isLength({ max: 20, min: 8 }).withMessage('La contraseña deve tener entre 8 y 20 caracteres'),

  body('T_Usuario_Nombre')
    .exists({ checkFalsy: true }).withMessage('El nombre es obligatorio')
    .isLength({ max: 30 }).withMessage('El nombre no debe exceder los 30 caracteres'),

  body('T_Usuario_Apellido')
    .exists({ checkFalsy: true }).withMessage('El apellido es obligatorio')
    .isLength({ max: 30 }).withMessage('El apellido no debe exceder los 30 caracteres'),

  body('T_Usuario_Telefono')
    .exists({ checkFalsy: true }).withMessage('El teléfono es obligatorio')
    .matches(/^[0-9]{10}$/).withMessage('El teléfono debe tener exactamente 10 dígitos numéricos'),

  body('T_Usuario_Email')
    .exists({ checkFalsy: true }).withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  // Campos opcionales con validaciones
  body('T_Usuario_Direccion_Calle')
    .optional()
    .isLength({ max: 30 }).withMessage('La calle no debe exceder los 30 caracteres'),

  body('T_Usuario_Direccion_Fraccionamiento')
    .optional()
    .isLength({ max: 40 }).withMessage('El fraccionamiento no debe exceder los 40 caracteres'),

  body('T_Usuario_Direccion_CP')
    .optional()
    .isLength({ max: 6 }).withMessage('El código postal no debe exceder los 6 caracteres'),

  body('T_Usuario_Direccion_Ciudad')
    .optional()
    .isLength({ max: 20 }).withMessage('La ciudad no debe exceder los 20 caracteres'),

  body('T_Usuario_Rol')
    .optional()
    .isIn(['cliente', 'administrador']).withMessage('Rol no válido'),  

  body('T_Usuario_Estado')
    .optional()
    .isBoolean().withMessage('El estado debe ser booleano'),

  body('T_Usuario_Direccion_ProvinciaEstado')
    .optional()
    .isMongoId().withMessage('Provincia/Estado debe ser un ID válido'),

  body('T_Usuario_Direccion_Pais')
    .optional()
    .isMongoId().withMessage('El país debe ser un ID válido')
],validate, usuarioController.putUsuario)


//este es la ruta para borrar un Usuario
router.delete('/usuario/:id', [
  param('id').isMongoId().withMessage('Invalid Usuario ID'),
], validate, usuarioController.deleteUsuario);

module.exports = router;