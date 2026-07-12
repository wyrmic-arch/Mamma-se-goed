import Link from 'next/link'

export default function MusicPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: '#4F4A48', color: '#F8F4EC' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 700 }}>
          <h1 className="section-title center" style={{ color: '#F8F4EC' }}>Songs for Every Chapter</h1>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: 'rgba(248,244,236,0.8)', lineHeight: 1.8, marginBottom: 20 }}>
            Ane Wilder music lives at the intersection of country storytelling and Americana warmth. Each song is a letter — to a younger self, to a heartbreak, to a hope that has not arrived yet.
          </p>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: 'rgba(248,244,236,0.8)', lineHeight: 1.8, marginBottom: 40 }}>
            Production that feels like a room, not a studio. Vocals that sound like they are sitting next to you. Lyrics worth reading on paper.
          </p>
          <Link href="/contact" className="btn btn-gold">Hear the First Single</Link>
        </div>
      </section>

      <section className="section" style={{ background: '#F8F4EC', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title center">Stay Connected</h2>
          <p className="section-subtitle center" style={{ margin: '0 auto 40px' }}>Be the first to hear new music, read journal entries, and join the porch community.</p>
          <Link href="/contact" className="btn btn-primary">Join the Porch</Link>
        </div>
      </section>
    </>
  )
}
