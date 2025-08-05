'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '@/services/usuarioService';

interface Usuario {
  _id?: string;
  T_Usuario_Nombre: string;
  T_Usuario_Apellido: string;
  T_Usuario_Email: string;
  T_Usuario_Telefono: string;
  T_Usuario_Password: string;
  T_Usuario_Direccion_Calle?: string;
  T_Usuario_Direccion_Fraccionamiento?: string;
  T_Usuario_Direccion_CP?: string;
  T_Usuario_Direccion_Ciudad?: string;
  T_Usuario_Direccion_ProvinciaEstado?: string;
  T_Usuario_Direccion_Pais?: string;
  T_Usuario_Rol: string;
  T_Usuario_Estado: boolean;
}

export default function UserAdminPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Usuario>({
    T_Usuario_Nombre: '',
    T_Usuario_Apellido: '',
    T_Usuario_Email: '',
    T_Usuario_Telefono: '',
    T_Usuario_Password: '',
    T_Usuario_Direccion_Calle: '',
    T_Usuario_Direccion_Fraccionamiento: '',
    T_Usuario_Direccion_CP: '',
    T_Usuario_Direccion_Ciudad: '',
    T_Usuario_Direccion_ProvinciaEstado: '',
    T_Usuario_Direccion_Pais: '',
    T_Usuario_Rol: 'cliente',
    T_Usuario_Estado: true
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      alert('Error al cargar usuarios');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormMode('add');
    setCurrentUserId(null);
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (usuario: Usuario) => {
    setFormMode('edit');
    setCurrentUserId(usuario._id ?? null);
    setFormData(usuario);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este usuario?')) {
      try {
        await deleteUsuario(id);
        alert('Usuario eliminado');
        cargarUsuarios();
      } catch (err) {
        alert('Error al eliminar usuario');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        await createUsuario(formData);
        alert('Usuario creado');
      } else if (formMode === 'edit' && currentUserId) {
        await updateUsuario(currentUserId, formData);
        alert('Usuario actualizado');
      }
      setShowForm(false);
      cargarUsuarios();
    } catch (err) {
      alert('Error al guardar usuario');
    }
  };

  const resetForm = () => {
    setFormData({
      T_Usuario_Nombre: '',
      T_Usuario_Apellido: '',
      T_Usuario_Email: '',
      T_Usuario_Telefono: '',
      T_Usuario_Password: '',
      T_Usuario_Direccion_Calle: '',
      T_Usuario_Direccion_Fraccionamiento: '',
      T_Usuario_Direccion_CP: '',
      T_Usuario_Direccion_Ciudad: '',
      T_Usuario_Direccion_ProvinciaEstado: '',
      T_Usuario_Direccion_Pais: '',
      T_Usuario_Rol: 'cliente',
      T_Usuario_Estado: true
    });
  };

  return (
    <div className="admin-container">
      <HeaderAdmin />

      <div className="admin-content">
          <aside className="sidebar">
            <h2>Panel Principal</h2>
            <Link href="/admin/panel">Inicio</Link>
            <Link href="/admin/usuariosAdmin"className="active">Usuarios</Link>
            <Link href="/admin/productsAdmin" >Productos</Link>
            <Link href="/admin/ordenCompra">Compras</Link>
            <Link href="/admin/proovedoresAdmin">Proveedores</Link>
            <Link href="/admin/ventasAdmin">Ventas</Link>
            <Link href="/admin/enviosAdmin">Envios</Link>
          </aside>

        <main className="main-content">
          <div className="product-actions">
            <button className="btn-filter"><FaFilter className="mr-1" /> Filtros</button>
            <button className="btn-add" onClick={handleAddClick}><FaPlus className="mr-1" /> Añadir</button>
          </div>

          {showForm && (
            <div className="product-form-container">
              <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-fields">
                  <div className="form-row">
                    <input name="T_Usuario_Nombre" value={formData.T_Usuario_Nombre} onChange={handleChange} placeholder="Nombre" required />
                    <input name="T_Usuario_Apellido" value={formData.T_Usuario_Apellido} onChange={handleChange} placeholder="Apellido" required />
                  </div>
                  <div className="form-row">
                    <input name="T_Usuario_Email" type="email" value={formData.T_Usuario_Email} onChange={handleChange} placeholder="Correo electrónico" required />
                    <input name="T_Usuario_Telefono" value={formData.T_Usuario_Telefono} onChange={handleChange} placeholder="Teléfono (10 dígitos)" required />
                  </div>
                  <input name="T_Usuario_Password" type="password" value={formData.T_Usuario_Password} onChange={handleChange} placeholder="Contraseña" required />
                  <input name="T_Usuario_Direccion_Calle" value={formData.T_Usuario_Direccion_Calle} onChange={handleChange} placeholder="Calle" />
                  <input name="T_Usuario_Direccion_Fraccionamiento" value={formData.T_Usuario_Direccion_Fraccionamiento} onChange={handleChange} placeholder="Fraccionamiento" />
                  <input name="T_Usuario_Direccion_CP" value={formData.T_Usuario_Direccion_CP} onChange={handleChange} placeholder="Código Postal" />
                  <input name="T_Usuario_Direccion_Ciudad" value={formData.T_Usuario_Direccion_Ciudad} onChange={handleChange} placeholder="Ciudad" />
                  <div className="form-row">
                    <input name="T_Usuario_Direccion_ProvinciaEstado" value={formData.T_Usuario_Direccion_ProvinciaEstado} onChange={handleChange} placeholder="Provincia/Estado (ID)" />
                    <input name="T_Usuario_Direccion_Pais" value={formData.T_Usuario_Direccion_Pais} onChange={handleChange} placeholder="País (ID)" />
                  </div>
                  <div className="form-row">
                    <select name="T_Usuario_Rol" value={formData.T_Usuario_Rol} onChange={handleChange}>
                      <option value="cliente">Cliente</option>
                      <option value="administrador">Administrador</option>
                    </select>
                    <select name="T_Usuario_Estado" value={formData.T_Usuario_Estado ? 'true' : 'false'} onChange={(e) => setFormData({ ...formData, T_Usuario_Estado: e.target.value === 'true' })}>
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-save">Guardar</button>
                    <button type="button" className="btn-back" onClick={() => setShowForm(false)}>Cancelar</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u._id}>
                  <td>{u.T_Usuario_Nombre} {u.T_Usuario_Apellido}</td>
                  <td>{u.T_Usuario_Email}</td>
                  <td>{u.T_Usuario_Telefono}</td>
                  <td>{u.T_Usuario_Rol}</td>
                  <td>{u.T_Usuario_Estado ? 'Activo' : 'Inactivo'}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => handleEditClick(u)}><FaEdit /></button>
                    <button className="btn-delete" onClick={() => handleDelete(u._id!)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <Footer />
    </div>
  );
}

