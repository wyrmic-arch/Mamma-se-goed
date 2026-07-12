'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1EBE0', padding: 24 }}>
      <div style={{ background: '#F8F4EC', padding: '48px 40px', borderRadius: 2, boxShadow: '0 8px 32px rgba(79,74,72,0.1)', width: '100%', maxWidth: 400, border: '1px solid rgba(179,164,151,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/ane-wilder-logo-clean.png" alt="Ane Wilder" style={{ height: 48, margin: '0 auto 16px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: '#4F4A48' }}>Admin Login</h1>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', fontStyle: 'italic', marginTop: 8 }}>Enter the password to manage your content.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)', background: '#F8F4EC', color: '#4F4A48', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%' }}
          />
          {error && <p style={{ color: '#B68FA2', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
}
