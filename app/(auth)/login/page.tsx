'use client';

import { useState, FormEvent, JSX } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

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

  const handleEmailChange = (value: string): void => {
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (validateEmail(email)) {
      // TODO: Call auth service when backend is integrated
      console.log('Login attempt with email:', email);
      
      // Navigate to OTP verification screen
      router.push(`/otp?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <Paper 
        elevation={3}
        className="w-full max-w-md p-8 rounded-lg"
      >
        <Box className="mb-8 text-center">
          <Typography 
            variant="h4" 
            component="h1" 
            className="font-bold text-gray-800 mb-2"
          >
            Smart Interview Trainer
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600"
          >
            Sign in to start your interview practice
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            className="bg-white"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!email.trim()}
            className="py-3 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium"
          >
            Continue
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography 
            variant="body2" 
            className="text-gray-500"
          >
            First time here? You&apos;ll be registered automatically
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
