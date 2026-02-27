import React from 'react';
import { usePopover } from './PopoverContext';
import { TONES, LENGTHS } from '../lib/storage';
import type { Tone, Length } from '../lib/storage';

export function Controls() {
  const { state, dispatch } = usePopover();

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_TONE', tone: e.target.value as Tone });
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_LENGTH', length: e.target.value as Length });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="tone-select" className="text-xs font-medium text-textMuted">Tone</label>
        <select
          id="tone-select"
          value={state.tone}
          onChange={handleToneChange}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-textPrimary text-sm focus:outline-none focus:border-accent cursor-pointer"
          disabled={state.isLoading}
        >
          {TONES.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="length-select" className="text-xs font-medium text-textMuted">Length</label>
        <select
          id="length-select"
          value={state.length}
          onChange={handleLengthChange}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-textPrimary text-sm focus:outline-none focus:border-accent cursor-pointer"
          disabled={state.isLoading}
        >
          {LENGTHS.map((length) => (
            <option key={length} value={length}>
              {length}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
