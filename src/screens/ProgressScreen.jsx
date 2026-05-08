import React, { useState } from 'react';
import { getSessionHistory } from '../utils/progress';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, TEXT_MUTED, BG, WHITE, BORDER, SHADOW } from '../constants/palette';
import { Tag } from '../components/shared';
import { Close, AppIcon } from '../components/icons';
import { SESSION_LOGS, CHECKIN_LOGS, ENERGY_MAP } from '../constants/data';

/* ── Static data ── */
const BODY_TRENDS = [
  { id: 'lb',   part: 'Lower back',   icon: 'trend-up',    label: 'Improving',   sub: 'Less stiffness reported',   accent: TEAL,      points: [22, 30, 42, 55, 70] },
  { id: 'neck', part: 'Neck tension', icon: 'trend-down',  label: 'Down 3 weeks', sub: 'Consistent improvement',   accent: '#16A34A', points: [18, 28, 40, 58, 74] },
  { id: 'hips', part: 'Hips',         icon: 'trend-right', label: 'Maintaining', sub: 'Stable — keep it up',       accent: '#5C7670', points: [50, 58, 50, 56, 52] },
];

const BODY_BARS = [
  { part: 'Lower Back', pct: 90 },
  { part: 'Hips',       pct: 75 },
  { part: 'Neck',       pct: 60 },
  { part: 'Shoulders',  pct: 50 },
  { part: 'Wrists',     pct: 20 },
];

const ACTIVITY_INSIGHTS = [
  { id: 'a1', icon: 'chart',  stat: '23 sessions',  sub: 'Completed this month — your most active yet' },
  { id: 'a2', icon: 'fire',   stat: '7-day streak', sub: 'Your longest streak so far. Keep going!' },
  { id: 'a3', icon: 'target', stat: 'Top 18%',       sub: 'You stretch more consistently than 82% of users your age' },
];

const RESEARCH_INSIGHTS = [
  { id: 'r1', icon: 'dna',  stat: '10 min/week',  sub: 'Studies show consistent 10 min/week mobility work reduces stiffness in 3–4 weeks' },
  { id: 'r2', icon: 'bulb', stat: '−40% tension', sub: 'Regular neck exercises reduce chronic tension headaches by up to 40% in 8 weeks' },
  { id: 'r3', icon: 'bone', stat: '30 sec holds', sub: 'Research shows static stretches held 30+ seconds produce the greatest flexibility gains' },
];


const WEEK_DAYS = ['M','T','W','T','F','S','S'];
const WEEK_DONE = [true, true, false, true, true, false, false];

/* ── Sparkline ── */
function Sparkline({ points, color = TEAL }) {
  const W = 60; const H = 28;
  const xs = points.map((_, i) => (i / (points.length - 1)) * W);
  const ys = points.map(p => (1 - p / 100) * H);
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const lx = xs[xs.length - 1].toFixed(1);
  const ly = ys[ys.length - 1].toFixed(1);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <path d={d} stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={lx} cy={ly} r="3" fill={color}/>
    </svg>
  );
}

/* ── Section label ── */
function SectionLabel({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
      color: TEXT_MUTED, letterSpacing: 0.9, textTransform: 'uppercase',
      marginBottom: 10, ...style,
    }}>{children}</div>
  );
}

/* ──────────────── TAB 1: OVERVIEW ──────────────── */
function OverviewTab() {
  const [dismissed, setDismissed] = useState([]);
  const [insightsOpen, setInsightsOpen] = useState(true);

  const dismiss = (id) => setDismissed(d => [...d, id]);

  const activityCards = ACTIVITY_INSIGHTS.filter(c => !dismissed.includes(c.id));
  const researchCards = RESEARCH_INSIGHTS.filter(c => !dismissed.includes(c.id));

  return (
    <>
      {/* ── How your body is doing ── */}
      <SectionLabel>How your body is doing</SectionLabel>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, marginBottom: 22 }}>
        {BODY_TRENDS.map(({ id, part, icon, label, sub, accent, points }) => (
          <div key={id} style={{
            flexShrink: 0, width: 148, padding: '14px 14px 12px',
            borderRadius: 14, backgroundColor: WHITE,
            border: `1px solid ${BORDER}`, boxShadow: SHADOW,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEXT, marginBottom: 3 }}>{part}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <AppIcon name={icon} size={13} color={accent} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: accent }}>{label}</span>
                </div>
              </div>
            </div>
            <Sparkline points={points} color={accent}/>
            <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: TEXT_MUTED, marginTop: 6, lineHeight: 1.4 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Weekly strip ── */}
      <div style={{
        padding: '16px 18px', borderRadius: 14,
        backgroundColor: WHITE, border: `1px solid ${BORDER}`, boxShadow: SHADOW,
        marginBottom: 22,
      }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEXT, marginBottom: 14 }}>This week</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
          {WEEK_DAYS.map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                backgroundColor: WEEK_DONE[i] ? TEAL : 'rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {WEEK_DONE[i] ? (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4.5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, color: TEXT_MUTED }}>{d}</span>
                )}
              </div>
              {WEEK_DONE[i] && (
                <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9, color: TEAL }}>{d}</span>
              )}
            </div>
          ))}
        </div>
        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'space-around',
          paddingTop: 14, borderTop: `1px solid ${BORDER}`,
        }}>
          {[['5', 'Sessions'], ['28 min', 'Time invested'], [null, 'Day streak']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18, color: TEXT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                {val === null ? <><AppIcon name="fire" size={16} color="#5C7670" /> 4</> : val}
              </div>
              <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: TEXT_MUTED, marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Insights (collapsible) ── */}
      <div style={{
        borderRadius: 14, backgroundColor: WHITE,
        border: `1px solid ${BORDER}`, boxShadow: SHADOW,
        overflow: 'hidden', marginBottom: 8,
      }}>
        {/* Toggle header */}
        <button onClick={() => setInsightsOpen(o => !o)} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px',
          background: 'none', border: 'none', cursor: 'pointer',
          borderBottom: insightsOpen ? `1px solid ${BORDER}` : 'none',
        }}>
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT }}>Insights</span>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ transform: insightsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <path d="M4 6l4 4 4-4" stroke={TEXT_SUB} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {insightsOpen && (
          <div style={{ padding: '14px 16px 16px' }}>

            {/* ── Your activity ── */}
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_MUTED, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>
              Your activity
            </div>

            {activityCards.map(({ id, icon, stat, sub }) => (
              <div key={id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '12px 14px', borderRadius: 12, marginBottom: 8,
                backgroundColor: TEAL_LIGHT, border: `1px solid rgba(92,118,112,0.16)`,
                position: 'relative',
              }}>
                <AppIcon name={icon} size={22} color={TEAL} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 16, color: TEXT, marginBottom: 2 }}>{stat}</div>
                  <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB, lineHeight: 1.5 }}>{sub}</div>
                </div>
                <button onClick={() => dismiss(id)} style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(0,0,0,0.07)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                }}>
                  <Close color={TEXT_SUB} width={8} height={8} />
                </button>
              </div>
            ))}
            {activityCards.length === 0 && (
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: TEXT_MUTED, textAlign: 'center', padding: '8px 0 12px' }}>
                All caught up on activity insights.
              </div>
            )}

            {/* Most stretched areas bar chart */}
            <div style={{ padding: '14px', borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.03)', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: TEXT, marginBottom: 12 }}>Where you've been focusing</div>
              {BODY_BARS.map(({ part, pct }, i) => (
                <div key={part} style={{ marginBottom: i < BODY_BARS.length - 1 ? 11 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT }}>{part}</span>
                    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_MUTED }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.08)' }}>
                    <div style={{
                      height: '100%', borderRadius: 3,
                      backgroundColor: TEAL,
                      width: `${pct}%`,
                    }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* ── What the research says ── */}
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: TEXT_MUTED, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>
              Why this works
            </div>

            {researchCards.map(({ id, icon, stat, sub }) => (
              <div key={id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '12px 14px', borderRadius: 12, marginBottom: 8,
                backgroundColor: 'rgba(92,118,112,0.06)', border: '1px solid rgba(92,118,112,0.15)',
                position: 'relative',
              }}>
                <AppIcon name={icon} size={22} color={TEAL} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 16, color: TEXT, marginBottom: 2 }}>{stat}</div>
                  <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_SUB, lineHeight: 1.5 }}>{sub}</div>
                </div>
                <button onClick={() => dismiss(id)} style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(0,0,0,0.07)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                }}>
                  <Close color={TEXT_SUB} width={8} height={8} />
                </button>
              </div>
            ))}
            {researchCards.length === 0 && (
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: TEXT_MUTED, textAlign: 'center', padding: '8px 0' }}>
                All research cards dismissed.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ──────────────── TAB 2: SESSIONS ──────────────── */
function SessionsTab() {
  const realHistory = getSessionHistory();

  const realCards = realHistory.map((s, i) => ({
    date: new Date(s.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    routine: s.name,
    duration: `${s.duration} min`,
    focus: s.focusAreas || [],
    img: i % 2 === 0 ? '/images/routine-couch.jpg' : '/images/routine-living-room.jpg',
    partial: s.partial,
  }));

  const allSessions = [...realCards, ...SESSION_LOGS].slice(0, 12);

  return (
    <>
      <SectionLabel>Past sessions</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {allSessions.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', borderRadius: 14,
            backgroundColor: WHITE, border: `1px solid ${BORDER}`, boxShadow: SHADOW,
          }}>
            {/* Thumbnail */}
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: `url(${s.img}) center/cover no-repeat`,
              boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
            }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT }}>{s.routine}</span>
                {s.partial && (
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 10, color: '#5C7670', backgroundColor: 'rgba(92,118,112,0.10)', padding: '1px 7px', borderRadius: 8 }}>partial</span>
                )}
              </div>
              <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_MUTED, marginBottom: 7 }}>
                {s.date} · {s.duration}
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {(s.focus || []).map(f => (
                  <Tag key={f} active style={{ fontSize: 11, borderRadius: 10, padding: '3px 9px', border: '1px solid rgba(92,118,112,0.22)' }}>{f}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ──────────────── TAB 3: CHECK-INS ──────────────── */
function CheckInsTab() {
  const [filter, setFilter] = useState('week');

  const filterPeriods = { week: ['week'], month: ['week', 'month'], year: ['week', 'month', 'year'] };
  const visible = CHECKIN_LOGS.filter(c => filterPeriods[filter].includes(c.period));

  return (
    <>
      {/* Segmented filter */}
      <div style={{
        display: 'flex', gap: 2, marginBottom: 18,
        backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 12, padding: 3,
      }}>
        {[['week', 'This week'], ['month', 'This month'], ['year', 'This year']].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 9, border: 'none', cursor: 'pointer',
            backgroundColor: filter === key ? WHITE : 'transparent',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
            color: filter === key ? TEAL : TEXT_MUTED,
            boxShadow: filter === key ? '0 1px 5px rgba(0,0,0,0.09)' : 'none',
            transition: 'all 0.15s',
          }}>{label}</button>
        ))}
      </div>

      {/* Check-in cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visible.map(({ id, date, day, energy, plans, sore, time }) => {
          const e = ENERGY_MAP[energy] || ENERGY_MAP['Good'];
          return (
            <div key={id} style={{
              padding: '14px 16px', borderRadius: 14,
              backgroundColor: WHITE, border: `1px solid ${BORDER}`, boxShadow: SHADOW,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* Energy icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  backgroundColor: e.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 2px 8px ${e.bg}`,
                }}>
                  <AppIcon name={`face-${e.face}`} size={28} color={e.color} />
                </div>

                {/* Right side content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Date + energy label row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: TEXT }}>{date}</div>
                      <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: TEXT_MUTED }}>{day}</div>
                    </div>
                    <div style={{
                      padding: '4px 10px', borderRadius: 20,
                      backgroundColor: e.bg,
                      fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
                      color: e.color,
                    }}>
                      {energy}
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {plans && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, color: TEXT_MUTED, width: 62, flexShrink: 0 }}>Plans</span>
                        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT }}>{plans}</span>
                      </div>
                    )}
                    {sore.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, color: TEXT_MUTED, width: 62, flexShrink: 0, paddingTop: 2 }}>What was bothering you</span>
                        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                          {sore.map(s => (
                            <Tag key={s} active style={{ fontSize: 11, borderRadius: 10, padding: '3px 9px', border: '1px solid rgba(92,118,112,0.22)' }}>{s}</Tag>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, color: TEXT_MUTED, width: 62, flexShrink: 0 }}>Time</span>
                      <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 12, color: TEXT }}>{time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '40px 20px',
            fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: TEXT_MUTED,
          }}>
            No check-ins recorded for this period.
          </div>
        )}
      </div>
    </>
  );
}

/* ──────────────── MAIN ──────────────── */
export function ProgressScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview');

  const TABS = [
    { id: 'overview',  label: 'Overview' },
    { id: 'sessions',  label: 'Sessions' },
    { id: 'check-ins', label: 'Check-Ins' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, overflowY: 'auto', paddingBottom: 88 }}>
      <div style={{ padding: '20px 20px 0' }}>
        {/* Header */}
        <div style={{ fontFamily: 'Denim Ink', fontWeight: 600, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', marginBottom: 18 }}>
          Progress
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex', gap: 2, marginBottom: 22,
          backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 12, padding: 3,
        }}>
          {TABS.map(({ id, label }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              flex: 1, padding: '9px 4px', borderRadius: 9, border: 'none', cursor: 'pointer',
              backgroundColor: activeTab === id ? WHITE : 'transparent',
              fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
              color: activeTab === id ? TEAL : TEXT_MUTED,
              boxShadow: activeTab === id ? '0 1px 5px rgba(0,0,0,0.09)' : 'none',
              transition: 'all 0.15s',
            }}>{label}</button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview'  && <OverviewTab />}
        {activeTab === 'sessions'  && <SessionsTab />}
        {activeTab === 'check-ins' && <CheckInsTab />}
      </div>
    </div>
  );
}

export default ProgressScreen;
