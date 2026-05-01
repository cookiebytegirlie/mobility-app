import React, { useState } from 'react';

export function CTAButton({ children, onClick, style = {}, variant = 'mint' }) {
  const [pressed, setPressed] = useState(false);
  const bg     = variant === 'mint' ? 'rgba(20,160,130,0.12)' : 'rgba(20,160,130,0.88)';
  const color  = variant === 'mint' ? 'rgba(20,160,130,1)'   : 'rgba(255,255,255,0.97)';
  const border = variant === 'mint' ? '1px solid rgba(20,160,130,0.38)' : '1px solid rgba(20,160,130,0.65)';
  return (
    <button
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      style={{
        width: '100%', height: 44, borderRadius: 22,
        backgroundColor: bg,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border, cursor: 'pointer',
        boxShadow: pressed ? 'none' : '0px 4px 20px rgba(20,160,130,0.12)',
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s, box-shadow 0.1s',
        fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
        color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...style,
      }}
    >{children}</button>
  );
}

export default CTAButton;
