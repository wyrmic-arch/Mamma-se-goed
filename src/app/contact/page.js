import { getContent } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  const c = getContent();
  if (!c) return <div className="section"><div className="container"><p>Content not found.</p></div></div>;

  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: '#F8F4EC' }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <h1 className="section-title center">{c.contact.title}</h1>
          <p className="section-subtitle center" style={{ margin: '0 auto 48px' }}>{c.contact.subtitle}</p>
          <div style={{ background: '#F1EBE0', padding: '48px 32px', borderRadius: 2, border: '1px solid rgba(179,164,151,0.15)' }}>
            <ContactForm />
            <p style={{ marginTop: 24, fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', fontStyle: 'italic' }}>No spam. Just songs, stories, and porch light moments.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(180deg,#F8F4EC 0%,#F1EBE0 100%)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, maxWidth: 800, margin: '0 auto' }}>
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
  );
}
