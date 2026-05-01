import React from 'react';
import { CTAButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function OnboardingSummary({ onDone }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <ProgressBar step={4} total={4} style={{ marginBottom: 32 }} />
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 30, color: C.black, lineHeight: '110%', marginBottom: 24 }}>
        Here's your baseline
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { label: 'Sitting habits', value: 'Long periods — 6–8 hrs/day', icon: '💺' },
          { label: 'Focus areas', value: 'Lower back, hips, neck', icon: '🎯' },
          { label: 'Mobility level', value: 'Beginner — building range', icon: '📈' },
          { label: 'Preferred time', value: 'Morning sessions', icon: '⏰' },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
            borderRadius: 12, backgroundColor: C.mintLight,
            boxShadow: '0px 2px 3px rgba(0,0,0,0.05)',
          }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: C.tealMid, marginBottom: 2 }}>{label}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black }}>{value}</div>
            </div>
          </div>
        ))}
        <div style={{
          padding: '16px 18px', borderRadius: 12, backgroundColor: C.white,
          border: `1.5px solid ${C.mint}`, boxShadow: '0px 2px 3px rgba(0,0,0,0.05)',
          marginTop: 4,
        }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.teal, marginBottom: 4 }}>
            Recommended plan
          </div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 14, color: C.grayDark, lineHeight: '160%' }}>
            5–10 min/day · Focus on lower back + hips · Gentle morning routine
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <CTAButton onClick={onDone}>Start moving →</CTAButton>
      </div>
    </div>
  );
}

export default OnboardingSummary;
