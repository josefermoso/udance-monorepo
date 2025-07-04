'use client';

import { createClient } from '../../../utils/supabase/client';

export default function TestOAuth() {
  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('OAuth error:', error);
      alert(`OAuth error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            OAuth Test
          </h2>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Manual OAuth Test</h3>
          
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Test Google Sign In
          </button>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Expected redirect URL: {typeof window !== 'undefined' && window.location.origin}/auth/callback</p>
            <p>Current URL: {typeof window !== 'undefined' && window.location.href}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 