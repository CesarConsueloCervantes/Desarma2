import api from '../config/services';

// Obtener todos los países 
export const getPaises = async () => {
  try {
    const response = await api.get('/pais');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un país por ID
export const getPaisPorId = async (id) => {
  try {
    const response = await api.get(`/pais/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo país
export const createPais = async (paisData) => {
  try {
    const response = await api.post('/pais', paisData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un país
export const updatePais = async (id, paisData) => {
  try {
    const response = await api.put(`/pais/${id}`, paisData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un país
export const deletePais = async (id) => {
  try {
    const response = await api.delete(`/pais/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevoPais = {
  C_Pais_Nombre: "México",
  C_Pais_Abreviacion: "MX",
  C_Pais_Estatus: true
};

try {
  // Crear nuevo país
  const paisCreado = await createPais(nuevoPais);
  
  // Obtener todos los países
  const paises = await getPaises();
  
  // Actualizar un país
  const paisActualizado = await updatePais(paisCreado.id, {
    C_Pais_Estatus: false
  });
  
  // Eliminar un país
  await deletePais(paisCreado.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/