import React, { useState, useEffect } from 'react';
import { ENVIRONMENTS, FALLBACK_ROUTINES, ROUTINES } from '../constants/data';

const ENV_ROUTINE_MAP = {
  'Park':        ['morning-stretch', 'hip-opener', 'lower-back-relief'],
  'Office':      ['desk-flow', 'neck-reset', 'shoulder-opener'],
  'Living Room': ['wind-down', 'lower-back-relief', 'full-body-reset'],
  'Gym':         ['full-body-reset', 'hip-opener', 'shoulder-opener'],
};

const findRoutineForEnv = (envName, index) => {
  const ids = ENV_ROUTINE_MAP[envName] || ['morning-stretch', 'hip-opener', 'lower-back-relief'];
  const id = ids[index % ids.length];
  return ROUTINES.find(r => r.id === id) || ROUTINES[0];
};
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, WHITE, BORDER } from '../constants/palette';
import { AppIcon } from '../components/icons';

/* Map each environment to a real photo */
const ENV_IMAGES = {
  'Park':        '/images/routine-park.jpg',
  'Office':      '/images/env-office.jpg',
  'Living Room': '/images/routine-living-room.jpg',
  'Gym':         '/images/routine-out-and-about.jpg',
};

const ROUTINE_ICONS = ['star', 'yoga', 'muscle'];

export function ScanScreen({ onNavigate }) {
  const [phase, setPhase]       = useState('idle'); // idle | scanning | results
  const [envIndex, setEnvIndex] = useState(0);
  const [routines, setRoutines] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const env     = ENVIRONMENTS[envIndex];
  const bgImage = ENV_IMAGES[env.name] || '/images/env-office.jpg';

  /* Auto-transition: scanning → results after 2 s */
  useEffect(() => {
    if (phase !== 'scanning') return;

    const tid = setTimeout(async () => {
      setPhase('results');
      setAiLoading(true);

      try {
        const result = await window.claude.complete({
          messages: [{
            role: 'user',
            content: `I'm in a ${env.name} setting and can see: ${env.objects.map(o => o.label).join(', ')}.\nSuggest exactly 3 short mobility or stretching routines I can do RIGHT NOW using what's available.\nFor each: a punchy name (3–5 words), a duration (2–8 min), which object it primarily uses, and a 2-sentence description.\nReturn ONLY a valid JSON array, no markdown:\n[{"name":"...","duration":"... min","uses":"...","description":"..."},...]`,
          }],
        });
        try {
          const parsed = JSON.parse(result.replace(/```json|```/g, '').trim());
          setRoutines(Array.isArray(parsed) && parsed.length ? parsed.slice(0, 3) : FALLBACK_ROUTINES[env.name] || FALLBACK_ROUTINES['Park']);
        } catch {
          setRoutines(FALLBACK_ROUTINES[env.name] || FALLBACK_ROUTINES['Park']);
        }
      } catch {
        setRoutines(FALLBACK_ROUTINES[env.name] || FALLBACK_ROUTINES['Park']);
      }
      setAiLoading(false);
    }, 2000);

    return () => clearTimeout(tid);
  }, [phase, envIndex]);

  const startScan = () => { setPhase('scanning'); setRoutines([]); };
  const reset     = () => { setPhase('idle');     setRoutines([]); };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.65;transform:scale(0.94)} }
        @keyframes ring   { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes slideUp{ from{transform:translateY(100%)} to{transform:translateY(0)} }
      `}</style>

      {/* ── Static photo background ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `url(${bgImage}) center/cover no-repeat`,
      }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.20)' }} />

      {/* ── Green scanning grid (scanning phase only) ── */}
      {phase === 'scanning' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          backgroundImage: `
            linear-gradient(rgba(92,118,112,0.20) 1px, transparent 1px),
            linear-gradient(90deg, rgba(92,118,112,0.20) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          animation: 'pulse 2.4s ease-in-out infinite',
        }} />
      )}

      {/* ── Viewfinder corner brackets ── */}
      {phase !== 'results' && (
        <div style={{ position: 'absolute', inset: 60, zIndex: 8, pointerEvents: 'none' }}>
          {[
            { top: 0, left: 0,   bTop: 2, bLeft: 2, bRight: 0, bBottom: 0, r: '4px 0 0 0' },
            { top: 0, right: 0,  bTop: 2, bLeft: 0, bRight: 2, bBottom: 0, r: '0 4px 0 0' },
            { bottom: 0, left: 0,  bTop: 0, bLeft: 2, bRight: 0, bBottom: 2, r: '0 0 0 4px' },
            { bottom: 0, right: 0, bTop: 0, bLeft: 0, bRight: 2, bBottom: 2, r: '0 0 4px 0' },
          ].map(({ bTop, bLeft, bRight, bBottom, r, ...pos }, i) => (
            <div key={i} style={{
              position: 'absolute', width: 26, height: 26, ...pos,
              borderStyle: 'solid',
              borderColor: phase === 'scanning' ? TEAL : 'rgba(255,255,255,0.65)',
              borderWidth: 0,
              borderTopWidth: bTop, borderLeftWidth: bLeft,
              borderRightWidth: bRight, borderBottomWidth: bBottom,
              borderRadius: r,
              transition: 'border-color 0.4s',
            }} />
          ))}
        </div>
      )}

      {/* ── Header ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => onNavigate('main-home')} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.20)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.28)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M8 1L1 7.5L8 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{
          background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          padding: '7px 16px', borderRadius: 22,
          fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: WHITE,
        }}>Environment Scan</div>

        {/* Environment switcher */}
        <button onClick={() => { reset(); setEnvIndex(i => (i + 1) % ENVIRONMENTS.length); }} style={{
          background: 'rgba(255,255,255,0.20)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.28)',
          padding: '7px 12px', borderRadius: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: WHITE,
        }}>
          <AppIcon name={env.icon} size={14} color={WHITE} />
          <span>{env.name}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Idle / Scanning CTA ── */}
      {phase !== 'results' && (
        <div style={{
          position: 'absolute', bottom: 56, left: 0, right: 0, zIndex: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        }}>

          {/* Pulsing indicator (scanning) */}
          {phase === 'scanning' && (
            <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: `2px solid ${TEAL}`,
                animation: 'ring 1.6s ease-out infinite',
              }} />
              <div style={{
                width: 36, height: 36, borderRadius: '50%', backgroundColor: TEAL,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'pulse 1.2s ease-in-out infinite',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M1 4V1h3M10 1h3v3M13 10v3h-3M4 13H1v-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}

          {/* Status label */}
          <div style={{
            padding: '8px 18px', borderRadius: 22,
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.25)',
            fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: WHITE,
          }}>
            {phase === 'scanning' ? 'Looking around...' : 'Tap to scan your environment'}
          </div>

          {/* Tap-to-scan button (idle) */}
          {phase === 'idle' && (
            <button onClick={startScan} style={{
              width: 72, height: 72, borderRadius: '50%', border: 'none', cursor: 'pointer',
              backgroundColor: WHITE, boxShadow: '0 0 0 6px rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="7" stroke={TEAL} strokeWidth="2.5" fill="none"/>
                <circle cx="14" cy="14" r="2.5" fill={TEAL}/>
                <path d="M2 9V4h5M21 4h5v5M26 19v5h-5M7 26H2v-5" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* ── Results bottom sheet ── */}
      {phase === 'results' && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
          borderRadius: '22px 22px 0 0',
          background: 'rgba(250,250,248,0.97)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 -6px 32px rgba(0,0,0,0.14)',
          animation: 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1) both',
          maxHeight: '64%',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.18)' }} />
          </div>

          {/* Sheet header */}
          <div style={{ padding: '4px 20px 14px', borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 17, color: TEXT, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <AppIcon name={env.icon} size={17} color={TEXT} /> {env.name} Moves
                </div>
                <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB, marginTop: 2 }}>
                  {env.objects.length} objects detected · Suggested for this spot
                </div>
              </div>
              <button onClick={reset} style={{
                padding: '7px 14px', borderRadius: 20,
                border: `1px solid ${BORDER}`, backgroundColor: WHITE,
                cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>Look again</button>
            </div>
          </div>

          {/* Routine cards */}
          <div style={{ overflowY: 'auto', padding: '12px 16px 100px', flex: 1, minHeight: 0, WebkitOverflowScrolling: 'touch' }}>
            {aiLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    borderRadius: 12, backgroundColor: TEAL_LIGHT, height: 80,
                    animation: 'pulse 1.2s ease-in-out infinite',
                    animationDelay: `${i * 0.15}s`,
                  }} />
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: TEAL, animation: 'pulse 1s infinite' }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB }}>AI analyzing environment…</span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {routines.map((r, i) => (
                  <div key={i} onClick={() => onNavigate('session-preview', { routine: findRoutineForEnv(env.name, i) })} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 14px', borderRadius: 12, cursor: 'pointer',
                    backgroundColor: i === 0 ? TEAL_LIGHT : WHITE,
                    border: `1px solid ${i === 0 ? 'rgba(92,118,112,0.25)' : BORDER}`,
                    boxShadow: i === 0 ? '0 2px 10px rgba(92,118,112,0.10)' : '0 1px 6px rgba(0,0,0,0.05)',
                    transition: 'all 0.15s',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      backgroundColor: i === 0 ? TEAL : 'rgba(92,118,112,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <AppIcon name={ROUTINE_ICONS[i]} size={18} color={i === 0 ? WHITE : TEAL} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 2 }}>{r.name}</div>
                      <div style={{
                        fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: TEXT_SUB, lineHeight: 1.45,
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>{r.description}</div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: TEAL, backgroundColor: TEAL_LIGHT, padding: '2px 8px', borderRadius: 8, border: '1px solid rgba(92,118,112,0.22)' }}>
                          {r.duration}
                        </span>
                        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: TEXT_SUB, backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.07)' }}>
                          {r.uses ? r.uses.toUpperCase() : ''}
                        </span>
                      </div>
                    </div>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1 1l5 5-5 5" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScanScreen;
