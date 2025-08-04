'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
} from '@/services/productoService';
import HeaderAdmin from '@/components/HeaderAdmin'; // ✅ Asegúrate de que esta ruta sea correcta

interface Producto {
  _id?: string;
  T_Producto_Nombre: string;
  T_Producto_Descripcion: string;
  T_Producto_Precio: number;
  T_Producto_Stock: number;
  T_Producto_Marca: string;
  T_Producto_Estado: boolean;
}

export default function ProductsAdminPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Producto>({
    T_Producto_Nombre: '',
    T_Producto_Descripcion: '',
    T_Producto_Precio: 0,
    T_Producto_Stock: 0,
    T_Producto_Marca: '',
    T_Producto_Estado: true,
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      alert('Error al cargar productos');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'T_Producto_Precio' || name === 'T_Producto_Stock' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProducto(editId, formData);
        alert('Producto actualizado');
      } else {
        await createProducto(formData);
        alert('Producto creado');
      }
      setShowForm(false);
      setEditId(null);
      resetForm();
      cargarProductos();
    } catch (error) {
      alert('Error al guardar producto');
    }
  };

  const resetForm = () => {
    setFormData({
      T_Producto_Nombre: '',
      T_Producto_Descripcion: '',
      T_Producto_Precio: 0,
      T_Producto_Stock: 0,
      T_Producto_Marca: '',
      T_Producto_Estado: true,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este producto?')) {
      try {
        await deleteProducto(id);
        alert('Producto eliminado');
        cargarProductos();
      } catch {
        alert('Error al eliminar producto');
      }
    }
  };

  const handleEdit = (producto: Producto) => {
    setFormData(producto);
    setEditId(producto._id ?? null);
    setShowForm(true);
  };

  return (
    <>
      <HeaderAdmin /> {/* ✅ Aquí se incluye el header */}
      <div className="admin-container">
        <div className="admin-content">
          <aside className="sidebar">
            <h2>Panel Principal</h2>
            <Link href="/admin/panel">Inicio</Link>
            <Link href="/admin/usuariosAdmin">Usuarios</Link>
            <Link href="/admin/productsAdmin" className="active">Productos</Link>
            <Link href="/admin/ordenCompra">Compras</Link>
            <Link href="/admin/proovedoresAdmin">Proveedores</Link>
            <Link href="/admin/ventasAdmin">Ventas</Link>
            <Link href="/admin/enviosAdmin">Envios</Link>
          </aside>

          <div className="main-content">
            <div className="product-actions">
              <button className="btn-filter">Filtrar</button>
              <button className="btn-add" onClick={() => {
                setShowForm(true);
                setEditId(null);
                resetForm();
              }}>
                Añadir
              </button>
            </div>

            {showForm && (
              <div className="product-form-container">
                <form onSubmit={handleSubmit} className="product-form">
                  <div className="form-image">
                    <div className="image-placeholder">🖼</div>
                  </div>
                  <div className="form-fields">
                    <input name="T_Producto_Nombre" placeholder="Nombre" value={formData.T_Producto_Nombre} onChange={handleChange} required />
                    <textarea name="T_Producto_Descripcion" placeholder="Descripción" value={formData.T_Producto_Descripcion} onChange={handleChange} required />
                    <div className="form-row">
                      <input name="T_Producto_Precio" type="number" placeholder="Precio" value={formData.T_Producto_Precio} onChange={handleChange} />
                      <input name="T_Producto_Stock" type="number" placeholder="Cantidad" value={formData.T_Producto_Stock} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                      <input name="T_Producto_Marca" placeholder="Marca" value={formData.T_Producto_Marca} onChange={handleChange} />
                      <select name="T_Producto_Estado" value={formData.T_Producto_Estado ? 'activo' : 'inactivo'} onChange={(e) => setFormData({ ...formData, T_Producto_Estado: e.target.value === 'activo' })}>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                      </select>
                    </div>
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
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Marca</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto._id}>
                    <td>{producto.T_Producto_Nombre}</td>
                    <td>${producto.T_Producto_Precio.toFixed(2)}</td>
                    <td>{producto.T_Producto_Stock}</td>
                    <td>{producto.T_Producto_Marca}</td>
                    <td>{producto.T_Producto_Estado ? 'Activo' : 'Inactivo'}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(producto)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDelete(producto._id!)}>🗑</button>
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
