'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  getRegistrosCompra,
  createRegistroCompra,
  updateRegistroCompra,
  deleteRegistroCompra
} from '@/services/registroGeneralCompraService';
import HeaderAdmin from '@/components/HeaderAdmin';

interface RegistroCompra {
  _id?: string;
  T_Compra_id: string;
  T_RegistroGeneral_Producto_id: string;
  T_RegistroGeneral_Cantidad: number;
  T_RegistroGeneral_Producto_Precio: number;
  T_RegistroGeneral_Estatus: boolean;
}

export default function OrdenCompraAdminPage() {
  const [registros, setRegistros] = useState<RegistroCompra[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<RegistroCompra>({
    T_Compra_id: '',
    T_RegistroGeneral_Producto_id: '',
    T_RegistroGeneral_Cantidad: 0,
    T_RegistroGeneral_Producto_Precio: 0,
    T_RegistroGeneral_Estatus: true,
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    try {
      const data = await getRegistrosCompra();
      setRegistros(data);
    } catch {
      alert('Error al cargar órdenes de compra');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'T_RegistroGeneral_Cantidad' ||
        name === 'T_RegistroGeneral_Producto_Precio'
          ? Number(value)
          : name === 'T_RegistroGeneral_Estatus'
          ? value === 'true'
          : value,
    });
  };

  const resetForm = () => {
    setFormData({
      T_Compra_id: '',
      T_RegistroGeneral_Producto_id: '',
      T_RegistroGeneral_Cantidad: 0,
      T_RegistroGeneral_Producto_Precio: 0,
      T_RegistroGeneral_Estatus: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateRegistroCompra(editId, formData);
        alert('Registro actualizado');
      } else {
        await createRegistroCompra(formData);
        alert('Registro creado');
      }
      setShowForm(false);
      setEditId(null);
      resetForm();
      cargarRegistros();
    } catch {
      alert('Error al guardar el registro');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este registro?')) {
      try {
        await deleteRegistroCompra(id);
        alert('Registro eliminado');
        cargarRegistros();
      } catch {
        alert('Error al eliminar el registro');
      }
    }
  };

  const handleEdit = (registro: RegistroCompra) => {
    setFormData(registro);
    setEditId(registro._id ?? null);
    setShowForm(true);
  };

  return (
    <>
      <HeaderAdmin />
      <div className="admin-container">
        <div className="admin-content">
          <aside className="sidebar">
            <h2>Panel Principal</h2>
            <Link href="/admin/panel">Inicio</Link>
            <Link href="/admin/usuariosAdmin">Usuarios</Link>
            <Link href="/admin/productsAdmin">Productos</Link>
            <Link href="/admin/ordenCompra" className="active">Compras</Link>
            <Link href="/admin/proovedoresAdmin">Proveedores</Link>
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
                      name="T_Compra_id"
                      placeholder="ID Compra"
                      value={formData.T_Compra_id}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="T_RegistroGeneral_Producto_id"
                      placeholder="ID Producto"
                      value={formData.T_RegistroGeneral_Producto_id}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="T_RegistroGeneral_Cantidad"
                      type="number"
                      placeholder="Cantidad"
                      value={formData.T_RegistroGeneral_Cantidad}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="T_RegistroGeneral_Producto_Precio"
                      type="number"
                      placeholder="Precio Unitario"
                      value={formData.T_RegistroGeneral_Producto_Precio}
                      onChange={handleChange}
                      required
                    />
                    <select
                      name="T_RegistroGeneral_Estatus"
                      value={formData.T_RegistroGeneral_Estatus ? 'true' : 'false'}
                      onChange={handleChange}
                    >
                      <option value="true">Activo</option>
                      <option value="false">Cancelado</option>
                    </select>

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
                  <th>Compra</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro) => (
                  <tr key={registro._id}>
                    <td>{registro.T_Compra_id}</td>
                    <td>{registro.T_RegistroGeneral_Producto_id}</td>
                    <td>{registro.T_RegistroGeneral_Cantidad}</td>
                    <td>${registro.T_RegistroGeneral_Producto_Precio.toFixed(2)}</td>
                    <td>{registro.T_RegistroGeneral_Estatus ? 'Activo' : 'Cancelado'}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(registro)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDelete(registro._id!)}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">&lt;&lt; 1 2 3 4 5 ... 160 &gt;&gt;</div>
          </div>
        </div>
      </div>
    </>
  );
}