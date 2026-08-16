'use client';

import { TELEGRAM_BOTS, SOCIAL_CHANNELS } from '../../lib/telegram';

export default function SocialTelegramHub() {
  return (
    <section className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-900 mb-2">
            <span>✈️</span> Telegram Bots &amp; Multi-Platform Connectivity
          </div>
          <h2 className="text-2xl font-bold text-slate-950">Automated Telegram Bots &amp; Community Channels</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Access dedicated automated Telegram bots for instant announcements, donor receipts, confidential assistance tracking, and promotional outreach.
          </p>
        </div>

        {/* Telegram Bots Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TELEGRAM_BOTS.map((bot) => (
            <div
              key={bot.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-500 transition text-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-blue-800 text-[11px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {bot.handle}
                  </span>
                  <span className="text-base">🤖</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{bot.name}</h3>
                <p className="text-slate-500 font-medium text-[11px] mt-0.5">{bot.purpose}</p>
                <p className="text-slate-600 mt-2 leading-relaxed text-[11px]">{bot.description}</p>
              </div>

              <a
                href={bot.deepLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-center rounded-lg bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
              >
                Launch Bot in Telegram →
              </a>
            </div>
          ))}
        </div>

        {/* Social Platforms Row */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 text-xs">
          <span className="font-bold text-slate-700">Official Community &amp; Code Connectivity:</span>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_CHANNELS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-bold text-slate-800 hover:bg-slate-100 transition"
              >
                <span>{social.icon}</span>
                <span>{social.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
