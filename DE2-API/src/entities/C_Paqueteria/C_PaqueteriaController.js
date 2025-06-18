const Paqueteria = require('./C_PaqueteriaModel')

/**
 * @swagger
 * /paqueteria:
 *   get:
 *     summary: Obtiene todas las Paqueterias
 *     tags: [Paqueteria]
 *     responses:
 *       200:
 *         description: El catalogo de las Paqueterias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paqueteria'
 */
exports.getPaqueterias = async (req, res, next) => {
  try {
    const paqueterias = await Paqueteria.find();
    res.status(200).send(paqueterias);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /paqueteria/{id}:
 *   get:
 *     summary: Obtiene Paqueteria por ID
 *     tags: [Paqueteria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id del Paqueteria
 *     responses:
 *       200:
 *         description: La descripcion de la Paqueteria por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paqueteria'
 *       404:
 *         description: Paqueteria no encontrada
 */
exports.getPaqueteriaPorID = async (req, res, next) => {
  try {
    const paqueteria = await Paqueteria.findById(req.params.id);
    if (!paqueteria) {
      res.status(404).json({ message: 'Paqueteria no encontrado' });
    } else {
      res.status(200).send(paqueteria);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /paqueteria:
 *   post:
 *     summary: Crea una nueva Paqueteria
 *     tags: [Paqueteria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paqueteria'
 *     responses:
 *       201:
 *         description: Paqueteria creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paqueteria'
 *       500:
 *         description: Some server error
 */
exports.postPaqueteria = async (req, res, next) => {
  try {
    const paqueteria = new Paqueteria(req.body);
    await paqueteria.save();
    res.status(201).send(paqueteria);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /paqueteria/{id}:
 *   put:
 *     summary: Actualiza una Paqueteria por ID
 *     tags: [Paqueteria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id de la Paqueteria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paqueteria'
 *     responses:
 *       200:
 *         description: La Paqueteria se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paqueteria'
 *       404:
 *         description: Paqueteria no encontrada
 *       500:
 *         description: Some server error
 */
exports.putPaqueteria = async (req, res, next) => {
  try {
    const paqueteria = await Paqueteria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paqueteria) {
      res.status(404).json({ message: 'Paqueteria no encontrado' });
    } else {
      res.status(200).send(paqueteria);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /paqueteria/{id}:
 *   delete:
 *     summary: Elimina una Paqueteria por ID
 *     tags: [Paqueteria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id de la Paqueteria
 *     responses:
 *       200:
 *         description: La Paqueteria se elimino
 *       404:
 *         description: Paqueteria no encontrada
 */
exports.deletePaqueteria = async (req, res, next) => {
  try {
    const paqueteria = await Paqueteria.findByIdAndDelete(req.params.id);
    if (!paqueteria) {
      res.status(404).json({ message: 'Paqueteria no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};