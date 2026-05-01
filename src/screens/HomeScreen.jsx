import React from 'react';
import { AppHeader, Tag, BookmarkIcon } from '../components/shared';
import { C } from '../constants/colors';

export function HomeScreen({ onNavigate }) {
  const suggestions = [
    { text: "You've been sitting 90 min", cta: "3 min reset", color: C.mintLight, textColor: C.tealMid },
    { text: "Before your walk outside", cta: "Quick prep stretch", color: '#FFF4EA', textColor: 'rgb(180,90,20)' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: 88 }}>
      <AppHeader onCheckIn={() => onNavigate('checkin-1')} onBell={() => {}} />
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, marginBottom: 20, lineHeight: '110%' }}>
          Let's get moving.
        </div>

        {/* Hero Quick Start card */}
        <div onClick={() => onNavigate('session-preview')} style={{
          borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
          boxShadow: '0px 4px 11.9px rgba(0,0,0,0.2)', marginBottom: 20,
        }}>
          <div style={{
            height: 194, position: 'relative',
            background: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 84%), url(/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg) center/cover no-repeat`,
          }}>
            <span style={{ position: 'absolute', bottom: 16, left: 18, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 22, color: C.white }}>Quick Start</span>
            <BookmarkIcon />
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', padding: '12px 16px' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.black, marginBottom: 4 }}>Morning Stretch</div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: C.grayDark, marginBottom: 8 }}>Relax your body to start your day.</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <Tag active>FULL BODY</Tag>
              <Tag>5 MIN</Tag>
              <Tag>BEGINNER</Tag>
            </div>
          </div>
        </div>

        {/* Scan Environment card */}
        <div onClick={() => onNavigate('scan-environment')} style={{
          borderRadius: 10, overflow: 'hidden', cursor: 'pointer', marginBottom: 20,
          background: 'linear-gradient(135deg, rgb(15,40,40) 0%, rgb(25,70,65) 50%, rgb(20,55,50) 100%)',
          boxShadow: '0px 4px 16px rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', padding: '16px 18px', gap: 16,
          position: 'relative',
        }}>
          {/* Subtle grid bg */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.12,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          {/* Scan icon */}
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(205,255,238,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="6" stroke="rgb(205,255,238)" strokeWidth="2" fill="none"/>
              <circle cx="14" cy="14" r="2" fill="rgb(205,255,238)"/>
              <path d="M2 9V4h5M21 4h5v5M26 19v5h-5M7 26H2v-5" stroke="rgb(205,255,238)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Ping */}
            <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: C.orange }} />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: 'white', marginBottom: 3 }}>
              Scan your environment
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: 'rgba(205,255,238,0.75)', lineHeight: '140%' }}>
              AI spots what's around you and builds a routine on the spot
            </div>
          </div>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ flexShrink: 0, position: 'relative' }}>
            <path d="M1 1l5 5-5 5" stroke="rgba(205,255,238,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Smart suggestions */}
        <div style={{ marginBottom: 20 }}>
          {suggestions.map((s, i) => (
            <div key={i} onClick={() => onNavigate('session-preview')} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderRadius: 10, backgroundColor: s.color,
              marginBottom: 10, cursor: 'pointer',
              boxShadow: '0px 2px 3px rgba(0,0,0,0.05)',
            }}>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: s.textColor, marginBottom: 2 }}>{s.text}</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: C.black }}>→ {s.cta}</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1l6 6-6 6" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>

        {/* New Routines */}
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.black, marginBottom: 12 }}>New Routines</div>
        {[
          { title: 'Feel Good Flow', subtitle: 'Full Body', img: '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg', tags: ['SHOULDERS', 'BACK'] },
          { title: 'Hip Opener', subtitle: 'Lower Body', img: '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg', tags: ['HIPS', 'LEGS'] },
        ].map((r) => (
          <div key={r.title} onClick={() => onNavigate('session-preview')} style={{
            borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
            boxShadow: '0px 4px 11.9px rgba(0,0,0,0.15)', marginBottom: 16,
          }}>
            <div style={{ height: 130, position: 'relative', background: `linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 84%), url(${r.img}) center/cover no-repeat` }}>
              <span style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: C.white }}>{r.title}</span>
              <BookmarkIcon />
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', gap: 6 }}>
              {r.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
