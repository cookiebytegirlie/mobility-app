import React from 'react';
import { InteractiveBodyMap } from '../../components/shared/BodyMap';

export function OnboardingBodyMap({ onNext, onBack }) {
  return (
    <InteractiveBodyMap
      title="Where do you feel tension?"
      subtitle="Tap any area to mark it"
      onNext={onNext}
      onBack={onBack}
      showSkip={true}
      progressStep={4}
      progressTotal={6}
    />
  );
}

export default OnboardingBodyMap;
