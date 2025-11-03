import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { logout } from '../services/auth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='dashboard-page'>
      <header className='dashboard-hero'>
        <div className='dashboard-hero__copy'>
          <span className='dashboard-tag'>Private space</span>
          <h1>Welcome to DevConnect</h1>
          <p>
            Collaborate with peers, track your projects, and grow your professional network.
            We are polishing the remaining modules—stay tuned for upcoming releases.
          </p>
          <div className='dashboard-actions'>
            <Button variant='secondary' onClick={() => navigate('/profile')}>
              Complete profile
            </Button>
            <Button variant='secondary' onClick={() => navigate('/')}>
              Return Home
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className='dashboard-hero__panel'>
          <div className='dashboard-panel__header'>
            <span className='dashboard-panel__title'>Weekly snapshot</span>
            <span className='dashboard-panel__badge'>Live</span>
          </div>
          <div className='dashboard-stats'>
            <div className='dashboard-stat'>
              <span className='dashboard-stat__value'>3</span>
              <span className='dashboard-stat__label'>New connections</span>
            </div>
            <div className='dashboard-stat'>
              <span className='dashboard-stat__value'>12</span>
              <span className='dashboard-stat__label'>Message threads</span>
            </div>
            <div className='dashboard-stat'>
              <span className='dashboard-stat__value'>4</span>
              <span className='dashboard-stat__label'>Squad invites</span>
            </div>
          </div>

          <div className='dashboard-progress'>
            <div className='dashboard-progress__item'>
              <div className='dashboard-progress__labels'>
                <span>Profile completeness</span>
                <span>72%</span>
              </div>
              <div className='dashboard-progress__track'>
                <div className='dashboard-progress__fill' style={{ width: '72%' }} />
              </div>
            </div>
            <div className='dashboard-progress__item'>
              <div className='dashboard-progress__labels'>
                <span>Squad responses</span>
                <span>45%</span>
              </div>
              <div className='dashboard-progress__track'>
                <div className='dashboard-progress__fill dashboard-progress__fill--alternate' style={{ width: '45%' }} />
              </div>
            </div>
          </div>

          <p className='dashboard-panel__footnote'>Keep momentum by updating your goals and nudging pending invites.</p>
        </div>
      </header>

      <section className='dashboard-quick-actions'>
        <article className='dashboard-quick-card dashboard-quick-card--focus'>
          <span className='dashboard-quick-card__icon' role='img' aria-label='Rocket'>🚀</span>
          <div>
            <h3>Launch your profile</h3>
            <p>Fill in experience, skills, and your availability to unlock squad recommendations.</p>
          </div>
          <Button className='dashboard-quick-card__button' onClick={() => navigate('/profile')}>
            Update now
          </Button>
        </article>
        <article className='dashboard-quick-card'>
          <span className='dashboard-quick-card__icon' role='img' aria-label='Handshake'>🤝</span>
          <div>
            <h3>Invite collaborators</h3>
            <p>Share your unique link with teammates and mentors to grow faster together.</p>
          </div>
          <Button className='dashboard-quick-card__button' variant='secondary' onClick={() => navigate('/')}>
            Copy link
          </Button>
        </article>
        <article className='dashboard-quick-card'>
          <span className='dashboard-quick-card__icon' role='img' aria-label='Calendar'>🗓️</span>
          <div>
            <h3>Plan a sync</h3>
            <p>Schedule a 15-minute check-in to align priorities with your active squad.</p>
          </div>
          <Button className='dashboard-quick-card__button' variant='secondary' onClick={() => navigate('/dashboard')}>
            View calendar
          </Button>
        </article>
      </section>

      <section className='dashboard-grid'>
        <article className='dashboard-card'>
          <h2>Getting started</h2>
          <p>These tasks unlock the full DevConnect experience:</p>
          <ul>
            <li>Complete your profile details.</li>
            <li>Invite teammates or mentors to your network.</li>
            <li>Share your first project milestone.</li>
          </ul>
        </article>

        <article className='dashboard-card'>
          <h2>Upcoming features</h2>
          <p>
            The next iteration will bring dashboards with metrics, matchmaking, and real-time collaboration.
          </p>
          <div className='dashboard-pill-group'>
            <span className='dashboard-pill'>Team Finder</span>
            <span className='dashboard-pill'>Project Showcase</span>
            <span className='dashboard-pill'>Live Sessions</span>
          </div>
        </article>
      </section>

      <section className='dashboard-activity'>
        <div className='dashboard-activity__header'>
          <h2>Activity timeline</h2>
          <span className='dashboard-activity__caption'>Last 24 hours</span>
        </div>
        <ul className='dashboard-activity__timeline'>
          <li className='dashboard-activity__item'>
            <span className='dashboard-activity__marker' aria-hidden='true' />
            <div>
              <p>
                María joined your squad <strong>Design Ops</strong>.
              </p>
              <time dateTime='2025-11-03T09:24'>09:24</time>
            </div>
          </li>
          <li className='dashboard-activity__item'>
            <span className='dashboard-activity__marker' aria-hidden='true' />
            <div>
              <p>
                You reached <strong>70%</strong> profile completeness. Add your portfolio to hit 100%.
              </p>
              <time dateTime='2025-11-03T08:12'>08:12</time>
            </div>
          </li>
          <li className='dashboard-activity__item'>
            <span className='dashboard-activity__marker' aria-hidden='true' />
            <div>
              <p>
                Samuel reacted to your milestone in <strong>Frontend Guild</strong>.
              </p>
              <time dateTime='2025-11-02T21:36'>21:36</time>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
