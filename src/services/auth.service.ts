/**
 * Authentication service layer
 * Skeleton ready for backend integration
 */

import { api, handleApiError } from './api';
import {
  User,
  LoginRequest,
  LoginResponse,
  OtpVerificationRequest,
  OtpVerificationResponse,
  ApiResponse,
} from '../types/auth';

/**
 * Mock user data for development
 * TODO: Remove when backend is connected
 */
const MOCK_USER: User = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
  lastLoginAt: Date.now(),
};

/**
 * Authentication service methods
 */
export const authService = {
  /**
   * Send login email with OTP
   * @param email - User email address
   * @returns Promise with login response
   */
  login: async (email: string): Promise<ApiResponse<LoginResponse>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.post<LoginResponse, LoginRequest>('/auth/login', { email });

      // Mock response
      return Promise.resolve({
        success: true,
        data: {
          success: true,
          message: 'OTP sent to your email',
          otpSent: true,
        },
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Verify OTP and authenticate user
   * @param email - User email address
   * @param otp - One-time password
   * @returns Promise with authentication response
   */
  verifyOtp: async (email: string, otp: string): Promise<ApiResponse<OtpVerificationResponse>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.post<OtpVerificationResponse, OtpVerificationRequest>(
      //   '/auth/verify-otp',
      //   { email, otp }
      // );

      // Mock response
      return Promise.resolve({
        success: true,
        data: {
          success: true,
          message: 'Authentication successful',
          token: 'mock-jwt-token-' + Date.now(),
          user: MOCK_USER,
        },
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get current user profile
   * @returns Promise with user data
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.get<User>('/auth/profile');

      // Mock response
      return Promise.resolve({
        success: true,
        data: MOCK_USER,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Logout user and clear session
   * @returns Promise with logout response
   */
  logout: async (): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      // TODO: Replace with actual API call
      // return await api.post<{ success: boolean }>('/auth/logout', {});

      // Clear local storage
      // localStorage.removeItem('auth_token');
      // localStorage.removeItem('user');

      // Mock response
      return Promise.resolve({
        success: true,
        data: { success: true },
        message: 'Logged out successfully',
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Check if user is authenticated
   * @returns boolean indicating auth status
   */
  isAuthenticated: (): boolean => {
    // TODO: Replace with actual token validation
    // const token = localStorage.getItem('auth_token');
    // return !!token;

    // Mock: Always return true for development
    return true;
  },

  /**
   * Get stored auth token
   * @returns Auth token or null
   */
  getToken: (): string | null => {
    // TODO: Replace with actual token retrieval
    // return localStorage.getItem('auth_token');

    // Mock token
    return 'mock-jwt-token';
  },
};
