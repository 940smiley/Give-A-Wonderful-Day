import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Give-A-Wonderful-Day',
  description: 'Transparent, on-chain nonprofit donations powered by Ethereum and AI.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
