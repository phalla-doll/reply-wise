import React, { useEffect, useRef } from 'react';
import { usePopover } from './PopoverContext';
import { Controls } from './Controls';
import { Output } from './Output';
import { withExtensionContextValidation } from '../lib/extensionContext';
import '../index.css';

export function Panel() {
  const { state, dispatch } = usePopover();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [state.isOpen]);

  if (!state.isOpen) return null;

  const handleGenerate = async () => {
    dispatch({ type: 'GENERATE_START' });

    try {
      const response = await withExtensionContextValidation(
        () => chrome.runtime.sendMessage({
          type: 'GENERATE_COMMENT',
          payload: {
            context: { postContent: 'Sample post content' },
            tone: state.tone,
            length: state.length,
          },
        })
      );

      if (response.error) {
        dispatch({ type: 'GENERATE_ERROR', error: response.error });
      } else {
        dispatch({ type: 'GENERATE_SUCCESS', text: response.text });
      }
    } catch (error) {
      dispatch({
        type: 'GENERATE_ERROR',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE' });
  };

  return (
    <div
      ref={panelRef}
      className="w-[360px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
      style={{
        animation: 'scaleIn 150ms ease-out',
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-accent"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-textPrimary text-sm">ReplyWise</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-textMuted hover:text-textPrimary transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <Controls />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={state.isLoading}
          className="w-full mt-4 bg-accent hover:bg-accent/90 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.isLoading ? 'Generating...' : 'Generate'}
        </button>

        <div className="my-4 border-t border-border" />

        <Output />
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
