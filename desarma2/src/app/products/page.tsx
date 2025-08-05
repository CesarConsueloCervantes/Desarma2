'use client';

import HeaderGuest from '@/components/HeaderGuest';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductos } from '@/services/productoService';
import { useCart } from '@/store/provider'; // 👈 Nuevo import
import type { CSSProperties } from 'react';

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
  const { addToCart } = useCart(); // 👈 Hook del carrito
  const [productos, setProductos] = useState<Producto[]>([]);

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

  // ✅ Nuevo handler funcional
  const handleAgregarAlCarrito = (producto: Producto) => {
    addToCart({
      id: producto._id,
      name: producto.T_Producto_Nombre,
      price: producto.T_Producto_Precio,
      quantity: 1,
    });
    router.push('/car');
  };

  return (
    <div>
      <HeaderGuest />
      <main style={styles.container}>
        <h1 style={styles.title}>Productos Disponibles</h1>
        <div style={styles.grid}>
          {productos.length > 0 ? (
            productos.map((p) => (
              <div key={p._id} style={styles.card}>
                <Image
                  src={p.T_Producto_Imagen || '/pieza1.png'}
                  alt={p.T_Producto_Nombre}
                  width={160}
                  height={160}
                  style={styles.image}
                />
                <h3 style={styles.productName}>{p.T_Producto_Nombre}</h3>
                <p style={styles.price}>${p.T_Producto_Precio} MXN</p>
                <button
                  style={styles.button}
                  onClick={() => handleAgregarAlCarrito(p)} // 👈 Pasamos el producto
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