import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/home"
              className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              UDance
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                href="/news"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                News
              </Link>
              <Link
                href="/events"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Events
              </Link>
              <Link
                href="/studios"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Studios
              </Link>
              <Link
                href="/instructors"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Instructors
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
