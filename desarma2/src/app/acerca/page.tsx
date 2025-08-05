'use client';

import HeaderGuest from '@/components/HeaderGuest';
import Image from 'next/image';
import type { CSSProperties } from 'react';

export default function AboutPage() {
  return (
    <div>
      <HeaderGuest />

      <main style={styles.container}>
        <section style={styles.hero}>
          <h4 style={styles.sectionLabel}>SOBRE NOSOTROS</h4>
          <h1 style={styles.title}>
            Descubre la mejor opción para comprar piezas de celular con nosotros
          </h1>
        </section>

        <section style={styles.cardsContainer}>
          <div style={styles.card}>
            <Image src="/pieza1.png" alt="Batería" width={240} height={160} />
            <h3 style={styles.cardTitle}>Baterías de alta calidad</h3>
            <p style={styles.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipscing elit.
            </p>
            <a href="#" style={styles.link}>Explorar más →</a>
          </div>

          <div style={styles.card}>
            <Image src="/pieza2.png" alt="Pantalla" width={240} height={160} />
            <h3 style={styles.cardTitle}>Pantallas de reemplazo</h3>
            <p style={styles.cardText}>
              Las mejores pantallas de reemplazo y protección.
            </p>
            <a href="#" style={styles.link}>Conocer más →</a>
          </div>

          <div style={styles.card}>
            <Image src="/placa.png" alt="Reparaciones" width={240} height={160} />
            <h3 style={styles.cardTitle}>Reparaciones especializadas</h3>
            <p style={styles.cardText}>
              Expertos listos para ayudarte con tu dispositivo.
            </p>
            <a href="#" style={styles.link}>Descubrir más →</a>
          </div>
        </section>

        <section style={styles.stats}>
          <div style={styles.statBox}>
            <h2 style={styles.statNumber}>494</h2>
            <p style={styles.statText}>Clientes felices</p>
          </div>
          <div style={styles.statBox}>
            <h2 style={styles.statNumber}>1239</h2>
            <p style={styles.statText}>Piezas en inventario</p>
          </div>
          <div style={styles.statBox}>
            <h2 style={styles.statNumber}>1453</h2>
            <p style={styles.statText}>Ventas concretadas</p>
          </div>
          <div style={styles.statBox}>
            <h2 style={styles.statNumber}>32</h2>
            <p style={styles.statText}>Técnicos certificados</p>
          </div>
        </section>
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
  hero: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  sectionLabel: {
    color: '#475B85',
    fontSize: '14px',
    letterSpacing: '1px',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '28px',
    color: '#222',
    marginTop: '12px',
  },
  cardsContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '60px',
  },
  card: {
    flex: '1 1 280px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '16px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '12px',
  },
  cardText: {
    fontSize: '14px',
    color: '#666',
    marginTop: '8px',
  },
  link: {
    marginTop: '10px',
    display: 'inline-block',
    fontSize: '14px',
    color: '#475B85',
    textDecoration: 'none',
    fontWeight: 600,
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  statBox: {
    flex: '1 1 180px',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#475B85',
  },
  statText: {
    fontSize: '14px',
    color: '#555',
  },
};
