import api from '../config/services';

// Obtener todas las compras
export const getCompras = async () => {
  try {
    const response = await api.get('/compra');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener una compra por ID
export const getCompraPorId = async (id) => {
  try {
    const response = await api.get(`/compra/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear una nueva compra
export const createCompra = async (compraData) => {
  try {
    const response = await api.post('/compra', compraData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar una compra
export const updateCompra = async (id, compraData) => {
  try {
    const response = await api.put(`/compra/${id}`, compraData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar una compra
export const deleteCompra = async (id) => {
  try {
    const response = await api.delete(`/compra/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevaCompra = {
  T_Compra_Proveedor_id: "id_del_proveedor",
  T_Compra_FormaPago: "Transferencia",
  T_Compra_Subtotal: 1000.00,
  T_Compra_Estatus: true
};

try {
  // Crear nueva compra
  const compraCreada = await createCompra(nuevaCompra);
  
  // Obtener todas las compras
  const compras = await getCompras();
  
  // Actualizar una compra
  const compraActualizada = await updateCompra(compraCreada.id, {
    T_Compra_Estatus: false
  });
  
  // Eliminar una compra
  await deleteCompra(compraCreada.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/