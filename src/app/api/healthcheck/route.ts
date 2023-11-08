import { db } from '~/server/db';

async function handler() {
  try {
    await db.$queryRaw`SELECT 1`;
    return Response.json({ ok: true })
  } catch (error) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export { handler as GET };
