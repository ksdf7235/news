'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [summaries, setSummaries] = useState<{ [url: string]: string }>({});
  const [visible, setVisible] = useState<{ [url: string]: boolean }>({});
  const [loadingUrl, setLoadingUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  }, []);

  const handleSummarizeToggle = async (url: string) => {
    // 요약이 이미 있다면 토글만
    if (summaries[url]) {
      setVisible((prev) => ({ ...prev, [url]: !prev[url] }));
      return;
    }

    // 요약이 없다면 fetch
    setLoadingUrl(url);
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();

    setSummaries((prev) => ({ ...prev, [url]: data.summary }));
    setVisible((prev) => ({ ...prev, [url]: true }));
    setLoadingUrl(null);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">실시간 뉴스 (RSS)</h1>
      <ul className="space-y-6">
        {articles.map((article, index) => (
              <li
  key={index}
  className="relative flex max-w-4xl w-full flex-row items-start gap-4 p-4 rounded-2xl shadow-md border border-gray-200 bg-white dark:bg-zinc-900 h-[180px]"
>
  {/* 왼쪽: 이미지 (카드 높이와 동일하게 맞춤) */}
  <div className="w-40 h-full bg-gray-200 dark:bg-zinc-800 rounded-md overflow-hidden flex items-center justify-center shrink-0">
    {article.image ? (
      <img
        src={article.image}
        alt="기사 이미지"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-xs text-gray-500">No Image</span>
    )}
  </div>

  {/* 가운데: 텍스트 */}
  <div className="flex-1 relative pr-28 flex flex-col justify-start">
    <a
      href={article.link}
      target="_blank"
      className="text-lg font-semibold text-blue-600 underline break-words"
    >
      {article.title}
    </a>
    <p className="text-sm text-gray-500">{article.pubDate}</p>

    {visible[article.link] && summaries[article.link] && (
      <div className="mt-2 max-h-[70px] overflow-y-auto text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap rounded border border-gray-100 dark:border-zinc-700 p-2">
        📄 {summaries[article.link]}
      </div>
    )}
  </div>

  {/* 오른쪽 버튼 */}
  <div className="absolute top-4 right-4">
<button
  onClick={() => handleSummarizeToggle(article.link)}
  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm w-28 text-center"
  disabled={loadingUrl === article.link}
>
  {loadingUrl === article.link
    ? '요약 중...'
    : summaries[article.link]
    ? visible[article.link]
      ? '요약 숨기기'
      : '요약 보기'
    : '요약 요청'}
</button>
  </div>
</li>






        ))}
      </ul>
    </main>
  );
}
