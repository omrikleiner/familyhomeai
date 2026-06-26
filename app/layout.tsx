import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
