import React from 'react';

const PATHS = {
  fire: (
    <>
      <path d="M10 2c0 3-3 4-3 7a3 3 0 006 0c0-1.5-1-2.5-1-4 1 1 2 2.5 2 4a4 4 0 01-8 0c0-4 4-5 4-7z" strokeLinejoin="round"/>
      <path d="M10 14v1" strokeLinecap="round"/>
    </>
  ),
  chart: (
    <>
      <rect x="2" y="13" width="3" height="5" rx="0.5"/>
      <rect x="8.5" y="9" width="3" height="9" rx="0.5"/>
      <rect x="15" y="5" width="3" height="13" rx="0.5"/>
    </>
  ),
  target: (
    <>
      <circle cx="10" cy="10" r="8"/>
      <circle cx="10" cy="10" r="4.5"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    </>
  ),
  dna: (
    <>
      <path d="M5 2c1 3 5 4 5 8s-4 5-5 8" strokeLinecap="round"/>
      <path d="M15 2c-1 3-5 4-5 8s4 5 5 8" strokeLinecap="round"/>
      <path d="M7 5.5h6M7 14.5h6" strokeLinecap="round"/>
    </>
  ),
  bulb: (
    <>
      <path d="M10 2a6 6 0 014 10.5V14a1 1 0 01-1 1H7a1 1 0 01-1-1v-1.5A6 6 0 0110 2z" strokeLinejoin="round"/>
      <path d="M7.5 15h5M8 18h4" strokeLinecap="round"/>
    </>
  ),
  bone: (
    <>
      <path d="M6 4a2 2 0 010 4L14 16a2 2 0 014 0 2 2 0 01-4 0L6 8a2 2 0 010-4z" strokeLinejoin="round"/>
      <circle cx="4.5" cy="6" r="2"/>
      <circle cx="15.5" cy="15" r="2"/>
    </>
  ),
  lightning: (
    <>
      <path d="M12 2L5 11h7l-2 7 8-10h-7l1-6z" strokeLinejoin="round"/>
    </>
  ),
  star: (
    <>
      <path d="M10 2l2.4 5 5.6.8-4 4 .9 5.5L10 14.5l-4.9 2.8.9-5.5-4-4 5.6-.8z" strokeLinejoin="round"/>
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M10 6v4l3 2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  leaf: (
    <>
      <path d="M3 17c2-6 8-9 13-13-2 6-8 9-13 13z" strokeLinejoin="round"/>
      <path d="M3 17c1-3 3-5 5-7" strokeLinecap="round"/>
    </>
  ),
  seedling: (
    <>
      <path d="M10 18V10" strokeLinecap="round"/>
      <path d="M10 10c0-4 4-7 7-7-1 4-4 7-7 7z" strokeLinejoin="round"/>
      <path d="M10 10c0-3-3-6-7-6 1 4 4 6 7 6z" strokeLinejoin="round"/>
    </>
  ),
  yoga: (
    <>
      <circle cx="10" cy="3.5" r="1.5"/>
      <path d="M10 5.5v4l-3 3.5M10 9.5l3 3.5M7 12l-2 5M13 12l2 5" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  muscle: (
    <>
      <path d="M5 9c0-2 1.5-4 3-4 .5 0 1 .2 1.5.5C10 5 11 4 12 4c2 0 3 2 3 3 .5-.3 1-.5 1.5-.5 1.5 0 2 1.5 1.5 3C18.5 11 18 12 17 12l-1 4H4l-1-4c-1 0-1.5-1-1-2.5C1.5 8 3 7 4 8L5 9z" strokeLinejoin="round"/>
    </>
  ),
  spiral: (
    <>
      <path d="M10 10a1 1 0 100-2 3 3 0 000-6 5 5 0 000 10 7 7 0 000-14" strokeLinecap="round"/>
    </>
  ),
  ski: (
    <>
      <circle cx="11" cy="4" r="1.5"/>
      <path d="M11 5.5l-1.5 4.5h3l1.5 5H3l1-2h10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 15l2-2" strokeLinecap="round"/>
    </>
  ),
  pencil: (
    <>
      <path d="M14 2l4 4-11 11H3v-4L14 2z" strokeLinejoin="round"/>
      <path d="M12.5 3.5l4 4" strokeLinecap="round"/>
    </>
  ),
  calendar: (
    <>
      <rect x="2" y="4" width="16" height="14" rx="2"/>
      <path d="M2 9h16M6 2v4M14 2v4" strokeLinecap="round"/>
    </>
  ),
  'check-circle': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M6.5 10l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  wave: (
    <>
      <path d="M2 10c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0" strokeLinecap="round"/>
    </>
  ),
  sparkle: (
    <>
      <path d="M10 2v4M10 14v4M2 10h4M14 10h4" strokeLinecap="round"/>
      <path d="M4.2 4.2l2.8 2.8M13 13l2.8 2.8M4.2 15.8l2.8-2.8M13 7l2.8-2.8" strokeLinecap="round"/>
    </>
  ),
  map: (
    <>
      <path d="M1 4l6-2 6 2 6-2v14l-6 2-6-2-6 2V4z" strokeLinejoin="round"/>
      <path d="M7 2v14M13 4v14" strokeLinecap="round"/>
    </>
  ),
  building: (
    <>
      <rect x="3" y="2" width="14" height="16" rx="1"/>
      <path d="M7 7h2M11 7h2M7 11h2M11 11h2M8 18v-4h4v4" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  laptop: (
    <>
      <rect x="2" y="4" width="16" height="11" rx="1.5"/>
      <path d="M0 17h20" strokeLinecap="round"/>
    </>
  ),
  running: (
    <>
      <circle cx="13" cy="3" r="1.5"/>
      <path d="M11 5.5l-2 4H5M11 5.5l2 4-3 4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 9l2 4 3-1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 13.5l-1 4" strokeLinecap="round"/>
    </>
  ),
  sun: (
    <>
      <circle cx="10" cy="10" r="4"/>
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" strokeLinecap="round"/>
    </>
  ),
  'partly-cloudy': (
    <>
      <path d="M7 14a4 4 0 010-8 4 4 0 017.5 2A3 3 0 0114 14H7z" strokeLinejoin="round"/>
      <path d="M14 8a2 2 0 012 0" strokeLinecap="round"/>
    </>
  ),
  moon: (
    <>
      <path d="M18 13A8 8 0 017 2a10 10 0 1011 11z" strokeLinejoin="round"/>
    </>
  ),
  sunrise: (
    <>
      <path d="M10 6v2M5.5 7.5l1.5 1.5M14.5 7.5l-1.5 1.5" strokeLinecap="round"/>
      <path d="M3 14a7 7 0 0114 0" strokeLinecap="round"/>
      <path d="M1 16h18" strokeLinecap="round"/>
      <path d="M1 19h18" strokeLinecap="round"/>
    </>
  ),
  house: (
    <>
      <path d="M2 10L10 3l8 7v8a1 1 0 01-1 1H3a1 1 0 01-1-1V10z" strokeLinejoin="round"/>
      <path d="M7 20v-7h6v7" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  couch: (
    <>
      <rect x="3" y="8" width="14" height="7" rx="2"/>
      <path d="M3 10V7a1 1 0 011-1h12a1 1 0 011 1v3" strokeLinecap="round"/>
      <path d="M5 15v2M15 15v2" strokeLinecap="round"/>
      <path d="M3 12H1M17 12h2" strokeLinecap="round"/>
    </>
  ),
  bag: (
    <>
      <rect x="3" y="7" width="14" height="11" rx="2"/>
      <path d="M7 7V5a3 3 0 016 0v2" strokeLinecap="round"/>
      <path d="M3 12h14" strokeLinecap="round"/>
    </>
  ),
  party: (
    <>
      <path d="M3 17L7 7l7 7L7 17l-4-0z" strokeLinejoin="round"/>
      <path d="M14 3l1 3M17 5l-3 1" strokeLinecap="round"/>
      <path d="M16 9l1 2M18 10l-2 1" strokeLinecap="round"/>
      <path d="M11 3l.5 1.5" strokeLinecap="round"/>
    </>
  ),
  tree: (
    <>
      <path d="M10 2L4 9h3l-3 5h4v4h4v-4h4l-3-5h3L10 2z" strokeLinejoin="round"/>
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="8" width="16" height="10" rx="2"/>
      <path d="M7 8V6a2 2 0 014 0v2" strokeLinecap="round"/>
      <path d="M2 13h16" strokeLinecap="round"/>
    </>
  ),
  'gym-weight': (
    <>
      <path d="M2 9h2v4H2z" strokeLinejoin="round"/>
      <path d="M4 10.5h3v1H4z" strokeLinejoin="round"/>
      <path d="M16 9h2v4h-2z" strokeLinejoin="round"/>
      <path d="M13 10.5h3v1h-3z" strokeLinejoin="round"/>
      <path d="M7 7h6v8H7z" strokeLinejoin="round"/>
      <path d="M10 7v8" strokeLinecap="round"/>
    </>
  ),
  'trend-up': (
    <>
      <path d="M3 15l5-5 4 3 5-7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 6h4v4" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  'trend-down': (
    <>
      <path d="M3 7l5 5 4-3 5 7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 16h4v-4" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  'trend-right': (
    <>
      <path d="M3 10h14" strokeLinecap="round"/>
      <path d="M13 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  warning: (
    <>
      <path d="M10 2L1 18h18L10 2z" strokeLinejoin="round"/>
      <path d="M10 8v4M10 14.5v.5" strokeLinecap="round"/>
    </>
  ),
  flexible: (
    <>
      <circle cx="10" cy="10" r="2"/>
      <path d="M10 4v2M10 14v2M4 10h2M14 10h2" strokeLinecap="round"/>
      <path d="M5.8 5.8l1.4 1.4M12.8 12.8l1.4 1.4M5.8 14.2l1.4-1.4M12.8 7.2l1.4-1.4" strokeLinecap="round"/>
    </>
  ),
  'face-amazing': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M6.5 13c1 1.5 6 1.5 7 0" strokeLinecap="round"/>
      <line x1="7" y1="7.5" x2="7" y2="7.5" strokeLinecap="round" strokeWidth="2.5"/>
      <line x1="13" y1="7.5" x2="13" y2="7.5" strokeLinecap="round" strokeWidth="2.5"/>
      <path d="M8 6.5c.5-.5 1-.5 1.5 0M11.5 6.5c.5-.5 1-.5 1.5 0" strokeLinecap="round"/>
    </>
  ),
  'face-good': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M6.5 13c1 1.5 6 1.5 7 0" strokeLinecap="round"/>
      <line x1="7" y1="8" x2="7" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
      <line x1="13" y1="8" x2="13" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
    </>
  ),
  'face-okay': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M7 13h6" strokeLinecap="round"/>
      <line x1="7" y1="8" x2="7" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
      <line x1="13" y1="8" x2="13" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
    </>
  ),
  'face-meh': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M7 13h6" strokeLinecap="round"/>
      <path d="M6.5 8h3M10.5 8h3" strokeLinecap="round"/>
    </>
  ),
  'face-low': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M7 14c1-1.5 6-1.5 7 0" strokeLinecap="round"/>
      <line x1="7" y1="8" x2="7" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
      <line x1="13" y1="8" x2="13" y2="8" strokeLinecap="round" strokeWidth="2.5"/>
    </>
  ),
  'face-tight': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M7 13h6" strokeLinecap="round"/>
      <line x1="7" y1="7.5" x2="7" y2="7.5" strokeLinecap="round" strokeWidth="2.5"/>
      <line x1="13" y1="7.5" x2="13" y2="7.5" strokeLinecap="round" strokeWidth="2.5"/>
    </>
  ),
  'face-sore': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M7 14c1-1 6-1 7 0" strokeLinecap="round"/>
      <path d="M6 8l2 1M14 8l-2 1" strokeLinecap="round"/>
    </>
  ),
  'face-painful': (
    <>
      <circle cx="10" cy="10" r="8"/>
      <path d="M7 15c1-2 6-2 7 0" strokeLinecap="round"/>
      <path d="M5.5 7.5l3 2M14.5 7.5l-3 2" strokeLinecap="round"/>
    </>
  ),
};

export function AppIcon({ name, size = 20, color = 'currentColor', strokeWidth = 1.5, style = {} }) {
  const content = PATHS[name];
  if (!content) return null;
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'inline-block', ...style }}
    >
      {content}
    </svg>
  );
}

export default AppIcon;
