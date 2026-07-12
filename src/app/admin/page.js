'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const data = await res.json()
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Network error')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F1EBE0, #C9B8D8)', padding: 24 }}>
      <div style={{ background: '#F8F4EC', padding: '48px 40px', borderRadius: 2, boxShadow: '0 8px 32px rgba(79,74,72,0.1)', width: '100%', maxWidth: 400, border: '1px solid rgba(179,164,151,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: '#4F4A48' }}>Ane Wilder</h1>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', fontStyle: 'italic', marginTop: 8 }}>Admin Login</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
            style={{ padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)', background: '#F8F4EC', color: '#4F4A48', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none' }} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
            style={{ padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)', background: '#F8F4EC', color: '#4F4A48', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none' }} />
          {error && <p style={{ color: '#B68FA2', fontSize: '0.85rem' }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: 24, textAlign: 'center', fontFamily: 'var(--font-editorial)', fontSize: '0.75rem', color: '#B3A497' }}>
          First time? Any email + password creates an account.
        </p>
      </div>
    </div>
  )
}
