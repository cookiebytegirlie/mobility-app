import React from 'react';
import { InteractiveBodyMap } from '../../components/shared/BodyMap';

export function CheckInBodyMap({ onNext, onBack, isCompressed = false, onExit }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <InteractiveBodyMap
        title={isCompressed ? "What's been bothering you today?" : "Where does your body feel tight or achy?"}
        subtitle="Your body, your call."
        onNext={onNext}
        onBack={onBack}
        onExit={onExit}
        showSkip={false}
        progressStep={isCompressed ? 1 : 4}
        progressTotal={isCompressed ? 2 : 5}
      />
    </div>
  );
}

export default CheckInBodyMap;
