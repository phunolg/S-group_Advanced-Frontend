import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from './lib/cookie';
import { AUTH_STORAGE_KEYS } from './constants/auth';

type Props = {
  children: ReactNode;
};

function isJwtExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload || typeof payload.exp !== 'number') return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return payload.exp <= nowSec;
  } catch {
    return true;
  }
}

export function ProtectedRoute({ children }: Props) {
  const location = useLocation();
  const access = getAccessToken();
  const refresh = localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

  const accessExpired = !access || isJwtExpired(access);
  const refreshExpired = !refresh || isJwtExpired(refresh);

  // access token còn hạn
  if (!accessExpired) {
    return <>{children}</>;
  }

  // access token hết hạn, refresh token còn hạn
  if (accessExpired && !refreshExpired) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
}
