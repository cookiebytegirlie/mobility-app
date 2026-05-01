import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function GoalPlan({ onSave, onBack }) {
  const [intensity, setIntensity] = useState('moderate');
  const [frequency, setFrequency] = useState(5);
  const week = [
    { day: 'Mon', sessions: ['Morning Reset 5 min', 'Hip Flow 8 min'], focus: 'Hips + Lower Back' },
    { day: 'Wed', sessions: ['Shoulder Opener 5 min'], focus: 'Upper Body' },
    { day: 'Fri', sessions: ['Full Body Stretch 10 min'], focus: 'Full Body' },
    { day: 'Sun', sessions: ['Gentle Wind-Down 5 min'], focus: 'Recovery' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={4} total={4} style={{ flex: 1 }} />
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 28, color: C.black, lineHeight: '110%', margin: '20px 0 20px' }}>Your recommended plan</div>
      {/* Week breakdown */}
      <div style={{ marginBottom: 20 }}>
        {week.map(({ day, sessions, focus }) => (
          <div key={day} style={{ display: 'flex', gap: 12, marginBottom: 12, padding: '14px 16px', borderRadius: 10, backgroundColor: C.grayLight }}>
            <div style={{ width: 36, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.teal, flexShrink: 0 }}>{day}</div>
            <div>
              {sessions.map(s => <div key={s} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: C.black, marginBottom: 2 }}>{s}</div>)}
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: C.tealMid }}>{focus}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Adjust intensity */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black, marginBottom: 10 }}>Intensity</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['gentle', 'moderate', 'intense'].map(i => (
            <button key={i} onClick={() => setIntensity(i)} style={{
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              backgroundColor: intensity === i ? C.mint : C.grayLight,
              fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
              color: intensity === i ? C.teal : C.black, transition: 'all 0.15s',
              textTransform: 'capitalize',
            }}>{i}</button>
          ))}
        </div>
      </div>
      {/* Frequency */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black, marginBottom: 10 }}>Sessions per week: <span style={{ color: C.teal }}>{frequency}</span></div>
        <input type="range" min={2} max={7} value={frequency} onChange={e => setFrequency(+e.target.value)} style={{ width: '100%', accentColor: C.teal }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: C.grayMid, marginTop: 4 }}>
          <span>2/wk</span><span>7/wk</span>
        </div>
      </div>
      <CTAButton onClick={onSave}>Save Goal</CTAButton>
    </div>
  );
}

export default GoalPlan;
