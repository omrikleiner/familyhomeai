import React, { useMemo, useState } from 'react';
import { FamilyMember, FamilyTask } from '../types/models';

interface TasksCardProps {
  tasks: FamilyTask[];
  familyMembers: FamilyMember[];
  currentUserId: string;
  onChangeUser: (userId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onFailTask: (taskId: string) => void;
  onAddTask: (title: string, assignedToMemberIds: string[], dueDate: string) => void;
}

export default function TasksCard({
  tasks,
  familyMembers,
  currentUserId,
  onChangeUser,
  onCompleteTask,
  onDeleteTask,
  onFailTask,
  onAddTask,
}: TasksCardProps) {
  const [title, setTitle] = useState('');
  const [assignedToIds, setAssignedToIds] = useState<string[]>(
    familyMembers[0] ? [familyMembers[0].id] : []
  );
  const [dueDate, setDueDate] = useState('');

  const openTasks = useMemo(() => tasks.filter((task) => task.status === 'open'), [tasks]);

  function formatDueDate(dateValue: string) {
    if (!dateValue) {
      return 'ללא תאריך';
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return new Intl.DateTimeFormat('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || assignedToIds.length === 0) {
      return;
    }

    onAddTask(title.trim(), assignedToIds, dueDate.trim());
    setTitle('');
    setAssignedToIds(familyMembers[0] ? [familyMembers[0].id] : []);
    setDueDate('');
  }

  function toggleAssignedMember(memberId: string) {
    setAssignedToIds((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  }

  return (
    <section className="card card-panel">
      <div className="card-header">
        <h2>מטלות שלי</h2>
        <span className="badge">{openTasks.length} פתוחות</span>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          משתמש נוכחי
          <select value={currentUserId} onChange={(event) => onChangeUser(event.target.value)}>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          מטלה חדשה
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="כתוב מטלה" />
        </label>
        <div className="field-label">מי אחראי</div>
        <div className="assignee-grid">
          {familyMembers.map((member) => {
            const isSelected = assignedToIds.includes(member.id);
            return (
              <label
                key={member.id}
                className={isSelected ? 'assignee-chip selected' : 'assignee-chip'}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAssignedMember(member.id)}
                />
                <span>{member.name}</span>
              </label>
            );
          })}
        </div>
        <label>
          תאריך יעד
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            placeholder="בחר תאריך"
          />
        </label>
        <button type="submit" className="primary-button">הוסף מטלה</button>
      </form>

      {openTasks.length === 0 ? (
        <p className="empty-state">אין מטלות פתוחות — זמן למנוחה ☕</p>
      ) : (
        <ul className="item-list">
          {openTasks.map((task) => {
            const assignees = task.assignedToMemberIds
              .map((memberId) => familyMembers.find((member) => member.id === memberId)?.name)
              .filter(Boolean);
            const creator = familyMembers.find((member) => member.id === task.createdByMemberId);
            const canDelete = task.createdByMemberId === currentUserId;

            return (
              <li key={task.id}>
                <div className="task-buttons">
                  <button
                    type="button"
                    className="checkbox-button"
                    title="סיום מטלה"
                    onClick={() => onCompleteTask(task.id)}
                  >
                    ✅
                  </button>
                  <button
                    type="button"
                    className="icon-button danger"
                    title="לא בוצע"
                    onClick={() => onFailTask(task.id)}
                  >
                    ✕
                  </button>
                </div>
                <div className="item-content">
                  <span className="item-title">{task.title}</span>
                  <span className="item-meta">
                    {assignees.length > 0 ? assignees.join(', ') : 'ללא מיועד'} • {formatDueDate(task.dueDate || '')}
                  </span>
                  <span className="item-meta">נוצר על ידי: {creator?.name || 'לא ידוע'}</span>
                </div>
                {canDelete && (
                  <div className="item-actions">
                    <button
                      type="button"
                      className="icon-button danger"
                      title="מחיקה"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
