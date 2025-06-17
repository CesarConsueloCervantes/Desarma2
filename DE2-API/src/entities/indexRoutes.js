const express = require('express');

const router = express.Router();

const proveedorRoutes = require('./C_Proveedor/C_ProveedorRoutes');
const usuarioRoutes = require('./T_Usuario/T_UsuarioRoutes');
const paisRoutes = require('./C_Pais/C_PaisRoutes');
const estadoProvincia = require('./C_EstadoProvincia/C_EstadoProvinciaRoutes');

router.use(proveedorRoutes);
router.use(usuarioRoutes);
router.use(paisRoutes);
router.use(estadoProvincia);

module.exports = router;