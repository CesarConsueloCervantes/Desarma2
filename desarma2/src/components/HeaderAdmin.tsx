// components/HeaderAdmin.tsx
'use client';
import { logout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

export default function HeaderAdmin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login'); // Redirige al login o página principal
  };

  return (
    <header className="header-admin">
      <div className="header-left">
        
        <Image
          src="/desarma2pngvblanco.png"
          alt="Desarma2"
          width={140}
          height={40}
        />
        <a href="/admin/panel" className="admin-button">
          Admin Dashboard
        </a>
      </div>

      <button style={styles.primaryButton} onClick={handleLogout}>
        Cerrar sesión <FaSignOutAlt style={{ marginLeft: '8px' }} />
      </button>
    </header>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  primaryButton: {
    backgroundColor: '#007aff',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
  },
};