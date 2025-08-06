'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import { FaTrash, FaEdit, FaFilter, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  getEnvios,
  createEnvio,
  updateEnvio,
  deleteEnvio,
} from '@/services/envioService';
import { getVentas } from '@/services/ventaService';
import { getPaqueterias } from '@/services/paqueteriaService';
import { getEstadosProvincias} from '@/services/estadoProvinciaService';
import { getPaises } from '@/services/paisService';

interface Envio {
  _id?: string;
  T_Envio_Venta_id: string;
  T_Envio_Servicio_Paqueteria_id: string;
  T_Envio_Direccion_Calle: string;
  T_Envio_Direccion_Fraccionamiento: string;  
  T_Envio_Direccion_CP: string;
  T_Envio_Direccion_Ciudad: string;
  T_Envio_Direccion_ProvinciaEstado: string;
  T_Envio_Direccion_Pais: string;
  T_Envio_Estatus: boolean;
}

export default function EnviosAdminPage() {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [ventas, setVentas] = useState<any[]>([]);
  const [paqueterias, setPaqueterias] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);
  const [paises, setPaises] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Envio>({
    T_Envio_Venta_id: '',
    T_Envio_Servicio_Paqueteria_id: '',
    T_Envio_Direccion_Calle: '',
    T_Envio_Direccion_Fraccionamiento: '',
    T_Envio_Direccion_CP: '',
    T_Envio_Direccion_Ciudad: '',
    T_Envio_Direccion_ProvinciaEstado: '64d4fa12e1a3b7f8a9c67890',
    T_Envio_Direccion_Pais: '64d4fa12e1a3b7f8a9c67890',
    T_Envio_Estatus: true,
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [envioData, ventasData, paqs, estadosData, paisesData] = await Promise.all([
        getEnvios(),
        getVentas(),
        getPaqueterias(),
        getEstadosProvincias(),
        getPaises(),
      ]);
      setEnvios(envioData);
      setVentas(ventasData);
      setPaqueterias(paqs);
      setEstados(estadosData);
      setPaises(paisesData);
    } catch {
      alert('Error al cargar datos');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateEnvio(editId, formData);
        alert('Envío actualizado');
      } else {
        await createEnvio(formData);
        alert('Envío creado');
      }
      resetForm();
      setShowForm(false);
      setEditId(null);
      cargarDatos();
    } catch {
      alert('Error al guardar el envío');
    }
  };

  const resetForm = () => {
    setFormData({
      T_Envio_Venta_id: '',
      T_Envio_Servicio_Paqueteria_id: '',
      T_Envio_Direccion_Calle: '',
      T_Envio_Direccion_Fraccionamiento: '',
      T_Envio_Direccion_CP: '',
      T_Envio_Direccion_Ciudad: '',
      T_Envio_Direccion_ProvinciaEstado: '64d4fa12e1a3b7f8a9c67898',
      T_Envio_Direccion_Pais: '64d4fa12e1a3b7f8a9c67899',
      T_Envio_Estatus: true,
    });
  };

  const handleEdit = (envio: Envio) => {
    setFormData(envio);
    setEditId(envio._id ?? null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este envío?')) {
      try {
        await deleteEnvio(id);
        alert('Envío eliminado');
        cargarDatos();
      } catch {
        alert('Error al eliminar envío');
      }
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
          <Link href="/admin/enviosAdmin" className="active">Envíos</Link>
          <Link href="/admin/paqueteriaPage" >Paqueterías</Link>
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
                  {/* Venta */}
                  <select name="T_Envio_Venta_id" value={formData.T_Envio_Venta_id} onChange={handleChange} required>
                    <option value="">Seleccione una venta</option>
                    {ventas.map((venta) => (
                      <option key={venta._id} value={venta._id}>
                        {venta._id}
                      </option>
                    ))}
                  </select>

                  {/* Paquetería */}
                  <select name="T_Envio_Servicio_Paqueteria_id" value={formData.T_Envio_Servicio_Paqueteria_id} onChange={handleChange} required>
                    <option value="">Seleccione paquetería</option>
                    {paqueterias.map((paq) => (
                      <option key={paq._id} value={paq._id}>
                        {paq.nombre}
                      </option>
                    ))}
                  </select>

                  {/* Dirección */}
                  <input name="T_Envio_Direccion_Calle" placeholder="Calle" value={formData.T_Envio_Direccion_Calle} onChange={handleChange} required />
                  <input name="T_Envio_Direccion_Fraccionamiento" placeholder="Fraccionamiento" value={formData.T_Envio_Direccion_Fraccionamiento} onChange={handleChange} required />
                  <input name="T_Envio_Direccion_CP" placeholder="Código Postal" value={formData.T_Envio_Direccion_CP} onChange={handleChange} required />
                  <input name="T_Envio_Direccion_Ciudad" placeholder="Ciudad" value={formData.T_Envio_Direccion_Ciudad} onChange={handleChange} required />



                  {/* Estatus */}
                  <label>
                    <input type="checkbox" name="T_Envio_Estatus" checked={formData.T_Envio_Estatus} onChange={handleChange} />
                    Estatus Activo
                  </label>

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
                <th>Venta</th>
                <th>Paquetería</th>
                <th>Calle</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>País</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {envios.map((envio) => (
                <tr key={envio._id}>
                  <td>{envio.T_Envio_Venta_id}</td>
                  <td>{envio.T_Envio_Servicio_Paqueteria_id}</td>
                  <td>{envio.T_Envio_Direccion_Calle}</td>
                  <td>{envio.T_Envio_Direccion_Ciudad}</td>
                  <td>{envio.T_Envio_Direccion_ProvinciaEstado}</td>
                  <td>{envio.T_Envio_Direccion_Pais}</td>
                  <td>{envio.T_Envio_Estatus ? 'Activo' : 'Inactivo'}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(envio)}>✏️</button>
                    <button className="btn-delete" onClick={() => handleDelete(envio._id!)}>🗑</button>
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

