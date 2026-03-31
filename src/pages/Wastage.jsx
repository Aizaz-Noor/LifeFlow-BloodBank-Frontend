import { useState } from 'react';
import { BLOOD_GROUPS } from '../lib/data';
import { Icons } from '../lib/icons';

/* --- shared wastage store --- */
export let WASTAGE_LOG = [
    { id: 'W-001', bloodGroup: 'AB-', units: 3, reason: 'Expired', date: '2026-02-24', notes: 'Batch from Feb 3 expired today' },
    { id: 'W-002', bloodGroup: 'B-', units: 2, reason: 'Contaminated', date: '2026-02-22', notes: 'Failed sterility check' },
    { id: 'W-003', bloodGroup: 'O-', units: 1, reason: 'Haemolysed', date: '2026-02-20', notes: 'Temperature excursion during storage' },
    { id: 'W-004', bloodGroup: 'A+', units: 2, reason: 'Expired', date: '2026-02-17', notes: '' },
    { id: 'W-005', bloodGroup: 'O+', units: 1, reason: 'Damaged', date: '2026-02-15', notes: 'Bag seal broken during transport' },
    { id: 'W-006', bloodGroup: 'B+', units: 3, reason: 'Expired', date: '2026-02-10', notes: '' },
    { id: 'W-007', bloodGroup: 'A-', units: 2, reason: 'Expired', date: '2026-02-06', notes: 'Pre-Ramadan low-demand period' },
];
let nextWId = 8;
export function addWastageEntry(entry) {
    const w = { ...entry, id: `W-00${nextWId++}` };
    WASTAGE_LOG = [...WASTAGE_LOG, w];
    return w;
}

const REASONS = ['Expired', 'Contaminated', 'Haemolysed', 'Damaged', 'Over-collection', 'Other'];
const REASON_COLOR = { Expired: 'var(--red)', Contaminated: 'var(--red)', Haemolysed: 'var(--orange)', Damaged: 'var(--orange)', 'Over-collection': 'var(--text-tertiary)', Other: 'var(--text-tertiary)' };

const LBL = { fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px', display: 'block' };
const FIELD = { width: '100%', padding: '10px 13px', fontSize: '14px', border: '1.5px solid var(--border)', borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)', transition: 'all 0.15s', outline: 'none', fontFamily: 'Inter,sans-serif' };

function DiscardModal({ onClose, onSaved }) {
    const [form, setForm] = useState({ bloodGroup: 'O-', units: '', reason: 'Expired', notes: '', date: '2026-02-24' });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = {};
        if (!form.units || form.units < 1) e.units = 'Enter valid unit count';
        if (Object.keys(e).length) { setErrors(e); return; }
        setSaving(true);
        setTimeout(() => {
            const entry = addWastageEntry({ bloodGroup: form.bloodGroup, units: Number(form.units), reason: form.reason, date: form.date, notes: form.notes });
            setSaving(false);
            onSaved(entry);
            onClose();
        }, 600);
    };

    const onF = e => { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; };
    const onB = e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={e => e.target === e.currentTarget && onClose()}>
            <div role="dialog" aria-labelledby="modal-title" style={{ background: 'var(--bg-card)', borderRadius: '20px', width: '100%', maxWidth: '480px', boxShadow: 'var(--shadow-lg)', animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '22px 26px 16px', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <h2 id="modal-title" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Log Discarded Units</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>Record blood units removed from inventory</p>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'var(--bg-hover)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>×</button>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: '20px 26px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={LBL}>Blood Group</label>
                            <select value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)} style={{ ...FIELD, cursor: 'pointer' }} onFocus={onF} onBlur={onB}>
                                {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={LBL}>Units <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input type="number" min="1" value={form.units} onChange={e => set('units', e.target.value)}
                                placeholder="e.g. 2"
                                style={{ ...FIELD, ...(errors.units ? { borderColor: 'var(--red)' } : {}) }} onFocus={onF} onBlur={onB} />
                            {errors.units && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}><Icons.Alert size={14} /> {errors.units}</p>}
                        </div>
                        <div>
                            <label style={LBL}>Date</label>
                            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={FIELD} onFocus={onF} onBlur={onB} />
                        </div>
                    </div>
                    <div>
                        <label style={LBL}>Reason for Discard</label>
                        <select value={form.reason} onChange={e => set('reason', e.target.value)} style={{ ...FIELD, cursor: 'pointer' }} onFocus={onF} onBlur={onB}>
                            {REASONS.map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={LBL}>Notes (optional)</label>
                        <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2} placeholder="Any additional details..."
                            style={{ ...FIELD, resize: 'vertical', lineHeight: 1.5 }} onFocus={onF} onBlur={onB} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'transparent', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Cancel</button>
                        <button type="submit" disabled={saving} style={{ padding: '10px 26px', borderRadius: '10px', border: 'none', background: saving ? 'var(--text-tertiary)' : 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: saving ? 'none' : '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s' }}>
                            {saving ? 'Logging…' : 'Log Discard'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function WastagePage() {
    const [log, setLog] = useState(WASTAGE_LOG);
    const [showModal, setShowModal] = useState(false);
    const [filterGroup, setFilterGroup] = useState('All');
    const [filterReason, setFilterReason] = useState('All');
    const [hoveredBar, setHoveredBar] = useState(null);

    const filtered = log.filter(w =>
        (filterGroup === 'All' || w.bloodGroup === filterGroup) &&
        (filterReason === 'All' || w.reason === filterReason)
    );
    const totalUnitsLost = log.reduce((s, w) => s + w.units, 0);
    const byReason = REASONS.map(r => ({ reason: r, units: log.filter(w => w.reason === r).reduce((s, w) => s + w.units, 0) })).filter(r => r.units > 0);
    const maxR = Math.max(...byReason.map(r => r.units), 1);
    const byGroup = BLOOD_GROUPS.map(g => ({ g, units: log.filter(w => w.bloodGroup === g).reduce((s, w) => s + w.units, 0) }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {showModal && <DiscardModal onClose={() => setShowModal(false)} onSaved={e => setLog(prev => [...prev, e])} />}

            {/* Header */}
            <div className="anim-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Blood Wastage Tracker</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>WHO-mandated discard log - all expired, damaged, or contaminated units</p>
                </div>
                <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                    + Log Discard
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px' }}>
                {[
                    { label: 'Total Units Lost', value: totalUnitsLost, color: '#FF3B30' },
                    { label: 'Incidents', value: log.length, color: '#1D1D1F' },
                    { label: 'Expired', value: log.filter(w => w.reason === 'Expired').reduce((s, w) => s + w.units, 0), color: '#FF3B30' },
                    { label: 'Contaminated', value: log.filter(w => w.reason === 'Contaminated').reduce((s, w) => s + w.units, 0), color: '#FF9500' },
                    { label: 'Damaged', value: log.filter(w => w.reason === 'Damaged').reduce((s, w) => s + w.units, 0), color: '#FF9500' },
                ].map((s, i) => (
                    <div key={i} className="card-hover anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '18px 20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: `${i * 55}ms` }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{s.label}</p>
                        <p style={{ fontSize: '30px', fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* By Reason Bar */}
                <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', animationDelay: '120ms' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>Units Lost by Reason</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {byReason.map((r, i) => (
                            <div key={r.reason} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                                onMouseEnter={() => setHoveredBar(r.reason)} onMouseLeave={() => setHoveredBar(null)}>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#6E6E73', width: '100px', flexShrink: 0 }}>{r.reason}</span>
                                <div style={{ flex: 1, height: '10px', background: '#F5F5F7', borderRadius: '99px', overflow: 'hidden' }}>
                                    <div className="anim-bar-grow" style={{ height: '100%', width: `${(r.units / maxR) * 100}%`, background: REASON_COLOR[r.reason] || '#FF3B30', borderRadius: '99px', transition: 'all 0.15s', animationDelay: `${i * 80 + 200}ms` }} />
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: REASON_COLOR[r.reason] || '#FF3B30', width: '30px', textAlign: 'right' }}>{r.units}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* By Blood Group */}
                <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', animationDelay: '180ms' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>Units Lost by Blood Group</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
                        {byGroup.map(({ g, units }) => (
                            <div key={g} style={{ textAlign: 'center', padding: '12px 6px', borderRadius: '12px', background: units > 0 ? '#FFF1F0' : '#FAFAFA', border: `1px solid ${units > 0 ? '#FFBBB8' : '#F5F5F7'}` }}>
                                <p style={{ fontSize: '13px', fontWeight: 800, color: units > 0 ? '#FF3B30' : '#AEAEB2' }}>{g}</p>
                                <p style={{ fontSize: '20px', fontWeight: 800, color: units > 0 ? '#FF3B30' : '#E8E8ED', marginTop: '4px' }}>{units}</p>
                                <p style={{ fontSize: '10px', color: '#AEAEB2', fontWeight: 500, marginTop: '2px' }}>units</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="anim-fade-up" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animationDelay: '200ms' }}>
                <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)}
                    style={{ padding: '9px 14px', border: '1.5px solid #E8E8ED', borderRadius: '10px', fontSize: '13px', fontWeight: 600, background: '#fff', color: '#1D1D1F', cursor: 'pointer', outline: 'none' }}>
                    <option value="All">All Blood Groups</option>
                    {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
                </select>
                <select value={filterReason} onChange={e => setFilterReason(e.target.value)}
                    style={{ padding: '9px 14px', border: '1.5px solid #E8E8ED', borderRadius: '10px', fontSize: '13px', fontWeight: 600, background: '#fff', color: '#1D1D1F', cursor: 'pointer', outline: 'none' }}>
                    <option value="All">All Reasons</option>
                    {REASONS.map(r => <option key={r}>{r}</option>)}
                </select>
                <span style={{ fontSize: '13px', color: '#AEAEB2', fontWeight: 500, alignSelf: 'center' }}>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Log Table */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', animationDelay: '250ms' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#FAFAFA', borderBottom: '1px solid #F5F5F7' }}>
                                {['ID', 'Date', 'Blood Group', 'Units', 'Reason', 'Notes'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '12px 18px', fontSize: '11px', fontWeight: 700, color: '#AEAEB2', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((w, i) => (
                                <tr key={w.id} className="anim-fade-up" style={{ borderBottom: '1px solid #F5F5F7', transition: 'background 0.12s', animationDelay: `${i * 35}ms` }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '13px 18px', fontSize: '12px', fontWeight: 700, color: '#AEAEB2', fontFamily: 'monospace' }}>{w.id}</td>
                                    <td style={{ padding: '13px 18px', fontSize: '13px', color: '#6E6E73' }}>{w.date}</td>
                                    <td style={{ padding: '13px 18px' }}>
                                        <span style={{ padding: '3px 9px', borderRadius: '99px', background: 'var(--red-bg)', color: '#FF3B30', fontSize: '12px', fontWeight: 700 }}>{w.bloodGroup}</span>
                                    </td>
                                    <td style={{ padding: '13px 18px', fontSize: '15px', fontWeight: 800, color: '#FF3B30' }}>{w.units}</td>
                                    <td style={{ padding: '13px 18px' }}>
                                        <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: ['Expired', 'Contaminated'].includes(w.reason) ? '#FFF1F0' : '#FFF8EE', color: REASON_COLOR[w.reason] || '#6E6E73' }}>
                                            {w.reason}
                                        </span>
                                    </td>
                                    <td style={{ padding: '13px 18px', fontSize: '13px', color: '#6E6E73' }}>{w.notes || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '11px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-hover)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    {filtered.length} records · Total {filtered.reduce((s, w) => s + w.units, 0)} units discarded · WHO mandates full discard audit trails
                </div>
            </div>
        </div>
    );
}
