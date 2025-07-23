// components/HeaderGuest.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FaHome } from 'react-icons/fa';

export default function HeaderGuest() {
  return (
    <header className="header-guest">
      <div className="header-logo">
        <Image
          src="/desarma2pngvblanco.png"
          alt="Desarma2 Logo"
          width={180}
          height={50}
        />
      </div>
      <nav className="header-nav">
        <Link href="/">
          <FaHome className="header-icon" />
        </Link>
      </nav>
    </header>
  );
}
