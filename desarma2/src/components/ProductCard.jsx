import React from 'react';
import './ProductCard.css';

function ProductCard({ producto }) {
  return (
    <div className="product-card">
      <img src={`/assets/images/${producto.imagen}`} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <button>Ver más</button>
    </div>
  );
}

export default ProductCard;
