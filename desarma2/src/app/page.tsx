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
              <Image src="/bateria.png" alt="Batería" width={1000} height={1000} />
            <p>Batería</p>
          </div>
        <div className="product">
          <Image src="/diodo.png" alt="Placa" width={1000} height={1000} />
          <p>Placa</p>
        </div>
        <div className="product">
          <Image src="/camara.png" alt="Cámara" width={1000} height={1000} />
          <p>Cámara</p>
        </div>
          <div className="product">
          <Image src="/pincel.png" alt="Cámara" width={1000} height={1000} />
          <p>refacciones</p>
        </div>
        </div>
      </section>



      </main>

      <Footer />
    </div>
  );
}
