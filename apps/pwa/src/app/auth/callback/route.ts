import { NextResponse } from 'next/server';
import { createServerClient } from '@udance/shared';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/';

  if (!next.startsWith('/')) next = '/';

  if (code) {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data?.session?.user) {
      return NextResponse.redirect(
        `${origin}/auth/success?next=${encodeURIComponent(next)}`
      );
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
