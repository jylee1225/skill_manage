# Claude Code Manager — 디자인 시안

주요 3개 화면의 디자인 시안입니다. 다크 모드 기본, Glassmorphism 카드, Indigo/Violet 액센트 컬러를 적용했습니다.

---

## 1. 대시보드 (`/`)

메인 진입 화면입니다. 세션 현황, 에이전트 요약, 토큰 사용 차트, 알림을 한눈에 확인합니다.

![대시보드 디자인 시안](C:\Users\jylee\.gemini\antigravity\brain\5cf5ef67-73fe-449a-928a-0feb1a6410a0\dashboard_design.png)

**핵심 구성:**
- 상단 3개 통계 카드 (Active Sessions, Agents Running, Context Usage)
- 7일간 토큰 사용 추이 차트
- 최근 에이전트 카드 + 알림 리스트

---

## 2. CLAUDE.md 에디터 (`/editor`)

Monaco Editor 기반 마크다운 편집 화면입니다.

![에디터 디자인 시안](C:\Users\jylee\.gemini\antigravity\brain\5cf5ef67-73fe-449a-928a-0feb1a6410a0\editor_design.png)

**핵심 구성:**
- 글로벌/프로젝트 탭 전환
- 우측 상단 실시간 토큰 카운터 (2000↑ 황색, 4000↑ 적색)
- 우측 스냅샷 히스토리 패널 (diff, 롤백)
- 하단 중복 감지 경고 배너

---

## 3. 에이전트 관리 (`/agents`)

에이전트 카드 그리드 관리 화면입니다.

![에이전트 관리 디자인 시안](C:\Users\jylee\.gemini\antigravity\brain\5cf5ef67-73fe-449a-928a-0feb1a6410a0\agents_design.png)

**핵심 구성:**
- 상태별/프로젝트별 필터 + 검색
- 배치 한도 프로그레스 바
- 상태별 좌측 컬러 보더 (Active: Green, Paused: Amber, Stopped: Red)
- 카드별 액션 버튼 (편집, 일시정지, 삭제, 복제)

---

## 디자인 시스템 요약

| 토큰 | 값 |
|------|-----|
| 배경 (Primary) | `#0f172a` (Slate-900) |
| 배경 (Surface) | `#1e293b` (Slate-800) |
| 카드 배경 | `rgba(30, 41, 59, 0.7)` + `backdrop-blur: 12px` |
| 액센트 | `#6366f1` (Indigo-500) |
| 보조 액센트 | `#8b5cf6` (Violet-500) |
| 텍스트 (Primary) | `#f1f5f9` (Slate-100) |
| 텍스트 (Secondary) | `#94a3b8` (Slate-400) |
| Success | `#22c55e` (Green-500) |
| Warning | `#f59e0b` (Amber-500) |
| Danger | `#ef4444` (Red-500) |
| Border Radius | `12px` |
| 폰트 | Inter (Google Fonts) |

---

> [!NOTE]
> 나머지 4개 화면(스킬 관리, Hook 관리, 토큰 최적화, 설정)의 시안도 필요하시면 말씀해주세요.

**피드백 요청:**
1. 전반적인 다크 모드 컬러 톤이 괜찮으신가요?
2. 사이드바 레이아웃 스타일 변경이 필요한가요?
3. 수정하거나 추가하고 싶은 UI 요소가 있으신가요?
