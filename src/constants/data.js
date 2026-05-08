export const ENVIRONMENTS = [
  {
    name: 'Park',
    icon: 'tree',
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
    icon: 'briefcase',
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
    icon: 'couch',
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
    icon: 'gym-weight',
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
  if (s === 'session-live' || s === 'session-preview' || s === 'session-complete') return '/images/routine-mindfulness.jpg';
  if (s.startsWith('goals') || s === 'goals-landing') return '/images/routine-beach-flow.jpg';
  if (s === 'scan-environment') return '/images/env-office.jpg';
  return '/images/routine-inner-stillness.jpg';
};

export const MOODS = [
  { id: 'amazing', label: 'Amazing',    bg: 'rgba(92,118,112,0.15)',  ring: '#5C7670' },
  { id: 'good',    label: 'Good',       bg: 'rgba(173,187,203,0.25)', ring: '#ADBBCB' },
  { id: 'okay',    label: 'Okay',       bg: 'rgba(199,147,162,0.20)', ring: '#C793A2' },
  { id: 'meh',     label: 'Meh',        bg: 'rgba(74,68,98,0.15)',    ring: '#4A4462' },
  { id: 'low',     label: 'Low-energy', bg: 'rgba(58,82,105,0.15)',   ring: '#3A5269' },
];

export const EXERCISES_BY_DURATION = {
  2:  ['Neck rolls — 30s', 'Shoulder circles — 30s'],
  5:  ['Neck rolls — 30s', 'Shoulder circles — 45s', 'Cat-cow stretch — 60s', 'Hip opener — 90s'],
  10: ['Neck rolls — 30s', 'Shoulder circles — 45s', 'Cat-cow stretch — 60s', 'Hip opener — 90s', 'Seated twist — 60s', 'Chest opener — 45s', 'Forward fold — 30s'],
  15: ['Neck rolls — 30s', 'Shoulder circles — 45s', 'Cat-cow stretch — 60s', 'Hip opener — 90s', 'Seated twist — 60s', 'Chest opener — 45s', 'Forward fold — 30s', 'Pigeon pose — 90s', 'Thread the needle — 60s'],
};

export const MOVES = [
  {
    name: 'Neck Rolls',
    cue: 'Drop your chin to your chest. Slowly roll to the right, back, left.',
    duration: 30,
    img: '/images/session-neck-roll.jpg',
    focus: ['Neck'],
    tutorial: {
      steps: [
        'Sit or stand upright with shoulders relaxed.',
        'Drop chin slowly to chest — feel the stretch in the back of your neck.',
        'Roll your head to the right, ear toward shoulder. Hold 3 sec.',
        'Continue rolling back, then left, then forward. Complete the circle.',
        'Repeat 3–4 times. Keep movements slow and controlled.',
      ],
      tip: 'Never force range of motion. If you feel sharp pain, stop. Keep shoulders down throughout.',
    },
  },
  {
    name: 'Shoulder Circles',
    cue: 'Roll both shoulders back in big slow circles. Feel tension release.',
    duration: 40,
    img: '/images/session-shoulder.jpg',
    focus: ['Shoulders'],
    tutorial: {
      steps: [
        'Stand or sit tall, arms relaxed at sides.',
        'Lift both shoulders up toward your ears.',
        'Roll them back, squeezing shoulder blades together.',
        'Drop them down and forward, completing the circle.',
        'Do 5 backward circles, then 5 forward.',
      ],
      tip: 'Backward circles are more beneficial for desk workers. Focus on the squeeze at the back of each rotation.',
    },
  },
  {
    name: 'Cat-Cow Stretch',
    cue: 'On hands and knees — arch up like a cat, then dip like a cow.',
    duration: 45,
    img: '/images/session-cat-cow.jpg',
    focus: ['Spine', 'Upper Back'],
    tutorial: {
      steps: [
        'Start on all fours — wrists under shoulders, knees under hips.',
        'CAT: Exhale and round your spine toward the ceiling, tucking chin and tailbone.',
        'Hold the cat position for 2–3 seconds.',
        'COW: Inhale and drop your belly toward the floor. Lift head and tailbone.',
        'Alternate slowly, syncing with your breath. Do 8 reps.',
      ],
      tip: 'Let your breath drive the movement. Inhale into cow, exhale into cat. This warms up the entire spine.',
    },
  },
  {
    name: 'Hip Opener',
    cue: 'Step one foot forward into a lunge. Sink your hips low. Switch after 20 sec.',
    duration: 50,
    img: '/images/routine-park-group.jpg',
    focus: ['Hips', 'Lower Back'],
    tutorial: {
      steps: [
        'Step your right foot forward into a low lunge position.',
        'Lower your left knee to the floor.',
        'Shift hips forward and down — feel the stretch in the left hip flexor.',
        'Keep torso upright, hands on your right knee or floor.',
        'Hold for 20 seconds, then switch legs. Breathe deeply throughout.',
      ],
      tip: 'This targets the hip flexors — the most shortened muscle for people who sit all day. Go deeper as you warm up.',
    },
  },
  {
    name: 'Seated Twist',
    cue: 'Sit tall. Twist gently across your knee. Hold 5 breaths each side.',
    duration: 40,
    img: '/images/routine-partner.jpg',
    focus: ['Spine', 'Hips'],
    tutorial: {
      steps: [
        'Sit cross-legged or with legs extended in front.',
        'Place your right hand behind you on the floor for support.',
        'Bring your left hand to your right knee.',
        'On an exhale, rotate your torso to the right. Look over your right shoulder.',
        'Hold for 5 slow breaths. Repeat on the other side.',
      ],
      tip: 'Spinal twists help decompress vertebrae. Always twist on an exhale and sit taller before each rotation.',
    },
  },
];

export const ROUTINES = [
  {
    id: 'morning-stretch',
    name: 'Morning Stretch',
    sub: 'Full body · Wake up',
    focus: ['Full body'],
    level: 'Beginner',
    image: '/images/routine-ready-to-run.jpg',
    tag: 'QUICK START',
    defaultDuration: 5,
    exercises: [
      { name: 'Cat-Cow Stretch', duration: 60 },
      { name: "Child's Pose", duration: 60 },
      { name: 'Thoracic Rotation', duration: 60 },
      { name: 'Hip Circles', duration: 60 },
      { name: 'Neck Rolls', duration: 60 },
    ],
    tags: ['Full body', '5 min'], body: ['Full Body', 'Knees'], env: ['Home', 'Desk'], vibe: ['Gentle wake-up'],
  },
  {
    id: 'hip-opener',
    name: 'Hip Opener',
    sub: 'Hips & lower back',
    focus: ['Hips', 'Lower back'],
    level: 'Beginner',
    image: '/images/routine-mindfulness.jpg',
    tag: 'DEEP STRETCH',
    defaultDuration: 10,
    exercises: [
      { name: 'Low Lunge (right)', duration: 90 },
      { name: 'Low Lunge (left)', duration: 90 },
      { name: 'Pigeon Pose (right)', duration: 90 },
      { name: 'Pigeon Pose (left)', duration: 90 },
      { name: '90/90 Hip Stretch', duration: 90 },
      { name: 'Butterfly Stretch', duration: 60 },
    ],
    tags: ['Hips', '10 min'], body: ['Hips', 'Knees'], env: ['Home', 'Park', 'Gym'], vibe: ['Stress relief'],
  },
  {
    id: 'neck-reset',
    name: 'Neck Reset',
    sub: 'Neck & shoulders',
    focus: ['Neck', 'Shoulders'],
    level: 'Beginner',
    image: '/images/routine-tension-relief.jpg',
    tag: 'DESK BREAK',
    defaultDuration: 5,
    exercises: [
      { name: 'Neck Rolls', duration: 60 },
      { name: 'Chin Tucks', duration: 45 },
      { name: 'Side Neck Stretch (right)', duration: 45 },
      { name: 'Side Neck Stretch (left)', duration: 45 },
      { name: 'Shoulder Rolls', duration: 60 },
      { name: 'Chest Opener', duration: 45 },
    ],
    tags: ['Neck', '5 min'], body: ['Neck', 'Shoulders'], env: ['Desk', 'Home'], vibe: ['Stress relief'],
  },
  {
    id: 'desk-flow',
    name: 'Desk Flow',
    sub: 'Full body · Office friendly',
    focus: ['Full body', 'Shoulders'],
    level: 'Beginner',
    image: '/images/routine-work-from-home.jpg',
    tag: 'DESK BREAK',
    defaultDuration: 5,
    exercises: [
      { name: 'Seated Thoracic Rotation', duration: 60 },
      { name: 'Wrist & Forearm Stretch', duration: 45 },
      { name: 'Chest Opener', duration: 60 },
      { name: 'Seated Hip Flexor', duration: 60 },
      { name: 'Shoulder Shrugs & Release', duration: 60 },
    ],
    tags: ['Back', '5 min'], body: ['Back', 'Shoulders', 'Wrists'], env: ['Desk'], vibe: ['Stress relief', 'Energy boost'],
  },
  {
    id: 'wind-down',
    name: 'Wind Down',
    sub: 'Full body · Evening',
    focus: ['Full body'],
    level: 'Beginner',
    image: '/images/routine-evening-unwind.jpg',
    tag: 'WIND DOWN',
    defaultDuration: 10,
    exercises: [
      { name: 'Supine Spinal Twist (right)', duration: 90 },
      { name: 'Supine Spinal Twist (left)', duration: 90 },
      { name: "Child's Pose", duration: 90 },
      { name: 'Happy Baby', duration: 90 },
      { name: 'Legs Up the Wall', duration: 120 },
      { name: 'Deep Breathing', duration: 60 },
    ],
    tags: ['Full body', '10 min'], body: ['Full Body'], env: ['Home'], vibe: ['Wind down'],
  },
  {
    id: 'lower-back-relief',
    name: 'Lower Back Relief',
    sub: 'Lower back & hips',
    focus: ['Lower back', 'Hips'],
    level: 'Beginner',
    image: '/images/routine-serenity.jpg',
    tag: 'RELIEF',
    defaultDuration: 5,
    exercises: [
      { name: 'Knee-to-Chest (right)', duration: 45 },
      { name: 'Knee-to-Chest (left)', duration: 45 },
      { name: 'Cat-Cow Stretch', duration: 60 },
      { name: "Child's Pose", duration: 60 },
      { name: 'Supine Spinal Twist', duration: 90 },
    ],
    tags: ['Back', '5 min'], body: ['Back'], env: ['Desk', 'Home'], vibe: ['Gentle wake-up'],
  },
  {
    id: 'shoulder-opener',
    name: 'Shoulder Opener',
    sub: 'Shoulders & upper back',
    focus: ['Shoulders', 'Upper back'],
    level: 'Beginner',
    image: '/images/routine-inner-stillness.jpg',
    tag: 'DESK BREAK',
    defaultDuration: 5,
    exercises: [
      { name: 'Doorframe Chest Stretch', duration: 60 },
      { name: 'Cross-Body Shoulder Stretch (right)', duration: 45 },
      { name: 'Cross-Body Shoulder Stretch (left)', duration: 45 },
      { name: 'Thread the Needle (right)', duration: 45 },
      { name: 'Thread the Needle (left)', duration: 45 },
      { name: 'Overhead Reach & Side Bend', duration: 60 },
    ],
    tags: ['Shoulders', '5 min'], body: ['Shoulders'], env: ['Desk', 'Home', 'Gym'], vibe: ['Stress relief'],
  },
  {
    id: 'full-body-reset',
    name: 'Full Body Reset',
    sub: 'Full body · All areas',
    focus: ['Full body'],
    level: 'Intermediate',
    image: '/images/routine-summer-sun.jpg',
    tag: 'FULL RESET',
    defaultDuration: 15,
    exercises: [
      { name: 'Sun Salutation Flow', duration: 180 },
      { name: 'Hip Flexor Lunge Series', duration: 120 },
      { name: 'Thoracic Spine Rotations', duration: 90 },
      { name: '90/90 Hip Stretch', duration: 90 },
      { name: 'Hamstring & Calf Stretch', duration: 120 },
      { name: 'Seated Forward Fold', duration: 90 },
      { name: 'Deep Breathing Cooldown', duration: 90 },
    ],
    tags: ['Full body', '15 min'], body: ['Full Body', 'Knees'], env: ['Home', 'Park', 'Gym'], vibe: ['Energy boost'],
  },
];

export const LOCATION_ROUTINES = {
  Home: [
    { routineId: 'lower-back-relief', sub: '5 min · Morning reset' },
    { routineId: 'neck-reset',        sub: '5 min · Quick relief' },
  ],
  Office: [
    { routineId: 'desk-flow',         sub: '5 min · Desk break' },
    { routineId: 'shoulder-opener',   sub: '5 min · Chair-friendly' },
  ],
  Outdoors: [
    { routineId: 'morning-stretch',   sub: '5 min · Morning flow' },
    { routineId: 'hip-opener',        sub: '10 min · Open & energize' },
  ],
  Gym: [
    { routineId: 'full-body-reset',   sub: '15 min · Pre-workout' },
    { routineId: 'hip-opener',        sub: '10 min · Bar-assisted' },
  ],
};

export const SESSION_LOGS = [
  { date: 'Today, 7:42 AM',     routine: 'Morning Stretch',  duration: '5 min',  focus: ['Neck', 'Back'],       img: '/images/routine-ready-to-run.jpg' },
  { date: 'Yesterday, 7:55 AM', routine: 'Hip Release Flow', duration: '8 min',  focus: ['Hips', 'Lower Back'], img: '/images/routine-mindfulness.jpg' },
  { date: 'Apr 20, 6:30 PM',    routine: 'Desk Break Reset', duration: '3 min',  focus: ['Shoulders'],          img: '/images/routine-work-from-home.jpg' },
  { date: 'Apr 19, 8:10 AM',    routine: 'Morning Stretch',  duration: '5 min',  focus: ['Neck', 'Back'],       img: '/images/routine-ready-to-run.jpg' },
  { date: 'Apr 18, 12:15 PM',   routine: 'Full Body Flow',   duration: '10 min', focus: ['Full Body'],          img: '/images/routine-summer-sun.jpg' },
  { date: 'Apr 15, 7:30 AM',    routine: 'Morning Stretch',  duration: '5 min',  focus: ['Neck', 'Shoulders'],  img: '/images/routine-ready-to-run.jpg' },
];

export const ENERGY_MAP = {
  'Amazing':    { face: 'amazing', color: '#5C7670', bg: 'rgba(92,118,112,0.15)'  },
  'Good':       { face: 'good',    color: '#ADBBCB', bg: 'rgba(173,187,203,0.20)' },
  'Okay':       { face: 'okay',    color: '#C793A2', bg: 'rgba(199,147,162,0.15)' },
  'Meh':        { face: 'meh',     color: '#4A4462', bg: 'rgba(74,68,98,0.12)'    },
  'Low-energy': { face: 'low',     color: '#3A5269', bg: 'rgba(58,82,105,0.12)'   },
};

export const CHECKIN_LOGS = [
  { id: 'c1',  date: 'Today',     day: 'Wednesday', energy: 'Good',       plans: 'Office work',    sore: ['Neck', 'Shoulders'], time: '5 min',  period: 'week' },
  { id: 'c2',  date: 'Yesterday', day: 'Tuesday',   energy: 'Amazing',   plans: 'Work from home', sore: ['Lower Back'],        time: '10 min', period: 'week' },
  { id: 'c3',  date: 'Apr 20',    day: 'Monday',    energy: 'Okay',      plans: 'Running',        sore: ['Hips', 'Knees'],     time: '5 min',  period: 'week' },
  { id: 'c4',  date: 'Apr 18',    day: 'Saturday',  energy: 'Meh',       plans: 'Relaxing',       sore: ['Lower Back'],        time: '2 min',  period: 'month' },
  { id: 'c5',  date: 'Apr 15',    day: 'Wednesday', energy: 'Good',      plans: 'Office work',    sore: ['Neck'],              time: '5 min',  period: 'month' },
  { id: 'c6',  date: 'Apr 12',    day: 'Sunday',    energy: 'Good',      plans: 'Going outside',  sore: ['Ankles'],            time: '10 min', period: 'month' },
  { id: 'c7',  date: 'Apr 9',     day: 'Thursday',  energy: 'Low-energy',plans: 'Home tasks',     sore: ['Neck', 'Back'],      time: '2 min',  period: 'month' },
  { id: 'c8',  date: 'Mar 28',    day: 'Saturday',  energy: 'Amazing',   plans: 'Fun day out',    sore: [],                    time: '5 min',  period: 'year' },
  { id: 'c9',  date: 'Mar 15',    day: 'Sunday',    energy: 'Good',      plans: 'Gym',            sore: ['Shoulders'],         time: '15 min', period: 'year' },
  { id: 'c10', date: 'Mar 5',     day: 'Thursday',  energy: 'Okay',      plans: 'Work from home', sore: ['Wrists'],            time: '5 min',  period: 'year' },
];
