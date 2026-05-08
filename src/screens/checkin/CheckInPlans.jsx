import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';
import { AppIcon } from '../../components/icons';

const PLANS = [
  { label: 'Office work',      icon: 'building' },
  { label: 'Work from home',   icon: 'laptop' },
  { label: 'Gym',              icon: 'gym-weight' },
  { label: 'Running',          icon: 'running' },
  { label: 'Going outside',    icon: 'partly-cloudy' },
  { label: 'Home tasks',       icon: 'house' },
  { label: 'Relaxing',         icon: 'couch' },
  { label: 'Running errands',  icon: 'bag' },
  { label: 'Fun day out',      icon: 'party' },
];

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

export function CheckInPlans({ onNext, onBack, onExit }) {
  const [selected, setSelected] = useState([]);
  const toggle = (label) => setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG }}>
      {/* Progress bar */}
      <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={3} total={5} />
      </div>
      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 0', flexShrink: 0 }}>
        <BackButton onClick={onBack} />
        {onExit && <XBtn onClick={onExit} />}
      </div>

      {/* Heading */}
      <div style={{ padding: '16px 24px 0', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 6 }}>
          What does your day look like?
        </div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 15, color: TEXT_SUB }}>
          Tap all that apply — we'll work around you.
        </div>
      </div>

      {/* Chips */}
      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 9, alignContent: 'flex-start', overflowY: 'auto', padding: '20px 24px 0' }}>
        {PLANS.map(({ label, icon }) => {
          const chosen = selected.includes(label);
          return (
            <button key={label} onClick={() => toggle(label)} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '10px 16px', borderRadius: 22,
              border: `1.5px solid ${chosen ? TEAL : BORDER}`,
              backgroundColor: chosen ? TEAL_LIGHT : '#FFFFFF',
              cursor: 'pointer',
              fontFamily: 'Inter', fontWeight: 600, fontSize: 14,
              color: chosen ? TEAL : TEXT,
              boxShadow: chosen ? '0 2px 10px rgba(255,136,57,0.14)' : '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.15s',
            }}>
              <AppIcon name={icon} size={16} color={chosen ? TEAL : TEXT} />
              {label}
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 24px 28px', flexShrink: 0 }}>
        <button onClick={onNext} style={{
          width: '100%', height: 52, borderRadius: 26,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
          color: '#FFFFFF', boxShadow: '0 4px 20px rgba(255,136,57,0.28)',
        }}>
          Continue{selected.length > 0 ? ` (${selected.length})` : ''}
        </button>
      </div>
    </div>
  );
}

export default CheckInPlans;
