/* ============================================
   Agents Page — Agent Management
   ============================================ */

import { useState } from 'react';
import {
  Search,
  Edit3,
  Pause,
  Play,
  Trash2,
  Copy,
  Clock,
  Bot,
  Filter,
} from 'lucide-react';
import { useSessionStore } from '../stores/sessionStore';
import Badge from '../components/common/Badge';
import type { AgentStatus } from '../types';
import './Agents.css';

export default function Agents() {
  const {
    agents,
    agentFilter,
    agentProjectFilter,
    setAgentFilter,
    setAgentProjectFilter,
    updateAgentStatus,
    deleteAgent,
  } = useSessionStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const projects = ['all', ...new Set(agents.map((a) => a.project))];

  const filteredAgents = agents.filter((agent) => {
    if (agentFilter !== 'all' && agent.status !== agentFilter) return false;
    if (agentProjectFilter !== 'all' && agent.project !== agentProjectFilter)
      return false;
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const statusCounts = {
    all: agents.length,
    active: agents.filter((a) => a.status === 'active').length,
    paused: agents.filter((a) => a.status === 'paused').length,
    stopped: agents.filter((a) => a.status === 'stopped').length,
  };

  const handleToggleStatus = (id: string, currentStatus: AgentStatus) => {
    const newStatus: AgentStatus = currentStatus === 'paused' ? 'active' : 'paused';
    updateAgentStatus(id, newStatus);
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteAgent(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="agents-page">
      <div className="agents-header">
        <div className="agents-header-left">
          <h1 className="agents-title">Agent Management</h1>
          <span className="agents-subtitle">{agents.length} agents configured</span>
        </div>
      </div>

      {/* ── Capacity Bar ── */}
      <div className="agents-capacity glass-card">
        <div className="agents-capacity-info">
          <Bot size={16} />
          <span>Batch Capacity</span>
          <strong>{agents.length} / 25</strong>
        </div>
        <div className="agents-capacity-bar">
          <div
            className="agents-capacity-fill"
            style={{ width: `${(agents.length / 25) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="agents-filters">
        <div className="agents-filter-group">
          <Filter size={14} />
          {(['all', 'active', 'paused', 'stopped'] as const).map((status) => (
            <button
              key={status}
              className={`agents-filter-btn ${agentFilter === status ? 'agents-filter-btn--active' : ''}`}
              onClick={() => setAgentFilter(status)}
            >
              {status === 'all' ? 'All' : status}
              <span className="agents-filter-count">{statusCounts[status]}</span>
            </button>
          ))}
        </div>

        <div className="agents-filter-right">
          <select
            className="agents-project-select"
            value={agentProjectFilter}
            onChange={(e) => setAgentProjectFilter(e.target.value)}
          >
            {projects.map((p) => (
              <option key={p} value={p}>
                {p === 'all' ? 'All Projects' : p}
              </option>
            ))}
          </select>

          <div className="agents-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Agent Grid ── */}
      <div className="agents-grid">
        {filteredAgents.map((agent, i) => (
          <div
            key={agent.id}
            className={`agent-card glass-card agent-card--${agent.status} animate-fade-in`}
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="agent-card-top">
              <div className="agent-card-name-row">
                <div className="agent-card-avatar">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="agent-card-name">{agent.name}</div>
                  <div className="agent-card-project">{agent.project}</div>
                </div>
              </div>
              <Badge variant={agent.status}>{agent.status}</Badge>
            </div>

            {agent.description && (
              <p className="agent-card-desc">{agent.description}</p>
            )}

            <div className="agent-card-footer">
              <div className="agent-card-time">
                <Clock size={12} />
                <span>{agent.lastActivity}</span>
              </div>
              <div className="agent-card-actions">
                <button className="agent-action-btn" title="Edit">
                  <Edit3 size={14} />
                </button>
                <button
                  className="agent-action-btn"
                  title={agent.status === 'paused' ? 'Resume' : 'Pause'}
                  onClick={() => handleToggleStatus(agent.id, agent.status)}
                >
                  {agent.status === 'paused' ? <Play size={14} /> : <Pause size={14} />}
                </button>
                <button className="agent-action-btn" title="Clone">
                  <Copy size={14} />
                </button>
                <button
                  className={`agent-action-btn agent-action-btn--delete ${
                    deleteConfirm === agent.id ? 'agent-action-btn--confirm' : ''
                  }`}
                  title={deleteConfirm === agent.id ? 'Click again to confirm' : 'Delete'}
                  onClick={() => handleDelete(agent.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="agents-empty">
          <Bot size={48} strokeWidth={1} />
          <p>No agents match the current filters.</p>
        </div>
      )}
    </div>
  );
}
