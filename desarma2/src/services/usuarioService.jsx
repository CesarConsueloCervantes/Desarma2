import api from '../config/services';

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuario');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un usuario por ID
export const getUsuarioPorId = async (id) => {
  try {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post('/usuario', usuarioData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un usuario
export const updateUsuario = async (id, usuarioData) => {
  try {
    const response = await api.put(`/usuario/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevoUsuario = {
  T_Usuario_Password: "contraseña123",
  T_Usuario_Nombre: "Juan",
  T_Usuario_Apellido: "Pérez",
  T_Usuario_Email: "juan@ejemplo.com",
  T_Usuario_Telefono: "1234567890",
  T_Usuario_Direccion_Calle: "Calle Principal",
  T_Usuario_Direccion_Fraccionamiento: "Fracc. Centro",
  T_Usuario_Direccion_CP: "12345",
  T_Usuario_Direccion_Ciudad: "Ciudad Ejemplo",
  T_Usuario_Direccion_ProvinciaEstado: "id_provincia",
  T_Usuario_Direccion_Pais: "id_pais",
  T_Usuario_Rol: "cliente",
  T_Usuario_Estado: true
};

try {
  // Crear nuevo usuario
  const usuarioCreado = await createUsuario(nuevoUsuario);
  
  // Obtener todos los usuarios
  const usuarios = await getUsuarios();
  
  // Actualizar un usuario
  const usuarioActualizado = await updateUsuario(usuarioCreado.id, {
    T_Usuario_Telefono: "0987654321",
    T_Usuario_Direccion_Ciudad: "Nueva Ciudad"
  });
  
  // Eliminar un usuario
  await deleteUsuario(usuarioCreado.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/