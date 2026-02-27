import { getSettings } from '../lib/storage';
import type { PromptContext } from '../lib/promptBuilder';

export interface GenerateCommentRequest {
  context: PromptContext;
  tone: string;
  length: string;
}

export interface GenerateCommentResponse {
  text: string;
  error?: string;
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function callOpenRouter(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': chrome.runtime.getURL(''),
      'X-Title': 'ReplyWise',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3-haiku:beta',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_COMMENT') {
    (async () => {
      try {
        const settings = await getSettings();
        if (!settings.apiKey) {
          sendResponse({ error: 'API key not configured' });
          return;
        }

        const { context, tone, length } = message.payload;
        const prompt = `You are an expert LinkedIn engagement strategist.

Post:
"${context.postContent}"

Tone: ${tone}
Length: ${length}

Write a high-value LinkedIn comment that:
- Adds unique insight
- Avoids generic praise
- Sounds human and authentic
- Encourages discussion`;

        const text = await callOpenRouter(prompt, settings.apiKey);
        sendResponse({ text });
      } catch (error) {
        sendResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
      }
    })();
    return true;
  }
});

export {};
