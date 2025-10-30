import { type ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { apiFetch } from '../api/http';
import { clearTokens, getAccessToken, getRefreshToken, isJwtExpired, setTokens } from './token';

type Props = {
  children: ReactNode;
};

type RefreshResponse = {
  access_token: string;
  expires_in: number;
};

export function RequireAuth({ children }: Props) {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      const accessExpired = !access || isJwtExpired(access);
      const refreshExpired = !refresh || isJwtExpired(refresh);

      if (!accessExpired) {
        if (!cancelled) {
          setAuthorized(true);
          setChecking(false);
        }
        return;
      }

      // Try to refresh if access expired but refresh is still valid
      if (accessExpired && !refreshExpired && refresh) {
        try {
          const resp = await apiFetch<RefreshResponse>('/auth/refresh', {
            method: 'POST',
            body: { refresh_token: refresh },
          });
          setTokens(resp.access_token);
          if (!cancelled) {
            setAuthorized(true);
            setChecking(false);
          }
          return;
        } catch {
          // fall through to logout
        }
      }

      // Both tokens expired or refresh failed -> force login
      clearTokens();
      if (!cancelled) {
        setAuthorized(false);
        setChecking(false);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>
    );
  }
  if (!authorized) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
