/* ============================================
   Header Component
   ============================================ */

import { Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore';
import { useSessionStore } from '../../stores/sessionStore';
import './Header.css';

export default function Header() {
  const { theme, toggleTheme } = useSettingsStore();
  const notifications = useSessionStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-project-selector">
          <span className="header-project-label">Project</span>
          <button className="header-project-btn">
            <span>frontend-app</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="header-icon-btn header-notification-btn" title="Notifications">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="header-notification-badge">{unreadCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
