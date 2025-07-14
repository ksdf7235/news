'use client';

import { useState } from 'react';

export default function SummaryTest() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const testContent = `러시아와 북한이 군사 동맹을 체결하며 국제사회에 파장을 일으켰다. 푸틴 대통령과 김정은 위원장은 ...`;

  const handleSummarize = async () => {
    setLoading(true);
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: testContent }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        요약 요청
      </button>
      {loading && <p>요약 중...</p>}
      {summary && <p className="mt-2 text-gray-800">📄 요약: {summary}</p>}
    </div>
  );
}
