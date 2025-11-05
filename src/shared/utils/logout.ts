import { clearTokens } from '../lib/cookie';

export async function logout(): Promise<void> {
  clearTokens();
  // Optional: call backend logout endpoint if needed
  // await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/login';
}
