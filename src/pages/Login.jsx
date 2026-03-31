import { useState } from 'react';
import { Icons } from '../lib/icons';

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('admin@lifeflow.pk');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields.'); return; }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (password === 'admin123') { onLogin(); }
            else { setError('Incorrect password. Try: admin123'); }
        }, 1000);
    };

    return (
        <div className="login-bg">
            {/* Decorative circles */}
            <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,59,48,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,199,89,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="anim-scale-in" style={{ width: '100%', maxWidth: '420px', padding: '0 16px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, #FF3B30, #C0392B)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 8px 24px rgba(255,59,48,0.3)',
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>LifeFlow</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Blood Bank Management System</p>
                </div>

                {/* Card */}
                <div style={{
                    background: 'var(--bg-card)', borderRadius: '20px', padding: '36px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border)',
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Welcome back</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>Sign in to your admin account</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Email */}
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Email</label>
                            <input
                                type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="admin@lifeflow.pk"
                                style={{
                                    width: '100%', padding: '12px 14px', fontSize: '14px', border: '1.5px solid var(--border)',
                                    borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)', transition: 'all 0.2s',
                                }}
                                onFocus={e => { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; }}
                                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={{
                                        width: '100%', padding: '12px 44px 12px 14px', fontSize: '14px',
                                        border: '1.5px solid var(--border)', borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)', transition: 'all 0.2s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = 'var(--red)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = '0 0 0 3px var(--red-bg)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-card)'; e.target.style.boxShadow = 'none'; }}
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '2px',
                                }}>
                                    {showPass
                                        ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div style={{ padding: '10px 14px', background: 'var(--red-bg)', border: '1px solid var(--red)', borderRadius: '8px', fontSize: '13px', color: 'var(--red)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icons.Alert size={16} /> {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
                            background: loading ? 'var(--text-tertiary)' : 'linear-gradient(135deg, #FF3B30, #C0392B)',
                            color: '#fff', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: loading ? 'none' : '0 4px 14px rgba(255,59,48,0.35)',
                            transition: 'all 0.2s', marginTop: '4px',
                        }}
                            onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(255,59,48,0.4)'; } }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = loading ? 'none' : '0 4px 14px rgba(255,59,48,0.35)'; }}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin-slow 0.7s linear infinite' }}><circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Hint */}
                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '20px' }}>
                    Demo: use password <code style={{ background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>admin123</code>
                </p>
            </div>
        </div>
    );
}
