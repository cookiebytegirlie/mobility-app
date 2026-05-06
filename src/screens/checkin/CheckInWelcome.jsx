import React from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG } from '../../constants/palette';
import { AppIcon } from '../../components/icons';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const CloseBtn = ({ onExit }) => (
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
);

export function CheckInWelcome({ onNext, onReturnStart, isReturningUser, onExit }) {
  const greeting = getGreeting();

  if (isReturningUser) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '40px 28px 48px', position: 'relative' }}>
        <CloseBtn onExit={onExit} />
        {/* Greeting */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 16, color: TEXT_SUB, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            {greeting} <AppIcon name="wave" size={16} color={TEXT_SUB} />
          </div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 32, color: TEXT, lineHeight: 1.15, letterSpacing: '-0.4px', marginBottom: 32 }}>
            Check in with<br/>your body.
          </div>

          {/* 2-step preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
            {[
              { icon: 'map',   label: 'Body map', sub: "What's been bothering you today?" },
              { icon: 'clock', label: 'Time',     sub: 'How long can you take for yourself?' },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 14,
                backgroundColor: '#FFFFFF', border: `1px solid rgba(0,0,0,0.07)`,
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
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: TEXT }}>{label}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: TEXT_SUB }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onReturnStart} style={{
          width: '100%', height: 52, borderRadius: 26,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
          color: '#FFFFFF', boxShadow: '0 6px 24px rgba(61,171,142,0.32)',
          marginBottom: 14,
        }}>
          Check in with your body
        </button>
        <button onClick={onNext} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 14, color: TEXT_SUB,
        }}>
          Full check-in instead
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '0 28px 48px', position: 'relative' }}>
      <CloseBtn onExit={onExit} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {/* Soft illustration placeholder */}
        <div style={{
          width: 88, height: 88, borderRadius: '50%', marginBottom: 32,
          background: 'linear-gradient(135deg, #EDF7F5 0%, #D5F0EA 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(61,171,142,0.15)',
        }}>
          <AppIcon name="leaf" size={40} color={TEAL} />
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 16, color: TEXT_SUB, marginBottom: 8 }}>
          {greeting}, Tina.
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 34, color: TEXT, lineHeight: 1.12, letterSpacing: '-0.5px', marginBottom: 14 }}>
          Let's get moving.
        </div>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: TEXT_SUB, lineHeight: 1.55, maxWidth: 280 }}>
          A quick check-in helps us find the right move for how you're feeling today.
        </div>
      </div>

      <button onClick={onNext} style={{
        width: '100%', height: 52, borderRadius: 26,
        backgroundColor: TEAL, border: 'none', cursor: 'pointer',
        fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
        color: '#FFFFFF', boxShadow: '0 6px 24px rgba(61,171,142,0.32)',
      }}>
        Check in with your body
      </button>
    </div>
  );
}

export default CheckInWelcome;
