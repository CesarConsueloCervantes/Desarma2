'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  getPaqueterias,
  createPaqueteria
} from '@/services/paqueteriaService';

interface Paqueteria {
  _id?: string;
  C_Paqueteria_Nombre: string;
  C_Paqueteria_Contacto: string;
  C_Paqueteria_Telefono: string;
  C_Paqueteria_Estatus: boolean;
}

export default function PaqueteriaPage() {
  const [paqueterias, setPaqueterias] = useState<Paqueteria[]>([]);
  const [formData, setFormData] = useState<Paqueteria>({
    C_Paqueteria_Nombre: '',
    C_Paqueteria_Contacto: '',
    C_Paqueteria_Telefono: '',
    C_Paqueteria_Estatus: true
  });

  useEffect(() => {
    cargarPaqueterias();
  }, []);

  const cargarPaqueterias = async () => {
    try {
      const data = await getPaqueterias();
      setPaqueterias(data);
    } catch {
      alert('Error al cargar paqueterías');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'C_Paqueteria_Estatus' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPaqueteria(formData);
      alert('Paquetería creada');
      setFormData({
        C_Paqueteria_Nombre: '',
        C_Paqueteria_Contacto: '',
        C_Paqueteria_Telefono: '',
        C_Paqueteria_Estatus: true
      });
      cargarPaqueterias();
    } catch {
      alert('Error al crear paquetería');
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
          <Link href="/admin/ventasAdmin">Ventas</Link>
          <Link href="/admin/enviosAdmin">Envíos</Link>
          <Link href="/admin/paqueteriaPage" className="active">Paqueterías</Link>
        </aside>

        <main className="main-content">
          <h2>📦 Registrar nueva paquetería</h2>

          <div className="product-form-container">
            <form className="product-form" onSubmit={handleSubmit}>
              <div className="form-fields">
                <input
                  name="C_Paqueteria_Nombre"
                  value={formData.C_Paqueteria_Nombre}
                  onChange={handleChange}
                  placeholder="Nombre de la paquetería"
                  required
                />
                <input
                  name="C_Paqueteria_Contacto"
                  value={formData.C_Paqueteria_Contacto}
                  onChange={handleChange}
                  placeholder="Contacto principal"
                  required
                />
                <input
                  name="C_Paqueteria_Telefono"
                  value={formData.C_Paqueteria_Telefono}
                  onChange={handleChange}
                  placeholder="Teléfono (10 dígitos)"
                  pattern="[0-9]{10}"
                  required
                />
                <select
                  name="C_Paqueteria_Estatus"
                  value={formData.C_Paqueteria_Estatus ? 'true' : 'false'}
                  onChange={handleChange}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>

                <div className="form-actions">
                  <button type="submit" className="btn-save">Guardar</button>
                </div>
              </div>
            </form>
          </div>

          <h2 style={{ marginTop: '40px' }}>📋 Paqueterías registradas</h2>

          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              {paqueterias.map((p) => (
                <tr key={p._id}>
                  <td>{p.C_Paqueteria_Nombre}</td>
                  <td>{p.C_Paqueteria_Contacto}</td>
                  <td>{p.C_Paqueteria_Telefono}</td>
                  <td>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontSize: '13px',
                        backgroundColor: p.C_Paqueteria_Estatus ? '#ffe5b4' : '#dc3545',
                        color: p.C_Paqueteria_Estatus ? '#333' : '#fff',
                      }}
                    >
                      {p.C_Paqueteria_Estatus ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
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

