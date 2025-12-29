/**
 * User profile data
 */
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
  lastLoginAt: number;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
}

/**
 * Login response
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  otpSent: boolean;
}

/**
 * OTP verification request payload
 */
export interface OtpVerificationRequest {
  email: string;
  otp: string;
}

/**
 * OTP verification response
 */
export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
