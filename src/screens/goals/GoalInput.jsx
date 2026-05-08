import React, { useState } from 'react';
import { TEAL, TEXT, TEXT_SUB, BG, WHITE, BORDER } from '../../constants/palette';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';

const WEEK_OPTIONS = [1, 2, 4, 6, 8, 12];

export function GoalInput({ onNext, onBack }) {
  const [goal, setGoal]   = useState('');
  const [weeks, setWeeks] = useState(4);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, padding: '16px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={2} total={4} style={{ flex: 1 }} />
      </div>

      <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', lineHeight: 1.1, margin: '24px 0 24px' }}>
        Tell us a bit more
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Goal description */}
        <div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 10 }}>Describe your goal</div>
          <textarea
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="e.g. Reduce lower back pain from sitting at my desk all day..."
            style={{
              width: '100%', height: 100, borderRadius: 12, boxSizing: 'border-box',
              border: `1.5px solid ${goal ? 'rgba(255,136,57,0.40)' : BORDER}`,
              padding: '12px 14px',
              fontFamily: 'Inter', fontSize: 14, color: TEXT,
              resize: 'none', outline: 'none',
              backgroundColor: WHITE, lineHeight: '150%',
              transition: 'border-color 0.15s',
            }}
          />
        </div>

        {/* Timeline */}
        <div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 10 }}>Timeline</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {WEEK_OPTIONS.map(w => {
              const active = weeks === w;
              return (
                <button key={w} onClick={() => setWeeks(w)} style={{
                  padding: '9px 16px', borderRadius: 20, cursor: 'pointer',
                  backgroundColor: active ? TEAL : WHITE,
                  border: `1.5px solid ${active ? TEAL : BORDER}`,
                  fontFamily: 'Inter', fontWeight: 600, fontSize: 14,
                  color: active ? WHITE : TEXT_SUB,
                  boxShadow: active ? '0 2px 8px rgba(255,136,57,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s',
                }}>
                  {w} {w === 1 ? 'week' : 'weeks'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <CTAButton onClick={onNext} style={{ marginTop: 24 }}>Analyze my goal</CTAButton>
    </div>
  );
}

export default GoalInput;
