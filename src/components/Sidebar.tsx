import React from 'react';

type SidebarItem = {
  key: string;
  label: string;
  icon: string;
};

const menuItems: SidebarItem[] = [
  { key: 'home', label: 'בית', icon: '🏠' },
  { key: 'family', label: 'פרופיל משפחתי', icon: '👪' },
  { key: 'events', label: 'אירועים', icon: '📅' },
  { key: 'tasks', label: 'מטלות', icon: '✅' },
  { key: 'shopping', label: 'קניות', icon: '🛒' },
  { key: 'ai', label: 'עוזר AI', icon: '🤖' },
  { key: 'settings', label: 'הגדרות', icon: '⚙️' },
];

interface SidebarProps {
  activeKey: string;
  onChange: (key: string) => void;
}

export default function Sidebar({ activeKey, onChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span>🏠</span>
        <div>
          <div className="brand-title">Family House AI</div>
          <div className="brand-subtitle">POC Dashboard</div>
        </div>
      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <button
            type="button"
            key={item.key}
            className={item.key === activeKey ? 'menu-item active' : 'menu-item'}
            onClick={() => onChange(item.key)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Dashboard פשוט ונקי לשימוש משפחתי.</p>
      </div>
    </aside>
  );
}
