'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from './navigation';

export default function Sidebar() {
  const pathname = usePathname();

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
        {navItems.map((item) => {
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? 'menu-item active' : 'menu-item'}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p>Dashboard פשוט ונקי לשימוש משפחתי.</p>
      </div>
    </aside>
  );
}
