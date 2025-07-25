'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import { FaTrash, FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function ProductAdminPage() {
  return (
    <div className="admin-container">
      <HeaderAdmin />

      <div className="admin-content">
        <aside className="admin-sidebar">
          <ul>
            <li><Link href="/admin/panel">Panel</Link></li>
            <li className="active">Productos</li>
            <li>Proveedores</li>
            <li>Órdenes de Compra</li>
            <li>Ventas</li>
            <li>Envíos</li>
          </ul>
        </aside>

        <main className="admin-main">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Lista de Productos</h1>
            <div className="space-x-2">
              <button className="btn-filter">
                <FaFilter className="mr-1" /> Filtros
              </button>
              <button className="btn-add">
                <FaPlus className="mr-1" /> Añadir
              </button>
            </div>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Proveedor</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>Producto {index + 1}</td>
                  <td>General</td>
                  <td>$99.99</td>
                  <td>50</td>
                  <td>ProveedorX</td>
                  <td>Activo</td>
                  <td>
                    <button className="icon-button"><FaEdit /></button>
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
