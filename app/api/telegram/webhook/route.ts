// // app/api/telegram/webhook/route.ts
// import { NextRequest } from 'next/server';

// const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
// const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const message = body.message;
//   const chatId = message?.chat?.id;
//   const text = message?.text?.toLowerCase();

//   if (!chatId || !text) return new Response('No message', { status: 200 });

//   let reply = '';

//   if (text === '/start') {
//     reply = '👋 Welcome to AhmadTaji Bot!\nType /products to see our items.';
//   } else if (text === '/products') {
//     reply = `🛍️ S25 — $2500\n📱 S24 — $250\n💻 Lenovo — $250`;
//   } else {
//     reply = `❓ I didn’t understand that. Try /products`;
//   }

//   await fetch(`${TELEGRAM_API}/sendMessage`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ chat_id: chatId, text: reply }),
//   });

//   return new Response('OK', { status: 200 });
// }


// app/api/telegram/webhook/route.ts
import { NextRequest } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body.message;
  const chatId = message?.chat?.id;
  const text = message?.text?.toLowerCase();

  if (!chatId || !text) return new Response('No message', { status: 200 });

  const reply = text === '/start'
    ? '👋 Welcome to AhmadTaji Bot!,can i help you?'
    : `You said: ${text}`;

  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: reply }),
  });

  return new Response('OK', { status: 200 });
}
