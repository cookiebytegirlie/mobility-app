import React from 'react';
import { CTAButton } from '../../components/shared';
import { C } from '../../constants/colors';

export function SessionComplete({ onDone, onMore }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', textAlign: 'center' }}>
      <div style={{ width: 90, height: 90, borderRadius: '50%', backgroundColor: C.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 32px rgba(39,89,89,0.2)' }}>
        <span style={{ fontSize: 40 }}>✓</span>
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, marginBottom: 6 }}>Nice — 5 min done.</div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 15, color: C.grayDark, marginBottom: 32, lineHeight: '150%' }}>
        You're building a great habit. Keep it up!
      </div>
      {/* Streak */}
      <div style={{ width: '100%', padding: '18px 20px', borderRadius: 12, backgroundColor: C.mintLight, marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ fontSize: 32 }}>🔥</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: C.black }}>3-day streak!</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: C.grayDark }}>Goal progress: 35% toward hip mobility</div>
        </div>
      </div>
      {/* Options */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={onMore} style={{
          width: '100%', height: 52, borderRadius: 25, border: 'none', cursor: 'pointer',
          backgroundColor: 'rgba(0,0,0,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.12)', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: 'rgba(20,30,40,0.85)',
        }}>+ 2 more min</button>
        <button onClick={onMore} style={{
          width: '100%', height: 52, borderRadius: 25, border: 'none', cursor: 'pointer',
          backgroundColor: 'rgba(0,0,0,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.12)', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: 'rgba(20,30,40,0.85)',
        }}>+ 5 more min</button>
        <CTAButton onClick={onDone}>Done for today</CTAButton>
      </div>
    </div>
  );
}

export default SessionComplete;
