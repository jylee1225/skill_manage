/* ============================================
   Session Store — Zustand
   ============================================ */

import { create } from 'zustand';
import { mockAgents, mockSessions, mockNotifications } from '../data/mockData';
import type { Agent, Session, Notification, AgentStatus } from '../types';

interface SessionState {
  agents: Agent[];
  sessions: Session[];
  notifications: Notification[];
  agentFilter: AgentStatus | 'all';
  agentSort: 'recent' | 'name' | 'status';
  agentProjectFilter: string;
  setAgentFilter: (filter: AgentStatus | 'all') => void;
  setAgentSort: (sort: 'recent' | 'name' | 'status') => void;
  setAgentProjectFilter: (project: string) => void;
  updateAgentStatus: (id: string, status: AgentStatus) => void;
  deleteAgent: (id: string) => void;
  markNotificationRead: (id: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  agents: mockAgents,
  sessions: mockSessions,
  notifications: mockNotifications,
  agentFilter: 'all',
  agentSort: 'recent',
  agentProjectFilter: 'all',

  setAgentFilter: (filter) => set({ agentFilter: filter }),
  setAgentSort: (sort) => set({ agentSort: sort }),
  setAgentProjectFilter: (project) => set({ agentProjectFilter: project }),

  updateAgentStatus: (id, status) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, status } : a)),
    })),

  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((a) => a.id !== id),
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
