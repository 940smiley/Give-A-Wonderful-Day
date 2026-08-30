import { TELEGRAM_BOTS } from '../lib/telegram';
import 'dotenv/config'; // Make sure you have dotenv installed or load env manually

async function main() {
  const baseUrl = process.env.APP_BASE_URL;
  if (!baseUrl) {
    console.error('Missing APP_BASE_URL in environment');
    process.exit(1);
  }

  console.log(`Setting up webhooks for base URL: ${baseUrl}`);

  for (const bot of TELEGRAM_BOTS) {
    const envKey = `TELEGRAM_BOT_TOKEN_${bot.id.toUpperCase().replace(/-/g, '_')}`;
    const token = process.env[envKey] || process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      console.warn(`[WARN] Skipping ${bot.name} - No token found for ${envKey}`);
      continue;
    }

    const webhookUrl = `${baseUrl.replace(/\/$/, '')}/api/telegram/webhook/${bot.id}`;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
      const data = await response.json();
      if (data.ok) {
        console.log(`[SUCCESS] Registered webhook for ${bot.name} -> ${webhookUrl}`);
      } else {
        console.error(`[ERROR] Failed for ${bot.name}:`, data.description);
      }
    } catch (err) {
      console.error(`[ERROR] Request failed for ${bot.name}:`, err);
    }
  }
}

main().catch(console.error);
