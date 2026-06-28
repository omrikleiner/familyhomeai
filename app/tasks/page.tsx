'use client';

import TasksCard from '../../src/components/TasksCard';
import { useAppState } from '../../src/context/AppStateContext';

export default function TasksPage() {
  const { state, handleToggleTask, handleAddTask } = useAppState();

  return (
    <div className="page-grid">
      <TasksCard
        tasks={state.tasks}
        familyMembers={state.familyMembers}
        onToggleTask={handleToggleTask}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
