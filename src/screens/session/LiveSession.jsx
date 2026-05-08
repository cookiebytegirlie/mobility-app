import React, { useState, useEffect, useRef, useCallback } from 'react';
import { logSession } from '../../utils/progress';
import { TEAL } from '../../constants/palette';
import { MOVES } from '../../constants/data';

/* ── Gentle chime using Web Audio API ── */
function playChime(muted) {
  if (muted) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.13;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.75);
      osc.start(t);
      osc.stop(t + 0.75);
    });
  } catch (_) {}
}

/* ── Tutorial bottom sheet ── */
function TutorialSheet({ move, onClose, onStart }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        backgroundColor: 'rgba(10,20,30,0.55)',
      }}/>
      {/* Sheet */}
      <div style={{
        position: 'relative', zIndex: 1,
        backgroundColor: '#EFEBE4',
        borderRadius: '24px 24px 0 0',
        maxHeight: '80%',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.15)' }}/>
        </div>
        {/* Thumbnail */}
        <div style={{
          margin: '8px 20px 0', height: 130, borderRadius: 14, overflow: 'hidden', flexShrink: 0,
          background: `linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url(${move.img}) center/cover no-repeat`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.22)',
            border: '2px solid rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path d="M2 2l14 9-14 9V2z" fill="white"/>
            </svg>
          </div>
          <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: 'rgba(255,255,255,0.8)', letterSpacing: 0.8 }}>HOW TO DO IT</div>
            <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18, color: 'white' }}>{move.name}</div>
          </div>
        </div>

        {/* Scrollable steps */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 0' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: TEAL, letterSpacing: 0.8, marginBottom: 12 }}>STEP BY STEP</div>
          {move.tutorial.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                backgroundColor: '#EBE8C8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEAL }}>{i + 1}</span>
              </div>
              <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: '#300A09', lineHeight: 1.6, margin: 0 }}>{step}</p>
            </div>
          ))}
          <div style={{
            padding: '14px 16px', borderRadius: 12, marginBottom: 20,
            backgroundColor: '#EBE8C8', border: '1px solid rgba(255,136,57,0.20)',
          }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: TEAL, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1.5L1 14h14L8 1.5z"/>
                <line x1="8" y1="6.5" x2="8" y2="9.5"/>
                <line x1="8" y1="11.5" x2="8.01" y2="11.5" strokeWidth="2"/>
              </svg>
              Common mistake
            </div>
            <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: '#7A4A3A', lineHeight: 1.55, margin: 0 }}>{move.tutorial.tip}</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '12px 20px 28px', borderTop: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
          <button onClick={onStart} style={{
            width: '100%', height: 50, borderRadius: 25,
            backgroundColor: TEAL, border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: '#FFFFFF',
            boxShadow: '0 4px 16px rgba(255,136,57,0.28)',
          }}>
            Got it — start this move
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main LiveSession ── */
export function LiveSession({ onEnd }) {
  const [moveIndex, setMoveIndex]       = useState(0);
  const [stepSeconds, setStepSeconds]   = useState(0);
  const [paused, setPaused]             = useState(false);
  const [muted, setMuted]               = useState(false);
  const [isFormView, setIsFormView]     = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const mutedRef = useRef(muted);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const move = MOVES[moveIndex];
  const remaining = Math.max(move.duration - stepSeconds, 0);
  const pct = stepSeconds / move.duration;
  const R = 72; const circ = 2 * Math.PI * R;

  const finishSession = useCallback((partial) => {
    const completed = MOVES.slice(0, partial ? moveIndex + 1 : MOVES.length);
    logSession({
      name: 'Morning Stretch',
      duration: Math.ceil(totalElapsed / 60) || 1,
      focusAreas: [...new Set(completed.flatMap(m => m.focus))],
      partial,
    });
    onEnd();
  }, [moveIndex, totalElapsed, onEnd]);

  useEffect(() => {
    if (paused || showTutorial || isFormView) return;
    const id = setInterval(() => {
      setStepSeconds(s => {
        const next = s + 1;
        if (next >= move.duration) {
          playChime(mutedRef.current);
          if (moveIndex < MOVES.length - 1) {
            setMoveIndex(i => i + 1);
            return 0;
          } else {
            finishSession(false);
            return 0;
          }
        }
        return next;
      });
      setTotalElapsed(t => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [paused, showTutorial, isFormView, moveIndex, move.duration, finishSession]);

  const goTo = (idx) => { setMoveIndex(idx); setStepSeconds(0); };

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#0a1018' }}>
      {/* Background — nature or form-check toggle */}
      {isFormView ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={move.img} alt={move.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,16,24,0.5) 0%, rgba(10,16,24,0.2) 40%, rgba(10,16,24,0.6) 100%)' }}/>
          <div style={{
            position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.20)',
              border: '2px solid rgba(255,255,255,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M2 2l18 11L2 24V2z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
              Form check video
            </span>
          </div>
        </div>
      ) : (
        <>
          <img src={move.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,16,24,0.50) 0%, rgba(10,16,24,0.08) 35%, rgba(10,16,24,0.08) 55%, rgba(10,16,24,0.70) 100%)' }}/>
        </>
      )}

      {/* ── Top bar ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => setMuted(m => !m)} style={{
          width: 38, height: 38, borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.30)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>

        <div style={{
          padding: '6px 14px', borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.30)',
        }}>
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: 'white' }}>
            {moveIndex + 1} of {MOVES.length}
          </span>
        </div>

        <button onClick={() => setIsFormView(v => !v)} style={{
          width: 38, height: 38, borderRadius: '50%',
          backgroundColor: isFormView ? 'rgba(255,136,57,0.7)' : 'rgba(255,255,255,0.18)',
          border: `1px solid ${isFormView ? 'rgba(255,136,57,0.9)' : 'rgba(255,255,255,0.30)'}`,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {isFormView ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Progress dots ── */}
      <div style={{ position: 'absolute', top: 62, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
        {MOVES.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} style={{
            height: 4,
            width: i === moveIndex ? 22 : 4,
            borderRadius: 2,
            backgroundColor: i < moveIndex ? 'rgba(255,136,57,0.9)' : i === moveIndex ? 'white' : 'rgba(255,255,255,0.28)',
            transition: 'all 0.3s',
            cursor: 'pointer',
          }}/>
        ))}
      </div>

      {/* ── Circular timer (center) ── */}
      <div
        style={{
          position: 'absolute', top: '42%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180, height: 180, cursor: 'pointer',
        }}
        onClick={() => setPaused(p => !p)}
      >
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="90" cy="90" r={R} stroke="rgba(255,255,255,0.15)" strokeWidth="7" fill="rgba(0,0,0,0.30)"/>
          <circle cx="90" cy="90" r={R}
            stroke={TEAL} strokeWidth="7" fill="none"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round"
            transform="rotate(-90 90 90)"
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 48, color: 'white', lineHeight: 1 }}>
            {remaining}
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>sec</div>
          <div style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
            color: paused ? '#FCD34D' : TEAL, marginTop: 7, letterSpacing: 1,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {paused ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="5" y1="3" x2="5" y2="13"/>
                  <line x1="11" y1="3" x2="11" y2="13"/>
                </svg>
                PAUSED
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="4,2 13,8 4,14" fill="none"/>
                </svg>
                TAP
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Left / right arrows ── */}
      <button onClick={() => moveIndex > 0 && goTo(moveIndex - 1)} style={{
        position: 'absolute', top: '42%', left: 16, transform: 'translateY(-50%)',
        width: 44, height: 44, borderRadius: '50%',
        backgroundColor: moveIndex === 0 ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.20)',
        border: '1px solid rgba(255,255,255,0.25)', cursor: moveIndex === 0 ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: moveIndex === 0 ? 0.35 : 1, transition: 'opacity 0.2s',
      }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <button onClick={() => moveIndex < MOVES.length - 1 ? goTo(moveIndex + 1) : finishSession(true)} style={{
        position: 'absolute', top: '42%', right: 16, transform: 'translateY(-50%)',
        width: 44, height: 44, borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.20)',
        border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* ── Bottom: name, cue, buttons ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 28px' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 5 }}>
            {move.name}
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
            {move.cue}
          </div>
        </div>

        <button onClick={() => { setPaused(true); setShowTutorial(true); }} style={{
          background: 'none', border: 'none', cursor: 'pointer', marginBottom: 10, padding: 0,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
            Show me how
          </span>
        </button>

        <button onClick={() => finishSession(true)} style={{
          width: '100%', height: 48, borderRadius: 24,
          backgroundColor: 'rgba(255,255,255,0.14)',
          border: '1px solid rgba(255,255,255,0.28)',
          cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 15,
          color: 'rgba(255,255,255,0.90)',
        }}>
          I'm done for now
        </button>
      </div>

      {/* ── Tutorial bottom sheet ── */}
      {showTutorial && (
        <TutorialSheet
          move={move}
          onClose={() => setShowTutorial(false)}
          onStart={() => { setShowTutorial(false); setPaused(false); }}
        />
      )}
    </div>
  );
}

export default LiveSession;
