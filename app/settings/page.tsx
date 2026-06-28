'use client';

import { STORAGE_KEY } from '../../src/services/storageService';

export default function SettingsPage() {
  function handleReset() {
    if (typeof window === 'undefined') {
      return;
    }
    const confirmed = window.confirm('לאפס את כל הנתונים ולחזור לנתוני הדוגמה? הפעולה אינה הפיכה.');
    if (!confirmed) {
      return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  return (
    <div className="page-grid">
      <section className="card card-panel">
        <div className="card-header">
          <h2>הגדרות</h2>
        </div>

        <div className="ai-suggestion">
          <strong>איפוס נתונים</strong>
          <p>מחיקת כל המטלות, הקניות והאירועים השמורים בדפדפן וחזרה לנתוני הדוגמה.</p>
          <div className="ai-actions">
            <button type="button" className="secondary-button" onClick={handleReset}>
              אפס נתונים
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
