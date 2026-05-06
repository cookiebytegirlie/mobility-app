import React from 'react';

export function Tag({ children, active = false, style = {} }) {
  return (
    <span style={{
      fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 10,
      color: active ? '#3DAB8E' : '#6B7280',
      backgroundColor: active ? '#EDF7F5' : 'rgba(0,0,0,0.05)',
      padding: '3px 8px', borderRadius: 8,
      border: active ? '1px solid rgba(61,171,142,0.25)' : '1px solid rgba(0,0,0,0.07)',
      display: 'inline-block',
      ...style,
    }}>{children}</span>
  );
}

export default Tag;
