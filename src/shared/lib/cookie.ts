import Cookies from "js-cookie";
import { AUTH_STORAGE_KEYS } from '../constants/auth';

export const cookie = Cookies;

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const setCookie = (key: string, value: string, days = 1) => {
  Cookies.set(key, value, { 
    expires: days,
    secure: false,
    sameSite: 'lax'
  });
};

export const deleteCookie = (key: string) => {
  Cookies.remove(key);
};

// Token specific helpers
export function getAccessToken(): string | null {
  return getCookie(AUTH_STORAGE_KEYS.ACCESS_TOKEN) || null;
}

export function getRefreshToken(): string | null {
  return getCookie(AUTH_STORAGE_KEYS.REFRESH_TOKEN) || null;
}

export function setTokens(accessToken: string, refreshToken?: string): void {
  setCookie(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken, 1); // 1 day
  if (refreshToken) {
    setCookie(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken, 7); // 7 days
  }
}

export function clearTokens(): void {
  deleteCookie(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  deleteCookie(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
}
