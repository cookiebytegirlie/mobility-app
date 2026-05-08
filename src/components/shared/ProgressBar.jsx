import React from 'react';

export function ProgressBar({ step, total, style = {} }) {
  return (
    <div style={{ width: '100%', height: 3, borderRadius: 2, backgroundColor: '#E8E0D5', ...style }}>
      <div style={{
        height: '100%', borderRadius: 2,
        backgroundColor: '#5C7670',
        width: `${(step / total) * 100}%`,
        transition: 'width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
        willChange: 'width',
      }} />
    </div>
  );
}

export default ProgressBar;
