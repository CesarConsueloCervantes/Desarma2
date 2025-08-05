'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loginUser } from '@/store/authSlice';
import HeaderGuest from '@/components/HeaderGuest';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (user) {
      console.log(user)
      if (user.rol === 'administrador') {
        router.push('/admin/panel');
      } else {
        router.push('/');
      }
    }
  }, [user, router]);

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
    <div className="flex flex-col min-h-screen">
      <HeaderGuest />
      <main style={styles.container}>
        <h1 style={styles.title}>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            style={styles.inputFull}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            style={styles.inputFull}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Entrar
          </button>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
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
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    textAlign: 'left',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  inputFull: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '12px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  registerContainer: {
    marginTop: '24px',
    textAlign: 'center'
  },
  registerText: {
    fontSize: '14px',
    marginBottom: '10px'
  },
  registerButton: {
    backgroundColor: '#444',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};
