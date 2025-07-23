/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const Usuario = require('../T_Usuario/T_UsuarioModel.js');

// Function to check if user exists
const checkUserExists = async (email) => Usuario.findOne({ email });

// Function to hash password
const hashPassword = async (password) => bcrypt.hash(password, 10);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - T_Usuario_Nombre
 *               - T_Usuario_Apellido
 *               - T_Usuario_Email
 *               - T_Usuario_Password
 *             properties:
 *               T_Usuario_Nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Juan
 *               T_Usuario_Apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: Pérez
 *               T_Usuario_Email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: juan.perez@ejemplo.com
 *               T_Usuario_Password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario (8-20 caracteres)
 *                 example: "contraseña123"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario registrado exitosamente
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: mongoId
 *                       example: 60d0fe4f5311236168a109cd
 *                     nombre:
 *                       type: string
 *                       example: Juan
 *                     apellido:
 *                       type: string
 *                       example: Pérez
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: juan.perez@ejemplo.com
 *                     rol:
 *                       type: string
 *                       enum: [cliente, administrador]
 *                       example: cliente
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: El email ya está registrado
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
exports.register = async (req, res, next) => {
  try {
    const {
      T_Usuario_Nombre,
      T_Usuario_Apellido, 
      T_Usuario_Email,
      T_Usuario_Password
    } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await checkUserExists( T_Usuario_Email );
    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false,
        message: 'El email ya está registrado' 
      });
    }

    // Encriptar contraseña
    const hashedPassword = await hashPassword(T_Usuario_Password, 10);

    // Crear nuevo usuario con campos básicos
    const newUser = new Usuario({
      T_Usuario_Nombre,
      T_Usuario_Apellido,
      T_Usuario_Email,
      T_Usuario_Password: hashedPassword,
      T_Usuario_Rol: 'cliente', // Valor por defecto
      T_Usuario_Estado: true // Activamos la cuenta por defecto
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: newUser._id,
        nombre: newUser.T_Usuario_Nombre,
        apellido: newUser.T_Usuario_Apellido,
        email: newUser.T_Usuario_Email,
        rol: newUser.T_Usuario_Rol
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - T_Usuario_Email
 *               - T_Usuario_Password
 *             properties:
 *               T_Usuario_Email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: usuario@ejemplo.com
 *               T_Usuario_Password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: mongoId
 *                       example: 60d0fe4f5311236168a109cd
 *                     nombre:
 *                       type: string
 *                       example: Juan
 *                     apellido:
 *                       type: string
 *                       example: Pérez
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: usuario@ejemplo.com
 *                     rol:
 *                       type: string
 *                       enum: [cliente, administrador]
 *                       example: cliente
 *                     telefono:
 *                       type: string
 *                       example: "1234567890"
 *                     direccion:
 *                       type: object
 *                       properties:
 *                         calle:
 *                           type: string
 *                           example: Calle Principal
 *                         fraccionamiento:
 *                           type: string
 *                           example: Fracc. Centro
 *                         cp:
 *                           type: string
 *                           example: "12345"
 *                         ciudad:
 *                           type: string
 *                           example: Ciudad Ejemplo
 *                         provinciaEstado:
 *                           type: string
 *                           format: mongoId
 *                           example: 60d0fe4f5311236168a109cd
 *                         pais:
 *                           type: string
 *                           format: mongoId
 *                           example: 60d0fe4f5311236168a109cd
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email o contraseña incorrectos
 *       401:
 *         description: Cuenta inactiva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Cuenta inactiva
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
exports.login = async (req, res, next) => {
  try {
    // 1. Obtener email y contraseña del request
    const { T_Usuario_Email, T_Usuario_Password } = req.body;

    // 2. Buscar el usuario por email
    const usuario = await Usuario.findOne( {T_Usuario_Email} );
    if (!usuario) {
      return res.status(400).json({ 
        success: false,
        message: 'Email o contraseña incorrectos' 
      });
    }

    // 3. Verificar la contraseña
    const passwordValida = await bcrypt.compare(T_Usuario_Password, usuario.T_Usuario_Password);
    if (!passwordValida) {
      return res.status(400).json({ 
        success: false,
        message: 'Email o contraseña incorrectos' 
      });
    }

    // 4. Verificar si la cuenta está activa
    if (!usuario.T_Usuario_Estado) {
      return res.status(401).json({
        success: false,
        message: 'Cuenta inactiva'
      });
    }

    // 5. Login exitoso - enviar datos del usuario
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.T_Usuario_Nombre,
        apellido: usuario.T_Usuario_Apellido,
        email: usuario.T_Usuario_Email,
        rol: usuario.T_Usuario_Rol,
        telefono: usuario.T_Usuario_Telefono,
        direccion: {
          calle: usuario.T_Usuario_Direccion_Calle,
          fraccionamiento: usuario.T_Usuario_Direccion_Fraccionamiento,
          cp: usuario.T_Usuario_Direccion_CP,
          ciudad: usuario.T_Usuario_Direccion_Ciudad,
          provinciaEstado: usuario.T_Usuario_Direccion_ProvinciaEstado,
          pais: usuario.T_Usuario_Direccion_Pais
        }
      }
    });

  } catch (error) {
    next(error);
  }
};