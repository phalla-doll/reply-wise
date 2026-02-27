import type { Tone, Length } from '../lib/storage';

interface PopoverState {
  isOpen: boolean;
  tone: Tone;
  length: Length;
  generatedText: string;
  isLoading: boolean;
  error?: string;
}

type PopoverAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_TONE'; tone: Tone }
  | { type: 'SET_LENGTH'; length: Length }
  | { type: 'GENERATE_START' }
  | { type: 'GENERATE_SUCCESS'; text: string }
  | { type: 'GENERATE_ERROR'; error: string }
  | { type: 'INSERT' };

const INITIAL_STATE: PopoverState = {
  isOpen: false,
  tone: 'Professional',
  length: 'Medium',
  generatedText: '',
  isLoading: false,
};

export { INITIAL_STATE };

export function popoverReducer(state: PopoverState, action: PopoverAction): PopoverState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true, error: undefined };
    case 'CLOSE':
      return { ...INITIAL_STATE };
    case 'SET_TONE':
      return { ...state, tone: action.tone, generatedText: '', error: undefined };
    case 'SET_LENGTH':
      return { ...state, length: action.length, generatedText: '', error: undefined };
    case 'GENERATE_START':
      return { ...state, isLoading: true, generatedText: '', error: undefined };
    case 'GENERATE_SUCCESS':
      return { ...state, isLoading: false, generatedText: action.text };
    case 'GENERATE_ERROR':
      return { ...state, isLoading: false, error: action.error };
    case 'INSERT':
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
