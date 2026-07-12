import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#3A3533', color: 'rgba(248,244,236,0.6)', padding: '48px 0 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 24 }}>
          <Link href="/">
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'rgba(248,244,236,0.7)', fontWeight: 500 }}>Ane Wilder</span>
          </Link>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { href: '/story', label: 'Story' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/values', label: 'Values' },
              { href: '/music', label: 'Music' },
              { href: '/contact', label: 'Contact' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '0.85rem', transition: 'color 0.2s', color: 'rgba(248,244,236,0.6)' }}>{l.label}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(248,244,236,0.1)', paddingTop: 24, fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 Ane Wilder — Music & Stories. Leave the porch light on.</span>
          <span>Timeless · Feminine · Authentic · Comforting · Country · Literary</span>
        </div>
      </div>
    </footer>
  )
}
