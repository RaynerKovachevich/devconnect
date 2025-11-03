import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { register } from '../services/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await register({ email, password });
      setLoading(false);
      setSuccess('Account created! Redirecting to login…');
      setTimeout(() => {
        navigate('/login', { state: { fromRegistration: true } });
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title='Create your account'
      subtitle='Join the DevConnect community to collaborate with peers'
      footer={
        <span>
          Already have an account? <Link to='/login'>Sign in</Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit}>
        <InputField
          id='register-email'
          label='Email'
          type='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='you@example.com'
          required
          autoComplete='email'
        />

        <InputField
          id='register-password'
          label='Password'
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder='Choose a secure password'
          required
          autoComplete='new-password'
        />

        {error ? <p className='auth-error'>{error}</p> : null}
        {success ? (
          <p style={{ color: '#16a34a', fontSize: '0.9rem' }}>{success}</p>
        ) : null}

        <Button type='submit' disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
