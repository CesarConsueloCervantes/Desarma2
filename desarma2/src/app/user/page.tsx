// app/user/page.tsx
'use client';

import Link from 'next/link';

export default function UserPage() {
  return (
    <div className="user-container">
      <h1 className="user-title">Página de Usuario</h1>
      <p className="user-text">Bienvenido al perfil del usuario.</p>

      <Link href="/login">
        <button className="btn-primary">Iniciar sesión</button>
      </Link>
    </div>
  );
}
