/* ============================================
   Sidebar Component
   ============================================ */

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileEdit,
  Bot,
  Sparkles,
  Webhook,
  Gauge,
  Settings,
  Zap,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/editor', label: 'Editor', icon: FileEdit },
  { path: '/agents', label: 'Agents', icon: Bot },
  { path: '/skills', label: 'Skills', icon: Sparkles },
  { path: '/hooks', label: 'Hooks', icon: Webhook },
  { path: '/token-optimizer', label: 'Token Optimizer', icon: Gauge },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Zap size={22} />
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-title">CCM</span>
          <span className="sidebar-logo-sub">Claude Code Manager</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">MENU</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
            }
          >
            <item.icon size={18} className="sidebar-link-icon" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <div className="sidebar-status-dot" />
          <span>Server Running</span>
        </div>
        <span className="sidebar-port">localhost:3333</span>
      </div>
    </aside>
  );
}
