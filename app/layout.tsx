import type { Metadata } from 'next';
import './globals.css';
import AppShell from '../src/components/AppShell';

export const metadata: Metadata = {
  title: 'Family House AI',
  description: 'POC dashboard for family tasks, events, shopping and AI assistant.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
