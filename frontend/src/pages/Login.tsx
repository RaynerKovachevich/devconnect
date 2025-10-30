import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

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
    <AuthLayout
      title='Welcome back'
      subtitle='Access your DevConnect dashboard by signing in'
      footer={
        <span>
          Don't have an account? <Link to='/register'>Create one</Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className='auth-field'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            className='auth-input'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='you@example.com'
            required
            autoComplete='email'
          />
        </div>

        <div className='auth-field'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            className='auth-input'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='••••••••'
            required
            autoComplete='current-password'
          />
        </div>

        {error ? <p className='auth-error'>{error}</p> : null}

        <button className='auth-button' type='submit' disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
