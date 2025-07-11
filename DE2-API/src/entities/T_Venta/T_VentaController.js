const Venta = require('./T_VentaModel')

/**
 * @swagger
 * /venta:
 *   get:
 *     summary: Obtiene todas las Ventas
 *     tags: [Venta]
 *     responses:
 *       200:
 *         description: La tabla de las Ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 */
exports.getVentas = async (req, res, next) => {
  try {
    const ventas = await Venta.find();
    res.status(200).send(ventas);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /venta/{id}:
 *   get:
 *     summary: Obtiene Venta por ID
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id de la Venta
 *     responses:
 *       200:
 *         description: La descripcion de la Venta por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       404:
 *         description: Venta no encontrada
 */
exports.getVentaPorID = async (req, res, next) => {
  try {
    const venta = await Venta.findById(req.params.id);
    if (!venta) {
      res.status(404).json({ message: 'Venta no encontrado' });
    } else {
      res.status(200).send(venta);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /venta:
 *   post:
 *     summary: Crea una nueva Venta
 *     tags: [Venta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       500:
 *         description: Some server error
 */
exports.postVenta = async (req, res, next) => {
  try {
    const venta = new Venta(req.body);
    await venta.save();
    res.status(201).send(venta);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /venta/{id}:
 *   put:
 *     summary: Actualiza una Venta por ID
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id de la Venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       200:
 *         description: La Venta se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Some server error
 */
exports.putVenta = async (req, res, next) => {
  try {
    const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venta) {
      res.status(404).json({ message: 'Venta no encontrado' });
    } else {
      res.status(200).send(venta);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /venta/{id}:
 *   delete:
 *     summary: Elimina una Venta por ID
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id de la Venta
 *     responses:
 *       200:
 *         description: La Venta se elimino
 *       404:
 *         description: Venta no encontrada
 */
exports.deleteVenta = async (req, res, next) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) {
      res.status(404).json({ message: 'Venta no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};