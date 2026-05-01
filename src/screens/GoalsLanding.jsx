import React from 'react';
import { Tag } from '../components/shared';
import { C } from '../constants/colors';

export function GoalsLanding({ onNavigate }) {
  const longTermGoals = [
    { id: 1, title: 'Ski trip prep', timeline: '4 weeks', deadline: 'May 18', focus: 'Hips, Knees, Lower Back', progress: 60, status: 'active' },
    { id: 2, title: 'Reduce desk stiffness', timeline: '8 weeks', deadline: 'Jun 14', focus: 'Neck, Shoulders, Back', progress: 35, status: 'active' },
  ];
  const completedGoals = [
    { title: '7-day stretch challenge', date: 'Completed Apr 10', focus: 'Full Body', weeks: '1 week' },
    { title: 'Hip opener program', date: 'Completed Mar 28', focus: 'Hips', weeks: '3 weeks' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: 88 }}>
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, marginBottom: 24 }}>Goals</div>

        {/* Overall / Baseline Goal from onboarding */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.grayMid, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>From your profile</div>
          <div style={{ padding: '18px', borderRadius: 14, background: `linear-gradient(135deg, ${C.mintLight} 0%, rgb(190,255,233) 100%)`, boxShadow: '0px 2px 8px rgba(39,89,89,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 20, color: C.black, marginBottom: 4 }}>Daily Mobility</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: C.tealMid }}>10 min/day · Morning sessions</div>
              </div>
              <div style={{ padding: '5px 12px', borderRadius: 20, backgroundColor: C.teal }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 10, color: 'white', letterSpacing: 0.5 }}>ACTIVE</span>
              </div>
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 12, color: C.teal, marginBottom: 8 }}>Focus areas</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Lower Back', 'Hips', 'Neck', 'Shoulders'].map(f => <Tag key={f} active>{f}</Tag>)}
            </div>
          </div>
        </div>

        {/* Long-Term Goals */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.grayMid, letterSpacing: 1, textTransform: 'uppercase' }}>Long-term goals</div>
            <button onClick={() => onNavigate('goals-type')} style={{
              display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.tealMid,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke={C.tealMid} strokeWidth="1.5" fill="none"/>
                <path d="M7 4v6M4 7h6" stroke={C.tealMid} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add new
            </button>
          </div>
          {longTermGoals.map((g) => (
            <div key={g.id} style={{ padding: '16px', borderRadius: 12, backgroundColor: C.white, boxShadow: '0px 2px 10px rgba(0,0,0,0.07)', marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: C.black }}>{g.title}</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: C.orange, backgroundColor: '#FFF4EA', padding: '3px 10px', borderRadius: 20, flexShrink: 0, marginLeft: 8 }}>
                  Due {g.deadline}
                </div>
              </div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: C.grayDark, marginBottom: 12 }}>{g.focus}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ flex: 1, height: 7, borderRadius: 4, backgroundColor: C.grayLight }}>
                  <div style={{ height: '100%', borderRadius: 4, backgroundColor: C.teal, width: `${g.progress}%`, transition: 'width 0.5s' }} />
                </div>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.teal, flexShrink: 0, minWidth: 32 }}>{g.progress}%</span>
              </div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 11, color: C.grayMid }}>{g.timeline} plan · {100 - g.progress}% remaining</div>
            </div>
          ))}
          {/* Add new */}
          <button onClick={() => onNavigate('goals-type')} style={{
            width: '100%', padding: '14px 16px', borderRadius: 12, border: `1.5px dashed ${C.border}`,
            backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: C.mintLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v11M1 6.5h11" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 14, color: C.grayDark }}>Set a new long-term goal</span>
          </button>
        </div>

        {/* Completed Goals */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: C.grayMid, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Completed</div>
          {completedGoals.map((g, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px', borderRadius: 12, backgroundColor: C.grayLight, marginBottom: 10,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: C.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                  <path d="M1 6l5 5L14 1" stroke={C.teal} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: C.black, marginBottom: 3 }}>{g.title}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 11, color: C.grayMid }}>{g.date}</span>
                  <Tag>{g.focus}</Tag>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoalsLanding;
