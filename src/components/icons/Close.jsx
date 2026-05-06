import React from 'react';

export function Close({ color = '#6B7280', width = 8, height = 8 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 8 8" fill="none">
      <path d="M1 1l6 6M7 1L1 7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default Close;
