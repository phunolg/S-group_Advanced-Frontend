import { useState } from 'react';
import { apiFetch } from '../../shared/api/http';
import { Button } from '../../shared/ui';

type MeResponse = {
  id: string;
  email: string;
  name: string;
  roles: string[];
};

export default function DashboardPage() {
  const [data, setData] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getMe = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<MeResponse>('/users/me');
      setData(res);
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-600">You are logged in.</p>

      <Button onClick={getMe} disabled={loading}>
        {loading ? 'Loading...' : 'Get User Detail'}
      </Button>

      {error && (
        <div className="text-red-600 text-sm">Error: {error}</div>
      )}

      {data && (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
{JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
