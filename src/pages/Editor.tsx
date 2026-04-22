/* ============================================
   Editor Page — CLAUDE.md Editor
   ============================================ */

import { Suspense, lazy, useMemo } from 'react';
import { Save, RotateCcw, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { useEditorStore } from '../stores/editorStore';
import './Editor.css';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

function estimateTokens(text: string): number {
  // Simple estimate: ~4 chars per token for Korean/mixed content
  return Math.round(text.length / 4);
}

export default function Editor() {
  const {
    activeTab,
    globalContent,
    projectContent,
    snapshots,
    isSaving,
    lastSaved,
    setActiveTab,
    setContent,
    save,
  } = useEditorStore();

  const currentContent = activeTab === 'global' ? globalContent : projectContent;
  const tokenCount = useMemo(() => estimateTokens(currentContent), [currentContent]);
  const filteredSnapshots = snapshots.filter((s) => s.scope === activeTab);

  const getTokenColor = () => {
    if (tokenCount >= 4000) return 'token-counter--danger';
    if (tokenCount >= 2000) return 'token-counter--warning';
    return 'token-counter--safe';
  };

  return (
    <div className="editor-page">
      <div className="editor-header">
        <div className="editor-header-left">
          <h1 className="editor-title">CLAUDE.md Editor</h1>
          <div className="editor-tabs">
            <button
              className={`editor-tab ${activeTab === 'global' ? 'editor-tab--active' : ''}`}
              onClick={() => setActiveTab('global')}
            >
              Global
            </button>
            <button
              className={`editor-tab ${activeTab === 'project' ? 'editor-tab--active' : ''}`}
              onClick={() => setActiveTab('project')}
            >
              Project
            </button>
          </div>
        </div>

        <div className="editor-header-right">
          <div className={`token-counter ${getTokenColor()}`}>
            <span className="token-counter-value">{tokenCount.toLocaleString()}</span>
            <span className="token-counter-label">tokens</span>
          </div>
          {tokenCount >= 4000 && (
            <button className="editor-slim-btn">
              <Sparkles size={14} />
              AI Slim
            </button>
          )}
          <button className="editor-save-btn" onClick={save} disabled={isSaving}>
            <Save size={14} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          {lastSaved && (
            <span className="editor-last-saved">Saved at {lastSaved}</span>
          )}
        </div>
      </div>

      <div className="editor-body">
        <div className="editor-main">
          <Suspense
            fallback={
              <div className="editor-loading">
                <div className="editor-loading-spinner" />
                <span>Loading editor...</span>
              </div>
            }
          >
            <MonacoEditor
              height="100%"
              language="markdown"
              theme="vs-dark"
              value={currentContent}
              onChange={(val) => setContent(val || '')}
              options={{
                fontSize: 14,
                lineHeight: 22,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                renderLineHighlight: 'gutter',
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                bracketPairColorization: { enabled: true },
              }}
            />
          </Suspense>
        </div>

        <div className="editor-sidebar">
          <div className="editor-sidebar-header">
            <Clock size={16} />
            <h3>Snapshot History</h3>
          </div>
          <div className="snapshot-list">
            {filteredSnapshots.map((snap) => (
              <div key={snap.id} className="snapshot-item">
                <div className="snapshot-dot" />
                <div className="snapshot-info">
                  <div className="snapshot-time">{snap.timestamp}</div>
                  <div className="snapshot-tokens">{snap.tokenCount} tokens</div>
                  <div className="snapshot-actions">
                    <button className="snapshot-btn">View Diff</button>
                    <button className="snapshot-btn snapshot-btn--rollback">
                      <RotateCcw size={11} />
                      Rollback
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Duplicate warning banner */}
      <div className="editor-warning-banner">
        <AlertTriangle size={16} />
        <span>
          <strong>Duplicate detected:</strong> 3 sentences overlap with{' '}
          {activeTab === 'global' ? 'Project' : 'Global'} CLAUDE.md
        </span>
        <button className="editor-warning-btn">Review</button>
      </div>
    </div>
  );
}
