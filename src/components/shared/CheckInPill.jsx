import React from 'react';

export function CheckInPill({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(0,0,0,0.10)',
      borderRadius: 20, padding: '5px 10px',
      boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
      display: 'flex', alignItems: 'center', gap: 4, position: 'relative',
    }}>
      <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: 'rgba(20,30,40,0.9)', whiteSpace: 'nowrap' }}>Complete your daily check-in</span>
      <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', backgroundColor: 'rgb(255,178,78)' }} />
    </button>
  );
}

export default CheckInPill;
