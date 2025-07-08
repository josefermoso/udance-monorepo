import { getPublishedNews } from '../../../../../../packages/domain/news/queries';

export async function listNewsAction() {
  return getPublishedNews(12);
}
