// @ts-nocheck
import { createServerClient } from '@udance/shared';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DebugAuth({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createServerClient();
  const params = await searchParams;
  const urlError = params.error;

  // Environment variables debug info
  const envDebug = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? 'SET'
      : 'NOT SET',
    SUPABASE_URL: process.env.SUPABASE_URL || 'NOT SET',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    VERCEL_ENV: process.env.VERCEL_ENV || 'NOT SET',
    VERCEL_URL: process.env.VERCEL_URL || 'NOT SET',
  };

  console.log('=== AUTH DEBUG ENV VARS ===', envDebug);

  try {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.getUser();

    console.log('=== AUTH DEBUG SESSION ===', {
      hasUser: !!user,
      hasSession: !!session,
      userId: user?.id,
      userEmail: user?.email,
      error: error?.message,
    });

    if (error) {
      console.error('Auth error:', error);
    }

    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full mx-auto space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Authentication Debug
            </h2>
          </div>

          {urlError && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                URL Error
              </h3>
              <p className="text-red-700">{decodeURIComponent(urlError)}</p>
            </div>
          )}

          {/* Environment Variables Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Environment Variables</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(envDebug).map(([key, value]) => (
                <div key={key} className="border p-3 rounded">
                  <p className="font-semibold text-sm text-gray-600">{key}</p>
                  <p
                    className={`text-sm ${value === 'NOT SET' ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Session Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Auth Session Status</h3>

            {user ? (
              <div className="space-y-2">
                <p className="text-green-600 text-lg font-semibold">
                  ✅ User is authenticated
                </p>
                <div className="bg-green-50 p-4 rounded space-y-2">
                  <p>
                    <strong>ID:</strong> {user.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Provider:</strong> {user.app_metadata.provider}
                  </p>
                  <p>
                    <strong>Created:</strong>{' '}
                    {new Date(user.created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Last Sign In:</strong>{' '}
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleString()
                      : 'Never'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-red-600 text-lg font-semibold">
                  ❌ Auth session missing!
                </p>
                <div className="bg-red-50 p-4 rounded">
                  <p className="text-red-700">No user authenticated</p>
                  {error && (
                    <p className="text-red-700 mt-2">
                      <strong>Error:</strong> {error.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-2">
              <Link
                href="/login"
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Go to Login
              </Link>
              <Link
                href="/"
                className="block w-full text-center bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Debug page error:', error);
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
            <p className="text-red-700">
              Failed to check authentication status
            </p>
          </div>
        </div>
      </div>
    );
  }
}
