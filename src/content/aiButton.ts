import { createElement } from './domUtils';

const AI_BUTTON_ID = 'replywise-ai-button';

export function createAIButton(onClick: () => void): HTMLButtonElement {
  const button = createElement<HTMLButtonElement>('button', '', '');
  button.id = AI_BUTTON_ID;
  button.type = 'button';
  button.setAttribute('aria-label', 'Generate AI comment');
  
  button.style.cssText = `
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: all 150ms ease;
    padding: 0;
  `;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.style.cssText = `
    width: 18px;
    height: 18px;
  `;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M13 2L3 14h9l-1 8 10-12h-9l1-8z');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(path);
  button.appendChild(svg);

  button.addEventListener('mouseenter', () => {
    button.style.color = '#4F8CFF';
    button.style.background = 'rgba(79, 140, 255, 0.1)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.color = '#666';
    button.style.background = 'transparent';
  });

  button.addEventListener('click', onClick);

  return button;
}

export function isAIButtonInjected(editor: HTMLElement): boolean {
  const container = editor.parentElement;
  if (!container) return false;
  return container.querySelector(`#${AI_BUTTON_ID}`) !== null;
}
