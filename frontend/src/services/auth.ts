const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000';

type Credentials = {
  email: string;
  password: string;
};

type AuthResponse = {
  token?: string;
  access_token?: string;
};

const getResolvedToken = (payload: AuthResponse) =>
  payload.access_token ?? payload.token ?? null;

export const login = async ({ email, password }: Credentials) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = (await response.json()) as AuthResponse & Record<string, unknown>;

  if (!response.ok) {
    const reason = (data?.detail as string | undefined) ?? 'Login failed';
    throw new Error(reason);
  }

  const token = getResolvedToken(data);
  if (!token) {
    throw new Error('No token returned by server');
  }

  localStorage.setItem('devconnect_token', token);
  return token;
};

export const register = async ({ email, password }: Credentials) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = (await response.json()) as AuthResponse & Record<string, unknown>;

  if (!response.ok) {
    const reason = (data?.detail as string | undefined) ?? 'Registration failed';
    throw new Error(reason);
  }

  return getResolvedToken(data);
};

export const logout = () => {
  localStorage.removeItem('devconnect_token');
};

export const isAuthenticated = () =>
  Boolean(localStorage.getItem('devconnect_token'));
