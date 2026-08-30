'use client';

import { useEffect } from 'react';

// Extend window object for Telegram Web App
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        // Add other properties as needed
      };
    };
  }
}

export default function TelegramMiniAppInit() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);
  return null;
}
