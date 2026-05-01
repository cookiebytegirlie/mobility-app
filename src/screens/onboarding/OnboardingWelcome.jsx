import React from 'react';
import { CTAButton } from '../../components/shared';
import { C } from '../../constants/colors';

export function OnboardingWelcome({ onNext }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
      <div style={{
        width: 120, height: 120, borderRadius: '50%', marginBottom: 32,
        background: `url(/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg) center/cover no-repeat`,
        boxShadow: '0 8px 32px rgba(39,89,89,0.2)',
      }} />
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 40, color: C.black, lineHeight: '110%', marginBottom: 16 }}>
        Move better.<br/>Feel better.
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 16, color: C.grayDark, lineHeight: '150%', marginBottom: 48 }}>
        Personalized mobility routines that fit your life — whenever you need them.
      </div>
      <CTAButton onClick={onNext}>Let's personalize your movement</CTAButton>
      <button onClick={onNext} style={{ marginTop: 16, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 14, color: C.grayMid }}>
        Skip for now
      </button>
    </div>
  );
}

export default OnboardingWelcome;
