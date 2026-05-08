import React, { useEffect } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { useReadyAnimation } from '../../hooks/useReadyAnimation';

const SESSIONS = [
  { time: 'Now',      name: 'Morning Back Reset',   focus: 'Lower back · Hips',   dur: '5 min' },
  { time: '12:30 PM', name: 'Desk Shoulder Release', focus: 'Shoulders · Neck',    dur: '3 min' },
  { time: '6:00 PM',  name: 'Hip & Spine Flow',      focus: 'Hips · Lower back',   dur: '8 min' },
];

export function CheckInDone({ onDone, onExit }) {
  const ready = useReadyAnimation(120);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '28px 22px 32px', overflowY: 'auto', position: 'relative' }}>
      {onExit && (
        <button onClick={onExit} style={{
          position: 'absolute', top: 20, right: 20, zIndex: 10,
          width: 36, height: 36, borderRadius: '50%',
          background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="#300A09" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      <style>{`
        @keyframes popIn { from { opacity:0; transform:scale(0.6) } to { opacity:1; transform:scale(1) } }
        @keyframes checkDraw { from { stroke-dashoffset: 52 } to { stroke-dashoffset: 0 } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* Animated check */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        marginBottom: 24, flexShrink: 0,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, #EBE8C8 0%, #FFE8D6 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 18,
          animation: ready ? 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
          opacity: ready ? 1 : 0,
          boxShadow: '0 6px 24px rgba(255,136,57,0.20)',
        }}>
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none">
            <path
              d="M2 13l9.5 9.5L32 2"
              stroke={TEAL} strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="52"
              strokeDashoffset={ready ? 0 : 52}
              style={{ transition: 'stroke-dashoffset 0.5s ease 0.3s' }}
            />
          </svg>
        </div>

        <div style={{
          fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 26,
          color: TEXT, letterSpacing: '-0.3px', marginBottom: 6,
          opacity: ready ? 1 : 0,
          animation: ready ? 'fadeUp 0.4s ease 0.2s both' : 'none',
        }}>
          You're all set.
        </div>
        <div style={{
          fontFamily: 'Inter', fontWeight: 500, fontSize: 15,
          color: TEXT_SUB, textAlign: 'center', lineHeight: 1.5, maxWidth: 280,
          opacity: ready ? 1 : 0,
          animation: ready ? 'fadeUp 0.4s ease 0.35s both' : 'none',
        }}>
          Based on your body map, we've curated today's plan for you.
        </div>
      </div>

      {/* Plan card */}
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: 16,
        border: `1px solid ${BORDER}`,
        boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
        overflow: 'hidden', marginBottom: 20, flexShrink: 0,
        opacity: ready ? 1 : 0,
        animation: ready ? 'fadeUp 0.4s ease 0.45s both' : 'none',
      }}>
        {/* Card header */}
        <div style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, #EBE8C8 0%, #FFE8D6 100%)',
          borderBottom: `1px solid rgba(255,136,57,0.15)`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: TEAL }}>
            Today's recommended plan
          </div>
          <div style={{
            fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEAL,
            backgroundColor: 'rgba(255,136,57,0.12)', padding: '3px 10px', borderRadius: 10,
          }}>
            3 sessions
          </div>
        </div>

        {/* Sessions */}
        {SESSIONS.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 18px',
            borderBottom: i < SESSIONS.length - 1 ? `1px solid ${BORDER}` : 'none',
          }}>
            <div style={{ width: 52, flexShrink: 0 }}>
              <div style={{
                fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
                color: i === 0 ? TEAL : TEXT_SUB,
                backgroundColor: i === 0 ? TEAL_LIGHT : 'transparent',
                padding: i === 0 ? '3px 7px' : '0',
                borderRadius: 8, display: 'inline-block',
              }}>
                {s.time}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 2 }}>
                {s.name}
              </div>
              <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB }}>
                {s.focus}
              </div>
            </div>
            <div style={{
              fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT_SUB,
              backgroundColor: 'rgba(0,0,0,0.05)', padding: '4px 10px', borderRadius: 8, flexShrink: 0,
            }}>
              {s.dur}
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{
        flexShrink: 0,
        opacity: ready ? 1 : 0,
        animation: ready ? 'fadeUp 0.4s ease 0.55s both' : 'none',
      }}>
        <button onClick={onDone} style={{
          width: '100%', height: 52, borderRadius: 26, marginBottom: 12,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
          color: '#FFFFFF', boxShadow: '0 4px 20px rgba(255,136,57,0.30)',
        }}>
          Start your first move
        </button>
        <button onClick={onDone} style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: TEXT_SUB,
          padding: '6px 0',
        }}>
          See my full plan
        </button>
      </div>
    </div>
  );
}

export default CheckInDone;
