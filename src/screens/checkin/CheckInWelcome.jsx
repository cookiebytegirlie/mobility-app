import React from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG } from '../../constants/palette';
import { ProgressBar } from '../../components/shared';
import { AppIcon } from '../../components/icons';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

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

export function CheckInWelcome({ onNext, onReturnStart, isReturningUser, onExit }) {
  const greeting = getGreeting();

  if (isReturningUser) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
        {/* Progress bar */}
        <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
          <ProgressBar step={1} total={5} />
        </div>
        {/* Nav row — no back on welcome */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 24px 0', flexShrink: 0 }}>
          <XBtn onClick={onExit} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            {greeting} <AppIcon name="wave" size={16} color={TEXT_SUB} />
          </div>
          <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, lineHeight: 1.15, letterSpacing: '-0.3px', marginBottom: 6 }}>
            Check in with your body.
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: TEXT_SUB, marginBottom: 28 }}>
            Takes about 2 minutes.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: 'map',   label: 'Body map', sub: "What's been bothering you today?" },
              { icon: 'clock', label: 'Time',     sub: 'How long can you take for yourself?' },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 14,
                backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  backgroundColor: TEAL_LIGHT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AppIcon name={icon} size={20} color={TEAL} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: TEXT }}>{label}</div>
                  <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ padding: '0 24px 32px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={onReturnStart} style={{
            width: '100%', height: 52, borderRadius: 26,
            backgroundColor: TEAL, border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
            color: '#FFFFFF', boxShadow: '0 6px 24px rgba(255,136,57,0.32)',
          }}>
            Check in with your body
          </button>
          <button onClick={onNext} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: TEXT_SUB,
          }}>
            Full check-in instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
      {/* Progress bar */}
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={1} total={5} />
      </div>
      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 24px 0', flexShrink: 0 }}>
        <XBtn onClick={onExit} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%', marginBottom: 28,
          background: 'linear-gradient(135deg, #EBE8C8 0%, #D5F0EA 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(255,136,57,0.15)',
        }}>
          <AppIcon name="leaf" size={40} color={TEAL} />
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 8 }}>
          {greeting}, Tina.
        </div>
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, lineHeight: 1.15, letterSpacing: '-0.3px', marginBottom: 12 }}>
          Let's get moving.
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, lineHeight: 1.55, maxWidth: 280 }}>
          A quick check-in helps us find the right move for how you're feeling today.
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 24px 32px', flexShrink: 0 }}>
        <button onClick={onNext} style={{
          width: '100%', height: 52, borderRadius: 26,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
          color: '#FFFFFF', boxShadow: '0 6px 24px rgba(255,136,57,0.32)',
        }}>
          Check in with your body
        </button>
      </div>
    </div>
  );
}

export default CheckInWelcome;
