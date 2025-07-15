import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['media:content'],
  },
});

export async function fetchNewsFromRSS(feedUrl: string) {
  const feed = await parser.parseURL(feedUrl);

  return feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: item.contentSnippet || null,
    image: item['media:content']?.$?.url || null, // ✅ 이미지 URL 추출
  }));
}
