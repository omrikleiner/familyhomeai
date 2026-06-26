export type FamilyMemberRole = 'parent' | 'child' | 'other';

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyMemberRole;
  avatarEmoji: string;
}

export type TaskStatus = 'open' | 'done';

export interface FamilyTask {
  id: string;
  title: string;
  assignedToMemberId: string;
  dueDate?: string;
  status: TaskStatus;
}

export interface ShoppingItem {
  id: string;
  title: string;
  quantity?: string;
  isPurchased: boolean;
}

export interface FamilyEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
}

export type AiIntent = 'task' | 'shopping' | 'event' | 'unknown';

export interface AiSuggestion {
  intent: AiIntent;
  title: string;
  confidence: number;
  rawText: string;
}

export interface AppState {
  familyMembers: FamilyMember[];
  tasks: FamilyTask[];
  shoppingItems: ShoppingItem[];
  events: FamilyEvent[];
}
