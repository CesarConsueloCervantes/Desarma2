'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import { FaTrash, FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function UserAdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const handleAddClick = () => {
    setFormMode('add');
    setCurrentUserId(null);
    setShowForm(true);
  };

  const handleEditClick = (id: number) => {
    setFormMode('edit');
    setCurrentUserId(id);
    setShowForm(true);
  };

  return (
    <div className="admin-container">
      <HeaderAdmin />

      <div className="admin-content">
        <aside className="admin-sidebar">
          <ul>
            <li><Link href="/admin/panel">Panel</Link></li>
            <li><Link href="/admin/products">Productos</Link></li>
            <li className="active">Usuarios</li>
            <li>Proveedores</li>
            <li>Órdenes de Compra</li>
            <li>Ventas</li>
            <li>Envíos</li>
          </ul>
        </aside>

        <main className="admin-main">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Lista de Usuarios</h1>
            <div className="space-x-2">
              <button className="btn-filter">
                <FaFilter className="mr-1" /> Filtros
              </button>
              <button className="btn-add" onClick={handleAddClick}>
                <FaPlus className="mr-1" /> Añadir
              </button>
            </div>
          </div>

          {showForm && (
            <div className="product-form-container">
              <h2 className="text-lg font-semibold mb-2">
                {formMode === 'add' ? 'Usuario - Nuevo' : `Editar Usuario - ID ${currentUserId}`}
              </h2>
              <form className="product-form">
                <div className="form-image">
                  <label>Imagen del usuario</label>
                  <div className="image-placeholder">📷</div>
                </div>
                <div className="form-fields">
                  <div className="form-row">
                    <input type="text" placeholder="Nombre" />
                    <input type="text" placeholder="Apellido" />
                  </div>
                  <div className="form-row">
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Teléfono" />
                  </div>
                  <input type="text" placeholder="Dirección" />
                  <div className="form-row">
                    <input type="text" placeholder="Ciudad" />
                    <input type="text" placeholder="Estado/provincia" />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="País" />
                    <input type="text" placeholder="Código Postal" />
                  </div>
                  <div className="form-row">
                    <input type="date" placeholder="Fecha de Registro" />
                    <input type="date" placeholder="Fecha de Actualización" />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="Rol" />
                    <input type="text" placeholder="Estatus" />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-edit">Editar</button>
                    <button type="submit" className="btn-save">Guardar</button>
                    <button type="button" className="btn-delete">Eliminar</button>
                  </div>
                </div>
              </form>
              <button onClick={() => setShowForm(false)} className="btn-back">Regresar ↩</button>
            </div>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>Usuario {index + 1}</td>
                  <td>usuario{index + 1}@correo.com</td>
                  <td>555-1234</td>
                  <td>Cliente</td>
                  <td>Activo</td>
                  <td>
                    <button className="icon-button" onClick={() => handleEditClick(index + 1)}><FaEdit /></button>
                    <button className="icon-button"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <span>{'<<'}</span>
            <span>{'<'}</span>
            <span className="current">1</span>
            <span>2</span>
            <span>3</span>
            <span>...</span>
            <span>100</span>
            <span>{'>'}</span>
            <span>{'>>'}</span>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
