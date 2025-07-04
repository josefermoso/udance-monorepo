import { createClient } from '../../../../utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DebugAuth({ searchParams }: { searchParams: { error?: string } }) {
  const supabase = await createClient();
  const urlError = searchParams.error;
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Auth error:', error);
    }

    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Authentication Debug
            </h2>
          </div>
          
          {urlError && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">URL Error</h3>
              <p className="text-red-700">{decodeURIComponent(urlError)}</p>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">User Status</h3>
            
            {user ? (
              <div className="space-y-2">
                <p className="text-green-600">✅ User is authenticated</p>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Provider:</strong> {user.app_metadata.provider}</p>
                <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
                <p><strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-red-600">❌ No user authenticated</p>
                {error && (
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-red-700"><strong>Error:</strong> {error.message}</p>
                  </div>
                )}
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
            <p className="text-red-700">Failed to check authentication status</p>
          </div>
        </div>
      </div>
    );
  }
} 