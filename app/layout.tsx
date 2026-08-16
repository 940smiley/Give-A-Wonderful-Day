<<<<<<< HEAD
import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Give A Wonderful Day | Local-first kindness demo",
  description: "A mission-first mobile DApp demo for recording small kindness moments before committing to Web3 infrastructure.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
=======
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
>>>>>>> origin/codex/production-readiness-upgrade
}
