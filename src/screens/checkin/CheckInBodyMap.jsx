import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function CheckInBodyMap({ onNext, onBack }) {
  const [selected, setSelected] = useState([]);
  const toggle = (a) => setSelected(s => s.includes(a) ? s.filter(x => x !== a) : [...s, a]);
  const bodyParts = [
    { label: 'Neck', top: '7%', left: '50%' },
    { label: 'Shoulders', top: '17%', left: '50%' },
    { label: 'Upper Back', top: '28%', left: '50%' },
    { label: 'Hips', top: '49%', left: '50%' },
    { label: 'Knees', top: '68%', left: '50%' },
    { label: 'Ankles', top: '84%', left: '50%' },
  ];
  const extraParts = ['Lower Back', 'Wrists', 'Hands', 'Feet'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={3} total={5} style={{ flex: 1 }} />
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 28, color: C.black, textAlign: 'center', lineHeight: '110%', margin: '16px 0 8px' }}>
        What's feeling stiff, sore, or aching?
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 14, color: C.grayDark, textAlign: 'center', marginBottom: 16 }}>
        Your body, your call. Select as many as you like.
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Body map */}
        <div style={{ width: 160, flexShrink: 0, position: 'relative', height: 260 }}>
          {bodyParts.map(({ label, top, left }) => (
            <button key={label} onClick={() => toggle(label)} style={{
              position: 'absolute', top, left,
              transform: 'translate(-50%, -50%)',
              background: selected.includes(label) ? C.mint : 'rgba(255,255,255,0.88)',
              border: `1.5px solid ${selected.includes(label) ? C.teal : 'rgba(185,185,185,0.7)'}`,
              borderRadius: 10, padding: '2px 8px', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 8,
              color: selected.includes(label) ? C.teal : C.grayMid,
              boxShadow: '0px 2px 3px rgba(0,0,0,0.08)', transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}>{label}</button>
          ))}
        </div>
        {/* Extra body parts */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 20 }}>
          {extraParts.map(p => (
            <button key={p} onClick={() => toggle(p)} style={{
              padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
              backgroundColor: selected.includes(p) ? C.mint : C.grayLight,
              fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
              color: selected.includes(p) ? C.teal : C.black,
              transition: 'all 0.15s',
            }}>{p}</button>
          ))}
          {selected.length > 0 && (
            <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: C.mintLight, marginTop: 8 }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 11, color: C.tealMid, marginBottom: 4 }}>Selected:</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: C.teal, lineHeight: '150%' }}>{selected.join(', ')}</div>
            </div>
          )}
        </div>
      </div>
      <CTAButton onClick={onNext} style={{ marginTop: 20 }}>Continue</CTAButton>
    </div>
  );
}

export default CheckInBodyMap;
