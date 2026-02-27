import React from 'react';
import { usePopover } from './PopoverContext';

export function Output() {
  const { state, dispatch } = usePopover();

  if (!state.generatedText && !state.error && !state.isLoading) {
    return null;
  }

  const handleInsert = () => {
    dispatch({ type: 'INSERT' });
  };

  const handleRetry = () => {
    dispatch({ type: 'GENERATE_START' });
  };

  return (
    <div className="flex flex-col gap-3">
      {state.isLoading && (
        <div className="flex items-center justify-center py-4 text-textMuted text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span>Generating...</span>
          </div>
        </div>
      )}
      
      {state.error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-red-300 text-sm">
          {state.error.includes('Extension context invalid') ? (
            <div className="flex flex-col gap-2">
              <span>Extension needs to be reloaded. Please refresh the page to continue.</span>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-red-800 hover:bg-red-700 text-white font-medium py-1.5 px-3 rounded text-xs transition-colors"
              >
                Refresh Page
              </button>
            </div>
          ) : (
            state.error
          )}
        </div>
      )}
      
      {state.generatedText && (
        <>
          <div className="bg-background/50 border border-border rounded-lg p-3 text-textPrimary text-sm leading-relaxed">
            {state.generatedText}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleInsert}
              className="flex-1 bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={handleRetry}
              className="flex-1 bg-background border border-border hover:border-accent text-textPrimary font-medium py-2 px-4 rounded-lg text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </>
      )}
    </div>
  );
}
