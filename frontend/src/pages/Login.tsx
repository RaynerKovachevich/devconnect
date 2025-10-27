import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.detail || 'Login failed');
        setLoading(false);
        return;
      }

      const token = data?.access_token ?? data?.token;
      if (!token) {
        setError('No token received from server');
        setLoading(false);
        return;
      }

      localStorage.setItem('devconnect_token', token);
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '48px auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8,
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginTop: 12 }}>
          Email
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 6,
            }}
          />
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 6,
            }}
          />
        </label>

        {error && <p style={{ color: 'crimson', marginTop: 12 }}>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          style={{ marginTop: 16, padding: '8px 12px' }}
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Don't have an account? <a href='/register'>Register</a>
      </p>
    </div>
  );
};

export default Login;
