'use client';

import { JSX, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { authService } from '../../services/auth.service';

/**
 * Protected route component props
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute Component
 * UI-level route protection (not real authentication)
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = (): void => {
      // TODO: Replace with actual authentication check
      // For now, using mock authentication service
      const authenticated = authService.isAuthenticated();

      if (!authenticated) {
        // Redirect to login page
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <Box className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <CircularProgress size={48} />
      </Box>
    );
  }

  // If not authenticated, don't render children (will redirect)
  if (!isAuthenticated) {
    return (
      <Box className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <CircularProgress size={48} />
      </Box>
    );
  }

  // Render protected content
  return <>{children}</>;
}
