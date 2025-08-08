'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/authSlice';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { updateUsuario } from '@/services/usuarioService';
import Footer from '@/components/Footer';

export default function UserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isClient, setIsClient] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    calle: '',
    fraccionamiento: '',
    cp: '',
    ciudad: ''
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user) {
      setFormData({
        nombre: user?.nombre ?? '',
        apellido: user?.apellido ?? '',
        email: user?.email ?? '',
        telefono: user?.telefono ?? '',
        calle: user?.direccion?.calle ?? '',
        fraccionamiento: user?.direccion?.fraccionamiento ?? '',
        cp: user?.direccion?.cp ?? '',
        ciudad: user?.direccion?.ciudad ?? ''
      });
    } else if (isClient && !user) {
      router.push('/login');
    }
  }, [isClient, user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = user?._id; // Use _id instead of id
      if (!userId) {
        alert('ID del usuario no disponible');
        return;
      }

      const rawPayload = {
        T_Usuario_Nombre: formData.nombre,
        T_Usuario_Apellido: formData.apellido,
        T_Usuario_Email: formData.email,
        T_Usuario_Telefono: formData.telefono,
        T_Usuario_Direccion_Calle: formData.calle,
        T_Usuario_Direccion_Fraccionamiento: formData.fraccionamiento,
        T_Usuario_Direccion_CP: formData.cp,
        T_Usuario_Direccion_Ciudad: formData.ciudad,
        T_Usuario_Rol: user?.rol ?? 'cliente',
        T_Usuario_Estado: true,
      };

      const payload = Object.fromEntries(
        Object.entries(rawPayload).filter(([_, v]) => v !== undefined && v !== null && v !== '')
      );

      await updateUsuario(userId, payload);
      alert('✅ Datos actualizados correctamente');
      setEditMode(false);
    } catch (error: any) {
      console.error('❌ Error al actualizar usuario:', error);
      alert(error.response?.data?.message || 'No se pudo actualizar el usuario');
    }
  };

  if (!isClient || !user) return null;

  return (
    <>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>Bienvenido, {formData.nombre}</h1>
          {editMode ? (
            <form onSubmit={handleEditSubmit} style={styles.form}>
              <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleInputChange} style={styles.input} required />
              <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleInputChange} style={styles.input} required />
              <input name="email" placeholder="Correo electrónico" type="email" value={formData.email} onChange={handleInputChange} style={styles.input} required />
              <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleInputChange} style={styles.input} required />
              <input name="calle" placeholder="Calle" value={formData.calle} onChange={handleInputChange} style={styles.input} />
              <input name="fraccionamiento" placeholder="Fraccionamiento" value={formData.fraccionamiento} onChange={handleInputChange} style={styles.input} />
              <input name="cp" placeholder="Código Postal" value={formData.cp} onChange={handleInputChange} style={styles.input} />
              <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleInputChange} style={styles.input} />

              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.primaryButton}>Guardar</button>
                <button type="button" onClick={() => setEditMode(false)} style={styles.secondaryButton}>Cancelar</button>
              </div>
            </form>
          ) : (
            <div style={{ marginBottom: '20px' }}>
              <p style={styles.text}><strong>Email:</strong> {formData.email}</p>
              <p style={styles.text}><strong>Teléfono:</strong> {formData.telefono}</p>
              <p style={styles.text}><strong>Dirección:</strong> {formData.calle}, {formData.fraccionamiento}, {formData.cp}, {formData.ciudad}</p>
              <p style={styles.text}><strong>Rol:</strong> {user?.rol}</p>
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton} onClick={handleLogout}>Cerrar sesión</button>
            {!editMode && (
              <button style={styles.secondaryButton} onClick={() => setEditMode(true)}>Editar datos</button>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: '#0F172A',
    minHeight: '100vh',
    padding: 'clamp(16px, 4vw, 32px)',
    fontFamily: 'sans-serif',
    color: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: 'clamp(60px, 10vh, 100px) auto',
    padding: 'clamp(24px, 6vw, 40px)',
    backgroundColor: '#1E293B',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 'clamp(22px, 5vw, 28px)',
    color: '#38BDF8',
    marginBottom: 'clamp(20px, 5vw, 24px)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(12px, 3vw, 16px)',
    marginBottom: 'clamp(16px, 4vw, 20px)',
  },
  input: {
    width: '100%',
    padding: 'clamp(10px, 3vw, 14px)',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    border: '1px solid #475569',
    borderRadius: '8px',
    backgroundColor: '#0F172A',
    color: '#E2E8F0',
    outline: 'none',
  },
  text: {
    fontSize: 'clamp(14px, 2.5vw, 15px)',
    margin: '12px 0',
    lineHeight: '1.5',
    color: '#E2E8F0',
  },
  buttonGroup: {
    display: 'flex',
    gap: 'clamp(10px, 3vw, 16px)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 'clamp(16px, 4vw, 20px)',
  },
  primaryButton: {
    backgroundColor: '#38BDF8',
    color: '#0F172A',
    padding: 'clamp(10px, 3vw, 14px) clamp(16px, 5vw, 20px)',
    fontSize: 'clamp(14px, 2.5vw, 15px)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#38BDF8',
    border: '1px solid #38BDF8',
    padding: 'clamp(10px, 3vw, 14px) clamp(16px, 5vw, 20px)',
    fontSize: 'clamp(14px, 2.5vw, 15px)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};



