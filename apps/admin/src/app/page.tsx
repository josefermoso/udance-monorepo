import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@udance/shared';

export default async function AdminPage() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="navbar bg-base-100 shadow mb-6 rounded-box">
        <div className="flex-1">
          <a className="text-xl font-bold">uDance Admin</a>
        </div>
        <div className="flex-none gap-4">
          <span className="text-sm opacity-70">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="btn btn-error btn-sm text-white">
              Sign Out
            </button>
          </form>
        </div>
      </div>

      <main className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Example card using DaisyUI */}
        <div className="card bg-primary text-primary-content shadow">
          <div className="card-body">
            <h2 className="card-title">Total Venues</h2>
            <p className="text-2xl">0</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm">Manage venues</button>
            </div>
          </div>
        </div>
        {/* Add more cards... */}
      </main>

      <div className="mt-10">
        <h2 className="text-lg font-medium mb-4">Navigation</h2>
        <div className="join">
          <Link href="/" className="btn join-item">
            ← Back to Web App
          </Link>
          <a href="http://localhost:5000" className="btn join-item">
            View PWA →
          </a>
        </div>
      </div>
    </div>
  );
}
