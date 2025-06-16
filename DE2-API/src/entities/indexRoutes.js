const express = require('express');

const router = express.Router();

const proveedorRoutes = require('./C_Proveedor/C_ProveedorRoutes');
const usuarioRoutes = require('./T_Usuario/T_UsuarioRoutes')

router.use(proveedorRoutes);
router.use(usuarioRoutes)

module.exports = router;