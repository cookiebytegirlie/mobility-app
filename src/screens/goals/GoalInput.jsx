import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function GoalInput({ onNext, onBack }) {
  const [goal, setGoal] = useState('');
  const [weeks, setWeeks] = useState(4);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={2} total={4} style={{ flex: 1 }} />
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 28, color: C.black, lineHeight: '110%', margin: '24px 0 24px' }}>
        Tell us more about your goal
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black, marginBottom: 8 }}>Describe your goal</div>
          <textarea value={goal} onChange={e => setGoal(e.target.value)}
            placeholder="e.g. Reduce lower back pain from sitting at my desk all day..."
            style={{
              width: '100%', height: 100, borderRadius: 12, border: `1.5px solid ${C.grayLight}`,
              padding: '12px 14px', fontFamily: 'Plus Jakarta Sans', fontSize: 14, color: C.black,
              resize: 'none', outline: 'none', boxSizing: 'border-box',
              backgroundColor: C.white, lineHeight: '150%',
            }}
          />
        </div>
        <div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black, marginBottom: 8 }}>Timeline</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[1, 2, 4, 6, 8, 12].map(w => (
              <button key={w} onClick={() => setWeeks(w)} style={{
                padding: '10px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                backgroundColor: weeks === w ? C.mint : C.grayLight,
                fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 14,
                color: weeks === w ? C.teal : C.black, transition: 'all 0.15s',
              }}>{w} {w === 1 ? 'week' : 'weeks'}</button>
            ))}
          </div>
        </div>
      </div>
      <CTAButton onClick={onNext} style={{ marginTop: 24 }}>Analyze my goal</CTAButton>
    </div>
  );
}

export default GoalInput;
