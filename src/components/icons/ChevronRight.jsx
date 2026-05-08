import React from 'react';

export function ChevronRight({ color = '#5C7670', width = 7, height = 12 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 7 12" fill="none">
      <path d="M1 1l5 5-5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default ChevronRight;
