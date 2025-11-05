import { LoginForm } from "../../../features/login/ui/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleLoginError = (error: string) => {
    console.error("Login error:", error);
  };

  return (
    <main
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      aria-labelledby="login-heading"
    >
      <LoginForm onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </main>
  );
}
