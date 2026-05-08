import React, { useState } from 'react';
import { TEAL, TEXT, TEXT_SUB, BG } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';
import { AppIcon } from '../../components/icons';
import { MOODS } from '../../constants/data';

export { MOODS };

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

export function CheckInEnergy({ onNext, onBack, onExit }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
      {/* Progress bar */}
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={2} total={5} />
      </div>
      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 0', flexShrink: 0 }}>
        <BackButton onClick={onBack} />
        {onExit && <XBtn onClick={onExit} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 8 }}>
          How's your energy today?
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 36 }}>
          What are you feeling in this moment?
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
          {MOODS.map(({ id, label, bg, ring }) => {
            const chosen = selected === id;
            return (
              <div key={id} onClick={() => setSelected(id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', flex: 1 }}>
                <div style={{
                  width: 54, height: 54, borderRadius: '50%',
                  backgroundColor: bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: chosen ? `0 0 0 3px ${ring}, 0 4px 16px rgba(0,0,0,0.10)` : '0 2px 6px rgba(0,0,0,0.07)',
                  transform: chosen ? 'scale(1.12)' : 'scale(1)',
                  transition: 'all 0.2s',
                }}>
                  <AppIcon name={`face-${id}`} size={26} color={ring} />
                </div>
                <span style={{
                  fontFamily: 'Inter', fontWeight: 600, fontSize: 10,
                  color: chosen ? TEXT : TEXT_SUB, textAlign: 'center',
                  lineHeight: 1.3, maxWidth: 52,
                }}>
                  {label}
                </span>
              </div>
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
          color: '#EFEBE4', boxShadow: '0 4px 20px rgba(92,118,112,0.28)',
        }}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default CheckInEnergy;
