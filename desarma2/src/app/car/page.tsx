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
    padding: 'clamp(16px, 4vw, 32px)',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: 'clamp(40px, 8vh, 80px) auto',
  },
  title: {
    fontSize: 'clamp(24px, 6vw, 40px)',
    fontWeight: 'bold',
    color: '#38BDF8',
    textAlign: 'center',
    marginBottom: 'clamp(24px, 6vw, 40px)',
  },
  empty: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: 'clamp(24px, 6vw, 40px)',
  },
  item: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 3vw, 20px)',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 'clamp(16px, 4vw, 24px)',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    marginBottom: 'clamp(16px, 4vw, 24px)',
  },
  image: {
    width: 'clamp(60px, 20vw, 80px)',
    height: 'clamp(60px, 20vw, 80px)',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    border: '2px solid #38BDF8',
  },
  info: {
    flex: 1,
    minWidth: '200px',
  },
  name: {
    fontSize: 'clamp(14px, 2.5vw, 18px)',
    fontWeight: 'bold',
    color: '#7DD3FC',
  },
  quantity: {
    color: '#CBD5E1',
    marginTop: '0.25rem',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
  },
  priceBox: {
    textAlign: 'right',
    minWidth: '100px',
  },
  price: {
    color: '#BAE6FD',
    fontWeight: '500',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
  },
  remove: {
    color: '#F472B6',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    marginTop: '0.5rem',
  },
  totalRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 3vw, 20px)',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'clamp(24px, 6vw, 40px)',
  },
  total: {
    fontSize: 'clamp(18px, 5vw, 24px)',
    fontWeight: 'bold',
    color: '#7DD3FC',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 3vw, 20px)',
  },
  button: {
    backgroundColor: '#38BDF8',
    color: 'white',
    padding: 'clamp(10px, 3vw, 14px) clamp(16px, 5vw, 20px)',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
  },
  clear: {
    backgroundColor: '#475569',
    color: 'white',
    padding: 'clamp(10px, 3vw, 14px) clamp(16px, 5vw, 20px)',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
  },
  ticketBox: {
    backgroundColor: '#065F46',
    padding: 'clamp(20px, 5vw, 32px)',
    borderRadius: '1rem',
    color: '#D1FAE5',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  },
  ticketTitle: {
    fontSize: 'clamp(18px, 5vw, 24px)',
    fontWeight: 'bold',
    marginBottom: 'clamp(16px, 4vw, 24px)',
  },
  ticketList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: 'clamp(16px, 4vw, 24px)',
  },
  ticketTotal: {
    fontWeight: 'bold',
    marginBottom: 'clamp(16px, 4vw, 24px)',
    fontSize: 'clamp(16px, 4vw, 18px)',
  },
  download: {
    backgroundColor: '#059669',
    color: 'white',
    padding: 'clamp(10px, 3vw, 14px) clamp(16px, 5vw, 20px)',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
  },
};

