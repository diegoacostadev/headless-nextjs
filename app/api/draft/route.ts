import { NextRequest } from "next/server";
import { draftMode } from 'next/headers';
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const disable = searchParams.get('disable');

  if (!secret) {
    return new Response('Missing secret', { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }

  if (disable == 'true') {
    draftMode().disable();
    redirect('/');
  }

  draftMode().enable();
  redirect('/');
}
