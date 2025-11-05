import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { submit } from '../model/loginWithEmail';
import { Button } from '../../../shared/ui/button/button';
import { Input } from '../../../shared/ui/input';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submit(email, password, navigate);
      onSuccess?.();
    } catch (err: any) {
      const message = err?.message || 'Đăng nhập thất bại';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h1 id="login-heading" className="text-2xl font-bold text-center mb-6">
        Đăng nhập
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
            disabled={loading}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Mật khẩu
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            required
            disabled={loading}
            autoComplete="off"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Tài khoản dev: demo@example.com / secret123
      </p>
    </div>
  );
}
