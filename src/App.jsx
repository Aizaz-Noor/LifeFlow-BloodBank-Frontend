import { useState } from 'react';
import { Icons, NAV_ITEMS } from './icons';
import LoginPage from './Login';
import HomePage from './Home';
import DashboardPage from './Dashboard';
import DonorsPage from './Donors';
import RequestsPage from './Requests';
import CampsPage from './Camps';
import ReportsPage from './Reports';
import ThalassemiaPage from './Thalassemia';
import TTIScreeningPage from './TTIScreening';
import WastagePage from './Wastage';
import AuditLogPage from './AuditLog';
import { isRamadanPeriod, DONORS, donationTypeStats } from './data';

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

/* ── Nav config ── */
const PK_NAV = [
    { key: 'thalassemia', label: 'Thalassemia', icon: Icons.DNA },
    { key: 'tti', label: 'TTI Screening', icon: Icons.Microscope },
];

const OPS_NAV = [
    { key: 'wastage', label: 'Wastage Tracker', icon: Icons.Trash },
    { key: 'audit', label: 'Audit Log', icon: Icons.FileText },
];

const ALL_NAV = [...NAV_ITEMS, ...PK_NAV, ...OPS_NAV];

/* ═══════════ SIDEBAR ═══════════ */
function Sidebar({ activePage, setActivePage, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
    const W = collapsed ? 68 : 240;

    const navBtn = (key, label, Icon, activeColor, activeBg) => {
        const active = activePage === key;
        return (
            <button key={key} onClick={() => { setActivePage(key); setMobileOpen(false); }}
                aria-label={collapsed ? label : undefined}
                aria-current={active ? 'page' : undefined}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: collapsed ? '10px 0' : '10px 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: '10px', border: 'none', cursor: 'pointer', width: '100%', fontSize: '14px', fontWeight: active ? 600 : 500, whiteSpace: 'nowrap', background: active ? activeBg : 'transparent', color: active ? activeColor : 'var(--text-secondary)', borderLeft: active ? `3px solid ${activeColor}` : '3px solid transparent', transition: 'all 0.15s' }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}>
                <span style={{ flexShrink: 0 }}><Icon /></span>
                {!collapsed && <span>{label}</span>}
            </button>
        );
    };

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 39 }}
                    onClick={() => setMobileOpen(false)} aria-hidden="true" />
            )}
            <aside
                className={mobileOpen ? 'sidebar-mobile-open' : ''}
                role="navigation"
                aria-label="Main navigation"
                style={{
                    position: 'fixed', left: 0, top: 0, height: '100vh',
                    width: W + 'px',
                    display: 'flex', flexDirection: 'column',
                    background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)',
                    transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                    zIndex: 40, overflow: 'hidden',
                }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: collapsed ? '0 17px' : '0 20px', height: '64px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 10px rgba(255,59,48,0.25)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                    </div>
                    {!collapsed && (
                        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>LifeFlow</div>
                            <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '2px' }}>Blood Bank</div>
                        </div>
                    )}
                </div>

                <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
                    {/* Navigation */}
                    {!collapsed && <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 12px 8px' }}>Navigation</p>}
                    {NAV_ITEMS.map(({ key, label, icon: Icon }) => navBtn(key, label, Icon, 'var(--red)', 'var(--red-bg)'))}

                    {/* Pakistan-specific */}
                    {!collapsed && (
                        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '12px 12px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                            Pakistan-Specific
                        </p>
                    )}
                    {collapsed && <div style={{ height: '1px', background: 'var(--border)', margin: '6px 8px' }} />}
                    {PK_NAV.map(({ key, label, icon: Icon }) => navBtn(key, label, Icon, 'var(--orange)', 'var(--orange-bg)'))}

                    {/* Operations */}
                    {!collapsed && (
                        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '12px 12px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            Operations
                        </p>
                    )}
                    {collapsed && <div style={{ height: '1px', background: 'var(--border)', margin: '6px 8px' }} />}
                    {OPS_NAV.map(({ key, label, icon: Icon }) => navBtn(key, label, Icon, 'var(--blue)', 'var(--blue-bg)'))}
                </nav>

                <div style={{ padding: '8px', borderTop: '1px solid var(--border)' }}>
                    {!collapsed && <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', textAlign: 'center', padding: '4px 0 8px', fontWeight: 500 }}>LifeFlow v1.0 · Blood Bank</p>}
                    <button onClick={() => setCollapsed(!collapsed)}
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '9px', borderRadius: '10px', border: 'none', background: 'transparent', color: 'var(--text-tertiary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <span style={{ display: 'flex', transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s' }}><Icons.Chevron /></span>
                        {!collapsed && <span>Collapse</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}

/* ═══════════ SUN / MOON SVG icons ═══════════ */
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

/* ═══════════ NOTIFICATIONS PANEL ═══════════ */
function NotifPanel({ onClose }) {
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

/* ═══════════ TOPBAR ═══════════ */
function TopBar({ activePage, onLogout, showNotif, setShowNotif, dark, setDark, onMobileMenu }) {
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

                {/* Dark Mode Toggle - SVG icon, no emoji */}
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

/* ═══════════ MAIN APP ═══════════ */
export default function App() {
    const [showHome, setShowHome] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [dark, setDark] = useState(() => localStorage.getItem('lifeflow-dark') === 'true');
    const W = collapsed ? 68 : 240;
    const ramadan = isRamadanPeriod();

    const toggleDark = (val) => {
        setDark(val);
        localStorage.setItem('lifeflow-dark', val);
        document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light');
    };

    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }

    // ── Public homepage (before login) ──
    if (showHome && !loggedIn) {
        return (
            <HomePage
                onDonate={() => { setShowHome(false); }}
                onRequest={() => { setShowHome(false); }}
                onLogin={() => { setShowHome(false); }}
            />
        );
    }

    // ── Login screen ──
    if (!loggedIn) {
        return <LoginPage onLogin={() => setLoggedIn(true)} />;
    }

    const pages = {
        dashboard: <DashboardPage />,
        donors: <DonorsPage />,
        requests: <RequestsPage />,
        camps: <CampsPage />,
        reports: <ReportsPage />,
        thalassemia: <ThalassemiaPage />,
        tti: <TTIScreeningPage />,
        wastage: <WastagePage />,
        audit: <AuditLogPage />,
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
            <Sidebar
                activePage={activePage} setActivePage={setActivePage}
                collapsed={collapsed} setCollapsed={setCollapsed}
                mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
            />
            <div className="main-content" style={{ marginLeft: W + 'px', transition: 'margin-left 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
                <TopBar
                    activePage={activePage}
                    onLogout={() => { setLoggedIn(false); setShowHome(true); setActivePage('dashboard'); }}
                    showNotif={showNotif} setShowNotif={setShowNotif}
                    dark={dark} setDark={toggleDark}
                    onMobileMenu={() => setMobileOpen(true)}
                />
                {showNotif && <NotifPanel onClose={() => setShowNotif(false)} />}

                {/* Ramadan Shortage Warning Banner */}
                {ramadan && (
                    <div role="alert" style={{ background: 'linear-gradient(90deg,#1E3A5F,#1A4B6E)', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                        <p style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>
                            <strong>Ramadan Shortage Alert</strong> - Pakistan experiences a <strong>40% drop in blood donations</strong> during Ramadan (March 2026). Schedule extra camps and activate your donor network NOW.
                        </p>
                        <span style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '99px', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                            Ramadan begins ~Mar 1, 2026
                        </span>
                    </div>
                )}

                <main style={{ padding: '28px 32px', minHeight: 'calc(100vh - 64px)' }}>
                    {pages[activePage] || <DashboardPage />}
                </main>
            </div>
        </div>
    );
}
