'use client';

import HeaderAdmin from '@/components/HeaderAdmin';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUsuarios, updateUsuario } from '@/services/usuarioService';
import { getPaises } from '@/services/paisService';
import { getEstadosProvincias } from '@/services/estadoProvinciaService';

interface Usuario {
  _id?: string;
  T_Usuario_Nombre: string;
  T_Usuario_Apellido: string;
  T_Usuario_Email: string;
  T_Usuario_Telefono: string;
  T_Usuario_Rol: string;
  T_Usuario_Estado: boolean;
  T_Usuario_Pais?: {
    _id: string;
    C_Pais_Nombre: string;
  };
  T_Usuario_EstadoProvincia?: {
    _id: string;
    C_EstadoProvincia_Nombre: string;
  };
}

interface Pais {
  _id: string;
  C_Pais_Nombre: string;
}

interface EstadoProvincia {
  _id: string;
  C_EstadoProvincia_Nombre: string;
}

export default function UserAdminPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [estados, setEstados] = useState<EstadoProvincia[]>([]);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  useEffect(() => {
    cargarUsuarios();
    cargarPaises();
    cargarEstados();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      alert('Error al cargar usuarios');
    }
  };

  const cargarPaises = async () => {
    try {
      const data = await getPaises();
      setPaises(data);
    } catch (error) {
      console.error('Error al cargar países');
    }
  };

  const cargarEstados = async () => {
    try {
      const data = await getEstadosProvincias();
      setEstados(data);
    } catch (error) {
      console.error('Error al cargar estados/provincias');
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
  };

  const handleUpdate = async () => {
    if (!usuarioEditando?._id) return;

    const {  ...payload } = usuarioEditando;

    // Solo enviamos los IDs de país y estado
    const dataToSend = {
      ...payload,
      T_Usuario_Pais: usuarioEditando.T_Usuario_Pais?._id,
      T_Usuario_EstadoProvincia: usuarioEditando.T_Usuario_EstadoProvincia?._id,
    };

    try {
      await updateUsuario(usuarioEditando._id, dataToSend);
      alert('Usuario actualizado');
      setUsuarioEditando(null);
      cargarUsuarios();
    } catch (error) {
      alert('Error al actualizar usuario');
    }
  };

  return (
    <div className="admin-container">
      <HeaderAdmin />

      <div className="admin-content">
        <aside className="sidebar">
          <h2>Panel Principal</h2>
          <Link href="/admin/panel">Inicio</Link>
          <Link href="/admin/usuariosAdmin" className="active">Usuarios</Link>
          <Link href="/admin/productsAdmin">Productos</Link>
          <Link href="/admin/ordenCompra">Compras</Link>
          <Link href="/admin/proovedoresAdmin">Proveedores</Link>
          <Link href="/admin/ventasAdmin">Ventas</Link>
          <Link href="/admin/enviosAdmin">Envíos</Link>
          <Link href="/admin/paqueteriaPage">Paqueterías</Link>
        </aside>

        <main className="main-content">
          <h2 className="section-title">👥 Usuarios registrados</h2>

          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>País</th>
                <th>Estado/Provincia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u._id}>
                  <td>{u.T_Usuario_Nombre} {u.T_Usuario_Apellido}</td>
                  <td>{u.T_Usuario_Email}</td>
                  <td>{u.T_Usuario_Telefono}</td>
                  <td>{u.T_Usuario_Rol}</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '13px',
                      backgroundColor: u.T_Usuario_Estado ? '#ffe5b4' : '#dc3545',
                      color: u.T_Usuario_Estado ? '#333' : '#fff',
                    }}>
                      {u.T_Usuario_Estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>{u.T_Usuario_Pais?.C_Pais_Nombre || '—'}</td>
                  <td>{u.T_Usuario_EstadoProvincia?.C_EstadoProvincia_Nombre || '—'}</td>
                  <td>
                    <button onClick={() => handleEdit(u)}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {usuarioEditando && (
            <div className="edit-form">
              <h3>✏️ Editar usuario</h3>
              <input
                type="text"
                value={usuarioEditando.T_Usuario_Nombre}
                onChange={(e) => setUsuarioEditando({ ...usuarioEditando, T_Usuario_Nombre: e.target.value })}
                placeholder="Nombre"
              />
              <input
                type="text"
                value={usuarioEditando.T_Usuario_Apellido}
                onChange={(e) => setUsuarioEditando({ ...usuarioEditando, T_Usuario_Apellido: e.target.value })}
                placeholder="Apellido"
              />
              <input
                type="email"
                value={usuarioEditando.T_Usuario_Email}
                onChange={(e) => setUsuarioEditando({ ...usuarioEditando, T_Usuario_Email: e.target.value })}
                placeholder="Email"
              />
              <input
                type="text"
                value={usuarioEditando.T_Usuario_Telefono}
                onChange={(e) => setUsuarioEditando({ ...usuarioEditando, T_Usuario_Telefono: e.target.value })}
                placeholder="Teléfono"
              />
              <select
                value={usuarioEditando.T_Usuario_Pais?._id || ''}
                onChange={(e) => {
                  const selected = paises.find(p => p._id === e.target.value);
                  setUsuarioEditando({ ...usuarioEditando, T_Usuario_Pais: selected });
                }}
              >
                <option value="">Seleccionar país</option>
                {paises.map(p => (
                  <option key={p._id} value={p._id}>{p.C_Pais_Nombre}</option>
                ))}
              </select>
              <select
                value={usuarioEditando.T_Usuario_EstadoProvincia?._id || ''}
                onChange={(e) => {
                  const selected = estados.find(ep => ep._id === e.target.value);
                  setUsuarioEditando({ ...usuarioEditando, T_Usuario_EstadoProvincia: selected });
                }}
              >
                <option value="">Seleccionar estado/provincia</option>
                {estados.map(ep => (
                  <option key={ep._id} value={ep._id}>{ep.C_EstadoProvincia_Nombre}</option>
                ))}
              </select>
              <button onClick={handleUpdate}>Guardar cambios</button>
              <button onClick={() => setUsuarioEditando(null)}>Cancelar</button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}



