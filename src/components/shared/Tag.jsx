import React from 'react';

export function Tag({ children, active = false, style = {} }) {
  return (
    <span style={{
      fontFamily: 'Inter', fontWeight: 600, fontSize: 10,
      color: active ? '#FF8839' : '#7A4A3A',
      backgroundColor: active ? '#EBE8C8' : 'rgba(0,0,0,0.05)',
      padding: '3px 8px', borderRadius: 8,
      border: active ? '1px solid rgba(255,136,57,0.25)' : '1px solid rgba(0,0,0,0.07)',
      display: 'inline-block',
      ...style,
    }}>{children}</span>
  );
}

export default Tag;
