'use client';

import { useState } from 'react';
import { register } from '@/services/authService';
import { useRouter } from 'next/navigation';
import HeaderGuest from '@/components/HeaderGuest';

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
    <div className="flex flex-col min-h-screen">
      <HeaderGuest />
      <main style={styles.container}>
        <h1 style={styles.title}>Registro</h1>
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

          <select style={styles.inputFull} value="cliente" disabled>
            <option value="cliente">Rol: Cliente</option>
          </select>

          <button type="submit" style={styles.button}>Registrarse</button>
        </form>
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
    gap: '14px',
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  inputFull: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#000',
    color: '#fff',
    padding: '12px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
