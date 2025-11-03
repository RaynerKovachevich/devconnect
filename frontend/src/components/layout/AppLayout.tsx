import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { isAuthenticated, logout } from '../../services/auth';

const navLinks = [
  { to: '/', label: 'Home', requiresAuth: false },
  { to: '/dashboard', label: 'Dashboard', requiresAuth: true },
  { to: '/profile', label: 'Profile', requiresAuth: true },
];

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='app-shell'>
      <header className='app-header'>
        <Link to='/' className='app-logo'>
          <span className='app-logo__accent'>D</span>
          <span className='app-logo__text'>evConnect</span>
        </Link>
        <nav className='app-nav'>
          {navLinks
            .filter(link => (authenticated ? true : !link.requiresAuth))
            .map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`app-nav__link ${location.pathname === link.to ? 'is-active' : ''}`.trim()}
              >
                {link.label}
              </Link>
            ))}
        </nav>
        <div className='app-header__actions'>
          {authenticated ? (
            <Button variant='secondary' onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <div className='app-header__auth-links'>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </div>
          )}
        </div>
      </header>

      <main className='app-main'>{children}</main>

      <footer className='app-footer'>
        <p>Built for collaborative developers • DevConnect © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default AppLayout;
