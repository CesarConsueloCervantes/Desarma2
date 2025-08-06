'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loginUser } from '@/store/authSlice';
import HeaderGuest from '@/components/HeaderGuest';
import { useAuth } from '@/store/provider'; // ✅ Nuevo import

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
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: '#0F172A',
    minHeight: '100vh',
    padding: '0 16px',
  },
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '30px',
    backgroundColor: '#1E293B',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    textAlign: 'left',
    fontFamily: 'sans-serif',
    color: '#F8FAFC',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#38BDF8',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #475569',
    borderRadius: '8px',
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    outline: 'none',
  },
  button: {
    backgroundColor: '#38BDF8',
    color: '#0F172A',
    padding: '12px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#F87171',
    fontSize: '14px',
    textAlign: 'center',
  },
  registerContainer: {
    marginTop: '24px',
    textAlign: 'center',
  },
  registerText: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#CBD5E1',
  },
  registerButton: {
    backgroundColor: '#334155',
    color: '#F8FAFC',
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

