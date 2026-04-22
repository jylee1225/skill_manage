/* ============================================
   Editor Store — Zustand
   ============================================ */

import { create } from 'zustand';
import { mockClaudeMdGlobal, mockClaudeMdProject, mockSnapshots } from '../data/mockData';
import type { Snapshot } from '../types';

interface EditorState {
  activeTab: 'global' | 'project';
  globalContent: string;
  projectContent: string;
  snapshots: Snapshot[];
  isSaving: boolean;
  lastSaved: string | null;
  setActiveTab: (tab: 'global' | 'project') => void;
  setContent: (content: string) => void;
  save: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  activeTab: 'global',
  globalContent: mockClaudeMdGlobal,
  projectContent: mockClaudeMdProject,
  snapshots: mockSnapshots,
  isSaving: false,
  lastSaved: null,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setContent: (content) => {
    const { activeTab } = get();
    if (activeTab === 'global') {
      set({ globalContent: content });
    } else {
      set({ projectContent: content });
    }
  },

  save: () => {
    set({ isSaving: true });
    setTimeout(() => {
      const now = new Date().toLocaleTimeString('ko-KR');
      set({ isSaving: false, lastSaved: now });
    }, 500);
  },
}));
