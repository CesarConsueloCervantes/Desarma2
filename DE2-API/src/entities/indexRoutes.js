const express = require('express');

const router = express.Router();

const proveedorRoutes = require('./C_Proveedor/C_ProveedorRoutes');
const usuarioRoutes = require('./T_Usuario/T_UsuarioRoutes');
const paisRoutes = require('./C_Pais/C_PaisRoutes');

router.use(proveedorRoutes);
router.use(usuarioRoutes);
router.use(paisRoutes);

module.exports = router;