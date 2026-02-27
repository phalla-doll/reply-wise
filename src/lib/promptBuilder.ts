import type { Tone, Length } from './storage';

export interface PromptContext {
  postContent: string;
  userProfile?: {
    role?: string;
    industry?: string;
    style?: string;
    expertise?: string[];
  };
}

export function buildPrompt(context: PromptContext, tone: Tone, length: Length): string {
  const { postContent, userProfile } = context;
  
  const lengthGuidance = {
    Short: '1-2 sentences',
    Medium: '2-4 sentences',
    Long: '4-6 sentences',
  }[length];

  const profileSection = userProfile ? `
User Profile:
${userProfile.role ? `- Role: ${userProfile.role}` : ''}
${userProfile.industry ? `- Industry: ${userProfile.industry}` : ''}
${userProfile.style ? `- Style: ${userProfile.style}` : ''}
${userProfile.expertise?.length ? `- Expertise: ${userProfile.expertise.join(', ')}` : ''}`.trim() : '';

  return `You are an expert LinkedIn engagement strategist.

Post:
"${postContent}"
${profileSection ? profileSection + '\n' : ''}
Tone: ${tone}
Length: ${lengthGuidance}

Write a high-value LinkedIn comment that:
- Adds unique insight
- Avoids generic praise
- Sounds human and authentic
- Encourages discussion`;
}
