/* ============================================
   Badge Component
   ============================================ */

import './Badge.css';

interface BadgeProps {
  variant: 'active' | 'paused' | 'stopped' | 'info' | 'warning';
  children: React.ReactNode;
  dot?: boolean;
}

export default function Badge({ variant, children, dot = true }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}
