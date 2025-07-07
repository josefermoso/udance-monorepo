'use client';

import { useEffect, useState, Suspense } from 'react';
import { createClient } from '@udance/shared';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthSuccessInner() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error('Auth check error:', error);
          setError(error.message);
          return;
        }

        if (user) {
          setTimeout(() => {
            router.push(nextUrl);
          }, 300);
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Authentication check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, nextUrl]);

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-error mb-4">
            Authentication Error
          </h1>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="btn btn-primary w-full"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full text-center">
        <span className="loading loading-spinner loading-lg mx-auto mb-4"></span>
        <h1 className="text-2xl font-bold mb-2">Completing Authentication</h1>
        <p>Please wait while we finish setting up your session...</p>
        <p className="text-sm opacity-60 mt-2">Redirecting to: {nextUrl}</p>
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
