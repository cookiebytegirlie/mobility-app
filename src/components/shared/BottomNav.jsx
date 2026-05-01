import React from 'react';

export function HomeIcon({ active }) {
  const c = active ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.40)';
  return (<svg width="20" height="22" viewBox="0 0 20 22" fill="none"><path d="M1 8.5L10 1L19 8.5V20a1 1 0 01-1 1H13v-6H7v6H2a1 1 0 01-1-1V8.5z" stroke={c} strokeWidth={active ? 2 : 1.5} fill="none"/></svg>);
}
export function GoalsIcon({ active }) {
  const c = active ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.40)';
  return (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke={c} strokeWidth={active ? 2 : 1.5} fill="none"/><circle cx="11" cy="11" r="5" stroke={c} strokeWidth={active ? 2 : 1.5} fill="none"/><circle cx="11" cy="11" r="1.5" fill={c}/></svg>);
}
export function StretchIcon({ active }) {
  const c = active ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.40)';
  return (<svg width="20" height="24" viewBox="0 0 20 24" fill="none"><circle cx="10" cy="3" r="2.5" stroke={c} strokeWidth={active ? 2 : 1.5} fill="none"/><path d="M10 6v7M4 10l6 3 6-3M7 16l3 7M13 16l-3 7" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round"/></svg>);
}
export function RoutinesIcon({ active }) {
  const c = active ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.40)';
  return (<svg width="18" height="22" viewBox="0 0 18 22" fill="none"><rect x="1" y="1" width="16" height="20" rx="3" stroke={c} strokeWidth={active ? 2 : 1.5} fill="none"/><path d="M5 7h8M5 11h8M5 15h5" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round"/></svg>);
}
export function ProgressIcon({ active }) {
  const c = active ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.40)';
  return (<svg width="20" height="22" viewBox="0 0 20 22" fill="none"><rect x="1" y="12" width="4" height="9" rx="1" fill={c}/><rect x="8" y="7" width="4" height="14" rx="1" fill={c}/><rect x="15" y="1" width="4" height="20" rx="1" fill={c}/></svg>);
}

export function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home',     label: 'Home',     icon: HomeIcon },
    { id: 'goals',    label: 'Goals',    icon: GoalsIcon },
    { id: 'stretch',  label: 'Stretch',  icon: StretchIcon },
    { id: 'routines', label: 'Routines', icon: RoutinesIcon },
    { id: 'progress', label: 'Progress', icon: ProgressIcon },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 14, left: 14, right: 14,
      height: 62,
      backgroundColor: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      borderRadius: 100,
      border: '1px solid rgba(0,0,0,0.10)',
      boxShadow: '0 4px 28px rgba(0,0,0,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      zIndex: 100,
    }}>
      {tabs.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id;
        return (
          <button key={id} onClick={() => onTabChange(id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '6px 10px',
          }}>
            <Icon active={active} />
            <span style={{
              fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 10,
              color: active ? 'rgba(20,160,130,1)' : 'rgba(20,30,40,0.40)',
            }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;
