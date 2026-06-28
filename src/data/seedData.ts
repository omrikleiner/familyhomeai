import { AppState } from '../types/models';

export const seedData: AppState = {
  familyMembers: [
    { id: '1', name: 'עומרי', role: 'child', avatarEmoji: '🧒' },
    { id: '2', name: 'אמא', role: 'parent', avatarEmoji: '👩' },
    { id: '3', name: 'אבא', role: 'parent', avatarEmoji: '👨' },
    { id: '4', name: 'נועה', role: 'child', avatarEmoji: '👧' },
  ],
  tasks: [
    { id: 't1', title: 'להוציא את הכלב', createdByMemberId: '1', assignedToMemberIds: ['1'], dueDate: 'היום', status: 'open' },
    { id: 't2', title: 'לסדר חדר', createdByMemberId: '1', assignedToMemberIds: ['1'], dueDate: 'היום', status: 'open' },
    { id: 't3', title: 'להוריד כביסה', createdByMemberId: '2', assignedToMemberIds: ['2'], dueDate: 'מחר', status: 'open' },
  ],
  shoppingItems: [
    { id: 's1', title: 'חלב', quantity: '2', category: 'מזון', isPurchased: false },
    { id: 's2', title: 'ביצים', quantity: '12', category: 'מזון', isPurchased: false },
    { id: 's3', title: 'לחם', quantity: '1', category: 'מאפים', isPurchased: true },
    { id: 's4', title: 'עגבניות', quantity: '6', category: 'ירקות ופירות', isPurchased: false },
    { id: 's5', title: 'נוזל כלים', quantity: '1', category: 'ניקיון', isPurchased: false },
  ],
  events: [
    { id: 'e1', title: 'חוג כדורגל', date: 'היום', time: '17:00', location: 'מגרש שכונתי' },
    { id: 'e2', title: 'ביקור אצל סבתא', date: 'שישי', time: '18:30', location: 'באר שבע' },
    { id: 'e3', title: 'יום הולדת לנועה', date: 'שבת', time: '11:00', location: 'בית' },
  ],
};
