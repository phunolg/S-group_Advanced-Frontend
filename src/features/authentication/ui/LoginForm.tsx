import { useState, useRef } from "react";
import { Button, Input, Label } from "../../../shared/ui";
import { validateLoginForm, isValidationErrorsEmpty } from "../model/validation";
import { loginUser } from "../api/authApi";
import type { LoginCredentials, ValidationErrors } from "../model/types";

export interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateLoginForm(credentials);
    setErrors(validationErrors);

    if (!isValidationErrorsEmpty(validationErrors)) {
      if (validationErrors.email) emailRef.current?.focus();
      else if (validationErrors.password) passwordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUser(credentials);
      console.log("Login successful:", user);
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      console.error("Login failed:", err);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Login to your account
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your email below to login to your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email field */}
        <div>
          <Label htmlFor="email" className="block mb-1">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            ref={emailRef}
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
            value={credentials.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={handleInputChange("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            ref={passwordRef}
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            onChange={handleInputChange("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-red-500 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-xs text-gray-400 uppercase">
          or continue with
        </span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <Button variant="outline" className="w-full">
        Login with Google
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}