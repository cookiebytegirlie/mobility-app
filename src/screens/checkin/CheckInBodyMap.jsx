import React from 'react';
import { InteractiveBodyMap } from '../../components/shared/BodyMap';

export function CheckInBodyMap({ onNext, onBack, isCompressed = false, onExit }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {onExit && (
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
      )}
      <InteractiveBodyMap
        title={isCompressed ? "What's been bothering you today?" : "Where does your body feel tight or achy?"}
        subtitle="Your body, your call."
        onNext={onNext}
        onBack={onBack}
        showSkip={false}
        progressStep={isCompressed ? undefined : 3}
        progressTotal={isCompressed ? undefined : 5}
      />
    </div>
  );
}

export default CheckInBodyMap;
