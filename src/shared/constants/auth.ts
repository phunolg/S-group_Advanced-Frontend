export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;
