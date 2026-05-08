import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, TEXT_MUTED, BG, WHITE, BORDER, SHADOW } from '../constants/palette';
import { Tag } from '../components/shared';
import { AppIcon } from '../components/icons';

const GOALS = [
  {
    id: 1, icon: 'ski', title: 'Ski trip prep',
    timeline: '4 weeks', deadline: 'May 18', progress: 60,
    focus: ['Hips', 'Knees', 'Lower Back'],
    arc: {
      prep: {
        label: 'Pre-trip prep', duration: '3 weeks',
        routines: ['Hip & knee mobility flow — 8 min', 'Lower back stabilization — 5 min', 'Balance & ankle strength — 6 min'],
      },
      event: 'Ski trip — May 18',
      recovery: {
        label: 'Post-trip recovery', duration: '1 week',
        routines: ['Gentle legs & back — 5 min', 'Hip decompression — 8 min', 'Full body release — 10 min'],
      },
    },
  },
  {
    id: 2, icon: 'yoga', title: 'Reduce desk stiffness',
    timeline: '8 weeks', deadline: 'Jun 14', progress: 35,
    focus: ['Neck', 'Shoulders', 'Back'],
    arc: {
      prep: {
        label: 'Foundation phase', duration: '4 weeks',
        routines: ['Desk stretch fundamentals — 5 min', 'Neck & shoulder relief — 3 min', 'Thoracic mobility — 6 min'],
      },
      event: 'Stiffness-free daily life',
      recovery: {
        label: 'Maintenance phase', duration: 'Ongoing',
        routines: ['Daily morning reset — 5 min', 'Evening wind-down — 8 min', 'Weekly deep release — 12 min'],
      },
    },
  },
];

const COMPLETED = [
  { icon: 'target', title: '7-day stretch challenge', date: 'Completed Apr 10', focus: 'Full Body' },
  { icon: 'spiral', title: 'Hip opener program',       date: 'Completed Mar 28', focus: 'Hips' },
];

/* ── Goal arc full-screen view ── */
function GoalArcSheet({ goal, onClose }) {
  const { arc } = goal;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50, backgroundColor: BG,
      display: 'flex', flexDirection: 'column', overflowY: 'auto',
      animation: 'slideUp 0.32s cubic-bezier(0.22,1,0.36,1) both',
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(60%) } to { transform: translateY(0) } }`}</style>

      {/* Header */}
      <div style={{
        padding: '16px 20px 14px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
      }}>
        <button onClick={onClose} style={{
          width: 34, height: 34, borderRadius: '50%',
          border: `1px solid ${BORDER}`, backgroundColor: WHITE,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7l6 6" stroke={TEXT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div>
          <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 17, color: TEXT, display: 'flex', alignItems: 'center', gap: 7 }}>
            <AppIcon name={goal.icon} size={17} color={TEXT} /> {goal.title}
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB }}>
            {goal.timeline} plan · Due {goal.deadline}
          </div>
        </div>
      </div>

      <div style={{ padding: '22px 20px', flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 22 }}>Full goal arc</div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical spine */}
          <div style={{ position: 'absolute', left: 17, top: 36, bottom: 36, width: 2, backgroundColor: TEAL_LIGHT, borderRadius: 1 }} />

          {/* Phase 1 — Prep */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              backgroundColor: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(92,118,112,0.28)', zIndex: 1,
            }}>
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <path d="M1 5.5l4 4 8-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEAL, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>
                {arc.prep.label} · {arc.prep.duration}
              </div>
              <div style={{ backgroundColor: WHITE, borderRadius: 12, border: `1px solid ${BORDER}`, boxShadow: SHADOW, overflow: 'hidden' }}>
                {arc.prep.routines.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
                    borderBottom: i < arc.prep.routines.length - 1 ? `1px solid rgba(0,0,0,0.05)` : 'none',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: TEAL, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: TEXT }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase 2 — Event */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              backgroundColor: 'rgba(92,118,112,0.10)', border: '2.5px solid #5C7670',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
            }}>
              <AppIcon name={goal.icon} size={16} color="#5C7670" />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{
                flex: 1, padding: '14px 16px', borderRadius: 12,
                backgroundColor: 'rgba(92,118,112,0.06)', border: '1.5px solid #5C7670',
                boxShadow: '0 2px 10px rgba(217,119,6,0.10)',
              }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 15, color: TEXT }}>{arc.event}</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: '#5C7670', marginTop: 2 }}>The goal</div>
              </div>
            </div>
          </div>

          {/* Phase 3 — Recovery */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              backgroundColor: TEAL_LIGHT, border: `2px solid rgba(92,118,112,0.35)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v5l3 3" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_MUTED, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>
                {arc.recovery.label} · {arc.recovery.duration}
              </div>
              <div style={{ backgroundColor: WHITE, borderRadius: 12, border: `1px solid ${BORDER}`, boxShadow: SHADOW, overflow: 'hidden' }}>
                {arc.recovery.routines.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
                    borderBottom: i < arc.recovery.routines.length - 1 ? `1px solid rgba(0,0,0,0.05)` : 'none',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: TEXT_MUTED, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: TEXT }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main screen ── */
export function GoalsLanding({ onNavigate }) {
  const [selectedGoal, setSelectedGoal] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, overflowY: 'auto', paddingBottom: 88, position: 'relative' }}>
      {selectedGoal && <GoalArcSheet goal={selectedGoal} onClose={() => setSelectedGoal(null)} />}

      <div style={{ padding: '16px 20px 0' }}>

        {/* Headline */}
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', marginBottom: 24 }}>Goals</div>

        {/* ── Active long-term goals ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_MUTED, letterSpacing: 0.9, textTransform: 'uppercase' }}>
              Active goals
            </div>
            <button onClick={() => onNavigate('goals-type')} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEAL,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke={TEAL} strokeWidth="1.5" fill="none"/>
                <path d="M7 4v6M4 7h6" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add new
            </button>
          </div>

          {GOALS.map(g => (
            <div key={g.id} style={{
              padding: '16px 18px', borderRadius: 14, cursor: 'default',
              backgroundColor: WHITE, border: `1px solid ${BORDER}`,
              boxShadow: SHADOW, marginBottom: 12,
            }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    backgroundColor: TEAL_LIGHT,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <AppIcon name={g.icon} size={20} color={TEAL} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: TEXT }}>{g.title}</div>
                    <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB }}>{g.timeline} plan</div>
                  </div>
                </div>
                <div style={{
                  padding: '4px 10px', borderRadius: 20, flexShrink: 0, marginLeft: 8,
                  backgroundColor: 'rgba(92,118,112,0.10)',
                  fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: '#5C7670',
                }}>Due {g.deadline}</div>
              </div>

              {/* Focus tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {g.focus.map(f => (
                  <Tag key={f} active style={{ fontSize: 11, borderRadius: 10, padding: '3px 9px', border: '1px solid rgba(92,118,112,0.22)' }}>{f}</Tag>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1, height: 7, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.07)' }}>
                  <div style={{ height: '100%', borderRadius: 4, backgroundColor: TEAL, width: `${g.progress}%`, transition: 'width 0.5s' }} />
                </div>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEAL, flexShrink: 0, minWidth: 30 }}>
                  {g.progress}%
                </span>
              </div>

              {/* Arc link */}
              <button onClick={() => setSelectedGoal(g)} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEAL }}>View full goal arc</span>
              </button>
            </div>
          ))}

          {/* Add new dashed button */}
          <button onClick={() => onNavigate('goals-type')} style={{
            width: '100%', padding: '14px 16px', borderRadius: 12,
            border: `1.5px dashed rgba(0,0,0,0.15)`, backgroundColor: 'transparent',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', backgroundColor: TEAL_LIGHT,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v11M1 6.5h11" stroke={TEAL} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 14, color: TEXT_SUB }}>Add something new</span>
          </button>
        </div>

        {/* ── Completed ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_MUTED, letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: 12 }}>
            Completed
          </div>
          {COMPLETED.map((g, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px', borderRadius: 14,
              backgroundColor: WHITE, border: `1px solid ${BORDER}`,
              boxShadow: SHADOW, marginBottom: 10,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                backgroundColor: TEAL_LIGHT,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <AppIcon name={g.icon} size={18} color={TEAL} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 4 }}>{g.title}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: TEXT_MUTED }}>{g.date}</span>
                  <Tag active style={{ fontSize: 11, borderRadius: 8, padding: '2px 8px', border: '1px solid rgba(92,118,112,0.22)' }}>{g.focus}</Tag>
                </div>
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                backgroundColor: TEAL_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l4 4L11 1" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoalsLanding;
