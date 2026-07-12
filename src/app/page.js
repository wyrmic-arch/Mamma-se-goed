import Link from 'next/link';
import { getContent } from '@/lib/data';
import NewsletterForm from '@/components/NewsletterForm';

export default function HomePage() {
  const c = getContent();
  if (!c) return <div className="section"><div className="container"><p>Content not found.</p></div></div>;

  return (
    <>
      {/* Hero */}
      <section className="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: `url(${c.hero.backgroundImage}) center/cover no-repeat` }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg,rgba(248,244,236,0.55) 0%,rgba(248,244,236,0.7) 50%,rgba(248,244,236,0.92) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, padding: '120px 24px 80px' }}>
          <div style={{ marginBottom: 32 }}>
            <img src="/ane-wilder-logo-clean.png" alt="Ane Wilder — Music & Stories" style={{ maxWidth: 340, margin: '0 auto', filter: 'drop-shadow(0 2px 12px rgba(79,74,72,0.15))' }} />
          </div>
          <p className="hero-tagline" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: '#4F4A48', lineHeight: 1.4, marginBottom: 24, letterSpacing: '-0.01em' }} dangerouslySetInnerHTML={{ __html: c.hero.tagline }} />
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', color: '#B3A497', fontStyle: 'italic', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 40px' }}>{c.hero.subtitle}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/story" className="btn btn-outline">Read Her Story</Link>
            <Link href="/contact" className="btn btn-primary">Join the Porch</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 1, fontSize: '0.75rem', color: '#B3A497', letterSpacing: '0.1em', textTransform: 'uppercase', animation: 'bounce 2s infinite' }}>Scroll ↓</div>
      </section>

      {/* Porch Light Banner */}
      <section style={{ background: '#4F4A48', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 300, color: '#E8C26A', fontStyle: 'italic', letterSpacing: '0.02em' }}>{c.porchLight.quote}</p>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: 'rgba(248,244,236,0.55)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.porchLight.subtitle}</p>
        </div>
      </section>

      {/* Story Preview */}
      <section className="section" style={{ background: '#F8F4EC' }}>
        <div className="container">
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img src={c.story.image} alt="Ane Wilder in the country" style={{ borderRadius: 2, boxShadow: '0 8px 32px rgba(79,74,72,0.12)', width: '100%' }} />
              <div style={{ position: 'absolute', bottom: -16, right: -16, width: 120, height: 120, border: '2px solid #E8C26A', borderRadius: 2, zIndex: -1 }} />
            </div>
            <div>
              <h2 className="section-title">{c.story.title}</h2>
              {c.story.paragraphs.map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: '#4F4A48', lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
              ))}
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontStyle: 'italic', color: '#8B6F47', marginTop: 32 }}>{c.story.signature}</p>
              <Link href="/story" className="btn btn-outline" style={{ marginTop: 24 }}>Read Full Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: '#F1EBE0' }}>
        <div className="container">
          <h2 className="section-title center">{c.values.title}</h2>
          <p className="section-subtitle center">{c.values.subtitle}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, marginTop: 48 }}>
            {c.values.items.map((v, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{ width: 56, height: 56, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#F8F4EC', fontSize: '1.5rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, color: '#4F4A48', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.9rem', color: '#B3A497', lineHeight: 1.7 }}>{v.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/values" className="btn btn-outline">See All Values</Link>
          </div>
        </div>
      </section>

      {/* Music Sections */}
      {c.music.sections.map((s, i) => (
        <section key={i} className="split-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', minHeight: 420, background: i % 2 === 0 ? '#F8F4EC' : '#F1EBE0' }}>
          <div className={`split-image ${i % 2 === 1 ? 'order-2' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 48px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 400, color: '#4F4A48', marginBottom: 20 }}>{s.title}</h3>
            {s.paragraphs.map((p, j) => (
              <p key={j} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', color: '#B3A497', lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
            ))}
            <Link href="/music" className="btn btn-outline" style={{ marginTop: 16, alignSelf: 'flex-start' }}>{s.cta}</Link>
          </div>
          <style>{`
            @media(max-width:768px){
              .split-section{grid-template-columns:1fr!important}
              .split-image{min-height:300px!important;position:relative!important}
              .split-image img{position:relative!important}
              .order-2{order:2!important}
            }
          `}</style>
        </section>
      ))}

      {/* Letters */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#F1EBE0 0%,#F8F4EC 100%)' }}>
        <div className="container">
          <h2 className="section-title center">{c.letters.title}</h2>
          <p className="section-subtitle center">{c.letters.subtitle}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginTop: 48 }}>
            {c.letters.items.map((l, i) => (
              <div key={i} style={{ background: '#F8F4EC', padding: 32, border: '1px solid rgba(179,164,151,0.2)', borderRadius: 2 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontStyle: 'italic', color: '#4F4A48', lineHeight: 1.7, marginBottom: 20 }}>{l.quote}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#B3A497', letterSpacing: '0.05em' }}>{l.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ background: `url(${c.contact.backgroundImage}) center/cover no-repeat`, position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(79,74,72,0.75)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '96px 24px' }}>
          <div className="container">
            <h2 className="section-title" style={{ color: '#F8F4EC' }}>{c.contact.title}</h2>
            <p style={{ color: 'rgba(248,244,236,0.8)', marginBottom: 40, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', maxWidth: 560, margin: '0 auto 40px' }}>{c.contact.subtitle}</p>
            <NewsletterForm dark />
          </div>
        </div>
      </section>
    </>
  );
}
