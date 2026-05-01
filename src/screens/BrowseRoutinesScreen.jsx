import React, { useState } from 'react';
import { AppHeader, Tag, BookmarkIcon } from '../components/shared';
import { C } from '../constants/colors';

export function BrowseRoutinesScreen({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Full Body', 'Back', 'Hips', 'Neck', 'Quick'];
  const routines = [
    { title: 'Morning Stretch', tags: ['FULL BODY', '5 MIN'], img: '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg', category: 'Full Body' },
    { title: 'Feel Good Flow', tags: ['SHOULDERS', 'BACK', '10 MIN'], img: '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg', category: 'Back' },
    { title: 'Hip Release', tags: ['HIPS', '8 MIN'], img: '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg', category: 'Hips' },
    { title: 'Neck & Shoulder Reset', tags: ['NECK', '3 MIN'], img: '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg', category: 'Neck' },
    { title: 'Desk Worker Flow', tags: ['BACK', 'QUICK', '5 MIN'], img: '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg', category: 'Quick' },
    { title: 'Partner Stretch', tags: ['FULL BODY', '15 MIN'], img: '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg', category: 'Full Body' },
  ];
  const filtered = routines.filter(r => {
    const matchFilter = activeFilter === 'All' || r.category === activeFilter;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: 88 }}>
      <AppHeader onCheckIn={() => onNavigate('checkin-1')} onBell={() => {}} />
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 32, color: C.black, marginBottom: 16, lineHeight: '110%' }}>Browse Routines</div>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="7" cy="7" r="6" stroke={C.teal} strokeWidth="1.5" fill="none"/>
            <path d="M11.5 11.5l3.5 3.5" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search routines..."
            style={{
              width: '100%', height: 40, borderRadius: 20, border: 'none',
              backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.10)', paddingLeft: 40, paddingRight: 16,
              fontFamily: 'Plus Jakarta Sans', fontSize: 14, color: C.teal,
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 8 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', flexShrink: 0,
              backgroundColor: activeFilter === f ? C.teal : C.grayLight,
              fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
              color: activeFilter === f ? C.white : C.black,
              transition: 'all 0.15s',
            }}>{f}</button>
          ))}
        </div>
        {/* "On your schedule" featured */}
        {activeFilter === 'All' && !search && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: C.black, marginBottom: 12 }}>On your schedule</div>
            <div style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0px 4px 11.9px rgba(0,0,0,0.15)', cursor: 'pointer' }} onClick={() => onNavigate('session-preview')}>
              <div style={{ height: 138, background: `linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 84%), url(/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg) center/cover no-repeat`, position: 'relative' }}>
                <span style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 24, color: C.white }}>Morning Stretch</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', gap: 6 }}>
                <Tag active>FULL BODY</Tag><Tag>5 MIN</Tag>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10, overflowX: 'auto', paddingBottom: 4 }}>
              {['Hip Opener', 'Neck Reset', 'Desk Flow', 'Wind Down'].map((r, i) => (
                <div key={r} onClick={() => onNavigate('session-preview')} style={{
                  flexShrink: 0, width: 80, cursor: 'pointer',
                }}>
                  <div style={{ width: 80, height: 80, borderRadius: 10, background: `url(${i % 2 === 0 ? '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg' : '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg'}) center/cover no-repeat`, marginBottom: 6, boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }} />
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: C.black, textAlign: 'center', lineHeight: '130%' }}>{r}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Results */}
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: C.black, marginBottom: 12 }}>
          {activeFilter === 'All' && !search ? 'All Routines' : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
        </div>
        {filtered.map((r) => (
          <div key={r.title} onClick={() => onNavigate('session-preview')} style={{
            borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
            boxShadow: '0px 4px 11.9px rgba(0,0,0,0.12)', marginBottom: 14,
          }}>
            <div style={{ height: 120, background: `linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 84%), url(${r.img}) center/cover no-repeat`, position: 'relative' }}>
              <span style={{ position: 'absolute', bottom: 10, left: 14, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: C.white }}>{r.title}</span>
              <BookmarkIcon />
            </div>
            <div style={{ backgroundColor: C.white, padding: '10px 14px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {r.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseRoutinesScreen;
