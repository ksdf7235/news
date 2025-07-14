// src/app/api/news/route.ts
import { NextResponse } from 'next/server';
import { fetchNewsFromRSS } from '@/lib/rss';

export async function GET() {
  const feedUrl = 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'; // 예시
    const articles = await fetchNewsFromRSS(feedUrl);
    console.log(articles)
  return NextResponse.json({ articles });
}
