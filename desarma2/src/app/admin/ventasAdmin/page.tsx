'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVentas } from '@/services/ventaService';

interface Venta {
  _id?: string;
  T_Venta_FormaPago: string;
  T_Venta_Subtotal: number;
  T_Venta_IVA: number;
  T_Venta_Total: number;
  T_Venta_Estatus: boolean;
  createdAt: string;
}

export default function VentasAdminPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const data = await getVentas();
      console.log('📦 Ventas recibidas:', data);
      setVentas(data);
    } catch {
      alert('Error al cargar ventas');
    }
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
          <Link href="/admin/paqueteriaPage" >Paqueterías</Link>
        </aside>

        <main className="admin-main">
          <h2>📊 Ventas registradas</h2>

          <table className="product-table">
            <thead>
              <tr>
                <th>Forma de pago</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Estatus</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta._id}>
                  <td>{venta.T_Venta_FormaPago}</td>
                  <td>${venta.T_Venta_Subtotal?.toFixed(2) ?? '—'}</td>
                  <td>${venta.T_Venta_IVA?.toFixed(2) ?? '—'}</td>
                  <td>${venta.T_Venta_Total?.toFixed(2) ?? '—'}</td>
                  <td>{venta.T_Venta_Estatus ? '✅ Activa' : '❌ Inactiva'}</td>
                  <td>{new Date(venta.createdAt).toLocaleDateString()}</td>
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

