'use client';

import TasksCard from '../../src/components/TasksCard';
import { useAppState } from '../../src/context/AppStateContext';

export default function TasksPage() {
  const {
    state,
    currentUserId,
    setCurrentUserId,
    handleCompleteTask,
    handleFailTask,
    handleDeleteTask,
    handleAddTask,
  } = useAppState();

  return (
    <div className="page-grid">
      <TasksCard
        tasks={state.tasks}
        familyMembers={state.familyMembers}
        currentUserId={currentUserId}
        onChangeUser={setCurrentUserId}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
        onFailTask={handleFailTask}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
