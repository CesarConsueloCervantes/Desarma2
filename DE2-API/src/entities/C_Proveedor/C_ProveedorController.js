const Proveedor = require("../C_Proveedor/C_ProveedorModel")

/**
 * @swagger
 * /proveedor:
 *   get:
 *     summary: Obtiene todos los proveedores
 *     tags: [Proveedor]
 *     responses:
 *       200:
 *         description: El catalogo de los proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proveedor'
 */
exports.getProveedores = async (req, res, next) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).send(proveedores);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /proveedor/{id}:
 *   get:
 *     summary: Obtenedr Proveedor por ID
 *     tags: [Proveedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del Proveedor
 *     responses:
 *       200:
 *         description: La descripcion del Proveedor por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       404:
 *         description: Proveedor no encontrado
 */
exports.getProveedorPorID = async (req, res, next) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      res.status(404).json({ message: 'Proveedor no encontrado' });
    } else {
      res.status(200).send(proveedor);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /proveedor:
 *   post:
 *     summary: Crea un nuevo Proveedor
 *     tags: [Proveedor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       500:
 *         description: Some server error
 */
exports.postProveedor = async (req, res, next) => {
  try {
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.status(201).send(proveedor);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /proveedor/{id}:
 *   put:
 *     summary: Actualiza un Proveedor por ID
 *     tags: [Proveedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id del Proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       200:
 *         description: El Proveedor se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Some server error
 */
exports.putProveedor = async (req, res, next) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proveedor) {
      res.status(404).json({ message: 'Proveedor no encontrado' });
    } else {
      res.status(200).send(proveedor);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /proveedor/{id}:
 *   delete:
 *     summary: Elimina un Proveedor por ID
 *     tags: [Proveedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del Proveedor
 *     responses:
 *       200:
 *         description: El Proveedor se elimino
 *       404:
 *         description: Proveedor no encontrado
 */
exports.deleteProveedor = async (req, res, next) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) {
      res.status(404).json({ message: 'Proveedor no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};