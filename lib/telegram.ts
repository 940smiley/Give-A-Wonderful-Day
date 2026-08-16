export type TelegramBotConfig = {
  id: string;
  name: string;
  handle: string;
  purpose: string;
  description: string;
  deepLink: string;
};

export const TELEGRAM_BOTS: TelegramBotConfig[] = [
  {
    id: 'announcements',
    name: 'GAWD Announcements Bot',
    handle: '@GiveAWonderfulDayAnnounceBot',
    purpose: 'Public Community News & Impact Announcements',
    description: 'Broadcasts verified impact milestones, community stories (with 100% consent), and quarterly governance reports.',
    deepLink: 'https://t.me/GiveAWonderfulDayAnnounceBot',
  },
  {
    id: 'donor-hub',
    name: 'GAWD Donor & Investor Bot',
    handle: '@GiveAWonderfulDayDonorBot',
    purpose: 'Donor Receipts & Transparent Allocation Tracking',
    description: 'Check receipt status, track live capital deployment metrics, receive thank-you notes, and view on-chain donation events.',
    deepLink: 'https://t.me/GiveAWonderfulDayDonorBot',
  },
  {
    id: 'assistance-help',
    name: 'GAWD Assistance & Crisis Navigation Bot',
    handle: '@GiveAWonderfulDayHelpBot',
    purpose: 'Confidential Application Status & 24/7 Crisis Hotline Finder',
    description: 'Track your assistance application status securely, connect with local emergency shelters, and access immediate crisis hotlines.',
    deepLink: 'https://t.me/GiveAWonderfulDayHelpBot',
  },
  {
    id: 'promotional-outreach',
    name: 'GAWD Promotional & Community Outreach Bot',
    handle: '@GiveAWonderfulDayPromoBot',
    purpose: 'Promotional Campaigns & Volunteer Coordination',
    description: 'Share kindness campaign materials, sign up for local volunteer cohorts, and coordinate cross-agency community events.',
    deepLink: 'https://t.me/GiveAWonderfulDayPromoBot',
  },
];

export type SocialChannel = {
  platform: string;
  handle: string;
  url: string;
  icon: string;
};

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    platform: 'Telegram Hub',
    handle: 't.me/GiveAWonderfulDay',
    url: 'https://t.me/GiveAWonderfulDayHelpBot',
    icon: '✈️',
  },
  {
    platform: 'X (Twitter)',
    handle: '@GiveAWonderDay',
    url: 'https://x.com/GiveAWonderDay',
    icon: '𝕏',
  },
  {
    platform: 'Discord Community',
    handle: 'discord.gg/giveawonderfulday',
    url: 'https://discord.gg/giveawonderfulday',
    icon: '💬',
  },
  {
    platform: 'GitHub Repository',
    handle: 'github.com/940smiley/Give-A-Wonderful-Day',
    url: 'https://github.com/940smiley/Give-A-Wonderful-Day',
    icon: '🐙',
  },
];

export async function sendTelegramBotNotification(
  botId: string,
  payload: { chat_id?: string; text: string; parse_mode?: string },
): Promise<{ success: boolean; message: string }> {
  // Configured bot dispatcher simulation / webhook endpoint integration
  if (process.env.TELEGRAM_BOT_TOKEN) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return { success: response.ok, message: response.ok ? 'Notification dispatched' : 'Telegram API error' };
    } catch {
      return { success: false, message: 'Telegram dispatch failed' };
    }
  }

  return { success: true, message: `[Simulated Telegram Bot ${botId} Message]: ${payload.text}` };
}
