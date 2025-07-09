import { getPublishedNews } from '@udance/domain/news';
import { NewsList } from '../../../components/news/NewsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News | UDance',
  description:
    'Stay up to date with the latest news and updates from the UDance community.',
};

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  // Fetch published news articles
  const articles = await getPublishedNews(20);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h1>
        <p className="text-lg text-gray-600">
          Stay up to date with the latest news and updates from the UDance
          community.
        </p>
      </div>

      {/* News Articles */}
      <NewsList articles={articles} showFeatured={true} />
    </div>
  );
}
