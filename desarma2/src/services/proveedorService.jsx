import api from '../config/services';

// Obtener todos los proveedores
export const getProveedores = async () => {
  try {
    const response = await api.get('/proveedor');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un proveedor por ID
export const getProveedorPorId = async (id) => {
  try {
    const response = await api.get(`/proveedor/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo proveedor
export const createProveedor = async (proveedorData) => {
  try {
    const response = await api.post('/proveedor', proveedorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un proveedor
export const updateProveedor = async (id, proveedorData) => {
  try {
    const response = await api.put(`/proveedor/${id}`, proveedorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un proveedor
export const deleteProveedor = async (id) => {
  try {
    const response = await api.delete(`/proveedor/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
// Ejemplo de uso:
const nuevoProveedor = {
  C_Proveedor_Nombre: "Refacciones SA de CV",
  C_Proveedor_Contacto: "Juan Pérez",
  C_Proveedor_Telefono: "1234567890",
  C_Proveedor_Direccion: "Calle Principal #123",
  C_Proveedor_Email: "juan.perez@refacciones.com",
  C_Proveedor_Estatus: true,
  C_Proveedor_CreadoPor: "id_del_usuario_actual",
  C_Proveedor_ActualizadoPor: "id_del_usuario_actual"
};

try {
  // Crear nuevo proveedor
  const proveedorCreado = await createProveedor(nuevoProveedor);
  
  // Obtener todos los proveedores
  const proveedores = await getProveedores();
  
  // Actualizar un proveedor
  const proveedorActualizado = await updateProveedor(proveedorCreado.id, {
    C_Proveedor_Estatus: false
  });
  
  // Eliminar un proveedor
  await deleteProveedor(proveedorCreado.id);
  
} catch (error) {
  console.error('Error:', error);
}
*/