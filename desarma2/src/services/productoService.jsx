import api from '../config/services';

// Obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await api.get('/producto');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un producto por ID
export const getProductoPorId = async (id) => {
  try {
    const response = await api.get(`/producto/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo producto
export const createProducto = async (productoData) => {
  try {
    const response = await api.post('/producto', productoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un producto
export const updateProducto = async (id, productoData) => {
  try {
    const response = await api.put(`/producto/${id}`, productoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const response = await api.delete(`/producto/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevoProducto = {
  T_Producto_Nombre: "Pantalla Samsung A05",
  T_Producto_Descripcion: "Pantalla original para Samsung A05",
  T_Producto_Precio: 1200.00,
  T_Producto_Stock: 10,
  T_Producto_Marca: "Samsung",
  T_Producto_Estado: true
};

try {
  // Crear nuevo producto
  const productoCreado = await createProducto(nuevoProducto);
  
  // Obtener todos los productos
  const productos = await getProductos();
  
  // Actualizar un producto
  const productoActualizado = await updateProducto(productoCreado.id, {
    T_Producto_Stock: 9,
    T_Producto_Precio: 1250.00
  });
  
  // Eliminar un producto
  await deleteProducto(productoCreado.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/