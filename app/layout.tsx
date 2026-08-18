import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Give-A-Wonderful-Day',
  description:
    'A production-ready nonprofit platform foundation for nominations, donations, transparency, and staff-reviewed automation.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
