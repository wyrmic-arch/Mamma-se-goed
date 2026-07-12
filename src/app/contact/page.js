'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [done, setDone] = useState(false)

  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: '#F8F4EC' }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <h1 className="section-title center">Leave the Porch Light On</h1>
          <p className="section-subtitle center" style={{ margin: '0 auto 48px' }}>Join the community. Get first listens, journal prompts, and letters from Ane.</p>
          <div style={{ background: '#F1EBE0', padding: '48px 32px', borderRadius: 2, border: '1px solid rgba(179,164,151,0.15)' }}>
            {done ? (
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.2rem', color: '#8B6F47', fontStyle: 'italic' }}>Welcome home ✦</p>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault()
                const fd = new FormData(e.target)
                await fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: fd.get('email'), name: fd.get('name') }),
                })
                setDone(true)
              }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input name="name" type="text" placeholder="Your name" style={{
                  padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)',
                  background: '#F8F4EC', color: '#4F4A48',
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%',
                }} />
                <input name="email" type="email" placeholder="Your email address" required style={{
                  padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)',
                  background: '#F8F4EC', color: '#4F4A48',
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%',
                }} />
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Join the Porch</button>
              </form>
            )}
            <p style={{ marginTop: 24, fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', fontStyle: 'italic' }}>No spam. Just songs, stories, and porch light moments.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(180deg, #F8F4EC 0%, #F1EBE0 100%)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, maxWidth: 800, margin: '0 auto' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, color: '#4F4A48', marginBottom: 8 }}>Email</h3>
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.9rem', color: '#B3A497' }}>hello@anewilder.com</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, color: '#4F4A48', marginBottom: 8 }}>Social</h3>
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.9rem', color: '#B3A497' }}>@anewildermusic</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, color: '#4F4A48', marginBottom: 8 }}>Porch</h3>
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.9rem', color: '#B3A497' }}>The community is open</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
