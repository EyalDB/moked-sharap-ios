import { Phone, Trash2, Clock } from 'lucide-react';
import { useCallHistory } from '@/hooks/useCallHistory';
import { BottomNav } from '@/components/BottomNav';

export default function History() {
  const { history, deleteCall, clearHistory, totalCalls } = useCallHistory();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'היום';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'אתמול';
    } else {
      return date.toLocaleDateString('he-IL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
    }
  };

  // Group calls by date
  const groupedCalls: { [date: string]: typeof history } = {};
  history.forEach((call) => {
    const dateKey = new Date(call.timestamp).toDateString();
    if (!groupedCalls[dateKey]) {
      groupedCalls[dateKey] = [];
    }
    groupedCalls[dateKey].push(call);
  });

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
          <Clock />
        </div>
        <div>
          <h1 className="page-title">היסטוריית שיחות</h1>
          <p className="page-subtitle">{totalCalls} שיחות</p>
        </div>
        {totalCalls > 0 && (
          <button
            onClick={() => {
              if (confirm('למחוק את כל ההיסטוריה?')) {
                clearHistory();
              }
            }}
            className="btn btn-icon"
            style={{ marginRight: 'auto' }}
            aria-label="מחק הכל"
          >
            <Trash2 style={{ width: 20, height: 20 }} />
          </button>
        )}
      </header>

      {/* Content */}
      <main style={{ paddingBottom: 140 }}>
        {totalCalls === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Phone />
            </div>
            <h2 className="empty-state-title">אין שיחות עדיין</h2>
            <p className="empty-state-text">
              כשתתקשר למוקד, השיחה תופיע כאן
            </p>
          </div>
        ) : (
          Object.entries(groupedCalls).map(([dateKey, calls]) => (
            <div key={dateKey}>
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
                {formatDate(calls[0].timestamp)}
              </div>
              {calls.map((call) => (
                <div key={call.id} className="list-item">
                  <div className="list-item-icon">
                    <Phone />
                  </div>
                  <div className="list-item-content">
                    <p className="list-item-title">{call.contactName}</p>
                    <p className="list-item-subtitle" dir="ltr">
                      {call.contactNumber} • {formatTime(call.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCall(call.id);
                    }}
                    className="btn btn-icon list-item-action"
                    aria-label="מחק שיחה"
                  >
                    <Trash2 style={{ width: 18, height: 18 }} />
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
}
