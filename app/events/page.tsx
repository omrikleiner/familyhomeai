'use client';

import EventsCard from '../../src/components/EventsCard';
import { useAppState } from '../../src/context/AppStateContext';

export default function EventsPage() {
  const { state, handleAddEvent } = useAppState();

  return (
    <div className="page-grid">
      <EventsCard events={state.events} onAddEvent={handleAddEvent} />
    </div>
  );
}
