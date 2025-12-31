'use client';

import { useState, FormEvent, JSX, Suspense } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyOtpContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateOtp(otp)) {
      setIsLoading(true);
      // Mock OTP verification
      setTimeout(() => {
        setIsLoading(false);
        router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}`);
      }, 1000);
    }
  };

  const handleResend = (): void => {
    setOtp('');
    setOtpError('');
    // Mock resending OTP
    console.log('Resending OTP to:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper elevation={3} className="w-full max-w-md p-10 rounded-xl shadow-2xl border border-gray-100">
        <Box className="mb-10 text-center">
          <Typography variant="h4" component="h1" className="font-bold text-gray-900 mb-3 tracking-tight">
            Verify OTP
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-3 leading-relaxed">
            Enter the OTP sent to
          </Typography>
          <Typography variant="body2" className="text-blue-600 font-semibold text-base">
            {email}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
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
            autoFocus
            required
            className="bg-white mb-6"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading || otp.length < 4}
            className="py-3.5 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium shadow-md hover:shadow-lg transition-all duration-200 mb-4"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <Box className="text-center">
            <Button
              type="button"
              variant="text"
              onClick={handleResend}
              className="normal-case text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Resend OTP
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default function VerifyOtpPage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <CircularProgress size={48} />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
