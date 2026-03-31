import { Icons, NAV_ITEMS } from '../../lib/icons';
import { donationTypeStats, DONORS } from '../../lib/data';
import { NOTIFICATIONS } from './NotifPanel';

/* ── Nav config (mirrored from Sidebar for label lookup) ── */
const PK_NAV = [
    { key: 'thalassemia', label: 'Thalassemia', icon: Icons.DNA },
    { key: 'tti', label: 'TTI Screening', icon: Icons.Microscope },
];

const OPS_NAV = [
    { key: 'wastage', label: 'Wastage Tracker', icon: Icons.Trash },
    { key: 'audit', label: 'Audit Log', icon: Icons.FileText },
];

const ALL_NAV = [...NAV_ITEMS, ...PK_NAV, ...OPS_NAV];

function SunIcon() {
    return (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

export default function TopBar({ activePage, onLogout, showNotif, setShowNotif, dark, setDark, onMobileMenu }) {
    const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;
    const pageLabel = ALL_NAV.find(n => n.key === activePage)?.label || 'Dashboard';
    const stats = donationTypeStats(DONORS);
    const voluntaryPct = Math.round((stats.voluntary / stats.total) * 100);

    return (
        <header style={{ height: '64px', background: dark ? 'rgba(28,28,30,0.92)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Mobile hamburger */}
                <button onClick={onMobileMenu} className="mobile-menu-btn" aria-label="Open navigation menu"
                    style={{ display: 'none', width: '36px', height: '36px', border: '1px solid var(--border)', background: 'var(--bg-card)', borderRadius: '10px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500 }}>LifeFlow</span>
                <span style={{ color: 'var(--border)' }}>›</span>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>{pageLabel}</span>
                <span title={`${voluntaryPct}% of donors gave blood voluntarily (WHO target: 100%)`} style={{ marginLeft: '8px', padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, background: voluntaryPct >= 50 ? 'var(--green-bg)' : 'var(--orange-bg)', color: voluntaryPct >= 50 ? 'var(--green)' : 'var(--orange)', cursor: 'help' }}>
                    {voluntaryPct}% voluntary
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="hide-mobile">
                    {new Date('2026-02-24').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>

                {/* Dark Mode Toggle */}
                <button onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                    style={{ width: '36px', height: '36px', border: '1px solid var(--border)', background: dark ? '#2C2C2E' : '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: dark ? '#FFD60A' : '#6E6E73', transition: 'all 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                    {dark ? <SunIcon /> : <MoonIcon />}
                </button>

                {/* Notification Bell */}
                <button onClick={() => setShowNotif(!showNotif)} aria-label={`Notifications - ${unreadCount} unread`}
                    style={{ position: 'relative', width: '36px', height: '36px', border: '1px solid var(--border)', background: showNotif ? '#FFF1F0' : 'var(--bg-card)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: showNotif ? '#FF3B30' : 'var(--text-secondary)', transition: 'all 0.15s' }}>
                    <Icons.Bell />
                    {unreadCount > 0 && <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: '#FF3B30', borderRadius: '50%', border: '1.5px solid var(--bg-card)' }} />}
                </button>

                <div style={{ width: '1px', height: '28px', background: 'var(--border)' }} className="hide-mobile" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="hide-mobile">
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg,#FF6961,#FF3B30)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 800, boxShadow: '0 2px 8px rgba(255,59,48,0.2)' }}>A</div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>Admin</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Blood Bank Manager</div>
                    </div>
                </div>
                <button onClick={onLogout}
                    style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-bg)'; e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                    Sign out
                </button>
            </div>
        </header>
    );
}
