import { db } from '../../shared/src/db';
import { news } from './schema';
import { desc, eq, isNotNull, and } from 'drizzle-orm';

export async function getPublishedNews(limit = 10) {
  return db
    .select()
    .from(news)
    .where(eq(news.status, 'published'))
    .orderBy(desc(news.publishedAt ?? news.createdAt))
    .limit(limit);
}

export async function getFeaturedNews(limit = 3) {
  return db
    .select()
    .from(news)
    .where(and(eq(news.isFeatured, true), eq(news.status, 'published')))
    .orderBy(desc(news.createdAt))
    .limit(limit);
}

export async function getAllNews(limit = 10) {
  return db.select().from(news).orderBy(desc(news.createdAt)).limit(limit);
}
