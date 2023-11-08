import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';

export default async function handler(request: Request) {
  
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
