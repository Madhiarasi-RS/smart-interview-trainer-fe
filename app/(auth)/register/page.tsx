'use client';

import { useState, FormEvent, JSX } from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const { login } = useAuth();
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (value.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    setNameError('');
    return true;
  };

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

  const validateConfirmPassword = (value: string): boolean => {
    if (!value.trim()) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateOtp = (value: string): boolean => {
    if (!value.trim()) {
      setOtpError('OTP is required');
      return false;
    }
    if (!/^\d{4,6}$/.test(value)) {
      setOtpError('Please enter a valid OTP');
      return false;
    }
    setOtpError('');
    return true;
  };

  const handleSendOtp = (): void => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      setIsLoading(true);
      // Mock sending OTP
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateOtp(otp)) {
      // Mock registration - set authenticated state
      login(email, name);
      
      // Navigate to dashboard
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper elevation={3} className="w-full max-w-md p-10 rounded-xl shadow-2xl border border-gray-100">
        <Box className="mb-10 text-center">
          <Typography variant="h4" component="h1" className="font-bold text-gray-900 mb-3 tracking-tight">
            Create Your Account
          </Typography>
          <Typography variant="body1" className="text-gray-600 leading-relaxed">
            Start your interview preparation journey
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            label="Full Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) validateName(e.target.value);
            }}
            error={Boolean(nameError)}
            helperText={nameError}
            autoComplete="name"
            autoFocus
            required
            disabled={otpSent}
            className="bg-white mb-6"
          />

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
            required
            disabled={otpSent}
            className="bg-white mb-6"
          />

          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
              if (confirmPassword) validateConfirmPassword(confirmPassword);
            }}
            error={Boolean(passwordError)}
            helperText={passwordError}
            autoComplete="new-password"
            required
            disabled={otpSent}
            className="bg-white"
          />

          <TextField
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
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
            disabled={otpSent}
            className="bg-white"
          />

          {!otpSent ? (
            <Button
              type="button"
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSendOtp}
              disabled={isLoading || !name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()}
              className="py-3 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium mt-2"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          ) : (
            <>
              <Box className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2 mb-6">
                <Typography variant="body2" className="text-green-800">
                  OTP sent to {email}. Please check your email.
                </Typography>
              </Box>

              <TextField
                fullWidth
                id="otp"
                label="Enter OTP"
                type="text"
                variant="outlined"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                  if (otpError) validateOtp(value);
                }}
                error={Boolean(otpError)}
                helperText={otpError}
                placeholder="123456"
                inputProps={{ maxLength: 6 }}
                required
                className="bg-white mb-6"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={otp.length < 4}
                className="py-3 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium"
              >
                Register
              </Button>

              <Button
                type="button"
                variant="text"
                fullWidth
                onClick={() => setOtpSent(false)}
                className="normal-case text-gray-600"
              >
                Change Email
              </Button>
            </>
          )}
        </form>

        <Box className="mt-6 text-center">
          <Typography variant="body2" className="text-gray-500">
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-800 font-semibold no-underline"
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
