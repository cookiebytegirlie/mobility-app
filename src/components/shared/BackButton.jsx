import React from 'react';
import { BackArrow } from '../icons';

export function BackButton({ onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36, borderRadius: '50%', background: '#FFFFFF',
      border: '1px solid rgba(0,0,0,0.08)', cursor: 'pointer', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      ...style,
    }}>
      <BackArrow />
    </button>
  );
}

export default BackButton;
