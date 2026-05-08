import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';

const SESSIONS = [
  { day: 'Mon', name: 'Morning Back Reset', duration: '10 min', focus: 'Lower back · Hips' },
  { day: 'Wed', name: 'Neck & Shoulder Flow', duration: '8 min', focus: 'Neck · Shoulders' },
  { day: 'Fri', name: 'Full Body Mobility', duration: '12 min', focus: 'Hips · Spine · Ankles' },
  { day: 'Sun', name: 'Gentle Recovery', duration: '7 min', focus: 'Lower back · Wrists' },
];

const INTENSITIES = [
  { id: 'gentle',   label: 'Gentle',   desc: 'Easy moves, low effort' },
  { id: 'moderate', label: 'Moderate', desc: 'Balanced, some challenge' },
  { id: 'intense',  label: 'Intense',  desc: 'Deep work, more effort' },
];

export function OnboardingPlan({ onSave, onBack }) {
  const [intensity, setIntensity] = useState('moderate');
  const [sessionsPerWeek, setSessionsPerWeek] = useState(4);

  const visibleSessions = SESSIONS.slice(0, Math.min(sessionsPerWeek, SESSIONS.length));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
      {/* Progress bar */}
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={6} total={6} />
      </div>

      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 24px 0', flexShrink: 0 }}>
        {onBack && <BackButton onClick={onBack} />}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 0' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', lineHeight: 1.2 }}>Here's your plan</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB, marginTop: 4 }}>Adjust to fit your life</div>
        </div>

        {/* Weekly schedule */}
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEXT_SUB, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10 }}>
          Weekly schedule
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
          {visibleSessions.map(({ day, name, duration, focus }) => (
            <div key={day} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 16px', borderRadius: 12,
              backgroundColor: '#FFFFFF',
              border: `1px solid ${BORDER}`,
              boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                backgroundColor: TEAL_LIGHT,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: TEAL,
              }}>
                {day}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 2 }}>{name}</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB }}>{focus}</div>
              </div>
              <div style={{
                flexShrink: 0, padding: '4px 10px', borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,0.04)',
                fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT_SUB,
              }}>
                {duration}
              </div>
            </div>
          ))}
          {sessionsPerWeek > SESSIONS.length && (
            <div style={{
              padding: '12px 16px', borderRadius: 12, border: `1.5px dashed ${BORDER}`,
              fontFamily: 'Inter', fontWeight: 500, fontSize: 13,
              color: TEXT_SUB, textAlign: 'center',
            }}>
              +{sessionsPerWeek - SESSIONS.length} flexible session{sessionsPerWeek - SESSIONS.length > 1 ? 's' : ''} — you choose the day
            </div>
          )}
        </div>

        {/* Intensity selector */}
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEXT_SUB, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10 }}>
          How hard do you want to push?
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {INTENSITIES.map(({ id, label, desc }) => {
            const chosen = intensity === id;
            return (
              <button
                key={id}
                onClick={() => setIntensity(id)}
                style={{
                  flex: 1, padding: '11px 8px', borderRadius: 12,
                  border: `1.5px solid ${chosen ? TEAL : BORDER}`,
                  backgroundColor: chosen ? TEAL_LIGHT : '#FFFFFF',
                  cursor: 'pointer', textAlign: 'center',
                  boxShadow: chosen ? '0 2px 10px rgba(255,136,57,0.14)' : '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: chosen ? TEAL : TEXT, marginBottom: 3 }}>{label}</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 10, color: TEXT_SUB, lineHeight: 1.3 }}>{desc}</div>
              </button>
            );
          })}
        </div>

        {/* Sessions per week slider */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEXT_SUB, letterSpacing: 0.6, textTransform: 'uppercase' }}>
              Sessions / week
            </div>
            <div style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: TEAL,
              backgroundColor: TEAL_LIGHT, borderRadius: 8, padding: '3px 10px',
            }}>
              {sessionsPerWeek}
            </div>
          </div>
          <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.09)' }} />
            <div style={{
              position: 'absolute', left: 0, height: 6, borderRadius: 3,
              width: `${((sessionsPerWeek - 2) / 5) * 100}%`,
              backgroundColor: TEAL, pointerEvents: 'none', transition: 'width 0.15s',
            }} />
            <input
              type="range" min={2} max={7} value={sessionsPerWeek}
              onChange={e => setSessionsPerWeek(+e.target.value)}
              style={{
                position: 'absolute', left: 0, right: 0,
                width: '100%', appearance: 'none', WebkitAppearance: 'none',
                background: 'transparent', cursor: 'pointer', height: 24, margin: 0,
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 11, color: TEXT_SUB }}>2 / week</span>
            <span style={{ fontFamily: 'Inter', fontSize: 11, color: TEXT_SUB }}>7 / week</span>
          </div>
        </div>
      </div>

      {/* CTA — fixed at bottom */}
      <div style={{ padding: '16px 24px 28px', flexShrink: 0 }}>
        <button
          onClick={onSave}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            backgroundColor: TEAL, border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
            color: '#FFFFFF', boxShadow: '0 4px 20px rgba(255,136,57,0.30)',
          }}
        >
          Let's do this
        </button>
      </div>
    </div>
  );
}

export default OnboardingPlan;
