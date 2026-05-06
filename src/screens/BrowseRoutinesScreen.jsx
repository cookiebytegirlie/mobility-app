import React, { useState } from 'react';
import { TEAL, TEAL_LIGHT, TEXT, TEXT_SUB, BG, WHITE, BORDER, SHADOW } from '../constants/palette';
import { Tag } from '../components/shared';
import { ROUTINES } from '../constants/data';

const FILTER_GROUPS = [
  { key: 'body', label: 'Body', chips: ['Full Body', 'Back', 'Hips', 'Neck', 'Shoulders'] },
  { key: 'env',  label: 'Environment', chips: ['Desk', 'Home', 'Park', 'Gym'] },
  { key: 'vibe', label: 'Vibe', chips: ['Gentle wake-up', 'Stress relief', 'Energy boost', 'Wind down'] },
];

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flexShrink: 0, padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
      backgroundColor: active ? TEAL : WHITE,
      border: `1px solid ${active ? TEAL : BORDER}`,
      fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 13,
      color: active ? WHITE : TEXT_SUB,
      boxShadow: active ? '0 2px 8px rgba(61,171,142,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
      transition: 'all 0.15s',
    }}>{label}</button>
  );
}

export function BrowseRoutinesScreen({ onNavigate }) {
  const [search, setSearch]         = useState('');
  const [filters, setFilters]       = useState({ body: [], env: [], vibe: [] });

  const toggle = (group, chip) =>
    setFilters(prev => ({
      ...prev,
      [group]: prev[group].includes(chip)
        ? prev[group].filter(c => c !== chip)
        : [...prev[group], chip],
    }));

  const hasFilters = Object.values(filters).some(f => f.length > 0);

  const visible = ROUTINES.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.sub.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.body.length > 0 && !filters.body.some(f => r.body.includes(f))) return false;
    if (filters.env.length  > 0 && !filters.env.some(f  => r.env.includes(f)))  return false;
    if (filters.vibe.length > 0 && !filters.vibe.some(f => r.vibe.includes(f))) return false;
    return true;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: BG, overflowY: 'auto', paddingBottom: 88 }}>
      <div style={{ padding: '16px 20px 0' }}>

        {/* Headline */}
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: TEXT, letterSpacing: '-0.3px', marginBottom: 16 }}>
          Find a move
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="6.5" cy="6.5" r="5" stroke={TEXT_SUB} strokeWidth="1.5" fill="none"/>
            <path d="M10.5 10.5l3 3" stroke={TEXT_SUB} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="What do you need right now?"
            style={{
              width: '100%', height: 42, borderRadius: 12, boxSizing: 'border-box',
              border: `1px solid ${BORDER}`, backgroundColor: WHITE,
              paddingLeft: 36, paddingRight: 16,
              fontFamily: 'Plus Jakarta Sans', fontSize: 14, color: TEXT,
              outline: 'none', boxShadow: SHADOW,
            }}
          />
        </div>

        {/* ── Three filter rows ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {FILTER_GROUPS.map(({ key, label, chips }) => (
            <div key={key}>
              <div style={{
                fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 11,
                color: TEXT_SUB, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8,
              }}>{label}</div>
              <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
                {chips.map(chip => (
                  <Chip
                    key={chip}
                    label={chip}
                    active={filters[key].includes(chip)}
                    onClick={() => toggle(key, chip)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* On your schedule (no filters) */}
        {!hasFilters && !search && (
          <div style={{ marginBottom: 26 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: TEXT, marginBottom: 14 }}>Good for today</div>
            <div onClick={() => onNavigate('session-preview')} style={{
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
            }}>
              <div style={{
                height: 138, position: 'relative',
                background: `linear-gradient(rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.48) 85%), url(/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg) center/cover no-repeat`,
              }}>
                <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 20, color: 'white' }}>For your lower back</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: 'rgba(255,255,255,0.80)', marginTop: 2 }}>5 min · Morning session</div>
                </div>
              </div>
              <div style={{ backgroundColor: WHITE, padding: '10px 14px', display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Tag active>Full body</Tag>
                  <Tag>5 min</Tag>
                </div>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1l5 5-5 5" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Mini scroll strip */}
            <div style={{ display: 'flex', gap: 10, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {['Hip opener', 'Neck reset', 'Desk flow', 'Wind down'].map((label, i) => (
                <div key={label} onClick={() => onNavigate('session-preview')} style={{ flexShrink: 0, width: 80, cursor: 'pointer' }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: 12, marginBottom: 6,
                    background: `url(${i % 2 === 0 ? '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg' : '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg'}) center/cover no-repeat`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
                  }} />
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: 11, color: TEXT, textAlign: 'center', lineHeight: 1.3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results heading */}
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: TEXT, marginBottom: 14 }}>
          {hasFilters || search
            ? `${visible.length} result${visible.length !== 1 ? 's' : ''}`
            : 'Everything'}
        </div>

        {/* Routine cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
          {visible.map((r, i) => (
            <div key={i} onClick={() => onNavigate('session-preview')} style={{
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
              boxShadow: SHADOW,
            }}>
              <div style={{
                height: 110, position: 'relative',
                background: `linear-gradient(rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.44) 85%), url(${r.img}) center/cover no-repeat`,
              }}>
                <div style={{ position: 'absolute', bottom: 11, left: 14 }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: 'white' }}>{r.title}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 2 }}>{r.sub}</div>
                </div>
              </div>
              <div style={{ backgroundColor: WHITE, padding: '10px 14px', display: 'flex', gap: 6 }}>
                {r.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'Plus Jakarta Sans', fontSize: 14, color: TEXT_SUB }}>
              No routines match these filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseRoutinesScreen;
