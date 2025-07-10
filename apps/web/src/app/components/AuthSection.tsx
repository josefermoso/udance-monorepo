'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@udance/shared';
import { publicAction, protectedAction } from '../actions';

export function AuthSection() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session - use getUser to force cookie read
    const getInitialSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setUser(user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = createClient();

    // Use environment variable for redirect URL, fallback to current origin
    const redirectTo =
      process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ||
      `${window.location.origin}/auth/callback`;

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="text-center space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              Welcome back, <span className="font-semibold">{user.email}</span>!
            </p>
          </div>

          <div className="space-y-4">
            <form action={publicAction}>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Test Public Action
              </button>
            </form>

            <form action={protectedAction}>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Test Protected Action
              </button>
            </form>
          </div>

          <button
            onClick={signOut}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Sign Out
          </button>

          {/* Navigation to other apps */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
              Explore uDance Apps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="http://localhost:4000"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-center"
              >
                Admin Panel
              </a>

              <a
                href="http://localhost:5000"
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white p-4 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Mobile App</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <p className="text-gray-600 mb-6">
            Your ultimate dance platform experience awaits. Sign in to access
            exclusive features, connect with the dance community, and take your
            passion to the next level.
          </p>

          <button
            onClick={signInWithGoogle}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Try our public features:
            </h3>
            <form action={publicAction}>
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Test Public Action (No Auth Required)
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
