'use client';

import HeaderGuest from '@/components/HeaderGuest';
import type { CSSProperties } from 'react';

export default function RegisterPage() {
  return (
    <div>
      <HeaderGuest />

      <main style={styles.container}>
        <h1 style={styles.title}>Register</h1>
        <form style={styles.form}>
          <div style={styles.row}>
            <input type="text" placeholder="First name" style={styles.input} />
            <input type="text" placeholder="Last name" style={styles.input} />
          </div>
          <input type="password" placeholder="New Password" style={styles.inputFull} />
          <input type="email" placeholder="Email address" style={styles.inputFull} />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
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
  row: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px'
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
  }
};
