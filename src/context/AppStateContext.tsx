'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadAppState, saveAppState } from '../services/storageService';
import { seedData } from '../data/seedData';
import {
  AppState,
  FamilyTask,
  ShoppingItem,
  ShoppingCategory,
  FamilyEvent,
} from '../types/models';

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

interface AppStateContextValue {
  state: AppState;
  openTasks: number;
  shoppingToBuy: number;
  upcomingEvents: number;
  profileName: string;
  handleToggleTask: (taskId: string) => void;
  handleToggleShoppingItem: (itemId: string) => void;
  handleAddTask: (title: string, assignedToMemberId: string, dueDate: string) => void;
  handleAddShoppingItem: (title: string, quantity: string, category?: ShoppingCategory) => void;
  handleEditShoppingItem: (
    itemId: string,
    fields: { title: string; quantity: string; category: ShoppingCategory }
  ) => void;
  handleDeleteShoppingItem: (itemId: string) => void;
  handleClearPurchasedShopping: () => void;
  handleAddEvent: (title: string, date: string, time: string, location: string) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(seedData);

  useEffect(() => {
    setState(loadAppState());
  }, []);

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const openTasks = useMemo(
    () => state.tasks.filter((task) => task.status === 'open').length,
    [state.tasks]
  );

  const shoppingToBuy = useMemo(
    () => state.shoppingItems.filter((item) => !item.isPurchased).length,
    [state.shoppingItems]
  );

  const upcomingEvents = useMemo(() => state.events.length, [state.events]);

  const profileName = state.familyMembers[0]?.name || 'משפחה';

  function updateState(updated: Partial<AppState>) {
    setState((prev) => ({ ...prev, ...updated }));
  }

  function handleToggleTask(taskId: string) {
    updateState({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'done' ? 'open' : 'done' }
          : task
      ),
    });
  }

  function handleToggleShoppingItem(itemId: string) {
    updateState({
      shoppingItems: state.shoppingItems.map((item) =>
        item.id === itemId ? { ...item, isPurchased: !item.isPurchased } : item
      ),
    });
  }

  function handleAddTask(title: string, assignedToMemberId: string, dueDate: string) {
    const newTask: FamilyTask = {
      id: generateId('task'),
      title,
      assignedToMemberId,
      dueDate,
      status: 'open',
    };
    updateState({ tasks: [newTask, ...state.tasks] });
  }

  function handleAddShoppingItem(
    title: string,
    quantity: string,
    category: ShoppingCategory = 'אחר'
  ) {
    const newItem: ShoppingItem = {
      id: generateId('shopping'),
      title,
      quantity,
      category,
      isPurchased: false,
    };
    updateState({ shoppingItems: [newItem, ...state.shoppingItems] });
  }

  function handleEditShoppingItem(
    itemId: string,
    fields: { title: string; quantity: string; category: ShoppingCategory }
  ) {
    updateState({
      shoppingItems: state.shoppingItems.map((item) =>
        item.id === itemId ? { ...item, ...fields } : item
      ),
    });
  }

  function handleDeleteShoppingItem(itemId: string) {
    updateState({
      shoppingItems: state.shoppingItems.filter((item) => item.id !== itemId),
    });
  }

  function handleClearPurchasedShopping() {
    updateState({
      shoppingItems: state.shoppingItems.filter((item) => !item.isPurchased),
    });
  }

  function handleAddEvent(title: string, date: string, time: string, location: string) {
    const newEvent: FamilyEvent = {
      id: generateId('event'),
      title,
      date,
      time,
      location,
    };
    updateState({ events: [newEvent, ...state.events] });
  }

  const value: AppStateContextValue = {
    state,
    openTasks,
    shoppingToBuy,
    upcomingEvents,
    profileName,
    handleToggleTask,
    handleToggleShoppingItem,
    handleAddTask,
    handleAddShoppingItem,
    handleEditShoppingItem,
    handleDeleteShoppingItem,
    handleClearPurchasedShopping,
    handleAddEvent,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return ctx;
}
