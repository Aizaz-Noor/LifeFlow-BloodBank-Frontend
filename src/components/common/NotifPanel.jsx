const NOTIFICATIONS = [
    { id: 1, type: 'critical', title: 'Critical Request', body: 'Jinnah Hospital needs O- urgently', time: '5 min ago', unread: true },
    { id: 2, type: 'warning', title: 'Blood Expiring Today', body: 'AB- (3 units) expires today', time: '2 hours ago', unread: true },
    { id: 3, type: 'warning', title: 'Low Stock Alert', body: 'O- dropped below 10 units', time: '5 hours ago', unread: true },
    { id: 4, type: 'critical', title: 'Thalassemia Overdue', body: 'Zora Qasim & Daniyal Mirza need transfusion', time: '6 hours ago', unread: true },
    { id: 5, type: 'warning', title: 'TTI Flag', body: '3 donors failed HBV/HCV screening', time: 'Yesterday', unread: true },
    { id: 6, type: 'success', title: 'Request Fulfilled', body: 'REQ-004 fulfilled - AB+ delivered', time: 'Yesterday', unread: false },
    { id: 7, type: 'info', title: 'Camp Registration Open', body: 'NED University Drive - Mar 5', time: 'Yesterday', unread: false },
];

const NOTIF_COLOR = { critical: 'var(--red)', warning: 'var(--orange)', success: 'var(--green)', info: 'var(--blue)' };
const NOTIF_BG = { critical: 'var(--red-bg)', warning: 'var(--orange-bg)', success: 'var(--green-bg)', info: 'var(--blue-bg)' };

export { NOTIFICATIONS, NOTIF_COLOR, NOTIF_BG };

export default function NotifPanel({ onClose }) {
    const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 80 }} onClick={e => e.target === e.currentTarget && onClose()}>
            <div role="dialog" aria-label="Notifications" style={{ position: 'absolute', top: '64px', right: '20px', width: '360px', background: 'var(--bg-card)', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', overflow: 'hidden', animation: 'scaleIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both', transformOrigin: 'top right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px 12px', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</h3>
                        {unreadCount > 0 && <p style={{ fontSize: '12px', color: '#FF3B30', fontWeight: 600, marginTop: '2px' }}>{unreadCount} unread</p>}
                    </div>
                    <button onClick={onClose} aria-label="Close notifications" style={{ border: 'none', background: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '18px' }}>×</button>
                </div>
                {NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ display: 'flex', gap: '12px', padding: '13px 18px', borderBottom: '1px solid var(--border)', background: n.unread ? NOTIF_BG[n.type] : 'transparent', cursor: 'pointer', transition: 'background 0.12s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = n.unread ? NOTIF_BG[n.type] : 'transparent'}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: NOTIF_BG[n.type], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: NOTIF_COLOR[n.type] }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</p>
                                {n.unread && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: NOTIF_COLOR[n.type], flexShrink: 0, marginTop: '3px' }} />}
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>{n.body}</p>
                            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', fontWeight: 500 }}>{n.time}</p>
                        </div>
                    </div>
                ))}
                <div style={{ padding: '12px', textAlign: 'center' }}>
                    <button style={{ fontSize: '13px', fontWeight: 600, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer' }}>Mark all as read</button>
                </div>
            </div>
        </div>
    );
}
