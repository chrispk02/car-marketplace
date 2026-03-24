import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants';

/**
 * Combine class names with Tailwind CSS merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Create and configure Axios instance for API calls
 */
export const createApiClient = (): AxiosInstance => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

  const client = axios.create({
    baseURL: apiUrl,
    timeout: timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add token to requests
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle errors
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );

  return client;
};

/**
 * Format currency to display format
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};

/**
 * Debounce function for search and input handlers
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic check)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Get user token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Set user token in localStorage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Clear auth data from localStorage
 */
export const clearAuthData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
  localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
};

