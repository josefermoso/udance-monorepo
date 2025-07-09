import { notFound } from 'next/navigation';
import { getNewsById } from '@udance/domain/news';
import { NewsDetail } from '../../../../components/news/NewsDetail';
import type { Metadata } from 'next';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    return {
      title: 'News Article Not Found | UDance',
    };
  }

  return {
    title: `${article.title} | UDance`,
    description: article.summary || article.content?.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.summary || article.content?.substring(0, 160),
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      ...(article.imageUrl && { images: [article.imageUrl] }),
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    notFound();
  }

  return <NewsDetail article={article} />;
}
