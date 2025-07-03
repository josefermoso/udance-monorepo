'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { publicAction, protectedAction } from './actions';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
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
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Welcome to UDance
          </h1>

          {user ? (
            <div className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  Welcome back,{' '}
                  <span className="font-semibold">{user.email}</span>!
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
            </div>
          ) : (
            <div className="text-center space-y-6">
              <p className="text-gray-600 mb-6">
                Your ultimate dance platform experience awaits. Sign in to
                access exclusive features, connect with the dance community, and
                take your passion to the next level.
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

          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕺</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Learn Dance</h3>
              <p className="text-gray-600 text-sm">
                Access comprehensive dance tutorials and lessons
              </p>
            </div>

            <div className="text-center p-4">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Connect</h3>
              <p className="text-gray-600 text-sm">
                Join a vibrant community of dance enthusiasts
              </p>
            </div>

            <div className="text-center p-4">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Compete</h3>
              <p className="text-gray-600 text-sm">
                Participate in competitions and showcase your skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
