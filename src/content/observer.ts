import { isLinkedInPage, findCommentEditor } from './platformParser';
import { injectButton } from './editorInjector';
import { throttle } from './domUtils';

const PROCESS_DELAY = 100;

function processNewEditors() {
  if (!isLinkedInPage()) return;

  const editors = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
  
  for (const editor of editors) {
    const isCommentBox = findAncestor(editor, '.feed-shared-textarea, .comments-comment-box');
    if (isCommentBox) {
      injectButton(editor);
    }
  }
}

const throttledProcess = throttle(processNewEditors, PROCESS_DELAY);

export function setupObserver(): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        throttledProcess();
        break;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.addEventListener('scroll', throttledProcess, { passive: true });
  document.addEventListener('click', throttledProcess, { passive: true });

  processNewEditors();
}

export function teardownObserver(): void {
  const observers = [];
}
