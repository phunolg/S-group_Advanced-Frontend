// Simple HTTP helper for the frontend to talk to the backend API
export const API_BASE_URL: string = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:5000';

type ApiOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Attach Authorization header automatically if an access token exists
  try {
    const token = localStorage.getItem('access_token');
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch {
    // ignore storage errors
  }

  const resp = await fetch(url, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
    // Include credentials for cookie-based auth if needed later
    credentials: 'include',
  });

  const raw = await resp.text();
  let data: any = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = raw;
  }

  if (!resp.ok) {
    const msg = (data && (data.message || data.error)) || `Request failed with status ${resp.status}`;
    throw new Error(Array.isArray(msg) ? msg.join(', ') : String(msg));
  }

  return data as T;
}

export function getApiUrl(path: string) {
  return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
}
