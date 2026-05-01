import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function CheckInTime({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);
  const opts = ['2 minutes', '5 minutes', '10 minutes', '15 minutes'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={5} total={5} style={{ flex: 1 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, textAlign: 'center', lineHeight: '110%', marginBottom: 12 }}>
          How much time do you have?
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 16, color: C.grayDark, textAlign: 'center', marginBottom: 40 }}>
          Pick what's realistic — you can always do more tomorrow.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', width: '100%' }}>
          {opts.map(o => (
            <button key={o} onClick={() => setSelected(o)} style={{
              width: 120, height: 80, borderRadius: 12, border: 'none', cursor: 'pointer',
              backgroundColor: selected === o ? C.mint : C.grayLight,
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
              color: selected === o ? C.teal : C.black,
              boxShadow: selected === o ? '0px 4px 12px rgba(39,89,89,0.2)' : '0px 2px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.15s',
            }}>{o}</button>
          ))}
        </div>
      </div>
      <CTAButton onClick={onNext} style={{ opacity: selected ? 1 : 0.5 }}>See my plan</CTAButton>
    </div>
  );
}

export default CheckInTime;
