'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [summaries, setSummaries] = useState<{ [url: string]: string }>({});
  const [loadingUrl, setLoadingUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  }, []);

  const handleSummarize = async (url: string) => {
    setLoadingUrl(url);
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setSummaries((prev) => ({ ...prev, [url]: data.summary }));
    setLoadingUrl(null);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">실시간 뉴스 (RSS)</h1>
      <ul className="space-y-8">
        {articles.map((article, index) => (
          <li key={index} className="border-b pb-4">
            <a
              href={article.link}
              target="_blank"
              className="text-blue-600 underline"
            >
              {article.title}
            </a>
            <p className="text-sm text-gray-500">{article.pubDate}</p>

            <div className="mt-2 space-y-2">
              <button
                onClick={() => handleSummarize(article.link)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loadingUrl === article.link}
              >
                {loadingUrl === article.link ? '요약 중...' : '요약 요청'}
              </button>

              {summaries[article.link] && (
                <p className="text-gray-800 whitespace-pre-wrap">
                  📄 요약: {summaries[article.link]}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
