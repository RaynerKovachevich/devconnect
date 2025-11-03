import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { isAuthenticated as authCheck } from './services/auth';
import Profile from './pages/Profile';
import AppLayout from './components/layout/AppLayout';
import AvatarStack from './components/ui/AvatarStack';
import WaveCard from './components/ui/WaveCard';
import HeroMesh from './components/ui/HeroMesh';

// Basic auth check; replace with real token validation later.
const isAuthenticated = () => authCheck();

// Guards private routes by redirecting unauthenticated users.
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return isAuthenticated() ? children : <Navigate to='/login' replace />;
};

const Home: React.FC = () => {
  const authenticated = isAuthenticated();

  return (
    <div className='home-page'>
      <header className='home-hero' id='top'>
        <nav className='home-navbar'>
          <a href='#features'>Features</a>
          <a href='#community'>Community</a>
          <a href='#insights'>Insights</a>
        </nav>
        <div className='home-hero__copy'>
          <span className='home-badge'>DevConnect Platform</span>
          <h1>Build your developer network</h1>
          <p>
            Showcase your skills, meet collaborators, and grow faster together.
            DevConnect centralizes your professional community in one place.
          </p>
          <div className='home-actions'>
            {authenticated ? (
              <>
                <Link to='/dashboard' className='home-primary-link'>
                  Go to dashboard
                </Link>
                <Link to='/profile' className='home-secondary-link'>
                  Update profile
                </Link>
              </>
            ) : (
              <>
                <Link to='/register' className='home-primary-link'>
                  Get started
                </Link>
                <Link to='/login' className='home-secondary-link'>
                  I already have an account
                </Link>
              </>
            )}
          </div>
        </div>
        <div className='home-hero__visual'>
          <div className='home-hero__glow' aria-hidden='true' />
          <HeroMesh />
          <div className='home-hero__card'>
            <h2>Why DevConnect?</h2>
            <ul>
              <li>Curate your developer profile with ease.</li>
              <li>Discover peers and form agile squads.</li>
              <li>Track goals and celebrate milestones together.</li>
            </ul>
            <AvatarStack />
          </div>
        </div>
      </header>

      <section id='features' className='home-feature-grid'>
        <article className='home-feature-card'>
          <h3>Mentorship-ready</h3>
          <p>Connect with mentors or mentees through curated skill tags.</p>
        </article>
        <article className='home-feature-card'>
          <h3>Project showcase</h3>
          <p>Highlight your best work and invite others to collaborate.</p>
        </article>
        <article className='home-feature-card'>
          <h3>Community events</h3>
          <p>Stay in sync with workshops, challenges, and live pair sessions.</p>
        </article>
      </section>

      <section id='community' className='home-community'>
        <div className='home-community__content'>
          <h2>Cultivate meaningful connections</h2>
          <p>
            Join squads, attend lightning talks, and gather feedback from peers who
            share your passion. DevConnect makes it simple to spot collaboration
            opportunities and celebrate wins together.
          </p>
          <div className='home-community__cta'>
            <Link to={authenticated ? '/dashboard' : '/register'} className='home-primary-link'>
              {authenticated ? 'Explore squads' : 'Create your squad'}
            </Link>
            <Link to={authenticated ? '/profile' : '/login'} className='home-secondary-link'>
              Complete profile
            </Link>
          </div>
        </div>
        <div className='home-community__stats'>
          <div className='home-community__stat'>
            <span className='home-community__stat-value'>2K+</span>
            <span className='home-community__stat-label'>Active members</span>
          </div>
          <div className='home-community__stat'>
            <span className='home-community__stat-value'>350</span>
            <span className='home-community__stat-label'>Weekly collaborations</span>
          </div>
          <div className='home-community__stat'>
            <span className='home-community__stat-value'>92%</span>
            <span className='home-community__stat-label'>Profile completion rate</span>
          </div>
        </div>
      </section>

      <section id='insights' className='home-wave-section'>
        <WaveCard />
      </section>
    </div>
  );
};

const App: React.FC = () => {
  return (
    // Central routing table mixing public and protected views.
    <AppLayout>
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
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
};

export default App;
