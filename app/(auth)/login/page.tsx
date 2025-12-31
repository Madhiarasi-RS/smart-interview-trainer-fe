'use client';

import { useState, FormEvent, JSX } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

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

  const validatePassword = (value: string): boolean => {
    if (!value.trim()) {
      setPasswordError('Password is required');
      return false;
    }
    
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (value: string): void => {
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
    if (passwordError) {
      validatePassword(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      // Mock login - set authenticated state
      login(email);
      
      // Navigate to dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper 
        elevation={3}
        className="w-full max-w-md p-10 rounded-xl shadow-2xl border border-gray-100"
      >
        <Box className="mb-10 text-center">
          <Typography 
            variant="h4" 
            component="h1" 
            className="font-bold text-gray-900 mb-3 tracking-tight"
          >
            Smart Interview Trainer
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600 leading-relaxed"
          >
            Sign in to start your interview practice
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
            onChange={(e) => handleEmailChange(e.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
            autoComplete="email"
            autoFocus
            required
            className="bg-white mb-6"
          />

          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            autoComplete="current-password"
            required
            className="bg-white mb-4"
          />

          <Box className="text-right mb-6">
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => router.push('/forgot-password')}
              className="text-blue-600 hover:text-blue-800 no-underline transition-colors duration-200 font-medium"
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!email.trim() || !password.trim()}
            className="py-3.5 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Login
          </Button>
        </form>

        <Box className="mt-8 text-center">
          <Typography 
            variant="body2" 
            className="text-gray-500"
          >
            Don&apos;t have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => router.push('/register')}
              className="text-blue-600 hover:text-blue-800 font-semibold no-underline transition-colors duration-200"
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
