import Link from 'next/link'

export default function StoryPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: '#F8F4EC' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 700 }}>
          <h1 className="section-title center">Her Story</h1>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: '#4F4A48', lineHeight: 1.8, marginBottom: 20 }}>
            Ane Wilder is a digital storytelling artist creating country and Americana music rooted in real life — the messy, beautiful, heartbreaking kind.
            Her songs are letters to the women who have been through it and came out softer, not harder.
          </p>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: '#4F4A48', lineHeight: 1.8, marginBottom: 20 }}>
            She believes every chapter deserves a song: the front porch mornings, the 2am doubts, the slow walks home, the courage to begin again.
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontStyle: 'italic', color: '#8B6F47', marginTop: 32 }}>— Timeless. Feminine. Authentic. Comforting. Country. Literary. You.</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/music" className="btn btn-primary">Explore the Music</Link>
            <Link href="/contact" className="btn btn-outline">Join the Porch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
