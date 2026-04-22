/* ============================================
   Settings Store — Zustand
   ============================================ */

import { create } from 'zustand';
import type { AppSettings } from '../types';

interface SettingsState extends AppSettings {
  toggleTheme: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  telegramToken: '',
  telegramChatId: '',
  projectPaths: ['/home/user/projects/frontend-app', '/home/user/projects/backend-api'],
  contextWarningThreshold: 70,
  contextCriticalThreshold: 90,
  theme: 'dark',
  port: 3333,

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      return { theme: newTheme };
    }),

  updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
}));
