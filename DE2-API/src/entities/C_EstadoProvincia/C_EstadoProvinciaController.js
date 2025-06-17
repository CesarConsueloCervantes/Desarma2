const EstadoProvincia = require('./C_EstadoProvinciaModel')

/**
 * @swagger
 * /estado_provincia:
 *   get:
 *     summary: Obtiene todos los EstadoProvincias
 *     tags: [EstadoProvincia]
 *     responses:
 *       200:
 *         description: El catalogo de los EstadoProvincias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadoProvincia'
 */
exports.getEstadoProvincias = async (req, res, next) => {
  try {
    const estadoProvincias = await EstadoProvincia.find();
    res.status(200).send(estadoProvincias);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /estado_provincia/{id}:
 *   get:
 *     summary: Obtiene EstadoProvincia por ID
 *     tags: [EstadoProvincia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del EstadoProvincia
 *     responses:
 *       200:
 *         description: La descripcion del EstadoProvincia por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstadoProvincia'
 *       404:
 *         description: EstadoProvincia no encontrado
 */
exports.getEstadoProvinciaPorID = async (req, res, next) => {
  try {
    const estadoProvincia = await EstadoProvincia.findById(req.params.id);
    if (!estadoProvincia) {
      res.status(404).json({ message: 'EstadoProvincia no encontrado' });
    } else {
      res.status(200).send(estadoProvincia);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /estado_provincia:
 *   post:
 *     summary: Crea un nuevo EstadoProvincia
 *     tags: [EstadoProvincia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadoProvincia'
 *     responses:
 *       201:
 *         description: EstadoProvincia creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstadoProvincia'
 *       500:
 *         description: Some server error
 */
exports.postEstadoProvincia = async (req, res, next) => {
  try {
    const estadoProvincia = new EstadoProvincia(req.body);
    await estadoProvincia.save();
    res.status(201).send(estadoProvincia);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /estado_provincia/{id}:
 *   put:
 *     summary: Actualiza un EstadoProvincia por ID
 *     tags: [EstadoProvincia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id del EstadoProvincia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadoProvincia'
 *     responses:
 *       200:
 *         description: El EstadoProvincia se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstadoProvincia'
 *       404:
 *         description: EstadoProvincia no encontrado
 *       500:
 *         description: Some server error
 */
exports.putEstadoProvincia = async (req, res, next) => {
  try {
    const estadoProvincia = await EstadoProvincia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!estadoProvincia) {
      res.status(404).json({ message: 'EstadoProvincia no encontrado' });
    } else {
      res.status(200).send(estadoProvincia);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /estado_provincia/{id}:
 *   delete:
 *     summary: Elimina un EstadoProvincia por ID
 *     tags: [EstadoProvincia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del EstadoProvincia
 *     responses:
 *       200:
 *         description: El EstadoProvincia se elimino
 *       404:
 *         description: EstadoProvincia no encontrado
 */
exports.deleteEstadoProvincia = async (req, res, next) => {
  try {
    const estadoProvincia = await EstadoProvincia.findByIdAndDelete(req.params.id);
    if (!estadoProvincia) {
      res.status(404).json({ message: 'EstadoProvincia no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};