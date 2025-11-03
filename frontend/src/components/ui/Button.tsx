import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...rest }) => {
  const base = 'ui-btn';
  const variantClass = variant === 'secondary' ? 'ui-btn--secondary' : 'ui-btn--primary';
  const combined = `${base} ${variantClass} ${className}`.trim();

  return (
    <button className={combined} {...rest}>
      {children}
    </button>
  );
};

export default Button;
