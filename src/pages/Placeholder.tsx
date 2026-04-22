/* ============================================
   Placeholder Pages — Skills, Hooks, Token Optimizer, Settings
   These will be fully implemented in M2/M3
   ============================================ */

import { Sparkles, Webhook, Gauge, Settings as SettingsIcon } from 'lucide-react';
import './Placeholder.css';

function PlaceholderPage({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card glass-card animate-fade-in">
        <div className="placeholder-icon">
          <Icon size={40} strokeWidth={1.2} />
        </div>
        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-desc">{description}</p>
        <div className="placeholder-badge">Coming in M2</div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <PlaceholderPage
      icon={Sparkles}
      title="Skills Management"
      description="Create, edit, and manage skills. Link skills to agents and projects."
    />
  );
}

export function Hooks() {
  return (
    <PlaceholderPage
      icon={Webhook}
      title="Hook Management"
      description="Configure hooks for PreToolUse, PostToolUse, Stop, and SubagentStop events."
    />
  );
}

export function TokenOptimizer() {
  return (
    <PlaceholderPage
      icon={Gauge}
      title="Token Optimizer"
      description="Analyze token usage, detect duplicates, and optimize your CLAUDE.md files."
    />
  );
}

export function SettingsPage() {
  return (
    <PlaceholderPage
      icon={SettingsIcon}
      title="Settings"
      description="Configure Telegram notifications, project paths, context thresholds, and theme."
    />
  );
}
