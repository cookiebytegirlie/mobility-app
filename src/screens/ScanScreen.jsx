import React, { useState, useEffect, useRef } from 'react';
import { Tag } from '../components/shared';
import { C } from '../constants/colors';
import { ENVIRONMENTS, FALLBACK_ROUTINES } from '../constants/data';

export function ScanScreen({ onNavigate }) {
  const [phase, setPhase] = useState('idle'); // idle | scanning | detected | results
  const [envIndex, setEnvIndex] = useState(0);
  const [visibleObjects, setVisibleObjects] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const scanRef = useRef(null);

  const env = ENVIRONMENTS[envIndex];

  // Animate scan line
  useEffect(() => {
    if (phase !== 'scanning') return;
    let pos = 0;
    let dir = 1;
    const id = setInterval(() => {
      pos += dir * 2.5;
      if (pos >= 100) { pos = 100; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      setScanLine(pos);
    }, 20);
    return () => clearInterval(id);
  }, [phase]);

  const startScan = async () => {
    setPhase('scanning');
    setVisibleObjects([]);
    setRoutines([]);

    await new Promise(r => setTimeout(r, 2400));
    setPhase('detected');

    // Reveal objects one by one
    for (let i = 0; i < env.objects.length; i++) {
      await new Promise(r => setTimeout(r, 300));
      setVisibleObjects(v => [...v, i]);
    }

    await new Promise(r => setTimeout(r, 700));
    setPhase('results');
    setAiLoading(true);

    try {
      const result = await window.claude.complete({
        messages: [{
          role: 'user',
          content: `I'm in a ${env.name} setting and can see: ${env.objects.map(o => o.label).join(', ')}.
Suggest exactly 3 short mobility or stretching routines I can do RIGHT NOW using what's available.
For each: a punchy name (3–5 words), a duration (2–8 min), which object it primarily uses, and a 2-sentence description.
Return ONLY a valid JSON array, no markdown, no explanation:
[{"name":"...","duration":"... min","uses":"...","description":"..."},...]`
        }]
      });

      try {
        const cleaned = result.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRoutines(parsed.slice(0, 3));
        } else {
          setRoutines(FALLBACK_ROUTINES[env.name] || FALLBACK_ROUTINES['Park']);
        }
      } catch {
        setRoutines(FALLBACK_ROUTINES[env.name] || FALLBACK_ROUTINES['Park']);
      }
    } catch {
      setRoutines(FALLBACK_ROUTINES[env.name] || FALLBACK_ROUTINES['Park']);
    }
    setAiLoading(false);
  };

  const reset = () => {
    setPhase('idle');
    setVisibleObjects([]);
    setRoutines([]);
    setScanLine(0);
  };

  // ─── VIEWFINDER ────────────────────────────────────────────
  const isGymDark = env.name === 'Gym';
  const labelColor = isGymDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
        padding: '14px 20px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => onNavigate('main-home')} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
          width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5L9 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: 'white', letterSpacing: 0.3 }}>
          Environment Scan
        </div>
        {/* Environment picker */}
        <button onClick={() => { reset(); setEnvIndex(i => (i + 1) % ENVIRONMENTS.length); }} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
          padding: '6px 12px', borderRadius: 20, backdropFilter: 'blur(8px)',
          fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: 'white',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 14 }}>{env.emoji}</span>
          <span>{env.name}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Viewfinder ── */}
      <div style={{ position: 'absolute', inset: 0, background: env.skyBg }} />
      {/* Environment scene elements */}
      <div style={{ position: 'absolute', inset: 0, background: env.bg, opacity: 0.7 }} />

      {/* Horizon line + ground */}
      <div style={{
        position: 'absolute', top: '55%', left: 0, right: 0, bottom: 0,
        background: isGymDark
          ? 'linear-gradient(to bottom, rgba(10,20,30,0.6), rgba(5,10,15,0.9))'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.25))',
      }} />

      {/* Grid overlay */}
      {(phase === 'idle' || phase === 'scanning') && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          opacity: phase === 'scanning' ? 1 : 0.5,
          transition: 'opacity 0.4s',
        }} />
      )}

      {/* Scan line */}
      {phase === 'scanning' && (
        <div style={{
          position: 'absolute', left: 0, right: 0, zIndex: 10,
          top: `${scanLine}%`,
          height: 2,
          background: `linear-gradient(to right, transparent 0%, ${C.tealMid} 20%, ${C.mint} 50%, ${C.tealMid} 80%, transparent 100%)`,
          boxShadow: `0 0 20px 6px ${C.tealMid}55`,
          transition: 'top 0.02s linear',
        }} />
      )}

      {/* Corner brackets */}
      {(phase === 'idle' || phase === 'scanning') && (
        <div style={{ position: 'absolute', inset: 56, zIndex: 8 }}>
          {[
            { top: 0, left: 0, borders: 'borderTop borderLeft' },
            { top: 0, right: 0, borders: 'borderTop borderRight' },
            { bottom: 0, left: 0, borders: 'borderBottom borderLeft' },
            { bottom: 0, right: 0, borders: 'borderBottom borderRight' },
          ].map((corner, i) => {
            const { borders, ...pos } = corner;
            return (
              <div key={i} style={{
                position: 'absolute', ...pos,
                width: 28, height: 28,
                borderColor: C.mint,
                borderStyle: 'solid',
                borderWidth: 0,
                borderTopWidth: borders.includes('borderTop') ? 2 : 0,
                borderBottomWidth: borders.includes('borderBottom') ? 2 : 0,
                borderLeftWidth: borders.includes('borderLeft') ? 2 : 0,
                borderRightWidth: borders.includes('borderRight') ? 2 : 0,
                borderRadius: borders.includes('borderTop') && borders.includes('borderLeft') ? '4px 0 0 0'
                  : borders.includes('borderTop') ? '0 4px 0 0'
                  : borders.includes('borderBottom') && borders.includes('borderLeft') ? '0 0 0 4px' : '0 0 4px 0',
              }} />
            );
          })}
        </div>
      )}

      {/* Detected object labels */}
      {(phase === 'detected' || phase === 'results') && env.objects.map((obj, i) => (
        <div key={obj.label} style={{
          position: 'absolute', top: obj.top, left: obj.left,
          zIndex: 15, transform: 'translate(-50%, -50%)',
          opacity: visibleObjects.includes(i) ? 1 : 0,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          transformOrigin: 'center',
        }}>
          {/* Detection box */}
          <div style={{
            position: 'relative',
            border: `1.5px solid ${C.mint}`,
            borderRadius: 6,
            padding: '5px 10px',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', gap: 5,
            boxShadow: `0 0 12px 2px ${C.tealMid}44`,
          }}>
            {/* Ping dot */}
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.mint, flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 10,
              color: C.mint, letterSpacing: 0.5, whiteSpace: 'nowrap',
            }}>{obj.label.toUpperCase()}</span>
          </div>
          {/* Anchor line */}
          <div style={{
            width: 1, height: 14, background: C.mint, opacity: 0.5,
            margin: '0 auto',
          }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.mint, opacity: 0.6, margin: '0 auto' }} />
        </div>
      ))}

      {/* ── Results sheet ── */}
      {phase === 'results' && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
          borderRadius: '20px 20px 0 0',
          background: 'rgba(240,244,248,0.97)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.12)',
          animation: 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1) both',
          maxHeight: '62%',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(20,30,40,0.20)' }} />
          </div>

          {/* Header */}
          <div style={{ padding: '4px 20px 12px', borderBottom: '1px solid rgba(0,0,0,0.10)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 17, color: C.black }}>
                  {env.emoji} {env.name} Routines
                </div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: C.grayMid, marginTop: 2 }}>
                  {env.objects.length} objects detected · AI-recommended
                </div>
              </div>
              <button onClick={reset} style={{
                background: C.grayLight, border: 'none', cursor: 'pointer',
                padding: '6px 12px', borderRadius: 20,
                fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: C.grayDark,
              }}>Rescan</button>
            </div>
          </div>

          {/* Routine cards */}
          <div style={{ overflowY: 'auto', padding: '12px 16px', flex: 1 }}>
            {aiLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    borderRadius: 12, background: C.mintLight, height: 90,
                    animation: 'pulse 1.2s ease-in-out infinite',
                    animationDelay: `${i * 0.15}s`,
                  }} />
                ))}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 8,
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.tealMid, animation: 'pulse 1s infinite' }} />
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, color: C.grayMid, fontWeight: 500 }}>
                    AI is analyzing your environment…
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {routines.map((r, i) => (
                  <div key={i} onClick={() => onNavigate('session-preview')} style={{
                    borderRadius: 12, border: `1.5px solid ${C.mint}`,
                    background: i === 0 ? C.mintLight : C.white,
                    padding: '13px 15px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    boxShadow: i === 0 ? '0 2px 10px rgba(39,89,89,0.10)' : 'none',
                    transition: 'transform 0.15s',
                  }}>
                    {/* Icon/rank */}
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: i === 0 ? C.teal : C.mint,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 18 }}>
                        {i === 0 ? '⭐' : i === 1 ? '🧘' : '💪'}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.black, marginBottom: 2 }}>
                        {r.name}
                      </div>
                      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 11, color: C.grayDark, lineHeight: '140%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {r.description}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
                        <Tag active>{r.duration}</Tag>
                        <Tag>{r.uses ? r.uses.toUpperCase() : ''}</Tag>
                      </div>
                    </div>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1 1l5 5-5 5" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Idle / Scanning CTA ── */}
      {(phase === 'idle' || phase === 'scanning') && (
        <div style={{
          position: 'absolute', bottom: 48, left: 0, right: 0, zIndex: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          {phase === 'scanning' && (
            <div style={{
              fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
              color: 'white', letterSpacing: 0.3, opacity: 0.9,
              background: 'rgba(0,0,0,0.4)', padding: '6px 16px', borderRadius: 20,
              backdropFilter: 'blur(6px)',
            }}>
              Detecting objects…
            </div>
          )}
          <button
            onClick={phase === 'idle' ? startScan : undefined}
            disabled={phase === 'scanning'}
            style={{
              width: 72, height: 72, borderRadius: '50%', border: 'none', cursor: phase === 'idle' ? 'pointer' : 'default',
              background: phase === 'scanning'
                ? `radial-gradient(circle, ${C.tealMid} 0%, ${C.teal} 100%)`
                : 'white',
              boxShadow: phase === 'scanning'
                ? `0 0 0 5px rgba(255,255,255,0.3), 0 0 30px 8px ${C.tealMid}88`
                : '0 0 0 5px rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: phase === 'scanning' ? 'pulse 1s ease-in-out infinite' : 'none',
              transition: 'all 0.3s',
            }}
          >
            {phase === 'scanning' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="white"/>
                <path d="M2 12h3M19 12h3M12 2v3M12 19v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="7" stroke={C.teal} strokeWidth="2.5" fill="none"/>
                <circle cx="14" cy="14" r="2.5" fill={C.teal}/>
                <path d="M2 9V4h5M21 4h5v5M26 19v5h-5M7 26H2v-5" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          {phase === 'idle' && (
            <div style={{
              fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: 'white',
              background: 'rgba(0,0,0,0.4)', padding: '6px 16px', borderRadius: 20,
              backdropFilter: 'blur(6px)',
            }}>
              Tap to scan your environment
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScanScreen;
