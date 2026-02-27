import React from 'react';
import ReactDOM from 'react-dom/client';
import { PopoverProvider } from '../ui/PopoverContext';
import { Panel } from '../ui/Panel';
import '../index.css';

let popoverRoot: ReactDOM.Root | null = null;

const POPOVER_ID = 'replywise-popover-container';

export function mountPopover(anchor: HTMLElement): void {
  removePopover();

  const container = document.createElement('div');
  container.id = POPOVER_ID;
  container.style.cssText = `
    position: fixed;
    z-index: 9999;
    pointer-events: none;
  `;

  const shadowRoot = container.attachShadow({ mode: 'open' });
  
  const innerContainer = document.createElement('div');
  innerContainer.style.cssText = `
    position: relative;
    display: inline-block;
  `;

  shadowRoot.appendChild(innerContainer);
  document.body.appendChild(container);

  const reactRoot = ReactDOM.createRoot(innerContainer);
  popoverRoot = reactRoot;

  reactRoot.render(
    <React.StrictMode>
      <PopoverProvider>
        <Panel />
      </PopoverProvider>
    </React.StrictMode>
  );

  positionPopover(anchor, container);
}

export function positionPopover(anchor: HTMLElement, container: HTMLElement): void {
  const rect = anchor.getBoundingClientRect();
  const popoverElement = container.shadowRoot?.querySelector('div > div');
  
  if (!popoverElement) return;

  const popoverRect = popoverElement.getBoundingClientRect();
  
  const top = rect.top - popoverRect.height - 8;
  const left = rect.left - (popoverRect.width / 2) + (rect.width / 2);

  container.style.left = `${Math.max(8, left)}px`;
  container.style.top = `${Math.max(8, top)}px`;
  container.style.pointerEvents = 'auto';
}

export function removePopover(): void {
  const existing = document.getElementById(POPOVER_ID);
  if (existing) {
    existing.remove();
  }
  if (popoverRoot) {
    popoverRoot.unmount();
    popoverRoot = null;
  }
}

export function isPopoverMounted(): boolean {
  return document.getElementById(POPOVER_ID) !== null;
}
