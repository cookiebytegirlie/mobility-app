import React, { useState } from 'react';
import { Tag } from './Tag';
import { BookmarkIcon } from './BookmarkIcon';

export function RoutineCard({ title, subtitle, tags = [], image, onClick, compact = false }) {
  const [pressed, setPressed] = useState(false);
  const glassPanel = {
    backgroundColor: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  };
  if (compact) {
    return (
      <div onClick={onClick} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
        style={{
          borderRadius: 10, overflow: 'hidden',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.35)', cursor: 'pointer',
          transform: pressed ? 'scale(0.97)' : 'scale(1)',
          transition: 'transform 0.15s', marginBottom: 16,
        }}>
        <div style={{
          height: 138,
          background: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 84%), url(${image}) center/cover no-repeat`,
          position: 'relative',
        }}>
          <span style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 24, color: 'rgba(255,255,255,1)', lineHeight: '100%' }}>{title}</span>
          <BookmarkIcon />
        </div>
        <div style={{ ...glassPanel, padding: '12px 16px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tags.map(t => <Tag key={t}>{t}</Tag>)}
          {subtitle && <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: 'rgba(20,30,40,0.65)', alignSelf: 'center' }}>{subtitle}</span>}
        </div>
      </div>
    );
  }
  return (
    <div onClick={onClick} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      style={{
        borderRadius: 10, overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.35)', cursor: 'pointer',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.15s', marginBottom: 16,
      }}>
      <div style={{
        height: 194,
        background: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 84%), url(${image}) center/cover no-repeat`,
        position: 'relative',
      }}>
        <span style={{ position: 'absolute', bottom: 16, left: 18, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,1)', lineHeight: '100%' }}>{title}</span>
        <BookmarkIcon />
      </div>
      <div style={{ ...glassPanel, padding: '14px 18px' }}>
        {subtitle && <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: 'rgba(20,30,40,0.95)', marginBottom: 4 }}>{subtitle}</div>}
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: 13, color: 'rgba(20,30,40,0.65)', marginBottom: 10 }}>Relax your body to start your day.</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </div>
  );
}

export default RoutineCard;
