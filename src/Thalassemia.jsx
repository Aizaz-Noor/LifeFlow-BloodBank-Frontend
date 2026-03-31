import { useState } from 'react';
import { THALASSEMIA_PATIENTS, BLOOD_GROUPS, PK_CITIES, addThalPatient } from './data';

const LBL = { fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px', display: 'block' };
const FIELD = { width: '100%', padding: '10px 13px', fontSize: '14px', border: '1.5px solid var(--border)', borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)', transition: 'all 0.15s', outline: 'none', fontFamily: 'Inter, sans-serif' };
const FREQUENCIES = ['Every 2 weeks', 'Every 3 weeks', 'Monthly', 'Every 6 weeks'];
import { Icons } from './icons';

function daysBetween(a, b) {
    return Math.ceil((new Date(b) - new Date(a)) / 86400000);
}
function daysUntilDue(nextDue) {
    return daysBetween('2026-02-24', nextDue);
}

function AddPatientModal({ onClose, onAdded }) {
    const [form, setForm] = useState({ name: '', age: '', bloodGroup: 'B+', city: 'Karachi', guardian: '', phone: '', frequency: 'Monthly', lastTransfusion: '2026-02-01', nextDue: '2026-03-01' });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Patient name required';
        if (!form.age || form.age < 1 || form.age > 99) e.age = 'Age must be 1–99';
        if (!form.guardian.trim()) e.guardian = 'Guardian name required';
        if (!/^0\d{3}-\d{7}$/.test(form.phone)) e.phone = 'Format: 0XXX-XXXXXXX';
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        setTimeout(() => {
            const pt = addThalPatient(form);
            setSaving(false);
            onAdded(pt);
            onClose();
        }, 700);
    };

    const onF = (e) => { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; };
    const onB = (e, k) => { if (!errors[k]) { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; } };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={e => e.target === e.currentTarget && onClose()}>
            <div role="dialog" aria-labelledby="modal-title" style={{ background: 'var(--bg-card)', borderRadius: '20px', width: '100%', maxWidth: '540px', boxShadow: 'var(--shadow-lg)', animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 28px 18px', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <h2 id="modal-title" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Register Thalassemia Patient</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>For recurring transfusion scheduling</p>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'var(--bg-hover)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>×</button>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={LBL}>Patient Name <span style={{ color: 'var(--red)' }}>*</span></label>
                        <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name"
                            style={{ ...FIELD, ...(errors.name ? { borderColor: 'var(--red)' } : {}) }} onFocus={onF} onBlur={e => onB(e, 'name')} />
                        {errors.name && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.name}</p>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={LBL}>Age <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input type="number" min={1} max={99} value={form.age} onChange={e => set('age', e.target.value)}
                                style={{ ...FIELD, ...(errors.age ? { borderColor: 'var(--red)' } : {}) }} onFocus={onF} onBlur={e => onB(e, 'age')} />
                            {errors.age && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.age}</p>}
                        </div>
                        <div>
                            <label style={LBL}>Blood Group</label>
                            <select value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)} style={{ ...FIELD, cursor: 'pointer' }}>
                                {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={LBL}>City</label>
                            <select value={form.city} onChange={e => set('city', e.target.value)} style={{ ...FIELD, cursor: 'pointer' }}>
                                {PK_CITIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={LBL}>Guardian Name <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input value={form.guardian} onChange={e => set('guardian', e.target.value)} placeholder="Parent / guardian"
                                style={{ ...FIELD, ...(errors.guardian ? { borderColor: 'var(--red)' } : {}) }} onFocus={onF} onBlur={e => onB(e, 'guardian')} />
                        </div>
                        <div>
                            <label style={LBL}>Phone <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="0XXX-XXXXXXX"
                                style={{ ...FIELD, ...(errors.phone ? { borderColor: 'var(--red)' } : {}) }} onFocus={onF} onBlur={e => onB(e, 'phone')} />
                            {errors.phone && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.phone}</p>}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={LBL}>Frequency</label>
                            <select value={form.frequency} onChange={e => set('frequency', e.target.value)} style={{ ...FIELD, cursor: 'pointer' }}>
                                {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={LBL}>Last Transfusion</label>
                            <input type="date" value={form.lastTransfusion} onChange={e => set('lastTransfusion', e.target.value)} style={FIELD} onFocus={onF} onBlur={e => onB(e, '')} />
                        </div>
                        <div>
                            <label style={LBL}>Next Due Date</label>
                            <input type="date" value={form.nextDue} onChange={e => set('nextDue', e.target.value)} style={FIELD} onFocus={onF} onBlur={e => onB(e, '')} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 22px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'transparent', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Cancel</button>
                        <button type="submit" disabled={saving} style={{ padding: '10px 28px', borderRadius: '10px', border: 'none', background: saving ? 'var(--text-tertiary)' : 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: saving ? 'none' : '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s' }}>
                            {saving ? 'Registering…' : 'Register Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ThalassemiaPage() {
    const [patients, setPatients] = useState(THALASSEMIA_PATIENTS);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);

    const overdue = patients.filter(p => p.status === 'Overdue').length;
    const dueSoon = patients.filter(p => { const d = daysUntilDue(p.nextDue); return d >= 0 && d <= 5; }).length;

    const scheduleTransfusion = (patId) => {
        setPatients(prev => prev.map(p => p.id === patId ? {
            ...p,
            lastTransfusion: '2026-02-24',
            nextDue: p.frequency === 'Every 2 weeks' ? '2026-03-10' : p.frequency === 'Every 3 weeks' ? '2026-03-17' : p.frequency === 'Monthly' ? '2026-03-24' : '2026-04-07',
            totalUnitsLifetime: p.totalUnitsLifetime + 2,
            status: 'Active',
        } : p));
        setSelected(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {showModal && <AddPatientModal onClose={() => setShowModal(false)} onAdded={p => setPatients(prev => [...prev, p])} />}

            {/* Drawer */}
            {selected && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                    onClick={e => e.target === e.currentTarget && setSelected(null)}>
                    <div style={{ background: 'var(--bg-sidebar)', width: '380px', height: '100vh', padding: '28px', overflowY: 'auto', boxShadow: 'var(--shadow-lg)', animation: 'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) both', borderLeft: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Patient Detail</h3>
                            <button onClick={() => setSelected(null)} aria-label="Close drawer" style={{ width: '32px', height: '32px', border: 'none', background: 'var(--bg-hover)', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', color: 'var(--text-secondary)' }}>×</button>
                        </div>
                        {/* Patient card */}
                        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '20px', border: '1px solid var(--border)' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg,#FF6961,#FF3B30)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '22px', fontWeight: 800, margin: '0 auto 12px' }}>
                                {selected.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>{selected.name}</h4>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{selected.id} · {selected.bloodGroup} · Age {selected.age}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{selected.city}</p>
                        </div>
                        {[
                            ['Guardian', selected.guardian],
                            ['Phone', selected.phone],
                            ['Transfusion Frequency', selected.frequency],
                            ['Last Transfusion', selected.lastTransfusion],
                            ['Next Due', selected.nextDue],
                            ['Lifetime Units', `${selected.totalUnitsLifetime} units`],
                        ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{k}</span>
                                <span style={{ fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right' }}>{v}</span>
                            </div>
                        ))}
                        {/* Status */}
                        <div style={{ marginTop: '16px', padding: '14px', borderRadius: '12px', background: selected.status === 'Overdue' ? 'var(--red-bg)' : 'var(--green-bg)', border: `1px solid ${selected.status === 'Overdue' ? 'var(--red)' : 'var(--green)'}` }}>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: selected.status === 'Overdue' ? 'var(--red)' : 'var(--green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Icons.Alert size={16} /> {selected.status === 'Overdue' ? 'Transfusion Overdue' : `Next due in ${daysUntilDue(selected.nextDue)} days`}
                            </p>
                        </div>
                        {/* Mark transfusion done */}
                        {selected.status === 'Overdue' && (
                            <button onClick={() => scheduleTransfusion(selected.id)} style={{ marginTop: '16px', width: '100%', padding: '11px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', borderRadius: '10px', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Icons.Check size={16} /> Mark Transfusion Done
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Thalassemia Patients</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Recurring transfusion management - Pakistan has 100,000+ patients</p>
                </div>
                <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                    + Register Patient
                </button>
            </div>

            {/* Alert banners */}
            {(overdue > 0 || dueSoon > 0) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {overdue > 0 && (
                        <div role="alert" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 18px', borderRadius: '12px', background: 'var(--red-bg)', border: '1px solid var(--red)' }}>
                            <span style={{ color: 'var(--red)' }}><Icons.Alert size={18} /></span>
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--red)' }}>{overdue} Patient{overdue > 1 ? 's' : ''} Overdue for Transfusion</p>
                                <p style={{ fontSize: '13px', color: 'var(--red)', opacity: 0.8, marginTop: '2px' }}>{patients.filter(p => p.status === 'Overdue').map(p => p.name).join(', ')} - please schedule immediately</p>
                            </div>
                        </div>
                    )}
                    {dueSoon > 0 && (
                        <div role="alert" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 18px', borderRadius: '12px', background: 'var(--orange-bg)', border: '1px solid var(--orange)' }}>
                            <span style={{ color: 'var(--orange)' }}><Icons.Alert size={18} /></span>
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--orange)' }}>{dueSoon} Patient{dueSoon > 1 ? 's' : ''} Due Within 5 Days</p>
                                <p style={{ fontSize: '13px', color: 'var(--orange)', opacity: 0.9, marginTop: '2px' }}>Ensure blood availability before the scheduled date</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '14px' }}>
                {[
                    { label: 'Total Patients', value: patients.length, color: 'var(--text-primary)' },
                    { label: 'Overdue', value: overdue, color: 'var(--red)' },
                    { label: 'Due ≤ 5 Days', value: dueSoon, color: 'var(--orange)' },
                    { label: 'Active', value: patients.filter(p => p.status === 'Active').length, color: 'var(--green)' },
                    { label: 'Total Units Given', value: patients.reduce((s, p) => s + p.totalUnitsLifetime, 0), color: 'var(--blue)' },
                ].map((s, i) => (
                    <div key={i} className="card-hover anim-fade-up" style={{
                        background: 'var(--bg-card)', borderRadius: '14px', padding: '18px 20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: `${i * 55}ms`
                    }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{s.label}</p>
                        <p style={{ fontSize: '30px', fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Patient table */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', animationDelay: '200ms' }}>
                <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Patient Schedule</h2>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>Click a row to view full profile and mark transfusion done</p>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-hover)', borderBottom: '1px solid var(--border)' }}>
                                {['Patient', 'Blood', 'City', 'Frequency', 'Last Transfusion', 'Next Due', 'Lifetime Units', 'Status'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '12px 18px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p, i) => {
                                const daysLeft = daysUntilDue(p.nextDue);
                                const isOverdue = p.status === 'Overdue';
                                const isDueSoon = daysLeft >= 0 && daysLeft <= 5;
                                return (
                                    <tr key={p.id} className="anim-fade-up" style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.12s', animationDelay: `${i * 40}ms`, background: isOverdue ? 'var(--red-bg)' : 'transparent' }}
                                        onClick={() => setSelected(p)}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={e => e.currentTarget.style.background = isOverdue ? 'var(--red-bg)' : 'transparent'}>
                                        <td style={{ padding: '14px 18px' }}>
                                            <div>
                                                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</p>
                                                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{p.id} · Age {p.age}</p>
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <span style={{ padding: '3px 9px', borderRadius: '99px', background: 'var(--red-bg)', color: 'var(--red)', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                                                <Icons.Drop /> {p.bloodGroup}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 18px', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.city}</td>
                                        <td style={{ padding: '14px 18px', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.frequency}</td>
                                        <td style={{ padding: '14px 18px', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.lastTransfusion}</td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <div>
                                                <p style={{ fontSize: '13px', color: isOverdue ? 'var(--red)' : isDueSoon ? 'var(--orange)' : 'var(--text-primary)', fontWeight: isOverdue || isDueSoon ? 700 : 400 }}>{p.nextDue}</p>
                                                <p style={{ fontSize: '11px', marginTop: '2px', color: isOverdue ? 'var(--red)' : 'var(--text-tertiary)' }}>
                                                    {isOverdue ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`}
                                                </p>
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 18px', fontSize: '14px', fontWeight: 700, color: 'var(--blue)' }}>{p.totalUnitsLifetime}</td>
                                        <td style={{ padding: '14px 18px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: isOverdue ? 'var(--red-bg)' : 'var(--green-bg)', color: isOverdue ? 'var(--red)' : 'var(--green)' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isOverdue ? 'var(--red)' : 'var(--green)', display: 'inline-block', marginRight: '5px' }} />
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '11px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-hover)', fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                    {patients.length} registered patients · Click a row to schedule transfusion
                </div>
            </div>

            {/* Pakistan context banner */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 22px', display: 'flex', gap: '16px', alignItems: 'center', animationDelay: '350ms' }}>
                <Icons.Flag size={32} />
                <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--red)', marginBottom: '4px' }}>Pakistan Thalassemia Crisis</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Pakistan has <strong>100,000+ thalassemia major patients</strong> with <strong>5,000–9,000 new cases per year</strong> - one of the highest rates globally.
                        Each patient requires 2–4 units every 2–4 weeks for life. Rural patients in Balochistan and KPK often travel 100+ km for treatment.
                        High-risk factor: consanguineous marriages (cousin marriages) account for ~60% of Pakistani unions.
                    </p>
                </div>
            </div>
        </div>
    );
}
