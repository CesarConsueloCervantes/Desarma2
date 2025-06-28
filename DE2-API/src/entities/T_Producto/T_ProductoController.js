const Producto = require('./T_ProductoModel')

/**
 * @swagger
 * /producto:
 *   get:
 *     summary: Obtiene todas las Productos
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: El catalogo de las Productos
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
 *         description: La descripcion de la Producto por Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrada
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
 *     summary: Crea una nueva Producto
 *     tags: [Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creada exitosamente
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
 *     summary: Actualiza una Producto por ID
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: EL Id de la Producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: La Producto se actualizo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrada
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
 *         description: El Id de la Producto
 *     responses:
 *       200:
 *         description: La Producto se elimino
 *       404:
 *         description: Producto no encontrada
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