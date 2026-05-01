import React, { useState } from 'react';
import { Tag } from '../components/shared';
import { C } from '../constants/colors';

export function ProgressScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview');
  const days = ['M','T','W','T','F','S','S'];
  const done = [true, true, false, true, true, false, false];

  const bodyPartData = [
    { part: 'Lower Back', sessions: 18, pct: 90 },
    { part: 'Hips', sessions: 15, pct: 75 },
    { part: 'Neck', sessions: 12, pct: 60 },
    { part: 'Shoulders', sessions: 10, pct: 50 },
    { part: 'Hamstrings', sessions: 6, pct: 30 },
    { part: 'Wrists', sessions: 4, pct: 20 },
  ];

  const sessionLogs = [
    { date: 'Today, 7:42 AM', routine: 'Morning Stretch', duration: '5 min', focus: ['Neck', 'Back'] },
    { date: 'Yesterday, 7:55 AM', routine: 'Hip Release Flow', duration: '8 min', focus: ['Hips', 'Lower Back'] },
    { date: 'Apr 20, 6:30 PM', routine: 'Desk Break Reset', duration: '3 min', focus: ['Shoulders'] },
    { date: 'Apr 19, 8:10 AM', routine: 'Morning Stretch', duration: '5 min', focus: ['Neck', 'Back'] },
    { date: 'Apr 18, 12:15 PM', routine: 'Full Body Flow', duration: '10 min', focus: ['Full Body'] },
  ];

  const checkInLogs = [
    { date: 'Today', energy: 'Good', plans: 'Office work', sore: ['Neck', 'Shoulders'], time: '5 min' },
    { date: 'Yesterday', energy: 'Amazing', plans: 'Work from home', sore: ['Lower Back'], time: '10 min' },
    { date: 'Apr 20', energy: 'Okay', plans: 'Running/walking', sore: ['Hips', 'Knees'], time: '5 min' },
    { date: 'Apr 19', energy: 'Good', plans: 'Office work', sore: ['Neck'], time: '5 min' },
  ];

  const insightCards = [
    { icon: '📊', stat: 'Top 18%', sub: 'You stretch more than 82% of people your age', color: C.mintLight },
    { icon: '🧬', stat: 'Ahead by 34%', sub: 'Studies show daily mobility routines slow joint decline through age 90', color: '#EEF4FF' },
    { icon: '⚡', stat: '23 sessions', sub: 'Completed this month — your most active yet', color: '#FFF4EA' },
    { icon: '🦴', stat: '-40% stiffness', sub: 'Estimated reduction based on your lower back focus and check-ins', color: C.mintLight },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: 88 }}>
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, marginBottom: 16 }}>Progress</div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, backgroundColor: C.grayLight, borderRadius: 12, padding: 4 }}>
          {['overview', 'sessions', 'check-ins'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              flex: 1, padding: '8px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
              backgroundColor: activeTab === t ? C.white : 'transparent',
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 12,
              color: activeTab === t ? C.teal : C.grayMid,
              boxShadow: activeTab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s', textTransform: 'capitalize',
            }}>{t === 'check-ins' ? 'Check-Ins' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* This week */}
            <div style={{ padding: '18px', borderRadius: 14, backgroundColor: 'rgba(20,160,130,0.10)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(20,160,130,0.20)', marginBottom: 20 }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.teal, marginBottom: 14 }}>This week</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 14 }}>
                {days.map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: done[i] ? C.teal : 'rgba(39,89,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {done[i] ? (
                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path d="M1 5l4 4 7-8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      ) : (
                        <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 11, color: 'rgba(39,89,89,0.4)' }}>{d}</span>
                      )}
                    </div>
                    {done[i] && <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 10, color: C.teal }}>{d}</span>}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {[['5', 'Sessions'], ['28 min', 'Total time'], ['🔥 4', 'Day streak']].map(([val, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 20, color: C.black }}>{val}</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 11, color: C.tealMid }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight cards */}
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.grayMid, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Your insights</div>
            {insightCards.map(({ icon, stat, sub, color }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, backgroundColor: color, marginBottom: 10, boxShadow: '0px 2px 3px rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 18, color: C.black, marginBottom: 3 }}>{stat}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: C.grayDark, lineHeight: '150%', textWrap: 'pretty' }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Body parts heatmap */}
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.grayMid, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, marginTop: 8 }}>Most stretched areas</div>
            <div style={{ padding: '16px', borderRadius: 12, backgroundColor: C.white, boxShadow: '0 2px 10px rgba(0,0,0,0.07)', marginBottom: 8 }}>
              {bodyPartData.map(({ part, sessions, pct }, i) => (
                <div key={part} style={{ marginBottom: i < bodyPartData.length - 1 ? 14 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13, color: C.black }}>{part}</span>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 12, color: C.tealMid }}>{sessions} sessions</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 4, backgroundColor: C.grayLight }}>
                    <div style={{
                      height: '100%', borderRadius: 4,
                      background: `linear-gradient(90deg, ${C.teal}, ${C.tealMid})`,
                      width: `${pct}%`, transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'sessions' && (
          <>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.grayMid, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Past sessions</div>
            {sessionLogs.map((s, i) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 12, backgroundColor: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `url(/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg) center/cover no-repeat`, flexShrink: 0, opacity: 0.85 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.black, marginBottom: 2 }}>{s.routine}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 11, color: C.grayMid, marginBottom: 6 }}>{s.date} · {s.duration}</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {s.focus.map(f => <Tag key={f}>{f}</Tag>)}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'check-ins' && (
          <>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.grayMid, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Check-in history</div>
            {checkInLogs.map((c, i) => (
              <div key={i} style={{ padding: '16px', borderRadius: 12, backgroundColor: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.black }}>{c.date}</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: C.tealMid, backgroundColor: C.mintLight, padding: '3px 10px', borderRadius: 20 }}>Energy: {c.energy}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: C.grayMid, width: 70, flexShrink: 0 }}>Plans</span>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: C.black }}>{c.plans}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: C.grayMid, width: 70, flexShrink: 0 }}>Sore areas</span>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {c.sore.map(s => <Tag key={s} active>{s}</Tag>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: C.grayMid, width: 70, flexShrink: 0 }}>Time avail.</span>
                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: C.black }}>{c.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ProgressScreen;
