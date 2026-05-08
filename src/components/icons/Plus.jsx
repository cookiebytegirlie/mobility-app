import React from 'react';

export function Plus({ color = '#FF8839', width = 13, height = 13 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1v11M1 6.5h11" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default Plus;
