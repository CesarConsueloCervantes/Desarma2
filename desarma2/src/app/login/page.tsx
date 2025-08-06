'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loginUser } from '@/store/authSlice';
import HeaderGuest from '@/components/HeaderGuest';
import { useAuth } from '@/store/provider'; // ✅ Nuevo import
import Footer from '@/components/Footer';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);
  const { setUsuario } = useAuth(); // ✅ Nuevo hook

  useEffect(() => {
    if (user) {
      setUsuario(user); // ✅ Sincroniza el contexto global

      console.log(user);
      if (user.rol === 'administrador') {
        router.push('/admin/panel');
      } else {
        router.push('/');
      }
    }
  }, [user, router, setUsuario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Enviando login:', { email, password });
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      console.error('❌ Error de login:', err);
      alert('Credenciales inválidas');
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div style={styles.page}>
      <HeaderGuest />
      <main style={styles.container}>
        <h1 style={styles.title}>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Entrar
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>

        <div style={styles.registerContainer}>
          <p style={styles.registerText}>¿No tienes cuenta?</p>
          <button onClick={handleRegisterRedirect} style={styles.registerButton}>
            Registrarse
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: '#0F172A',
    minHeight: '100vh',
    padding: 'clamp(16px, 4vw, 32px)',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: 'clamp(60px, 10vh, 100px) auto',
    padding: 'clamp(24px, 6vw, 40px)',
    backgroundColor: '#1E293B',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    textAlign: 'left',
    fontFamily: 'sans-serif',
    color: '#F8FAFC',
  },
  title: {
    fontSize: 'clamp(20px, 5vw, 28px)',
    marginBottom: 'clamp(16px, 4vw, 24px)',
    textAlign: 'center',
    color: '#38BDF8',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(12px, 3vw, 16px)',
  },
  input: {
    padding: 'clamp(10px, 3vw, 14px)',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    border: '1px solid #475569',
    borderRadius: '8px',
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    outline: 'none',
  },
  button: {
    backgroundColor: '#38BDF8',
    color: '#0F172A',
    padding: 'clamp(10px, 3vw, 14px)',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#F87171',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    textAlign: 'center',
  },
  registerContainer: {
    marginTop: 'clamp(20px, 5vw, 24px)',
    textAlign: 'center',
  },
  registerText: {
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    marginBottom: '10px',
    color: '#CBD5E1',
  },
  registerButton: {
    backgroundColor: '#334155',
    color: '#F8FAFC',
    padding: 'clamp(10px, 3vw, 12px) clamp(16px, 5vw, 20px)',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

