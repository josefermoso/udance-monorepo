import { getFeaturedNews } from '@udance/domain/news';
import { AuthSection } from './components/AuthSection';
import type { News } from '@udance/domain/news';

// Simple NewsCard component inline
function NewsCard({
  article,
}: {
  article: {
    id: string;
    title: string;
    summary?: string | null;
    publishedAt?: string | null;
  };
}) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {article.summary}
          </p>
        )}
        {article.publishedAt && (
          <p className="text-xs text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

// This is now a Server Component using Next.js 15 best practices
export default async function HomePage() {
  // Fetch news data on the server
  const featuredNews = await getFeaturedNews(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main Hero Section */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Welcome to UDance
          </h1>

          {/* Auth section as client component */}
          <AuthSection />
        </div>

        {/* News Section */}
        {featuredNews.length > 0 && (
          <section className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
              <span className="text-sm text-gray-500">
                {featuredNews.length} articles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.map((article: News) => (
                <NewsCard
                  key={article.id}
                  article={{
                    id: article.id,
                    title: article.title,
                    summary: article.content?.substring(0, 120) + '...',
                    publishedAt: article.publishedAt?.toISOString() || null,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Feature highlights */}
        <section className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why Choose UDance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </section>
      </div>
    </div>
  );
}
