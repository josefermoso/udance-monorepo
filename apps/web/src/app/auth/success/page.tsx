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
          console.log('User authenticated, redirecting to:', nextUrl);
          // Small delay to ensure session is fully established
          setTimeout(() => {
            if (nextUrl === window.location.pathname) {
              // Force reload when redirecting to same page to refresh Supabase state
              window.location.href = nextUrl;
            } else {
              router.push(nextUrl);
            }
          }, 500);
        } else {
          console.log('No user found, redirecting to login');
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Completing Authentication
        </h1>
        <p className="text-gray-600">
          Please wait while we finish setting up your session...
        </p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to: {nextUrl}</p>
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
