import { findAncestor } from './domUtils';

export interface LinkedInPost {
  content: string;
  author?: string;
}

const COMMENT_EDITOR_SELECTORS = [
  '[contenteditable="true"][role="textbox"]',
  '.artdeco-textarea',
  '[data-text-editor="true"]',
];

const EMOJI_BUTTON_SELECTOR = '[aria-label*="emoji" i], [aria-label*="Emoji" i]';

export function findCommentEditor(container: HTMLElement = document.body): HTMLElement | null {
  for (const selector of COMMENT_EDITOR_SELECTORS) {
    const editor = container.querySelector(selector) as HTMLElement | null;
    if (editor) return editor;
  }
  return null;
}

export function findEmojiButton(editor: HTMLElement): HTMLElement | null {
  const container = editor.closest('div');
  if (!container) return null;
  return container.querySelector(EMOJI_BUTTON_SELECTOR) as HTMLElement | null;
}

export function extractPostContent(editor: HTMLElement): string {
  const postContainer = findAncestor(editor, '.feed-shared-update-v2, .feed-shared-text, .feed-shared-text__text');
  if (!postContainer) return '';

  const textElements = postContainer.querySelectorAll('.feed-shared-text__text, .feed-shared-text, .update-components-text');
  const texts: string[] = [];
  
  for (const el of textElements) {
    const text = el.textContent?.trim();
    if (text && text.length > 20) {
      texts.push(text);
    }
  }
  
  return texts[0] || '';
}

export function isLinkedInPage(): boolean {
  return window.location.hostname === 'www.linkedin.com' || 
         window.location.hostname === 'linkedin.com';
}
