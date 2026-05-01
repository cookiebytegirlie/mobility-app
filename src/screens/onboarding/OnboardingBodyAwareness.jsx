import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function OnboardingBodyAwareness({ onNext, onBack }) {
  const [selected, setSelected] = useState([]);
  const areas = ['Neck', 'Shoulders', 'Upper Back', 'Lower Back', 'Hips', 'Wrists', 'Knees', 'Ankles', 'Feet'];
  const toggle = (a) => setSelected(s => s.includes(a) ? s.filter(x => x !== a) : [...s, a]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={1} total={4} style={{ flex: 1 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 30, color: C.black, textAlign: 'center', lineHeight: '110%', marginBottom: 12 }}>
          Where do you feel stiffness?
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: C.grayDark, textAlign: 'center', marginBottom: 32 }}>
          Select all that apply — or skip if you're not sure.
        </div>
        <div style={{
          width: 220, height: 280, marginBottom: 24, borderRadius: 12, overflow: 'hidden',
          position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        }}>
          {/* Body map overlay tags */}
          {[
            { label: 'Neck', top: '8%', left: '50%' },
            { label: 'Shoulders', top: '18%', left: '50%' },
            { label: 'Upper Back', top: '30%', left: '50%' },
            { label: 'Hips', top: '50%', left: '50%' },
            { label: 'Knees', top: '72%', left: '50%' },
          ].map(({ label, top, left }) => (
            <button key={label} onClick={() => toggle(label)} style={{
              position: 'absolute', top, left,
              transform: 'translate(-50%, -50%)',
              background: selected.includes(label) ? C.mint : 'rgba(255,255,255,0.85)',
              border: `1.5px solid ${selected.includes(label) ? C.teal : 'rgba(185,185,185,0.8)'}`,
              borderRadius: 10, padding: '3px 10px', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 9,
              color: selected.includes(label) ? C.teal : C.grayMid,
              boxShadow: '0px 2px 3px rgba(0,0,0,0.08)',
              transition: 'all 0.15s',
            }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {['Lower Back', 'Wrists', 'Ankles', 'Feet'].map(a => (
            <button key={a} onClick={() => toggle(a)} style={{
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              backgroundColor: selected.includes(a) ? C.mint : C.grayLight,
              fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
              color: selected.includes(a) ? C.teal : C.black,
              transition: 'all 0.15s',
            }}>{a}</button>
          ))}
        </div>
      </div>
      <CTAButton onClick={onNext}>Continue</CTAButton>
      <button onClick={onNext} style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 14, color: C.grayMid, textAlign: 'center' }}>Skip</button>
    </div>
  );
}

export default OnboardingBodyAwareness;
