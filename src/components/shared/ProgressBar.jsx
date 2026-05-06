import React from 'react';

export function ProgressBar({ step, total, style = {} }) {
  return (
    <div style={{ width: '100%', height: 4, borderRadius: 2, backgroundColor: '#E1F5EE', ...style }}>
      <div style={{
        height: '100%', borderRadius: 2,
        backgroundColor: '#3DAB8E',
        width: `${(step / total) * 100}%`,
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />
    </div>
  );
}

export default ProgressBar;
