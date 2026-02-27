import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { getSettings, saveSettings, STORAGE_KEYS, TONES, LENGTHS, DEFAULT_SETTINGS, type Tone, type Length } from '../lib/storage';
import '../index.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [defaultTone, setDefaultTone] = useState<Tone>(DEFAULT_SETTINGS.defaultTone);
  const [defaultLength, setDefaultLength] = useState<Length>(DEFAULT_SETTINGS.defaultLength);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [autoDetect, setAutoDetect] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const settings = await getSettings();
      setApiKey(settings.apiKey);
      setDefaultTone(settings.defaultTone);
      setDefaultLength(settings.defaultLength);
      setDailyUsage(settings.dailyUsage);
      setAutoDetect(settings.autoDetect);
    })();
  }, []);

  const handleSave = async () => {
    await saveSettings({
      apiKey,
      defaultTone,
      defaultLength,
      autoDetect,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-[340px] bg-background text-textPrimary min-h-[400px]">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <svg
            className="w-6 h-6 text-accent"
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
          <h1 className="text-lg font-semibold">ReplyWise Settings</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-textMuted mb-2">
              OpenRouter API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-..."
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="default-tone" className="block text-sm font-medium text-textMuted mb-2">
              Default Tone
            </label>
            <select
              id="default-tone"
              value={defaultTone}
              onChange={(e) => setDefaultTone(e.target.value as Tone)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent cursor-pointer"
            >
              {TONES.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="default-length" className="block text-sm font-medium text-textMuted mb-2">
              Default Length
            </label>
            <select
              id="default-length"
              value={defaultLength}
              onChange={(e) => setDefaultLength(e.target.value as Length)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent cursor-pointer"
            >
              {LENGTHS.map((length) => (
                <option key={length} value={length}>
                  {length}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="auto-detect" className="text-sm font-medium text-textMuted">
              Auto-detect posts
            </label>
            <input
              id="auto-detect"
              type="checkbox"
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-background text-accent focus:ring-accent"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="text-sm text-textMuted">
              Daily usage: <span className="text-textPrimary font-semibold">{dailyUsage}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={!apiKey}
            className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
