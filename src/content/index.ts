import { setupObserver } from './observer';

console.log('ReplyWise content script loaded');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupObserver();
  });
} else {
  setupObserver();
}
