import React from 'react';

const AVATAR_COLORS = ['#6366f1', '#ec4899', '#10b981', '#f97316', '#0ea5e9'];

const AvatarStack: React.FC = () => {
  return (
    <div className='avatar-stack'>
      {AVATAR_COLORS.map((color, index) => (
        <div key={color} className='avatar-stack__item' style={{ background: color }}>
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default AvatarStack;
