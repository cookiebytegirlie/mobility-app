import React from 'react';

export function BackArrow({ color = '#300A09', width = 9, height = 15 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 9 15" fill="none">
      <path d="M8 1L1 7.5L8 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default BackArrow;
