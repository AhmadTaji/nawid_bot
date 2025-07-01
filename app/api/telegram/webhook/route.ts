// // // app/api/telegram/webhook/route.ts
// // import { NextRequest } from 'next/server';

// // const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
// // const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// // export async function POST(req: NextRequest) {
// //   const body = await req.json();
// //   const message = body.message;
// //   const chatId = message?.chat?.id;
// //   const text = message?.text?.toLowerCase();

// //   if (!chatId || !text) return new Response('No message', { status: 200 });

// //   let reply = '';

// //   if (text === '/start') {
// //     reply = '👋 Welcome to AhmadTaji Bot!\nType /products to see our items.';
// //   } else if (text === '/products') {
// //     reply = `🛍️ S25 — $2500\n📱 S24 — $250\n💻 Lenovo — $250`;
// //   } else {
// //     reply = `❓ I didn’t understand that. Try /products`;
// //   }

// //   await fetch(`${TELEGRAM_API}/sendMessage`, {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ chat_id: chatId, text: reply }),
// //   });

// //   return new Response('OK', { status: 200 });
// // }


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

//   const reply = text === '/start'
//     ? '👋 Welcome to AhmadTaji Bot!,can i help you?'
//     : `You said: ${text}`;

//   await fetch(`${TELEGRAM_API}/sendMessage`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ chat_id: chatId, text: reply }),
//   });

//   return new Response('OK', { status: 200 });
// }


// app/api/telegram/webhook/route.ts
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
//     reply = '👋 Welcome to AhmadTaji Bot! Can I help you?';
//   } else if (text === '/products') {
//     reply = `🛍️ S25 — $2500\n📱 S24 — $250\n💻 Lenovo — $250`;
//   } else if (text === '/kick' && message.reply_to_message) {
//     const targetUserId = message.reply_to_message.from.id;

//     const kickRes = await fetch(`${TELEGRAM_API}/kickChatMember`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         chat_id: chatId,
//         user_id: targetUserId,
//       }),
//     });

//     if (kickRes.ok) {
//       reply = `🚫 User has been removed from the group.`;
//     } else {
//       reply = `❌ Failed to remove user. Make sure I'm an admin with ban rights.`;
//     }
//   } else {
//     reply = `❓ I didn’t understand that. Try /products or reply to a user with /kick`;
//   }

//   await fetch(`${TELEGRAM_API}/sendMessage`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ chat_id: chatId, text: reply }),
//   });

//   return new Response('OK', { status: 200 });
// }


// app/api/telegram/webhook/route.ts
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
//     reply = '👋 Welcome to AhmadTaji Bot! Can I help you?';
//   } else if (text === '/products') {
//     reply = `🛍️ S25 — $2500\n📱 S24 — $250\n💻 Lenovo — $250`;
//   } else if ((text === '/kick' || text === '/ban') && message.reply_to_message) {
//     const targetUserId = message.reply_to_message.from.id;

//     const banRes = await fetch(`${TELEGRAM_API}/kickChatMember`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         chat_id: chatId,
//         user_id: targetUserId,
//       }),
//     });

//     if (banRes.ok) {
//       reply = `🚫 User has been banned from the group.`;
//     } else {
//       reply = `❌ Failed to ban user. Make sure I'm an admin with ban rights.`;
//     }
//   } else {
//     reply = `❓ Unknown command. Try /products or reply to a user with /kick or /ban`;
//   }

//   await fetch(`${TELEGRAM_API}/sendMessage`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ chat_id: chatId, text: reply }),
//   });

//   return new Response('OK', { status: 200 });
// }



// app/api/telegram/webhook/route.ts
// app/api/telegram/webhook/route.ts
import { NextRequest } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body.message;
  const chatId = message?.chat?.id;
  const text = message?.text;

  if (!chatId || !text || !text.startsWith('/')) {
    return new Response('Ignored non-command message', { status: 200 });
  }

  const command = text.split(' ')[0].toLowerCase();
  let reply = '';

  if (command === '/start') {
    reply = '👋 Welcome to AhmadTaji Bot! Can I help you?';
  } else if (command === '/products') {
    reply = `🛍️ S25 — $2500\n📱 S24 — $250\n💻 Lenovo — $250`;
  } else if ((command === '/kick' || command === '/ban') && message.reply_to_message) {
    const targetUserId = message.reply_to_message.from.id;

    const banRes = await fetch(`${TELEGRAM_API}/kickChatMember`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        user_id: targetUserId,
      }),
    });

    reply = banRes.ok
      ? `🚫 User has been removed from the group.`
      : `❌ Failed to remove user. Make sure I'm an admin with ban rights.`;
  } else if (command === '/tempban' && message.reply_to_message) {
    const targetUserId = message.reply_to_message.from.id;
    const durationMinutes = parseInt(text.split(' ')[1]) || 60;
    const untilDate = Math.floor(Date.now() / 1000) + durationMinutes * 60;

    const restrictRes = await fetch(`${TELEGRAM_API}/banChatMember`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        user_id: targetUserId,
        until_date: untilDate,
      }),
    });

    reply = restrictRes.ok
      ? `⏳ User has been banned for ${durationMinutes} minutes.`
      : `❌ Failed to temporarily ban user.`;
  } else if (command === '/remove_all') {
    // Placeholder: requires user tracking to implement
    reply = '⚠️ This command requires user tracking to remove all non-admins.';
  } else {
    reply = `❓ Unknown command. Try /products, /kick, /ban, or /tempban <minutes>`;
  }

  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: reply }),
  });

  return new Response('OK', { status: 200 });
}
