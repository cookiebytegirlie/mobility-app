import React, { useState } from 'react';
import { TEAL, TEXT, TEXT_SUB, BG } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';
import { AppIcon } from '../../components/icons';
import { MOODS } from '../../constants/data';

export { MOODS };

export function CheckInEnergy({ onNext, onBack, onExit }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '16px 24px 28px', position: 'relative' }}>
      {onExit && (
        <button onClick={onExit} style={{
          position: 'absolute', top: 20, right: 20, zIndex: 10,
          width: 36, height: 36, borderRadius: '50%',
          background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="#1A2028" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={1} total={5} style={{ flex: 1 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 8 }}>
          How's your energy today?
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 36 }}>
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
                  fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 10,
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

      <button onClick={onNext} disabled={!selected} style={{
        width: '100%', height: 52, borderRadius: 26,
        backgroundColor: selected ? TEAL : 'rgba(0,0,0,0.08)',
        border: 'none', cursor: selected ? 'pointer' : 'default',
        fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
        color: selected ? '#FFFFFF' : 'rgba(0,0,0,0.28)',
        boxShadow: selected ? '0 4px 20px rgba(61,171,142,0.28)' : 'none',
        transition: 'all 0.2s',
      }}>
        Continue
      </button>
    </div>
  );
}

export default CheckInEnergy;
