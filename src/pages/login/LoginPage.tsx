import { LoginForm } from "../../features/authentication";

export default function LoginPage() {
  const handleLoginSuccess = () => {
    console.log("Login successful - redirect to dashboard");
    // TODO: Add navigation logic here
  };

  const handleLoginError = (error: string) => {
    console.error("Login error:", error);
    // TODO: Add error handling/display logic here
  };

  return (
    <main 
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4" 
      aria-labelledby="login-heading"
    >
      <LoginForm 
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </main>
  );
}