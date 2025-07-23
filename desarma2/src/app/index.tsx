// pages/index.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import HeaderGuest from '@/components/HeaderGuest';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderGuest/>

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
        <section className="py-8 px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Piezas más vendidas</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-32">
              <Image src="/bateria.png" alt="Batería" width={128} height={128} />
              <p className="text-sm mt-2">Batería</p>
            </div>
            <div className="w-32">
              <Image src="/placa.png" alt="Placa" width={128} height={128} />
              <p className="text-sm mt-2">Placa</p>
            </div>
            <div className="w-32">
              <Image src="/camara.png" alt="Cámara" width={128} height={128} />
              <p className="text-sm mt-2">Cámara</p>
            </div>
          </div>
        </section>

        {/* Piezas recomendadas */}
        <section className="py-8 px-4 text-center bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Piezas recomendadas</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['One Plus', 'Xiaomi C5 Plus', 'Samsung A05'].map((item, i) => (
              <div key={i} className="w-32">
                <Image src={`/pieza${i + 1}.png`} alt={item} width={128} height={128} />
                <p className="text-sm mt-2">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
