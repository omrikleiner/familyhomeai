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
  const [assignedToIds, setAssignedToIds] = useState<string[]>(familyMembers[0] ? [familyMembers[0].id] : []);
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
        <label>
          מי אחראי
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '0.5rem',
              marginTop: '0.45rem',
              padding: '0.6rem',
              border: '1px solid #d9e2ec',
              borderRadius: '10px',
              background: '#f8fafc',
            }}
          >
            {familyMembers.map((member) => {
              const isSelected = assignedToIds.includes(member.id);
              return (
                <label
                  key={member.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.5rem',
                    borderRadius: '8px',
                    background: isSelected ? '#dbeafe' : '#ffffff',
                    border: isSelected ? '1px solid #60a5fa' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
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
        </label>
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

      <ul className="item-list">
        {openTasks.map((task) => {
          const assignees = task.assignedToMemberIds
            .map((memberId) => familyMembers.find((member) => member.id === memberId)?.name)
            .filter(Boolean);
          const creator = familyMembers.find((member) => member.id === task.createdByMemberId);

          return (
            <li key={task.id}>
              <div className="item-row">
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button type="button" className="checkbox-button" onClick={() => onCompleteTask(task.id)}>
                    ✅
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onFailTask(task.id)}
                    style={{ color: '#dc2626', borderColor: '#fca5a5', background: '#fef2f2' }}
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
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
