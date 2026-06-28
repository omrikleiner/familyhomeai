import { AppState } from '../types/models';
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

    const tasks = (parsed.tasks ?? seedData.tasks).map((task) => ({
      ...task,
      createdByMemberId: task.createdByMemberId ?? task.assignedToMemberId ?? defaultMemberId,
      status: task.status ?? 'open',
    }));

    return {
      familyMembers,
      tasks,
      shoppingItems: parsed.shoppingItems ?? seedData.shoppingItems,
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
