import { Settings as SettingsIcon, Vibrate, Moon, Info, Shield, ExternalLink } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useTheme } from '@/components/theme-provider';
import { Switch } from '@/components/ui/switch';
import { BottomNav } from '@/components/BottomNav';
import { Link } from 'react-router-dom';

const APP_VERSION = '1.0.2';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    updateSettings({ theme: newTheme });
  };

  const handleVibrationToggle = () => {
    updateSettings({ enableVibration: !settings.enableVibration });
    // Test vibration
    if (!settings.enableVibration && 'vibrate' in navigator) {
      navigator.vibrate([50]);
    }
  };

  return (
    <div className="app-layout" dir="rtl">
      {/* Background */}
      <div className="app-bg-container">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-pattern" />
      </div>

      {/* Header */}
      <header className="page-header">
        <div className="list-item-icon">
          <SettingsIcon />
        </div>
        <div>
          <h1 className="page-title">הגדרות</h1>
          <p className="page-subtitle">התאם את האפליקציה</p>
        </div>
      </header>

      {/* Content */}
      <main style={{ paddingBottom: 100 }}>
        {/* Appearance Section */}
        <div
          style={{
            padding: 'var(--space-sm) var(--space-lg)',
            background: 'var(--bg-elevated)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          תצוגה
        </div>

        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-title">
              <Moon style={{ width: 18, height: 18, marginLeft: 8, verticalAlign: 'middle' }} />
              מצב כהה
            </span>
            <span className="settings-description">שנה לערכת נושא כהה</span>
          </div>
          <Switch checked={theme === 'dark'} onCheckedChange={handleThemeToggle} />
        </div>

        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-title">
              <Vibrate style={{ width: 18, height: 18, marginLeft: 8, verticalAlign: 'middle' }} />
              רטט
            </span>
            <span className="settings-description">הפעל רטט בעת לחיצה</span>
          </div>
          <Switch checked={settings.enableVibration} onCheckedChange={handleVibrationToggle} />
        </div>

        {/* About Section */}
        <div
          style={{
            padding: 'var(--space-sm) var(--space-lg)',
            background: 'var(--bg-elevated)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border)',
            marginTop: 'var(--space-md)',
          }}
        >
          אודות
        </div>

        <Link to="/info" className="list-item" style={{ textDecoration: 'none' }}>
          <div className="list-item-icon">
            <Info />
          </div>
          <div className="list-item-content">
            <p className="list-item-title">אודות השירות</p>
            <p className="list-item-subtitle">מידע על מוקד שרפ</p>
          </div>
          <ExternalLink style={{ width: 18, height: 18, color: 'var(--text-muted)' }} />
        </Link>

        <Link to="/privacy" className="list-item" style={{ textDecoration: 'none' }}>
          <div className="list-item-icon">
            <Shield />
          </div>
          <div className="list-item-content">
            <p className="list-item-title">מדיניות פרטיות</p>
            <p className="list-item-subtitle">איך אנחנו שומרים על המידע שלך</p>
          </div>
          <ExternalLink style={{ width: 18, height: 18, color: 'var(--text-muted)' }} />
        </Link>

        {/* App Info */}
        <div className="info-card" style={{ marginTop: 'var(--space-lg)' }}>
          <div style={{ textAlign: 'center' }}>
            <img
              src={import.meta.env.BASE_URL + 'logo.png'}
              alt="מוקד שרפ"
              style={{
                width: 80,
                height: 80,
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-md)',
              }}
            />
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 4 }}>
              מוקד שרפ
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
              גרסה {APP_VERSION}
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-muted)',
                marginTop: 'var(--space-md)',
              }}
            >
              © 2025 מוקד שרפ - כל הזכויות שמורות
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
