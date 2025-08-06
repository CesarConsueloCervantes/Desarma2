'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const carouselImages = [
  { src: '/bateria.png', alt: 'Batería' },
  { src: '/diodo.png', alt: 'Placa' },
  { src: '/camara.png', alt: 'Cámara' },
  { src: '/pincel.png', alt: 'Refacciones' },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        {/* Banner Principal */}
        <section style={styles.banner}>
          <Image
            src="/banner.png"
            alt="Refacciones para celulares"
            width={1600}
            height={300}
            style={styles.bannerImage}
          />
        </section>

        {/* Carrusel de piezas más vendidas */}
        <section style={styles.carouselSection}>
          <h2 style={styles.sectionTitle}>Piezas más vendidas</h2>
          <div style={styles.carouselContainer}>
            {carouselImages.map((img, index) => (
              <div
                key={index}
                style={{
                  ...styles.carouselSlide,
                  opacity: index === currentIndex ? 1 : 0,
                  zIndex: index === currentIndex ? 1 : 0,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={400}
                  style={styles.carouselImage}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
  },
  banner: {
    width: '100%',
    height: '500px',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderBottom: '4px solid #1E293B',
  },
  carouselSection: {
    padding: '40px 20px',
    textAlign: 'center',
    position: 'relative',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#38BDF8',
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '12px',
  },
  carouselSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease-in-out',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '12px',
  },
};


