import React from 'react';

const WaveCard: React.FC = () => {
  return (
    <div className='wave-card'>
      <svg
        viewBox='0 0 400 220'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
      >
        <defs>
          <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#6366f1' stopOpacity='0.9' />
            <stop offset='100%' stopColor='#8b5cf6' stopOpacity='0.9' />
          </linearGradient>
        </defs>
        <path
          d='M0,120 C120,180 280,60 400,140 L400,0 L0,0 Z'
          fill='url(#grad)'
          opacity='0.85'
        />
        <path
          d='M0,140 C140,220 260,40 400,120 L400,220 L0,220 Z'
          fill='url(#grad)'
          opacity='0.65'
        />
      </svg>
      <div className='wave-card__overlay'>
        <h3>Collaboration in motion</h3>
        <p>See live updates from your cohorts and celebrate achievements together.</p>
      </div>
    </div>
  );
};

export default WaveCard;
