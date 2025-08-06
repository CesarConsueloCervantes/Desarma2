
'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.container}>
        <section style={styles.hero}>
          <h4 style={styles.sectionLabel}>SOBRE NOSOTROS</h4>
          <h1 style={styles.title}>
            Más que repuestos, construimos confianza.
          </h1>
          <p style={styles.subtitle}>
            En nuestro mundo, cada pieza cuenta. No vendemos productos: ofrecemos soluciones que restauran, mejoran y prolongan la vida de tus dispositivos. Con atención al detalle, calidad garantizada y un equipo que sabe lo que hace, somos el aliado que tu celular merece.
          </p>
        </section>

        <section style={styles.cardsContainer}>
          <div style={styles.card}>
            <Image src="/pieza1.png" alt="Batería" width={240} height={160} />
            <h3 style={styles.cardTitle}>Baterías de alta calidad</h3>
            <p style={styles.cardText}>
              Energía confiable para que tu equipo nunca te deje tirado.
            </p>
            <a href="#" style={styles.link}>Explorar más →</a>
          </div>

          <div style={styles.card}>
            <Image src="/pieza2.png" alt="Pantalla" width={240} height={160} />
            <h3 style={styles.cardTitle}>Pantallas de reemplazo</h3>
            <p style={styles.cardText}>
              Claridad, resistencia y compatibilidad garantizada.
            </p>
            <a href="#" style={styles.link}>Conocer más →</a>
          </div>

          <div style={styles.card}>
            <Image src="/placa.png" alt="Reparaciones" width={240} height={160} />
            <h3 style={styles.cardTitle}>Reparaciones especializadas</h3>
            <p style={styles.cardText}>
              Técnicos certificados listos para revivir tu dispositivo.
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

      <Footer />
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  page: {
    backgroundColor: '#0F172A',
    minHeight: '100vh',
    padding: '0 16px',
    fontFamily: 'Arial, sans-serif',
    color: '#F8FAFC',
  },
  container: {
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '20px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  sectionLabel: {
    color: '#38BDF8',
    fontSize: '14px',
    letterSpacing: '1px',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '32px',
    color: '#F8FAFC',
    marginTop: '12px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '16px',
    color: '#CBD5E1',
    marginTop: '16px',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.6',
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
    border: '1px solid #334155',
    borderRadius: '10px',
    padding: '16px',
    backgroundColor: '#1E293B',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '12px',
    color: '#38BDF8',
  },
  cardText: {
    fontSize: '14px',
    color: '#CBD5E1',
    marginTop: '8px',
  },
  link: {
    marginTop: '10px',
    display: 'inline-block',
    fontSize: '14px',
    color: '#38BDF8',
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
    color: '#38BDF8',
  },
  statText: {
    fontSize: '14px',
    color: '#CBD5E1',
  },
};

