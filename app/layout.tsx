import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Family Home AI POC',
  description: 'Proof of concept for family home AI using Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
