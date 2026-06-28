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
  currentUserId: string;
  setCurrentUserId: (userId: string) => void;
  handleCompleteTask: (taskId: string) => void;
  handleFailTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
  handleToggleShoppingItem: (itemId: string) => void;
  handleAddTask: (title: string, assignedToMemberIds: string[], dueDate: string) => void;
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
  const [currentUserId, setCurrentUserId] = useState<string>(
    seedData.familyMembers[0]?.id ?? ''
  );

  useEffect(() => {
    const stored = loadAppState();
    setState(stored);
    setCurrentUserId((prev) => stored.familyMembers[0]?.id ?? prev);
  }, []);

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Keep the active user valid if the family list changes.
  useEffect(() => {
    if (!state.familyMembers.some((member) => member.id === currentUserId)) {
      setCurrentUserId(state.familyMembers[0]?.id ?? '');
    }
  }, [state.familyMembers, currentUserId]);

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

  function removeTask(taskId: string) {
    updateState({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    });
  }

  function handleCompleteTask(taskId: string) {
    removeTask(taskId);
  }

  function handleFailTask(taskId: string) {
    removeTask(taskId);
  }

  function handleDeleteTask(taskId: string) {
    // Only the creator may delete a task they opened.
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task || task.createdByMemberId !== currentUserId) {
      return;
    }
    removeTask(taskId);
  }

  function handleToggleShoppingItem(itemId: string) {
    updateState({
      shoppingItems: state.shoppingItems.map((item) =>
        item.id === itemId ? { ...item, isPurchased: !item.isPurchased } : item
      ),
    });
  }

  function handleAddTask(title: string, assignedToMemberIds: string[], dueDate: string) {
    const newTask: FamilyTask = {
      id: generateId('task'),
      title,
      createdByMemberId: currentUserId || state.familyMembers[0]?.id || 'unknown',
      assignedToMemberIds,
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
    currentUserId,
    setCurrentUserId,
    handleCompleteTask,
    handleFailTask,
    handleDeleteTask,
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
