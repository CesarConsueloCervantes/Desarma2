// components/HeaderAdmin.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

export default function HeaderAdmin() {
  return (
    <header className="header-admin">
      <div className="header-left">
        <FaBars className="icon-menu" />
        <Image
          src="/desarma2pngvblanco.png"
          alt="Desarma2"
          width={140}
          height={40}
        />
        <Link href="/admin" className="admin-button">
          Admin Dashboard
        </Link>
      </div>

      <Link href="/logout" className="logout-button">
        Cerrar Sesión <FaSignOutAlt style={{ marginLeft: '8px' }} />
      </Link>
    </header>
  );
}
