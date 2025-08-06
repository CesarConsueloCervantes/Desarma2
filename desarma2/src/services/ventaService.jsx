import api from '../config/services';

// Obtener todas las ventas
export const getVentas = async () => {
  try {
    const response = await api.get('/venta');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener una venta por ID
export const getVentaPorId = async (id) => {
  try {
    const response = await api.get(`/venta/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear una nueva venta
export const createVenta = async (ventaData) => {
  try {
    // Validación: evitar array
    if (Array.isArray(ventaData)) {
      console.warn('⚠️ El payload es un array, se esperaba un objeto plano.');
      ventaData = ventaData[0]; // O lanza error si prefieres
    }

    console.log('📦 Payload enviado a /venta:', JSON.stringify(ventaData, null, 2));

    const response = await api.post('/venta', ventaData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      console.error('❌ Errores de validación:', error.response.data.errors);
    } else {
      console.error('❌ Error al crear venta:', error.response?.data || error.message);
    }
    throw error;
  }
};

// Actualizar una venta
export const updateVenta = async (id, ventaData) => {
  try {
    const response = await api.put(`/venta/${id}`, ventaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar una venta
export const deleteVenta = async (id) => {
  try {
    const response = await api.delete(`/venta/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevaVenta = {
  T_Venta_Usuario_id: "id_del_usuario",
  T_Venta_Envio_id: "id_del_envio", // Opcional
  T_Venta_FormaPago: "Transferencia",
  T_Venta_Subtotal: 1000.00,
  T_Venta_Estatus: true
};

try {
  // Crear nueva venta
  const ventaCreada = await createVenta(nuevaVenta);
  
  // Obtener todas las ventas
  const ventas = await getVentas();
  
  // Actualizar una venta
  const ventaActualizada = await updateVenta(ventaCreada.id, {
    T_Venta_Estatus: false
  });
  
  // Eliminar una venta
  await deleteVenta(ventaCreada.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/