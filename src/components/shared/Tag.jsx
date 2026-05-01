import React from 'react';

export function Tag({ children, active = false, style = {} }) {
  return (
    <span style={{
      fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 10,
      color: active ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.55)',
      backgroundColor: active ? 'rgba(20,160,130,0.12)' : 'rgba(0,0,0,0.06)',
      border: active ? '1px solid rgba(20,160,130,0.32)' : '1px solid rgba(0,0,0,0.10)',
      borderRadius: 20, padding: '4px 10px', display: 'inline-block',
      letterSpacing: 0.5, ...style,
    }}>{children}</span>
  );
}

export default Tag;
