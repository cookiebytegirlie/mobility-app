import React from 'react';

export function OnboardingWelcome({ onNext }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 28px 44px',
      background: 'linear-gradient(180deg, rgba(251,248,245,0.04) 0%, rgba(251,248,245,0.72) 36%, rgba(251,248,245,0.97) 60%)',
    }}>
      <div style={{ width: '100%', maxWidth: 340, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 800,
          fontSize: 38,
          color: '#1A2028',
          lineHeight: 1.08,
          letterSpacing: '-0.5px',
          marginBottom: 14,
        }}>
          Move better.<br />Feel better.
        </div>
        <div style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 500,
          fontSize: 16,
          color: '#6B7280',
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
            backgroundColor: '#3DAB8E',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 700,
            fontSize: 16,
            color: '#FFFFFF',
            boxShadow: '0 6px 24px rgba(61,171,142,0.38)',
            display: 'block',
            marginBottom: 16,
            transition: 'transform 0.1s',
          }}
        >
          Let's find what works for your body
        </button>
        <button
          onClick={onNext}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 600,
            fontSize: 14,
            color: '#9CA3AF',
            padding: '6px 12px',
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default OnboardingWelcome;
