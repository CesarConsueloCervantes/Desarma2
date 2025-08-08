'use client';

import { useState } from 'react';
import { register } from '@/services/authService';
import { useRouter } from 'next/navigation';
import HeaderGuest from '@/components/HeaderGuest';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(firstName, lastName, email, password);
      router.push('/login');
    } catch (err) {
      alert('Error en el registro');
    }
  };

  return (
    <div style={styles.main}>
      <HeaderGuest />
      <div style={styles.container}>
        <h1 style={styles.title}>Registro</h1>
        <div style={styles.box}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <input
                type="text"
                placeholder="Nombre"
                style={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                style={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
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
            <button type="submit" style={styles.button}>Registrarse</button>
          </form>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
    color: 'white',
    padding: 'clamp(16px, 4vw, 32px)',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: 'clamp(40px, 10vh, 80px) auto',
  },
  title: {
    fontSize: 'clamp(24px, 6vw, 40px)',
    fontWeight: 'bold',
    color: '#38BDF8',
    textAlign: 'center',
    marginBottom: 'clamp(24px, 6vw, 40px)',
  },
  box: {
    backgroundColor: '#1E293B',
    padding: 'clamp(24px, 6vw, 40px)',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(12px, 3vw, 20px)',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(12px, 3vw, 20px)',
  },
  input: {
    width: '100%',
    padding: 'clamp(10px, 3vw, 14px)',
    borderRadius: '0.5rem',
    border: '1px solid #94A3B8',
    backgroundColor: '#0F172A',
    color: 'white',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
  },
  button: {
    backgroundColor: '#38BDF8',
    color: 'white',
    padding: 'clamp(10px, 3vw, 14px) clamp(16px, 5vw, 24px)',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: 'clamp(12px, 3vw, 20px)',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
  },
};

