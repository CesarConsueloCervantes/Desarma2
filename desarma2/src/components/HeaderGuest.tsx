
import Link from 'next/link';
import Image from 'next/image';
import { FaHome } from 'react-icons/fa';

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    background: 'linear-gradient(to right, #0F172A, #1E293B)',
    color: '#F1F5F9',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'clamp(12px, 4vw, 24px)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    fontFamily: 'Arial, sans-serif',
    gap: 'clamp(12px, 3vw, 24px)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 3vw, 20px)',
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    fontWeight: 500,
    justifyContent: 'center',
    flexGrow: 1,
  },
  link: {
    color: '#F1F5F9',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap',
  },
  icon: {
    fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
    color: '#38BDF8',
    cursor: 'pointer',
  },
};

export default function HeaderGuest() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Image
          src="/desarma2pngvblanco.png"
          alt="Desarma2 Logo"
          width={180}
          height={50}
        />
      </div>

      <nav style={styles.nav}>
        <Link href="/" style={styles.link}>Inicio</Link>
        <Link href="/products" style={styles.link}>Productos</Link>
        <Link href="/acerca" style={styles.link}>Acerca de Nosotros</Link>
        <Link href="/contact" style={styles.link}>Contacto</Link>
      </nav>

      <nav>
        <Link href="/">
          <FaHome style={styles.icon} />
        </Link>
      </nav>
    </header>
  );
}

