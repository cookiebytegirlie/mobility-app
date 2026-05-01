import React, { useState } from 'react';
import { CTAButton, Tag } from '../../components/shared';
import { C } from '../../constants/colors';

export function SessionPreview({ onStart, onBack, onAdjust }) {
  const [duration, setDuration] = useState(5);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        height: 220, position: 'relative', flexShrink: 0,
        background: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%), url(/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg) center/cover no-repeat`,
      }}>
        <button onClick={onBack} style={{
          position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.2)',
          border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5L9 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <Tag style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: 8 }}>QUICK START</Tag>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 26, color: 'white' }}>Morning Stretch</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '24px 24px 0', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Focus', value: 'Desk / Full body' },
            { label: 'Level', value: 'Beginner' },
          ].map(({ label, value }) => (
            <div key={label} style={{ flex: 1, padding: '14px', borderRadius: 12, backgroundColor: C.mintLight }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: C.tealMid, marginBottom: 4 }}>{label}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.black, marginBottom: 12 }}>Adjust duration</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[2, 5, 10, 15].map(d => (
              <button key={d} onClick={() => setDuration(d)} style={{
                flex: 1, height: 48, borderRadius: 10, border: 'none', cursor: 'pointer',
                backgroundColor: duration === d ? C.mint : C.grayLight,
                fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14,
                color: duration === d ? C.teal : C.black, transition: 'all 0.15s',
              }}>{d} min</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.black, marginBottom: 12 }}>What you'll do</div>
          {['Neck rolls — 30s', 'Shoulder circles — 45s', 'Cat-cow stretch — 60s', 'Hip opener — 90s', 'Seated twist — 60s'].slice(0, duration <= 2 ? 2 : duration <= 5 ? 4 : 5).map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: C.mintLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 11, color: C.teal }}>{i + 1}</span>
              </div>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 14, color: C.grayDark }}>{m}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 24px 24px' }}>
        <CTAButton onClick={onStart}>Start {duration} min session</CTAButton>
      </div>
    </div>
  );
}

export default SessionPreview;
