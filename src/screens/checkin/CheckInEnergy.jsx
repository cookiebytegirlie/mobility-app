import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function CheckInEnergy({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);
  const moods = [
    { id: 'amazing', label: 'Amazing', face: '😄', color: 'rgb(106,242,120)' },
    { id: 'good', label: 'Good', face: '🙂', color: 'rgb(171,240,81)' },
    { id: 'okay', label: 'Okay', face: '😐', color: 'rgb(235,239,15)' },
    { id: 'meh', label: 'Meh', face: '😑', color: 'rgb(132,220,240)' },
    { id: 'low', label: 'Low-energy', face: '😞', color: 'rgb(109,145,245)' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={1} total={5} style={{ flex: 1 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, textAlign: 'center', lineHeight: '110%', marginBottom: 12 }}>
          How's your energy today?
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.grayDark, textAlign: 'center', marginBottom: 40 }}>
          What are you feeling in this moment?
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'nowrap', overflowX: 'auto', width: '100%', paddingBottom: 8 }}>
          {moods.map(({ id, label, face, color }) => (
            <div key={id} onClick={() => setSelected(id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', backgroundColor: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                border: selected === id ? `3px solid ${C.teal}` : '3px solid transparent',
                transform: selected === id ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s', boxShadow: selected === id ? '0 4px 12px rgba(39,89,89,0.25)' : 'none',
              }}>{face}</div>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: selected === id ? C.teal : C.grayDark, textAlign: 'center', maxWidth: 56, lineHeight: '130%' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <CTAButton onClick={onNext} style={{ opacity: selected ? 1 : 0.5 }}>Continue</CTAButton>
    </div>
  );
}

export default CheckInEnergy;
