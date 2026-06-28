import React, { useState } from 'react';
import { ShoppingItem, ShoppingCategory, SHOPPING_CATEGORIES } from '../types/models';

interface ShoppingListCardProps {
  items: ShoppingItem[];
  onAddItem: (title: string, quantity: string, category: ShoppingCategory) => void;
  onToggleItem: (itemId: string) => void;
  onEditItem: (
    itemId: string,
    fields: { title: string; quantity: string; category: ShoppingCategory }
  ) => void;
  onDeleteItem: (itemId: string) => void;
  onClearPurchased: () => void;
}

const CATEGORY_ICONS: Record<ShoppingCategory, string> = {
  'מזון': '🥫',
  'ירקות ופירות': '🥬',
  'מאפים': '🥖',
  'ניקיון': '🧼',
  'אחר': '🛒',
};

export default function ShoppingListCard({
  items,
  onAddItem,
  onToggleItem,
  onEditItem,
  onDeleteItem,
  onClearPurchased,
}: ShoppingListCardProps) {
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<ShoppingCategory>('מזון');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editCategory, setEditCategory] = useState<ShoppingCategory>('אחר');

  const toBuy = items.filter((item) => !item.isPurchased).length;
  const purchased = items.length - toBuy;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    onAddItem(title.trim(), quantity.trim(), category);
    setTitle('');
    setQuantity('');
  }

  function startEdit(item: ShoppingItem) {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditQuantity(item.quantity || '');
    setEditCategory(item.category);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveEdit(itemId: string) {
    if (!editTitle.trim()) {
      return;
    }
    onEditItem(itemId, {
      title: editTitle.trim(),
      quantity: editQuantity.trim(),
      category: editCategory,
    });
    setEditingId(null);
  }

  // Group items by category, preserving the canonical category order.
  const grouped = SHOPPING_CATEGORIES.map((cat) => ({
    category: cat,
    items: items.filter((item) => item.category === cat),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="card card-panel">
      <div className="card-header">
        <h2>רשימת קניות</h2>
        <div className="card-header-actions">
          <span className="badge">{toBuy} לקנות · {purchased} נקנו</span>
          {purchased > 0 && (
            <button type="button" className="ghost-button" onClick={onClearPurchased}>
              נקה שנקנו
            </button>
          )}
        </div>
      </div>

      <form className="form-grid shopping-form" onSubmit={handleSubmit}>
        <label>
          פריט חדש
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="מה לקנות?" />
        </label>
        <div className="form-row">
          <label>
            כמות
            <input value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="לדוגמה: 2" />
          </label>
          <label>
            קטגוריה
            <select value={category} onChange={(event) => setCategory(event.target.value as ShoppingCategory)}>
              {SHOPPING_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_ICONS[cat]} {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="primary-button">הוסף פריט</button>
      </form>

      {items.length === 0 ? (
        <p className="empty-state">הרשימה ריקה — הוסיפו את הפריט הראשון 🛒</p>
      ) : (
        <div className="shopping-groups">
          {grouped.map((group) => (
            <div key={group.category} className="shopping-group">
              <h3 className="category-header">
                <span className="category-icon">{CATEGORY_ICONS[group.category]}</span>
                {group.category}
                <span className="category-count">{group.items.length}</span>
              </h3>

              <ul className="item-list">
                {group.items.map((item) =>
                  editingId === item.id ? (
                    <li key={item.id} className="item-editing">
                      <input
                        className="edit-input"
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
                        placeholder="שם הפריט"
                      />
                      <input
                        className="edit-input edit-qty"
                        value={editQuantity}
                        onChange={(event) => setEditQuantity(event.target.value)}
                        placeholder="כמות"
                      />
                      <select
                        className="edit-input"
                        value={editCategory}
                        onChange={(event) => setEditCategory(event.target.value as ShoppingCategory)}
                      >
                        {SHOPPING_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="item-actions">
                        <button type="button" className="icon-button save" onClick={() => saveEdit(item.id)}>
                          שמור
                        </button>
                        <button type="button" className="icon-button" onClick={cancelEdit}>
                          ביטול
                        </button>
                      </div>
                    </li>
                  ) : (
                    <li key={item.id} className={item.isPurchased ? 'item-done' : ''}>
                      <button type="button" className="checkbox-button" onClick={() => onToggleItem(item.id)}>
                        {item.isPurchased ? '☑️' : '⬜'}
                      </button>
                      <div className="item-content">
                        <span className="item-title">{item.title}</span>
                        <span className="item-meta">{item.quantity || 'כמות לא הוגדרה'}</span>
                      </div>
                      <div className="item-actions">
                        <button
                          type="button"
                          className="icon-button"
                          title="עריכה"
                          onClick={() => startEdit(item)}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="icon-button danger"
                          title="מחיקה"
                          onClick={() => onDeleteItem(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
