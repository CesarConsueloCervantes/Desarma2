'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <HeaderAdmin />

      <div className="admin-content">
        <aside className="admin-sidebar">
          <ul>
            <li>Panel Principal</li>
            <li>Productos</li>
            <li>Usuarios</li>
            <li>Proveedores</li>
            <li>Órdenes de Compra</li>
            <li>Ventas</li>
            <li>Envíos</li>
          </ul>
        </aside>

        <main className="admin-main">
          <h1>Panel de Control</h1>
          <div className="admin-cards">
            <div className="card card-green">
              <h3>Ganancias Mensuales:</h3>
              <p className="value">$120,000.00</p>
              <p className="note">Del 1/Junio/25 al 31/Junio/25 <span className="percentage">+10%</span></p>
            </div>

            <div className="card card-red">
              <h3>Valor Promedio por Pedido:</h3>
              <p className="value">$3,000.00</p>
              <p className="note">Del 1/Junio/25 al 31/Junio/25 <span className="percentage">-1%</span></p>
            </div>

            <div className="card card-green">
              <h3>Envíos Totales:</h3>
              <p className="value">6,000.00</p>
              <p className="note">Del 1/Junio/25 al 31/Junio/25 <span className="percentage">+10%</span></p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
