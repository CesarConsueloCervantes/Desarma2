'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor
} from '@/services/proveedorService';
import HeaderAdmin from '@/components/HeaderAdmin'; // ✅ Asegúrate que esta ruta sea correcta

interface Proveedor {
  _id?: string;
  C_Proveedor_Nombre: string;
  C_Proveedor_Email: string;
  C_Proveedor_Contacto: string;
  C_Proveedor_Telefono: string;
  C_Proveedor_Direccion: string;
  C_Proveedor_Estatus: boolean;
  C_Proveedor_CreadoPor: string;
  C_Proveedor_ActualizadoPor: string;
}

export default function ProveedoresAdminPage() {
  const usuario = useSelector((state: any) => state.auth.user);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Proveedor>({
    C_Proveedor_Nombre: '',
    C_Proveedor_Email: '',
    C_Proveedor_Contacto: '',
    C_Proveedor_Telefono: '',
    C_Proveedor_Direccion: '',
    C_Proveedor_Estatus: true,
    C_Proveedor_CreadoPor: '',
    C_Proveedor_ActualizadoPor: ''
  });

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const data = await getProveedores();
      setProveedores(data);
    } catch (error) {
      alert('Error al cargar proveedores');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario?.id) {
      console.log(usuario)
      alert('Debes estar logueado para realizar esta acción');
      return;
    }

    const proveedorData: Proveedor = {
      ...formData,
      C_Proveedor_CreadoPor: formData.C_Proveedor_CreadoPor || usuario.id,
      C_Proveedor_ActualizadoPor: usuario.id
    };

    try {
      if (editId) {
        await updateProveedor(editId, proveedorData);
        alert('Proveedor actualizado');
      } else {
        await createProveedor(proveedorData);
        alert('Proveedor creado');
      }
      setShowForm(false);
      setEditId(null);
      resetForm();
      cargarProveedores();
    } catch (error) {
      alert('Error al guardar proveedor');
    }
  };

  const resetForm = () => {
    setFormData({
      C_Proveedor_Nombre: '',
      C_Proveedor_Email: '',
      C_Proveedor_Contacto: '',
      C_Proveedor_Telefono: '',
      C_Proveedor_Direccion: '',
      C_Proveedor_Estatus: true,
      C_Proveedor_CreadoPor: '',
      C_Proveedor_ActualizadoPor: ''
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este proveedor?')) {
      try {
        await deleteProveedor(id);
        alert('Proveedor eliminado');
        cargarProveedores();
      } catch {
        alert('Error al eliminar proveedor');
      }
    }
  };

  const handleEdit = (proveedor: Proveedor) => {
    setFormData(proveedor);
    setEditId(proveedor._id ?? null);
    setShowForm(true);
  };

  return (
    <>
      <HeaderAdmin /> {/* ✅ Header agregado */}
      <div className="admin-container">
        <div className="admin-content">
          <aside className="sidebar">
            <h2>Panel Principal</h2>
            <Link href="/admin/panel">Inicio</Link>
            <Link href="/admin/usuariosAdmin">Usuarios</Link>
            <Link href="/admin/productsAdmin">Productos</Link>
            <Link href="/admin/ordenCompra">Compras</Link>
            <Link href="/admin/proovedoresAdmin" className="active">Proveedores</Link>
            <Link href="/admin/ventasAdmin">Ventas</Link>
            <Link href="/admin/enviosAdmin">Envios</Link>
          </aside>

          <div className="main-content">
            <div className="product-actions">
              <button className="btn-filter">Filtrar</button>
              <button
                className="btn-add"
                onClick={() => {
                  setShowForm(true);
                  setEditId(null);
                  resetForm();
                }}
              >
                Añadir
              </button>
            </div>

            {showForm && (
              <div className="product-form-container">
                <form onSubmit={handleSubmit} className="product-form">
                  <div className="form-fields">
                    <input
                      name="C_Proveedor_Nombre"
                      placeholder="Nombre"
                      value={formData.C_Proveedor_Nombre}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="C_Proveedor_Email"
                      placeholder="Correo electrónico"
                      type="email"
                      value={formData.C_Proveedor_Email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="C_Proveedor_Contacto"
                      placeholder="Contacto"
                      value={formData.C_Proveedor_Contacto}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="C_Proveedor_Telefono"
                      placeholder="Teléfono (10 dígitos)"
                      value={formData.C_Proveedor_Telefono}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="C_Proveedor_Direccion"
                      placeholder="Dirección"
                      value={formData.C_Proveedor_Direccion}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-actions">
                      <button type="submit" className="btn-save">Guardar</button>
                      <button type="button" className="btn-back" onClick={() => {
                        setShowForm(false);
                        setEditId(null);
                      }}>Cancelar</button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <table className="product-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Contacto</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((proveedor) => (
                  <tr key={proveedor._id}>
                    <td>{proveedor.C_Proveedor_Nombre}</td>
                    <td>{proveedor.C_Proveedor_Email}</td>
                    <td>{proveedor.C_Proveedor_Contacto}</td>
                    <td>{proveedor.C_Proveedor_Telefono}</td>
                    <td>{proveedor.C_Proveedor_Direccion}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(proveedor)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDelete(proveedor._id!)}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">&lt;&lt; 1 2 3 &gt;&gt;</div>
          </div>
        </div>
      </div>
    </>
  );
}
