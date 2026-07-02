'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAppState } from '../context/AppStateContext';
import { labelForPath } from './navigation';

export default function Header() {
  const pathname = usePathname();
  const { profileName, openTasks, shoppingToBuy, upcomingEvents } = useAppState();

  return (
    <header className="header-shell">
      <div>
        <p className="eyebrow">דאשבורד משפחתי</p>
        <h1>
          שלום {profileName} — {labelForPath(pathname)}
        </h1>
      </div>

      <div className="header-chips">
        <span className="chip">מטלות פתוחות: {openTasks}</span>
        <span className="chip">קניות פתוחות: {shoppingToBuy}</span>
        <span className="chip">אירועים קרובים: {upcomingEvents}</span>
      </div>
    </header>
  );
}
