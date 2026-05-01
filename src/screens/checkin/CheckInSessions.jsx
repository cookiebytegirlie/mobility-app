import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function CheckInSessions({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);
  const opts = ['1–2 sessions', '3–5 sessions', '6+ sessions'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={4} total={5} style={{ flex: 1 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, textAlign: 'center', lineHeight: '110%', marginBottom: 12 }}>
          How many sessions can you do today?
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 16, color: C.grayDark, textAlign: 'center', marginBottom: 40 }}>
          We'll fit the routine to your day, not the other way round.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
          {opts.map(o => (
            <button key={o} onClick={() => setSelected(o)} style={{
              padding: '16px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              backgroundColor: selected === o ? C.mint : C.grayLight,
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
              color: selected === o ? C.teal : C.black,
              boxShadow: selected === o ? '0px 2px 8px rgba(39,89,89,0.2)' : '0px 2px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.15s', minWidth: 90,
            }}>{o}</button>
          ))}
        </div>
      </div>
      <CTAButton onClick={onNext} style={{ opacity: selected ? 1 : 0.5 }}>Continue</CTAButton>
    </div>
  );
}

export default CheckInSessions;
