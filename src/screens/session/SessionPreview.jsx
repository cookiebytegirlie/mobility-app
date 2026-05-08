import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton } from '../../components/shared';
import { AppIcon } from '../../components/icons';
import { ROUTINES } from '../../constants/data';

function fmtSecs(s) {
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60), r = s % 60;
  return r ? `${m}:${String(r).padStart(2, '0')}` : `${m} min`;
}

export function SessionPreview({ onStart, onBack, routine: routineProp }) {
  const routine = routineProp || ROUTINES[0];
  const [duration, setDuration] = useState(routine.defaultDuration);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, overflow: 'hidden', paddingTop: 52 }}>
      {/* Hero */}
      <div style={{
        height: 200, position: 'relative', flexShrink: 0,
        background: `linear-gradient(rgba(0,0,0,0.02) 0%, rgba(239,235,228,0.9) 100%), url(${routine.image}) center/cover no-repeat`,
      }}>
        <BackButton onClick={onBack} style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        }} />

        {/* Badge + title pinned to bottom of hero */}
        <div style={{ position: 'absolute', bottom: 18, left: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '4px 10px', borderRadius: 20, marginBottom: 8,
            backgroundColor: TEAL_LIGHT, border: `1px solid rgba(92,118,112,0.30)`,
          }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEAL, letterSpacing: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <AppIcon name="lightning" size={11} color={TEAL} /> {routine.tag}
            </span>
          </div>
          <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 26, color: TEXT, letterSpacing: '-0.3px' }}>
            {routine.name}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 0' }}>
        {/* Metadata cards */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          {[
            { label: 'Focus', value: routine.focus.join(' / ') },
            { label: 'Level', value: routine.level },
          ].map(({ label, value }) => (
            <div key={label} style={{
              flex: 1, padding: '14px 16px', borderRadius: 12,
              backgroundColor: '#FFFFFF', border: `1px solid ${BORDER}`,
              boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, color: TEAL, letterSpacing: 0.5, marginBottom: 5 }}>{label}</div>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: TEXT }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Duration selector */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 12 }}>Duration</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[2, 5, 10, 15].map(d => {
              const chosen = duration === d;
              return (
                <button key={d} onClick={() => setDuration(d)} style={{
                  flex: 1, height: 50, borderRadius: 12,
                  border: `1.5px solid ${chosen ? TEAL : BORDER}`,
                  backgroundColor: chosen ? TEAL_LIGHT : '#FFFFFF',
                  cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 700, fontSize: 15,
                  color: chosen ? TEAL : TEXT,
                  boxShadow: chosen ? '0 2px 10px rgba(92,118,112,0.16)' : '0 1px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s',
                }}>
                  {d}<span style={{ fontSize: 11, fontWeight: 600, color: chosen ? TEAL : TEXT_SUB }}> min</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exercise list */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 14 }}>What you'll do</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {routine.exercises.map((ex, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 12,
                backgroundColor: '#FFFFFF', border: `1px solid ${BORDER}`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  backgroundColor: TEAL_LIGHT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEAL }}>{i + 1}</span>
                </div>
                <span style={{ flex: 1, fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: TEXT }}>{ex.name}</span>
                <span style={{
                  fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT_SUB,
                  backgroundColor: 'rgba(0,0,0,0.05)', padding: '3px 9px', borderRadius: 8,
                }}>{fmtSecs(ex.duration)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ padding: '14px 22px 28px', flexShrink: 0, backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}>
        <button onClick={() => onStart(duration)} style={{
          width: '100%', height: 52, borderRadius: 26,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
          color: '#EFEBE4', boxShadow: '0 4px 20px rgba(92,118,112,0.30)',
        }}>
          Start {duration} min session
        </button>
      </div>
    </div>
  );
}

export default SessionPreview;
