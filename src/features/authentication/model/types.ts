export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}