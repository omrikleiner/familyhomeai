import { AppState } from '../types/models';
import { seedData } from '../data/seedData';

export const STORAGE_KEY = 'family-house-ai-state';

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

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

    const parsed = JSON.parse(raw) as unknown;
    const parsedState = parsed as Partial<AppState> & {
      tasks?: Array<Partial<AppState['tasks'][number]> & { assignedToMemberId?: string }>;
    };
    const familyMembers = parsedState.familyMembers ?? seedData.familyMembers;
    const defaultMemberId = familyMembers[0]?.id ?? seedData.familyMembers[0].id;

    const tasks = (parsedState.tasks ?? seedData.tasks).map((rawTask) => {
      const task = rawTask as Partial<AppState['tasks'][number]> & {
        assignedToMemberId?: string;
      };

      return {
        ...task,
        createdByMemberId: task.createdByMemberId ?? task.assignedToMemberId ?? defaultMemberId,
        assignedToMemberIds:
          task.assignedToMemberIds ?? (task.assignedToMemberId ? [task.assignedToMemberId] : []),
        dueDate: task.dueDate,
        id: task.id ?? generateId('task'),
        title: task.title ?? 'לא הוגדרה מטלה',
        status: task.status ?? 'open',
      } as AppState['tasks'][number];
    });

    return {
      familyMembers,
      tasks,
      shoppingItems: parsedState.shoppingItems ?? seedData.shoppingItems,
      events: parsedState.events ?? seedData.events,
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
