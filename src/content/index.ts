import { setupObserver } from './observer';

console.log('ReplyWise content script loaded');

window.addEventListener('error', (e) => {
  if (e.filename?.includes('chrome-extension://invalid/') || e.message?.includes('chrome-extension://invalid')) {
    e.preventDefault();
  }
}, true);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupObserver();
  });
} else {
  setupObserver();
}
