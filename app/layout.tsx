import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import TelegramMiniAppInit from './components/TelegramMiniAppInit';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Give-A-Wonderful-Day',
  description: 'Funding and operational transparency platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        <TelegramMiniAppInit />
        {children}
      </body>
    </html>
  );
}
