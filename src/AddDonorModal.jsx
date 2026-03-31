import { useState } from 'react';
import { BLOOD_GROUPS, PK_CITIES, addDonor, donorEligible } from './data';
import { Icons } from './icons';

const FIELD_STYLE = {
    width: '100%', padding: '10px 13px', fontSize: '14px', fontWeight: 400,
    border: '1.5px solid var(--border)', borderRadius: '10px', background: 'var(--bg-card)',
    color: 'var(--text-primary)', transition: 'all 0.15s', outline: 'none', fontFamily: 'Inter, sans-serif',
};
const LABEL_STYLE = { fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px', display: 'block' };
const ROW = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' };

export default function AddDonorModal({ onClose, onAdded }) {
    const [form, setForm] = useState({
        name: '', bloodGroup: 'A+', phone: '', city: 'Karachi',
        gender: 'Male', age: '', medHistory: 'None',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const set = (k, v) => {
        setForm(f => ({ ...f, [k]: v }));
        setErrors(e => ({ ...e, [k]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!/^0\d{3}[-]\d{7}$/.test(form.phone)) e.phone = 'Format: 0XXX-XXXXXXX';
        if (!form.age || form.age < 18 || form.age > 65) e.age = 'Age must be 18–65';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true);
        setTimeout(() => {
            const newDonor = addDonor(form);
            setSaving(false);
            onAdded(newDonor);
            onClose();
        }, 700);
    };

    const focusStyle = (field) => errors[field]
        ? { borderColor: 'var(--red)', background: 'var(--bg-card)', boxShadow: '0 0 0 3px var(--red-bg)' }
        : {};

    return (
        /* Backdrop */
        <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            {/* Modal card */}
            <div role="dialog" aria-labelledby="modal-title" style={{ background: 'var(--bg-card)', borderRadius: '20px', width: '100%', maxWidth: '560px', boxShadow: 'var(--shadow-lg)', animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both', maxHeight: '90vh', overflowY: 'auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px 20px', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <h2 id="modal-title" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Register New Donor</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>All eligible donors must be 18–65 years old</p>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'var(--bg-hover)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >×</button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Name */}
                    <div>
                        <label style={LABEL_STYLE}>Full Name <span style={{ color: 'var(--red)' }}>*</span></label>
                        <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Ahmed Khan"
                            style={{ ...FIELD_STYLE, ...focusStyle('name') }}
                            onFocus={e => { if (!errors.name) { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; } }}
                            onBlur={e => { if (!errors.name) { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; } }}
                        />
                        {errors.name && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.name}</p>}
                    </div>

                    {/* Row: Blood Group + Gender */}
                    <div style={ROW}>
                        <div>
                            <label style={LABEL_STYLE}>Blood Group <span style={{ color: '#FF3B30' }}>*</span></label>
                            <select value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)} style={{ ...FIELD_STYLE, cursor: 'pointer' }}>
                                {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={LABEL_STYLE}>Gender</label>
                            <select value={form.gender} onChange={e => set('gender', e.target.value)} style={{ ...FIELD_STYLE, cursor: 'pointer' }}>
                                <option>Male</option><option>Female</option><option>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Row: Phone + Age */}
                    <div style={ROW}>
                        <div>
                            <label style={LABEL_STYLE}>Phone <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="0312-4567890"
                                style={{ ...FIELD_STYLE, ...focusStyle('phone') }}
                                onFocus={e => { if (!errors.phone) { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; } }}
                                onBlur={e => { if (!errors.phone) { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; } }}
                            />
                            {errors.phone && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.phone}</p>}
                        </div>
                        <div>
                            <label style={LABEL_STYLE}>Age <span style={{ color: 'var(--red)' }}>*</span></label>
                            <input type="number" value={form.age} onChange={e => set('age', e.target.value)} placeholder="18–65"
                                style={{ ...FIELD_STYLE, ...focusStyle('age') }} min={18} max={65}
                                onFocus={e => { if (!errors.age) { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; } }}
                                onBlur={e => { if (!errors.age) { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; } }}
                            />
                            {errors.age && <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Alert size={14} /> {errors.age}</p>}
                        </div>
                    </div>

                    {/* City */}
                    <div>
                        <label style={LABEL_STYLE}>City</label>
                        <select value={form.city} onChange={e => set('city', e.target.value)} style={{ ...FIELD_STYLE, cursor: 'pointer' }}>
                            {PK_CITIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Medical History */}
                    <div>
                        <label style={LABEL_STYLE}>Medical History / Notes</label>
                        <textarea value={form.medHistory} onChange={e => set('medHistory', e.target.value)} rows={2} placeholder="Any relevant medical history (or 'None')"
                            style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '64px' }}
                            onFocus={e => { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; }}
                        />
                    </div>

                    {/* Eligibility note */}
                    <div style={{ padding: '12px 14px', background: 'var(--green-bg)', borderRadius: '10px', border: '1px solid var(--green)', fontSize: '13px', color: 'var(--green)', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <Icons.Check size={15} style={{ flexShrink: 0, marginTop: '1px' }} /> <span>Donor will be marked <strong>Active</strong>. Eligibility to donate will be auto-checked 56 days after registration.</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 22px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'transparent', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >Cancel</button>
                        <button type="submit" disabled={saving} style={{
                            padding: '10px 28px', borderRadius: '10px', border: 'none',
                            background: saving ? 'var(--text-tertiary)' : 'linear-gradient(135deg,#FF3B30,#C0392B)',
                            color: '#fff', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
                            boxShadow: saving ? 'none' : '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s',
                        }}>
                            {saving ? 'Registering…' : 'Register Donor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
