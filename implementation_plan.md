# Claude Code Manager — 프론트엔드 구현 계획

Claude Code의 모든 설정 작업을 브라우저에서 처리할 수 있는 로컬 웹 대시보드의 프론트엔드 구현 계획입니다.

## 기술 스택

| 항목 | 선택 | 근거 |
|------|------|------|
| 프레임워크 | **Vite + React + TypeScript** | PRD WBS #1에 명시 |
| 라우팅 | **React Router v6** | 7개 화면 SPA 라우팅 |
| 상태관리 | **Zustand** | 경량, TypeScript 친화적 |
| 에디터 | **Monaco Editor** (`@monaco-editor/react`) | PRD F-01 명시 |
| 차트 | **Recharts** | 토큰 통계 차트용 |
| 실시간 통신 | **Native WebSocket** | 세션 모니터링 |
| 스타일링 | **CSS Modules + CSS Variables** | 테마 지원, 다크모드 |
| 아이콘 | **Lucide React** | 경량 아이콘 세트 |
| HTTP 클라이언트 | **Axios** | API 통신 |

---

## 화면 구조 (7개 페이지)

```
/ ─────────────── 대시보드 (세션 현황, 에이전트 요약, 알림)
/editor ────────── CLAUDE.md 에디터 (Monaco, 토큰 카운터, 슬림화)
/agents ────────── 에이전트 관리 (카드 그리드, 상태 배지)
/skills ────────── 스킬 관리 (목록 테이블, 에디터 슬라이드오버)
/hooks ─────────── Hook 관리 (토글 카드, 이벤트 필터)
/token-optimizer ─ 토큰 최적화 대시보드 (분석 차트, 중복 wizard)
/settings ──────── 설정 (Telegram, 경로, 임계값, 테마)
```

---

## 프로젝트 디렉토리 구조

```
src/
├── main.tsx                    # 엔트리포인트
├── App.tsx                     # 라우터 + 레이아웃
├── styles/
│   ├── globals.css             # CSS Variables (디자인 토큰)
│   └── theme.css               # 다크/라이트 테마
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # 사이드바 네비게이션
│   │   ├── Header.tsx          # 상단 헤더 (프로젝트 선택, 알림)
│   │   └── MainLayout.tsx      # 전체 레이아웃 wrapper
│   ├── common/
│   │   ├── Card.tsx            # 범용 카드 컴포넌트
│   │   ├── Badge.tsx           # 상태 배지
│   │   ├── Modal.tsx           # 모달 다이얼로그
│   │   ├── Toast.tsx           # 토스트 알림
│   │   ├── Toggle.tsx          # 토글 스위치
│   │   ├── TokenCounter.tsx    # 토큰 수 표시 (경고색 포함)
│   │   └── DiffViewer.tsx      # Diff 뷰어
│   └── charts/
│       ├── TokenBarChart.tsx   # 토큰 사용 막대 그래프
│       └── ContextGauge.tsx    # 컨텍스트 사용률 게이지
├── pages/
│   ├── Dashboard.tsx           # / — 대시보드
│   ├── Editor.tsx              # /editor — CLAUDE.md 에디터
│   ├── Agents.tsx              # /agents — 에이전트 관리
│   ├── Skills.tsx              # /skills — 스킬 관리
│   ├── Hooks.tsx               # /hooks — Hook 관리
│   ├── TokenOptimizer.tsx      # /token-optimizer — 토큰 최적화
│   └── Settings.tsx            # /settings — 설정
├── hooks/
│   ├── useWebSocket.ts         # WebSocket 연결 관리
│   ├── useTokenCount.ts        # 토큰 카운팅 (디바운스)
│   └── useApi.ts               # API 호출 래퍼
├── stores/
│   ├── sessionStore.ts         # 세션/에이전트 상태
│   ├── editorStore.ts          # 에디터 상태
│   └── settingsStore.ts        # 설정 상태
├── services/
│   └── api.ts                  # Axios 인스턴스 + API 함수
└── types/
    └── index.ts                # TypeScript 타입 정의
```

---

## 페이지별 구현 상세

### 1. 대시보드 (`/`)

| 영역 | 내용 |
|------|------|
| 세션 현황 카드 | 활성 세션 수, 컨텍스트 사용률 게이지 (70%/90% 경고) |
| 에이전트 요약 | active/paused/stopped 카운트 + 미니 카드 3개 |
| 알림 리스트 | 승인 요청, 컨텍스트 경고, 에러 등 최근 알림 |
| 토큰 사용 차트 | 7일간 일별 input/output 토큰 소모량 (Recharts 막대 그래프) |
| WebSocket | `/ws/sessions` 연결 → 1초 갱신 |

### 2. CLAUDE.md 에디터 (`/editor`)

| 영역 | 내용 |
|------|------|
| 탭 전환 | 글로벌 / 프로젝트 탭. 충돌 필드 시각적 표시 |
| Monaco Editor | 마크다운 하이라이팅, 자동저장 + 수동 저장 |
| 토큰 카운터 | 에디터 우측 상단. 2000↑ 황색, 4000↑ 적색 |
| 슬림화 버튼 | 경고 발생 시 노출 → API 호출 → diff 뷰 |
| 중복 감지 | 저장 시 글로벌↔프로젝트 중복 문장 감지 → 제거 제안 |
| 스냅샷 | 최근 10개 스냅샷 목록, diff 뷰, 원클릭 롤백 |

### 3. 에이전트 관리 (`/agents`)

| 영역 | 내용 |
|------|------|
| 카드 그리드 | 에이전트 이름, 상태 배지 (active/paused/stopped), 마지막 활동 |
| 액션 버튼 | 편집, 일시정지, 삭제, 복제 |
| 필터/정렬 | 상태별, 프로젝트별, 최근 활동순 |
| 한도 표시 | 현재 배치 수 / 최대 한도 프로그레스 바 |

### 4. 스킬 관리 (`/skills`)

| 영역 | 내용 |
|------|------|
| 테이블 | 글로벌/프로젝트별 스킬 목록 |
| 슬라이드오버 | SKILL.md 마크다운 에디터 (생성/편집) |
| 연결 시각화 | 에이전트 ↔ 스킬 관계 표시 |

### 5. Hook 관리 (`/hooks`)

| 영역 | 내용 |
|------|------|
| 토글 카드 | 훅 이름 + 이벤트 타입 + 명령어 + 활성/비활성 토글 |
| 이벤트 필터 | PreToolUse, PostToolUse, Stop, SubagentStop |
| 인라인 편집 | 명령어 직접 편집 |

### 6. 토큰 최적화 (`/token-optimizer`)

| 영역 | 내용 |
|------|------|
| 토큰 분석 | 파일별 토큰 수, 전체 합산, 중복 비율 표·차트 |
| 중복 제거 wizard | 스텝 UI: 감지 → 선택 → diff 확인 → 적용 |
| 섹션 중요도 | 참조 빈도 낮은 섹션에 '비활성화 권장' 배지 |
| 압축 실행 | 원클릭 슬림화 → diff → 저장. 절감량 표시 |
| 세션 리포트 | 7일간 프로젝트별 토큰 소모 차트, 이상치 하이라이트 |
| 가이드 | Best practice 인라인 팁 표시 |

### 7. 설정 (`/settings`)

| 영역 | 내용 |
|------|------|
| Telegram | Bot Token 입력 + 테스트 발송 버튼 |
| 경로 설정 | 프로젝트 루트 경로 관리 |
| 컨텍스트 경고 | 임계값 슬라이더 (기본 70%/90%) |
| 테마 | 다크/라이트 토글 |

---

## 마일스톤별 프론트엔드 작업

### M1 (1–3주) — P0 핵심 기능

> [!IMPORTANT]
> 이 단계에서 디자인 시스템과 레이아웃 기반을 확립합니다.

- [ ] Vite + React + TypeScript 프로젝트 초기화
- [ ] CSS Variables 디자인 토큰 + 다크모드 테마
- [ ] Sidebar + Header + MainLayout 컴포넌트
- [ ] React Router 라우팅 설정 (7개 페이지)
- [ ] Monaco Editor 통합 + CLAUDE.md 로드/저장
- [ ] 글로벌/프로젝트 탭 전환 UI
- [ ] 에이전트 카드 그리드 UI (목록 표시)
- [ ] 공통 컴포넌트: Card, Badge, Modal, Toast

### M2 (4–6주) — P1 확장 기능

- [ ] 토큰 카운터 컴포넌트 (실시간 + 경고색)
- [ ] 스냅샷 목록 + diff 뷰어 + 롤백 UI
- [ ] 에이전트 상태 변경/삭제 액션 연동
- [ ] 스킬 CRUD UI + 슬라이드오버 에디터
- [ ] Hook 토글 카드 + 이벤트 필터 UI
- [ ] WebSocket 연결 → 세션 대시보드 실시간 UI
- [ ] 컨텍스트 사용률 게이지 + 경고 배너

### M3 (7–9주) — P2 고급 기능

- [ ] 토큰 최적화 대시보드 전체 화면
- [ ] 중복 제거 wizard (스텝 UI)
- [ ] CLAUDE.md 슬림화 diff 뷰
- [ ] 세션 토큰 통계 차트 (Recharts)
- [ ] 프로젝트 분석 → 추천 지침 리뷰 UI
- [ ] 설정 복제 UI (소스→대상 선택 + 충돌 옵션)
- [ ] 설정 화면 (Telegram, 경로, 임계값, 테마)
- [ ] `/compact` 버튼 + 컨텍스트 경고 임계값 설정

---

## UI/UX 디자인 방향

| 항목 | 방향 |
|------|------|
| 전체 테마 | **다크 모드 기본**, 라이트 모드 전환 가능 |
| 컬러 팔레트 | Slate/Zinc 기반 다크 + Indigo/Violet 액센트 |
| 타이포그래피 | Inter (Google Fonts) |
| 레이아웃 | 좌측 사이드바 (240px) + 메인 콘텐츠 |
| 카드 스타일 | Glassmorphism (반투명 배경 + backdrop-blur) |
| 애니메이션 | 페이지 전환 fade, 카드 hover scale, 토스트 slide-in |
| 상태 색상 | Active: Green, Paused: Amber, Stopped: Red |
| 경고 체계 | 토큰 2000↑ Amber, 4000↑ Red / 컨텍스트 70% Amber, 90% Red |

---

## User Review Required

> [!IMPORTANT]
> **백엔드 병행 개발**: 이 계획은 프론트엔드만 다룹니다. 백엔드(Express 서버, 파일 API, WebSocket)도 별도 구현 계획이 필요합니다. 프론트 먼저 Mock 데이터로 진행할까요, 아니면 백엔드를 먼저/동시에 진행할까요?

> [!IMPORTANT]
> **Electron 셸**: Electron 앱 구성(Tray, 자동 업데이트 등)은 M4 범위입니다. 프론트엔드는 브라우저 기반으로 먼저 완성 후 Electron에 래핑하는 순서로 진행합니다. 동의하시나요?

## Open Questions

1. **패키지 매니저**: npm vs pnpm vs yarn 중 어떤 것을 사용할까요?
2. **API Mock 전략**: 백엔드가 없는 상태에서 MSW(Mock Service Worker) 또는 로컬 JSON mock 중 어떤 방식을 선호하시나요?
3. **Monaco Editor 번들 크기**: Monaco는 ~2MB로 큰 편입니다. 초기 로딩 2초 요건 충족을 위해 lazy loading 적용 예정인데 괜찮으시죠?
4. **디자인 시안**: 대시보드 디자인 시안을 먼저 생성해서 보여드릴까요?
