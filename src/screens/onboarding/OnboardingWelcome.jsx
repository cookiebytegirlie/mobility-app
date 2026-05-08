import React from 'react';
import { ProgressBar } from '../../components/shared';

export function OnboardingWelcome({ onNext }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Hero photo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'url(/images/Meditating-1.jpg) center/cover no-repeat',
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(239,235,228,0.10) 0%, rgba(239,235,228,0.80) 42%, rgba(239,235,228,0.98) 68%)',
      }} />

      {/* Progress bar */}
      <div style={{ position: 'relative', padding: '16px 20px 0', flexShrink: 0 }}>
        <ProgressBar step={1} total={6} />
      </div>

      {/* Nav row — no back button, skip link on right */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', padding: '12px 24px 0', flexShrink: 0 }}>
        <button onClick={onNext} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: '#A07060',
          padding: '4px 0',
        }}>
          Skip for now
        </button>
      </div>

      {/* Content — pinned to bottom */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 24px 44px',
        position: 'relative',
      }}>
        <div style={{ width: '100%', maxWidth: 340, textAlign: 'center' }}>
          {/* Moove logo */}
          <img
            src="/images/Moove_Logo_2.svg"
            alt="Moove"
            style={{ height: 28, marginBottom: 20, display: 'block', margin: '0 auto 20px' }}
          />
          <div style={{
            fontFamily: 'Denim Ink',
            fontWeight: 600,
            fontSize: 38,
            color: '#300A09',
            lineHeight: 1.08,
            letterSpacing: '-0.5px',
            marginBottom: 14,
          }}>
            Move better.<br />Feel better.
          </div>
          <div style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 16,
            color: '#7A4A3A',
            lineHeight: 1.55,
            marginBottom: 36,
          }}>
            Short, gentle moves that fit your day — wherever you are, however you feel.
          </div>
          <button
            onClick={onNext}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 26,
              backgroundColor: '#FF8839',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 16,
              color: '#FFFFFF',
              boxShadow: '0 6px 24px rgba(255,136,57,0.38)',
              display: 'block',
              transition: 'transform 0.1s',
            }}
          >
            Let's find what works for your body
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingWelcome;
