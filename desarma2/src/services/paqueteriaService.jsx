import api from '../config/services';

// Obtener todas las paqueterías
export const getPaqueterias = async () => {
  try {
    const response = await api.get('/paqueteria');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener una paquetería por ID
export const getPaqueteriaPorId = async (id) => {
  try {
    const response = await api.get(`/paqueteria/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear una nueva paquetería
export const createPaqueteria = async (paqueteriaData) => {
  try {
    const response = await api.post('/paqueteria', paqueteriaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar una paquetería
export const updatePaqueteria = async (id, paqueteriaData) => {
  try {
    const response = await api.put(`/paqueteria/${id}`, paqueteriaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar una paquetería
export const deletePaqueteria = async (id) => {
  try {
    const response = await api.delete(`/paqueteria/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevaPaqueteria = {
  C_Paqueteria_Nombre: "DHL Express",
  C_Paqueteria_Contacto: "Juan Pérez",
  C_Paqueteria_Telefono: "1234567890",
  C_Paqueteria_Estatus: true
};

try {
  // Crear nueva paquetería
  const paqueteriaCreada = await createPaqueteria(nuevaPaqueteria);
  
  // Obtener todas las paqueterías
  const paqueterias = await getPaqueterias();
  
  // Actualizar una paquetería
  const paqueteriaActualizada = await updatePaqueteria(paqueteriaCreada.id, {
    C_Paqueteria_Estatus: false
  });
  
  // Eliminar una paquetería
  await deletePaqueteria(paqueteriaCreada.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/