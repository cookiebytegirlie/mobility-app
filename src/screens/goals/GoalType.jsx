import React, { useState } from 'react';
import { TEXT, TEXT_SUB, BG, WHITE, BORDER, SHADOW } from '../../constants/palette';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { Check, AppIcon } from '../../components/icons';

const GOALS = [
  { id: 'ski',       icon: 'ski',     label: 'Ski trip',         desc: 'Build hip, knee & lower back mobility',   accent: '#3A5269' },
  { id: 'stiffness', icon: 'yoga',    label: 'Reduce stiffness', desc: 'Daily relief from tension and tightness',  accent: '#5C7670' },
  { id: 'mobility',  icon: 'spiral',  label: 'Daily mobility',   desc: 'Build long-term range of motion',          accent: '#C793A2' },
  { id: 'custom',    icon: 'pencil',  label: 'Custom goal',       desc: 'You describe it, we build the plan',      accent: '#4A4462' },
];

export function GoalType({ onNext, onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, padding: '16px 22px' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={1} total={4} style={{ flex: 1 }} />
      </div>

      <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', lineHeight: 1.1, margin: '24px 0 8px' }}>
        What do you want to work toward?
      </div>
      <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB, marginBottom: 28 }}>
        We'll build a plan around your goal.
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {GOALS.map(({ id, icon, label, desc, accent }) => {
          const active = selected === id;
          return (
            <button key={id} onClick={() => setSelected(id)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 18px', borderRadius: 14, cursor: 'pointer',
              backgroundColor: active ? `${accent}18` : WHITE,
              border: `1.5px solid ${active ? `${accent}60` : BORDER}`,
              boxShadow: active ? `0 2px 10px ${accent}28` : SHADOW,
              transition: 'all 0.15s', textAlign: 'left',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                backgroundColor: active ? `${accent}22` : 'rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <AppIcon name={icon} size={22} color={active ? accent : TEXT_SUB} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: active ? accent : TEXT, marginBottom: 2 }}>{label}</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB }}>{desc}</div>
              </div>
              {active && (
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: accent, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check color="white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <CTAButton onClick={onNext} style={{ opacity: selected ? 1 : 0.5 }}>Continue</CTAButton>
      </div>
    </div>
  );
}

export default GoalType;
