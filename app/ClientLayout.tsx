'use client';

import { AuthProvider } from '../src/context/AuthContext';
import { ReactNode, JSX } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }): JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}
