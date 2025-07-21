const Producto = require('./T_ProductoModel')

/**
 * @swagger
 * /producto:
 *   get:
 *     summary: Obtiene todos los Productos
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: El catalogo de los Productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
exports.getProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find();
    res.status(200).send(productos);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /producto/{id}:
 *   get:
 *     summary: Obtiene Producto por ID
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La Id del Producto
 *     responses:
 *       200:
 *         description: La descripcion del Producto por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
exports.getProductoPorID = async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.status(200).send(producto);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /producto:
 *   post:
 *     summary: Crea un nuevo Producto
 *     tags: [Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       500:
 *         description: Some server error
 */
exports.postProducto = async (req, res, next) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).send(producto);
  } catch (error) {
    next(error);
  }
};



/**
 * @swagger
 * /producto/{id}:
 *   put:
 *     summary: Actualiza un Producto por ID
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id del Producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: El Producto se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Some server error
 */
exports.putProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.status(200).send(producto);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /producto/{id}:
 *   delete:
 *     summary: Elimina una Producto por ID
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El Id del Producto
 *     responses:
 *       200:
 *         description: EL Producto se elimino
 *       404:
 *         description: Producto no encontrado
 */
exports.deleteProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};