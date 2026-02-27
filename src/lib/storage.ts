export const STORAGE_KEYS = {
  API_KEY: 'replywise_api_key',
  DEFAULT_TONE: 'replywise_default_tone',
  DEFAULT_LENGTH: 'replywise_default_length',
  DAILY_USAGE: 'replywise_daily_usage',
  AUTO_DETECT: 'replywise_auto_detect',
} as const;

export type Tone = 'Professional' | 'Casual' | 'Friendly' | 'Thoughtful';
export type Length = 'Short' | 'Medium' | 'Long';

export interface Settings {
  apiKey: string;
  defaultTone: Tone;
  defaultLength: Length;
  dailyUsage: number;
  autoDetect: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  apiKey: '',
  defaultTone: 'Professional',
  defaultLength: 'Medium',
  dailyUsage: 0,
  autoDetect: true,
};

export const TONES: Tone[] = ['Professional', 'Casual', 'Friendly', 'Thoughtful'];
export const LENGTHS: Length[] = ['Short', 'Medium', 'Long'];

export async function getSettings(): Promise<Settings> {
  const data = await chrome.storage.local.get(Object.values(STORAGE_KEYS));
  return {
    apiKey: data[STORAGE_KEYS.API_KEY] || import.meta.env.VITE_OPENROUTER_API_KEY || DEFAULT_SETTINGS.apiKey,
    defaultTone: data[STORAGE_KEYS.DEFAULT_TONE] || DEFAULT_SETTINGS.defaultTone,
    defaultLength: data[STORAGE_KEYS.DEFAULT_LENGTH] || DEFAULT_SETTINGS.defaultLength,
    dailyUsage: data[STORAGE_KEYS.DAILY_USAGE] || DEFAULT_SETTINGS.dailyUsage,
    autoDetect: data[STORAGE_KEYS.AUTO_DETECT] ?? DEFAULT_SETTINGS.autoDetect,
  };
}

export async function saveSettings(settings: Partial<Settings>): Promise<void> {
  await chrome.storage.local.set(settings);
}

export async function incrementUsage(): Promise<number> {
  const settings = await getSettings();
  const newUsage = settings.dailyUsage + 1;
  await chrome.storage.local.set({ [STORAGE_KEYS.DAILY_USAGE]: newUsage });
  return newUsage;
}
