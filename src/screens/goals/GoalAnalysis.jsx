import React, { useState, useEffect } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, WHITE, BORDER, SHADOW } from '../../constants/palette';
import { CTAButton, BackButton } from '../../components/shared';
import { Check, AppIcon } from '../../components/icons';

const STEPS = [
  'Analyzing baseline mobility...',
  'Reviewing your activity level...',
  'Building your personalized plan...',
];

const FINDINGS = [
  { icon: 'clock',         title: "You'll need ~10 min/day",   sub: 'Manageable with your schedule' },
  { icon: 'target',        title: 'Key focus areas',           sub: 'Hips, lower back, shoulders' },
  { icon: 'calendar',      title: '4-week progressive plan',   sub: 'Easy to moderate intensity' },
  { icon: 'check-circle',  title: 'Strong success rate',       sub: '89% of similar users hit their goal in time' },
];

export function GoalAnalysis({ onNext, onBack }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 900),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Loading state */
  if (step < 3) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: BG, padding: '32px 28px', textAlign: 'center' }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

        <div style={{
          width: 64, height: 64, borderRadius: '50%', marginBottom: 32,
          backgroundColor: TEAL_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(92,118,112,0.20)',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ animation: 'spin 2s linear infinite' }}>
            <circle cx="14" cy="14" r="11" stroke={TEAL} strokeWidth="2" fill="none" strokeDasharray="16 52"/>
          </svg>
        </div>

        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 24, color: TEXT, marginBottom: 28 }}>
          Building your plan...
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                opacity: i <= step ? 1 : 0.3, transition: 'opacity 0.4s',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  backgroundColor: done ? TEAL : active ? TEAL_LIGHT : 'rgba(0,0,0,0.07)',
                  border: done ? 'none' : active ? `2px solid ${TEAL}` : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                }}>
                  {done && <Check color="white" />}
                </div>
                <span style={{ fontFamily: 'Inter', fontWeight: done ? 600 : 500, fontSize: 14, color: done ? TEXT : TEXT_SUB }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* Results state */
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, padding: '28px 22px' }}>
      {onBack && <BackButton onClick={onBack} style={{ marginBottom: 16 }} />}
      <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', lineHeight: 1.1, marginBottom: 24 }}>
        Here's what we found
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FINDINGS.map(({ icon, title, sub }) => (
          <div key={title} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 18px', borderRadius: 14,
            backgroundColor: WHITE, border: `1px solid ${BORDER}`, boxShadow: SHADOW,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              backgroundColor: TEAL_LIGHT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AppIcon name={icon} size={22} color={TEAL} />
            </div>
            <div>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 2 }}>{title}</div>
              <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <CTAButton onClick={onNext} style={{ marginTop: 24 }}>Show me my plan</CTAButton>
    </div>
  );
}

export default GoalAnalysis;
