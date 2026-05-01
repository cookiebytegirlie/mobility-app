import React, { useState, useEffect } from 'react';
import { CTAButton } from '../../components/shared';
import { C } from '../../constants/colors';

export function GoalAnalysis({ onNext }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  const items = [
    { label: 'Analyzing baseline mobility...', done: step >= 1 },
    { label: 'Reviewing activity level...', done: step >= 2 },
    { label: 'Building your plan...', done: step >= 3 },
  ];
  if (step < 3) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: C.mintLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, animation: 'pulse 1.5s infinite' }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke={C.teal} strokeWidth="2" fill="none" strokeDasharray="4 4"/>
        </svg>
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 24, color: C.black, marginBottom: 24 }}>Analyzing your profile...</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, opacity: i <= step ? 1 : 0.3, transition: 'opacity 0.3s' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: item.done ? C.mint : C.grayLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {item.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 14, color: item.done ? C.black : C.grayDark }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px' }}>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 28, color: C.black, lineHeight: '110%', marginBottom: 24 }}>Here's what we found</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { icon: '⏱', title: "You'll need ~10 min/day", sub: 'Manageable with your schedule' },
          { icon: '🎯', title: 'Key focus areas', sub: 'Hips, lower back, shoulders' },
          { icon: '📅', title: '4-week plan', sub: 'Progressive intensity — easy to moderate' },
          { icon: '✅', title: 'Success rate', sub: '89% of similar users hit their goal in time' },
        ].map(({ icon, title, sub }) => (
          <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 12, backgroundColor: C.mintLight, boxShadow: '0px 2px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 24 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black, marginBottom: 2 }}>{title}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: C.grayDark }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
      <CTAButton onClick={onNext} style={{ marginTop: 24 }}>See my recommended plan</CTAButton>
    </div>
  );
}

export default GoalAnalysis;
