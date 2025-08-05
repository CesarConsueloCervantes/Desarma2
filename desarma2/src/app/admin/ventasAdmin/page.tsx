'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTrash, FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import {
  getRegistroVentaPorId,
  createRegistroVenta,
  updateRegistroVenta,
  deleteRegistroVenta,
} from '@/services/registroGeneralVentaService';
import { getProductos } from '@/services/productoService';

interface Venta {
  _id?: string;
  T_RegistroGeneral_Producto_id: string;
  T_RegistroGeneral_Cantidad: number;
  T_RegistroGeneral_Producto_Precio: number;
  T_RegistroGeneral_Estatus: boolean;
}

interface Producto {
  _id: string;
  T_Producto_Nombre: string;
  T_Producto_Precio: number;
}

export default function VentasAdminPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Venta>({
    T_RegistroGeneral_Producto_id: '',
    T_RegistroGeneral_Cantidad: 1,
    T_RegistroGeneral_Producto_Precio: 0,
    T_RegistroGeneral_Estatus: true,
  });

  useEffect(() => {
    cargarVentas();
    cargarProductos();
  }, []);

  const cargarVentas = async () => {
    try {
      const data = await getRegistroVentaPorId();
      setVentas(data);
    } catch {
      alert('Error al cargar ventas');
    }
  };

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch {
      alert('Error al cargar productos');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'T_RegistroGeneral_Producto_id') {
      const productoSeleccionado = productos.find((p) => p._id === value);
      if (productoSeleccionado) {
        setFormData({
          ...formData,
          [name]: value,
          T_RegistroGeneral_Producto_Precio: productoSeleccionado.T_Producto_Precio,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]:
          name === 'T_RegistroGeneral_Cantidad'
            ? parseInt(value)
            : name === 'T_RegistroGeneral_Estatus'
            ? value === 'activo'
            : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateRegistroVenta(editId, formData);
        alert('Venta actualizada');
      } else {
        await createRegistroVenta(formData);
        alert('Venta registrada');
      }
      setShowForm(false);
      setEditId(null);
      resetForm();
      cargarVentas();
    } catch {
      alert('Error al guardar venta');
    }
  };

  const handleEdit = (venta: Venta) => {
    setFormData(venta);
    setEditId(venta._id ?? null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta venta?')) {
      try {
        await deleteRegistroVenta(id);
        alert('Venta eliminada');
        cargarVentas();
      } catch {
        alert('Error al eliminar venta');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      T_RegistroGeneral_Producto_id: '',
      T_RegistroGeneral_Cantidad: 1,
      T_RegistroGeneral_Producto_Precio: 0,
      T_RegistroGeneral_Estatus: true,
    });
  };

  return (
    <div className="admin-container">
      <HeaderAdmin />
      <div className="admin-content">
        <aside className="sidebar">
          <h2>Panel Principal</h2>
          <Link href="/admin/panel">Inicio</Link>
          <Link href="/admin/usuariosAdmin">Usuarios</Link>
          <Link href="/admin/productsAdmin">Productos</Link>
          <Link href="/admin/ordenCompra">Compras</Link>
          <Link href="/admin/proovedoresAdmin">Proveedores</Link>
          <Link href="/admin/ventasAdmin" className="active">Ventas</Link>
          <Link href="/admin/enviosAdmin">Envíos</Link>
        </aside>

        <main className="admin-main">
          <div className="product-actions">
            <button className="btn-filter"><FaFilter /> Filtrar</button>
            <button className="btn-add" onClick={() => {
              setShowForm(true);
              setEditId(null);
              resetForm();
            }}>
              <FaPlus /> Añadir
            </button>
          </div>

          {showForm && (
            <div className="product-form-container">
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-fields">
                  <select
                    name="T_RegistroGeneral_Producto_id"
                    value={formData.T_RegistroGeneral_Producto_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un producto</option>
                    {productos.map((producto) => (
                      <option key={producto._id} value={producto._id}>
                        {producto.T_Producto_Nombre}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    name="T_RegistroGeneral_Cantidad"
                    value={formData.T_RegistroGeneral_Cantidad}
                    onChange={handleChange}
                    placeholder="Cantidad"
                    required
                  />

                  <input
                    type="number"
                    value={formData.T_RegistroGeneral_Producto_Precio}
                    readOnly
                    placeholder="Precio"
                  />

                  <select
                    name="T_RegistroGeneral_Estatus"
                    value={formData.T_RegistroGeneral_Estatus ? 'activo' : 'inactivo'}
                    onChange={handleChange}
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
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
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => {
                const producto = productos.find(p => p._id === venta.T_RegistroGeneral_Producto_id);
                return (
                  <tr key={venta._id}>
                    <td>{producto?.T_Producto_Nombre ?? 'Desconocido'}</td>
                    <td>{venta.T_RegistroGeneral_Cantidad}</td>
                    <td>${venta.T_RegistroGeneral_Producto_Precio.toFixed(2)}</td>
                    <td>{venta.T_RegistroGeneral_Estatus ? 'Activo' : 'Inactivo'}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(venta)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDelete(venta._id!)}>🗑</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>
      <Footer />
    </div>
  );
}
