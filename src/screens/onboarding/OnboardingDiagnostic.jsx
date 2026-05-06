import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { BackButton, ProgressBar } from '../../components/shared';
import { Check } from '../../components/icons';

const QUESTIONS = [
  {
    id: 'arms',
    q: 'Reach your arms above your head — where do you feel resistance?',
    opts: ['None', 'Shoulders', 'Upper back', 'Both'],
  },
  {
    id: 'neck',
    q: 'Roll your chin slowly to your chest — how does your neck feel?',
    opts: ['Fine', 'A little tight', 'Pretty stiff'],
  },
  {
    id: 'sitting',
    q: 'How many hours do you sit daily?',
    opts: ['Under 2', '2–5 hrs', '5–8 hrs', '8+ hrs'],
  },
];

export function OnboardingDiagnostic({ onNext, onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const q = QUESTIONS[step];
  const selected = answers[q.id];
  const isLast = step === QUESTIONS.length - 1;

  const handleContinue = () => {
    if (isLast) onNext();
    else setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step === 0) onBack();
    else setStep(s => s - 1);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '16px 24px 28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <BackButton onClick={handleBack} />
        <ProgressBar step={step + 1} total={QUESTIONS.length} style={{ flex: 1 }} />
        <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: TEXT_SUB, flexShrink: 0 }}>
          {step + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 700,
          fontSize: 22,
          color: TEXT,
          lineHeight: 1.35,
          marginBottom: 28,
          letterSpacing: '-0.2px',
        }}>
          {q.q}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.opts.map(opt => {
            const chosen = selected === opt;
            return (
              <button
                key={opt}
                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: 14,
                  border: `1.5px solid ${chosen ? TEAL : BORDER}`,
                  backgroundColor: chosen ? TEAL_LIGHT : '#FFFFFF',
                  cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans',
                  fontWeight: 600,
                  fontSize: 15,
                  color: chosen ? TEAL : TEXT,
                  textAlign: 'left',
                  boxShadow: chosen ? '0 2px 12px rgba(61,171,142,0.14)' : '0 1px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {opt}
                {chosen && (
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    backgroundColor: TEAL,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Check color="white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        style={{
          width: '100%', height: 52, borderRadius: 26, marginTop: 24,
          backgroundColor: selected ? TEAL : 'rgba(0,0,0,0.08)',
          border: 'none', cursor: selected ? 'pointer' : 'default',
          fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16,
          color: selected ? '#FFFFFF' : 'rgba(0,0,0,0.28)',
          boxShadow: selected ? '0 4px 20px rgba(61,171,142,0.28)' : 'none',
          transition: 'all 0.2s',
        }}
      >
        {isLast ? 'Continue' : 'Next'}
      </button>
    </div>
  );
}

export default OnboardingDiagnostic;
