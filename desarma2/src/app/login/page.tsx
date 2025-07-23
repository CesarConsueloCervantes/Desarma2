'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import HeaderGuest from '@/components/HeaderGuest';

export default function LoginPage() {
  return (
    <div>
      <HeaderGuest />

      <main style={styles.container}>
        <h1 style={styles.title}>Login</h1>
        <form style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            style={styles.inputFull}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.inputFull}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.registerContainer}>
          <p style={styles.registerText}>¿No tienes una cuenta?</p>
          <Link href="/register">
            <button style={styles.registerButton}>Registrarse</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    textAlign: 'left',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  inputFull: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#475B85', // azul institucional
    color: '#fff',
    padding: '12px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  registerContainer: {
    marginTop: '20px',
    textAlign: 'center'
  },
  registerText: {
    fontSize: '14px',
    marginBottom: '8px'
  },
  registerButton: {
    backgroundColor: '#475B85', // azul institucional
    color: '#fff',
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
