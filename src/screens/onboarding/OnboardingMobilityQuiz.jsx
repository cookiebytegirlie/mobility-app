import React, { useState } from 'react';
import { CTAButton, BackButton, ProgressBar } from '../../components/shared';
import { C } from '../../constants/colors';

export function OnboardingMobilityQuiz({ onNext, onBack }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    { id: 'toes', q: 'Can you reach your toes?', opts: ['Easily', 'Almost', 'Not quite', 'No way'] },
    { id: 'back', q: 'How does your lower back feel?', opts: ['Great', 'A little tight', 'Often sore', 'Always aching'] },
    { id: 'sitting', q: 'How long do you sit daily?', opts: ['< 2 hrs', '2–5 hrs', '5–8 hrs', '8+ hrs'] },
  ];
  const allAnswered = questions.every(q => answers[q.id]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <BackButton onClick={onBack} />
        <ProgressBar step={2} total={4} style={{ flex: 1 }} />
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 28, color: C.black, lineHeight: '110%', margin: '24px 0 8px' }}>
        Quick check-in
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: C.grayDark, marginBottom: 28 }}>
        Helps us understand where you're starting.
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
        {questions.map(({ id, q, opts }) => (
          <div key={id}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.black, marginBottom: 12 }}>{q}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {opts.map(o => (
                <button key={o} onClick={() => setAnswers(a => ({ ...a, [id]: o }))} style={{
                  padding: '9px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  backgroundColor: answers[id] === o ? C.mint : C.grayLight,
                  fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
                  color: answers[id] === o ? C.teal : C.black,
                  transition: 'all 0.15s',
                }}>{o}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <CTAButton onClick={onNext} style={{ opacity: allAnswered ? 1 : 0.5 }}>Continue</CTAButton>
      </div>
    </div>
  );
}

export default OnboardingMobilityQuiz;
