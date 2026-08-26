import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()),
    readingTime: z.number(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  articles,
};
