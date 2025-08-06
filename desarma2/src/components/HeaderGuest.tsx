
import Link from 'next/link';
import Image from 'next/image';
import { FaHome } from 'react-icons/fa';

const styles = {
  header: {
    background: 'linear-gradient(to right, #0F172A, #1E293B)',
    color: '#F1F5F9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    fontFamily: 'Arial, sans-serif',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    fontSize: '0.95rem',
    fontWeight: 500,
  },
  link: {
    color: '#F1F5F9',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  icon: {
    fontSize: '1.4rem',
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

