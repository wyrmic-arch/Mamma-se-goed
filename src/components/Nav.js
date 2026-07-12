'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/story', label: 'Story' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/values', label: 'Values' },
    { href: '/music', label: 'Music' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(248,244,236,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(179,164,151,0.2)',
        padding: scrolled ? '8px 0' : '14px 0',
        transition: 'padding 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/ane-wilder-logo-clean.png" alt="Ane Wilder Logo" style={{ height: 36, width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontSize: '0.88rem', fontWeight: 400, color: '#4F4A48', letterSpacing: '0.03em', transition: 'color 0.2s' }}
              onMouseOver={e => e.target.style.color = '#B68FA2'}
              onMouseOut={e => e.target.style.color = '#4F4A48'}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              background: '#4F4A48', color: '#F8F4EC',
              padding: '8px 20px', borderRadius: 2,
              fontSize: '0.82rem', letterSpacing: '0.05em',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.target.style.background = '#8B6F47'}
            onMouseOut={e => e.target.style.background = '#4F4A48'}
          >
            Join the Porch
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#4F4A48' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <div style={{ padding: '16px 24px', background: '#F8F4EC', borderTop: '1px solid rgba(179,164,151,0.2)' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ display: 'block', padding: '10px 0', fontSize: '0.95rem', color: '#4F4A48' }} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" style={{ display: 'block', padding: '10px 0', fontSize: '0.95rem', color: '#4F4A48', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>
            Join the Porch
          </Link>
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          .nav-links{display:none!important}
          .mobile-menu-btn{display:block!important}
        }
      `}</style>
    </nav>
  );
}
