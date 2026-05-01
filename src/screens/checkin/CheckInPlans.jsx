import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function CheckInPlans({ onNext, onBack }) {
  const [selected, setSelected] = useState([]);
  const plans = ['Office work', 'Work from home', 'Gym / Sports', 'Running / walking', 'Going outside', 'Home Tasks', 'Relaxing at home', 'Running errands', 'Fun day out'];
  const toggle = (p) => setSelected(s => s.includes(p) ? s.filter(x => x !== p) : [...s, p]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={2} total={5} style={{ flex: 1 }} />
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, lineHeight: '110%', margin: '20px 0 8px', textAlign: 'center' }}>
        What are today's plans?
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: C.grayDark, textAlign: 'center', marginBottom: 28 }}>
        Check all that apply — we'll work around your schedule.
      </div>
      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 10, alignContent: 'flex-start', justifyContent: 'center', overflowY: 'auto' }}>
        {plans.map(p => (
          <button key={p} onClick={() => toggle(p)} style={{
            padding: '12px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
            backgroundColor: selected.includes(p) ? C.mint : C.grayLight,
            boxShadow: selected.includes(p) ? '0px 2px 8px rgba(39,89,89,0.15)' : '0px 2px 3px rgba(0,0,0,0.05)',
            fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 14,
            color: selected.includes(p) ? C.teal : C.black,
            transition: 'all 0.15s',
          }}>{p}</button>
        ))}
      </div>
      <CTAButton onClick={onNext} style={{ marginTop: 20 }}>Continue</CTAButton>
    </div>
  );
}

export default CheckInPlans;
