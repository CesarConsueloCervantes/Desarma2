'use client';

import React from 'react';
import { HiOutlineUser, HiOutlineShoppingCart } from 'react-icons/hi';
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const styles = {
  header: {
    backgroundColor: '#1E293B',
    color: '#F1F5F9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
  },
  left: {
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
  icons: {
    display: 'flex',
    gap: '16px',
    fontSize: '1.4rem',
    color: '#38BDF8',
    alignItems: 'center',
  },
};

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <Image
          src="/desarma2pngvblanco.png"
          alt="Desarma2 Logo"
          width={150}
          height={40}
        />
      </div>

      <nav style={styles.nav}>
        <Link href="/" style={styles.link}>Inicio</Link>
        <Link href="/products" style={styles.link}>Productos</Link>
        <Link href="/acerca" style={styles.link}>Acerca de Nosotros</Link>
        <Link href="/contact" style={styles.link}>Contacto</Link>
      </nav>

      <div style={styles.icons}>
        <Link href="/"><FaHome /></Link>
        <Link href="/user"><HiOutlineUser /></Link>
        <Link href="/car"><HiOutlineShoppingCart /></Link>
      </div>
    </header>
  );
};

export default Header;

