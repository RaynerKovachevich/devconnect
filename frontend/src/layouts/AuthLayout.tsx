import React from 'react';

type AuthLayoutProps = {
  title: string;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <div className='auth-page'>
      <div className='auth-shell'>
        <aside className='auth-showcase'>
          <span className='auth-showcase__badge'>DevConnect</span>
          <h2>Collaborate without friction</h2>
          <p>
            Find squads, share milestones, and grow your developer network with a platform
            built for transparent collaboration.
          </p>

          <ul className='auth-showcase__list'>
            <li>Curated squads tailored to the skills you highlight.</li>
            <li>Progress snapshots keep every teammate aligned weekly.</li>
            <li>Showcase your wins with a profile that updates in seconds.</li>
          </ul>

          <div className='auth-showcase__stats'>
            <div className='auth-showcase__stat'>
              <span className='auth-showcase__stat-value'>2K+</span>
              <span className='auth-showcase__stat-label'>Active members</span>
            </div>
            <div className='auth-showcase__stat'>
              <span className='auth-showcase__stat-value'>350</span>
              <span className='auth-showcase__stat-label'>Weekly sessions</span>
            </div>
            <div className='auth-showcase__stat'>
              <span className='auth-showcase__stat-value'>92%</span>
              <span className='auth-showcase__stat-label'>Profile completion</span>
            </div>
          </div>
        </aside>

        <div className='auth-card'>
          <header className='auth-header'>
            <h1 className='auth-heading'>{title}</h1>
            {subtitle ? <p className='auth-subtext'>{subtitle}</p> : null}
          </header>
          <main className='auth-content'>{children}</main>
          {footer ? <footer className='auth-footer'>{footer}</footer> : null}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
