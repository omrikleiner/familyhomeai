import { AppState, SHOPPING_CATEGORIES } from '../types/models';
import { seedData } from '../data/seedData';

export const STORAGE_KEY = 'family-house-ai-state';

export function loadAppState(): AppState {
  if (typeof window === 'undefined') {
    return seedData;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAppState(seedData);
      return seedData;
    }

    const parsed = JSON.parse(raw) as AppState;
    const familyMembers = parsed.familyMembers ?? seedData.familyMembers;
    const defaultMemberId = familyMembers[0]?.id ?? seedData.familyMembers[0].id;

    // Migrate tasks: ensure creator, assignee list and status exist on legacy data.
    const tasks = (parsed.tasks ?? seedData.tasks).map((task) => {
      const legacyAssignee = (task as { assignedToMemberId?: string }).assignedToMemberId;
      const assignedToMemberIds =
        task.assignedToMemberIds ?? (legacyAssignee ? [legacyAssignee] : []);

      return {
        ...task,
        createdByMemberId: task.createdByMemberId ?? legacyAssignee ?? defaultMemberId,
        assignedToMemberIds,
        status: task.status ?? 'open',
      };
    });

    // Migrate shopping items: normalize categories to a known value.
    const shoppingItems = (parsed.shoppingItems ?? seedData.shoppingItems).map((item) => ({
      ...item,
      category: SHOPPING_CATEGORIES.includes(item.category) ? item.category : 'אחר',
    }));

    return {
      familyMembers,
      tasks,
      shoppingItems,
      events: parsed.events ?? seedData.events,
    };
  } catch {
    saveAppState(seedData);
    return seedData;
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
