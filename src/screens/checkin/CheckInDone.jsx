import React from 'react';
import { CTAButton, Tag } from '../../components/shared';
import { C } from '../../constants/colors';

export function CheckInDone({ onDone }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: C.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 8px 24px rgba(39,89,89,0.15)' }}>
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <path d="M2 14l10 10L34 2" stroke={C.teal} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 28, color: C.black, marginBottom: 8 }}>Check-in complete!</div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: C.grayDark, marginBottom: 32, lineHeight: '160%' }}>
        Based on your check-in, we've curated today's plan for you.
      </div>
      <div style={{ width: '100%', borderRadius: 12, backgroundColor: C.mintLight, padding: '20px', marginBottom: 28, textAlign: 'left' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.teal, marginBottom: 12 }}>Today's recommended plan</div>
        {[
          { time: 'Now', routine: '5-min Morning Reset', tags: ['NECK', 'BACK'] },
          { time: '2:00 PM', routine: 'Desk Break Stretch', tags: ['SHOULDERS'] },
          { time: '7:00 PM', routine: 'Hip Release Flow', tags: ['HIPS', 'LOWER BACK'] },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 12 : 0, paddingBottom: i < 2 ? 12 : 0, borderBottom: i < 2 ? `1px solid rgba(39,89,89,0.1)` : 'none' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 12, color: C.tealMid, width: 52, flexShrink: 0 }}>{s.time}</div>
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.black, marginBottom: 4 }}>{s.routine}</div>
              <div style={{ display: 'flex', gap: 4 }}>{s.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
            </div>
          </div>
        ))}
      </div>
      <CTAButton onClick={onDone}>Start first session →</CTAButton>
    </div>
  );
}

export default CheckInDone;
