'use client';

import { useState, FormEvent, JSX } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateEmail(email)) {
      setIsLoading(true);
      // Mock sending OTP
      setTimeout(() => {
        setIsLoading(false);
        router.push(`/forgot-password/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper elevation={3} className="w-full max-w-md p-10 rounded-xl shadow-2xl border border-gray-100">
        <Box className="mb-10 text-center">
          <Typography variant="h4" component="h1" className="font-bold text-gray-900 mb-3 tracking-tight">
            Forgot Password
          </Typography>
          <Typography variant="body1" className="text-gray-600 leading-relaxed">
            Enter your email to receive a password reset OTP
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            error={Boolean(emailError)}
            helperText={emailError}
            autoComplete="email"
            autoFocus
            required
            className="bg-white mb-6"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading || !email.trim()}
            className="py-3.5 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>

        <Box className="mt-8 text-center">
          <Typography variant="body2" className="text-gray-500">
            Remember your password?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-800 font-semibold no-underline transition-colors duration-200"
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
