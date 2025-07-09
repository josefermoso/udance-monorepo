import type { News } from '@udance/domain/news';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  articles: News[];
  showFeatured?: boolean;
}

export function NewsList({ articles, showFeatured = false }: NewsListProps) {
  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No news articles
        </h3>
        <p className="text-gray-500">
          There are no news articles to display at the moment.
        </p>
      </div>
    );
  }

  // Separate featured and regular articles
  const featuredArticles = showFeatured
    ? articles.filter((article) => article.isFeatured)
    : [];
  const regularArticles = showFeatured
    ? articles.filter((article) => !article.isFeatured)
    : articles;

  return (
    <div className="space-y-8">
      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Regular Articles Section */}
      {regularArticles.length > 0 && (
        <section>
          {showFeatured && featuredArticles.length > 0 && (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Latest News
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
