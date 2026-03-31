/* -----------------------------------------------------------
   Home.jsx - Public-facing Landing Page
   Inspired by americanbloodbank.com structure
----------------------------------------------------------- */

import { useState, useCallback } from 'react';
import { BLOOD_INVENTORY } from '../lib/data';

const BG_MAP = { '>50': '#F0FBF4', '>20': '#FFF8EE', low: '#FFF1F0' };
const COLOR_MAP = { '>50': '#34C759', '>20': '#FF9500', low: '#FF3B30' };
const LABEL_MAP = { '>50': 'Normal', '>20': 'Low', low: 'Critical' };

function stockLevel(units) {
    if (units > 50) return '>50';
    if (units > 20) return '>20';
    return 'low';
}

const TESTIMONIALS = [
    { name: 'Usman Tariq', role: 'Regular Donor', text: 'The staff at LifeFlow are incredibly professional and caring. I have never had a bad experience. They always make sure donors feel comfortable and appreciated.' },
    { name: 'Aisha Siddiqui', role: 'Donor since 2022', text: 'I love coming here to donate! The service is always great, everybody is welcoming and the process is quick and easy. It feels amazing knowing I am saving lives.' },
    { name: 'Bilal Hassan', role: 'First-time Donor', text: 'I was nervous at first but the team made me feel so at ease. The facility is modern and hygienic. I will definitely be donating again and again!' },
    { name: 'Fatima Malik', role: 'Thalassemia Champion', text: 'LifeFlow has been a lifeline for my brother with thalassemia. The blood is always screened, safe, and available when we need it. We are forever grateful.' },
    { name: 'Hamza Raza', role: 'Volunteer', text: 'Volunteering here has been a life-changing experience. The team is passionate, the mission is noble, and the impact on the community is truly immeasurable.' },
    { name: 'Nadia Khan', role: 'Loyal Donor', text: 'The entire process from registration to donation is seamless. The online appointment system is a great touch. Highly recommend everyone to join this cause!' },
];

function TestimonialsSection() {
    const [slide, setSlide] = useState(0);
    const perSlide = 3;
    const total = Math.ceil(TESTIMONIALS.length / perSlide);
    const visible = TESTIMONIALS.slice(slide * perSlide, slide * perSlide + perSlide);

    return (
        <section style={{ padding: '80px 5vw', background: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#FF3B30', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                        What Our Donors Say
                    </h2>
                    <div style={{ width: '48px', height: '3px', background: '#FF3B30', borderRadius: '2px', margin: '0 auto 16px' }} />
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.2em' }}>TESTIMONIALS</p>
                </div>
                {/* Carousel */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Prev arrow */}
                    <button onClick={() => setSlide(s => (s - 1 + total) % total)}
                        aria-label="Previous testimonials"
                        style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #E8E8ED', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', color: '#FF3B30' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FF3B30'; e.currentTarget.style.borderColor = '#FF3B30'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.color = '#FF3B30'; }}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    {/* Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', flex: 1 }}>
                        {visible.map((t, i) => (
                            <div key={i} style={{ background: '#F7F7F9', borderRadius: '16px', padding: '28px', border: '1px solid #E8E8ED', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.2s', position: 'relative' }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#FFBBB8'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#E8E8ED'; }}>
                                {/* Quote icon */}
                                <svg width="28" height="28" fill="#FF3B30" viewBox="0 0 24 24" style={{ opacity: 0.2, position: 'absolute', top: '20px', right: '20px' }}>
                                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                                </svg>
                                <p style={{ fontSize: '14px', color: '#4A4A4F', lineHeight: 1.75, flex: 1, fontStyle: 'italic' }}>"{t.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '12px', borderTop: '1px solid #E8E8ED' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '15px', fontWeight: 800, flexShrink: 0 }}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1D1D1F' }}>{t.name}</div>
                                        <div style={{ fontSize: '12px', color: '#6E6E73', marginTop: '1px' }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Next arrow */}
                    <button onClick={() => setSlide(s => (s + 1) % total)}
                        aria-label="Next testimonials"
                        style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #E8E8ED', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', color: '#FF3B30' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FF3B30'; e.currentTarget.style.borderColor = '#FF3B30'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.color = '#FF3B30'; }}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </div>
                {/* Dot indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
                    {Array.from({ length: total }).map((_, i) => (
                        <button key={i} onClick={() => setSlide(i)} aria-label={`Go to slide ${i + 1}`}
                            style={{ width: i === slide ? '24px' : '10px', height: '10px', borderRadius: '99px', border: 'none', background: i === slide ? '#FF3B30' : '#E8E8ED', cursor: 'pointer', transition: 'all 0.25s', padding: 0 }} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const FEATURES = [
    {
        title: 'Become a Donor',
        desc: 'Please contact us today to become a donor and learn more about our process. Your single donation can save up to 3 lives.',
        btnText: 'Learn How',
        gradient: 'linear-gradient(135deg, #FF6B6B, #FF3B30)',
        icon: (
            <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        imgBg: 'linear-gradient(135deg, #ffe5e5 0%, #ffcccc 100%)',
    },
    {
        title: 'Why Give Blood?',
        desc: 'Taking a few moments out of your day could potentially contribute to a medical breakthrough or a cure. Blood is life - give generously.',
        btnText: 'Learn More',
        gradient: 'linear-gradient(135deg, #007AFF, #0051D4)',
        icon: (
            <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
        imgBg: 'linear-gradient(135deg, #e0f0ff 0%, #c0dfff 100%)',
    },
    {
        title: 'How Do We Help?',
        desc: 'Learn about LifeFlow Blood Bank and how we are saving lives together with cutting-edge technology and compassionate care.',
        btnText: 'Learn More',
        gradient: 'linear-gradient(135deg, #34C759, #2EA84F)',
        icon: (
            <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        imgBg: 'linear-gradient(135deg, #e0fbe9 0%, #c0f0d0 100%)',
    },
];

const STEPS = [
    {
        step: '01', title: 'Register as a Donor',
        desc: 'Create your secure profile in under 2 minutes.',
        icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>,
    },
    {
        step: '02', title: 'Book an Appointment',
        desc: 'Choose a convenient date at any donation centre.',
        icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    },
    {
        step: '03', title: 'Donate & Save Lives',
        desc: 'A single donation saves up to 3 lives in 30–45 minutes.',
        icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
    },
];

const CONTACT_INFO = [
    {
        icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l1.96-1.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.04z" /></svg>,
        label: 'Phone',
        value: '+92 (021) 111-BLOOD',
        href: 'tel:+920211115663',
    },
    {
        icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
        label: 'Address',
        value: 'Plot 7, Blood Bank Road, JPMC, Karachi, Pakistan',
        href: '#',
    },
    {
        icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        label: 'Email',
        value: 'info@lifeflow.pk',
        href: 'mailto:info@lifeflow.pk',
    },
];

/* -- Donor Registration Modal -- */
function DonorRegistrationModal({ onClose }) {
    const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const [form, setForm] = useState({ name: '', cnic: '', phone: '', email: '', bloodGroup: '', city: '', dob: '', weight: '', lastDonation: '', conditions: '' });
    const [submitted, setSubmitted] = useState(false);
    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
    const inputStyle = { padding: '10px 12px', border: '1.5px solid #E8E8ED', borderRadius: '10px', fontSize: '14px', color: '#1D1D1F', background: '#FAFAFA', outline: 'none', fontFamily: 'Inter,sans-serif', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.15s' };
    const labelStyle = { fontSize: '12px', fontWeight: 700, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px', display: 'block' };

    if (submitted) return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '52px 40px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#34C759,#2EA84F)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1D1D1F', marginBottom: '10px' }}>Registration Received!</h2>
                <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.65, marginBottom: '28px' }}>Thank you, <strong>{form.name}</strong>! Your donor registration has been submitted. Our team will contact you within 24 hours to confirm your appointment.</p>
                <button onClick={onClose} style={{ padding: '12px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Done</button>
            </div>
        </div>
    );

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}
            onClick={e => e.target === e.currentTarget && onClose()}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '36px', maxWidth: '600px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                            </div>
                            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1D1D1F' }}>Become a Donor</h2>
                        </div>
                        <p style={{ fontSize: '14px', color: '#6E6E73' }}>Fill in your details and we will confirm your appointment within 24 hours.</p>
                    </div>
                    <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#F5F5F7', cursor: 'pointer', fontSize: '18px', color: '#6E6E73', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                </div>
                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div><label style={labelStyle}>Full Name *</label>
                            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Ahmed Khan" style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                        <div><label style={labelStyle}>CNIC</label>
                            <input value={form.cnic} onChange={e => set('cnic', e.target.value)} placeholder="12345-1234567-1" style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                        <div><label style={labelStyle}>Phone *</label>
                            <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+92 3xx-xxxxxxx" style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                        <div><label style={labelStyle}>Email</label>
                            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                        <div><label style={labelStyle}>Blood Group *</label>
                            <select value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="">Select...</option>
                                {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
                            </select></div>
                        <div><label style={labelStyle}>City</label>
                            <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Karachi" style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                        <div><label style={labelStyle}>Date of Birth</label>
                            <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                        <div><label style={labelStyle}>Weight (kg)</label>
                            <input type="number" value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="Min. 50 kg" style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                    </div>
                    <div><label style={labelStyle}>Last Donation Date (if any)</label>
                        <input type="date" value={form.lastDonation} onChange={e => set('lastDonation', e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                    <div><label style={labelStyle}>Any Medical Conditions</label>
                        <textarea value={form.conditions} onChange={e => set('conditions', e.target.value)} rows={2} placeholder="Diabetes, hypertension, etc. (leave blank if none)" style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#FF3B30'} onBlur={e => e.target.style.borderColor = '#E8E8ED'} /></div>
                    {/* Eligibility reminder */}
                    <div style={{ padding: '12px 16px', background: '#FFF1F0', borderRadius: '10px', border: '1px solid #FFBBB8', fontSize: '13px', color: '#C0392B', lineHeight: 1.6 }}>
                        <strong>Eligibility Criteria:</strong> Age 18-65, weight = 50 kg, no major illness, 56+ days since last donation, and no recent tattoo/surgery (6 months).
                    </div>
                    <button onClick={() => { if (!form.name || !form.phone || !form.bloodGroup) return; setSubmitted(true); }}
                        style={{ padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,59,48,0.3)', transition: 'all 0.2s', marginTop: '4px' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,59,48,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,59,48,0.3)'; }}>
                        Submit Registration
                    </button>
                </div>
            </div>
        </div>
    );
}

/* -- Coming Soon Modal -- */
function ComingSoonModal({ title, onClose }) {
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={e => e.target === e.currentTarget && onClose()}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '22px', background: '#FFF1F0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <svg width="40" height="40" fill="none" stroke="#FF3B30" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1D1D1F', marginBottom: '12px' }}>{title}</h2>
                <div style={{ width: '40px', height: '4px', background: '#FF3B30', borderRadius: '2px', margin: '0 auto 20px' }} />
                <p style={{ fontSize: '16px', color: '#6E6E73', lineHeight: 1.6, marginBottom: '32px' }}>
                    We are currently building the next generation of our digital experience. This feature will be available in the upcoming <strong>v2.0 release</strong>.
                </p>
                <button onClick={onClose} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,59,48,0.3)' }}>
                    Got it, thanks!
                </button>
            </div>
        </div>
    );
}

export default function HomePage({ onDonate, onRequest, onLogin }) {
    const [activeNav, setActiveNav] = useState('Home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showPortalModal, setShowPortalModal] = useState(false);

    const openReg = useCallback(() => setShowRegModal(true), []);
    const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

    const featureActions = [openReg, () => scrollTo('how'), () => scrollTo('about')];

    return (
        <div style={{ minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", background: darkMode ? '#1D1D1F' : '#fff', color: darkMode ? '#F5F5F7' : '#1D1D1F', transition: 'background 0.3s, color 0.3s' }}>
            {showRegModal && <DonorRegistrationModal onClose={() => setShowRegModal(false)} />}
            {showPortalModal && <ComingSoonModal title="Donor & Patient Portal" onClose={() => setShowPortalModal(false)} />}

            {/* -- TOP CONTACT BAR -- */}
            <div style={{ background: '#CC2222', padding: '8px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a href="tel:+920211115663" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 500, opacity: 0.95 }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l1.96-1.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.04z" /></svg>
                        +92 (021) 111-BLOOD
                    </a>
                    <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 500, opacity: 0.95 }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        Plot 7, Blood Bank Rd, JPMC, Karachi
                    </a>
                    <a href="mailto:info@lifeflow.pk" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 500, opacity: 0.95 }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        Email Us
                    </a>
                </div>
                {/* Social icons */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {[
                        { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                        { label: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                        { label: 'YouTube', d: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z' },
                    ].map(({ label, path, d }) => (
                        <a key={label} href="#" aria-label={label}
                            style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s', textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>
                            <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                                {path && <path d={path} />}
                                {d && <><path d={d} /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff" stroke="none" /></>}
                            </svg>
                        </a>
                    ))}
                </div>
            </div>

            {/* -- NAVBAR -- */}
            <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #E8E8ED', padding: '0 5vw', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,59,48,0.3)' }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                        </div>
                        <div>
                            <div style={{ fontSize: '17px', fontWeight: 900, color: '#1D1D1F', letterSpacing: '-0.02em', lineHeight: 1 }}>LifeFlow</div>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1px' }}>Blood Bank</div>
                        </div>
                    </div>

                    {/* Nav links */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {['Home', 'About Us', 'Donors', 'Contact'].map(item => (
                            <a key={item}
                                href={item === 'Home' ? '#' : item === 'About Us' ? '#about' : item === 'Donors' ? '#how' : '#contact'}
                                onClick={() => setActiveNav(item)}
                                style={{
                                    fontSize: '14px', fontWeight: 600, padding: '8px 14px', borderRadius: '8px',
                                    textDecoration: 'none', transition: 'all 0.15s',
                                    color: activeNav === item ? '#FF3B30' : '#4A4A4F',
                                    borderBottom: activeNav === item ? '2px solid #FF3B30' : '2px solid transparent',
                                }}
                                onMouseEnter={e => { if (activeNav !== item) e.currentTarget.style.color = '#1D1D1F'; }}
                                onMouseLeave={e => { if (activeNav !== item) e.currentTarget.style.color = '#4A4A4F'; }}>
                                {item}
                            </a>
                        ))}
                        <div style={{ width: '1px', height: '20px', background: '#E8E8ED', margin: '0 8px' }} />
                        {/* Dark mode toggle */}
                        <button onClick={() => setDarkMode(d => !d)} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1.5px solid #E8E8ED', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', color: '#4A4A4F' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF3B30'; e.currentTarget.style.color = '#FF3B30'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.color = '#4A4A4F'; }}>
                            {darkMode
                                ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                                : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                            }
                        </button>
                        <button onClick={onLogin}
                            style={{ padding: '8px 18px', borderRadius: '10px', border: '1.5px solid #E8E8ED', background: 'transparent', fontSize: '14px', fontWeight: 600, color: '#1D1D1F', cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF3B30'; e.currentTarget.style.color = '#FF3B30'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.color = '#1D1D1F'; }}>
                            Staff Login
                        </button>
                        <button onClick={openReg}
                            style={{ padding: '8px 20px', borderRadius: '10px', border: '2px solid #FF3B30', background: 'transparent', color: '#FF3B30', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s', marginLeft: '6px' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#FF3B30'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF3B30'; }}>
                            Become a Donor
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        </button>
                    </nav>
                </div>
            </header>

            {/* -- HERO -- */}
            <section style={{ position: 'relative', background: '#fff', overflow: 'hidden', minHeight: '580px', display: 'flex', alignItems: 'center' }}>
                {/* Right image panel — full bleed behind the grid */}
                <div style={{
                    position: 'absolute', right: 0, top: 0, bottom: 0, width: '46%', zIndex: 0,
                    backgroundImage: `url('/hero-donor.png')`,
                    backgroundSize: 'cover', backgroundPosition: 'center center',
                }}>
                    {/* Red tint overlay — kept light so the photo shows through */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(160,0,0,0.55) 0%, rgba(80,0,0,0.30) 100%)' }} />
                </div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '80px 5vw', width: '100%', display: 'grid', gridTemplateColumns: '54% 46%', alignItems: 'center', gap: '0' }}>
                    {/* Left text */}
                    <div style={{ paddingRight: '40px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '99px', background: '#FFF1F0', border: '1px solid #FFBBB8', marginBottom: '28px' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF3B30', animation: 'pulse-dot 1.5s ease infinite' }} />
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', letterSpacing: '0.05em' }}>Live Blood Stock Dashboard</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(42px, 5.5vw, 72px)', fontWeight: 900, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '10px' }}>
                            Donate Blood.
                        </h1>
                        <div style={{ fontSize: 'clamp(42px, 5.5vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '24px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                            Save Lives.
                        </div>
                        <p style={{ fontSize: '17px', color: '#6E6E73', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px' }}>
                            When you donate blood, you give someone a second chance at life. Every donation helps patients in hospitals, mothers during childbirth, and children fighting illness right here in Pakistan.
                        </p>
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                            <button onClick={openReg}
                                style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,59,48,0.35)', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(255,59,48,0.45)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,59,48,0.35)'; }}>
                                Donate Blood Now
                            </button>
                            <button onClick={onRequest}
                                style={{ padding: '14px 32px', borderRadius: '12px', border: '2px solid #E8E8ED', background: '#fff', color: '#1D1D1F', fontSize: '16px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF3B30'; e.currentTarget.style.color = '#FF3B30'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.color = '#1D1D1F'; }}>
                                Request Blood
                            </button>
                        </div>
                    </div>
                    {/* Right — stat cards float over the image */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-end', paddingRight: '28px', paddingTop: '10px' }}>
                        {[
                            { value: '1,247', label: 'Registered Donors', icon: <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
                            { value: '4,820', label: 'Lives Saved', icon: <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
                            { value: '185', label: 'Units Available', icon: <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg> },
                        ].map((s, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.35)',
                                borderRadius: '18px',
                                padding: '18px 26px',
                                display: 'flex', alignItems: 'center', gap: '16px',
                                minWidth: '220px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                            }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '30px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '3px', fontWeight: 500 }}>{s.label}</div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>


            {/* -- RED STATS BAR -- */}
            <section style={{ background: 'linear-gradient(135deg,#CC2222,#990000)', padding: '36px 5vw' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', textAlign: 'center' }}>
                    {[
                        { value: '56', unit: 'days', label: 'Min. wait between donations' },
                        { value: '30', unit: 'min', label: 'Average donation time' },
                        { value: '3', unit: 'lives', label: 'Saved per donation' },
                        { value: '38%', unit: '', label: 'Pakistanis who can donate' },
                    ].map((s, i) => (
                        <div key={i} style={{ padding: '8px 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.25)' : 'none' }}>
                            <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                {s.value}<span style={{ fontSize: '18px', fontWeight: 600, marginLeft: '4px', opacity: 0.85 }}>{s.unit}</span>
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* -- FEATURE CARDS -- */}
            <section id="about" style={{ padding: '80px 5vw', background: darkMode ? '#2C2C2E' : '#F7F7F9' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Why LifeFlow</p>
                        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '14px' }}>Making a Difference Together</h2>
                        <p style={{ fontSize: '16px', color: '#6E6E73', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>We connect donors, hospitals, and blood banks across Pakistan to make sure blood is always there when someone needs it.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '28px' }}>
                        {FEATURES.map((f, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E8E8ED', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.25s', display: 'flex', flexDirection: 'column' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}>
                                {/* Image area */}
                                <div style={{ height: '200px', background: f.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: f.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                                        {f.icon}
                                    </div>
                                </div>
                                {/* Content */}
                                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D1D1F', marginBottom: '10px', letterSpacing: '-0.01em' }}>{f.title}</h3>
                                    <p style={{ fontSize: '14px', color: '#6E6E73', lineHeight: 1.65, marginBottom: '22px', flex: 1 }}>{f.desc}</p>
                                    <button onClick={featureActions[i]}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #FF3B30', background: 'transparent', color: '#FF3B30', fontSize: '14px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em', transition: 'all 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#FF3B30'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF3B30'; }}>
                                        {f.btnText}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -- TESTIMONIALS -- */}
            <TestimonialsSection />

            {/* -- COMMITTED TO QUALITY -- */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '420px' }}>
                {/* Left - grayscale visual side */}
                <div style={{ background: 'linear-gradient(135deg, #2C2C2E 0%, #1D1D1F 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
                    {/* Abstract blood drop pattern background */}
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
                        {[...Array(6)].map((_, i) => (
                            <svg key={i} width="60" height="80" viewBox="0 0 24 24" fill="#fff" style={{ position: 'absolute', top: `${(i * 37) % 80}%`, left: `${(i * 29) % 80}%`, transform: `rotate(${i * 40}deg)`, opacity: 0.5 }}>
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                            </svg>
                        ))}
                    </div>
                    {/* Quality badge */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
                            <div style={{ width: '130px', height: '130px', borderRadius: '50%', border: '3px dashed rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                <svg width="40" height="40" fill="none" stroke="#FF3B30" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <polyline points="9 12 11 14 15 10" />
                                </svg>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'center', lineHeight: 1.3 }}>Quality{'\n'}Policy</div>
                            </div>
                        </div>
                        {/* Ribbon */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '60px', height: '3px', background: '#FF3B30', borderRadius: '2px' }} />
                            <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontWeight: 500, letterSpacing: '0.05em' }}>
                            WHO & AABB Certified
                        </div>
                    </div>
                </div>
                {/* Right - red content panel */}
                <div style={{ background: 'linear-gradient(160deg, #CC0000 0%, #8B0000 100%)', display: 'flex', alignItems: 'center', padding: '60px 52px' }}>
                    <div>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Our Promise</p>
                        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '8px' }}>
                            Committed to Quality
                        </h2>
                        <div style={{ width: '48px', height: '3px', background: '#fff', borderRadius: '2px', marginBottom: '24px', opacity: 0.6 }} />
                        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, marginBottom: '16px' }}>
                            LifeFlow Blood Bank is committed to providing an excellent donor experience and high-quality blood components to the healthcare and diagnostics industry.
                        </p>
                        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '32px' }}>
                            We are committed to perform all services to the highest standard of quality, ensuring the health and safety of our donors and patients.
                        </p>
                        <button
                            style={{ padding: '13px 36px', borderRadius: '10px', border: '2px solid #fff', background: '#fff', color: '#CC0000', fontSize: '15px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.03em', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#CC0000'; }}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* -- HOW IT WORKS -- */}
            <section id="how" style={{ padding: '80px 5vw', background: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Simple Process</p>
                        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em' }}>How to Donate Blood</h2>
                        <p style={{ fontSize: '16px', color: '#6E6E73', marginTop: '12px', maxWidth: '500px', margin: '12px auto 0', lineHeight: 1.65 }}>Giving blood is easier than most people think. Here is how it works from start to finish.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '28px' }}>
                        {STEPS.map((s, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '36px 28px', border: '1px solid #E8E8ED', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#FFBBB8'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#E8E8ED'; }}>
                                <div style={{ position: 'absolute', top: '-16px', right: '20px', fontSize: '80px', fontWeight: 900, color: '#F5F5F7', lineHeight: 1, userSelect: 'none' }}>{s.step}</div>
                                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#FFF1F0', color: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                    {s.icon}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1D1D1F', marginBottom: '10px' }}>{s.title}</h3>
                                <p style={{ fontSize: '14px', color: '#6E6E73', lineHeight: 1.65 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -- BLOOD AVAILABILITY -- */}
            <section id="blood" style={{ padding: '80px 5vw', background: '#F7F7F9' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Real-Time Stock</p>
                            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em' }}>Blood Availability</h2>
                            <p style={{ fontSize: '14px', color: '#6E6E73', marginTop: '8px' }}>Stock levels are checked and updated regularly by our team.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {[{ c: '#34C759', l: 'Normal' }, { c: '#FF9500', l: 'Low' }, { c: '#FF3B30', l: 'Critical' }].map(({ c, l }) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                                    <span style={{ fontSize: '13px', color: '#6E6E73', fontWeight: 500 }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        {BLOOD_INVENTORY.map((b, i) => {
                            const level = stockLevel(b.units);
                            const pct = Math.min(Math.round((b.units / b.capacity) * 100), 100);
                            const clr = COLOR_MAP[level];
                            const bg = BG_MAP[level];
                            return (
                                <div key={b.group} style={{ background: bg, borderRadius: '16px', padding: '20px', border: `1.5px solid ${clr}33`, transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 10px 28px ${clr}22`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '22px', fontWeight: 900, color: '#1D1D1F' }}>{b.group}</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '99px', background: '#fff', color: clr }}>{LABEL_MAP[level]}</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(0,0,0,0.07)', borderRadius: '99px', overflow: 'hidden', marginBottom: '10px' }}>
                                        <div style={{ height: '100%', width: pct + '%', background: clr, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                    </div>
                                    <p style={{ fontSize: '24px', fontWeight: 900, color: clr, letterSpacing: '-0.02em', lineHeight: 1 }}>{b.units}</p>
                                    <p style={{ fontSize: '12px', color: '#6E6E73', fontWeight: 500, marginTop: '3px' }}>units available</p>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '44px' }}>
                        <button onClick={onDonate}
                            style={{ padding: '14px 44px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,59,48,0.3)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(255,59,48,0.4)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,59,48,0.3)'; }}>
                            Become a Donor Today
                        </button>
                    </div>
                </div>
            </section>

            {/* -- ABOUT SECTION -- */}
            <section id="about" style={{ padding: '80px 5vw', background: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>About LifeFlow</p>
                        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '20px' }}>Pakistan's First Smart Blood Bank</h2>
                        <p style={{ fontSize: '16px', color: '#6E6E73', lineHeight: 1.75, marginBottom: '20px' }}>
                            LifeFlow Blood Bank is dedicated to ensuring a safe, adequate, and accessible blood supply for hospitals and patients across Pakistan. We operate with the highest standards of safety and quality in compliance with WHO and AABB guidelines.
                        </p>
                        <p style={{ fontSize: '16px', color: '#6E6E73', lineHeight: 1.75, marginBottom: '32px' }}>
                            Our technology-driven platform connects donors, blood banks, and hospitals in real time - eliminating shortages and saving more lives every day.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button onClick={onDonate}
                                style={{ padding: '12px 28px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,59,48,0.3)', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                Donate Now
                            </button>
                            <button onClick={onLogin}
                                style={{ padding: '12px 28px', borderRadius: '10px', border: '2px solid #E8E8ED', background: 'transparent', color: '#1D1D1F', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF3B30'; e.currentTarget.style.color = '#FF3B30'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.color = '#1D1D1F'; }}>
                                Staff Portal
                            </button>
                        </div>
                    </div>
                    {/* Compliance badges */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {[
                            { label: 'WHO Compliant', sub: 'World Health Organization certified safe practices', color: '#007AFF', bg: '#F0F7FF' },
                            { label: 'AABB Certified', sub: 'International accreditation for blood banking', color: '#34C759', bg: '#F0FBF4' },
                            { label: '24/7 Operations', sub: 'Round-the-clock emergency blood supply', color: '#FF9500', bg: '#FFF8EE' },
                            { label: 'TTI Screened', sub: 'All donations tested for 5 infectious diseases', color: '#FF3B30', bg: '#FFF1F0' },
                        ].map((b, i) => (
                            <div key={i} style={{ background: b.bg, borderRadius: '16px', padding: '24px', border: `1px solid ${b.color}22` }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: b.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                                    <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1D1D1F', marginBottom: '5px' }}>{b.label}</div>
                                <div style={{ fontSize: '12px', color: '#6E6E73', lineHeight: 1.5 }}>{b.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -- CONTACT SECTION -- */}
            <section id="contact" style={{ padding: '80px 5vw', background: '#F7F7F9' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Get in Touch</p>
                        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '14px' }}>Contact Us</h2>
                        <p style={{ fontSize: '16px', color: '#6E6E73', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>Have questions? We're here 24/7. Reach out to us through any of the channels below.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '28px', alignItems: 'start' }}>
                        {/* Contact info cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {CONTACT_INFO.map((c, i) => (
                                <a key={i} href={c.href} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: '#fff', borderRadius: '16px', padding: '22px', border: '1px solid #E8E8ED', textDecoration: 'none', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF3B30'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,59,48,0.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8ED'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF1F0', color: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {c.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{c.label}</div>
                                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#1D1D1F', lineHeight: 1.4 }}>{c.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        {/* Contact form */}
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #E8E8ED', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1D1D1F', marginBottom: '20px' }}>Send us a Message</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    {['First Name', 'Last Name'].map(pl => (
                                        <input key={pl} type="text" placeholder={pl}
                                            style={{ padding: '12px 14px', border: '1.5px solid #E8E8ED', borderRadius: '10px', fontSize: '14px', color: '#1D1D1F', background: '#FAFAFA', outline: 'none', fontFamily: 'Inter,sans-serif', transition: 'border-color 0.15s' }}
                                            onFocus={e => e.target.style.borderColor = '#FF3B30'}
                                            onBlur={e => e.target.style.borderColor = '#E8E8ED'} />
                                    ))}
                                </div>
                                <input type="email" placeholder="Email address"
                                    style={{ padding: '12px 14px', border: '1.5px solid #E8E8ED', borderRadius: '10px', fontSize: '14px', color: '#1D1D1F', background: '#FAFAFA', outline: 'none', fontFamily: 'Inter,sans-serif', transition: 'border-color 0.15s' }}
                                    onFocus={e => e.target.style.borderColor = '#FF3B30'}
                                    onBlur={e => e.target.style.borderColor = '#E8E8ED'} />
                                <input type="text" placeholder="Subject"
                                    style={{ padding: '12px 14px', border: '1.5px solid #E8E8ED', borderRadius: '10px', fontSize: '14px', color: '#1D1D1F', background: '#FAFAFA', outline: 'none', fontFamily: 'Inter,sans-serif', transition: 'border-color 0.15s' }}
                                    onFocus={e => e.target.style.borderColor = '#FF3B30'}
                                    onBlur={e => e.target.style.borderColor = '#E8E8ED'} />
                                <textarea rows={4} placeholder="Your message..."
                                    style={{ padding: '12px 14px', border: '1.5px solid #E8E8ED', borderRadius: '10px', fontSize: '14px', color: '#1D1D1F', background: '#FAFAFA', outline: 'none', fontFamily: 'Inter,sans-serif', resize: 'vertical', transition: 'border-color 0.15s' }}
                                    onFocus={e => e.target.style.borderColor = '#FF3B30'}
                                    onBlur={e => e.target.style.borderColor = '#E8E8ED'} />
                                <button
                                    style={{ padding: '13px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,59,48,0.3)', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(255,59,48,0.4)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,59,48,0.3)'; }}>
                                    Send Message
                                </button>
                            </div>
                        </div>
                        {/* Google Map embed */}
                        <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #E8E8ED', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%', minHeight: '420px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ background: '#fff', padding: '16px 20px', borderBottom: '1px solid #E8E8ED', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFF1F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="16" height="16" fill="none" stroke="#FF3B30" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1D1D1F' }}>Our Location</div>
                                    <div style={{ fontSize: '11px', color: '#6E6E73' }}>JPMC, Karachi, Pakistan</div>
                                </div>
                            </div>
                            <iframe
                                title="LifeFlow Blood Bank Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.7!2d67.0153!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7b6f0f7c9d%3A0x9c5b8aabc4e5c3f0!2sJinnah%20Postgraduate%20Medical%20Centre%20(JPMC)!5e0!3m2!1sen!2spk!4v1708000000000!5m2!1sen!2spk"
                                width="100%"
                                style={{ flex: 1, border: 'none', display: 'block', minHeight: '370px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* -- DONOR PORTAL TEASER -- */}
            <section style={{ padding: '100px 5vw', background: darkMode ? '#1D1D1F' : '#fff', borderTop: '1px solid #E8E8ED', borderBottom: '1px solid #E8E8ED' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '99px', background: '#E0F0FF', border: '1px solid #BADCFF', marginBottom: '24px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#007AFF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Coming in v2.0</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: darkMode ? '#fff' : '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '24px' }}>
                            One Dashboard.<br /><span style={{ color: '#FF3B30' }}>End-to-End Care.</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: '#6E6E73', lineHeight: 1.7, marginBottom: '40px', maxWidth: '480px' }}>
                            Soon, donors and patients will have their own dedicated portals. Track your donations, view test results, manage thalassaemia transfusions, and earn rewards—all in one place.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
                            {[
                                { t: 'Donor Wallet', d: 'Track your impact and rewards.' },
                                { t: 'E-Health Records', d: 'View your TTI test results safely.' },
                                { t: 'Smart Booking', d: 'One-tap appointment scheduling.' },
                                { t: 'Crisis Alerts', d: 'Priority notifications for your type.' },
                            ].map((f, i) => (
                                <div key={i}>
                                    <div style={{ fontSize: '15px', fontWeight: 800, color: darkMode ? '#fff' : '#1D1D1F', marginBottom: '4px' }}>{f.t}</div>
                                    <div style={{ fontSize: '13px', color: '#8E8E93' }}>{f.d}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowPortalModal(true)}
                            style={{ padding: '16px 40px', borderRadius: '14px', border: 'none', background: '#1D1D1F', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            Request Early Access
                        </button>
                    </div>
                    {/* Visual Mockup area */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ background: 'linear-gradient(135deg, #F5F5F7, #E8E8ED)', borderRadius: '32px', padding: '40px', border: '1px solid #E8E8ED', boxShadow: '0 40px 100px rgba(0,0,0,0.08)' }}>
                            <div style={{ width: '100%', height: '300px', background: '#fff', borderRadius: '20px', border: '1px solid #E8E8ED', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div style={{ height: '44px', background: '#F5F5F7', borderBottom: '1px solid #E8E8ED', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F57' }} />
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFBD2E' }} />
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28C940' }} />
                                    </div>
                                    <div style={{ width: '120px', height: '6px', background: '#E8E8ED', borderRadius: '3px' }} />
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E8E8ED' }} />
                                </div>
                                <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div style={{ flex: 1, height: '80px', background: '#E0F0FF', borderRadius: '12px' }} />
                                        <div style={{ flex: 1, height: '80px', background: '#FFF1F0', borderRadius: '12px' }} />
                                    </div>
                                    <div style={{ width: '60%', height: '14px', background: '#F5F5F7', borderRadius: '4px' }} />
                                    <div style={{ width: '100%', height: '80px', background: '#F5F5F7', borderRadius: '12px' }} />
                                </div>
                            </div>
                        </div>
                        {/* Floating elements */}
                        <div style={{ position: 'absolute', top: '230px', left: '-20px', padding: '16px 20px', background: '#fff', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', border: '1px solid #E8E8ED', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#34C759', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1D1D1F' }}>TTI Results Ready</div>
                                <div style={{ fontSize: '11px', color: '#6E6E73' }}>Cleared: HBV, HCV, HIV</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -- FAQ / EDUCATIONAL SECTION -- */}
            <section style={{ padding: '80px 5vw', background: darkMode ? '#2C2C2E' : '#F7F7F9' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#FF3B30', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Knowledge Hub</p>
                        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: darkMode ? '#fff' : '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '14px' }}>Frequently Asked Questions</h2>
                        <p style={{ fontSize: '16px', color: '#6E6E73', margin: '0 auto', lineHeight: 1.65 }}>Everything you need to know about donating blood and how it helps our community.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { q: 'Who can donate blood?', a: 'Most people between 18 and 65 years who weigh over 50kg and are in good health can donate blood.' },
                            { q: 'How often can I donate?', a: 'You can donate whole blood every 56 days (8 weeks). This allows your body enough time to replenish its red blood cells.' },
                            { q: 'Is donating blood safe?', a: 'Yes. Only sterile, disposable needles and supplies are used. There is no risk of contracting any disease through blood donation.' },
                            { q: 'How long does the process take?', a: 'The actual donation takes 8-10 minutes. The entire process (registration, screening, donation, and snacks) takes about 45 minutes.' },
                            { q: 'What should I do before donating?', a: 'Eat a healthy meal, stay hydrated (drink plenty of water/juice), and get a good night\'s rest.' },
                        ].map((item, idx) => (
                            <details key={idx} style={{ background: darkMode ? '#2C2C2E' : '#F7F7F9', borderRadius: '16px', padding: '20px', border: '1px solid #E8E8ED', cursor: 'pointer' }}>
                                <summary style={{ fontSize: '16px', fontWeight: 700, color: darkMode ? '#fff' : '#1D1D1F', outline: 'none' }}>{item.q}</summary>
                                <p style={{ fontSize: '14px', color: '#6E6E73', marginTop: '12px', lineHeight: 1.6 }}>{item.a}</p>
                            </details>
                        ))}
                    </div>
                    <div style={{ marginTop: '48px', padding: '32px', borderRadius: '24px', background: 'linear-gradient(135deg, #FF3B30, #C0392B)', color: '#fff', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Still have questions?</h3>
                        <p style={{ fontSize: '15px', opacity: 0.9, marginBottom: '24px' }}>Read our full educational blog and donor guide to learn more about the impact of your gift.</p>
                        <button style={{ padding: '12px 32px', borderRadius: '12px', border: 'none', background: '#fff', color: '#FF3B30', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Visit Our Blog</button>
                    </div>
                </div>
            </section>

            {/* -- FOOTER -- */}
            <footer style={{ background: '#1D1D1F', padding: '48px 5vw 28px', color: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                        {/* Brand */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>LifeFlow</div>
                                    <div style={{ fontSize: '10px', color: '#6E6E73', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Blood Bank</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '13px', color: '#8E8E93', lineHeight: 1.7, maxWidth: '240px', marginBottom: '20px' }}>
                                We operate 24 hours a day, 7 days a week across Karachi. Our team is committed to keeping blood safe, available, and accessible for every patient who needs it.
                            </p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {[
                                    { label: 'Facebook', svg: <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                                    { label: 'Twitter', svg: <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg> },
                                    { label: 'Instagram', svg: <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                                ].map(({ label, svg }) => (
                                    <a key={label} href="#" aria-label={label}
                                        style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#2C2C2E', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#FF3B30'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#2C2C2E'}>
                                        {svg}
                                    </a>
                                ))}
                            </div>
                        </div>
                        {/* Quick links */}
                        {[
                            { title: 'Services', links: ['Donate Blood', 'Request Blood', 'TTI Screening', 'Thalassemia Care', 'Blood Camps'] },
                            { title: 'Information', links: ['Why Donate?', 'Eligibility', 'Blood Types', 'FAQs', 'News & Blog'] },
                            { title: 'Contact', links: ['+92 021 111-BLOOD', 'info@lifeflow.pk', 'JPMC, Karachi', 'Mon–Sun: 24/7', 'Emergency: 1122'] },
                        ].map(col => (
                            <div key={col.title}>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>{col.title}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {col.links.map(l => (
                                        <a key={l} href="#" style={{ fontSize: '14px', color: '#AEAEB2', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 400 }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#AEAEB2'}>{l}</a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: '1px solid #2C2C2E', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <p style={{ fontSize: '13px', color: '#6E6E73' }}>© 2026 LifeFlow Blood Bank. All rights reserved. Thank you for supporting LifeFlow Blood Bank.</p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                                <a key={l} href="#" style={{ fontSize: '13px', color: '#6E6E73', textDecoration: 'none', transition: 'color 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#6E6E73'}>{l}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
