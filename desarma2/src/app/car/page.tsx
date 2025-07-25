'use client';

import HeaderGuest from '@/components/HeaderGuest';
import type { CSSProperties } from 'react';
import Image from 'next/image';

export default function CartPage() {
  return (
    <div>
      <HeaderGuest />

      <main style={styles.container}>
        <h1 style={styles.title}>Tu Carrito</h1>

        <div style={styles.cartItem}>
          <Image
            src="/pieza1.png"
            alt="Producto"
            width={80}
            height={80}
            style={{ borderRadius: '6px' }}
          />
          <div style={styles.itemDetails}>
            <h3 style={styles.itemTitle}>Pantalla Samsung A05</h3>
            <p style={styles.itemPrice}>$1,200 MXN</p>
            <p style={styles.itemQty}>Cantidad: 1</p>
          </div>
        </div>

        <div style={styles.cartItem}>
          <Image
            src="/pieza2.png"
            alt="Producto"
            width={80}
            height={80}
            style={{ borderRadius: '6px' }}
          />
          <div style={styles.itemDetails}>
            <h3 style={styles.itemTitle}>Batería Xiaomi C5</h3>
            <p style={styles.itemPrice}>$650 MXN</p>
            <p style={styles.itemQty}>Cantidad: 2</p>
          </div>
        </div>

        <div style={styles.totalBox}>
          <p style={styles.totalText}>Total: $2,500 MXN</p>
          <button style={styles.checkoutButton}>Finalizar compra</button>
        </div>
      </main>
    </div>
  );
}
const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '80px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '24px',
    color: '#475B85',
    textAlign: 'center',
  },
  cartItem: {
    display: 'flex',
    gap: '16px',
    padding: '12px',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: '16px',
    marginBottom: '6px',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: '14px',
    marginBottom: '2px',
    color: '#333',
  },
  itemQty: {
    fontSize: '14px',
    color: '#555',
  },
  totalBox: {
    marginTop: '30px',
    textAlign: 'center',
  },
  totalText: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  checkoutButton: {
    backgroundColor: '#475B85',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};
