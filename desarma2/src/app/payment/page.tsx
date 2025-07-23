'use client';

import HeaderGuest from '@/components/HeaderGuest';
import type { CSSProperties } from 'react';

export default function CheckoutPage() {
  return (
    <div>
      <HeaderGuest />

      <main style={styles.container}>
        <h1 style={styles.title}>Confirmar Pago</h1>

        <section style={styles.summary}>
          <p><strong>Productos:</strong> 3</p>
          <p><strong>Total:</strong> $2,500 MXN</p>
        </section>

        <form style={styles.form}>
          <input type="text" placeholder="Nombre del titular" style={styles.input} />
          <input type="text" placeholder="Número de tarjeta" style={styles.input} />
          <div style={styles.row}>
            <input type="text" placeholder="MM/AA" style={styles.inputHalf} />
            <input type="text" placeholder="CVC" style={styles.inputHalf} />
          </div>
          <button type="submit" style={styles.button}>Realizar pago</button>
        </form>
      </main>
    </div>
  );
}
const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#475B85',
  },
  summary: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '30px',
    fontSize: '14px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  inputHalf: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#475B85',
    color: '#fff',
    padding: '12px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};
