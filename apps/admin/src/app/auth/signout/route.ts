import { NextResponse } from 'next/server';
import { createServerClient } from '@udance/shared';

export async function POST(request: Request) {
  const supabase = await createServerClient();
  // Sign out clears auth cookies
  await supabase.auth.signOut();
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/login`, 302);
}
