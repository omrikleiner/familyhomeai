import React, { useMemo, useState } from 'react';
import { FamilyEvent } from '../types/models';

interface EventsCardProps {
  events: FamilyEvent[];
  onAddEvent: (title: string, date: string, time: string, location: string) => void;
}

export default function EventsCard({ events, onAddEvent }: EventsCardProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const upcomingEvents = useMemo(() => events.slice(0, 5), [events]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !date.trim()) {
      return;
    }

    onAddEvent(title.trim(), date.trim(), time.trim(), location.trim());
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
  }

  return (
    <section className="card card-panel">
      <div className="card-header">
        <h2>אירועים קרובים</h2>
        <span className="badge">{events.length}</span>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          שם אירוע
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="למשל: חוג" />
        </label>
        <label>
          תאריך
          <input value={date} onChange={(event) => setDate(event.target.value)} placeholder="היום / מחר / שישי" />
        </label>
        <label>
          שעה
          <input value={time} onChange={(event) => setTime(event.target.value)} placeholder="17:00" />
        </label>
        <label>
          מיקום
          <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="למשל: בבית" />
        </label>
        <button type="submit" className="primary-button">הוסף אירוע</button>
      </form>

      {upcomingEvents.length === 0 ? (
        <p className="empty-state">אין אירועים קרובים — הוסיפו אירוע ראשון 📅</p>
      ) : (
        <ul className="item-list">
          {upcomingEvents.map((item) => (
            <li key={item.id}>
              <div className="item-content">
                <span className="item-title">{item.title}</span>
                <span className="item-meta">{item.date}{item.time ? ` • ${item.time}` : ''}{item.location ? ` • ${item.location}` : ''}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
