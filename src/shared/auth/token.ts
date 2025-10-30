// Simple token utilities: store/retrieve tokens and check expiry

export function setTokens(access: string, refresh?: string) {
  try {
    localStorage.setItem('access_token', access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
  } catch {}
}

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem('access_token');
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem('refresh_token');
  } catch {
    return null;
  }
}

export function clearTokens() {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch {}
}

export function isJwtExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload || typeof payload.exp !== 'number') return false; // if no exp, assume not expired
    const nowSec = Math.floor(Date.now() / 1000);
    return payload.exp <= nowSec;
  } catch {
    // If cannot parse, be conservative and treat as expired
    return true;
  }
}
