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
    padding: '0 clamp(16px, 4vw, 40px)', // responsive lateral padding
  },
  main: {
    flexGrow: 1,
  },
  banner: {
    width: '100%',
    height: 'clamp(240px, 40vw, 500px)', // responsive height
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderBottom: '4px solid #1E293B',
  },
  carouselSection: {
    padding: 'clamp(20px, 5vw, 40px) 0',
    textAlign: 'center',
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 'clamp(20px, 4vw, 32px)', // responsive font size
    marginBottom: '20px',
    color: '#38BDF8',
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: 'clamp(200px, 40vw, 400px)', // responsive height
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



