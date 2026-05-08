import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, BORDER } from '../../constants/palette';
import { useReadyAnimation } from '../../hooks/useReadyAnimation';
import { AppIcon } from '../../components/icons';

const MORE_OPTS = [
  { extra: 2, label: 'Give me 2 more minutes', sub: 'A quick bonus round' },
  { extra: 5, label: 'Give me 5 more minutes', sub: 'Keep the momentum going' },
];

export function SessionComplete({ onDone, onMore, duration = 5 }) {
  const ready = useReadyAnimation(120);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '32px 22px 28px', overflowY: 'auto' }}>
      <style>{`
        @keyframes popIn   { from { opacity:0; transform:scale(0.55) } to { opacity:1; transform:scale(1) } }
        @keyframes fadeUpS { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* Animated checkmark */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, flexShrink: 0 }}>
        <div style={{
          width: 82, height: 82, borderRadius: '50%', marginBottom: 20,
          background: 'linear-gradient(135deg, rgba(92,118,112,0.12) 0%, rgba(92,118,112,0.06) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 28px rgba(92,118,112,0.22)',
          animation: ready ? 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
          opacity: ready ? 1 : 0,
        }}>
          <svg width="36" height="26" viewBox="0 0 36 26" fill="none">
            <path
              d="M2 13l10 10L34 2"
              stroke={TEAL} strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="52"
              strokeDashoffset={ready ? 0 : 52}
              style={{ transition: 'stroke-dashoffset 0.5s ease 0.3s' }}
            />
          </svg>
        </div>

        <div style={{
          fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28,
          color: TEXT, letterSpacing: '-0.3px', marginBottom: 7,
          animation: ready ? 'fadeUpS 0.4s ease 0.2s both' : 'none', opacity: ready ? 1 : 0,
        }}>
          Nice — {duration} min done.
        </div>
        <div style={{
          fontFamily: 'Inter', fontWeight: 500, fontSize: 15,
          color: TEXT_SUB, textAlign: 'center', lineHeight: 1.55,
          animation: ready ? 'fadeUpS 0.4s ease 0.32s both' : 'none', opacity: ready ? 1 : 0,
        }}>
          Your body will thank you for this.
        </div>
      </div>

      {/* Streak card */}
      <div style={{
        borderRadius: 16, backgroundColor: '#FFFFFF',
        border: `1px solid ${BORDER}`, overflow: 'hidden', marginBottom: 20, flexShrink: 0,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        animation: ready ? 'fadeUpS 0.4s ease 0.42s both' : 'none', opacity: ready ? 1 : 0,
      }}>
        <div style={{
          padding: '14px 18px',
          background: 'linear-gradient(135deg, rgba(92,118,112,0.10) 0%, rgba(92,118,112,0.06) 100%)',
          borderBottom: `1px solid rgba(92,118,112,0.12)`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <AppIcon name="fire" size={26} color="#5C7670" />
          <div>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: TEXT }}>3-day streak</div>
            <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB }}>Goal: hip mobility</div>
          </div>
        </div>
        <div style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: TEXT_SUB }}>Progress toward goal</span>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEAL }}>35%</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              width: ready ? '35%' : '0%',
              backgroundColor: TEAL,
              transition: 'width 0.9s cubic-bezier(0.34,1.2,0.64,1) 0.5s',
            }}/>
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB, marginTop: 6 }}>
            4 more sessions to reach your hip mobility goal
          </div>
        </div>
      </div>

      {/* Options */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0,
        animation: ready ? 'fadeUpS 0.4s ease 0.52s both' : 'none', opacity: ready ? 1 : 0,
      }}>
        {MORE_OPTS.map(({ extra, label, sub }) => (
          <button key={extra} onClick={() => onMore(extra)} style={{
            width: '100%', padding: '16px 20px', borderRadius: 14,
            border: `1.5px solid ${BORDER}`, backgroundColor: '#FFFFFF',
            cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 1px 6px rgba(0,0,0,0.05)', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.backgroundColor = TEAL_LIGHT; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
          >
            <div>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: TEXT }}>{label}</div>
              <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: TEXT_SUB, marginTop: 2 }}>{sub}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        ))}

        <button onClick={onDone} style={{
          width: '100%', height: 52, borderRadius: 26, marginTop: 2,
          backgroundColor: TEAL, border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
          color: '#EFEBE4', boxShadow: '0 4px 20px rgba(92,118,112,0.28)',
        }}>
          I'm good for now
        </button>
      </div>
    </div>
  );
}

export default SessionComplete;
