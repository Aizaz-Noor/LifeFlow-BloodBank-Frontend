import { useState } from 'react';
import { isRamadanPeriod } from './lib/data';

// Layout components
import Sidebar from './components/common/Sidebar';
import TopBar from './components/common/TopBar';
import NotifPanel from './components/common/NotifPanel';

// Pages
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import DonorsPage from './pages/Donors';
import RequestsPage from './pages/Requests';
import CampsPage from './pages/Camps';
import ReportsPage from './pages/Reports';
import ThalassemiaPage from './pages/Thalassemia';
import TTIScreeningPage from './pages/TTIScreening';
import WastagePage from './pages/Wastage';
import AuditLogPage from './pages/AuditLog';

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
