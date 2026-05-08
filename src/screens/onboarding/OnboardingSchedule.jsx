import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';
import { Check, AppIcon } from '../../components/icons';

const TIMES = [
  { id: 'morning',   label: 'Morning',   sub: 'Before your day starts', icon: 'sunrise'  },
  { id: 'afternoon', label: 'Afternoon', sub: 'During lunch or breaks', icon: 'sun'      },
  { id: 'evening',   label: 'Evening',   sub: 'Wind down after work',   icon: 'moon'     },
  { id: 'flexible',  label: 'Flexible',  sub: "I'll decide each day",   icon: 'flexible' },
];

export function OnboardingSchedule({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
      {/* Progress bar */}
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={3} total={6} />
      </div>

      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 24px 0', flexShrink: 0 }}>
        <BackButton onClick={onBack} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 0' }}>
        <div style={{
          fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28,
          color: TEXT, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 6,
        }}>
          When do you prefer to move?
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 28 }}>
          We'll schedule your sessions around this.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TIMES.map(({ id, label, sub, icon }) => {
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
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  backgroundColor: chosen ? 'rgba(255,136,57,0.12)' : 'rgba(0,0,0,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AppIcon name={icon} size={22} color={chosen ? TEAL : TEXT_SUB} />
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: chosen ? TEAL : TEXT }}>{label}</div>
                  <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB, marginTop: 2 }}>{sub}</div>
                </div>
                {chosen && (
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', backgroundColor: TEAL, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check color="white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 24px 28px', flexShrink: 0 }}>
        <button
          onClick={onNext}
          disabled={!selected}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            backgroundColor: selected ? TEAL : 'rgba(0,0,0,0.08)',
            border: 'none', cursor: selected ? 'pointer' : 'default',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
            color: selected ? '#FFFFFF' : 'rgba(0,0,0,0.28)',
            boxShadow: selected ? '0 4px 20px rgba(255,136,57,0.28)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default OnboardingSchedule;
