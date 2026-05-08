import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';
import { Check, AppIcon } from '../../components/icons';

const OPTS = [
  { id: '1-2', label: '1–2 sessions', tag: 'Light day',  desc: 'One focused burst, quick and effective', icon: 'seedling' },
  { id: '3-5', label: '3–5 sessions', tag: 'Active day', desc: 'A few short breaks spread across the day', icon: 'lightning' },
  { id: '6+',  label: '6+ sessions', tag: 'Full day',   desc: 'Steady movement built into your whole day', icon: 'fire' },
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

export function CheckInSessions({ onNext, onBack, onExit }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
      {/* Progress bar */}
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={4} total={5} />
      </div>
      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 0', flexShrink: 0 }}>
        <BackButton onClick={onBack} />
        {onExit && <XBtn onClick={onExit} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 8 }}>
          How many times can you take a break today?
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 28 }}>
          We'll work around your schedule.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {OPTS.map(({ id, label, tag, desc, icon }) => {
            const chosen = selected === id;
            return (
              <button key={id} onClick={() => setSelected(id)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 18px', borderRadius: 14,
                border: `1.5px solid ${chosen ? TEAL : BORDER}`,
                backgroundColor: chosen ? TEAL_LIGHT : '#FFFFFF',
                cursor: 'pointer',
                boxShadow: chosen ? '0 2px 12px rgba(255,136,57,0.14)' : '0 1px 4px rgba(0,0,0,0.05)',
                transition: 'all 0.15s',
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  backgroundColor: chosen ? 'rgba(255,136,57,0.12)' : 'rgba(0,0,0,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AppIcon name={icon} size={22} color={chosen ? TEAL : TEXT_SUB} />
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: chosen ? TEAL : TEXT }}>{label}</span>
                    <span style={{
                      fontFamily: 'Inter', fontWeight: 600, fontSize: 11, color: chosen ? TEAL : TEXT_SUB,
                      backgroundColor: chosen ? 'rgba(255,136,57,0.12)' : 'rgba(0,0,0,0.05)',
                      padding: '2px 8px', borderRadius: 10,
                    }}>{tag}</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB }}>{desc}</div>
                </div>
                {chosen && (
                  <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: TEAL, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check />
                  </div>
                )}
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
          Continue
        </button>
      </div>
    </div>
  );
}

export default CheckInSessions;
