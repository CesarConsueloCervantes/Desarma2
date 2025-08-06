'use client';

import { useCart } from '@/store/provider';
import { useState, CSSProperties } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [ticketGenerated, setTicketGenerated] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const router = useRouter();

  const handleClearCart = () => {
    clearCart();
    setTicketGenerated(false);
  };



  return (
    <>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>🛍️ Tu carrito</h1>

          {cartItems.length === 0 ? (
            <p style={styles.empty}>Tu carrito está vacío.</p>
          ) : (
            <ul style={styles.list}>
              {cartItems.map((item) => (
                <li key={item.id} style={styles.item}>
                  <img
                    src={item.image?.toString() || '/placeholder.png'}
                    alt={item.name}
                    style={styles.image}
                  />
                  <div style={styles.info}>
                    <h2 style={styles.name}>{item.name}</h2>
                    <p style={styles.quantity}>Cantidad: {item.quantity}</p>
                  </div>
                  <div style={styles.priceBox}>
                    <p style={styles.price}>
                      ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={styles.remove}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div style={styles.totalRow}>
            <p style={styles.total}>Total: ${totalPrice}</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => router.push('/generarPago')} style={styles.button}>
                 Finalizar compra
              </button>
              <button onClick={handleClearCart} style={styles.clear}>
                Vaciar
              </button>
            </div>
          </div>


        </div>
      </main>

      <Footer />
    </>
  );
}

const styles: { [key: string]: CSSProperties } = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
    color: 'white',
    padding: '2rem',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#38BDF8',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  empty: {
    textAlign: 'center',
    color: '#94A3B8',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '2rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    marginBottom: '1rem',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    marginRight: '1rem',
    border: '2px solid #38BDF8',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#7DD3FC',
  },
  quantity: {
    color: '#CBD5E1',
    marginTop: '0.25rem',
  },
  priceBox: {
    textAlign: 'right',
  },
  price: {
    color: '#BAE6FD',
    fontWeight: '500',
  },
  remove: {
    color: '#F472B6',
    fontSize: '0.9rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    marginTop: '0.5rem',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  total: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#7DD3FC',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    backgroundColor: '#38BDF8',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  },
  clear: {
    backgroundColor: '#475569',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  },
  ticketBox: {
    backgroundColor: '#065F46',
    padding: '1.5rem',
    borderRadius: '1rem',
    color: '#D1FAE5',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  },
  ticketTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  ticketList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
  },
  ticketTotal: {
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  download: {
    backgroundColor: '#059669',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  },
};