import React from 'react';

export function Tag({ children, active = false, style = {} }) {
  return (
    <span style={{
      fontFamily: 'Inter', fontWeight: 600, fontSize: 10,
      color: active ? '#203247' : '#5C4A3A',
      backgroundColor: active ? 'rgba(173,187,203,0.40)' : 'rgba(0,0,0,0.05)',
      padding: '3px 8px', borderRadius: 8,
      border: active ? '1px solid rgba(173,187,203,0.60)' : '1px solid rgba(0,0,0,0.07)',
      display: 'inline-block',
      ...style,
    }}>{children}</span>
  );
}

export default Tag;
