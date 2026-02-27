import React, { createContext, useContext, useReducer } from 'react';
import type { Tone, Length } from '../lib/storage';
import { popoverReducer, INITIAL_STATE } from './useStore';

type PopoverAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_TONE'; tone: Tone }
  | { type: 'SET_LENGTH'; length: Length }
  | { type: 'GENERATE_START' }
  | { type: 'GENERATE_SUCCESS'; text: string }
  | { type: 'GENERATE_ERROR'; error: string }
  | { type: 'INSERT' };

interface PopoverContextType {
  state: typeof INITIAL_STATE;
  dispatch: React.Dispatch<PopoverAction>;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export function PopoverProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(popoverReducer, INITIAL_STATE);
  return (
    <PopoverContext.Provider value={{ state, dispatch }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopover must be used within PopoverProvider');
  }
  return context;
}
