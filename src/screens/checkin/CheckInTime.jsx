import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';

const OPTS = [
  { id: '2',  label: '2 min',  sub: 'Just a moment' },
  { id: '5',  label: '5 min',  sub: 'Quick break' },
  { id: '10', label: '10 min', sub: 'A proper reset' },
  { id: '15', label: '15 min', sub: 'Full session' },
];

export function CheckInTime({ onNext, onBack, isCompressed = false, onExit }) {
  const [selected, setSelected] = useState(null);

  const step = isCompressed ? undefined : 5;
  const total = isCompressed ? undefined : 5;

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <BackButton onClick={onBack} />
        {step && total && <ProgressBar step={step} total={total} style={{ flex: 1 }} />}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 8 }}>
          How long can you take for yourself?
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 32 }}>
          Pick what's realistic — every minute counts.
        </div>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {OPTS.map(({ id, label, sub }) => {
            const chosen = selected === id;
            return (
              <button key={id} onClick={() => setSelected(id)} style={{
                padding: '22px 16px', borderRadius: 14, textAlign: 'center',
                border: `1.5px solid ${chosen ? TEAL : BORDER}`,
                backgroundColor: chosen ? TEAL_LIGHT : '#FFFFFF',
                cursor: 'pointer',
                boxShadow: chosen ? '0 4px 16px rgba(61,171,142,0.18)' : '0 1px 6px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}>
                <div style={{
                  fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28,
                  color: chosen ? TEAL : TEXT, letterSpacing: '-0.5px', marginBottom: 4,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12,
                  color: chosen ? TEAL : TEXT_SUB,
                }}>
                  {sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={onNext} disabled={!selected} style={{
        width: '100%', height: 52, borderRadius: 26, marginTop: 28,
        backgroundColor: selected ? TEAL : 'rgba(0,0,0,0.08)',
        border: 'none', cursor: selected ? 'pointer' : 'default',
        fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
        color: selected ? '#FFFFFF' : 'rgba(0,0,0,0.28)',
        boxShadow: selected ? '0 4px 20px rgba(61,171,142,0.28)' : 'none',
        transition: 'all 0.2s',
      }}>
        See my plan
      </button>
    </div>
  );
}

export default CheckInTime;
