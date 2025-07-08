import { db } from '../../shared/src/db';
import { news } from './schema';
import { NewsInput } from './zod';
import { eq } from 'drizzle-orm';

export async function createNews(input: NewsInput) {
  const [row] = await db.insert(news).values(input).returning();
  return row;
}

export async function updateNews(id: string, input: Partial<NewsInput>) {
  const [row] = await db
    .update(news)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(news.id, id))
    .returning();
  return row;
}

export async function deleteNews(id: string) {
  return db.delete(news).where(eq(news.id, id));
}
