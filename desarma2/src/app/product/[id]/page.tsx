'use client';

import { useState } from 'react';
import Image from 'next/image';
import HeaderGuest from '@/components/HeaderGuest';

export default function ProductIndividual() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div>
      <HeaderGuest />
      <main style={styles.container}>
        {/* Producto */}
        <div style={styles.productSection}>
          <div style={styles.imageBox}>
            <Image src="/camara.png" alt="Producto" width={240} height={240} />
            <p style={styles.price}>$12.99</p>
            <div style={styles.quantity}>
              <button onClick={decrease}>−</button>
              <span>{quantity}</span>
              <button onClick={increase}>+</button>
            </div>
            <button style={styles.cartButton}>Add to Cart</button>
          </div>

          <div style={styles.imageBox}>
            <Image src="/bateria.png" alt="Producto 2" width={240} height={240} />
            <p style={styles.price}>$29.99</p>
            <div style={styles.quantity}>
              <button onClick={decrease}>−</button>
              <span>{quantity}</span>
              <button onClick={increase}>+</button>
            </div>
            <button style={styles.cartButton}>Add to Cart</button>
          </div>
        </div>

        {/* Comentarios */}
        <section style={styles.commentsSection}>
          <h2>Dejar un comentario</h2>
          {comments.map((comment, index) => (
            <div key={index} style={styles.comment}>
              <strong>{comment.name}</strong> <span>⭐ {comment.rating}</span>
              <p>{comment.text}</p>
              <small>{comment.time}</small>
            </div>
          ))}

          <textarea placeholder="Escribe tu comentario..." style={styles.textarea}></textarea>
          <button style={styles.sendButton}>Enviar comentario</button>
        </section>
      </main>
    </div>
  );
}

const comments = [
  {
    name: 'Andrés',
    rating: 5,
    text: 'Buena calidad, encajó perfecto en el teléfono',
    time: 'Hace 2 días',
  },
  {
    name: 'Laura',
    rating: 5,
    text: 'La pantalla funciona muy bien, sin problemas',
    time: 'Hace 1 semana',
  },
  {
    name: 'Javier',
    rating: 4,
    text: 'Batería decente, aunque esperaba que durara un poco más',
    time: 'Hace 3 semanas',
  },
];

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  productSection: {
    display: 'flex',
    gap: '40px',
    marginBottom: '40px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  imageBox: {
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  quantity: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  cartButton: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  commentsSection: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  comment: {
    borderBottom: '1px solid #eee',
    paddingBottom: '12px',
    marginBottom: '12px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minHeight: '80px',
    marginBottom: '10px',
  },
  sendButton: {
    backgroundColor: '#475B85',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
