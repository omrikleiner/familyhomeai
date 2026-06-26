import React, { useMemo, useState } from 'react';
import { FamilyMember, FamilyTask } from '../types/models';

interface TasksCardProps {
  tasks: FamilyTask[];
  familyMembers: FamilyMember[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, assignedToMemberId: string, dueDate: string) => void;
}

export default function TasksCard({ tasks, familyMembers, onToggleTask, onAddTask }: TasksCardProps) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState(familyMembers[0]?.id || '');
  const [dueDate, setDueDate] = useState('');

  const openTasks = useMemo(() => tasks.filter((task) => task.status === 'open'), [tasks]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !assignedTo) {
      return;
    }

    onAddTask(title.trim(), assignedTo, dueDate.trim());
    setTitle('');
    setDueDate('');
  }

  return (
    <section className="card card-panel">
      <div className="card-header">
        <h2>מטלות שלי</h2>
        <span className="badge">{openTasks.length} פתוחות</span>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          מטלה חדשה
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="כתוב מטלה" />
        </label>
        <label>
          מי אחראי
          <select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          תאריך
          <input value={dueDate} onChange={(event) => setDueDate(event.target.value)} placeholder="היום / מחר" />
        </label>
        <button type="submit" className="primary-button">הוסף מטלה</button>
      </form>

      <ul className="item-list">
        {tasks.map((task) => {
          const assignee = familyMembers.find((member) => member.id === task.assignedToMemberId);
          return (
            <li key={task.id} className={task.status === 'done' ? 'item-done' : ''}>
              <button type="button" className="checkbox-button" onClick={() => onToggleTask(task.id)}>
                {task.status === 'done' ? '☑️' : '⬜'}
              </button>
              <div className="item-content">
                <span className="item-title">{task.title}</span>
                <span className="item-meta">{assignee?.name} • {task.dueDate || 'ללא תאריך'}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
