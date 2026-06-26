import React, { useState } from 'react';
import { AiSuggestion, FamilyTask, ShoppingItem, FamilyEvent } from '../types/models';
import { parseAiRequest } from '../services/aiParserService';

interface AiAssistantCardProps {
  onAddTask: (title: string, assignedToMemberId: string, dueDate: string) => void;
  onAddShoppingItem: (title: string, quantity: string) => void;
  onAddEvent: (title: string, date: string, time: string, location: string) => void;
  familyMembers: { id: string; name: string }[];
}

export default function AiAssistantCard({
  onAddTask,
  onAddShoppingItem,
  onAddEvent,
  familyMembers,
}: AiAssistantCardProps) {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState<AiSuggestion | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState(familyMembers[0]?.id || '');

  function handleAnalyze() {
    const parsed = parseAiRequest(input);
    setSuggestion(parsed);
  }

  function handleApprove() {
    if (!suggestion) {
      return;
    }

    if (suggestion.intent === 'task') {
      onAddTask(suggestion.title, selectedMemberId, 'היום');
    } else if (suggestion.intent === 'shopping') {
      onAddShoppingItem(suggestion.title, '1');
    } else if (suggestion.intent === 'event') {
      onAddEvent(suggestion.title, 'היום', '', '');
    }

    setInput('');
    setSuggestion(null);
  }

  return (
    <section className="card card-panel ai-card">
      <div className="card-header">
        <h2>עוזר AI</h2>
        <span className="badge">כתיבה בעברית</span>
      </div>

      <p>כתוב בקשה פשוטה בעברית והמערכת תנסה לזהות אם זה מטלה, אירוע או קנייה.</p>

      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="לדוגמה: קנה חלב וביצים מחר או תזכיר לי לסדר את החדר"
      />

      <div className="ai-actions">
        <button type="button" className="secondary-button" onClick={handleAnalyze}>
          נתח בקשה
        </button>
        <button
          type="button"
          className="primary-button"
          disabled={!suggestion || suggestion.intent === 'unknown'}
          onClick={handleApprove}
        >
          אשר הוספה
        </button>
      </div>

      {suggestion && (
        <div className="ai-suggestion">
          <p><strong>כותרת:</strong> {suggestion.title}</p>
          <p><strong>כוונה:</strong> {suggestion.intent}</p>
          <p><strong>ביטחון:</strong> {Math.round(suggestion.confidence * 100)}%</p>

          {suggestion.intent === 'task' && (
            <label>
              מי אחראי?
              <select value={selectedMemberId} onChange={(event) => setSelectedMemberId(event.target.value)}>
                {familyMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}
    </section>
  );
}
