// pages/index.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import HeaderGuest from '@/components/HeaderGuest';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header  />

      <main className="flex-grow">
        {/* Banner Principal */}
        <section className="w-full">
          <Image
            src="/banner.png" // Asegúrate de poner la imagen en /public
            alt="Refacciones para celulares"
            width={1600}
            height={500}
            className="w-full object-cover"
          />
        </section>

        {/* Piezas más vendidas */}
      <section className="piezas-vendidas">
         <h2>Piezas más vendidas</h2>
        <div className="product-grid">
           <div className="product">
              <Image src="/bateria.png" alt="Batería" width={128} height={128} />
            <p>Batería</p>
          </div>
        <div className="product">
          <Image src="/placa.png" alt="Placa" width={128} height={128} />
          <p>Placa</p>
        </div>
        <div className="product">
          <Image src="/camara.png" alt="Cámara" width={128} height={128} />
          <p>Cámara</p>
        </div>
        </div>
      </section>


        {/* Piezas recomendadas */}
      <section className="piezas-recomendadas">
  <h2>Piezas recomendadas</h2>
  <div className="carousel-container">
    <div className="carousel-track">
      <div className="carousel-item">
        <Image src="/pieza1.png" alt="One Plus" width={180} height={180} />
        <p>One Plus</p>
      </div>
      <div className="carousel-item">
        <Image src="/pieza2.png" alt="Xiaomi C5 Plus" width={180} height={180} />
        <p>Xiaomi C5 Plus</p>
      </div>
      <div className="carousel-item">
        <Image src="/pieza3.png" alt="Samsung A05" width={180} height={180} />
        <p>Samsung A05</p>
      </div>
      {/* Puedes agregar más aquí */}
    </div>
  </div>
</section>

      </main>

      <Footer />
    </div>
  );
}
