/* ============================================
   Types — TypeScript 타입 정의
   ============================================ */

// ── Agent ──
export type AgentStatus = 'active' | 'paused' | 'stopped';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  project: string;
  lastActivity: string;
  description?: string;
}

// ── Session ──
export interface Session {
  id: string;
  agentId?: string;
  agentName?: string;
  project: string;
  status: 'running' | 'idle' | 'completed';
  contextUsage: number; // 0-100
  toolsUsed: string[];
  startedAt: string;
  inputTokens: number;
  outputTokens: number;
}

// ── Skill ──
export interface Skill {
  id: string;
  name: string;
  scope: 'global' | 'project';
  project?: string;
  content: string;
  linkedAgents: string[];
}

// ── Hook ──
export type HookEvent = 'PreToolUse' | 'PostToolUse' | 'Stop' | 'SubagentStop';

export interface Hook {
  id: string;
  name: string;
  event: HookEvent;
  command: string;
  enabled: boolean;
  scope: 'global' | 'project';
  project?: string;
}

// ── Notification ──
export type NotificationType = 'approval' | 'warning' | 'error' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  agentId?: string;
}

// ── Snapshot ──
export interface Snapshot {
  id: string;
  scope: 'global' | 'project';
  timestamp: string;
  content: string;
  tokenCount: number;
}

// ── Token Stats ──
export interface DailyTokenStat {
  date: string;
  inputTokens: number;
  outputTokens: number;
  project?: string;
}

// ── Settings ──
export interface AppSettings {
  telegramToken: string;
  telegramChatId: string;
  projectPaths: string[];
  contextWarningThreshold: number;
  contextCriticalThreshold: number;
  theme: 'dark' | 'light';
  port: number;
}

// ── ClaudeMd ──
export interface ClaudeMdFile {
  scope: 'global' | 'project';
  path: string;
  content: string;
  tokenCount: number;
}
