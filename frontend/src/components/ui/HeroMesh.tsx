import React from 'react';

const HeroMesh: React.FC = () => {
  return (
    <svg
      className='home-hero__mesh'
      viewBox='0 0 560 420'
      role='img'
      aria-hidden='true'
      focusable='false'
    >
      <defs>
        <linearGradient id='meshGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#6366f1' stopOpacity='0.85' />
          <stop offset='100%' stopColor='#22d3ee' stopOpacity='0.65' />
        </linearGradient>
        <radialGradient id='nodeGradient' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='#f8fafc' stopOpacity='1' />
          <stop offset='100%' stopColor='#6366f1' stopOpacity='0.4' />
        </radialGradient>
        <filter id='glow' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='6' result='blur' />
          <feMerge>
            <feMergeNode in='blur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <g opacity='0.4'>
        <path
          d='M80 120L200 60L320 120L440 80L520 160L440 240L360 200L240 260L120 220L80 120Z'
          fill='none'
          stroke='url(#meshGradient)'
          strokeWidth='1.6'
          strokeLinejoin='round'
          strokeLinecap='round'
        />
        <path
          d='M120 220L200 320L320 300L400 360L520 280'
          fill='none'
          stroke='url(#meshGradient)'
          strokeWidth='1.6'
          strokeLinejoin='round'
          strokeLinecap='round'
        />
        <path
          d='M200 60L240 260L320 120L360 200L400 360'
          fill='none'
          stroke='url(#meshGradient)'
          strokeWidth='1.4'
          strokeLinejoin='round'
          strokeLinecap='round'
          opacity='0.7'
        />
      </g>

      <g filter='url(#glow)'>
        <circle cx='200' cy='60' r='10' fill='url(#nodeGradient)' />
        <circle cx='320' cy='120' r='12' fill='url(#nodeGradient)' />
        <circle cx='440' cy='80' r='9' fill='url(#nodeGradient)' />
        <circle cx='520' cy='160' r='11' fill='url(#nodeGradient)' />
        <circle cx='360' cy='200' r='10' fill='url(#nodeGradient)' />
        <circle cx='240' cy='260' r='12' fill='url(#nodeGradient)' />
        <circle cx='400' cy='360' r='14' fill='url(#nodeGradient)' />
        <circle cx='200' cy='320' r='9' fill='url(#nodeGradient)' />
        <circle cx='120' cy='220' r='11' fill='url(#nodeGradient)' />
      </g>
    </svg>
  );
};

export default HeroMesh;
