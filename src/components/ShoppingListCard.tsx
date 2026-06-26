import React, { useState } from 'react';
import { ShoppingItem } from '../types/models';

interface ShoppingListCardProps {
  items: ShoppingItem[];
  onAddItem: (title: string, quantity: string) => void;
  onToggleItem: (itemId: string) => void;
}

export default function ShoppingListCard({ items, onAddItem, onToggleItem }: ShoppingListCardProps) {
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    onAddItem(title.trim(), quantity.trim());
    setTitle('');
    setQuantity('');
  }

  return (
    <section className="card card-panel">
      <div className="card-header">
        <h2>רשימת קניות</h2>
        <span className="badge">{items.filter((item) => !item.isPurchased).length} שטרם נקנו</span>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          פריט חדש
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="מה לקנות?" />
        </label>
        <label>
          כמות
          <input value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="לדוגמה: 2" />
        </label>
        <button type="submit" className="primary-button">הוסף פריט</button>
      </form>

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className={item.isPurchased ? 'item-done' : ''}>
            <button type="button" className="checkbox-button" onClick={() => onToggleItem(item.id)}>
              {item.isPurchased ? '☑️' : '⬜'}
            </button>
            <div className="item-content">
              <span className="item-title">{item.title}</span>
              <span className="item-meta">{item.quantity || 'כמות לא הוגדרה'}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
