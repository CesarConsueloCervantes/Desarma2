'use client';

import HeaderGuest from '@/components/HeaderGuest';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const productos = [
  {
    id: 1,
    nombre: 'Pantalla Samsung A05',
    precio: 1200,
    imagen: '/pieza1.png',
  },
  {
    id: 2,
    nombre: 'Batería Xiaomi C5',
    precio: 650,
    imagen: '/pieza2.png',
  },
  {
    id: 3,
    nombre: 'Cámara Motorola G8',
    precio: 480,
    imagen: '/pieza3.png',
  },
  {
    id: 4,
    nombre: 'Placa base OnePlus 8T',
    precio: 2300,
    imagen: '/placa.png',
  },
];

export default function ProductsPage() {
  const router = useRouter();

  const handleAgregarAlCarrito = (id: number) => {
    // Aquí podrías agregar lógica para guardar en contexto o localStorage
    // Redirigir al carrito
    router.push('/car');
  };

  return (
    <div>
      <HeaderGuest />

      <main style={styles.container}>
        <h1 style={styles.title}>Productos Disponibles</h1>

        <div style={styles.grid}>
          {productos.map((p) => (
            <div key={p.id} style={styles.card}>
              <Image
                src={p.imagen}
                alt={p.nombre}
                width={160}
                height={160}
                style={styles.image}
              />
              <h3 style={styles.productName}>{p.nombre}</h3>
              <p style={styles.price}>${p.precio} MXN</p>
              <button
                style={styles.button}
                onClick={() => handleAgregarAlCarrito(p.id)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
    color: '#475B85',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  image: {
    borderRadius: '6px',
    objectFit: 'contain',
  },
  productName: {
    fontSize: '16px',
    marginTop: '12px',
    fontWeight: 'bold',
  },
  price: {
    fontSize: '14px',
    margin: '8px 0',
    color: '#333',
  },
  button: {
    backgroundColor: '#475B85',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
    