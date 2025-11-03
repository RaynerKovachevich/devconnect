import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { login } from '../services/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.fromRegistration) {
      setSuccess('Account created successfully. You can sign in now.');
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(null);

    try {
      await login({ email, password });
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
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
        <InputField
          id='email'
          label='Email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='you@example.com'
          required
          autoComplete='email'
        />

        <InputField
          id='password'
          label='Password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='••••••••'
          required
          autoComplete='current-password'
        />

        {error ? <p className='auth-error'>{error}</p> : null}
        {success ? (
          <p style={{ color: '#16a34a', fontSize: '0.9rem' }}>{success}</p>
        ) : null}

        <Button type='submit' disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
