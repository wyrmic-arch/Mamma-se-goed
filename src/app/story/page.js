import Link from 'next/link';
import { getContent } from '@/lib/data';

export default function StoryPage() {
  const c = getContent();
  if (!c) return <div className="section"><div className="container"><p>Content not found.</p></div></div>;

  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: '#F8F4EC' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img src={c.story.image} alt="Ane Wilder" style={{ borderRadius: 2, boxShadow: '0 8px 32px rgba(79,74,72,0.12)', width: '100%' }} />
              <div style={{ position: 'absolute', bottom: -16, right: -16, width: 120, height: 120, border: '2px solid #E8C26A', borderRadius: 2, zIndex: -1 }} />
            </div>
            <div>
              <h1 className="section-title">{c.story.title}</h1>
              {c.story.paragraphs.map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: '#4F4A48', lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
              ))}
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontStyle: 'italic', color: '#8B6F47', marginTop: 32 }}>{c.story.signature}</p>
              <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
                <Link href="/music" className="btn btn-primary">Explore the Music</Link>
                <Link href="/contact" className="btn btn-outline">Join the Porch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#F1EBE0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title center">The Values That Guide Her</h2>
          <p className="section-subtitle center">Six words that shape every song, every story, every page.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginTop: 32 }}>
            {c.values.items.map((v, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ width: 48, height: 48, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#F8F4EC', fontSize: '1.3rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500, color: '#4F4A48', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', lineHeight: 1.7 }}>{v.description}</p>
              </div>
            ))}
          </div>
          <Link href="/values" className="btn btn-outline" style={{ marginTop: 32 }}>View Full Values</Link>
        </div>
      </section>
    </>
  );
}
