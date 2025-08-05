import api from '../config/services';

// Obtener todos los estados/provincias
export const getEstadosProvincias = async () => {
  try {
    const response = await api.get('/estado_provincia');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un estado/provincia por ID
export const getEstadoProvinciaPorId = async (id) => {
  try {
    const response = await api.get(`/estado_provincia/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo estado/provincia
export const createEstadoProvincia = async (estadoProvinciaData) => {
  try {
    const response = await api.post('/estado_provincia', estadoProvinciaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un estado/provincia
export const updateEstadoProvincia = async (id, estadoProvinciaData) => {
  try {
    const response = await api.put(`/estado_provincia/${id}`, estadoProvinciaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un estado/provincia
export const deleteEstadoProvincia = async (id) => {
  try {
    const response = await api.delete(`/estado_provincia/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
/*
// Ejemplo de uso:
const nuevoEstado = {
  C_EstadoProvincia_Nombre: "Aguascalientes",
  C_EstadoProvincia_Abreviacion: "Ags",
  C_EstadoProvincia_Estatus: true
};

try {
  // Crear nuevo estado
  const estadoCreado = await createEstadoProvincia(nuevoEstado);
  
  // Obtener todos los estados
  const estados = await getEstadosProvincias();
  
  // Actualizar un estado
  const estadoActualizado = await updateEstadoProvincia(estadoCreado.id, {
    C_EstadoProvincia_Estatus: false
  });
  
  // Eliminar un estado
  await deleteEstadoProvincia(estadoCreado.id);
} catch (error) {
  console.error('Error:', error);
}
*/