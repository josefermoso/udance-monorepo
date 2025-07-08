import { z } from 'zod';

export const NewsInput = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  summary: z.string().optional(),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isFeatured: z.boolean().optional(),
});

export type NewsInput = z.infer<typeof NewsInput>;
