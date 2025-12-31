'use client';

import { createContext, useContext, useState, useEffect, ReactNode, JSX } from 'react';

/**
 * Mock authentication state interface
 */
interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

/**
 * Auth context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth provider component
 */
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('mockAuth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(authData.isAuthenticated);
      setUser(authData.user);
    }
  }, []);

  const login = (email: string, name?: string): void => {
    const userData = { email, name: name || email.split('@')[0] };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('mockAuth', JSON.stringify({ isAuthenticated: true, user: userData }));
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('mockAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
