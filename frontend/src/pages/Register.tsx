import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

const Register: React.FC = () => {
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
      <p style={{ color: '#475569', fontSize: '0.95rem' }}>
        Registration flow is under construction. Check back tomorrow when we
        wire this screen to the backend.
      </p>
    </AuthLayout>
  );
};

export default Register;
