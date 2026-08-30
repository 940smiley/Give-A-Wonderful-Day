import { NextResponse } from 'next/server';
import { TELEGRAM_BOTS } from '../../../../../lib/telegram';

export async function POST(
  request: Request,
  { params }: { params: { botId: string } }
) {
  const { botId } = params;
  const bot = TELEGRAM_BOTS.find((b) => b.id === botId);
  if (!bot) return NextResponse.json({ error: 'Bot not found' }, { status: 404 });

  const envKey = `TELEGRAM_BOT_TOKEN_${botId.toUpperCase().replace(/-/g, '_')}`;
  const token = process.env[envKey] || process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.warn(`No token found for bot: ${botId} (${envKey})`);
    return NextResponse.json({ error: 'Token not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const message = body.message;

    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text.trim();

    let replyText = '';
    let replyMarkup = undefined;
    const baseUrl = process.env.APP_BASE_URL || 'https://giveawonderfulday.example.org';

    if (text.startsWith('/start')) {
      replyText = `Welcome to the ${bot.name}!\n\n${bot.purpose}\n\n${bot.description}\n\nClick the button below to launch the GAWD App.`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: 'Launch GAWD App', web_app: { url: baseUrl } }]
        ]
      };
    } else if (text.startsWith('/donate')) {
      replyText = `Support our mission! You can donate via Ethereum or TON Network.\n\nOpen the app to make a contribution.`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: 'Donate Now', web_app: { url: `${baseUrl}/donate` } }]
        ]
      };
    } else if (text.startsWith('/help')) {
      replyText = `Here to help!\n\n${bot.purpose}\n\nCommands:\n/start - Open the App\n/donate - Make a contribution\n/help - Show this message`;
    } else {
      replyText = `I am the ${bot.name}. Use /start to launch the app!`;
    }

    const payload: any = {
      chat_id: chatId,
      text: replyText,
    };
    
    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`Webhook error for ${botId}:`, error);
    return NextResponse.json({ ok: true });
  }
}
