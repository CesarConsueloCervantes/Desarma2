import api from '../config/services';

// Obtener todos los registros de compra
export const getRegistrosCompra = async () => {
  try {
    const response = await api.get('/registro_general_compra');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un registro de compra por ID
export const getRegistroCompraPorId = async (id) => {
  try {
    const response = await api.get(`/registro_general_compra/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo registro de compra
export const createRegistroCompra = async (registroData) => {
  try {
    const response = await api.post('/registro_general_compra', registroData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un registro de compra
export const updateRegistroCompra = async (id, registroData) => {
  try {
    const response = await api.put(`/registro_general_compra/${id}`, registroData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un registro de compra
export const deleteRegistroCompra = async (id) => {
  try {
    const response = await api.delete(`/registro_general_compra/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevoRegistro = {
  T_Compra_id: "id_de_compra",
  T_RegistroGeneral_Producto_id: "id_de_producto",
  T_RegistroGeneral_Cantidad: 5,
  T_RegistroGeneral_Producto_Precio: 1000.00,
  T_RegistroGeneral_Estatus: true
};

try {
  // Crear nuevo registro
  const registroCreado = await createRegistroCompra(nuevoRegistro);
  
  // Obtener todos los registros
  const registros = await getRegistrosCompra();
  
  // Actualizar un registro
  const registroActualizado = await updateRegistroCompra(registroCreado.id, {
    T_RegistroGeneral_Cantidad: 6,
    T_RegistroGeneral_Producto_Precio: 1200.00
  });
  
  // Eliminar un registro
  await deleteRegistroCompra(registroCreado.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/