import { useState } from 'react';
import { Phone } from 'lucide-react';

const APP_LOGO = import.meta.env.BASE_URL + 'logo.png';

// Fixed main contact
const MAIN_CONTACT_NUMBER = '+972732341234';

const AppLayout: React.FC = () => {
  const [callInitiated, setCallInitiated] = useState(false);

  // Helper function to format phone number for tel: link
  const formatPhoneForCall = (number: string) => {
    return number.replace(/[^0-9+]/g, '');
  };

  // Haptic feedback for native feel
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]); // Short vibration pattern
    }
  };

  // Handle call - directly trigger phone call
  const handleCallClick = () => {
    triggerHaptic();
    const formattedNumber = formatPhoneForCall(MAIN_CONTACT_NUMBER);
    setCallInitiated(true);
    window.location.href = `tel:${formattedNumber}`;

    setTimeout(() => {
      setCallInitiated(false);
    }, 2000);
  };

  return (
    <div className="app-layout" dir="rtl">
      {/* Animated Background */}
      <div className="app-bg-container">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-pattern" />
      </div>

      {/* Main Container */}
      <div className="app-container glass">
        {/* Main Content */}
        <main className="app-main">
          <div className="hero-section">
            {/* Logo - Large and Centered */}
            <div style={{
              marginBottom: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-sm)'
            }}>
              <img
                src={APP_LOGO}
                alt="מוקד שרפ"
                style={{
                  height: 100,
                  width: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  border: '3px solid white'
                }}
              />
              <span style={{
                fontSize: '36px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.5px'
              }}>מוקד שרפ</span>
            </div>

            {/* Phone Number - Large and Clear */}
            <div className="phone-display" style={{ marginBottom: 'var(--space-lg)' }}>
              <p className="phone-number" dir="ltr" style={{ fontSize: '38px' }}>
                {MAIN_CONTACT_NUMBER}
              </p>
            </div>

            {/* Main Call Button */}
            <div className="call-button-wrapper" style={{ marginBottom: 'var(--space-lg)' }}>
              <div className="call-button-pulse" />
              <div className="call-button-pulse call-button-pulse-2" />
              <button
                onClick={handleCallClick}
                className="call-button"
                style={{ width: 200, height: 200 }}
                aria-label="התקשר עכשיו"
              >
                <Phone style={{ width: 80, height: 80 }} />
              </button>
            </div>

            {/* Clear Call-to-Action Text */}
            <p style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 700,
              color: 'var(--emergency)',
              marginBottom: 'var(--space-md)'
            }}>
              לחץ כאן להתקשר
            </p>

            {/* Call Status */}
            {callInitiated && (
              <div className="call-status" style={{ fontSize: 'var(--font-size-lg)' }}>
                <div className="call-status-dot" />
                <span>מתחבר למוקד...</span>
              </div>
            )}
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="app-footer" style={{ padding: 'var(--space-sm)', background: 'transparent', borderTop: 'none' }}>
          <p style={{ fontSize: 'var(--font-size-xs)' }}>© 2025 מוקד שרפ</p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
