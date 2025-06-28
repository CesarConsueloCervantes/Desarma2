const express = require('express');

const router = express.Router();

const proveedorRoutes = require('./C_Proveedor/C_ProveedorRoutes');
const usuarioRoutes = require('./T_Usuario/T_UsuarioRoutes');
const paisRoutes = require('./C_Pais/C_PaisRoutes');
const estadoProvinciaRoutes = require('./C_EstadoProvincia/C_EstadoProvinciaRoutes');
const paqueteriaRoutes = require('./C_Paqueteria/C_PaqueteriaRoutes')
const productoRoutes = require('./T_Producto/T_ProductoRoutes')

router.use(proveedorRoutes);
router.use(usuarioRoutes);
router.use(paisRoutes);
router.use(estadoProvinciaRoutes);
router.use(paqueteriaRoutes);
router.use(productoRoutes);

module.exports = router;