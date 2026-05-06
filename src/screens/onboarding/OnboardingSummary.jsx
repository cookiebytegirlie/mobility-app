import React from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { ProgressBar } from '../../components/shared';
import { AppIcon } from '../../components/icons';

const CARDS = [
  { icon: 'clock',    label: 'Time needed',     value: '8–12 min / day',         sub: 'Based on your profile' },
  { icon: 'target',   label: 'Key focus areas', value: 'Lower back · Hips · Neck', sub: 'From your body map' },
  { icon: 'calendar', label: '4-week plan',     value: 'Mon · Wed · Fri · Sun',   sub: 'Progressive routines' },
];

export function OnboardingSummary({ onDone, onNext }) {
  const handleNext = onNext || onDone;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, overflowY: 'auto', padding: '20px 22px 28px' }}>
      <ProgressBar step={4} total={4} style={{ marginBottom: 24, flexShrink: 0 }} />

      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: TEXT, lineHeight: 1.2, marginBottom: 4, letterSpacing: '-0.3px' }}>
        Here's what we found
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 24 }}>
        Here's where you're starting.
      </div>

      {/* Summary cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        {CARDS.map(({ icon, label, value, sub }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 18px', borderRadius: 14,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              backgroundColor: TEAL_LIGHT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AppIcon name={icon} size={20} color={TEAL} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: TEXT_SUB, marginBottom: 2 }}>{label}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: TEXT }}>{value}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: TEXT_SUB, marginTop: 1 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Social proof banner */}
      <div style={{
        padding: '16px 18px', borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(61,171,142,0.10) 0%, rgba(61,171,142,0.06) 100%)',
        border: `1.5px solid rgba(61,171,142,0.22)`,
        marginBottom: 22,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <AppIcon name="sparkle" size={20} color={TEAL} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: TEAL, marginBottom: 3 }}>
              89% felt better in 3 weeks
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: TEXT_SUB, lineHeight: 1.5 }}>
              Among people with similar goals and focus areas who stuck to 3+ sessions/week.
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        style={{
          width: '100%', height: 52, borderRadius: 26,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
          color: '#FFFFFF', boxShadow: '0 4px 20px rgba(61,171,142,0.30)',
          flexShrink: 0,
        }}
      >
        Here's your plan
      </button>
    </div>
  );
}

export default OnboardingSummary;
