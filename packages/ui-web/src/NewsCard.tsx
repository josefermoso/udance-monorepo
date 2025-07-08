interface NewsCardProps {
  article: {
    id: string;
    title: string;
    summary?: string | null;
    imageUrl?: string | null;
    publishedAt?: string | null;
  };
  featured?: boolean;
}

export function NewsCard({ article, featured }: NewsCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${featured ? 'col-span-full md:col-span-2' : ''}`}
    >
      {article.imageUrl && (
        <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
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
