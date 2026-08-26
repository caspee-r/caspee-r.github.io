import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');

  return rss({
	title: 'Sami Djellabi',
	description: 'Software engineering and technical writing.',
	site: context.site,

	items: articles.map((article) => ({
	  title: article.data.title,
	  description: article.data.description,
	  pubDate: article.data.pubDate,
	  link: `/articles/${article.slug}/`,
	})),

	customData: '<language>en-us</language>',
  });
}
