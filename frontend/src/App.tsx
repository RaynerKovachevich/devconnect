import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

// Basic auth check; replace with real token validation later.
const isAuthenticated = () => {
  return Boolean(localStorage.getItem('devconnect_token'));
};

// Guards private routes by redirecting unauthenticated users.
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return isAuthenticated() ? children : <Navigate to='/login' replace />;
};

const Home: React.FC = () => (
  <div style={{ padding: 24 }}>
    <h1>DevConnect</h1>
    <p>
      Welcome! Go to <Link to='/login'>Login</Link> or{' '}
      <Link to='/register'>Register</Link> to continue.
    </p>
  </div>
);

const Dashboard: React.FC = () => (
  <div style={{ padding: 24 }}>
    <h2>Dashboard (Private)</h2>
    <p>This is protected content.</p>
    <button
      onClick={() => {
        localStorage.removeItem('devconnect_token');
        window.location.href = '/login';
      }}
    >
      Logout
    </button>
  </div>
);

const App: React.FC = () => {
  return (
    // Central routing table mixing public and protected views.
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />
      {/* Private route */}
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
