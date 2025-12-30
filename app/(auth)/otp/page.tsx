'use client';

import { useState, useEffect, useRef, FormEvent, JSX, Suspense } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * OTP countdown duration in seconds
 */
const OTP_COUNTDOWN_DURATION = 60;

/**
 * OTP Verification Page Content Component
 * Separated to allow Suspense wrapping
 */
function OTPVerificationContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(OTP_COUNTDOWN_DURATION);
  const [canResend, setCanResend] = useState<boolean>(false);
  
  // OTP input refs for auto-focus management
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /**
   * Countdown timer effect
   */
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  /**
   * Format countdown display
   */
  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Validate OTP format
   */
  const validateOTP = (value: string): boolean => {
    if (!value.trim()) {
      setOtpError('OTP is required');
      return false;
    }

    if (!/^\d{4,6}$/.test(value)) {
      setOtpError('Please enter a valid 4-6 digit OTP');
      return false;
    }

    setOtpError('');
    return true;
  };

  /**
   * Handle OTP input change
   */
  const handleOTPChange = (value: string): void => {
    // Only allow digits
    const sanitized = value.replace(/\D/g, '').slice(0, 6);
    setOtp(sanitized);
    
    if (otpError && sanitized) {
      validateOTP(sanitized);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateOTP(otp)) {
      // TODO: Call backend API to verify OTP when integrated
      console.log('Verifying OTP:', otp, 'for email:', email);
      
      // Navigate to dashboard (placeholder route)
      router.push('/dashboard');
    }
  };

  /**
   * Handle resend OTP
   */
  const handleResendOTP = (): void => {
    if (!canResend) return;

    // TODO: Call backend API to resend OTP when integrated
    console.log('Resending OTP to:', email);

    // Reset countdown
    setCountdown(OTP_COUNTDOWN_DURATION);
    setCanResend(false);
    setOtp('');
    setOtpError('');
  };

  /**
   * Handle back navigation
   */
  const handleBack = (): void => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <Paper elevation={3} className="w-full max-w-md p-8 rounded-lg">
        <Box className="mb-8 text-center">
          <Typography variant="h4" component="h1" className="font-bold text-gray-800 mb-2">
            Verify Your Email
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-2">
            Enter the verification code sent to
          </Typography>
          <Typography variant="body2" className="font-semibold text-blue-600">
            {email || 'your email'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <Box>
            <TextField
              fullWidth
              id="otp"
              label="Enter OTP"
              type="text"
              variant="outlined"
              value={otp}
              onChange={(e) => handleOTPChange(e.target.value)}
              error={Boolean(otpError)}
              helperText={otpError || 'Enter the 4-6 digit code'}
              autoComplete="one-time-code"
              autoFocus
              required
              inputProps={{
                maxLength: 6,
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              className="bg-white"
            />
          </Box>

          {/* Countdown Timer */}
          <Box className="text-center">
            {!canResend ? (
              <Typography variant="body2" className="text-gray-600">
                Resend code in{' '}
                <span className="font-semibold text-blue-600">{formatCountdown(countdown)}</span>
              </Typography>
            ) : (
              <Button
                variant="text"
                onClick={handleResendOTP}
                className="normal-case text-base text-blue-600 hover:text-blue-700"
              >
                Resend OTP
              </Button>
            )}
          </Box>

          {/* Verify Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={otp.length < 4}
            className="py-3 bg-blue-600 hover:bg-blue-700 normal-case text-base font-medium"
          >
            Verify
          </Button>

          {/* Back Button */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleBack}
            className="normal-case text-base"
          >
            Back to Login
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography variant="body2" className="text-gray-500">
            Didn&apos;t receive the code? Check your spam folder
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}

/**
 * OTP Verification Page Component (Wrapped with Suspense)
 * UI-only implementation for OTP verification flow
 */
export default function OTPVerificationPage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <CircularProgress size={48} />
        </div>
      }
    >
      <OTPVerificationContent />
    </Suspense>
  );
}
