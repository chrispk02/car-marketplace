// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// App Configuration
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Car Marketplace';
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

// UI Constants
export const DEBOUNCE_DELAY = 300;
export const PAGINATION_LIMIT = 20;

// Car Body Types
export const BODY_TYPES = [
  { label: 'SUV', value: 'SUV' },
  { label: 'Sedan', value: 'SEDAN' },
  { label: 'Pickup', value: 'PICKUP' },
  { label: 'Coupe', value: 'COUPE' },
  { label: 'Hatchback', value: 'HATCHBACK' },
  { label: 'Convertible', value: 'CONVERTIBLE' },
];

// Popular Car Brands
export const CAR_BRANDS = [
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Tesla',
  'Aston Martin',
  'Rolls-Royce',
  'Bentley',
];

// User Roles
export const USER_ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
};

// Seller Types
export const SELLER_TYPES = {
  NEW: 'NEW',
  USED: 'USED',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
  },
  LISTINGS: {
    GET_ALL: '/listings',
    GET_ONE: (id: string) => `/listings/${id}`,
    CREATE: '/listings',
    UPDATE: (id: string) => `/listings/${id}`,
    DELETE: (id: string) => `/listings/${id}`,
  },
  LEADS: {
    GET_ALL: '/leads',
    CREATE: '/leads',
    UPDATE: (id: string) => `/leads/${id}`,
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_EMAIL: 'user_email',
  USER_ROLE: 'user_role',
};
