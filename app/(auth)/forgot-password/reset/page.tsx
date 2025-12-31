'use client';

import { useState, FormEvent, JSX, Suspense } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateNewPassword = (value: string): boolean => {
    if (!value.trim()) {
      setNewPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setNewPasswordError('Password must be at least 6 characters');
      return false;
    }
    setNewPasswordError('');
    return true;
  };

  const validateConfirmPassword = (value: string): boolean => {
    if (!value.trim()) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    }
    if (value !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const isNewPasswordValid = validateNewPassword(newPassword);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (isNewPasswordValid && isConfirmPasswordValid) {
      setIsLoading(true);
      // Mock password reset
      setTimeout(() => {
        setIsLoading(false);
        router.push('/login');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper elevation={3} className="w-full max-w-md p-10 rounded-xl shadow-2xl border border-gray-100">
        <Box className="mb-10 text-center">
          <Typography variant="h4" component="h1" className="font-bold text-gray-900 mb-3 tracking-tight">
            Reset Password
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-3 leading-relaxed">
            Create a new password for
          </Typography>
          <Typography variant="body2" className="text-blue-600 font-semibold text-base">
            {email}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="newPassword"
            label="New Password"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (newPasswordError) validateNewPassword(e.target.value);
              if (confirmPassword) validateConfirmPassword(confirmPassword);
            }}
            error={Boolean(newPasswordError)}
            helperText={newPasswordError}
            autoComplete="new-password"
            autoFocus
            required
            className="bg-white mb-6"
          />

          <TextField
            fullWidth
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) validateConfirmPassword(e.target.value);
            }}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            autoComplete="new-password"
            required
            className="bg-white mb-6"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading || !newPassword.trim() || !confirmPassword.trim()}
            className="py-3.5 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default function ResetPasswordPage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <CircularProgress size={48} />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
