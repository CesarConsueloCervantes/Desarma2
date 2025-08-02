'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import { FaTrash, FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function OrdenCompraAdminPage() {
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
            <li className="active">Órdenes de Compra</li>
            <li>Ventas</li>
            <li>Envíos</li>
          </ul>
        </aside>

        <main className="admin-main">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Lista de Órdenes de Compra</h1>
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
                {formMode === 'add' ? 'Órden de compra - Nueva' : `Editar Órden de compra - ID ${currentId}`}
              </h2>
              <form className="product-form">
                <div className="form-fields">
                  <div className="form-row">
                    <input type="text" placeholder="Proveedor" />
                    <input type="date" placeholder="Fecha de Recepción" />
                  </div>
                  <textarea placeholder="Detalles de Encargo"></textarea>
                  <div className="form-row">
                    <input type="text" placeholder="SubTotal" />
                    <input type="text" placeholder="Método de Pago" />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="IVA" />
                    <input type="date" placeholder="Fecha de Registro" />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="Total" />
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
                <th>Proveedor</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>Proveedor {index + 1}</td>
                  <td>$1000</td>
                  <td>$160</td>
                  <td>$1160</td>
                  <td>Transferencia</td>
                  <td>Completado</td>
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
