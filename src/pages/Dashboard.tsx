/* ============================================
   Dashboard Page
   ============================================ */

import {
  Activity,
  Bot,
  Gauge,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Info,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useSessionStore } from '../stores/sessionStore';
import { mockTokenStats } from '../data/mockData';
import Badge from '../components/common/Badge';
import './Dashboard.css';

export default function Dashboard() {
  const { agents, sessions, notifications } = useSessionStore();

  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const activeSessions = sessions.filter((s) => s.status === 'running').length;
  const avgContext = sessions.length
    ? Math.round(sessions.reduce((sum, s) => sum + s.contextUsage, 0) / sessions.length)
    : 0;

  const getContextColor = (value: number) => {
    if (value >= 90) return 'var(--status-stopped)';
    if (value >= 70) return 'var(--status-paused)';
    return 'var(--status-active)';
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'approval': return <ShieldAlert size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'error': return <XCircle size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <span className="dashboard-subtitle">Claude Code Manager Overview</span>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-cards">
        <div className="stat-card glass-card animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <div className="stat-card-header">
            <div className="stat-card-icon stat-card-icon--active">
              <Activity size={20} />
            </div>
            <TrendingUp size={16} className="stat-card-trend stat-card-trend--up" />
          </div>
          <div className="stat-card-value">{activeSessions}</div>
          <div className="stat-card-label">Active Sessions</div>
          <div className="stat-card-bar">
            <div
              className="stat-card-bar-fill stat-card-bar-fill--active"
              style={{ width: `${(activeSessions / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="stat-card glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card-header">
            <div className="stat-card-icon stat-card-icon--agents">
              <Bot size={20} />
            </div>
            <span className="stat-card-fraction">{activeAgents}/25</span>
          </div>
          <div className="stat-card-value">{agents.length}</div>
          <div className="stat-card-label">Total Agents</div>
          <div className="stat-card-bar">
            <div
              className="stat-card-bar-fill stat-card-bar-fill--agents"
              style={{ width: `${(agents.length / 25) * 100}%` }}
            />
          </div>
        </div>

        <div className="stat-card glass-card animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="stat-card-header">
            <div className="stat-card-icon stat-card-icon--context">
              <Gauge size={20} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: getContextColor(avgContext) }}>
            {avgContext}%
          </div>
          <div className="stat-card-label">Avg Context Usage</div>
          <div className="stat-card-bar">
            <div
              className="stat-card-bar-fill"
              style={{
                width: `${avgContext}%`,
                background: getContextColor(avgContext),
              }}
            />
          </div>
        </div>

        <div className="stat-card glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-card-header">
            <div className="stat-card-icon stat-card-icon--tokens">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-card-value">166.2K</div>
          <div className="stat-card-label">Today's Tokens</div>
          <div className="stat-card-bar">
            <div
              className="stat-card-bar-fill stat-card-bar-fill--tokens"
              style={{ width: '72%' }}
            />
          </div>
        </div>
      </div>

      {/* ── Chart + Notifications ── */}
      <div className="dashboard-grid">
        <div className="dashboard-chart glass-card animate-fade-in" style={{ animationDelay: '0.25s' }}>
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">Token Usage (7 Days)</h2>
          </div>
          <div className="dashboard-chart-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockTokenStats} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(148,163,184,0.12)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#1e293b',
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '13px',
                  }}
                  formatter={(value: number) => [`${(value / 1000).toFixed(1)}K tokens`, '']}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
                />
                <Bar
                  dataKey="inputTokens"
                  name="Input"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="outputTokens"
                  name="Output"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-notifications glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">Notifications</h2>
            <span className="dashboard-notif-count">
              {notifications.filter((n) => !n.read).length} new
            </span>
          </div>
          <div className="notification-list">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`notification-item ${notif.read ? 'notification-item--read' : ''}`}
              >
                <div className={`notification-icon notification-icon--${notif.type}`}>
                  {getNotifIcon(notif.type)}
                </div>
                <div className="notification-body">
                  <div className="notification-title">{notif.title}</div>
                  <div className="notification-message">{notif.message}</div>
                  <div className="notification-time">{notif.timestamp}</div>
                </div>
                {notif.type === 'approval' && !notif.read && (
                  <div className="notification-actions">
                    <button className="notif-btn notif-btn--approve">
                      <CheckCircle2 size={14} />
                    </button>
                    <button className="notif-btn notif-btn--reject">
                      <XCircle size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Agents ── */}
      <div className="dashboard-agents glass-card animate-fade-in" style={{ animationDelay: '0.35s' }}>
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">Recent Agents</h2>
          <a href="/agents" className="dashboard-view-all">View All →</a>
        </div>
        <div className="agent-mini-grid">
          {agents.slice(0, 6).map((agent) => (
            <div key={agent.id} className={`agent-mini-card agent-mini-card--${agent.status}`}>
              <div className="agent-mini-top">
                <span className="agent-mini-name">{agent.name}</span>
                <Badge variant={agent.status}>{agent.status}</Badge>
              </div>
              <div className="agent-mini-project">{agent.project}</div>
              <div className="agent-mini-footer">
                <Clock size={12} />
                <span>{agent.lastActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
