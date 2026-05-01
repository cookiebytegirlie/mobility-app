import React from 'react';

export function ProgressBar({ step, total, style = {} }) {
  return (
    <div style={{ display: 'flex', gap: 5, ...style }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          backgroundColor: i < step ? 'rgba(20,160,130,0.9)' : 'rgba(0,0,0,0.15)',
          transition: 'background-color 0.3s',
        }} />
      ))}
    </div>
  );
}

export default ProgressBar;
