'use client';

import { createClient } from '@udance/shared';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">UDance Admin Login</h2>
          <p>Access the management dashboard</p>
          <div className="card-actions mt-4">
            <button onClick={signInWithGoogle} className="btn btn-primary">
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
