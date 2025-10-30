import type { LoginCredentials, AuthUser } from '../model/types';
import { apiFetch } from '../../../shared/api/http';

// Shape of the backend's login response (see productive-coding/src/auth/dto/login-response.dto.ts)
interface BackendLoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    username: string;
    fullName: string;
  };
  expires_in: number;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthUser> => {
  const resp = await apiFetch<BackendLoginResponse>('/auth/login', {
    method: 'POST',
    body: credentials,
  });

  // Persist tokens for later API calls if needed
  try {
    localStorage.setItem('access_token', resp.access_token);
    localStorage.setItem('refresh_token', resp.refresh_token);
  } catch {
    // ignore storage errors (private mode, etc.)
  }

  // Map backend user to our simplified AuthUser
  return {
    id: resp.user.id,
    email: resp.user.email,
    name: resp.user.fullName || resp.user.username || resp.user.email,
  };
};

export const logoutUser = async (): Promise<void> => {
  // For now, just clear tokens locally. Hook server logout here if needed.
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch {}
};