const Compra = require('./T_CompraModel')

/**
 * @swagger
 * /compra:
 *   get:
 *     summary: Obtiene todas las Compras
 *     tags: [Compra]
 *     responses:
 *       200:
 *         description: El catalogo de las Compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 */
exports.getCompras = async (req, res, next) => {
  try {
    const compras = await Compra.find();
    res.status(200).send(compras);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /compra/{id}:
 *   get:
 *     summary: Obtiene Compra por ID
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id del Compra
 *     responses:
 *       200:
 *         description: La descripcion de la Compra por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       404:
 *         description: Compra no encontrada
 */
exports.getCompraPorID = async (req, res, next) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) {
      res.status(404).json({ message: 'Compra no encontrado' });
    } else {
      res.status(200).send(compra);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /compra:
 *   post:
 *     summary: Crea una nueva Compra
 *     tags: [Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compra'
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       500:
 *         description: Some server error
 */
exports.postCompra = async (req, res, next) => {
  try {
    const compra = new Compra(req.body);
    await compra.save();
    res.status(201).send(compra);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /compra/{id}:
 *   put:
 *     summary: Actualiza una Compra por ID
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id de la Compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compra'
 *     responses:
 *       200:
 *         description: La Compra se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       404:
 *         description: Compra no encontrada
 *       500:
 *         description: Some server error
 */
exports.putCompra = async (req, res, next) => {
  try {
    const compra = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!compra) {
      res.status(404).json({ message: 'Compra no encontrado' });
    } else {
      res.status(200).send(compra);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /compra/{id}:
 *   delete:
 *     summary: Elimina una Compra por ID
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id de la Compra
 *     responses:
 *       200:
 *         description: La Compra se elimino
 *       404:
 *         description: Compra no encontrada
 */
exports.deleteCompra = async (req, res, next) => {
  try {
    const compra = await Compra.findByIdAndDelete(req.params.id);
    if (!compra) {
      res.status(404).json({ message: 'Compra no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};