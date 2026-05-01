import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function GoalType({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);
  const goals = [
    { id: 'ski', label: 'Ski trip', icon: '⛷️', desc: 'Prep for slopes' },
    { id: 'stiffness', label: 'Reduce stiffness', icon: '🧘', desc: 'Daily relief' },
    { id: 'mobility', label: 'Daily mobility', icon: '🌀', desc: 'Build range' },
    { id: 'custom', label: 'Custom goal', icon: '✏️', desc: 'You decide' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={1} total={4} style={{ flex: 1 }} />
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 30, color: C.black, lineHeight: '110%', margin: '24px 0 8px' }}>
        What are you preparing for?
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: C.grayDark, marginBottom: 28 }}>
        We'll build a plan around your goal.
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {goals.map(({ id, label, icon, desc }) => (
          <button key={id} onClick={() => setSelected(id)} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '18px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
            backgroundColor: selected === id ? C.mint : C.grayLight,
            boxShadow: selected === id ? '0px 2px 8px rgba(39,89,89,0.15)' : 'none',
            transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: 28 }}>{icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: selected === id ? C.teal : C.black }}>{label}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: selected === id ? C.tealMid : C.grayDark }}>{desc}</div>
            </div>
            {selected === id && (
              <div style={{ marginLeft: 'auto', width: 22, height: 22, borderRadius: '50%', backgroundColor: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <CTAButton onClick={onNext} style={{ opacity: selected ? 1 : 0.5 }}>Continue</CTAButton>
      </div>
    </div>
  );
}

export default GoalType;
