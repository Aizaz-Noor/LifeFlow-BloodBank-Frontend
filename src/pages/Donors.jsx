import { useState, useMemo } from 'react';
import { DONORS as INITIAL_DONORS, BLOOD_INVENTORY, donorEligible, daysSinceDonation } from '../lib/data';
import AddDonorModal from './modals/AddDonorModal';
import { Icons } from '../lib/icons';

export default function DonorsPage() {
    const [donors, setDonors] = useState(INITIAL_DONORS);
    const [search, setSearch] = useState('');
    const [filterGroup, setFilterGroup] = useState('All');
    const [filterEligibility, setFilterEligibility] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [view, setView] = useState('list');
    const [appointments, setAppointments] = useState([
        { donorId: 1, donorName: 'Ahmed Khan', bloodGroup: 'O+', date: '2026-03-16', time: '10:00', notes: 'Post-Ramadan drive' },
        { donorId: 3, donorName: 'Sara Malik', bloodGroup: 'A+', date: '2026-03-05', time: '14:30', notes: '' },
        { donorId: 5, donorName: 'Hassan Ali', bloodGroup: 'B+', date: '2026-04-02', time: '09:00', notes: 'TTI recheck first' },
    ]);
    const [showApptForm, setShowApptForm] = useState(false);
    const [apptDate, setApptDate] = useState('2026-03-20');
    const [apptTime, setApptTime] = useState('10:00');
    const [apptNotes, setApptNotes] = useState('');

    const filtered = useMemo(() => donors.filter(d => {
        const q = search.toLowerCase();
        const matchSearch = d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.phone.includes(q);
        const matchGroup = filterGroup === 'All' || d.bloodGroup === filterGroup;
        const eligible = d.lastDonation === 'Never' ? true : donorEligible(d.lastDonation);
        const matchElig = filterEligibility === 'All'
            || (filterEligibility === 'Eligible' && eligible)
            || (filterEligibility === 'Not Eligible' && !eligible);
        return matchSearch && matchGroup && matchElig;
    }), [search, filterGroup, filterEligibility, donors]);

    const avatarGrad = (name) => {
        const gradients = [
            'linear-gradient(135deg,#FF6961,#FF3B30)',
            'linear-gradient(135deg,#67D4F8,#007AFF)',
            'linear-gradient(135deg,#6FE08D,#34C759)',
            'linear-gradient(135deg,#FFB367,#FF9500)',
            'linear-gradient(135deg,#C785F3,#9B59B6)',
        ];
        return gradients[name.charCodeAt(0) % gradients.length];
    };

    const eligibleCount = donors.filter(d => d.lastDonation === 'Never' || donorEligible(d.lastDonation)).length;
    const donorAppt = (id) => appointments.find(a => a.donorId === id);
    const upcomingAppts = [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date));

    const scheduleAppointment = () => {
        if (!selectedDonor || !apptDate) return;
        setAppointments(prev => {
            const existing = prev.filter(a => a.donorId !== selectedDonor.id);
            return [...existing, { donorId: selectedDonor.id, donorName: selectedDonor.name, bloodGroup: selectedDonor.bloodGroup, date: apptDate, time: apptTime, notes: apptNotes }];
        });
        setShowApptForm(false);
        setApptDate('2026-03-20'); setApptTime('10:00'); setApptNotes('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {showModal && (
                <AddDonorModal onClose={() => setShowModal(false)} onAdded={d => setDonors(prev => [d, ...prev])} />
            )}

            {/* -- DONOR DETAIL DRAWER -- */}
            {selectedDonor && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                    onClick={e => e.target === e.currentTarget && setSelectedDonor(null)}>
                    <div style={{ background: 'var(--bg-card)', width: '380px', height: '100vh', padding: '28px', overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', animation: 'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) both' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Donor Profile</h3>
                            <button onClick={() => setSelectedDonor(null)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'var(--bg-hover)', cursor: 'pointer', fontSize: '18px', color: 'var(--text-secondary)' }}>×</button>
                        </div>
                        {/* Avatar */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px', padding: '20px', background: 'var(--bg-hover)', borderRadius: '16px' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: avatarGrad(selectedDonor.name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '22px', fontWeight: 800, marginBottom: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
                                {selectedDonor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center' }}>{selectedDonor.name}</h4>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: '99px', background: 'var(--red-bg)', color: 'var(--red)', fontSize: '13px', fontWeight: 700, marginTop: '8px' }}>
                                <Icons.Drop /> {selectedDonor.bloodGroup}
                            </span>
                        </div>
                        {/* Details */}
                        {[
                            ['Phone', selectedDonor.phone],
                            ['City', selectedDonor.city],
                            ['Gender', selectedDonor.gender || '-'],
                            ['Age', selectedDonor.age ? `${selectedDonor.age} years` : '-'],
                            ['Status', selectedDonor.status],
                            ['Last Donation', selectedDonor.lastDonation === 'Never' ? 'Never donated' : selectedDonor.lastDonation],
                            ['Medical History', selectedDonor.medHistory || 'None'],
                        ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', gap: '8px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{k}</span>
                                <span style={{ fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right' }}>{v}</span>
                            </div>
                        ))}
                        {/* Badges & Milestones */}
                        <div style={{ marginTop: '20px' }}>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Badges & Milestones</p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {selectedDonor.donationsCount >= 1 && (
                                    <div title="First Donation" style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFF1F0', border: '1px solid #FFBBB8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF3B30' }}>
                                        <Icons.Droplet size={20} />
                                    </div>
                                )}
                                {selectedDonor.donationsCount >= 5 && (
                                    <div title="5+ Donations (Life Saver)" style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#E0F0FF', border: '1px solid #BADCFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007AFF' }}>
                                        <Icons.Shield size={20} />
                                    </div>
                                )}
                                {selectedDonor.donationsCount >= 10 && (
                                    <div title="10+ Donations (Hero)" style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF7E0', border: '1px solid #FDE293', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F9AB00' }}>
                                        <Icons.Award size={20} />
                                    </div>
                                )}
                                {selectedDonor.donationsCount === 0 && (
                                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No badges yet. Start donating to earn!</p>
                                )}
                            </div>
                        </div>

                        {/* Eligibility */}
                        {selectedDonor.lastDonation !== 'Never' && (
                            <div style={{ marginTop: '16px' }}>
                                {(() => {
                                    const d = daysSinceDonation(selectedDonor.lastDonation);
                                    const elig = donorEligible(selectedDonor.lastDonation);
                                    return (
                                        <div style={{ padding: '14px', borderRadius: '12px', background: elig ? 'var(--green-bg)' : 'var(--orange-bg)', border: `1px solid ${elig ? 'var(--green)' : 'var(--orange)'}` }}>
                                            <p style={{ fontSize: '13px', fontWeight: 700, color: elig ? 'var(--green)' : 'var(--orange)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {elig ? <><Icons.Check size={13} /> Eligible to Donate</> : <><Icons.Clock size={13} /> Not Yet Eligible</>}
                                            </p>
                                            <p style={{ fontSize: '12px', color: elig ? 'var(--green)' : 'var(--orange)', marginTop: '4px', opacity: 0.85 }}>
                                                {d} days since last donation. {elig ? 'Ready to donate again.' : `${56 - d} more days required.`}
                                            </p>
                                            {!elig && (
                                                <div style={{ marginTop: '10px', height: '6px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min((d / 56) * 100, 100)}%`, background: 'var(--orange)', borderRadius: '99px', transition: 'width 0.5s ease' }} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                        {/* Appointment CTA */}
                        <div style={{ marginTop: '20px' }}>
                            {donorAppt(selectedDonor.id)
                                ? <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--blue-bg)', border: '1px solid var(--blue)' }}>
                                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Icons.Calendar /> Appointment Scheduled
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>{donorAppt(selectedDonor.id).date} at {donorAppt(selectedDonor.id).time}</p>
                                </div>
                                : <button onClick={() => setShowApptForm(true)}
                                    aria-label="Schedule Appointment"
                                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px dashed var(--blue)', background: 'transparent', color: 'var(--blue)', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                                    Schedule Appointment
                                </button>
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* -- HEADER -- */}
            <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Donor Management</h1>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{donors.length} total donors</span>
                        <span style={{ color: 'var(--border)' }}>·</span>
                        <span style={{ fontSize: '13px', color: 'var(--green)', fontWeight: 600 }}>{eligibleCount} eligible</span>
                        <span style={{ color: 'var(--border)' }}>·</span>
                        <span style={{ fontSize: '13px', color: '#9B59B6', fontWeight: 600 }}>{appointments.length} appointments</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* View toggle */}
                    <div style={{ display: 'flex', background: 'var(--bg-hover)', borderRadius: '10px', padding: '4px', gap: '4px' }}>
                        {['list', 'appointments'].map(v => (
                            <button key={v} onClick={() => setView(v)}
                                style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', background: view === v ? 'var(--bg-card)' : 'transparent', color: view === v ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                                {v === 'list' ? <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Users /> Donors</span> : <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Calendar /> Appointments</span>}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowModal(true)} style={{
                        padding: '10px 20px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff',
                        borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 18px rgba(255,59,48,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(255,59,48,0.3)'; }}
                    >+ Add New Donor</button>
                </div>
            </div>

            {/* -- SEARCH & FILTERS -- */}
            <div className="anim-fade-up" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animationDelay: '60ms' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                    <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: searchFocus ? 'var(--red)' : 'var(--text-tertiary)', transition: 'color 0.15s' }}
                        width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" placeholder="Search by name, city or phone…" value={search}
                        onChange={e => setSearch(e.target.value)}
                        onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}
                        style={{
                            width: '100%', padding: '11px 14px 11px 42px', fontSize: '14px',
                            border: `1.5px solid ${searchFocus ? 'var(--red)' : 'var(--border)'}`,
                            borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)',
                            boxShadow: searchFocus ? '0 0 0 3px rgba(255,59,48,0.08)' : 'none',
                            transition: 'all 0.15s', outline: 'none', fontFamily: 'Inter,sans-serif',
                        }}
                    />
                </div>
                <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)}
                    style={{ padding: '11px 16px', border: '1.5px solid var(--border)', borderRadius: '10px', background: 'var(--bg-card)', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'}>
                    <option value="All">All Blood Groups</option>
                    {BLOOD_INVENTORY.map(b => <option key={b.group} value={b.group}>{b.group}</option>)}
                </select>
                <select value={filterEligibility} onChange={e => setFilterEligibility(e.target.value)}
                    style={{ padding: '11px 16px', border: '1.5px solid var(--border)', borderRadius: '10px', background: 'var(--bg-card)', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'}>
                    <option value="All">All Eligibility</option>
                    <option value="Eligible">Eligible to Donate</option>
                    <option value="Not Eligible">Not Yet Eligible</option>
                </select>
            </div>

            {/* -- APPOINTMENTS VIEW -- */}
            {view === 'appointments' && (
                <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', animationDelay: '80ms' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>Upcoming Donor Appointments</h2>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>Scheduled next-donation dates · click a donor row and use "Schedule Appointment"</p>
                        </div>
                        <span style={{ padding: '4px 12px', borderRadius: '99px', background: '#F5F0FF', color: '#9B59B6', fontSize: '13px', fontWeight: 700 }}>{upcomingAppts.length} scheduled</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead><tr style={{ background: 'var(--bg-hover)', borderBottom: '1px solid var(--border)' }}>
                            {['Donor', 'Blood Group', 'Date', 'Time', 'Notes', 'Action'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '11px 20px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {upcomingAppts.map((a, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{a.donorName}</td>
                                    <td style={{ padding: '14px 20px' }}><span style={{ padding: '3px 9px', borderRadius: '99px', background: 'var(--red-bg)', color: 'var(--red)', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}><Icons.Drop /> {a.bloodGroup}</span></td>
                                    <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: 'var(--blue)' }}>{a.date}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{a.time}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{a.notes || '-'}</td>
                                    <td style={{ padding: '14px 20px' }}>
                                        <button onClick={() => setAppointments(prev => prev.filter((_, pi) => pi !== i))}
                                            style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--red)', background: 'var(--red-bg)', color: 'var(--red)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                                    </td>
                                </tr>
                            ))}
                            {upcomingAppts.length === 0 && (
                                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', fontSize: '14px', color: 'var(--text-tertiary)' }}>No appointments scheduled - click any donor row and use "Schedule Appointment"</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* -- LIST VIEW -- */}
            {view === 'list' && (
                <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', animationDelay: '120ms' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-hover)' }}>
                                    {['Donor', 'Blood Group', 'Contact', 'City', 'Last Donation', 'Eligibility', 'Appt', 'Status'].map(col => (
                                        <th key={col} style={{ textAlign: 'left', padding: '13px 20px', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((d, i) => {
                                    const eligible = d.lastDonation === 'Never' ? true : donorEligible(d.lastDonation);
                                    const days = d.lastDonation === 'Never' ? null : daysSinceDonation(d.lastDonation);
                                    const appt = donorAppt(d.id);
                                    return (
                                        <tr key={d.id} className="anim-fade-up" style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s', cursor: 'pointer', animationDelay: `${i * 35}ms` }}
                                            onClick={() => setSelectedDonor(d)}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '14px 20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: avatarGrad(d.name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                                                        {d.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>{d.name}</span>
                                                        {d.age && <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{d.gender}, {d.age}y</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', background: 'var(--red-bg)', color: 'var(--red)', fontSize: '12px', fontWeight: 700 }}>
                                                    <Icons.Drop /> {d.bloodGroup}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{d.phone}</td>
                                            <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{d.city}</td>
                                            <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                {d.lastDonation === 'Never' ? <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Never</span> : (
                                                    <div>
                                                        <div>{d.lastDonation}</div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{days} days ago</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                {eligible
                                                    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: 'var(--green-bg)', color: 'var(--green)' }}>
                                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)' }} /> Eligible
                                                    </span>
                                                    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: 'var(--orange-bg)', color: 'var(--orange)' }} title={`${56 - days} more days`}>
                                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)' }} /> {56 - days}d wait
                                                    </span>
                                                }
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                {appt
                                                    ? <span style={{ padding: '3px 9px', borderRadius: '99px', background: 'var(--blue-bg)', color: 'var(--blue)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                                                        <Icons.Calendar /> {appt.date}
                                                    </span>
                                                    : <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>-</span>
                                                }
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: d.status === 'Active' ? 'var(--green-bg)' : 'var(--bg-hover)', color: d.status === 'Active' ? 'var(--green)' : 'var(--text-tertiary)' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: d.status === 'Active' ? 'var(--green)' : 'var(--text-tertiary)' }} />
                                                    {d.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filtered.length === 0 && (
                                    <tr><td colSpan="8" style={{ padding: '60px', textAlign: 'center' }}>
                                        <div style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }}><Icons.Search /></div>
                                        <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>No donors found</p>
                                        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Try adjusting your search or filters</p>
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length > 0 && (
                        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-hover)', fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                            Showing {filtered.length} of {donors.length} donors · Click row to view profile & schedule appointment
                        </div>
                    )}
                </div>
            )}

            {/* -- APPOINTMENT FORM MODAL -- */}
            {showApptForm && selectedDonor && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={e => e.target === e.currentTarget && setShowApptForm(false)}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '28px', width: '380px', boxShadow: 'var(--shadow-lg)', animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Schedule Appointment</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            {selectedDonor.name} · <Icons.Drop /> {selectedDonor.bloodGroup}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Date</label>
                                <input type="date" value={apptDate} onChange={e => setApptDate(e.target.value)}
                                    style={{ width: '100%', padding: '10px 13px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '14px', background: 'var(--bg-input)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'Inter,sans-serif' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Time</label>
                                <input type="time" value={apptTime} onChange={e => setApptTime(e.target.value)}
                                    style={{ width: '100%', padding: '10px 13px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '14px', background: 'var(--bg-input)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'Inter,sans-serif' }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Notes (optional)</label>
                            <textarea value={apptNotes} onChange={e => setApptNotes(e.target.value)} rows={2} placeholder="e.g. After Ramadan / check TTI first"
                                style={{ width: '100%', padding: '10px 13px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '14px', background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical', outline: 'none', fontFamily: 'Inter,sans-serif' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowApptForm(false)} style={{ padding: '9px 18px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'transparent', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={scheduleAppointment} style={{ padding: '9px 22px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#9B59B6,#6C3483)', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(155,89,182,0.3)' }}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
