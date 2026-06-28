'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AppStateProvider } from '../context/AppStateContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <Header />
          {children}
        </main>
      </div>
    </AppStateProvider>
  );
}
