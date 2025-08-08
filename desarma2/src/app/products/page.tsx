'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductos } from '@/services/productoService';
import { useCart } from '@/store/provider';
import type { CSSProperties } from 'react';
import Footer from '@/components/Footer';

interface Producto {
  _id: string;
  T_Producto_Nombre: string;
  T_Producto_Descripcion: string;
  T_Producto_Precio: number;
  T_Producto_Stock: number;
  T_Producto_Marca: string;
  T_Producto_Estado: boolean;
  T_Producto_Imagen: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [clickedButtonId, setClickedButtonId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosReal = await getProductos();
        const activos = productosReal.filter((p) => p.T_Producto_Estado);
        setProductos(activos);
      } catch (error) {
        console.error('Error al cargar productos reales:', error);
      }
    };

    fetchData();
  }, []);

  const handleAgregarAlCarrito = (producto: Producto) => {
    setClickedButtonId(producto._id);
    setTimeout(() => setClickedButtonId(null), 150);
    addToCart({
      id: producto._id,
      name: producto.T_Producto_Nombre,
      price: producto.T_Producto_Precio,
      quantity: 1,
      image: producto.T_Producto_Imagen,
    });
  };

  return (
    <div>
      <Header />
      <main style={styles.container}>
        <h1 style={styles.title}>Productos Disponibles</h1>
        <div style={styles.grid}>
          {productos.length > 0 ? (
            productos.map((p) => (
              <div
                key={p._id}
                style={{
                  ...styles.card,
                  ...(hoveredCardId === p._id ? styles.cardZoom : {}),
                }}
                onMouseEnter={() => setHoveredCardId(p._id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <img
                  src={p.T_Producto_Imagen.toString()}
                  alt="Vista previa del producto"
                  style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '8px' }}
                />
                <h3 style={styles.productName}>{p.T_Producto_Nombre}</h3>
                <p style={styles.price}>${p.T_Producto_Precio} MXN</p>
                <button
                  style={{
                    ...styles.button,
                    ...(clickedButtonId === p._id ? styles.buttonClicked : {}),
                  }}
                  onClick={() => handleAgregarAlCarrito(p)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>
              No hay productos activos disponibles.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: 'clamp(40px, 8vh, 60px) auto',
    padding: 'clamp(16px, 4vw, 32px)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: 'clamp(20px, 5vw, 28px)',
    textAlign: 'center',
    color: '#475B85',
    marginBottom: 'clamp(20px, 5vw, 30px)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 'clamp(16px, 4vw, 24px)',
  },
  card: {
    borderRadius: '2rem',
    padding: 'clamp(16px, 4vw, 24px)',
    textAlign: 'center',
    backgroundColor: '#475B85',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#fff',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  cardZoom: {
    transform: 'scale(1.03)',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '250px',
    borderRadius: '1rem',
    objectFit: 'contain',
  },
  productName: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    marginTop: '12px',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    margin: '8px 0',
    color: '#E2E8F0',
  },
  button: {
    backgroundColor: '#0F172A',
    color: '#fff',
    border: 'none',
    padding: 'clamp(10px, 3vw, 12px) clamp(14px, 4vw, 18px)',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    borderRadius: '1rem',
    cursor: 'pointer',
    marginTop: 'auto',
    transition: 'transform 0.2s ease',
  },
  buttonClicked: {
    transform: 'scale(0.95)',
  },
};


