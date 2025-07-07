const Envio = require('./T_EnvioModel')

/**
 * @swagger
 * /envio:
 *   get:
 *     summary: Obtiene todas las Envios
 *     tags: [Envio]
 *     responses:
 *       200:
 *         description: El catalogo de las Envios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Envio'
 */
exports.getEnvios = async (req, res, next) => {
  try {
    const envios = await Envio.find();
    res.status(200).send(envios);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /envio/{id}:
 *   get:
 *     summary: Obtiene Envio por ID
 *     tags: [Envio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id del Envio
 *     responses:
 *       200:
 *         description: La descripcion de la Envio por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envio'
 *       404:
 *         description: Envio no encontrada
 */
exports.getEnvioPorID = async (req, res, next) => {
  try {
    const envio = await Envio.findById(req.params.id);
    if (!envio) {
      res.status(404).json({ message: 'Envio no encontrado' });
    } else {
      res.status(200).send(envio);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /envio:
 *   post:
 *     summary: Crea una nueva Envio
 *     tags: [Envio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envio'
 *     responses:
 *       201:
 *         description: Envio creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envio'
 *       500:
 *         description: Some server error
 */
exports.postEnvio = async (req, res, next) => {
  try {
    const envio = new Envio(req.body);
    await envio.save();
    res.status(201).send(envio);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /envio/{id}:
 *   put:
 *     summary: Actualiza una Envio por ID
 *     tags: [Envio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id de la Envio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envio'
 *     responses:
 *       200:
 *         description: La Envio se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envio'
 *       404:
 *         description: Envio no encontrada
 *       500:
 *         description: Some server error
 */
exports.putEnvio = async (req, res, next) => {
  try {
    const envio = await Envio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!envio) {
      res.status(404).json({ message: 'Envio no encontrado' });
    } else {
      res.status(200).send(envio);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /envio/{id}:
 *   delete:
 *     summary: Elimina una Envio por ID
 *     tags: [Envio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id de la Envio
 *     responses:
 *       200:
 *         description: La Envio se elimino
 *       404:
 *         description: Envio no encontrada
 */
exports.deleteEnvio = async (req, res, next) => {
  try {
    const envio = await Envio.findByIdAndDelete(req.params.id);
    if (!envio) {
      res.status(404).json({ message: 'Envio no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};