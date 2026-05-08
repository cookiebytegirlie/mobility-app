import React, { useState } from 'react';
import { AppIcon } from '../icons';

const TEAL = '#5C7670';
const TEAL_LIGHT = 'rgba(92,118,112,0.12)';
const TEXT = '#300A09';
const TEXT_SUB = '#5C4A3A';
const BG = '#EFEBE4';
const BORDER = 'rgba(0,0,0,0.08)';

export const REGION_SUBAREAS = {
  'Neck':       ['Left side', 'Right side', 'Base of skull', 'All over'],
  'Shoulders':  ['Left shoulder', 'Right shoulder', 'Both shoulders'],
  'Upper Back': ['Left side', 'Right side', 'Between shoulder blades', 'All over'],
  'Lower Back': ['Left side', 'Right side', 'Base of spine', 'Both sides'],
  'Hips':       ['Left hip', 'Right hip', 'Both hips', 'Front of hips'],
  'Knees':      ['Left knee', 'Right knee', 'Both knees'],
  'Ankles':     ['Left ankle', 'Right ankle', 'Both ankles'],
  'Wrists':     ['Left wrist', 'Right wrist', 'Both wrists'],
};

const INTENSITIES = [
  { id: 'tight',   label: 'Just a little tight' },
  { id: 'sore',    label: 'Pretty sore'         },
  { id: 'painful', label: 'Really painful'      },
];

/* ─── SVG silhouette (front or back view) ─── */
export function Silhouette({ view, selectedRegions, hoverRegion, onRegionClick, onRegionHover }) {
  const fill   = view === 'front' ? '#E6F4F0' : '#EAF2EE';
  const stroke = '#BDD8D0';

  const zoneFill   = (id) => selectedRegions.includes(id) ? 'rgba(92,118,112,0.32)' : hoverRegion === id ? 'rgba(92,118,112,0.14)' : 'transparent';
  const zoneStroke = (id) => selectedRegions.includes(id) ? TEAL : 'transparent';
  const labelFill  = (id) => selectedRegions.includes(id) ? TEAL : '#5A6672';

  const zp = (id) => ({
    fill: zoneFill(id), stroke: zoneStroke(id), strokeWidth: 1.5,
    style: { cursor: 'pointer' },
    onClick: () => onRegionClick(id),
    onMouseEnter: () => onRegionHover(id),
    onMouseLeave: () => onRegionHover(null),
  });

  const ls = (id, extra = {}) => ({
    fontSize: '4.8px', fontFamily: 'Inter, sans-serif',
    fontWeight: 700, fill: labelFill(id), pointerEvents: 'none',
    ...extra,
  });

  return (
    <svg viewBox="0 0 76 196" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      {/* ── Silhouette ── */}
      <ellipse cx="38" cy="12" rx="11" ry="11.5" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <rect x="33" y="22.5" width="10" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M21,29 C17,37 16,57 18,74 C19,84 25,91 38,91 C51,91 57,84 58,74 C60,57 59,37 55,29 C49,26 43,24 38,24 C33,24 27,26 21,29Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M21,33 C15,42 9,61 8,79 C7,88 9,95 12,96 C15,97 17,94 17,88 C17,76 20,57 25,43 C27,36 26,30 23,31Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M55,33 C61,42 67,61 68,79 C69,88 67,95 64,96 C61,97 59,94 59,88 C59,76 56,57 51,43 C49,36 50,30 53,31Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <ellipse cx="11.5" cy="99" rx="5.5" ry="6" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <ellipse cx="64.5" cy="99" rx="5.5" ry="6" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M23,91 C19,99 20,111 24,116 L52,116 C56,111 57,99 53,91Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M22,114 C18,124 18,137 21,147 C23,154 30,156 34,154 C38,152 38,145 37,135 C35,123 31,113 27,112Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M54,114 C58,124 58,137 55,147 C53,154 46,156 42,154 C38,152 38,145 39,135 C41,123 45,113 49,112Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <ellipse cx="28" cy="157" rx="8" ry="6" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <ellipse cx="48" cy="157" rx="8" ry="6" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <rect x="21" y="162" width="14" height="22" rx="5" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <rect x="41" y="162" width="14" height="22" rx="5" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <ellipse cx="28" cy="186" rx="7.5" ry="4.5" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <ellipse cx="48" cy="186" rx="7.5" ry="4.5" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M18,188 C16,191 18,194 23,194 L34,194 C37,193 37,191 35,189 C33,187 30,186 27,186Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      <path d="M38,188 C36,191 38,194 43,194 L54,194 C57,193 57,191 55,189 C53,187 50,186 47,186Z" fill={fill} stroke={stroke} strokeWidth="1.2"/>
      {view === 'back' && <line x1="38" y1="30" x2="38" y2="89" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="2,3"/>}

      {/* ── Zones ── */}
      {view === 'front' && <>
        <ellipse cx="38" cy="26" rx="10" ry="8.5" {...zp('Neck')}/>
        <ellipse cx="15" cy="37" rx="11" ry="8" {...zp('Shoulders')}/>
        <ellipse cx="61" cy="37" rx="11" ry="8" {...zp('Shoulders')}/>
        <ellipse cx="38" cy="105" rx="17" ry="11" {...zp('Hips')}/>
        <ellipse cx="28" cy="157" rx="10" ry="8" {...zp('Knees')}/>
        <ellipse cx="48" cy="157" rx="10" ry="8" {...zp('Knees')}/>
        <ellipse cx="28" cy="186" rx="9.5" ry="7.5" {...zp('Ankles')}/>
        <ellipse cx="48" cy="186" rx="9.5" ry="7.5" {...zp('Ankles')}/>
        <ellipse cx="11.5" cy="99" rx="8" ry="9" {...zp('Wrists')}/>
        <ellipse cx="64.5" cy="99" rx="8" ry="9" {...zp('Wrists')}/>
      </>}
      {view === 'back' && <>
        <rect x="20" y="30" width="36" height="30" rx="8" {...zp('Upper Back')}/>
        <rect x="22" y="62" width="32" height="26" rx="7" {...zp('Lower Back')}/>
      </>}

      {/* ── Labels ── */}
      {view === 'front' && <>
        <text x="38" y="27.5" textAnchor="middle" style={ls('Neck')}>Neck</text>
        <text x="15" y="38.5" textAnchor="middle" style={ls('Shoulders', { fontSize: '4.3px' })}>Shoulder</text>
        <text x="61" y="38.5" textAnchor="middle" style={ls('Shoulders', { fontSize: '4.3px' })}>Shoulder</text>
        <text x="38" y="106" textAnchor="middle" style={ls('Hips')}>Hips</text>
        <text x="28" y="158.5" textAnchor="middle" style={ls('Knees', { fontSize: '4.2px' })}>Knee</text>
        <text x="48" y="158.5" textAnchor="middle" style={ls('Knees', { fontSize: '4.2px' })}>Knee</text>
        <text x="28" y="187.5" textAnchor="middle" style={ls('Ankles', { fontSize: '4px' })}>Ankle</text>
        <text x="48" y="187.5" textAnchor="middle" style={ls('Ankles', { fontSize: '4px' })}>Ankle</text>
        <text x="11.5" y="100" textAnchor="middle" style={ls('Wrists', { fontSize: '4px' })}>Wrist</text>
        <text x="64.5" y="100" textAnchor="middle" style={ls('Wrists', { fontSize: '4px' })}>Wrist</text>
      </>}
      {view === 'back' && <>
        <text x="38" y="48" textAnchor="middle" style={ls('Upper Back')}>Upper Back</text>
        <text x="38" y="77" textAnchor="middle" style={ls('Lower Back')}>Lower Back</text>
      </>}
    </svg>
  );
}

/* ─── Full 3-level interactive body map ─── */
export function InteractiveBodyMap({
  title, subtitle, onNext, onBack, showSkip = false,
  progressStep, progressTotal, onExit,
}) {
  const [level, setLevel]           = useState(1);
  const [activeRegion, setActive]   = useState(null);
  const [activeSubArea, setSubArea] = useState(null);
  const [selections, setSelections] = useState([]);
  const [hoverRegion, setHover]     = useState(null);

  const selectedIds  = selections.map(s => s.region);
  const hasSelection = selections.length > 0;

  const handleRegionClick = (region) => { setActive(region); setSubArea(null); setLevel(2); };
  const handleSubAreaClick = (sub)   => { setSubArea(sub); setLevel(3); };

  const handleIntensityClick = (intensity) => {
    setSelections(prev => [
      ...prev.filter(s => s.region !== activeRegion),
      { region: activeRegion, subArea: activeSubArea, intensity },
    ]);
    setLevel(1); setActive(null); setSubArea(null);
  };

  const removeSelection = (region) => setSelections(prev => prev.filter(s => s.region !== region));

  const BackBtn = ({ onClick: click }) => (
    <button onClick={click} style={{
      width: 36, height: 36, borderRadius: '50%', background: '#FFFFFF',
      border: `1px solid ${BORDER}`, cursor: 'pointer', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
        <path d="M8 1L1 7.5L8 14" stroke={TEXT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );

  /* Level 2 */
  if (level === 2) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '16px 24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <BackBtn onClick={() => setLevel(1)} />
        <div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_SUB, letterSpacing: 0.8, textTransform: 'uppercase' }}>Selecting</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 20, color: TEXT }}>{activeRegion}</div>
        </div>
      </div>
      <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: TEXT_SUB, marginBottom: 20 }}>Which part?</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(REGION_SUBAREAS[activeRegion] || []).map(sub => (
          <button key={sub} onClick={() => handleSubAreaClick(sub)} style={{
            width: '100%', padding: '16px 20px', borderRadius: 14,
            border: `1.5px solid ${BORDER}`, backgroundColor: '#FFFFFF',
            cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600,
            fontSize: 15, color: TEXT, textAlign: 'left',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.12s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.backgroundColor = TEAL_LIGHT; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
          >{sub}</button>
        ))}
      </div>
    </div>
  );

  /* Level 3 */
  if (level === 3) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, padding: '16px 24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <BackBtn onClick={() => setLevel(2)} />
        <div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_SUB, letterSpacing: 0.8, textTransform: 'uppercase' }}>{activeRegion}</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 20, color: TEXT }}>{activeSubArea}</div>
        </div>
      </div>
      <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: TEXT_SUB, marginBottom: 24 }}>How bad is it right now?</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {INTENSITIES.map(({ id, label }) => (
          <button key={id} onClick={() => handleIntensityClick(id)} style={{
            width: '100%', padding: '20px', borderRadius: 14,
            border: `1.5px solid ${BORDER}`, backgroundColor: '#FFFFFF',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.12s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.backgroundColor = TEAL_LIGHT; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
          >
            <AppIcon name={`face-${id}`} size={26} color={TEAL} />
            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 16, color: TEXT }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  /* Level 1 */
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: BG, overflow: 'hidden' }}>
      {/* Progress bar */}
      {progressStep && progressTotal && (
        <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
          <div style={{ width: '100%', height: 3, borderRadius: 2, backgroundColor: '#E8E0D5' }}>
            <div style={{
              height: '100%', borderRadius: 2,
              background: 'linear-gradient(90deg, #5C7670, #5C7670)',
              width: `${(progressStep / progressTotal) * 100}%`,
              transition: 'width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
              willChange: 'width',
            }} />
          </div>
        </div>
      )}

      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 0', flexShrink: 0 }}>
        <BackBtn onClick={onBack} />
        {onExit && (
          <button onClick={onExit} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#FFFFFF', border: `1px solid ${BORDER}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke={TEXT} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Title */}
      <div style={{ padding: '10px 24px 0', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: TEXT_SUB, marginTop: 4 }}>{subtitle}</div>
      </div>

      {/* Selected region tags */}
      {selections.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 24px 0', flexShrink: 0 }}>
          {selections.map(s => (
            <div key={s.region} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 10px 4px 12px', borderRadius: 20,
              backgroundColor: TEAL_LIGHT, border: `1px solid ${TEAL}`,
            }}>
              <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEAL }}>{s.region}</span>
              <button onClick={() => removeSelection(s.region)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: TEAL, fontSize: 14, lineHeight: 1, padding: 0, display: 'flex', alignItems: 'center',
              }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Front + back silhouettes */}
      <div style={{ flex: 1, display: 'flex', gap: 8, padding: '8px 20px 0', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: TEXT_SUB, letterSpacing: 0.8, textTransform: 'uppercase', textAlign: 'center', marginBottom: 5, flexShrink: 0 }}>Front</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Silhouette view="front" selectedRegions={selectedIds} hoverRegion={hoverRegion} onRegionClick={handleRegionClick} onRegionHover={setHover}/>
          </div>
        </div>
        <div style={{ width: 1, backgroundColor: BORDER, margin: '24px 0', flexShrink: 0 }}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: TEXT_SUB, letterSpacing: 0.8, textTransform: 'uppercase', textAlign: 'center', marginBottom: 5, flexShrink: 0 }}>Back</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Silhouette view="back" selectedRegions={selectedIds} hoverRegion={hoverRegion} onRegionClick={handleRegionClick} onRegionHover={setHover}/>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ flexShrink: 0, padding: '10px 24px 28px' }}>
        <button onClick={() => onNext(selections)} style={{
          width: '100%', height: 50, borderRadius: 25, marginBottom: 10,
          backgroundColor: TEAL,
          border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 16,
          color: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(92,118,112,0.28)',
        }}>
          Continue{hasSelection ? ` (${selections.length} area${selections.length > 1 ? 's' : ''})` : ''}
        </button>
        {showSkip && (
          <button onClick={() => onNext([])} style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: '#A07060', padding: '4px 0',
          }}>Skip</button>
        )}
      </div>
    </div>
  );
}
