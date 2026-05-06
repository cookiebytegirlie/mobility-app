import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, WHITE, BORDER, SHADOW } from '../constants/palette';
import { Tag } from '../components/shared';
import { Close, AppIcon } from '../components/icons';
import { LOCATION_ROUTINES } from '../constants/data';

const LOCATIONS = ['Home', 'Office', 'Outdoors', 'Gym'];

const NUDGES = [
  {
    id: 'sitting',
    icon: 'clock',
    text: "You've been sitting 90 min",
    cta: '3 min reset',
    bg: TEAL_LIGHT,
    border: 'rgba(61,171,142,0.22)',
    ctaColor: TEAL,
  },
  {
    id: 'walk',
    icon: 'leaf',
    text: 'Before your walk outside',
    cta: 'Quick prep stretch',
    bg: '#FFF8F0',
    border: 'rgba(217,119,6,0.18)',
    ctaColor: '#D97706',
  },
];

export function HomeScreen({ onNavigate }) {
  const [location, setLocation] = useState('Home');
  const [dismissed, setDismissed] = useState([]);

  const visibleNudges = NUDGES.filter(n => !dismissed.includes(n.id));
  const routines = LOCATION_ROUTINES[location] || [];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, overflowY: 'auto', paddingBottom: 88 }}>

      {/* ── Header ── */}
      <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Avatar */}
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #C8EDE7 0%, #A8D8D0 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
        }}>
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 14, color: TEAL }}>T</span>
        </div>

        {/* Check-in pill */}
        <div onClick={() => onNavigate('checkin-1')} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          padding: '9px 14px', borderRadius: 22, cursor: 'pointer',
          backgroundColor: WHITE, border: `1px solid ${BORDER}`,
          boxShadow: SHADOW,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F97316', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: TEXT }}>Complete your daily check-in</span>
        </div>

        {/* Bell */}
        <button style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: WHITE, border: `1px solid ${BORDER}`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: SHADOW,
        }}>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M8 1C5.24 1 3 3.24 3 6v5l-1.5 2h13L13 11V6c0-2.76-2.24-5-5-5z" stroke={TEXT} strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
            <path d="M6 13.5c0 1.1.9 2 2 2s2-.9 2-2" stroke={TEXT} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: '2px 20px 0' }}>

        {/* ── Headline ── */}
        <div style={{
          fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 30,
          color: TEXT, letterSpacing: '-0.3px', lineHeight: 1.1, marginBottom: 18,
        }}>
          Let's get moving.
        </div>

        {/* ── Location selector + Scan inline ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 2, paddingRight: 16 }}>
          {LOCATIONS.map(loc => (
            <button key={loc} onClick={() => setLocation(loc)} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
              backgroundColor: location === loc ? TEAL : WHITE,
              border: `1px solid ${location === loc ? TEAL : BORDER}`,
              fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
              color: location === loc ? WHITE : TEXT_SUB,
              boxShadow: location === loc ? '0 2px 8px rgba(61,171,142,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.15s',
            }}>{loc}</button>
          ))}
        </div>

        {/* ── Nudge cards ── */}
        {visibleNudges.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
            {visibleNudges.map(n => (
              <div key={n.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 14,
                backgroundColor: n.bg, border: `1px solid ${n.border}`,
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              }}>
                <AppIcon name={n.icon} size={20} color={n.ctaColor} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: TEXT_SUB, marginBottom: 3 }}>{n.text}</div>
                  <div
                    onClick={() => onNavigate('session-preview')}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}
                  >
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: TEXT }}>{n.cta}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2l4 4-4 4" stroke={n.ctaColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <button
                  onClick={() => setDismissed(d => [...d, n.id])}
                  style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(0,0,0,0.07)', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                  }}
                >
                  <Close color={TEXT_SUB} width={8} height={8} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Quick Start hero card ── */}
        <div onClick={() => onNavigate('session-preview')} style={{
          borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.10)', marginBottom: 24,
        }}>
          <div style={{
            height: 180, position: 'relative',
            background: `linear-gradient(rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.50) 85%), url(/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg) center/cover no-repeat`,
          }}>
            <div style={{
              position: 'absolute', top: 14, left: 14,
              padding: '4px 10px', borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.28)',
            }}>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 11, color: WHITE, letterSpacing: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}><AppIcon name="lightning" size={11} color={WHITE} /> Good for right now</span>
            </div>
            <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 22, color: WHITE, letterSpacing: '-0.2px', marginBottom: 3 }}>For your lower back</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>5 min · Full body warmup</div>
            </div>
          </div>
          <div style={{
            backgroundColor: WHITE, padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <Tag active>Full body</Tag>
              <Tag>5 min</Tag>
              <Tag>Beginner</Tag>
            </div>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1 1l5 5-5 5" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* ── New Routines ── */}
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: TEXT, marginBottom: 14 }}>You might like these</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {routines.map((r, i) => (
            <div key={i} onClick={() => onNavigate('session-preview')} style={{
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}>
              <div style={{
                height: 118, position: 'relative',
                background: `linear-gradient(rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.46) 85%), url(${r.img}) center/cover no-repeat`,
              }}>
                <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: WHITE, marginBottom: 2 }}>{r.title}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: 'rgba(255,255,255,0.80)' }}>{r.sub}</div>
                </div>
              </div>
              <div style={{ backgroundColor: WHITE, padding: '10px 14px', display: 'flex', gap: 6 }}>
                {r.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
