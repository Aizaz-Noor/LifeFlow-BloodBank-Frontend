import { useState, useMemo } from 'react';
import { BLOOD_REQUESTS, BLOOD_INVENTORY, DONORS } from '../lib/data';
import AddRequestModal from './modals/AddRequestModal';
import { Icons } from '../lib/icons';

/* Blood compatibility rules - same group always compatible, plus universal donors */
const COMPATIBLE_DONORS = {
    'O-': ['O-'],
    'O+': ['O-', 'O+'],
    'A-': ['O-', 'A-'],
    'A+': ['O-', 'O+', 'A-', 'A+'],
    'B-': ['O-', 'B-'],
    'B+': ['O-', 'O+', 'B-', 'B+'],
    'AB-': ['O-', 'A-', 'B-', 'AB-'],
    'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function RequestsPage() {
    const [requests, setRequests] = useState(BLOOD_REQUESTS);
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [showCrossMatch, setShowCrossMatch] = useState(false);
    const [cmGroup, setCmGroup] = useState('A+');
    const tabs = ['All', 'Pending', 'Approved', 'Fulfilled'];

    const filtered = useMemo(
        () => requests.filter(r => filter === 'All' || r.status === filter),
        [filter, requests]
    );

    const counts = useMemo(() => ({
        All: requests.length,
        Pending: requests.filter(r => r.status === 'Pending').length,
        Approved: requests.filter(r => r.status === 'Approved').length,
        Fulfilled: requests.filter(r => r.status === 'Fulfilled').length,
    }), [requests]);

    const updateStatus = (id, newStatus) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    const statusStyle = (s) => {
        if (s === 'Pending') return { bg: 'var(--orange-bg)', color: 'var(--orange)', dot: 'var(--orange)' };
        if (s === 'Approved') return { bg: 'var(--green-bg)', color: 'var(--green)', dot: 'var(--green)' };
        if (s === 'Fulfilled') return { bg: 'var(--bg-hover)', color: 'var(--text-tertiary)', dot: 'var(--text-tertiary)' };
        return { bg: 'var(--bg-hover)', color: 'var(--text-tertiary)', dot: 'var(--text-tertiary)' };
    };

    /* -- Cross-Match Data -- */
    const compatibleGroups = COMPATIBLE_DONORS[cmGroup] || [];
    const compatibleDonors = DONORS.filter(d =>
        compatibleGroups.includes(d.bloodGroup) &&
        (d.lastDonation === 'Never' || (() => {
            const diff = (new Date() - new Date(d.lastDonation)) / 86400000;
            return diff >= 56;
        })())
    );
    const inventoryMatch = BLOOD_INVENTORY.filter(b => compatibleGroups.includes(b.group));
    const totalUnitsAvail = inventoryMatch.reduce((s, b) => s + b.units, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {showModal && (
                <AddRequestModal onClose={() => setShowModal(false)} onAdded={r => setRequests(prev => [r, ...prev])} />
            )}

            {/* -- HEADER -- */}
            <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Blood Requests</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Incoming requests from hospitals - click to approve or fulfill</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-hover)', borderRadius: '12px', padding: '4px' }}>
                        {tabs.map(tab => (
                            <button key={tab} onClick={() => setFilter(tab)}
                                style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: filter === tab ? 'var(--bg-card)' : 'transparent', color: filter === tab ? '#FF3B30' : 'var(--text-secondary)', boxShadow: filter === tab ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                                {tab}
                                <span style={{ marginLeft: '5px', fontSize: '11px', fontWeight: 700, padding: '1px 6px', borderRadius: '99px', background: filter === tab ? '#FFF1F0' : 'transparent', color: filter === tab ? '#FF3B30' : 'var(--text-tertiary)' }}>
                                    {counts[tab]}
                                </span>
                            </button>
                        ))}
                    </div>
                    {/* Cross-Match Button */}
                    <button onClick={() => setShowCrossMatch(!showCrossMatch)}
                        aria-label="Toggle Cross-Match compatibility lookup"
                        style={{ padding: '9px 16px', borderRadius: '10px', border: showCrossMatch ? 'none' : '1.5px solid var(--border)', background: showCrossMatch ? 'linear-gradient(135deg,var(--blue),#0A84FF)' : 'var(--bg-card)', color: showCrossMatch ? '#fff' : 'var(--text-secondary)', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', boxShadow: showCrossMatch ? '0 3px 12px rgba(0,122,255,0.3)' : 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icons.DNA size={16} /> Cross-Match
                    </button>
                    {/* New Request */}
                    <button onClick={() => setShowModal(true)}
                        style={{ padding: '9px 18px', background: 'linear-gradient(135deg,#FF3B30,#C0392B)', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(255,59,48,0.3)', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 18px rgba(255,59,48,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(255,59,48,0.3)'; }}>
                        + New Request
                    </button>
                </div>
            </div>

            {/* -- CROSS-MATCH LOOKUP PANEL -- */}
            {showCrossMatch && (
                <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1.5px solid var(--blue)', boxShadow: '0 4px 20px rgba(0,122,255,0.1)', padding: '24px', animationDuration: '0.3s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icons.DNA size={20} /> Cross-Match Compatibility Lookup
                            </h2>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                                Find compatible donors and inventory for a patient's blood group
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Patient Blood Group:</label>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {BLOOD_GROUPS.map(g => (
                                    <button key={g} onClick={() => setCmGroup(g)}
                                        style={{ padding: '7px 13px', borderRadius: '8px', border: cmGroup === g ? 'none' : '1.5px solid var(--border)', background: cmGroup === g ? '#FF3B30' : 'var(--bg-hover)', color: cmGroup === g ? '#fff' : 'var(--text-primary)', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', boxShadow: cmGroup === g ? '0 2px 8px rgba(255,59,48,0.3)' : 'none' }}>
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Compatible Groups */}
                        <div style={{ background: 'var(--bg-hover)', borderRadius: '12px', padding: '18px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Check size={14} /> Compatible Blood Types</h3>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {compatibleGroups.map(g => (
                                    <span key={g} style={{ padding: '6px 14px', borderRadius: '99px', background: 'var(--green-bg)', color: 'var(--green)', fontSize: '14px', fontWeight: 700, border: '1.5px solid var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Icons.Drop /> {g}
                                    </span>
                                ))}
                            </div>
                            <div style={{ marginTop: '16px', padding: '12px', borderRadius: '10px', background: 'var(--blue-bg)', border: '1px solid var(--blue)' }}>
                                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Inventory size={14} /> Available Inventory</p>
                                <p style={{ fontSize: '24px', fontWeight: 800, color: 'var(--blue)', marginTop: '4px' }}>{totalUnitsAvail} <span style={{ fontSize: '14px', fontWeight: 600 }}>units total</span></p>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                                    {inventoryMatch.map(b => (
                                        <span key={b.group} style={{ fontSize: '12px', fontWeight: 600, color: b.units > 10 ? 'var(--green)' : b.units > 0 ? 'var(--orange)' : 'var(--red)', background: b.units > 10 ? 'var(--green-bg)' : b.units > 0 ? 'var(--orange-bg)' : 'var(--red-bg)', padding: '3px 9px', borderRadius: '99px' }}>
                                            {b.group}: {b.units}u
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Eligible donors */}
                        <div style={{ background: 'var(--bg-hover)', borderRadius: '12px', padding: '18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Eligible Donors</h3>
                                <span style={{ padding: '3px 10px', borderRadius: '99px', background: 'var(--green-bg)', color: 'var(--green)', fontSize: '12px', fontWeight: 700 }}>{compatibleDonors.length} available</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
                                {compatibleDonors.slice(0, 8).map(d => (
                                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                                        <div>
                                            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '1px' }}>{d.city} · {d.phone}</p>
                                        </div>
                                        <span style={{ padding: '3px 9px', borderRadius: '99px', background: 'var(--red-bg)', color: 'var(--red)', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Icons.Drop /> {d.bloodGroup}
                                        </span>
                                    </div>
                                ))}
                                {compatibleDonors.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-tertiary)', fontSize: '13px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <Icons.Alert size={18} /> No eligible donors found for this blood group
                                    </div>
                                )}
                                {compatibleDonors.length > 8 && (
                                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center', padding: '4px' }}>+{compatibleDonors.length - 8} more in Donor Management</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '14px', padding: '12px 16px', background: 'var(--blue-bg)', borderRadius: '10px', border: '1px solid var(--blue)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Icons.Alert size={16} /> <span><strong>WHO Compatibility Standard:</strong> Blood group {cmGroup} patients can receive from {compatibleGroups.join(', ')}. Always confirm with a certified serologist before transfusion.</span>
                        </p>
                    </div>
                </div>
            )}

            {/* -- EMPTY STATE -- */}
            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }}><Icons.Requests /></div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>No {filter !== 'All' ? filter.toLowerCase() : ''} requests</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Click "+ New Request" to add one</p>
                </div>
            )}

            {/* -- CARDS GRID -- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(400px,1fr))', gap: '16px' }}>
                {filtered.map((req, i) => {
                    const isCrit = req.urgency === 'Critical';
                    const ss = statusStyle(req.status);
                    const isPending = req.status === 'Pending';
                    const isApproved = req.status === 'Approved';

                    return (
                        <div key={req.id} className="card-hover anim-fade-up" style={{
                            background: 'var(--bg-card)', borderRadius: '14px', padding: '20px 22px',
                            border: '1px solid var(--border)',
                            borderLeft: isCrit ? '4px solid #FF3B30' : '4px solid transparent',
                            boxShadow: 'var(--shadow-sm)',
                            animationDelay: `${i * 50}ms`, position: 'relative',
                        }}>
                            {/* Critical ping */}
                            {isCrit && req.status === 'Pending' && (
                                <span style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF3B30', position: 'relative', display: 'inline-block' }}>
                                        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#FF3B30', animation: 'pulse-dot 1.5s ease infinite', opacity: 0.5 }} />
                                    </span>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF3B30' }}>CRITICAL</span>
                                </span>
                            )}
                            {/* ID + meta */}
                            <div style={{ marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{req.id}</span>
                                    {!isCrit && <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '99px', background: 'var(--blue-bg)', color: 'var(--blue)' }}>Normal</span>}
                                </div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{req.hospital}</h3>
                            </div>
                            {/* Detail grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', paddingTop: '14px', borderTop: '1px solid var(--border)', marginBottom: '16px' }}>
                                <div>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Blood</p>
                                    <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Icons.Drop /> {req.bloodGroup}
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Units</p>
                                    <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{req.units}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Ward</p>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{req.patient}</p>
                                </div>
                            </div>
                            {/* Footer: status + actions */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Icons.Calendar size={13} /> {req.date}
                                    </span>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: ss.bg, color: ss.color }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: ss.dot }} />
                                        {req.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    {isPending && (
                                        <button onClick={() => updateStatus(req.id, 'Approved')}
                                            style={{ padding: '5px 12px', borderRadius: '8px', border: '1.5px solid var(--green)', background: 'transparent', fontSize: '12px', fontWeight: 700, color: 'var(--green)', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '4px' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--green-bg)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <Icons.Check size={13} /> Approve
                                        </button>
                                    )}
                                    {isApproved && (
                                        <button onClick={() => updateStatus(req.id, 'Fulfilled')}
                                            style={{ padding: '5px 12px', borderRadius: '8px', border: 'none', background: 'var(--green)', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(52,199,89,0.3)' }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                            <Icons.Check size={13} /> Fulfill
                                        </button>
                                    )}
                                    {req.status !== 'Fulfilled' && (
                                        <button onClick={() => updateStatus(req.id, 'Fulfilled')} title="Cancel request"
                                            style={{ padding: '5px 10px', borderRadius: '8px', border: '1.5px solid var(--border)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 0.15s' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}>
                                            ?
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
