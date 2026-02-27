export function isExtensionContextValid(): boolean {
  try {
    return chrome.runtime?.id !== undefined && chrome.runtime?.id !== '';
  } catch {
    return false;
  }
}

export function withExtensionContextValidation<T>(
  callback: () => Promise<T>,
  onInvalid?: () => void
): Promise<T> {
  if (!isExtensionContextValid()) {
    if (onInvalid) {
      onInvalid();
    }
    return Promise.reject(new Error('Extension context invalid. Please refresh the page.'));
  }
  return callback();
}

export function handleInvalidContext(): void {
  console.error('ReplyWise: Extension context is invalid. Please refresh the page.');
}
