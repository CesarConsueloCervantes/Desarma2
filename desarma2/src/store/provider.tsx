'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario } from '@/types/Usuario'; 
 // ✅ Importa el tipo centralizado

// 🛒 Tipo de item en el carrito
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// 🧠 Definición del contexto del carrito
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// 🔐 Definición del contexto de usuario
interface AuthContextType {
  usuario: Usuario | null;
  setUsuario: (user: Usuario | null) => void;
}

// 🎯 Contextos + hooks para acceso global
const CartContext = createContext<CartContextType | null>(null);
const AuthContext = createContext<AuthContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro del Providers');
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro del Providers');
  return context;
};

// 🚀 Provider único que conserva Redux y añade carrito + usuario
export function Providers({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  const authValue: AuthContextType = {
    usuario,
    setUsuario,
  };

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={cartValue}>
          {children}
        </CartContext.Provider>
      </AuthContext.Provider>
    </Provider>
  );
}