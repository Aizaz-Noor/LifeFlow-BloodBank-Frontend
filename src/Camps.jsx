import { useState } from 'react';
import { DONATION_CAMPS } from './data';
import AddCampModal from './AddCampModal';
import { Icons } from './icons';

export default function CampsPage() {
    const [camps, setCamps] = useState(DONATION_CAMPS);
    const [showModal, setShowModal] = useState(false);
    const [registering, setRegistering] = useState(null); // camp id being registered

    const handleRegister = (campId) => {
        setRegistering(campId);
        setTimeout(() => {
            setCamps(prev => prev.map(c => c.id === campId ? { ...c, volunteers: c.volunteers + 1 } : c));
            setRegistering(null);
        }, 600);
    };

    const upcoming = camps.filter(c => c.status === 'Upcoming');
    const completed = camps.filter(c => c.status === 'Completed');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {showModal && (
                <AddCampModal
                    onClose={() => setShowModal(false)}
                    onAdded={c => setCamps(prev => [...prev, c])}
                />
            )}

            {/* Header */}
            <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Donation Camps</h1>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: 600 }}>{upcoming.length} upcoming</span>
                        <span style={{ color: 'var(--border)' }}>·</span>
                        <span style={{ fontSize: '13px', color: 'var(--green)', fontWeight: 600 }}>{completed.length} completed</span>
                    </div>
                </div>
                <button onClick={() => setShowModal(true)}
                    style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 18px rgba(255,59,48,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(255,59,48,0.3)'; }}>
                    + Schedule Camp
                </button>
            </div>

            {/* Upcoming */}
            {upcoming.length > 0 && (
                <>
                    <p className="anim-fade-up" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', animationDelay: '60ms' }}>Upcoming</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {upcoming.map((camp, i) => {
                            const pct = Math.round((camp.volunteers / camp.target) * 100);
                            const barColor = pct >= 75 ? 'var(--green)' : pct >= 40 ? 'var(--orange)' : 'var(--red)';
                            const isReg = registering === camp.id;
                            return (
                                <div key={camp.id} className="card-hover anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '22px 26px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: `${i * 60 + 80}ms` }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                                        {/* Left */}
                                        <div style={{ flex: 1, minWidth: '240px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'var(--blue-bg)', color: 'var(--blue)' }}>Upcoming</span>
                                                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Calendar size={14} /> {camp.date}</span>
                                            </div>
                                            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>{camp.name}</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.MapPin size={14} /> {camp.location}</p>
                                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Clock size={14} /> {camp.time}</p>
                                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Users size={14} /> {camp.organizer}</p>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div style={{ minWidth: '200px', maxWidth: '240px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Volunteers</span>
                                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                                    {camp.volunteers}<span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}> / {camp.target}</span>
                                                </span>
                                            </div>
                                            <div style={{ height: '8px', background: 'var(--bg-hover)', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
                                                <div className="anim-bar-grow" style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: barColor, borderRadius: '99px', animationDelay: `${i * 60 + 240}ms` }} />
                                            </div>
                                            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'right', fontWeight: 500 }}>{pct}% registered</p>
                                            {/* Register button */}
                                            <button onClick={() => handleRegister(camp.id)} disabled={isReg || pct >= 100}
                                                style={{
                                                    width: '100%', padding: '9px', borderRadius: '9px', border: '1.5px solid', fontSize: '13px', fontWeight: 700, cursor: pct >= 100 ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                                                    borderColor: pct >= 100 ? 'var(--border)' : 'var(--green)',
                                                    background: pct >= 100 ? 'var(--bg-hover)' : isReg ? 'var(--green-bg)' : 'transparent',
                                                    color: pct >= 100 ? 'var(--text-tertiary)' : 'var(--green)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                                                }}
                                                onMouseEnter={e => { if (pct < 100 && !isReg) e.currentTarget.style.background = 'var(--green-bg)'; }}
                                                onMouseLeave={e => { if (pct < 100 && !isReg) e.currentTarget.style.background = 'transparent'; }}>
                                                {pct >= 100 ? 'Camp Full' : isReg ? 'Registering…' : <><Icons.Check size={14} /> Register</>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Completed */}
            {completed.length > 0 && (
                <>
                    <p className="anim-fade-up" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Completed</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {completed.map((camp, i) => {
                            const pct = Math.round((camp.volunteers / camp.target) * 100);
                            return (
                                <div key={camp.id} className="card-hover anim-fade-up" style={{ background: 'var(--bg-hover)', borderRadius: '14px', padding: '18px 24px', border: '1px solid var(--border)', opacity: 0.85, animationDelay: `${i * 50}ms` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                                        <div>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'var(--green-bg)', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Check size={12} /> Completed</span>
                                                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Calendar size={12} /> {camp.date}</span>
                                            </div>
                                            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-secondary)' }}>{camp.name}</h3>
                                            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.MapPin size={12} /> {camp.location}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--green)' }}>{camp.volunteers}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>volunteers · {pct}% of goal</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
