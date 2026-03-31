import { useState } from 'react';
import { Icons } from './icons';

/* ─── Shared audit log store ─── */
export let AUDIT_LOG = [
    { id: 1, user: 'Admin', action: 'Donor Added', target: 'Nadia Akram (O-)', module: 'Donors', time: '2026-02-24 11:45', type: 'create' },
    { id: 2, user: 'Admin', action: 'Request Approved', target: 'REQ-002 - A+ × 2 units', module: 'Requests', time: '2026-02-24 11:30', type: 'update' },
    { id: 3, user: 'Admin', action: 'TTI Test Updated', target: 'Hassan Ali - HBV flagged', module: 'TTI', time: '2026-02-24 11:10', type: 'update' },
    { id: 4, user: 'Admin', action: 'Camp Scheduled', target: 'Ramzan Blood Camp (Mar 20)', module: 'Camps', time: '2026-02-24 10:55', type: 'create' },
    { id: 5, user: 'Admin', action: 'Units Discarded', target: 'AB- × 3 - Expired', module: 'Wastage', time: '2026-02-24 10:30', type: 'delete' },
    { id: 6, user: 'Admin', action: 'Request Fulfilled', target: 'REQ-004 - AB+ × 1 unit', module: 'Requests', time: '2026-02-23 16:00', type: 'update' },
    { id: 7, user: 'Admin', action: 'Donor Dismissed', target: 'REQ-007 - B- discharged', module: 'Requests', time: '2026-02-23 14:40', type: 'delete' },
    { id: 8, user: 'Admin', action: 'Thalassemia Patient', target: 'Hamza Baig registered', module: 'Thalassemia', time: '2026-02-23 13:20', type: 'create' },
    { id: 9, user: 'Admin', action: 'Transfusion Logged', target: 'Zora Qasim - B+ × 2 units', module: 'Thalassemia', time: '2026-02-23 11:00', type: 'update' },
    { id: 10, user: 'Admin', action: 'Units Discarded', target: 'B- × 2 - Contaminated', module: 'Wastage', time: '2026-02-22 15:15', type: 'delete' },
    { id: 11, user: 'Admin', action: 'Volunteer Registered', target: 'NED University Drive', module: 'Camps', time: '2026-02-22 12:00', type: 'update' },
    { id: 12, user: 'Admin', action: 'Donor Added', target: 'Usman Raza (O+)', module: 'Donors', time: '2026-02-21 09:30', type: 'create' },
    { id: 13, user: 'Admin', action: 'Appointment Set', target: 'Ahmed Khan - Mar 16', module: 'Donors', time: '2026-02-20 14:00', type: 'create' },
    { id: 14, user: 'Admin', action: 'Request Added', target: 'REQ-008 - O+ × 3 (Critical)', module: 'Requests', time: '2026-02-20 10:45', type: 'create' },
    { id: 15, user: 'Admin', action: 'Units Discarded', target: 'O- × 1 - Haemolysed', module: 'Wastage', time: '2026-02-20 09:15', type: 'delete' },
];

let nextAId = 16;
export function addAuditEntry(action, target, module_) {
    const entry = { id: nextAId++, user: 'Admin', action, target, module: module_, time: new Date().toISOString().slice(0, 16).replace('T', ' '), type: 'update' };
    AUDIT_LOG = [entry, ...AUDIT_LOG];
    return entry;
}

const ACTION_COLORS = { create: 'var(--green)', update: 'var(--blue)', delete: 'var(--red)' };
const ACTION_BG = { create: 'var(--green-bg)', update: 'var(--blue-bg)', delete: 'var(--red-bg)' };
const MODULES = ['All', 'Donors', 'Requests', 'Camps', 'Wastage', 'Thalassemia', 'TTI'];
const TYPES = ['All', 'create', 'update', 'delete'];

export default function AuditLogPage() {
    const [log] = useState(AUDIT_LOG);
    const [module, setModule] = useState('All');
    const [type, setType] = useState('All');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const filtered = log.filter(e =>
        (module === 'All' || e.module === module) &&
        (type === 'All' || e.type === type) &&
        (search === '' || e.action.toLowerCase().includes(search.toLowerCase()) || e.target.toLowerCase().includes(search.toLowerCase()))
    );
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const counts = { create: log.filter(e => e.type === 'create').length, update: log.filter(e => e.type === 'update').length, delete: log.filter(e => e.type === 'delete').length };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div className="anim-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Audit Log</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Complete tamper-evident trail of all system actions - AABB/WHO compliant</p>
                </div>
                <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'var(--green-bg)', border: '1px solid var(--green)', fontSize: '13px', color: 'var(--green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icons.Check size={14} /> Audit trail active
                </div>
            </div>

            {/* Stat chips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '14px' }}>
                {[
                    { label: 'Total Events', value: log.length, color: 'var(--text-primary)' },
                    { label: 'Created', value: counts.create, color: 'var(--green)' },
                    { label: 'Updated', value: counts.update, color: 'var(--blue)' },
                    { label: 'Deleted', value: counts.delete, color: 'var(--red)' },
                    { label: 'Modules', value: MODULES.length - 1, color: 'var(--orange)' },
                ].map((s, i) => (
                    <div key={i} className="card-hover anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '18px 20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: `${i * 50}ms` }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{s.label}</p>
                        <p style={{ fontSize: '30px', fontWeight: 800, color: s.color }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="anim-fade-up" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', animationDelay: '100ms' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }} role="search">
                    <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input placeholder="Search action or target…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                        style={{ width: '100%', padding: '9px 13px 9px 35px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', outline: 'none', background: 'var(--bg-card)', color: 'var(--text-primary)', fontFamily: 'Inter,sans-serif' }} />
                </div>
                <select value={module} onChange={e => { setModule(e.target.value); setPage(1); }}
                    style={{ padding: '9px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', fontWeight: 600, background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                    {MODULES.map(m => <option key={m}>{m}</option>)}
                </select>
                <select value={type} onChange={e => { setType(e.target.value); setPage(1); }}
                    style={{ padding: '9px 14px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', fontWeight: 600, background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                    {TYPES.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
                <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500 }}>{filtered.length} events</span>
            </div>

            {/* Log table */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', animationDelay: '150ms' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-hover)', borderBottom: '1px solid var(--border)' }}>
                                {['Time', 'User', 'Action', 'Target / Detail', 'Module', 'Type'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '12px 18px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map((e, i) => (
                                <tr key={e.id} className="anim-fade-up" style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s', animationDelay: `${i * 30}ms` }}
                                    onMouseEnter={ev => ev.currentTarget.style.background = 'var(--bg-hover)'}
                                    onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{e.time}</td>
                                    <td style={{ padding: '12px 18px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                            <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'linear-gradient(135deg,#FF6961,#FF3B30)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 800 }}>A</div>
                                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{e.user}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 18px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{e.action}</td>
                                    <td style={{ padding: '12px 18px', fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '280px' }}>{e.target}</td>
                                    <td style={{ padding: '12px 18px' }}>
                                        <span style={{ padding: '3px 9px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}>{e.module}</span>
                                    </td>
                                    <td style={{ padding: '12px 18px' }}>
                                        <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: ACTION_BG[e.type], color: ACTION_COLORS[e.type] }}>
                                            {e.type === 'create' ? '+ Created' : e.type === 'update' ? '~ Updated' : '× Deleted'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {paged.length === 0 && (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', fontSize: '14px', color: 'var(--text-tertiary)' }}>No matching events</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-hover)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        Page {page} of {totalPages} · {filtered.length} events
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {[...Array(totalPages)].map((_, pi) => (
                            <button key={pi} onClick={() => setPage(pi + 1)}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '8px', border: '1.5px solid', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s',
                                    background: page === pi + 1 ? 'var(--red)' : 'transparent',
                                    borderColor: page === pi + 1 ? 'var(--red)' : 'var(--border)',
                                    color: page === pi + 1 ? '#fff' : 'var(--text-secondary)',
                                }}>
                                {pi + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
