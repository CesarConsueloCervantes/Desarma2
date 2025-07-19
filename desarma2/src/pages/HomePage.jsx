import React from 'react';
import './HomePage.css';
import ProductCard from '../components/ProductCard';

function HomePage() {
  // Simulación de productos más vendidos
  const productos = [
    { id: 1, nombre: 'Filtro Aceite', precio: 129, imagen: 'oil-filter.jpg' },
    { id: 2, nombre: 'Pastillas Frenos', precio: 249, imagen: 'brake-pads.jpg' },
    { id: 3, nombre: 'Amortiguador', precio: 599, imagen: 'shock.jpg' },
  ];

  return (
    <div className="homepage-container">
      <section className="banner">
        <div className="banner-texto">
          <h1>Refacciones que mueven tu mundo</h1>
          <p>Encuentra las mejores piezas para tu Celular</p>
        </div>
        <div className="banner-fondo" />
      </section>

      <section className="productos-populares">
        <h2>Piezas más vendidas</h2>
        <div className="grid-productos">
          {productos.map((item) => (
            <ProductCard key={item.id} producto={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
