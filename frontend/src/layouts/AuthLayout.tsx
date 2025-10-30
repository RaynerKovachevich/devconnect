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
      <div className='auth-card'>
        <header className='auth-header'>
          <h1 className='auth-heading'>{title}</h1>
          {subtitle ? <p className='auth-subtext'>{subtitle}</p> : null}
        </header>
        <main className='auth-content'>{children}</main>
        {footer ? <footer className='auth-footer'>{footer}</footer> : null}
      </div>
    </div>
  );
};

export default AuthLayout;
