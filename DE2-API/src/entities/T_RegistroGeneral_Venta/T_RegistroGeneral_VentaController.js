const RegistroGeneralVenta = require('./T_RegistroGeneral_VentaModel')

/**
 * @swagger
 * /registro_general_venta:
 *   get:
 *     summary: Obtiene todos los RegistroGeneralVentas
 *     tags: [RegistroGeneralVenta]
 *     responses:
 *       200:
 *         description: La tabla de los RegistroGeneralVentas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RegistroGeneralVenta'
 */
exports.getRegistroGeneralVentas = async (req, res, next) => {
  try {
    const registroGenerals = await RegistroGeneralVenta.find();
    res.status(200).send(registroGenerals);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general_venta/{id}:
 *   get:
 *     summary: Obtiene RegistroGeneralVenta por ID
 *     tags: [RegistroGeneralVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id del RegistroGeneralVenta
 *     responses:
 *       200:
 *         description: La descripcion del RegistroGeneralVenta por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneralVenta'
 *       404:
 *         description: RegistroGeneralVenta no encontrado
 */
exports.getRegistroGeneralVentaPorID = async (req, res, next) => {
  try {
    const registroGeneral = await RegistroGeneralVenta.findById(req.params.id);
    if (!registroGeneral) {
      res.status(404).json({ message: 'RegistroGeneralVenta no encontrado' });
    } else {
      res.status(200).send(registroGeneral);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general_venta:
 *   post:
 *     summary: Crea un nuevo RegistroGeneralVenta
 *     tags: [RegistroGeneralVenta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroGeneralVenta'
 *     responses:
 *       201:
 *         description: RegistroGeneralVenta creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneralVenta'
 *       500:
 *         description: Some server error
 */
exports.postRegistroGeneralVenta = async (req, res, next) => {
  try {
    const registroGeneral = new RegistroGeneralVenta(req.body);
    await registroGeneral.save();
    res.status(201).send(registroGeneral);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /registro_general_venta/{id}:
 *   put:
 *     summary: Actualiza un RegistroGeneralVenta por ID
 *     tags: [RegistroGeneralVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id del RegistroGeneralVenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroGeneralVenta'
 *     responses:
 *       200:
 *         description: RegistroGeneralVenta se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneralVenta'
 *       404:
 *         description: RegistroGeneralVenta no encontrado
 *       500:
 *         description: Some server error
 */
exports.putRegistroGeneralVenta = async (req, res, next) => {
  try {
    const registroGeneral = await RegistroGeneralVenta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!registroGeneral) {
      res.status(404).json({ message: 'RegistroGeneralVenta no encontrado' });
    } else {
      res.status(200).send(registroGeneral);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general_venta/{id}:
 *   delete:
 *     summary: Elimina un RegistroGeneralVenta por ID
 *     tags: [RegistroGeneralVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del RegistroGeneralVenta
 *     responses:
 *       200:
 *         description: RegistroGeneralVenta se elimino
 *       404:
 *         description: RegistroGeneralVenta no encontrado
 */
exports.deleteRegistroGeneralVenta = async (req, res, next) => {
  try {
    const registroGeneral = await RegistroGeneralVenta.findByIdAndDelete(req.params.id);
    if (!registroGeneral) {
      res.status(404).json({ message: 'RegistroGeneralVenta no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};