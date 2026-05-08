import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';

const OPTS = [
  { id: '2',  label: '2 min',  sub: 'Just a moment' },
  { id: '5',  label: '5 min',  sub: 'Quick break' },
  { id: '10', label: '10 min', sub: 'A proper reset' },
  { id: '15', label: '15 min', sub: 'Full session' },
];

const XBtn = ({ onClick }) => (
  <button onClick={onClick} style={{
    width: 36, height: 36, borderRadius: '50%',
    background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 1l10 10M11 1L1 11" stroke="#300A09" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </button>
);

export function CheckInTime({ onNext, onBack, isCompressed = false, onExit }) {
  const [selected, setSelected] = useState(null);

  const step  = isCompressed ? 2 : 5;
  const total = isCompressed ? 2 : 5;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
      {/* Progress bar */}
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={step} total={total} />
      </div>
      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 0', flexShrink: 0 }}>
        <BackButton onClick={onBack} />
        {onExit && <XBtn onClick={onExit} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 8 }}>
          How long can you take for yourself?
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 32 }}>
          Pick what's realistic — every minute counts.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {OPTS.map(({ id, label, sub }) => {
            const chosen = selected === id;
            return (
              <button key={id} onClick={() => setSelected(id)} style={{
                padding: '22px 16px', borderRadius: 14, textAlign: 'center',
                border: `1.5px solid ${chosen ? TEAL : BORDER}`,
                backgroundColor: chosen ? TEAL_LIGHT : '#FFFFFF',
                cursor: 'pointer',
                boxShadow: chosen ? '0 4px 16px rgba(255,136,57,0.18)' : '0 1px 6px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}>
                <div style={{
                  fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28,
                  color: chosen ? TEAL : TEXT, letterSpacing: '-0.5px', marginBottom: 4,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: 'Inter', fontWeight: 500, fontSize: 12,
                  color: chosen ? TEAL : TEXT_SUB,
                }}>
                  {sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 24px 28px', flexShrink: 0 }}>
        <button onClick={onNext} style={{
          width: '100%', height: 52, borderRadius: 26,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
          color: '#FFFFFF', boxShadow: '0 4px 20px rgba(255,136,57,0.28)',
        }}>
          See my plan
        </button>
      </div>
    </div>
  );
}

export default CheckInTime;
