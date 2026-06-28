'use client';

import AiAssistantCard from '../../src/components/AiAssistantCard';
import { useAppState } from '../../src/context/AppStateContext';

export default function AiPage() {
  const { state, handleAddTask, handleAddShoppingItem, handleAddEvent } = useAppState();

  return (
    <div className="page-grid">
      <AiAssistantCard
        onAddTask={handleAddTask}
        onAddShoppingItem={handleAddShoppingItem}
        onAddEvent={handleAddEvent}
        familyMembers={state.familyMembers}
      />
    </div>
  );
}
