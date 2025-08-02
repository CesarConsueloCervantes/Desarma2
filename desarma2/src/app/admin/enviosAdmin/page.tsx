'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import { FaTrash, FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function EnvioAdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentId, setCurrentId] = useState<number | null>(null);

  const handleAddClick = () => {
    setFormMode('add');
    setCurrentId(null);
    setShowForm(true);
  };

  const handleEditClick = (id: number) => {
    setFormMode('edit');
    setCurrentId(id);
    setShowForm(true);
  };

  return (
    <div className="admin-container">
      <HeaderAdmin />

      <div className="admin-content">
        <aside className="admin-sidebar">
          <ul>
            <li><Link href="/admin/panel">Panel</Link></li>
            <li><Link href="/admin/productos">Productos</Link></li>
            <li><Link href="/admin/usuarios">Usuarios</Link></li>
            <li><Link href="/admin/proveedores">Proveedores</Link></li>
            <li><Link href="/admin/ordenes">Órdenes de Compra</Link></li>
            <li><Link href="/admin/ventas">Ventas</Link></li>
            <li className="active">Envíos</li>
          </ul>
        </aside>

        <main className="admin-main">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Lista de Envíos</h1>
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
                {formMode === 'add' ? 'Nuevo Envío' : `Editar Envío - ID ${currentId}`}
              </h2>
              <form className="product-form">
                <div className="form-fields">
                  <div className="form-row">
                    <input type="text" placeholder="Usuario" />
                    <input type="text" placeholder="id de Venta" />
                  </div>
                  <input type="text" placeholder="Dirección de Entrega" />
                  <div className="form-row">
                    <input type="text" placeholder="Ciudad" />
                    <input type="text" placeholder="Estado/Provincia" />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="Código Postal" />
                    <input type="text" placeholder="País" />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="Transportista" />
                    <input type="text" placeholder="Número de Seguimiento" />
                  </div>
                  <div className="form-row">
                    <input type="date" placeholder="Fecha de Envío" />
                    <input type="date" placeholder="Fecha de Entrega" />
                  </div>
                  <div className="form-row">
                    <input type="date" placeholder="Fecha de Registro" />
                    <input type="date" placeholder="Fecha de Actualización" />
                  </div>
                  <input type="text" placeholder="Estatus" />
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
                <th>Usuario</th>
                <th>Dirección</th>
                <th>Transportista</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>Usuario {index + 1}</td>
                  <td>Dirección Ejemplo</td>
                  <td>DHL</td>
                  <td>Entregado</td>
                  <td>2025-08-01</td>
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
