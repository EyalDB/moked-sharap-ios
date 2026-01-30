import { useLocalStorage } from './useLocalStorage';
import { AppSettings } from '@/types';

const STORAGE_KEY = 'moked_sharap_settings';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  enableVibration: true,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>(STORAGE_KEY, DEFAULT_SETTINGS);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
