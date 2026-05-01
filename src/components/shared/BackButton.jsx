import React from 'react';

export function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(0,0,0,0.07)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(0,0,0,0.12)',
      borderRadius: '50%', width: 36, height: 36, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
    }}>
      <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
        <path d="M9 1L1 8.5L9 16" stroke="rgba(20,30,40,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default BackButton;
