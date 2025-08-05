// src/store/provider.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { createContext, useContext, useState, ReactNode } from 'react';

// 🛒 Tipo de item en el carrito
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// 🧠 Definición del contexto del carrito
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// 🎯 Contexto + hook para acceso global
const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro del Providers');
  return context;
};

// 🚀 Provider único que conserva Redux y añade carrito
export function Providers({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
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

  return (
    <Provider store={store}>
      <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
    </Provider>
  );
}