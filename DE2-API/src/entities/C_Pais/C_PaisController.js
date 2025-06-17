const Pais = require('./C_PaisModel')

/**
 * @swagger
 * /pais:
 *   get:
 *     summary: Obtiene todos los Paises
 *     tags: [Pais]
 *     responses:
 *       200:
 *         description: El catalogo de los Paises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pais'
 */
exports.getPaises = async (req, res, next) => {
  try {
    const paises = await Pais.find();
    res.status(200).send(paises);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /pais/{id}:
 *   get:
 *     summary: Obtiene Pais por ID
 *     tags: [Pais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del Pais
 *     responses:
 *       200:
 *         description: La descripcion del Pais por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pais'
 *       404:
 *         description: Pais no encontrado
 */
exports.getPaisPorID = async (req, res, next) => {
  try {
    const pais = await Pais.findById(req.params.id);
    if (!pais) {
      res.status(404).json({ message: 'Pais no encontrado' });
    } else {
      res.status(200).send(pais);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /pais:
 *   post:
 *     summary: Crea un nuevo Pais
 *     tags: [Pais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pais'
 *     responses:
 *       201:
 *         description: Pais creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pais'
 *       500:
 *         description: Some server error
 */
exports.postPais = async (req, res, next) => {
  try {
    const pais = new Pais(req.body);
    await pais.save();
    res.status(201).send(pais);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /pais/{id}:
 *   put:
 *     summary: Actualiza un Pais por ID
 *     tags: [Pais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id del Pais
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pais'
 *     responses:
 *       200:
 *         description: El Pais se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pais'
 *       404:
 *         description: Pais no encontrado
 *       500:
 *         description: Some server error
 */
exports.putPais = async (req, res, next) => {
  try {
    const pais = await Pais.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pais) {
      res.status(404).json({ message: 'Pais no encontrado' });
    } else {
      res.status(200).send(pais);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /pais/{id}:
 *   delete:
 *     summary: Elimina un Pais por ID
 *     tags: [Pais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del Pais
 *     responses:
 *       200:
 *         description: El Pais se elimino
 *       404:
 *         description: Pais no encontrado
 */
exports.deletePais = async (req, res, next) => {
  try {
    const pais = await Pais.findByIdAndDelete(req.params.id);
    if (!pais) {
      res.status(404).json({ message: 'Pais no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};