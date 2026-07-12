import Link from 'next/link'

const swatches = [
  { name: 'Warm Cream', color: '#F8F4EC' },
  { name: 'Lavender Mist', color: '#C9B8D8' },
  { name: 'Sage Meadow', color: '#AEBFA6' },
  { name: 'Porch Light Gold', color: '#E8C26A' },
  { name: 'Dusty Mauve', color: '#B68FA2' },
  { name: 'Taupe', color: '#B3A497' },
  { name: 'Warm Brown', color: '#8B6F47' },
  { name: 'Charcoal', color: '#4F4A48' },
]

export default function ValuesPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: '#F1EBE0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 700 }}>
          <h1 className="section-title center">What She Stands For</h1>
          <p className="section-subtitle center" style={{ margin: '0 auto 48px' }}>Six words that guide every song, every story, every page.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
            {[
              { icon: '🕰️', title: 'Timeless', desc: 'Songs that reach for the eternal.' },
              { icon: '🌸', title: 'Feminine', desc: 'Unapologetically soft. No armor required.' },
              { icon: '📖', title: 'Authentic', desc: 'Real stories, real feelings, real mess.' },
              { icon: '☕', title: 'Comforting', desc: 'Like a porch light left on.' },
              { icon: '🏡', title: 'Country', desc: 'Roots in the land and the porch.' },
              { icon: '✒️', title: 'Literary', desc: 'Lyrics worth reading like prose.' },
            ].map((v, i) => (
              <div key={i} style={{ padding: '24px 16px', background: '#F8F4EC', border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2 }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, color: '#4F4A48', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#F8F4EC', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title center">The Color of Comfort</h2>
          <p className="section-subtitle center" style={{ margin: '0 auto 48px' }}>A palette drawn from the porch, the garden, and the golden hour.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {swatches.map((s, i) => (
              <div key={i} style={{ width: 140, height: 140, borderRadius: 2, display: 'flex', alignItems: 'flex-end', padding: 12, background: s.color, transition: 'transform 0.3s' }}>
                <span style={{ background: 'rgba(255,255,255,0.85)', padding: '4px 10px', borderRadius: 2, color: '#4F4A48', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.05em' }}>{s.name}</span>
              </div>
            ))}
          </div>
          <Link href="/music" className="btn btn-primary" style={{ marginTop: 48, display: 'inline-block' }}>Experience the Music</Link>
        </div>
      </section>
    </>
  )
}
