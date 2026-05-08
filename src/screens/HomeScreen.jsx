import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, WHITE, BORDER, SHADOW } from '../constants/palette';
import { Tag } from '../components/shared';
import { Close, AppIcon } from '../components/icons';
import { ROUTINES, LOCATION_ROUTINES } from '../constants/data';

const findRoutine = (id) => ROUTINES.find(r => r.id === id) || ROUTINES[0];

const LOCATIONS = ['Home', 'Office', 'Outdoors', 'Gym'];

const BODY_TILES = [
  { label: 'Hips',      filter: 'Hips',      img: '/images/body-hip.jpg' },
  { label: 'Knees',     filter: 'Knees',     img: '/images/body-knee.jpg' },
  { label: 'Neck',      filter: 'Neck',      img: '/images/body-neck.jpg' },
  { label: 'Shoulders', filter: 'Shoulders', img: '/images/body-shoulder.jpg' },
  { label: 'Wrists',    filter: 'Wrists',    img: '/images/body-wrist.jpg' },
];

const NUDGES = [
  {
    id: 'sitting',
    icon: 'clock',
    text: "You've been sitting 90 min",
    cta: '3 min reset',
    bg: TEAL_LIGHT,
    border: 'rgba(92,118,112,0.22)',
    ctaColor: TEAL,
    routineId: 'desk-flow',
  },
  {
    id: 'walk',
    icon: 'leaf',
    text: 'Before your walk outside',
    cta: 'Quick prep stretch',
    bg: 'rgba(92,118,112,0.06)',
    border: 'rgba(217,119,6,0.18)',
    ctaColor: '#5C7670',
    routineId: 'morning-stretch',
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
          background: 'rgba(92,118,112,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
        }}>
          <img src="/images/Moove_Mark_2.svg" alt="Moove" style={{ width: 22, height: 22 }} />
        </div>

        {/* Check-in pill */}
        <div onClick={() => onNavigate('checkin-1')} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          padding: '9px 14px', borderRadius: 22, cursor: 'pointer',
          backgroundColor: WHITE, border: `1px solid ${BORDER}`,
          boxShadow: SHADOW,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#5C7670', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT }}>Complete your daily check-in</span>
        </div>

      </div>

      <div style={{ padding: '2px 20px 0' }}>

        {/* ── Headline ── */}
        <div style={{
          fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 30,
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
              fontFamily: 'Inter', fontWeight: 600, fontSize: 13,
              color: location === loc ? WHITE : TEXT_SUB,
              boxShadow: location === loc ? '0 2px 8px rgba(92,118,112,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
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
                  <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB, marginBottom: 3 }}>{n.text}</div>
                  <div
                    onClick={() => onNavigate('session-preview', { routine: findRoutine(n.routineId) })}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}
                  >
                    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT }}>{n.cta}</span>
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
        <div onClick={() => onNavigate('session-preview', { routine: findRoutine('lower-back-relief') })} style={{
          borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.10)', marginBottom: 24,
        }}>
          <div style={{
            height: 180, position: 'relative',
            background: `linear-gradient(rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.50) 85%), url(/images/routine-forest-walk.jpg) center/cover no-repeat`,
          }}>
            <div style={{
              position: 'absolute', top: 14, left: 14,
              padding: '4px 10px', borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.28)',
            }}>
              <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: WHITE, letterSpacing: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}><AppIcon name="lightning" size={11} color={WHITE} /> Good for right now</span>
            </div>
            <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 22, color: WHITE, letterSpacing: '-0.2px', marginBottom: 3 }}>For your lower back</div>
              <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>5 min · Full body warmup</div>
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

        {/* ── Stretch by body part ── */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 17, color: TEXT, marginBottom: 14 }}>Stretch by body part</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, marginLeft: -2, marginRight: -20, paddingLeft: 2, paddingRight: 20 }}>
            {BODY_TILES.map(({ label, filter, img }) => (
              <button
                key={filter}
                onClick={() => onNavigate('browse-routines', { bodyFilter: filter })}
                style={{
                  flexShrink: 0, width: 96, padding: 0, border: 'none', cursor: 'pointer',
                  backgroundColor: 'transparent',
                  display: 'flex', flexDirection: 'column', alignItems: 'stretch',
                }}
              >
                <div style={{
                  width: 96, height: 96, borderRadius: 16, marginBottom: 8,
                  background: `url(${img}) center/cover no-repeat`,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
                  border: `1px solid ${BORDER}`,
                }} />
                <div style={{
                  fontFamily: 'Inter', fontWeight: 600, fontSize: 12,
                  color: TEXT, textAlign: 'center', lineHeight: 1.2,
                }}>{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── New Routines ── */}
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 17, color: TEXT, marginBottom: 14 }}>You might like these</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {routines.map((entry, i) => {
            const r = findRoutine(entry.routineId);
            return (
              <div key={i} onClick={() => onNavigate('session-preview', { routine: r })} style={{
                borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              }}>
                <div style={{
                  height: 118, position: 'relative',
                  background: `linear-gradient(rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.46) 85%), url(${r.image}) center/cover no-repeat`,
                }}>
                  <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                    <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 17, color: WHITE, marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: 'rgba(255,255,255,0.80)' }}>{entry.sub}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: WHITE, padding: '10px 14px', display: 'flex', gap: 6 }}>
                  {r.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
