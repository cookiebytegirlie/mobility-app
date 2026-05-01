export const ENVIRONMENTS = [
  {
    name: 'Park',
    emoji: '🌳',
    bg: 'linear-gradient(170deg, #1a3a1a 0%, #2d5a27 25%, #4a7c3f 55%, #7aaa6a 80%, #a8c89a 100%)',
    skyBg: 'linear-gradient(180deg, #87CEEB 0%, #b8dff0 60%, #d4edda 100%)',
    objects: [
      { label: 'Bench', top: '62%', left: '28%' },
      { label: 'Tree', top: '28%', left: '68%' },
      { label: 'Grass', top: '78%', left: '58%' },
      { label: 'Railing', top: '50%', left: '18%' },
      { label: 'Open Space', top: '68%', left: '75%' },
    ],
  },
  {
    name: 'Office',
    emoji: '💼',
    bg: 'linear-gradient(170deg, #b0bec5 0%, #cfd8dc 35%, #e0e0e0 65%, #eeeeee 100%)',
    skyBg: 'linear-gradient(180deg, #e8eaf6 0%, #f3f4f6 100%)',
    objects: [
      { label: 'Chair', top: '60%', left: '40%' },
      { label: 'Desk', top: '52%', left: '62%' },
      { label: 'Wall', top: '22%', left: '50%' },
      { label: 'Doorframe', top: '42%', left: '78%' },
      { label: 'Floor', top: '80%', left: '30%' },
    ],
  },
  {
    name: 'Living Room',
    emoji: '🛋️',
    bg: 'linear-gradient(170deg, #8d6e63 0%, #a1887f 30%, #d7b49e 60%, #efcfb0 85%, #fde8cc 100%)',
    skyBg: 'linear-gradient(180deg, #fff3e0 0%, #fce8c8 100%)',
    objects: [
      { label: 'Couch', top: '60%', left: '38%' },
      { label: 'Coffee Table', top: '68%', left: '68%' },
      { label: 'Floor', top: '80%', left: '52%' },
      { label: 'Wall', top: '20%', left: '35%' },
      { label: 'Open Area', top: '55%', left: '18%' },
    ],
  },
  {
    name: 'Gym',
    emoji: '🏋️',
    bg: 'linear-gradient(170deg, #0d1117 0%, #161b22 30%, #1c2333 65%, #21262d 100%)',
    skyBg: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
    objects: [
      { label: 'Pull-up Bar', top: '28%', left: '55%' },
      { label: 'Mat', top: '72%', left: '38%' },
      { label: 'Bench', top: '58%', left: '22%' },
      { label: 'Open Floor', top: '80%', left: '68%' },
      { label: 'Wall', top: '35%', left: '82%' },
    ],
  },
];

export const FALLBACK_ROUTINES = {
  Park: [
    { name: 'Bench Hip Opener', duration: '5 min', uses: 'Bench', description: 'Use the bench edge for seated hip flexor stretches, single-leg hamstring holds, and step-up mobility.' },
    { name: 'Tree Balance Flow', duration: '4 min', uses: 'Tree', description: 'Light touch on the trunk for supported single-leg balance holds, ankle circles, and calf raises.' },
    { name: 'Grass Groundwork', duration: '6 min', uses: 'Grass', description: "Take it to the ground — prone thoracic rotations, cat-cows, child's pose, and hip 90/90 stretch." },
  ],
  Office: [
    { name: 'Chair Mobility Reset', duration: '3 min', uses: 'Chair', description: 'Seated spinal rotations, figure-four hip stretch, and thoracic extension over the backrest.' },
    { name: 'Desk Shoulder Release', duration: '4 min', uses: 'Desk', description: 'Chest opener using desk edge, wrist extension stretches, and standing forward fold.' },
    { name: 'Doorframe Pec Stretch', duration: '3 min', uses: 'Doorframe', description: 'Classic chest and shoulder opener, overhead lat reach, and side body lengthen.' },
  ],
  'Living Room': [
    { name: 'Couch Flow', duration: '5 min', uses: 'Couch', description: 'Couch-assisted hip flexor lunges, seated spinal rotations, and kneeling quad stretches.' },
    { name: 'Floor Mobility', duration: '6 min', uses: 'Floor', description: '90/90 hip position, supine spinal twists, cat-cow sequence, and thread-the-needle.' },
    { name: 'Table Decompression', duration: '4 min', uses: 'Coffee Table', description: 'Supported forward fold, wrist and forearm stretch, and shoulder pendulum swings.' },
  ],
  Gym: [
    { name: 'Bar Hang & Decompress', duration: '4 min', uses: 'Pull-up Bar', description: 'Passive hangs for spinal decompression, active scapular pulls, and shoulder circle swings.' },
    { name: 'Mat Deep Openers', duration: '7 min', uses: 'Mat', description: 'Pigeon pose, lizard stretch, thoracic rotations, and a full hip-circle flow.' },
    { name: 'Bench T-Spine Work', duration: '5 min', uses: 'Bench', description: 'Thoracic extension drape, seated piriformis stretch, and hip flexor lunge hold.' },
  ],
};

export const TWEAK_DEFAULTS = {
  "hue": 160,
  "saturation": 60,
  "lightness": 58,
  "userName": "Tina"
};

export const getPhoneBg = (s) => {
  if (s === 'session-live' || s === 'session-preview' || s === 'session-complete') return '/images/tabitha-turner-J4ibw_JGl_k-unsplash.jpg';
  if (s.startsWith('goals') || s === 'goals-landing') return '/images/jan-brennenstuhl-cxUoEcsQRIo-unsplash.jpg';
  if (s === 'scan-environment') return '/images/thom-milkovic-qPPWNeFVLFQ-unsplash.jpg';
  return '/images/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg';
};
