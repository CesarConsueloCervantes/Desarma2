import api from '../config/services';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { 
      T_Usuario_Email: email,
      T_Usuario_Password: password 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (nombre, apellido, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      T_Usuario_Nombre: nombre,
      T_Usuario_Apellido: apellido, 
      T_Usuario_Email: email,
      T_Usuario_Password: password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
