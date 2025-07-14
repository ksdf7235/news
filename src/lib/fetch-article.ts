import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export async function fetchArticleContent(url: string): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();

  const dom = new JSDOM(html, { url }); // url 꼭 넣어야 상대경로 파싱 가능
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  return article?.textContent || '본문을 찾을 수 없습니다.';
}