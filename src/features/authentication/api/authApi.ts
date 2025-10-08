import type { LoginCredentials, AuthUser } from '../model/types';

// Simulate API call
export const loginUser = async (credentials: LoginCredentials): Promise<AuthUser> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login attempt:", credentials);
  
  return {
    id: '1',
    email: credentials.email,
    name: 'John Doe'
  };
};

export const logoutUser = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("User logged out");
};