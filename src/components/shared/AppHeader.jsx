import React from 'react';
import { Avatar } from './Avatar';
import { CheckInPill } from './CheckInPill';
import { BellIcon } from './BellIcon';

export function AppHeader({ onCheckIn, onBell }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 8px', gap: 8 }}>
      <Avatar />
      <CheckInPill onClick={onCheckIn} />
      <BellIcon onClick={onBell} />
    </div>
  );
}

export default AppHeader;
