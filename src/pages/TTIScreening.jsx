import { useState } from 'react';
import { DONORS } from '../lib/data';
import { Icons } from '../lib/icons';

const TTI_TESTS = [
    { key: 'hbv', label: 'Hepatitis B (HBV)', critical: true },
    { key: 'hcv', label: 'Hepatitis C (HCV)', critical: true },
    { key: 'hiv', label: 'HIV / AIDS', critical: true },
    { key: 'syphilis', label: 'Syphilis (VDRL)', critical: false },
    { key: 'malaria', label: 'Malaria (Antigen)', critical: false },
];

export default function TTIScreeningPage() {
    const [donors, setDonors] = useState(DONORS);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All'); // All | Cleared | Flagged | Incomplete
    const [searchFocus, setSearchFocus] = useState(false);

    const getStatus = (tti) => {
        if (!tti) return 'incomplete';
        const vals = Object.values(tti);
        if (vals.every(v => v === true)) return 'cleared';
        if (vals.some(v => v === false)) return 'flagged';
        return 'incomplete';
    };

    const toggleTTI = (donorId, testKey) => {
        setDonors(prev => prev.map(d =>
            d.id === donorId
                ? { ...d, tti: { ...d.tti, [testKey]: !d.tti[testKey] } }
                : d
        ));
    };

    const filtered = donors
        .filter(d => {
            const q = search.toLowerCase();
            const matchSearch = d.name.toLowerCase().includes(q) || d.bloodGroup.includes(q) || d.city.toLowerCase().includes(q);
            const st = getStatus(d.tti);
            const matchFilter = filter === 'All' || filter.toLowerCase() === st;
            return matchSearch && matchFilter;
        });

    const counts = {
        All: donors.length,
        Cleared: donors.filter(d => getStatus(d.tti) === 'cleared').length,
        Flagged: donors.filter(d => getStatus(d.tti) === 'flagged').length,
        Incomplete: donors.filter(d => getStatus(d.tti) === 'incomplete').length,
    };

    const flaggedDonors = donors.filter(d => getStatus(d.tti) === 'flagged');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>TTI Screening</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Transfusion-Transmitted Infection checks - HBV, HCV, HIV, Syphilis, Malaria</p>
                </div>
                {/* WHO context chip */}
                <div style={{ padding: '8px 14px', borderRadius: '10px', background: 'var(--blue-bg)', border: '1px solid var(--blue)', fontSize: '13px', color: 'var(--blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icons.Flag size={16} /> WHO: Pakistan HCV prevalence ~5% in general population
                </div>
            </div>

            {/* Flagged alert */}
            {flaggedDonors.length > 0 && (
                <div role="alert" className="anim-fade-up" style={{ padding: '14px 18px', borderRadius: '12px', background: 'var(--red-bg)', border: '1px solid var(--red)', display: 'flex', gap: '12px', alignItems: 'flex-start', animationDelay: '40ms' }}>
                    <span style={{ color: 'var(--red)' }}><Icons.Alert size={20} /></span>
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--red)' }}>{flaggedDonors.length} Donor{flaggedDonors.length > 1 ? 's' : ''} Flagged - Failed TTI Screening</p>
                        <p style={{ fontSize: '13px', color: 'var(--red)', opacity: 0.8, marginTop: '3px' }}>
                            {flaggedDonors.map(d => `${d.name} (${d.bloodGroup})`).join(' · ')} - blood units from these donors must be quarantined
                        </p>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '14px' }}>
                {[
                    { label: 'Total Screened', value: counts.All, color: 'var(--text-primary)' },
                    { label: 'Cleared', value: counts.Cleared, color: 'var(--green)' },
                    { label: 'Flagged', value: counts.Flagged, color: 'var(--red)' },
                    { label: 'Incomplete', value: counts.Incomplete, color: 'var(--orange)' },
                    { label: 'Clear Rate', value: `${Math.round((counts.Cleared / counts.All) * 100)}%`, color: 'var(--blue)' },
                ].map((s, i) => (
                    <div key={i} className="card-hover anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '18px 20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)', animationDelay: `${i * 55}ms` }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{s.label}</p>
                        <p style={{ fontSize: '30px', fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="anim-fade-up" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animationDelay: '100ms' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                    <div style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: searchFocus ? 'var(--red)' : 'var(--text-tertiary)' }}>
                        <Icons.Search size={15} />
                    </div>
                    <input type="text" placeholder="Search donor…" value={search} onChange={e => setSearch(e.target.value)}
                        onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}
                        style={{ width: '100%', padding: '10px 14px 10px 38px', fontSize: '14px', border: `1.5px solid ${searchFocus ? 'var(--red)' : 'var(--border)'}`, borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)', outline: 'none', boxShadow: searchFocus ? '0 0 0 3px var(--red-bg)' : 'none', transition: 'all 0.15s' }} />
                </div>
                <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-hover)', borderRadius: '12px', padding: '4px' }}>
                    {['All', 'Cleared', 'Flagged', 'Incomplete'].map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)}
                            style={{ padding: '7px 13px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: filter === tab ? 'var(--bg-card)' : 'transparent', color: filter === tab ? (tab === 'Flagged' ? 'var(--red)' : tab === 'Cleared' ? 'var(--green)' : 'var(--text-primary)') : 'var(--text-secondary)', boxShadow: filter === tab ? 'var(--shadow-xs)' : 'none' }}>
                            {tab} <span style={{ fontSize: '11px', marginLeft: '3px', color: 'var(--text-tertiary)' }}>{counts[tab]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', animationDelay: '150ms' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-hover)', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ textAlign: 'left', padding: '13px 20px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Donor</th>
                                <th style={{ textAlign: 'left', padding: '13px 20px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Type</th>
                                {TTI_TESTS.map(t => (
                                    <th key={t.key} style={{ textAlign: 'center', padding: '13px 14px', fontSize: '11px', fontWeight: 700, color: t.critical ? 'var(--red)' : 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                                        {t.label}
                                    </th>
                                ))}
                                <th style={{ textAlign: 'center', padding: '13px 14px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((d, i) => {
                                const st = getStatus(d.tti);
                                const stColor = st === 'cleared' ? 'var(--green)' : st === 'flagged' ? 'var(--red)' : 'var(--orange)';
                                const stBg = st === 'cleared' ? 'var(--green-bg)' : st === 'flagged' ? 'var(--red-bg)' : 'var(--orange-bg)';
                                const dtColor = { Voluntary: 'var(--green)', Replacement: 'var(--orange)', Paid: 'var(--red)' };
                                const dtBg = { Voluntary: 'var(--green-bg)', Replacement: 'var(--orange-bg)', Paid: 'var(--red-bg)' };
                                return (
                                    <tr key={d.id} className="anim-fade-up" style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s', background: st === 'flagged' ? 'var(--red-bg)' : 'transparent', animationDelay: `${i * 35}ms` }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={e => e.currentTarget.style.background = st === 'flagged' ? 'var(--red-bg)' : 'transparent'}>
                                        <td style={{ padding: '13px 20px' }}>
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{d.bloodGroup} · {d.city}</p>
                                        </td>
                                        <td style={{ padding: '13px 20px' }}>
                                            <span style={{ padding: '3px 9px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: dtBg[d.donorType] || 'var(--bg-hover)', color: dtColor[d.donorType] || 'var(--text-secondary)' }}>
                                                {d.donorType}
                                            </span>
                                        </td>
                                        {TTI_TESTS.map(t => {
                                            const passed = d.tti ? d.tti[t.key] : false;
                                            return (
                                                <td key={t.key} style={{ textAlign: 'center', padding: '13px 14px' }}>
                                                    <button title={`Toggle ${t.label} result: currently ${passed ? 'CLEARED' : 'FAILED'}`}
                                                        onClick={() => toggleTTI(d.id, t.key)}
                                                        style={{
                                                            width: '28px', height: '28px', borderRadius: '8px', border: '1.5px solid', cursor: 'pointer', fontSize: '14px', transition: 'all 0.15s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                            borderColor: passed ? 'var(--green)' : 'var(--red)',
                                                            background: passed ? 'var(--green-bg)' : 'var(--red-bg)',
                                                            color: passed ? 'var(--green)' : 'var(--red)',
                                                        }}>
                                                        {passed ? <Icons.Check size={14} /> : <Icons.Close size={14} />}
                                                    </button>
                                                </td>
                                            );
                                        })}
                                        <td style={{ textAlign: 'center', padding: '13px 14px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: stBg, color: stColor }}>
                                                {st === 'cleared' ? <><Icons.Check size={12} /> Cleared</> : st === 'flagged' ? <><Icons.Close size={12} /> Flagged</> : '… Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '11px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-hover)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    Showing {filtered.length} of {donors.length} donors · Click pass/fail buttons to toggle test result • Flagged donors' blood must be quarantined per WHO guidelines
                </div>
            </div>

            {/* Context box */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 22px', display: 'flex', gap: '16px', alignItems: 'flex-start', animationDelay: '300ms' }}>
                <span style={{ color: 'var(--blue)' }}><Icons.Microscope size={22} /></span>
                <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--blue)', marginBottom: '6px' }}>Why This Matters in Pakistan</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Pakistan has one of the world's highest <strong>Hepatitis C (HCV) prevalence rates (~5%)</strong> and significant <strong>Hepatitis B (HBV)</strong>.
                        Many blood banks still use rapid test kits rather than ELISA methods, creating false-negative risks.
                        <strong> Replacement donors</strong> (family members donating under pressure) are statistically 3.5× more likely to carry TTIs than voluntary donors.
                        Malaria screening is critical in Balochistan and KPK border areas.
                    </p>
                </div>
            </div>
        </div>
    );
}
