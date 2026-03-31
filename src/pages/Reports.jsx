import { useState } from 'react';
import { MONTHLY_DONATIONS, BLOOD_INVENTORY, DONORS } from '../lib/data';
import { Icons } from '../lib/icons';

/* ─── CSV Export helper ─── */
function exportCSV(filename, headers, rows) {
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

function ExportBtn({ label, onClick }) {
    return (
        <button onClick={onClick} aria-label={`Export ${label}`}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1.5px solid var(--border)', background: 'var(--bg-card)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.borderColor = 'var(--text-tertiary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            {label}
        </button>
    );
}

export default function ReportsPage() {
    const [hoveredBar, setHoveredBar] = useState(null);
    const maxVal = Math.max(...MONTHLY_DONATIONS.map(d => d.donations));
    const totalDonations = MONTHLY_DONATIONS.reduce((s, d) => s + d.donations, 0);
    const avg = Math.round(totalDonations / MONTHLY_DONATIONS.length);
    const best = MONTHLY_DONATIONS.reduce((b, d) => d.donations > b.donations ? d : b);
    const activeDonors = DONORS.filter(d => d.status === 'Active').length;

    const stats = [
        { label: 'Total Donations', value: totalDonations.toLocaleString(), color: 'var(--text-primary)' },
        { label: 'Monthly Average', value: avg, color: 'var(--text-primary)' },
        { label: 'Peak Month', value: `${best.month} (${best.donations})`, color: 'var(--text-primary)' },
        { label: 'Active Donors', value: activeDonors, color: 'var(--text-primary)' },
    ];

    const handleExportDonations = () => exportCSV(
        'monthly-donations.csv',
        ['Month', 'Donations'],
        MONTHLY_DONATIONS.map(d => [d.month, d.donations])
    );

    const handleExportInventory = () => exportCSV(
        'blood-inventory.csv',
        ['Blood Group', 'Units', 'Capacity', 'Pct (%)', 'Expiry Date'],
        BLOOD_INVENTORY.map(b => [b.group, b.units, b.capacity, Math.round((b.units / b.capacity) * 100), b.expiryDate])
    );

    const handleExportDonors = () => exportCSV(
        'donors.csv',
        ['Name', 'Blood Group', 'Phone', 'City', 'Gender', 'Age', 'Status', 'Last Donation'],
        DONORS.map(d => [d.name, d.bloodGroup, d.phone, d.city, d.gender || '', d.age || '', d.status, d.lastDonation])
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Reports & Analytics</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Performance insights and CSV exports</p>
                </div>
                {/* Export buttons group */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <ExportBtn label="Donations CSV" onClick={handleExportDonations} />
                    <ExportBtn label="Inventory CSV" onClick={handleExportInventory} />
                    <ExportBtn label="Donors CSV" onClick={handleExportDonors} />
                </div>
            </div>

            {/* Summary strips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
                {stats.map((s, i) => (
                    <div key={i} className="card-hover anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '20px 22px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: `${i * 60}ms` }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{s.label}</p>
                        <p style={{ fontSize: '28px', fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Bar Chart + Rings */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Bar Chart */}
                <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '28px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: '200ms' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                        <div>
                            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>Monthly Donations</h2>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>Sep 2025 – Feb 2026</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <ExportBtn label="Export" onClick={handleExportDonations} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '180px' }}>
                        {MONTHLY_DONATIONS.map((d, i) => {
                            const h = Math.round((d.donations / maxVal) * 140);
                            const isHov = hoveredBar === i;
                            return (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}
                                    onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: isHov ? 'var(--red)' : 'var(--text-tertiary)', transition: 'color 0.15s', minHeight: '18px' }}>{isHov ? d.donations : ''}</span>
                                    <div className="anim-bar-grow" style={{ width: '100%', maxWidth: '44px', height: h + 'px', borderRadius: '6px 6px 0 0', background: isHov ? 'linear-gradient(180deg,var(--red),#C0392B)' : 'linear-gradient(180deg,#FFB3AF,var(--red))', transition: 'background 0.15s', cursor: 'pointer', animationDelay: `${i * 80 + 300}ms` }} />
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: isHov ? 'var(--text-primary)' : 'var(--text-tertiary)', transition: 'color 0.15s', whiteSpace: 'nowrap' }}>{d.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Blood Type Rings */}
                <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '28px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: '280ms' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
                        <div>
                            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>Blood Type Distribution</h2>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>Stock levels per blood group</p>
                        </div>
                        <ExportBtn label="Export" onClick={handleExportInventory} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px' }}>
                        {BLOOD_INVENTORY.map((b, i) => {
                            const pct = Math.round((b.units / b.capacity) * 100);
                            const ringColor = pct > 50 ? 'var(--green)' : pct > 20 ? 'var(--orange)' : 'var(--red)';
                            const circumference = 2 * Math.PI * 20;
                            const offset = circumference - (pct / 100) * circumference;
                            return (
                                <div key={b.group} className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animationDelay: `${i * 60 + 400}ms`, cursor: 'default' }}>
                                    <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                                        <svg viewBox="0 0 52 52" width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
                                            <circle cx="26" cy="26" r="20" fill="none" stroke="var(--bg-hover)" strokeWidth="4" />
                                            <circle cx="26" cy="26" r="20" fill="none" stroke={ringColor} strokeWidth="4"
                                                strokeDasharray={`${circumference}`} strokeDashoffset={offset}
                                                strokeLinecap="round" className="anim-ring-grow" style={{ animationDelay: `${i * 80 + 500}ms` }} />
                                        </svg>
                                        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>{pct}%</span>
                                    </div>
                                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{b.group}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>{b.units} units</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Donor Summary Table */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', animationDelay: '360ms' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>Donors by Blood Group</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>Distribution of registered donors</p>
                    </div>
                    <ExportBtn label="Export Donors" onClick={handleExportDonors} />
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-hover)' }}>
                                {['Blood Group', 'Total Donors', 'Active', 'Inactive', 'Active Rate', 'Stock Left'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {BLOOD_INVENTORY.map((b, i) => {
                                const groupDonors = DONORS.filter(d => d.bloodGroup === b.group);
                                const active = groupDonors.filter(d => d.status === 'Active').length;
                                const rate = groupDonors.length ? Math.round((active / groupDonors.length) * 100) : 0;
                                return (
                                    <tr key={b.group} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '14px 20px' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 10px', borderRadius: '99px', background: 'var(--red-bg)', color: 'var(--red)', fontSize: '13px', fontWeight: 700 }}>
                                                <Icons.Drop size={14} /> {b.group}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{groupDonors.length}</td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--green)' }}>{active}</td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--text-tertiary)' }}>{groupDonors.length - active}</td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ flex: 1, height: '6px', background: 'var(--bg-hover)', borderRadius: '99px', overflow: 'hidden', minWidth: '60px' }}>
                                                    <div style={{ height: '100%', width: `${rate}%`, background: rate > 60 ? 'var(--green)' : 'var(--orange)', borderRadius: '99px' }} />
                                                </div>
                                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', flexShrink: 0 }}>{rate}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 600, color: b.units <= 10 ? 'var(--red)' : 'var(--text-primary)' }}>{b.units} units</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
