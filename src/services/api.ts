/**
 * Base API service for HTTP requests
 * This is a skeleton ready for backend integration
 */

import { ApiResponse } from '../types/auth';

/**
 * Base API configuration
 * TODO: Replace with actual backend URL
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Default request headers
 */
const getDefaultHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // TODO: Add authentication token from storage
  // const token = localStorage.getItem('auth_token');
  // if (token) {
  //   headers['Authorization'] = `Bearer ${token}`;
  // }

  return headers;
};

/**
 * HTTP request methods
 */
export const api = {
  /**
   * GET request
   * @param endpoint - API endpoint path
   * @returns Promise with typed response
   */
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    // TODO: Implement actual fetch call
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   method: 'GET',
    //   headers: getDefaultHeaders(),
    // });
    // return response.json();

    return Promise.resolve({
      success: true,
      data: {} as T,
      message: 'Mock GET response',
    });
  },

  /**
   * POST request
   * @param endpoint - API endpoint path
   * @param body - Request payload
   * @returns Promise with typed response
   */
  post: async <T, B = unknown>(endpoint: string, body: B): Promise<ApiResponse<T>> => {
    // TODO: Implement actual fetch call
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   method: 'POST',
    //   headers: getDefaultHeaders(),
    //   body: JSON.stringify(body),
    // });
    // return response.json();

    return Promise.resolve({
      success: true,
      data: {} as T,
      message: 'Mock POST response',
    });
  },

  /**
   * PUT request
   * @param endpoint - API endpoint path
   * @param body - Request payload
   * @returns Promise with typed response
   */
  put: async <T, B = unknown>(endpoint: string, body: B): Promise<ApiResponse<T>> => {
    // TODO: Implement actual fetch call
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   method: 'PUT',
    //   headers: getDefaultHeaders(),
    //   body: JSON.stringify(body),
    // });
    // return response.json();

    return Promise.resolve({
      success: true,
      data: {} as T,
      message: 'Mock PUT response',
    });
  },

  /**
   * DELETE request
   * @param endpoint - API endpoint path
   * @returns Promise with typed response
   */
  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    // TODO: Implement actual fetch call
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   method: 'DELETE',
    //   headers: getDefaultHeaders(),
    // });
    // return response.json();

    return Promise.resolve({
      success: true,
      data: {} as T,
      message: 'Mock DELETE response',
    });
  },
};

/**
 * API error handler
 * @param error - Error object
 * @returns Formatted error response
 */
export const handleApiError = (error: unknown): ApiResponse<never> => {
  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }
  return {
    success: false,
    error: 'An unknown error occurred',
  };
};
