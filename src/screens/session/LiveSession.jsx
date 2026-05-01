import React, { useState, useEffect } from 'react';
import { CTAButton } from '../../components/shared';
import { C } from '../../constants/colors';

export function LiveSession({ onEnd }) {
  const moves = [
    { name: 'Neck Rolls', cue: 'Drop your chin to your chest. Slowly roll to the right, back, left.', duration: 30, img: '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg',
      tutorial: { steps: ['Sit or stand upright with shoulders relaxed.', 'Drop chin slowly to chest — feel the stretch in the back of your neck.', 'Roll your head to the right, ear toward shoulder. Hold 3 sec.', 'Continue rolling back, then to the left, then forward. Complete the circle.', 'Repeat 3–4 times. Keep movements slow and controlled.'], tips: 'Never force range of motion. If you feel sharp pain, stop immediately. Keep shoulders down throughout.' } },
    { name: 'Shoulder Circles', cue: 'Roll both shoulders back in big slow circles. Feel tension release.', duration: 40, img: '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg',
      tutorial: { steps: ['Stand or sit tall, arms relaxed at sides.', 'Lift both shoulders up toward your ears.', 'Roll them back, squeezing shoulder blades together.', 'Drop them down and forward, completing the circle.', 'Do 5 backward circles, then 5 forward.'], tips: 'Backward circles are more beneficial for desk workers. Focus on the squeeze at the back of each rotation.' } },
    { name: 'Cat-Cow Stretch', cue: 'On hands and knees — arch up like a cat, then dip like a cow.', duration: 45, img: '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg',
      tutorial: { steps: ['Start on all fours — wrists under shoulders, knees under hips.', 'CAT: Exhale and round your spine toward the ceiling, tucking chin and tailbone.', 'Hold the cat position for 2–3 seconds. Feel the stretch in your upper back.', 'COW: Inhale and drop your belly toward the floor. Lift your head and tailbone.', 'Alternate between cat and cow slowly, syncing with your breath. Do 8 reps.'], tips: 'Let your breath drive the movement. Inhale into cow, exhale into cat. This warms up the entire spine.' } },
    { name: 'Hip Opener', cue: 'Step one foot forward into a lunge. Sink your hips low. Switch after 20 sec.', duration: 50, img: '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg',
      tutorial: { steps: ['Step your right foot forward into a low lunge position.', 'Lower your left knee to the floor (use a mat or folded towel for comfort).', 'Shift your hips forward and down — you should feel a stretch in the left hip flexor.', 'Keep your torso upright, hands on your right knee or floor for balance.', 'Hold for 20 seconds, then switch legs. Breathe deeply throughout.'], tips: 'This targets the hip flexors — the most shortened muscle group for people who sit all day. Go deeper as you warm up, not at the start.' } },
    { name: 'Seated Twist', cue: 'Sit tall. Twist gently across your knee. Hold 5 breaths each side.', duration: 40, img: '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg',
      tutorial: { steps: ['Sit cross-legged or with legs extended in front of you.', 'Place your right hand behind you on the floor for support.', 'Bring your left hand to your right knee, or wrap your left arm around your right knee.', 'On an exhale, rotate your torso to the right. Look over your right shoulder.', 'Hold for 5 slow breaths. Unwind gently, then repeat on the other side.'], tips: 'Spinal twists help decompress vertebrae and improve rotational mobility. Always twist on an exhale and sit taller before each rotation.' } },
  ];

  const [moveIndex, setMoveIndex] = useState(0);
  const [stepSeconds, setStepSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const currentMove = moves[moveIndex];
  const remaining = Math.max(currentMove.duration - stepSeconds, 0);
  const pct = stepSeconds / currentMove.duration;
  const r = 44; const circ = 2 * Math.PI * r;

  useEffect(() => {
    if (paused || showTutorial) return;
    const id = setInterval(() => {
      setStepSeconds(s => {
        const next = s + 1;
        if (next >= currentMove.duration) {
          if (moveIndex < moves.length - 1) {
            setMoveIndex(i => i + 1);
            setStepSeconds(0);
          } else { onEnd(); }
          return 0;
        }
        return next;
      });
      setTotalElapsed(t => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [paused, showTutorial, moveIndex, currentMove.duration]);

  const goTo = (idx) => { setMoveIndex(idx); setStepSeconds(0); };
  const goBack = () => moveIndex > 0 && goTo(moveIndex - 1);
  const goForward = () => moveIndex < moves.length - 1 ? goTo(moveIndex + 1) : onEnd();

  // Tutorial overlay
  if (showTutorial) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(5,10,18,0.82)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', overflow: 'hidden' }}>
      <div style={{ height: 200, flexShrink: 0, background: `linear-gradient(rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%), url(${currentMove.img}) center/cover no-repeat`, position: 'relative' }}>
        <button onClick={() => setShowTutorial(false)} style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: 20, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: 'white' }}>← Back</button>
        <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>HOW TO DO IT</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 24, color: 'white' }}>{currentMove.name}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 32px' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.teal, marginBottom: 14, letterSpacing: 0.5 }}>STEP BY STEP</div>
        {currentMove.tutorial.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: C.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 12, color: C.teal }}>{i + 1}</span>
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 14, color: C.black, lineHeight: '160%', flex: 1 }}>{step}</div>
          </div>
        ))}
        <div style={{ marginTop: 8, padding: '14px 16px', borderRadius: 12, backgroundColor: C.mintLight }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.teal, marginBottom: 6 }}>Pro tip</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: C.grayDark, lineHeight: '155%' }}>{currentMove.tutorial.tips}</div>
        </div>
        <div style={{ marginTop: 20 }}>
          <CTAButton onClick={() => { setShowTutorial(false); setPaused(false); }}>Got it — start this move</CTAButton>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      {/* Full-screen exercise image */}
      <img
        src={currentMove.img}
        alt={currentMove.name}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Dark overlay for readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.65) 100%)' }} />

      {/* Top row: progress dots only */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {moves.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{ height: 4, width: i === moveIndex ? 20 : 4, borderRadius: 2, backgroundColor: i < moveIndex ? 'rgba(20,160,130,0.9)' : i === moveIndex ? 'white' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s', cursor: 'pointer' }} />
          ))}
        </div>
      </div>

      {/* Centered circular timer over image */}
      <div
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 180, height: 180, cursor: 'pointer' }}
        onClick={() => setPaused(p => !p)}
      >
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="90" cy="90" r="80" stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="rgba(0,0,0,0.35)"/>
          <circle cx="90" cy="90" r="80" stroke="rgba(20,160,130,1)" strokeWidth="8" fill="none"
            strokeDasharray={2 * Math.PI * 80} strokeDashoffset={2 * Math.PI * 80 * (1 - pct)}
            strokeLinecap="round" transform="rotate(-90 90 90)"
            style={{ transition: 'stroke-dashoffset 0.8s linear' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 44, color: 'white', lineHeight: 1 }}>{remaining}</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>sec</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: paused ? C.orange : 'rgba(20,160,130,1)', marginTop: 6 }}>{paused ? '⏸ TAP' : '▶ TAP'}</div>
        </div>
      </div>

      {/* Left/Right nav arrows (centered vertically) */}
      <button onClick={goBack} disabled={moveIndex === 0} style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', backgroundColor: moveIndex === 0 ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.35)', border: 'none', cursor: moveIndex === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: moveIndex === 0 ? 0.3 : 1, transition: 'all 0.2s' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      <button onClick={goForward} style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.35)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>

      {/* Bottom: move name + cue + End button */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 28px' }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.70)', marginBottom: 3 }}>{moveIndex + 1} of {moves.length}</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 6 }}>{currentMove.name}</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: 'rgba(255,255,255,0.80)', lineHeight: '155%', textWrap: 'pretty' }}>{currentMove.cue}</div>
        </div>
        <button onClick={onEnd} style={{ width: '100%', height: 44, borderRadius: 22, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.20)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.90)' }}>End session</button>
      </div>
    </div>
  );
}

export default LiveSession;
