import React, { useState } from 'react';
import { TEAL, TEXT, TEXT_SUB, BG, WHITE, BORDER, SHADOW } from '../../constants/palette';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';

const WEEK_PLAN = [
  { day: 'Mon', sessions: ['Morning reset — 5 min', 'Hip flow — 8 min'],       focus: 'Hips + Lower Back' },
  { day: 'Wed', sessions: ['Shoulder opener — 5 min'],                          focus: 'Upper Body' },
  { day: 'Fri', sessions: ['Full body stretch — 10 min'],                       focus: 'Full Body' },
  { day: 'Sun', sessions: ['Gentle wind-down — 5 min'],                         focus: 'Recovery' },
];

const INTENSITIES = ['Gentle', 'Moderate', 'Intense'];

export function GoalPlan({ onSave, onBack }) {
  const [intensity, setIntensity] = useState('Moderate');
  const [frequency, setFrequency] = useState(5);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, padding: '16px 22px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={4} total={4} style={{ flex: 1 }} />
      </div>

      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', lineHeight: 1.1, margin: '20px 0 20px' }}>
        Your recommended plan
      </div>

      {/* Weekly schedule */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 12 }}>Weekly schedule</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {WEEK_PLAN.map(({ day, sessions, focus }) => (
            <div key={day} style={{
              display: 'flex', gap: 14, padding: '14px 16px',
              borderRadius: 12, backgroundColor: WHITE,
              border: `1px solid ${BORDER}`, boxShadow: SHADOW,
            }}>
              <div style={{
                width: 36, fontFamily: 'Plus Jakarta Sans', fontWeight: 800,
                fontSize: 13, color: TEAL, flexShrink: 0, paddingTop: 1,
              }}>{day}</div>
              <div style={{ flex: 1 }}>
                {sessions.map(s => (
                  <div key={s} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: TEXT, marginBottom: 2 }}>{s}</div>
                ))}
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: TEXT_SUB, marginTop: 3 }}>{focus}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intensity */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 10 }}>Intensity</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {INTENSITIES.map(i => {
            const active = intensity === i;
            return (
              <button key={i} onClick={() => setIntensity(i)} style={{
                flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer',
                backgroundColor: active ? TEAL : WHITE,
                border: `1.5px solid ${active ? TEAL : BORDER}`,
                fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
                color: active ? WHITE : TEXT_SUB,
                boxShadow: active ? '0 2px 8px rgba(61,171,142,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.15s',
              }}>{i}</button>
            );
          })}
        </div>
      </div>

      {/* Frequency slider */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 12 }}>
          Sessions per week: <span style={{ color: TEAL, fontWeight: 800 }}>{frequency}</span>
        </div>
        <div style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.08)' }} />
          <div style={{
            position: 'absolute', left: 0, height: 6, borderRadius: 3, backgroundColor: TEAL,
            width: `${((frequency - 2) / 5) * 100}%`, pointerEvents: 'none',
          }} />
          <input
            type="range" min={2} max={7} value={frequency}
            onChange={e => setFrequency(+e.target.value)}
            style={{ position: 'relative', width: '100%', appearance: 'none', WebkitAppearance: 'none', background: 'transparent', cursor: 'pointer', height: 28, margin: 0 }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: TEXT_SUB, marginTop: 4 }}>
          <span>2/wk</span><span>7/wk</span>
        </div>
      </div>

      <CTAButton onClick={onSave}>Save Goal</CTAButton>
    </div>
  );
}

export default GoalPlan;
