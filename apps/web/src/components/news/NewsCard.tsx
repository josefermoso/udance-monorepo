import Link from 'next/link';
import type { News } from '@udance/domain/news';

interface NewsCardProps {
  article: News;
  variant?: 'default' | 'featured';
}

export function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(article.createdAt!).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  const summary =
    article.summary ||
    (article.content?.length > 150
      ? article.content.substring(0, 150) + '...'
      : article.content);

  return (
    <Link href={`/news/${article.id}`}>
      <article
        className={`
        bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 
        border hover:border-blue-200 group cursor-pointer
        ${variant === 'featured' ? 'md:col-span-2 lg:col-span-3' : ''}
      `}
      >
        {article.imageUrl && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className={`p-6 ${variant === 'featured' ? 'md:p-8' : ''}`}>
          {article.isFeatured && (
            <div className="flex items-center mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Featured
              </span>
            </div>
          )}

          <h3
            className={`
            font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors
            ${variant === 'featured' ? 'text-2xl md:text-3xl' : 'text-lg'}
          `}
          >
            {article.title}
          </h3>

          {summary && (
            <p
              className={`
              text-gray-600 leading-relaxed mb-4
              ${variant === 'featured' ? 'text-base md:text-lg' : 'text-sm'}
            `}
            >
              {summary}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-400">
            <time
              dateTime={
                article.publishedAt?.toISOString() ||
                article.createdAt?.toISOString()
              }
            >
              {formattedDate}
            </time>
            {article.category && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {article.category}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
