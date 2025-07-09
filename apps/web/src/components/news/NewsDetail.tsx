import Link from 'next/link';
import type { News } from '@udance/domain/news';

interface NewsDetailProps {
  article: News;
}

export function NewsDetail({ article }: NewsDetailProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date(article.createdAt!).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/news" className="hover:text-blue-600 transition-colors">
          News
        </Link>
        <span>/</span>
        <span className="text-gray-800">{article.title}</span>
      </nav>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Featured image */}
        {article.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* Article metadata */}
          <div className="flex items-center space-x-4 mb-6">
            {article.isFeatured && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            {article.category && (
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                {article.category}
              </span>
            )}
            <time
              dateTime={
                article.publishedAt?.toISOString() ||
                article.createdAt?.toISOString()
              }
              className="text-gray-500 text-sm"
            >
              {formattedDate}
            </time>
          </div>

          {/* Article title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Article summary */}
          {article.summary && (
            <div className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-200 pl-6">
              {article.summary}
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Back to news link */}
      <div className="mt-8">
        <Link
          href="/news"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to News
        </Link>
      </div>
    </div>
  );
}
