'use client';

import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../src/components/Sidebar';
import Header from '../src/components/Header';
import DashboardCard from '../src/components/DashboardCard';
import TasksCard from '../src/components/TasksCard';
import ShoppingListCard from '../src/components/ShoppingListCard';
import EventsCard from '../src/components/EventsCard';
import FamilyMembersCard from '../src/components/FamilyMembersCard';
import AiAssistantCard from '../src/components/AiAssistantCard';
import { loadAppState, saveAppState } from '../src/services/storageService';
import { seedData } from '../src/data/seedData';
import {
  FamilyTask,
  ShoppingItem,
  FamilyEvent,
  AppState,
} from '../src/types/models';

const DEFAULT_SECTION = 'home';

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION);
  const [state, setState] = useState<AppState>(seedData);

  useEffect(() => {
    const stored = loadAppState();
    setState(stored);
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

  function handleAddShoppingItem(title: string, quantity: string) {
    const newItem: ShoppingItem = {
      id: generateId('shopping'),
      title,
      quantity,
      isPurchased: false,
    };

    updateState({ shoppingItems: [newItem, ...state.shoppingItems] });
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

  return (
    <div className="app-shell">
      <Sidebar activeKey={activeSection} onChange={setActiveSection} />
      <main className="main-content">
        <Header
          activeSection={activeSection}
          profileName={profileName}
          openTasks={openTasks}
          shoppingToBuy={shoppingToBuy}
          upcomingEvents={upcomingEvents}
        />

        <section className="summary-grid">
          <DashboardCard title="מטלות" value={openTasks} description="מטלות שעדיין פתוחות למשפחה" />
          <DashboardCard title="קניות" value={shoppingToBuy} description="פריטים שעדיין לא קנו" />
          <DashboardCard title="אירועים" value={upcomingEvents} description="אירועים קרובים וזכרונות משפחתיים" />
        </section>

        <section className="content-grid">
          <TasksCard
            tasks={state.tasks}
            familyMembers={state.familyMembers}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />

          <ShoppingListCard
            items={state.shoppingItems}
            onAddItem={handleAddShoppingItem}
            onToggleItem={handleToggleShoppingItem}
          />

          <EventsCard events={state.events} onAddEvent={handleAddEvent} />

          <FamilyMembersCard familyMembers={state.familyMembers} />

          <AiAssistantCard
            onAddTask={handleAddTask}
            onAddShoppingItem={handleAddShoppingItem}
            onAddEvent={handleAddEvent}
            familyMembers={state.familyMembers}
          />
        </section>
      </main>
    </div>
  );
}
