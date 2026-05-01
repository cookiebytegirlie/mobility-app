import React from 'react';
import { CTAButton } from '../../components/shared';
import { C } from '../../constants/colors';

export function CheckInWelcome({ onNext }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 32px 48px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, lineHeight: '110%', marginBottom: 40 }}>
        Good morning, Tina.<br/>Let's get moving.
      </div>
      <div style={{ width: '100%' }}>
        <CTAButton onClick={onNext}>Start daily check-in</CTAButton>
      </div>
    </div>
  );
}

export default CheckInWelcome;
