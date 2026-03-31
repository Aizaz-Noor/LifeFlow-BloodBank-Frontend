import { useState } from 'react';
import { BLOOD_GROUPS } from './data';
import { Icons } from './icons';

const HOSPITALS = [
    'Jinnah Hospital', 'Aga Khan University Hospital', 'Civil Hospital Karachi',
    'Liaquat National Hospital', 'Indus Hospital', 'Dow University Hospital',
    'Ziauddin Hospital', 'South City Hospital', 'National Medical Centre',
    'Liyaquat Medical College Hospital', 'Other',
];

const FIELD = {
    width: '100%', padding: '10px 13px', fontSize: '14px',
    border: '1.5px solid var(--border)', borderRadius: '10px',
    background: 'var(--bg-card)', color: 'var(--text-primary)',
    transition: 'all 0.15s', outline: 'none', fontFamily: 'Inter, sans-serif',
};
const LBL = { fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px', display: 'block' };

let nextReqId = 9;

export default function AddRequestModal({ onClose, onAdded }) {
    const [form, setForm] = useState({
        hospital: 'Jinnah Hospital', bloodGroup: 'O-', units: '2',
        urgency: 'Normal', patient: '', date: '2026-02-24',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

    const validate = () => {
        const e = {};
        if (!form.hospital.trim()) e.hospital = 'Hospital name is required';
        if (!form.units || form.units < 1 || form.units > 50) e.units = 'Units must be 1–50';
        if (!form.patient.trim()) e.patient = 'Ward / patient info is required';
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        setTimeout(() => {
            const newReq = {
                id: `REQ-00${nextReqId++}`,
                hospital: form.hospital,
                bloodGroup: form.bloodGroup,
                units: parseInt(form.units),
                urgency: form.urgency,
                status: 'Pending',
                date: form.date,
                patient: form.patient,
            };
            setSaving(false);
            onAdded(newReq);
            onClose();
        }, 700);
    };

    const onFocus = (e) => { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; };
    const onBlur = (e, field) => { if (!errors[field]) { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; } };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={e => e.target === e.currentTarget && onClose()}>
            <div role="dialog" aria-labelledby="modal-title" style={{ background: 'var(--bg-card)', borderRadius: '20px', width: '100%', maxWidth: '520px', boxShadow: 'var(--shadow-lg)', animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both', maxHeight: '90vh', overflowY: 'auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 28px 18px', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <h2 id="modal-title" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>New Blood Request</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>Submit a request from a hospital</p>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'var(--bg-hover)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Hospital */}
                    <div>
                        <label style={LBL}>Hospital <span style={{ color: '#FF3B30' }}>*</span></label>
                        <select value={form.hospital} onChange={e => set('hospital', e.target.value)}
                            style={{ ...FIELD, cursor: 'pointer', ...(errors.hospital ? { borderColor: 'var(--red)' } : {}) }}
                            onFocus={onFocus} onBlur={e => onBlur(e, 'hospital')}>
                            {HOSPITALS.map(h => <option key={h}>{h}</option>)}
                        </select>
                        {errors.hospital && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.hospital}</p>}
                    </div>

                    {/* Blood Group + Units */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                            <label style={LBL}>Blood Group <span style={{ color: '#FF3B30' }}>*</span></label>
                            <select value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}
                                style={{ ...FIELD, cursor: 'pointer' }} onFocus={onFocus} onBlur={e => onBlur(e, 'bloodGroup')}>
                                {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={LBL}>Units Required <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input type="number" min={1} max={50} value={form.units}
                                onChange={e => set('units', e.target.value)}
                                style={{ ...FIELD, ...(errors.units ? { borderColor: 'var(--red)' } : {}) }}
                                onFocus={onFocus} onBlur={e => onBlur(e, 'units')} />
                            {errors.units && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.units}</p>}
                        </div>
                    </div>

                    {/* Ward + Date */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                            <label style={LBL}>Ward / Patient Info <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input value={form.patient} onChange={e => set('patient', e.target.value)}
                                placeholder="e.g. Emergency Ward"
                                style={{ ...FIELD, ...(errors.patient ? { borderColor: 'var(--red)' } : {}) }}
                                onFocus={onFocus} onBlur={e => onBlur(e, 'patient')} />
                            {errors.patient && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.patient}</p>}
                        </div>
                        <div>
                            <label style={LBL}>Date Needed</label>
                            <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                                style={{ ...FIELD }} onFocus={onFocus} onBlur={e => onBlur(e, 'date')} />
                        </div>
                    </div>

                    {/* Urgency */}
                    <div>
                        <label style={LBL}>Urgency Level</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {['Normal', 'Critical'].map(u => (
                                <button key={u} type="button" onClick={() => set('urgency', u)}
                                    style={{
                                        flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid',
                                        fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                                        borderColor: form.urgency === u ? (u === 'Critical' ? 'var(--red)' : 'var(--blue)') : 'var(--border)',
                                        background: form.urgency === u ? (u === 'Critical' ? 'var(--red-bg)' : 'var(--blue-bg)') : 'var(--bg-card)',
                                        color: form.urgency === u ? (u === 'Critical' ? 'var(--red)' : 'var(--blue)') : 'var(--text-secondary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}>
                                    {u === 'Critical' ? <><Icons.Alert size={16} /> Critical</> : <><Icons.Requests size={16} /> Normal</>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                        <button type="button" onClick={onClose}
                            style={{ padding: '10px 22px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'transparent', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            Cancel
                        </button>
                        <button type="submit" disabled={saving}
                            style={{ padding: '10px 28px', borderRadius: '10px', border: 'none', background: saving ? 'var(--text-tertiary)' : 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: saving ? 'none' : '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s' }}>
                            {saving ? 'Submitting…' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
