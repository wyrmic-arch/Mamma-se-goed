import Link from 'next/link';
import { getContent } from '@/lib/data';

export default function MusicPage() {
  const c = getContent();
  if (!c) return <div className="section"><div className="container"><p>Content not found.</p></div></div>;

  return (
    <>
      {/* Hero section */}
      <section className="section" style={{ paddingTop: 160, background: '#4F4A48', color: '#F8F4EC' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <img src={c.musicFeature.image} alt="Music" style={{ borderRadius: 2, opacity: 0.9, width: '100%' }} />
            </div>
            <div>
              <h1 className="section-title" style={{ color: '#F8F4EC' }}>{c.musicFeature.title}</h1>
              {c.musicFeature.paragraphs.map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: 'rgba(248,244,236,0.8)', lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
              ))}
              <Link href="/contact" className="btn" style={{ background: '#E8C26A', color: '#4F4A48' }}>{c.musicFeature.cta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Split sections */}
      {c.music.sections.map((s, i) => (
        <section key={i} className="music-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', minHeight: 420, background: i % 2 === 0 ? '#F8F4EC' : '#F1EBE0' }}>
          <div className={`music-img ${i % 2 === 1 ? 'order-2' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 400, color: '#4F4A48', marginBottom: 20 }}>{s.title}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', color: '#B3A497', lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
            ))}
            <Link href="/contact" className="btn btn-outline" style={{ marginTop: 16, alignSelf: 'flex-start' }}>{s.cta}</Link>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section" style={{ background: '#4F4A48', textAlign: 'center', color: '#F8F4EC' }}>
        <div className="container">
          <h2 className="section-title center" style={{ color: '#F8F4EC' }}>Stay Connected</h2>
          <p className="section-subtitle center" style={{ color: 'rgba(248,244,236,0.6)' }}>Be the first to hear new music, read journal entries, and join the porch community.</p>
          <Link href="/contact" className="btn" style={{ background: '#E8C26A', color: '#4F4A48' }}>Join the Porch</Link>
        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          .music-split{grid-template-columns:1fr!important}
          .music-img{min-height:300px!important;position:relative!important}
          .music-img img{position:relative!important}
          .order-2{order:2!important}
        }
      `}</style>
    </>
  );
}
