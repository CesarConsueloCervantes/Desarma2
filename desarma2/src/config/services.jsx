import axios from 'axios';

// Crear instancia de Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api', // URL base del backend
});

// Interceptor básico para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error.message);
    return Promise.reject(error);
  }
);

export default api;