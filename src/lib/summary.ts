import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeArticle(content: string): Promise<string> {
  const prompt = `
다음은 뉴스 기사 본문입니다. 이 내용을 한국어로 핵심만 간단하게 요약해주세요 (3줄 이내):

"${content}"
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // 또는 gpt-3.5-turbo
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content ?? '요약 실패';
}