import { Icons, NAV_ITEMS } from '../../lib/icons';

/* ── Nav config ── */
const PK_NAV = [
    { key: 'thalassemia', label: 'Thalassemia', icon: Icons.DNA },
    { key: 'tti', label: 'TTI Screening', icon: Icons.Microscope },
];

const OPS_NAV = [
    { key: 'wastage', label: 'Wastage Tracker', icon: Icons.Trash },
    { key: 'audit', label: 'Audit Log', icon: Icons.FileText },
];

export { PK_NAV, OPS_NAV };

export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
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
