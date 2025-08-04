
// src/store/provider.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from './index'; // Ajustado al path relativo correcto dentro de src/store

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
