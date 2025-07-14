// src/lib/rss.ts
import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchNewsFromRSS(feedUrl: string) {
  const feed = await parser.parseURL(feedUrl);

  return feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    contentSnippet: item.contentSnippet,
  }));
}
