import type { ValidationErrors, LoginCredentials } from './types';

export const validateLoginForm = (credentials: LoginCredentials): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!credentials.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!credentials.password) {
    errors.password = "Password is required";
  } else if (credentials.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  
  return errors;
};

export const isValidationErrorsEmpty = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};