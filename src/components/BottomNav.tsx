import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Clock, Info, Settings } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: '/', label: 'בית', icon: Home },
  { path: '/history', label: 'היסטוריה', icon: Clock },
  { path: '/info', label: 'מידע', icon: Info },
  { path: '/settings', label: 'הגדרות', icon: Settings },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" dir="rtl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="bottom-nav-icon" />
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
