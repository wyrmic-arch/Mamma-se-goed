import Link from 'next/link';
import { getContent } from '@/lib/data';

const swatches = [
  { name: 'Warm Cream', color: '#F8F4EC' },
  { name: 'Lavender Mist', color: '#C9B8D8' },
  { name: 'Sage Meadow', color: '#AEBFA6' },
  { name: 'Porch Light Gold', color: '#E8C26A' },
  { name: 'Dusty Mauve', color: '#B68FA2' },
  { name: 'Taupe', color: '#B3A497' },
  { name: 'Warm Brown', color: '#8B6F47' },
  { name: 'Charcoal', color: '#4F4A48' },
];

export default function ValuesPage() {
  const c = getContent();
  if (!c) return <div className="section"><div className="container"><p>Content not found.</p></div></div>;

  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: '#F1EBE0' }}>
        <div className="container">
          <h1 className="section-title center">{c.values.title}</h1>
          <p className="section-subtitle center">{c.values.subtitle}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginTop: 48 }}>
            {c.values.items.map((v, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '40px 24px', background: '#F8F4EC', border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2, transition: 'transform 0.3s, box-shadow 0.3s' }} className="value-card-hover">
                <div style={{ width: 64, height: 64, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#F1EBE0', fontSize: '1.8rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 500, color: '#4F4A48', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.95rem', color: '#B3A497', lineHeight: 1.7 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#F8F4EC', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title center">The Color of Comfort</h2>
          <p className="section-subtitle center">A palette drawn from the porch, the garden, and the golden hour.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 48 }}>
            {swatches.map((s, i) => (
              <div key={i} style={{ width: 140, height: 140, borderRadius: 2, display: 'flex', alignItems: 'flex-end', padding: 12, background: s.color, transition: 'transform 0.3s' }}>
                <span style={{ background: 'rgba(255,255,255,0.85)', padding: '4px 10px', borderRadius: 2, color: '#4F4A48', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.05em' }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#F1EBE0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title center">Guided by These Values</h2>
          <p className="section-subtitle center">Every creative decision, every lyric, every design choice — rooted in this foundation.</p>
          <Link href="/music" className="btn btn-primary">Experience the Music</Link>
        </div>
      </section>

      <style>{`
        .value-card-hover:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(79,74,72,0.08)}
        @media(max-width:768px){
          div[style*="grid-template-columns"]{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:480px){
          div[style*="grid-template-columns"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </>
  );
}
