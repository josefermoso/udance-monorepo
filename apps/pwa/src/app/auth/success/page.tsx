'use client';

import { useEffect, useState, Suspense } from 'react';
import { createClient } from '@udance/shared';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthSuccessInner() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/';

  useEffect(() => {
    const check = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          router.replace(nextUrl);
        } else {
          router.replace('/login');
        }
      } catch (e: any) {
        setError(e.message || 'Auth error');
      }
    };
    check();
  }, [router, nextUrl]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="bg-white p-6 rounded-xl shadow max-w-md w-full text-center">
          <h1 className="text-xl font-semibold text-rose-600 mb-4">
            Authentication Error
          </h1>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => router.replace('/login')}
            className="btn btn-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <div className="text-center space-y-4">
        <span className="loading loading-spinner loading-lg text-rose-500"></span>
        <p className="text-rose-500 font-medium">Setting up your session...</p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <AuthSuccessInner />
    </Suspense>
  );
}
