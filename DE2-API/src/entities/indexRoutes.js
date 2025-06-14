const express = require('express');

const router = express.Router();

const proveedorRoutes = require('./C_Proveedor/C_ProveedorRoutes');

router.use(proveedorRoutes);

module.exports = router;