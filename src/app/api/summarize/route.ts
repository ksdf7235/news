// src/app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchArticleContent } from '@/lib/fetch-article';
import { summarizeArticle } from '@/lib/summary';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    

    if (!url) {
      return NextResponse.json({ error: 'URL이 필요합니다.' }, { status: 400 });
    }


    const content = await fetchArticleContent(url);
    const summary = await summarizeArticle(content);



    return NextResponse.json({ summary });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '요약 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}