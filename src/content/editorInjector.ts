import { findEmojiButton, extractPostContent } from './platformParser';
import { createAIButton, isAIButtonInjected } from './aiButton';
import { mountPopover, removePopover, isPopoverMounted, positionPopover } from './popoverMount';
import { findAncestor } from './domUtils';

const injectedEditors = new WeakMap<HTMLElement, HTMLButtonElement>();

export function injectButton(editor: HTMLElement): void {
  if (isAIButtonInjected(editor)) return;
  if (injectedEditors.has(editor)) return;

  const emojiButton = findEmojiButton(editor);
  if (!emojiButton) return;

  const container = emojiButton.parentElement;
  if (!container) return;

  const handleButtonClick = () => {
    if (isPopoverMounted()) {
      removePopover();
      return;
    }

    const postContent = extractPostContent(editor);
    mountPopover(editor);
  };

  const aiButton = createAIButton(handleButtonClick);
  
  container.insertBefore(aiButton, emojiButton.nextSibling);
  injectedEditors.set(editor, aiButton);

  const observer = new MutationObserver(() => {
    if (!document.body.contains(editor)) {
      observer.disconnect();
      injectedEditors.delete(editor);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export function uninjectButton(editor: HTMLElement): void {
  const button = injectedEditors.get(editor);
  if (button) {
    button.remove();
    injectedEditors.delete(editor);
  }
}

export function getInjectedButtons(): WeakMap<HTMLElement, HTMLButtonElement> {
  return injectedEditors;
}
