import api from '../config/services';

// Obtener todos los registros de venta
export const getRegistrosVenta = async () => {
  try {
    const response = await api.get('/registro_general_venta');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un registro de venta por ID
export const getRegistroVentaPorId = async (id) => {
  try {
    const response = await api.get(`/registro_general_venta/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo registro de venta
export const createRegistroVenta = async (registroData) => {
  try {
    const response = await api.post('/registro_general_venta', registroData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un registro de venta
export const updateRegistroVenta = async (id, registroData) => {
  try {
    const response = await api.put(`/registro_general_venta/${id}`, registroData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un registro de venta
export const deleteRegistroVenta = async (id) => {
  try {
    const response = await api.delete(`/registro_general_venta/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevoRegistro = {
  T_Venta_id: "id_de_venta",
  T_RegistroGeneral_Producto_id: "id_de_producto",
  T_RegistroGeneral_Cantidad: 5,
  T_RegistroGeneral_Producto_Precio: 1000.00,
  T_RegistroGeneral_Estatus: true
};

try {
  // Crear nuevo registro
  const registroCreado = await createRegistroVenta(nuevoRegistro);
  
  // Obtener todos los registros
  const registros = await getRegistrosVenta();
  
  // Actualizar un registro
  const registroActualizado = await updateRegistroVenta(registroCreado.id, {
    T_RegistroGeneral_Cantidad: 6,
    T_RegistroGeneral_Producto_Precio: 1200.00
  });
  
  // Eliminar un registro
  await deleteRegistroVenta(registroCreado.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/