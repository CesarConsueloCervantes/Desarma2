const RegistroGeneral = require('./T_RegistroGeneral_VentaModel')

/**
 * @swagger
 * /registro_general:
 *   get:
 *     summary: Obtiene todos los Registros Generales
 *     tags: [RegistroGeneral]
 *     responses:
 *       200:
 *         description: La tabla de los Registros Generales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RegistroGeneral'
 */
exports.getRegistrosGenerales = async (req, res, next) => {
  try {
    const registroGenerals = await RegistroGeneral.find();
    res.status(200).send(registroGenerals);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general/{id}:
 *   get:
 *     summary: Obtiene RegistroGeneral por ID
 *     tags: [RegistroGeneral]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id del RegistroGeneral
 *     responses:
 *       200:
 *         description: La descripcion del RegistroGeneral por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneral'
 *       404:
 *         description: RegistroGeneral no encontrado
 */
exports.getRegistroGeneralPorID = async (req, res, next) => {
  try {
    const registroGeneral = await RegistroGeneral.findById(req.params.id);
    if (!registroGeneral) {
      res.status(404).json({ message: 'RegistroGeneral no encontrado' });
    } else {
      res.status(200).send(registroGeneral);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general:
 *   post:
 *     summary: Crea una nueva RegistroGeneral
 *     tags: [RegistroGeneral]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroGeneral'
 *     responses:
 *       201:
 *         description: RegistroGeneral creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneral'
 *       500:
 *         description: Some server error
 */
exports.postRegistroGeneral = async (req, res, next) => {
  try {
    const registroGeneral = new RegistroGeneral(req.body);
    await registroGeneral.save();
    res.status(201).send(registroGeneral);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /registro_general/{id}:
 *   put:
 *     summary: Actualiza una RegistroGeneral por ID
 *     tags: [RegistroGeneral]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id del RegistroGeneral
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroGeneral'
 *     responses:
 *       200:
 *         description: RegistroGeneral se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroGeneral'
 *       404:
 *         description: RegistroGeneral no encontrado
 *       500:
 *         description: Some server error
 */
exports.putRegistroGeneral = async (req, res, next) => {
  try {
    const registroGeneral = await RegistroGeneral.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!registroGeneral) {
      res.status(404).json({ message: 'RegistroGeneral no encontrado' });
    } else {
      res.status(200).send(registroGeneral);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /registro_general/{id}:
 *   delete:
 *     summary: Elimina una RegistroGeneral por ID
 *     tags: [RegistroGeneral]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id de la RegistroGeneral
 *     responses:
 *       200:
 *         description: RegistroGeneral se elimino
 *       404:
 *         description: RegistroGeneral no encontrado
 */
exports.deleteRegistroGeneral = async (req, res, next) => {
  try {
    const registroGeneral = await RegistroGeneral.findByIdAndDelete(req.params.id);
    if (!registroGeneral) {
      res.status(404).json({ message: 'RegistroGeneral no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};