import React from 'react';

export function Check({ color = 'white', width = 10, height = 8 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 10 8" fill="none">
      <path d="M1 4l3 3 5-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default Check;
