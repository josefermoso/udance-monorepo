import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '../../../../utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/';

  console.log('Auth callback triggered:', { code: code ? 'present' : 'missing', next, origin });

  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/';
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Exchange error:', error);
      return NextResponse.redirect(`${origin}/debug/auth?error=${encodeURIComponent(error.message)}`);
    }
    
    if (data?.session?.user) {
      console.log('Session established for user:', data.session.user.email);
      console.log('Redirecting to auth success page');
      
      // Redirect to a client-side success page that will handle the final redirect
      return NextResponse.redirect(`${origin}/auth/success?next=${encodeURIComponent(next)}`);
    }
  }

  // return the user to an error page with instructions
  console.log('Auth callback failed - redirecting to debug page');
  return NextResponse.redirect(`${origin}/debug/auth?error=no_code_or_session`);
}
