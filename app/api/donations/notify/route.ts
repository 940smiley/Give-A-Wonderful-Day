import { NextResponse } from 'next/server';
import { sendTelegramBotNotification } from '../../../../lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { network, amount, txHash, message } = body;

    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (!adminChatId) {
      return NextResponse.json({ success: false, error: 'Admin chat ID not configured' });
    }

    const text = `🎉 *New Donation Received!*\n\n*Network:* ${network}\n*Amount:* ${amount}\n*Message:* ${message || 'None'}\n*TX Hash:* \`${txHash}\``;

    // Send via Donor Hub bot
    const result = await sendTelegramBotNotification('donor-hub', {
      chat_id: adminChatId,
      text,
      parse_mode: 'Markdown',
    });

    return NextResponse.json({ success: result.success });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Notification failed' }, { status: 500 });
  }
}
