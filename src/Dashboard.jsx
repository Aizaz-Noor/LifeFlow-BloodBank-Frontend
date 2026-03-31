import { BLOOD_INVENTORY, RECENT_ACTIVITY, daysUntilExpiry } from './data';
import { Icons } from './icons';



function StatCard({ label, value, trend, trendUp, delay }) {
    return (
        <div className="card-hover anim-fade-up" style={{
            background: 'var(--bg-card)', borderRadius: '16px', padding: '24px',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
            animationDelay: delay,
        }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>{label}</p>
            <p style={{ fontSize: '40px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
            {trend && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '3px 8px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, background: trendUp ? 'var(--green-bg)' : 'var(--red-bg)', color: trendUp ? 'var(--green)' : 'var(--red)' }}>
                        {trendUp ? <Icons.ArrowUp /> : <Icons.ArrowDown />} {trend}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>vs last month</span>
                </div>
            )}
        </div>
    );
}

function InventoryBar({ group, units, capacity, expiryDate, delay }) {
    const pct = Math.round((units / capacity) * 100);
    const barColor = pct > 50 ? 'var(--green)' : pct > 20 ? 'var(--orange)' : 'var(--red)';
    const bgColor = pct > 50 ? 'var(--green-bg)' : pct > 20 ? 'var(--orange-bg)' : 'var(--red-bg)';
    const txtColor = pct > 50 ? 'var(--green)' : pct > 20 ? 'var(--orange)' : 'var(--red)';
    const daysLeft = daysUntilExpiry(expiryDate);
    const expiryColor = daysLeft <= 1 ? 'var(--red)' : daysLeft <= 3 ? 'var(--orange)' : 'var(--text-tertiary)';

    return (
        <div className="card-hover anim-fade-up" style={{ background: bgColor, borderRadius: '12px', padding: '14px 16px', border: '1px solid rgba(0,0,0,0.04)', animationDelay: delay }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icons.Drop size={14} color={txtColor} />
                    <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>{group}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: txtColor }}>{units} units</span>
            </div>
            {/* Animated bar - CSS custom property drives the target width */}
            <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div className="anim-bar-grow" style={{ height: '100%', width: pct + '%', background: barColor, borderRadius: '99px', animationDelay: delay }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{pct}% capacity</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: expiryColor }}>
                    {daysLeft <= 0 ? 'EXPIRED' : daysLeft === 1 ? 'Exp: TODAY' : `Exp: ${daysLeft}d`}
                </span>
            </div>
            {pct <= 20 && daysLeft > 0 && (
                <div style={{ marginTop: '6px', fontSize: '10px', fontWeight: 700, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icons.Alert size={11} color="var(--red)" /> Low Stock
                </div>
            )}
        </div>
    );
}

export default function DashboardPage() {
    const expiryAlerts = BLOOD_INVENTORY.filter(b => daysUntilExpiry(b.expiryDate) <= 3);
    const actDotColor = { critical: '#FF3B30', success: '#34C759', warning: '#FF9500', info: '#007AFF' };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div className="anim-fade-up">
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Dashboard</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Real-time overview of blood bank operations</p>
            </div>

            {/* Expiry Alerts Banner */}
            {expiryAlerts.length > 0 && (
                <div className="anim-fade-up" role="alert" style={{ background: 'var(--orange-bg)', border: '1px solid var(--orange)', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: '12px', animationDelay: '0ms' }}>
                    <Icons.Alert size={20} color="var(--orange)" />
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--orange)' }}>Blood Expiry Alert</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                            {expiryAlerts.map(b => {
                                const d = daysUntilExpiry(b.expiryDate);
                                return `${b.group} (${b.units} units - ${d <= 0 ? 'EXPIRED' : d === 1 ? 'expires today' : `expires in ${d} days`})`;
                            }).join(' · ')}
                        </p>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
                <StatCard label="Total Donors" value="1,247" trend="12.5%" trendUp delay="0ms" />
                <StatCard label="Blood Units" value="185" trend="8.2%" trendUp delay="60ms" />
                <StatCard label="Pending Requests" value="14" trend="3.1%" trendUp={false} delay="120ms" />
                <StatCard label="Upcoming Camps" value="4" delay="180ms" />
            </div>

            {/* Inventory + Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
                {/* Inventory */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>Blood Inventory</h2>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>Stock levels + expiry status</p>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--green)', background: 'var(--green-bg)', padding: '4px 10px', borderRadius: '99px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)' }} /> Live
                        </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(165px,1fr))', gap: '12px' }}>
                        {BLOOD_INVENTORY.map((b, i) => (
                            <InventoryBar key={b.group} {...b} delay={`${i * 60}ms`} />
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Activity Feed</h2>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Latest system events</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {RECENT_ACTIVITY.map((item, i) => (
                            <div key={i} className="anim-fade-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 12px', borderRadius: '10px', cursor: 'default', transition: 'background 0.12s', animationDelay: `${i * 55}ms` }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <div style={{ position: 'relative', marginTop: '4px', flexShrink: 0 }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: actDotColor[item.type] }} />
                                    {item.type === 'critical' && (
                                        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: actDotColor[item.type], animation: 'pulse-dot 2s ease infinite', opacity: 0.5 }} />
                                    )}
                                </div>
                                <div>
                                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.45 }}>{item.text}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '3px', fontWeight: 500 }}>{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blood Compatibility Matrix */}
            <div className="anim-fade-up" style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', animationDelay: '300ms' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Compatibility Matrix</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Which donor types are compatible with each recipient</p>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ borderCollapse: 'collapse', fontSize: '13px', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '8px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'var(--bg-hover)', borderRadius: '8px 0 0 8px' }}>Donor ↓ / Recipient →</th>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                                    <th key={g} style={{ padding: '8px 14px', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', background: 'var(--bg-hover)' }}>{g}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { donor: 'A+', compat: ['A+', 'AB+'] },
                                { donor: 'A-', compat: ['A+', 'A-', 'AB+', 'AB-'] },
                                { donor: 'B+', compat: ['B+', 'AB+'] },
                                { donor: 'B-', compat: ['B+', 'B-', 'AB+', 'AB-'] },
                                { donor: 'O+', compat: ['A+', 'B+', 'O+', 'AB+'] },
                                { donor: 'O-', compat: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
                                { donor: 'AB+', compat: ['AB+'] },
                                { donor: 'AB-', compat: ['AB+', 'AB-'] },
                            ].map(row => (
                                <tr key={row.donor} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--red)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Icons.Drop size={12} color="var(--red)" /> {row.donor}
                                    </td>
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(recipient => {
                                        const compatible = row.compat.includes(recipient);
                                        return (
                                            <td key={recipient} style={{ padding: '10px 14px', textAlign: 'center' }}>
                                                {compatible
                                                    ? <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-bg)', color: 'var(--green)', fontSize: '13px' }}>
                                                        <Icons.Check size={14} />
                                                    </span>
                                                    : <span style={{ display: 'inline-block', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--bg-hover)', color: 'var(--text-tertiary)', fontSize: '11px', lineHeight: '22px' }}>–</span>
                                                }
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
