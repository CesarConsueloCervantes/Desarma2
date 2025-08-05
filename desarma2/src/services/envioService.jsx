import api from '../config/services';

// Obtener todos los envíos
export const getEnvios = async () => {
  try {
    const response = await api.get('/envio');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un envío por ID
export const getEnvioPorId = async (id) => {
  try {
    const response = await api.get(`/envio/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo envío
export const createEnvio = async (envioData) => {
  try {
    const response = await api.post('/envio', envioData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un envío
export const updateEnvio = async (id, envioData) => {
  try {
    const response = await api.put(`/envio/${id}`, envioData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un envío
export const deleteEnvio = async (id) => {
  try {
    const response = await api.delete(`/envio/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevoEnvio = {
  T_Envio_Venta_id: "id_de_venta",
  T_Envio_Servicio_Paqueteria_id: "id_de_paqueteria",
  T_Envio_Direccion_Calle: "Calle Principal",
  T_Envio_Direccion_Fraccionamiento: "Fracc. Centro",
  T_Envio_Direccion_CP: "12345",
  T_Envio_Direccion_Ciudad: "Ciudad Ejemplo",
  T_Envio_Direccion_ProvinciaEstado: "id_provincia",
  T_Envio_Direccion_Pais: "id_pais",
  T_Envio_Estatus: true
};

try {
  // Crear nuevo envío
  const envioCreado = await createEnvio(nuevoEnvio);
  
  // Obtener todos los envíos
  const envios = await getEnvios();
  
  // Actualizar un envío
  const envioActualizado = await updateEnvio(envioCreado.id, {
    T_Envio_Estatus: false
  });
  
  // Eliminar un envío
  await deleteEnvio(envioCreado.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/