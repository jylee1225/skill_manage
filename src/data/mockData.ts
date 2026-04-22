/* ============================================
   Mock Data — 로컬 JSON Mock
   ============================================ */

import type { Agent, Session, Notification, DailyTokenStat, Snapshot } from '../types';

// ── Agents ──
export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Code Reviewer',
    status: 'active',
    project: 'frontend-app',
    lastActivity: '2분 전',
    description: 'PR 코드 리뷰 자동화 에이전트',
  },
  {
    id: 'agent-002',
    name: 'Test Generator',
    status: 'active',
    project: 'backend-api',
    lastActivity: '5분 전',
    description: '단위 테스트 자동 생성',
  },
  {
    id: 'agent-003',
    name: 'Doc Writer',
    status: 'paused',
    project: 'frontend-app',
    lastActivity: '1시간 전',
    description: 'API 문서 자동 생성',
  },
  {
    id: 'agent-004',
    name: 'Bug Fixer',
    status: 'active',
    project: 'mobile-app',
    lastActivity: '30초 전',
    description: '버그 자동 수정 에이전트',
  },
  {
    id: 'agent-005',
    name: 'Refactorer',
    status: 'stopped',
    project: 'backend-api',
    lastActivity: '3시간 전',
    description: '코드 리팩토링 제안',
  },
  {
    id: 'agent-006',
    name: 'Security Scanner',
    status: 'active',
    project: 'infra-tools',
    lastActivity: '1분 전',
    description: '보안 취약점 스캔',
  },
  {
    id: 'agent-007',
    name: 'Perf Optimizer',
    status: 'paused',
    project: 'frontend-app',
    lastActivity: '45분 전',
    description: '성능 최적화 분석',
  },
  {
    id: 'agent-008',
    name: 'Migration Helper',
    status: 'stopped',
    project: 'legacy-system',
    lastActivity: '2일 전',
    description: '레거시 코드 마이그레이션',
  },
  {
    id: 'agent-009',
    name: 'API Designer',
    status: 'active',
    project: 'backend-api',
    lastActivity: '10분 전',
    description: 'REST API 스키마 설계',
  },
  {
    id: 'agent-010',
    name: 'Style Fixer',
    status: 'active',
    project: 'frontend-app',
    lastActivity: '15분 전',
    description: 'CSS/스타일 일관성 체크',
  },
  {
    id: 'agent-011',
    name: 'CI Pipeline',
    status: 'active',
    project: 'infra-tools',
    lastActivity: '8분 전',
    description: 'CI/CD 파이프라인 관리',
  },
  {
    id: 'agent-012',
    name: 'Data Validator',
    status: 'paused',
    project: 'mobile-app',
    lastActivity: '2시간 전',
    description: '데이터 검증 에이전트',
  },
];

// ── Sessions ──
export const mockSessions: Session[] = [
  {
    id: 'session-001',
    agentId: 'agent-001',
    agentName: 'Code Reviewer',
    project: 'frontend-app',
    status: 'running',
    contextUsage: 67,
    toolsUsed: ['Read', 'Write', 'Bash'],
    startedAt: '2026-04-22T06:30:00Z',
    inputTokens: 45200,
    outputTokens: 12800,
  },
  {
    id: 'session-002',
    agentId: 'agent-004',
    agentName: 'Bug Fixer',
    project: 'mobile-app',
    status: 'running',
    contextUsage: 43,
    toolsUsed: ['Read', 'Bash'],
    startedAt: '2026-04-22T07:00:00Z',
    inputTokens: 28900,
    outputTokens: 8300,
  },
  {
    id: 'session-003',
    agentId: 'agent-006',
    agentName: 'Security Scanner',
    project: 'infra-tools',
    status: 'running',
    contextUsage: 82,
    toolsUsed: ['Read', 'Bash', 'Grep'],
    startedAt: '2026-04-22T05:45:00Z',
    inputTokens: 92100,
    outputTokens: 31400,
  },
];

// ── Notifications ──
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'approval',
    title: '승인 요청',
    message: 'Code Reviewer가 파일 삭제 권한을 요청합니다.',
    timestamp: '2분 전',
    read: false,
    agentId: 'agent-001',
  },
  {
    id: 'notif-002',
    type: 'warning',
    title: '컨텍스트 경고',
    message: 'Security Scanner 세션이 컨텍스트 82%에 도달했습니다.',
    timestamp: '5분 전',
    read: false,
  },
  {
    id: 'notif-003',
    type: 'info',
    title: '작업 완료',
    message: 'Test Generator가 15개 테스트 파일을 생성했습니다.',
    timestamp: '12분 전',
    read: true,
  },
  {
    id: 'notif-004',
    type: 'error',
    title: '에이전트 중단',
    message: 'Refactorer 에이전트가 오류로 중단되었습니다.',
    timestamp: '3시간 전',
    read: true,
  },
  {
    id: 'notif-005',
    type: 'approval',
    title: '승인 요청',
    message: 'Bug Fixer가 npm install 실행을 요청합니다.',
    timestamp: '25분 전',
    read: false,
    agentId: 'agent-004',
  },
];

// ── Token Stats (7일) ──
export const mockTokenStats: DailyTokenStat[] = [
  { date: '04/16', inputTokens: 124000, outputTokens: 38000 },
  { date: '04/17', inputTokens: 98000, outputTokens: 29000 },
  { date: '04/18', inputTokens: 156000, outputTokens: 47000 },
  { date: '04/19', inputTokens: 203000, outputTokens: 61000 },
  { date: '04/20', inputTokens: 87000, outputTokens: 26000 },
  { date: '04/21', inputTokens: 178000, outputTokens: 54000 },
  { date: '04/22', inputTokens: 166200, outputTokens: 52500 },
];

// ── CLAUDE.md Sample ──
export const mockClaudeMdGlobal = `# Global Instructions

## 코딩 규칙
- TypeScript strict mode 사용
- 함수형 컴포넌트 + hooks 패턴 사용
- ESLint + Prettier 설정 준수
- 커밋 메시지는 Conventional Commits 형식

## 코드 스타일
- 변수명은 camelCase
- 컴포넌트명은 PascalCase
- 상수는 UPPER_SNAKE_CASE
- 파일명은 kebab-case (컴포넌트 제외)

## 테스트
- 단위 테스트 커버리지 80% 이상 유지
- E2E 테스트는 핵심 시나리오만 작성
- 테스트 파일은 \`__tests__\` 디렉토리에 배치

## 보안
- 환경변수에 시크릿 저장 (.env)
- SQL injection 방지를 위해 파라미터 바인딩 사용
- XSS 방지를 위해 사용자 입력 이스케이프
`;

export const mockClaudeMdProject = `# Project: frontend-app

## 기술 스택
- React 18 + TypeScript
- Vite 빌드 도구
- Zustand 상태관리
- CSS Modules 스타일링

## 프로젝트 구조
- \`src/components/\` — 재사용 가능한 컴포넌트
- \`src/pages/\` — 페이지 컴포넌트
- \`src/hooks/\` — 커스텀 훅
- \`src/stores/\` — Zustand 스토어
- \`src/services/\` — API 서비스

## 규칙
- 컴포넌트 파일 하나에 하나의 컴포넌트만 정의
- Props 타입은 컴포넌트 파일 상단에 인터페이스로 정의
- useEffect 내부에서 비동기 함수 직접 사용 금지
`;

// ── Snapshots ──
export const mockSnapshots: Snapshot[] = [
  {
    id: 'snap-001',
    scope: 'global',
    timestamp: '2026-04-22 15:30',
    content: mockClaudeMdGlobal,
    tokenCount: 1847,
  },
  {
    id: 'snap-002',
    scope: 'global',
    timestamp: '2026-04-21 10:15',
    content: mockClaudeMdGlobal.replace('80% 이상', '70% 이상'),
    tokenCount: 1832,
  },
  {
    id: 'snap-003',
    scope: 'global',
    timestamp: '2026-04-20 09:00',
    content: mockClaudeMdGlobal.replace('## 보안\n', ''),
    tokenCount: 1654,
  },
  {
    id: 'snap-004',
    scope: 'project',
    timestamp: '2026-04-22 14:00',
    content: mockClaudeMdProject,
    tokenCount: 1203,
  },
  {
    id: 'snap-005',
    scope: 'project',
    timestamp: '2026-04-19 16:30',
    content: mockClaudeMdProject.replace('Zustand', 'Redux Toolkit'),
    tokenCount: 1215,
  },
];
