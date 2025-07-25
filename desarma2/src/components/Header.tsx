'use client';

import React from 'react';
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Image
          src="/desarma2pngvblanco.png"
          alt="Desarma2 Logo"
          width={150}
          height={40}
        />
      </div>

      <nav className="header-nav">
        <Link href="/">Inicio</Link>
        <Link  href="/products">Productos</Link>
        <Link href="/acerca">Acerca de Nosotros</Link>
        <Link href="/contact">Contacto</Link>
      </nav>

      <div className="header-icons">
        <Link href="/user"><FaUser /></Link>
        <FaHeart />
        <FaShoppingCart />
      </div>
    </header>
  );
};

export default Header;

