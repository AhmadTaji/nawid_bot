import type { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const message = req.body.message;
  const chatId = message?.chat?.id;
  const text = message?.text?.toLowerCase();

  if (!chatId || !text) return res.status(200).end();

  let reply = '';

  if (text === '/start') {
    reply = '👋 Welcome to AhmadTaji Bot!\nType /products to see our items.';
  } else if (text === '/products') {
    reply = `🛍️ S25 — $2500\n📱 S24 — $250\n💻 Lenovo — $250`;
  } else {
    reply = `❓ I didn’t understand that. Try /products`;
  }

  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: reply }),
  });

  res.status(200).end();
}
