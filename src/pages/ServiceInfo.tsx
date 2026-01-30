import { Info, Phone, Clock, Stethoscope, Shield, Heart } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

const SERVICE_INFO = {
  name: 'מוקד שרפ',
  tagline: 'ביטחון ושר"פ לקהילה וארגונים בע"מ',
  phone: '+972-73-234-1234',
  hours: '24/7 - מענה מסביב לשעון',
  description:
    'מוקד שרפ מספק שירותי רפואה פרטית ואבטחה לקהילות וארגונים. אנו מחויבים לספק מענה מהיר ומקצועי בכל שעה.',
  services: [
    'מענה רפואי מיידי',
    'תיאום פינוי לבית חולים',
    'ייעוץ רפואי טלפוני',
    'שירותי אבטחה',
    'ליווי רפואי באירועים',
  ],
};

export default function ServiceInfo() {
  const handleCall = () => {
    window.location.href = `tel:${SERVICE_INFO.phone.replace(/[^0-9+]/g, '')}`;
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
          <Info />
        </div>
        <div>
          <h1 className="page-title">אודות השירות</h1>
          <p className="page-subtitle">{SERVICE_INFO.tagline}</p>
        </div>
      </header>

      {/* Content */}
      <main style={{ paddingBottom: 100 }}>
        {/* Main Info Card */}
        <div className="info-card">
          <h2 className="info-card-title">
            <Stethoscope />
            {SERVICE_INFO.name}
          </h2>
          <p className="info-card-text">{SERVICE_INFO.description}</p>
        </div>

        {/* Contact Card */}
        <div className="info-card">
          <h2 className="info-card-title">
            <Phone />
            יצירת קשר
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <Phone style={{ width: 20, height: 20, color: 'var(--emergency)' }} />
              <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }} dir="ltr">
                {SERVICE_INFO.phone}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <Clock style={{ width: 20, height: 20, color: 'var(--emergency)' }} />
              <span>{SERVICE_INFO.hours}</span>
            </div>
            <button onClick={handleCall} className="btn btn-primary" style={{ marginTop: 'var(--space-sm)' }}>
              <Phone style={{ width: 20, height: 20 }} />
              התקשר עכשיו
            </button>
          </div>
        </div>

        {/* Services Card */}
        <div className="info-card">
          <h2 className="info-card-title">
            <Heart />
            השירותים שלנו
          </h2>
          <ul className="info-card-list">
            {SERVICE_INFO.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        {/* Trust Card */}
        <div className="info-card">
          <h2 className="info-card-title">
            <Shield />
            למה לבחור בנו?
          </h2>
          <ul className="info-card-list">
            <li>צוות מקצועי ומנוסה</li>
            <li>זמינות 24/7</li>
            <li>מענה מהיר תוך דקות</li>
            <li>שירות אישי ומסור</li>
          </ul>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
