const RegistroGeneralCompra = require('./T_RegistroGeneral_CompraModel')

/**
 * @swagger
 * /registro_general_compra:
 *   get:
 *     summary: Obtiene todos los RegistroGeneralCompra
 *     tags: [RegistroGeneralCompra]
 *     responses:
 *       200:
 *         description: La Tabla de los RegistroGeneralCompra
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RegistroGeneralCompra'
 */
exports.getRegistroGeneralCompras = async (req, res, next) => {
  try {
    const registro_general_compras = await RegistroGeneralCompra.find();
    res.status(200).send(registro_general_compras);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general_compra/{id}:
 *   get:
 *     summary: Obtiene RegistroGeneralCompra por ID
 *     tags: [RegistroGeneralCompra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id del RegistroGeneralCompra
 *     responses:
 *       200:
 *         description: La descripcion del RegistroGeneralCompra por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneralCompra'
 *       404:
 *         description: RegistroGeneralCompra no encontrado
 */
exports.getRegistroGeneralCompraPorID = async (req, res, next) => {
  try {
    const registro_general_compra = await RegistroGeneralCompra.findById(req.params.id);
    if (!registro_general_compra) {
      res.status(404).json({ message: 'RegistroGeneralCompra no encontrado' });
    } else {
      res.status(200).send(registro_general_compra);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general_compra:
 *   post:
 *     summary: Crea una nueva RegistroGeneralCompra
 *     tags: [RegistroGeneralCompra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroGeneralCompra'
 *     responses:
 *       201:
 *         description: RegistroGeneralCompra creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneralCompra'
 *       500:
 *         description: Some server error
 */
exports.postRegistroGeneralCompra = async (req, res, next) => {
  try {
    const registro_general_compra = new RegistroGeneralCompra(req.body);
    await registro_general_compra.save();
    res.status(201).send(registro_general_compra);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /registro_general_compra/{id}:
 *   put:
 *     summary: Actualiza un RegistroGeneralCompra por ID
 *     tags: [RegistroGeneralCompra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id del RegistroGeneralCompra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroGeneralCompra'
 *     responses:
 *       200:
 *         description: El RegistroGeneralCompra se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneralCompra'
 *       404:
 *         description: RegistroGeneralCompra no encontrado
 *       500:
 *         description: Some server error
 */
exports.putRegistroGeneralCompra = async (req, res, next) => {
  try {
    const registro_general_compra = await RegistroGeneralCompra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!registro_general_compra) {
      res.status(404).json({ message: 'RegistroGeneralCompra no encontrado' });
    } else {
      res.status(200).send(registro_general_compra);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general_compra/{id}:
 *   delete:
 *     summary: Elimina una RegistroGeneralCompra por ID
 *     tags: [RegistroGeneralCompra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del RegistroGeneralCompra
 *     responses:
 *       200:
 *         description: La RegistroGeneralCompra se elimino
 *       404:
 *         description: RegistroGeneralCompra no encontrado
 */
exports.deleteRegistroGeneralCompra = async (req, res, next) => {
  try {
    const registro_general_compra = await RegistroGeneralCompra.findByIdAndDelete(req.params.id);
    if (!registro_general_compra) {
      res.status(404).json({ message: 'RegistroGeneralCompra no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};