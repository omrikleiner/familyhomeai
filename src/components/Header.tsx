import React from 'react';

interface HeaderProps {
  activeSection: string;
  profileName: string;
  openTasks: number;
  shoppingToBuy: number;
  upcomingEvents: number;
}

const sectionLabels: Record<string, string> = {
  home: 'בית',
  family: 'פרופיל משפחתי',
  events: 'אירועים',
  tasks: 'מטלות',
  shopping: 'קניות',
  ai: 'עוזר AI',
  settings: 'הגדרות',
};

export default function Header({
  activeSection,
  profileName,
  openTasks,
  shoppingToBuy,
  upcomingEvents,
}: HeaderProps) {
  return (
    <header className="header-shell">
      <div>
        <p className="eyebrow">דאשבורד משפחתי</p>
        <h1>שלום {profileName} — {sectionLabels[activeSection] || 'בית'}</h1>
      </div>

      <div className="header-chips">
        <span className="chip">מטלות פתוחות: {openTasks}</span>
        <span className="chip">קניות לחודש: {shoppingToBuy}</span>
        <span className="chip">אירועים קרובים: {upcomingEvents}</span>
      </div>
    </header>
  );
}
