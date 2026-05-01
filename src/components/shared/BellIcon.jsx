import React from 'react';

export function BellIcon({ onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 28, height: 28, borderRadius: 10,
      backgroundColor: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(0,0,0,0.10)',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0px 4px 12px rgba(0,0,0,0.08)', position: 'relative',
    }}>
      <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
        <path d="M6.5 1a1 1 0 00-1 1v.5A4 4 0 002 6.5V11H1v1.5h11V11h-1V6.5A4 4 0 008 2.5V2a1 1 0 00-1-1zM5 13a1.5 1.5 0 003 0H5z" fill="rgba(20,30,40,0.7)"/>
      </svg>
      <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', backgroundColor: 'rgb(220,130,0)' }} />
    </button>
  );
}

export default BellIcon;
