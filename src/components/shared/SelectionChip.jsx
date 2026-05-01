import React from 'react';

export function SelectionChip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 18px', borderRadius: 25,
      border: selected ? '1px solid rgba(20,160,130,0.42)' : '1px solid rgba(0,0,0,0.12)',
      cursor: 'pointer',
      backgroundColor: selected ? 'rgba(20,160,130,0.12)' : 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 14,
      color: selected ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.85)',
      boxShadow: selected ? '0px 2px 12px rgba(20,160,130,0.12)' : 'none',
      transition: 'all 0.15s', transform: selected ? 'scale(1.02)' : 'scale(1)',
    }}>{label}</button>
  );
}

export default SelectionChip;
