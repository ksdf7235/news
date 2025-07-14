// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
    
  }, []);



  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">실시간 뉴스 (RSS)</h1>
      <ul className="space-y-2">
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" className="text-blue-600 underline">
              {article.title}
            </a>
            <p className="text-sm text-gray-500">{article.pubDate}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}