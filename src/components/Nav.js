'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(248,244,236,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(179,164,151,0.2)',
      padding: scrolled ? '8px 0' : '14px 0',
      transition: 'padding 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 500, color: '#4F4A48', letterSpacing: '-0.02em' }}>Ane Wilder</span>
        </Link>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links">
          {['story','gallery','values','music','contact'].map(href => (
            <Link key={href} href={href === 'contact' ? '/contact' : `/${href}`} style={{
              fontSize: '0.88rem', fontWeight: href === 'contact' ? 500 : 400,
              color: href === 'contact' ? '#F8F4EC' : '#4F4A48',
              background: href === 'contact' ? '#4F4A48' : 'transparent',
              padding: href === 'contact' ? '8px 20px' : 0,
              borderRadius: 2,
              letterSpacing: '0.03em',
              transition: 'all 0.2s',
            }}
              onMouseOver={e => { if (href !== 'contact') e.target.style.color = '#B68FA2' }}
              onMouseOut={e => { if (href !== 'contact') e.target.style.color = '#4F4A48' }}
            >
              {href === 'contact' ? 'Join the Porch' : href.charAt(0).toUpperCase() + href.slice(1)}
            </Link>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#4F4A48' }}>{menuOpen ? '✕' : '☰'}</button>
      </div>
      {menuOpen && (
        <div style={{ padding: '16px 24px', background: '#F8F4EC', borderTop: '1px solid rgba(179,164,151,0.2)' }}>
          {['story','gallery','values','music'].map(href => (
            <Link key={href} href={`/${href}`} style={{ display: 'block', padding: '10px 0', fontSize: '0.95rem', color: '#4F4A48' }} onClick={() => setMenuOpen(false)}>{href.charAt(0).toUpperCase() + href.slice(1)}</Link>
          ))}
          <Link href="/contact" style={{ display: 'block', padding: '10px 0', fontSize: '0.95rem', color: '#4F4A48', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>Join the Porch</Link>
        </div>
      )}
      <style>{`@media(max-width:768px){.nav-links{display:none!important}.mobile-menu-btn{display:block!important}}`}</style>
    </nav>
  )
}
