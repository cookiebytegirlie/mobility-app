import React from 'react';

export function Avatar() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      flexShrink: 0,
      border: '2px solid rgba(20,160,130,0.30)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
    }} />
  );
}

export default Avatar;
