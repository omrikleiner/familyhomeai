'use client';

import Link from 'next/link';
import DashboardCard from '../src/components/DashboardCard';
import { useAppState } from '../src/context/AppStateContext';

export default function HomePage() {
  const { openTasks, shoppingToBuy, upcomingEvents } = useAppState();

  return (
    <>
      <section className="summary-grid">
        <Link href="/tasks" className="summary-link">
          <DashboardCard title="מטלות" value={openTasks} description="מטלות שעדיין פתוחות למשפחה" icon="✅" />
        </Link>
        <Link href="/shopping" className="summary-link">
          <DashboardCard title="קניות" value={shoppingToBuy} description="פריטים שעדיין לא קנו" icon="🛒" />
        </Link>
        <Link href="/events" className="summary-link">
          <DashboardCard title="אירועים" value={upcomingEvents} description="אירועים קרובים וזכרונות משפחתיים" icon="📅" />
        </Link>
      </section>

      <section className="card card-panel">
        <div className="card-header">
          <h2>ברוכים הבאים 👋</h2>
        </div>
        <p className="empty-state">
          בחרו דף מהתפריט בצד כדי לנהל מטלות, קניות, אירועים ובני משפחה — או היעזרו בעוזר ה-AI.
        </p>
      </section>
    </>
  );
}
